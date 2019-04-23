import * as d3 from 'd3';
import {createElementNS, SVG_NS, UiComponent} from '@jusfoun-vis/common';

const isEmpty = function (o) {
  return o === undefined || o === null || (typeof o == 'string' && o.length < 1);
};
const isSize = function (o) {
  return isFinite(o) || (typeof o == 'string' && /^[+-]?\d+(\.\d+)?(px|pt|em|rem|%)$/.test(o));
};

/**
 * 椭圆力导向词云图。
 * 采用椭圆空间力导向算法。
 * 注意，此组件为原生级别组件，与框架无关，可嵌入任何框架中使用。
 * TODO 半径权重未使用，需要引入新逻辑。
 * @author Molay
 */
class EllipseForceDirectedTagCloud extends UiComponent {
  constructor() {
    super();

    let me = this;

    let svg = createElementNS(SVG_NS, 'svg');
    me._domElement = svg;

    let d3Svg = d3.select(svg);
    me._d3Svg = d3Svg;
    let d3MainGroup = d3Svg.append('g');
    me._d3MainGroup = d3MainGroup;
    me._d3DecorationGroup = d3MainGroup.append('g')
      .attr('class', 'decoration-group');
    me._d3Title = d3MainGroup.append('text')
      .attr('class', 'title')
      .attr('dy', 25)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle');
    me._d3VertexGroup = d3MainGroup.append('g')
      .attr('class', 'vertex-group');


    me._force = d3.forceSimulation();
    me._radiusScale = d3.scaleLinear();
    me._fontSizeScale = d3.scaleLinear();
    me._distanceScale = d3.scaleLinear();
  }

  // //
  // 内部属性
  // //

  _explicitWidth = undefined;
  _explicitHeight = undefined;

  _domElement = undefined;

  _d3Svg = undefined;
  _d3DecorationGroup = undefined;
  _d3MainGroup = undefined;
  _d3Vertices = undefined;
  _d3Title = undefined;
  _d3Decorations = undefined;

  _labelFunction = function (d) {
    return d.label;
  };

  _sizeFunction = function (d) {
    return d.size;
  };

  _categoryFunction = function (d) {
    return d.category;
  };

  _distanceFunction = function (d) {
    return d.distance;
  };

  _defaultCategory = {
    fill: '#ffff00',
    fillOpacity: 1.0,
    stroke: '#FF0000',
    strokeOpacity: 1.0,
    strokeWidth: 1.0,
    textFill: '#FF0000'
  };

  _data = undefined;
  _categories = undefined;
  _categoryMap = undefined;
  _decorations = undefined;

  _minRadius = 10;
  _maxRadius = 20;
  _minFontSize = 8;
  _maxFontSize = 20;
  _collisionPadding = 10;
  _minCollisionRadius = 25;

  _jitter = 0.618;

  _force = undefined;
  _radiusScale = undefined;
  _fontSizeScale = undefined;
  _distanceScale = undefined;

  _invalidateDataFlag = false;
  // _invalidateSizeFlag = false;
  _invalidateDecorationFlag = false;
  _invalidateStyleFlag = false;

  // //
  // 属性存取器
  // //

  /**
   * 此图表的HTML Element对象。
   * @return {HTMLElement}
   */
  get domElement() {
    return this._domElement;
  }

  get data() {
    return this._data;
  }

  /**
   * 此图表使用的数据。
   * @param value
   */
  set data(value) {
    let me = this;
    me._data = value;
    me._invalidateDataFlag = true;
    me.invalidateProperties();
  }

  get categories() {
    return this._categories;
  }

