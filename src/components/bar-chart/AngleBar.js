import React from 'react';
import * as d3 from 'd3';
import uuid from 'uuid';
import img from './img/map.png';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '--',
      data: [30, 50, 60, 22, 18]
    };
    this.arr = [30, 50, 60, 22, 18];
    this.width = props.width || 445;
    this.height = props.height || 222;
    this.unitWidth = 27;
    this.circleThick = 10;
    this.circleHeight = this.height - (this.unitWidth + this.circleThick);
    this.viewWidth = 120;
    this.arc = d3.arc;
    this.fontSizeBar = 20;
    this.fontSizeAxis = 14;
  }

  setData(d) {
    this.lock = true;
    this.setState({
      data: d.data,
      title: d.name
    });
  }

  createCircle(r, t) {
    let path = this.arc()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .innerRadius(r)
      .outerRadius(r + t);
    return path();
  }

  componentDidUpdate() {
    if (!this.lock) {
      return false;
    }
    this.refs.box.innerHTML = '';
    const me = this;
    let svg = d3.select(this.refs.box)
      .append('svg')
      .attr('width', me.width)
      .attr('height', me.height);

    let bgBoxId = this.colorX(svg, ['#136cb8', '#9be0fa']);

    let r = me.circleHeight - me.viewWidth;
    let R = me.circleHeight - 60;
    let bgR = me.circleHeight;
    let g = svg.append('g').attr('transform', `translate(${me.width / 2},${me.height})`);
    const min = Math.min(...this.state.data);
    const max = Math.max(...this.state.data);
    const minHeight = 20;
    let scale = d3.scaleLinear().domain([min, max]).range([minHeight, R - r]);

    const piceAngle = Math.PI / (me.state.data.length * 2 - 1);
    const piceAngleHalf = piceAngle * 2;

    let bgBox = g.append('g').selectAll('g')
      .data([1, 2, 3, 4, 5, 6, 7])
      .enter()
      .append('g');

    bgBox.append('path')
      .attr('d', function (d, i) {
        if (i == 0) {
          return me.createCircle(me.circleHeight - me.circleThick, me.circleThick);
        }
        if (i == 4) {
          return me.createCircle(r - 3, 1);
        }
        if (i == 5) {
          return `M${-me.circleHeight + me.circleThick},0 H${-r} v-2 H${-me.circleHeight + me.circleThick}`;
        }
        if (i == 6) {
          return `M${r},0 H${me.circleHeight - me.circleThick} v-2 H${r}`;
        }
        return [
          `M${-me.circleHeight + me.circleThick + 25 * i},0 `,
          `A${bgR / 2},${bgR / 2} 1 0,1 ${me.circleHeight - me.circleThick - 25 * i},0`
        ].join('');
      })
      .attr('stroke-width', 2)
      .attr('stroke', function (d, i) {
        if (i == 0) {
          return 'none';
        }
        return '#dbf3fb';
      })
      .attr('fill', function (d, i) {
        if (i == 0) {
          return `url(#${bgBoxId})`;
        }
        return 'rgba(210,210,210,.1)';
      });

    let bar = g.append('g').selectAll('g')
      .data(me.state.data)
      .enter()
      .append('g');

    // 小
    bar
      .append('path')
      .attr('class', 'bbb')
      .attr('d', function (d, i) {
        return [
          `M${-r * Math.cos(i * piceAngleHalf)},${-r * Math.sin(i * piceAngleHalf)} `,
          `L${-(r) * Math.cos(i * piceAngleHalf)},${-(r) * Math.sin(i * piceAngleHalf)} `,
          `L${-(r) * Math.cos(i * piceAngleHalf + piceAngle)},${-(r) * Math.sin(i * piceAngleHalf + piceAngle)} `,
          `L${-r * Math.cos(i * piceAngleHalf + piceAngle)},${-r * Math.sin(i * piceAngleHalf + piceAngle)}Z`
        ].join('');
      })
      .style('stroke', function (d, i) {
        return '#30d1c6';
      })
      .style('stroke-width', '3px')
      .attr('fill', 'rgba(48,209,198,0.5)')
      .transition()
      .duration(1500)
      .attr('d', function (d, i) {
        return [
          `M${-r * Math.cos(i * piceAngleHalf)},${-r * Math.sin(i * piceAngleHalf)} `,
          `L${-(scale(d) + r) * Math.cos(i * piceAngleHalf)},${-(scale(d) + r) * Math.sin(i * piceAngleHalf)} `,
          `L${-(scale(d) + r) * Math.cos(i * piceAngleHalf + piceAngle)},${-(scale(d) + r) * Math.sin(i * piceAngleHalf + piceAngle)} `,
          `L${-r * Math.cos(i * piceAngleHalf + piceAngle)},${-r * Math.sin(i * piceAngleHalf + piceAngle)}Z`
        ].join('');
      });

    // text
    bar.append('text')
      .attr('class', 'ccc')
      .text(function (d, i) {
        return d + '%';
      }).style('fill', '#000')
      .style('font-size', me.fontSizeBar)
      .style('text-anchor', 'middle')
      .style('opacity', 0)
      .attr('x', function (d, i) {
        // if (i == 0) {
        //   return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + 2 * piceAngle);
        // }

        // if (i == 7) {
        //   return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + 3 * piceAngle);
        // }

        return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('y', function (d, i) {
        // if (i == 0) {
        //   return -(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2);
        // }
        return -(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('transform', function (d, i) {
        return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
      })
      .transition()
      .delay(1000)
      .style('opacity', 0);

    // bg
    bar
      .append('g')
      .attr('class', 'aaa')
      .append('path')
      .attr('d', function (d, i) {
        return [
          `M${-r * Math.cos(i * piceAngleHalf - piceAngle / 2)},${-r * Math.sin(i * piceAngleHalf - piceAngle / 2)} `,
          `L${(-bgR) * Math.cos(i * piceAngleHalf - piceAngle / 2)},${-bgR * Math.sin(i * piceAngleHalf - piceAngle / 2)} `,
          `L${(-bgR) * Math.cos(i * piceAngleHalf + piceAngle + piceAngle / 2)},${-bgR * Math.sin(i * piceAngleHalf + piceAngle + piceAngle / 2)} `,
          `L${-r * Math.cos(i * piceAngleHalf + piceAngle + piceAngle / 2)},${-r * Math.sin(i * piceAngleHalf + piceAngle + piceAngle / 2)}Z`
        ].join('');
      })
      .attr('fill', 'rgba(32,83,210,0.2)')
      .style('opacity', 0)
      .on('mouseover', function (d, i) {
        d3.select(this).style('opacity', 1);
        d3.selectAll('.bbb').style('stroke', function (m, j) {
          if (j == i) {
            return '#fdcb30';
          } else {
            return '#30d1c6';
          }
        }).attr('fill', function (m, j) {
          if (j == i) {
            return 'rgba(253,203,48,0.5)';
          }
          return 'rgba(48,209,198,0.5)';
        });
        d3.selectAll('.ccc').style('opacity', function (m, j) {
          if (j == i) {
            return 1;
          } else {
            return 0;
          }
        });
      })
      .on('mouseout', function (d, i) {
        d3.selectAll('.aaa').selectAll('path').style('opacity', 0);
        d3.selectAll('.bbb').style('stroke', '#30d1c6').attr('fill', 'rgba(48,209,198,0.5)');
        d3.selectAll('.ccc').style('opacity', 0);
      });

    // text-unit
    let unit = ['资产', '利润总', '速动率', '存货', '销售收'];
    let unit2 = ['负债率', '额增长率', '', '周转率', '入增长率'];
    bar
      .append('text')
      .text(function (d, i) {
        return unit[i];
      })
      .style('fill', '#000')
      .style('font-size', me.fontSizeAxis)
      .style('text-anchor', 'middle')
      .attr('x', function (d, i) {
        return -(bgR + 25) * Math.cos(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('y', function (d, i) {
        return -(bgR + 25) * Math.sin(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('transform', function (d, i) {
        return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(bgR + 25) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(bgR + 25) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
      });

    bar
      .append('text')
      .text(function (d, i) {
        return unit2[i];
      })
      .style('fill', '#000')
      .style('font-size', me.fontSizeAxis)
      .style('text-anchor', 'middle')
      .attr('x', function (d, i) {
        return -(bgR + 5) * Math.cos(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('y', function (d, i) {
        return -(bgR + 5) * Math.sin(i * piceAngleHalf + piceAngle / 2);
      })
      .attr('transform', function (d, i) {
        return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(bgR + 5) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(bgR + 5) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
      });
    me.lock = false;
  }

  // componentDidMount() {
  //   this.refs.box.innerHTML = '';
  //   const me = this;
  //   let svg = d3.select(this.refs.box)
  //     .append('svg')
  //     .attr('width', me.width)
  //     .attr('height', me.height);

  //   let bgBoxId = this.colorX(svg, ['#136cb8', '#9be0fa']);

  //   let r = me.circleHeight - me.viewWidth;
  //   let R = me.circleHeight - 60;
  //   let bgR = me.circleHeight;
  //   let g = svg.append('g').attr('transform', `translate(${me.width / 2},${me.height})`);
  //   const min = Math.min(...this.state.data);
  //   const max = Math.max(...this.state.data);
  //   const minHeight = 20;
  //   let scale = d3.scaleLinear().domain([min, max]).range([minHeight, R - r]);

  //   const piceAngle = Math.PI / (me.state.data.length * 2 - 1);
  //   const piceAngleHalf = piceAngle * 2;

  //   let bgBox = g.append('g').selectAll('g')
  //     .data([1, 2, 3, 4, 5, 6, 7])
  //     .enter()
  //     .append('g');

  //   bgBox.append('path')
  //     .attr('d', function (d, i) {
  //       if (i == 0) {
  //         return me.createCircle(me.circleHeight - me.circleThick, me.circleThick);
  //       }
  //       if (i == 4) {
  //         return me.createCircle(r - 3, 1);
  //       }
  //       if (i == 5) {
  //         return `M${-me.circleHeight + me.circleThick},0 H${-r} v-2 H${-me.circleHeight + me.circleThick}`;
  //       }
  //       if (i == 6) {
  //         return `M${r},0 H${me.circleHeight - me.circleThick} v-2 H${r}`;
  //       }
  //       return [
  //         `M${-me.circleHeight + me.circleThick + 25 * i},0 `,
  //         `A${bgR / 2},${bgR / 2} 1 0,1 ${me.circleHeight - me.circleThick - 25 * i},0`
  //       ].join('');
  //     })
  //     .attr('stroke-width', 2)
  //     .attr('stroke', function (d, i) {
  //       if (i == 0) {
  //         return 'none';
  //       }
  //       return '#dbf3fb';
  //     })
  //     .attr('fill', function (d, i) {
  //       if (i == 0) {
  //         return `url(#${bgBoxId})`;
  //       }
  //       return 'rgba(210,210,210,.1)';
  //     });

  //   let bar = g.append('g').selectAll('g')
  //     .data(me.state.data)
  //     .enter()
  //     .append('g');

  //   // 小
  //   bar
  //     .append('path')
  //     .attr('class', 'bbb')
  //     .attr('d', function (d, i) {
  //       return [
  //         `M${-r * Math.cos(i * piceAngleHalf)},${-r * Math.sin(i * piceAngleHalf)} `,
  //         `L${-(r) * Math.cos(i * piceAngleHalf)},${-(r) * Math.sin(i * piceAngleHalf)} `,
  //         `L${-(r) * Math.cos(i * piceAngleHalf + piceAngle)},${-(r) * Math.sin(i * piceAngleHalf + piceAngle)} `,
  //         `L${-r * Math.cos(i * piceAngleHalf + piceAngle)},${-r * Math.sin(i * piceAngleHalf + piceAngle)}Z`
  //       ].join('');
  //     })
  //     .style('stroke', function (d, i) {
  //       return '#30d1c6';
  //     })
  //     .style('stroke-width', '3px')
  //     .attr('fill', 'rgba(48,209,198,0.5)')
  //     .transition()
  //     .duration(1500)
  //     .attr('d', function (d, i) {
  //       return [
  //         `M${-r * Math.cos(i * piceAngleHalf)},${-r * Math.sin(i * piceAngleHalf)} `,
  //         `L${-(scale(d) + r) * Math.cos(i * piceAngleHalf)},${-(scale(d) + r) * Math.sin(i * piceAngleHalf)} `,
  //         `L${-(scale(d) + r) * Math.cos(i * piceAngleHalf + piceAngle)},${-(scale(d) + r) * Math.sin(i * piceAngleHalf + piceAngle)} `,
  //         `L${-r * Math.cos(i * piceAngleHalf + piceAngle)},${-r * Math.sin(i * piceAngleHalf + piceAngle)}Z`
  //       ].join('');
  //     });

  //   // text
  //   bar.append('text')
  //     .attr('class', 'ccc')
  //     .text(function (d, i) {
  //       return d + '%';
  //     }).style('fill', '#000')
  //     .style('font-size', me.fontSizeBar)
  //     .style('text-anchor', 'middle')
  //     .style('opacity', 0)
  //     .attr('x', function (d, i) {
  //       // if (i == 0) {
  //       //   return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + 2 * piceAngle);
  //       // }

  //       // if (i == 7) {
  //       //   return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + 3 * piceAngle);
  //       // }

  //       return -(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('y', function (d, i) {
  //       // if (i == 0) {
  //       //   return -(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2);
  //       // }
  //       return -(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('transform', function (d, i) {
  //       return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(scale(d) + r + 20) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(scale(d) + r + 20) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
  //     })
  //     .transition()
  //     .delay(1000)
  //     .style('opacity', 0);

  //   // bg
  //   bar
  //     .append('g')
  //     .attr('class', 'aaa')
  //     .append('path')
  //     .attr('d', function (d, i) {
  //       return [
  //         `M${-r * Math.cos(i * piceAngleHalf - piceAngle / 2)},${-r * Math.sin(i * piceAngleHalf - piceAngle / 2)} `,
  //         `L${(-bgR) * Math.cos(i * piceAngleHalf - piceAngle / 2)},${-bgR * Math.sin(i * piceAngleHalf - piceAngle / 2)} `,
  //         `L${(-bgR) * Math.cos(i * piceAngleHalf + piceAngle + piceAngle / 2)},${-bgR * Math.sin(i * piceAngleHalf + piceAngle + piceAngle / 2)} `,
  //         `L${-r * Math.cos(i * piceAngleHalf + piceAngle + piceAngle / 2)},${-r * Math.sin(i * piceAngleHalf + piceAngle + piceAngle / 2)}Z`
  //       ].join('');
  //     })
  //     .attr('fill', 'rgba(32,83,210,0.2)')
  //     .style('opacity', 0)
  //     .on('mouseover', function (d, i) {
  //       d3.select(this).style('opacity', 1);
  //       d3.selectAll('.bbb').style('stroke', function (m, j) {
  //         if (j == i) {
  //           return '#fdcb30';
  //         } else {
  //           return '#30d1c6';
  //         }
  //       }).attr('fill', function (m, j) {
  //         if (j == i) {
  //           return 'rgba(253,203,48,0.5)';
  //         }
  //         return 'rgba(48,209,198,0.5)';
  //       });
  //       d3.selectAll('.ccc').style('opacity', function (m, j) {
  //         if (j == i) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //     })
  //     .on('mouseout', function (d, i) {
  //       d3.selectAll('.aaa').selectAll('path').style('opacity', 0);
  //       d3.selectAll('.bbb').style('stroke', '#30d1c6').attr('fill', 'rgba(48,209,198,0.5)');
  //       d3.selectAll('.ccc').style('opacity', 0);
  //     });

  //   // text-unit
  //   let unit = ['资产', '利润总', '速动率', '存货', '销售收'];
  //   let unit2 = ['负债率', '额增长率', '', '周转率', '入增长率'];
  //   bar
  //     .append('text')
  //     .text(function (d, i) {
  //       return unit[i];
  //     })
  //     .style('fill', '#000')
  //     .style('font-size', me.fontSizeAxis)
  //     .style('text-anchor', 'middle')
  //     .attr('x', function (d, i) {
  //       return -(bgR + 25) * Math.cos(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('y', function (d, i) {
  //       return -(bgR + 25) * Math.sin(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('transform', function (d, i) {
  //       return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(bgR + 25) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(bgR + 25) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
  //     });

  //   bar
  //     .append('text')
  //     .text(function (d, i) {
  //       return unit2[i];
  //     })
  //     .style('fill', '#000')
  //     .style('font-size', me.fontSizeAxis)
  //     .style('text-anchor', 'middle')
  //     .attr('x', function (d, i) {
  //       return -(bgR + 5) * Math.cos(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('y', function (d, i) {
  //       return -(bgR + 5) * Math.sin(i * piceAngleHalf + piceAngle / 2);
  //     })
  //     .attr('transform', function (d, i) {
  //       return `rotate(${-(Math.PI / 2 - i * piceAngleHalf - piceAngle / 2) * 180 / Math.PI},${-(bgR + 5) * Math.cos(i * piceAngleHalf + piceAngle / 2)} ${-(bgR + 5) * Math.sin(i * piceAngleHalf + piceAngle / 2)})`;
  //     });
  //   me.lock = false;
  // }

  colorY(svg, color) {
    let id = uuid.v4();
    let linear = svg.append('defs').append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    for (let i = 0; i < color.length; i++) {
      let rate = i == 0 ? 10 : 100;
      linear.append('stop')
        .attr('offset', rate + '%')
        .style('stop-color', color[i]);
    }
    return id;
  }

  colorX(svg, color) {
    let id = uuid.v4();
    let linear = svg.append('defs').append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    for (let i = 0; i < color.length; i++) {
      let rate = i == 0 ? 10 : 100;
      linear.append('stop')
        .attr('offset', rate + '%')
        .style('stop-color', color[i]);
    }
    return id;
  }

  showDialog() {
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <div ref={'box'} style={{position: 'absolute', top: 60, left: 110}}>
        </div>
        <img src={img} style={{position: 'absolute', zIndex: -1, top: 133, left: 175}} />
        <p onClick={this.showDialog.bind(this)} style={{position: 'absolute', top: 60, left: 30, color: '#1482c8', fontSize: 18, fontWeight: 'bold', borderBottom: '1px solid', cursor: 'pointer'}}>{this.state.title || '--'}</p>
      </div>
    );
  }
};

export default Page;