  /**
   * 标签的分类信息。
   * @param value
   */
  set categories(value) {
    let me = this;
    me._categories = value;
    me._categoryMap = {};
    me._categories.forEach(function (category) {
      me._categoryMap[category.id] = category;
    });
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get decorations() {
    return this._decorations;
  }

  /**
   * 自定义装饰品信息，装饰品用于自定义贴图。
   * @param value
   */
  set decorations(value) {
    let me = this;
    me._decorations = value;
    me._invalidateDecorationFlag = true;
    me.invalidateProperties();
  }

  get title() {
    return this._title;
  }

  /**
   * 自定义中心区的名称。
   * @param value
   */
  set title(value) {
    let me = this;
    me._title = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get labelFunction() {
    return this._labelFunction;
  }

  /**
   * 名称函数，用于获取标签的名称。
   * @param value
   */
  set labelFunction(value) {
    let me = this;
    me._labelFunction = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get sizeFunction() {
    return this._sizeFunction;
  }

  /**
   * 尺寸函数，用于获取标签的尺寸权重，并据此断定标签的大小。
   * @param value
   */
  set sizeFunction(value) {
    let me = this;
    me._sizeFunction = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get categoryFunction() {
    return this._categoryFunction;
  }

  /**
   * 分类函数，用于获取标签的分类，并据此判定如何绘制。
   * @param value
   */
  set categoryFunction(value) {
    let me = this;
    me._categoryFunction = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get distanceFunction() {
    return this._distanceFunction;
  }

  /**
   * 距离函数，用于获取标签的距离权重，并据此判定是远离中心还是靠近中心。
   * @param value
   */
  set distanceFunction(value) {
    let me = this;
    me._distanceFunction = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get minRadius() {
    return this._minRadius;
  }

  /**
   * 标签的最小半径。
   * @param value
   */
  set minRadius(value) {
    let me = this;
    me._minRadius = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get maxRadius() {
    return this._maxRadius;
  }

  /**
   * 标签的最大半径。
   * @param value
   */
  set maxRadius(value) {
    let me = this;
    me._maxRadius = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get minFontSize() {
    return this._minFontSize;
  }

  /**
   * 标签的最小文字尺寸。
   * @param value
   */
  set minFontSize(value) {
    let me = this;
    me._minFontSize = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get maxFontSize() {
    return this._maxFontSize;
  }

  /**
   * 标签的最大文字尺寸。
   * @param value
   */
  set maxFontSize(value) {
    let me = this;
    me._maxFontSize = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get collisionPadding() {
    return this._collisionPadding;
  }

  /**
   * 标签间扩散距离的填充，可影响疏密度。
   * @param value
   */
  set collisionPadding(value) {
    let me = this;
    me._collisionPadding = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  get minCollisionRadius() {
    return this._minCollisionRadius;
  }

  /**
   * 标签间的最小扩散距离，可影响疏密度。
   * @param value
   */
  set minCollisionRadius(value) {
    let me = this;
    me._minCollisionRadius = value;
    me._invalidateStyleFlag = true;
    me.invalidateProperties();
  }

  set mousehover(fn) {
    this.mousehoverFn = fn;
    this.invalidateProperties();
  }

  set click(fn) {
    this.clickFn = fn;
    this.invalidateProperties();
  }

  // //
  // 内部逻辑
  // //

  commitProperties() {
    let me = this;

    if (me._invalidateDataFlag) {
      me._invalidateDataFlag = false;

      // 预处理
      let data = me._data;
      let minSize = d3.min(data, me.sizeFunction);
      let maxSize = d3.max(data, me.sizeFunction);
      me._radiusScale.domain([minSize, maxSize]);
      me._fontSizeScale.domain([minSize, maxSize]);
      // me._distanceScale = d3.scaleLinear().range([100, (me._width - 400) / 2 - 100]);

      data.forEach((d) => {
        d.fr = Math.max(me.minCollisionRadius, me._radiusScale(me.sizeFunction(d)));
      });

      me._force.stop();
      me._force = d3.forceSimulation();
      me._force.nodes(data)
        .force('r', d3.forceRadial(function (d) {
          return d.distance == 1 ? 100 : 290;
        }))
        .on('tick', () => me._force_tickHandler())
        .on('end', () => {
        });

      // 视图准备
      let d3VertexGroup = me._d3VertexGroup;
      d3VertexGroup.selectAll('.vertex').remove();

      let d3Vertices = d3VertexGroup.selectAll('.vertex')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'vertex')
        .style('cursor', 'pointer');
      me._d3Vertices = d3Vertices;

      d3Vertices.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10)
        .attr('fill', '#FF0000')
        .attr('stroke', '#00FF00');

      d3Vertices.append('text')
        .attr('text-anchor', 'middle')
        // .attr('alignment-baseline', 'middle')
        .attr('alignment-baseline', 'hanging')
        .text(me.labelFunction)
        .style('font-size', 12)
        .attr('y', 5)
        .attr('fill', '#FF0000');

      // 入场动画
      me._appearMain();

      me._invalidateStyleFlag = true;
    }

    if (me._invalidateDecorationFlag) {
      me._invalidateDecorationFlag = false;

      let d3DecorationGroup = me._d3DecorationGroup;
      d3DecorationGroup.selectAll('.decoration').remove();

      let d3Decorations = d3DecorationGroup.selectAll('.decoration')
        .data(me._decorations)
        .enter()
        .append('g')
        .attr('class', 'decoration');
      me._d3Decorations = d3Decorations;

      d3Decorations.append('image')
        .attr('href', (d) => d.path)
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y);

      // 入场动画
      me._appearDecorations();
    }

    if (me._invalidateStyleFlag) {
      me._invalidateStyleFlag = false;

      // 预处理
      let radiusScale = me._radiusScale.range([me.minRadius, me.maxRadius]);
      let fontSizeScale = me._fontSizeScale.range([me.minFontSize, me.maxFontSize]);
      // let distanceScale =
      // me._distanceScale.range([100, (me._width - 400) / 2 - 100]);

      // 更新视图样式
      let d3Vertices = me._d3Vertices;

      d3Vertices.each(function (d) {
        let d3This = d3.select(this);

        let size = me.sizeFunction(d);
        let radius = me._radiusScale(size);
        let fontSize = me._fontSizeScale(size);
        // console.log("size-----"+size);
        // console.log("radius-----"+radius);
        let category = me._categoryMap[me.categoryFunction(d)];
        if (!category) category = me._defaultCategory;

        d3This.select('text')
          // .attr('y', fontSize / 2 + 2)
          .attr('font-size', fontSize)
          .attr('fill', category.textFill);

        me._d3Title.text(me._title)
          .attr('fill', '#1abba1')
          .style('font-size', '25px');

        d3This.select('circle')
          .attr('r', radius)
          .attr('cx', 0)
          // .attr('cy', 0)
          .attr('cy', -radius)
          .attr('fill', category.fill)
          .attr('fill-opacity', category.fillOpacity)
          .attr('stroke', category.stroke)
          .attr('stroke-opacity', category.strokeOpacity)
          .attr('stroke-width', category.strokeWidth)
          .on('mouseover', function (d) {
            me.mousehoverFn(d);
          })
          .on('mouseout', function (d) {
            me.mousehoverFn(d, true);
          })
          .on('click', function (d) {
            me.clickFn(d);
          });
      });
    }
  }

  updateDisplayList() {
    let me = this;

    let domElement = me._domElement;
    let parentElement = domElement.parentNode;

    let width = me._width;
    if (!isFinite(width) && parentElement) width = parentElement.clientWidth;
    let height = me._height;
    if (!isFinite(height) && parentElement) height = parentElement.clientHeight;

    me._explicitWidth = width;
    me._explicitHeight = height;

    let d3Svg = me._d3Svg;
    d3Svg.attr('width', width)
      .attr('height', height);

    let d3MainGroup = me._d3MainGroup;
    d3MainGroup.attr('transform', ['translate(', width / 2, ',', height / 2, ')'].join(''));
  }

  _force_tickHandler() {
    let me = this;
    me._d3Vertices.each(me._gravity(me._force.alpha() * 0.1))
      .each(me._collide(me._jitter))
      .attr('transform', function (d) {
        return ['translate(', d.x, ',', d.y, ')'].join('');
      });
  }

  _gravity(a) {
    // let me = this;

    // let width = me._explicitWidth;
    // if (!isFinite(width)) width = 0;
    // let height = me._explicitHeight;
    // if (!isFinite(height)) height = 0;

    // let cx = width / 2;
    // let cy = height / 2;
    let cx = 0;
    let cy = 0;
    let ax = a / 4;
    let ay = a;

    return function (d) {
      d.x += (cx - d.x) * ax;
      d.y += (cy - d.y) * ay;
    };
  }

  _collide(j) {
    let me = this;

    let data = me._data;
    let collisionPadding = me.collisionPadding;

    return function (d) {
      data.forEach(function (d2) {
        if (d !== d2) {
          let x = d.x - d2.x;
          let y = d.y - d2.y;
          let dis = Math.sqrt(x * x + y * y);
          let minDis = d.fr + d2.fr + collisionPadding;
          if (dis < minDis) {
            dis = (dis - minDis) / dis * j;
            let mx = x * dis;
            let my = y * dis;
            d.x -= mx;
            d.y -= my;
            d2.x += mx;
            d2.y += my;
          }
        }
      });
    };
  }

  _appearMain(speed) {
    speed = !isFinite(speed) || 1;

    let me = this;

    let d3Vertices = me._d3Vertices;
    if (d3Vertices) {
      d3Vertices.attr('opacity', 0)
        .transition()
        .duration(800 * speed)
        .delay(function (d, i) {
          return 50 * i;
        })
        .tween('vertex.appear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', t);
          };
        });
    }

    let d3Title = me._d3Title;
    if (d3Title) {
      d3Title.attr('opacity', 0)
        .attr('transform', 'scale(0)')
        .transition()
        .duration(800 * speed)
        .delay(100)
        .tween('title.appear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', t)
              .attr('transform', ['scale(', t, ')'].join(''));
          };
        });
    }
  }

  _appearDecorations(speed) {
    speed = !isFinite(speed) || 1;

    let me = this;

    let d3Decorations = me._d3Decorations;
    if (d3Decorations) {
      d3Decorations.attr('opacity', 0)
        .attr('transform', 'scale(0)')
        .transition()
        .duration(800 * speed)
        .delay(function (d, i) {
          return 150 * i;
        })
        .tween('decoration.appear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', t)
              .attr('transform', ['scale(', t, ')'].join(''));
          };
        });
    }
  }

  _disappearMain(speed) {
    speed = !isFinite(speed) || 1;

    let me = this;

    let d3Vertices = me._d3Vertices;
    if (d3Vertices) {
      d3Vertices.attr('opacity', 1)
        .transition()
        .duration(800 * speed)
        .delay(function (d, i) {
          return 10 * i;
        })
        .tween('vertex.disappear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', 1 - t);
          };
        });
    }

    let d3Title = me._d3Title;
    if (d3Title) {
      d3Title.attr('opacity', 0)
        .attr('transform', 'scale(1)')
        .transition()
        .duration(800 * speed)
        .tween('title.disappear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', 1 - t)
              .attr('transform', ['scale(', 1 - t, ')'].join(''));
          };
        });
    }
  }

  _disappearDecorations(speed) {
    speed = !isFinite(speed) || 1;

    let me = this;

    let d3Decorations = me._d3Decorations;
    if (d3Decorations) {
      d3Decorations.attr('opacity', 1)
        .attr('transform', 'scale(1)')
        .transition()
        .duration(800 * speed)
        .delay(function (d, i) {
          return 50 * i;
        })
        .tween('decoration.disappear', function (d) {
          let d3Element = d3.select(this);
          return function (t) {
            d3Element.attr('opacity', 1 - t)
              .attr('transform', ['scale(', 1 - t, ')'].join(''));
          };
        });
    }
  }

  // //
  // 公开接口
  // //

  /**
   * 改变尺寸，如不指定宽高，则自动使用父容器的宽高。
   * @param w
   * @param h
   */
  resize(w, h) {
    this.width = w;
    this.height = h;
  }

  appear(speed) {
    let me = this;
    me._appearMain(speed);
    me._appearDecorations(speed);
  }

  disappear(speed) {
    let me = this;
    me._disappearMain(speed);
    me._disappearDecorations(speed);
  }
}

export default EllipseForceDirectedTagCloud;
