import React from 'react';
import * as d3 from 'd3';
import './map.css';
import mapData from './china.json';
import beijing from './json/beijing.json';
import hubei from './json/wuhan.json';
import shanghai from './json/shanghai.json';
import guangdong from './json/gzsz.json';
import hunan from './json/changsha.json';
import jiangsu from './json/nanjing.json';
import jiangxi from './json/nanchang.json';
// import shandong from './json/shandong.json';
import shanxi from './json/xian.json';
import sichuan from './json/chengdu.json';
import zhejiang from './json/hangzhou.json';
import hainan from './json/sanya.json';
import guizhou from './json/guiyang.json';
import lose from './image/lose.png';
import {Timer} from '@jusfoun-vis/common';

const color = ['#1f7ccc', '#21ace1', '#69d0f4', '#c1ebfe'];

const darkColor = color.map((s, i) => {
  return d3.rgb(s).darker(2);
});

const circleColor = {
  up: '#fecb2f',
  down: '#2afd9f',
  risk: '#fa5e78'
};

const json = {
  '全国': mapData,
  '北京': beijing,
  '湖北': hubei,
  '上海': shanghai,
  '广东': guangdong,
  '湖南': hunan,
  '江苏': jiangsu,
  '江西': jiangxi,
  // '山东': shandong,
  '山西': shanxi,
  '四川': sichuan,
  '浙江': zhejiang,
  '海南': hainan,
  '贵州': guizhou
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData,
      data: [],
      width: props.width,
      height: props.height
    };
    this.width = props.width;
    this.height = props.height;
    this.top = props.top;
    this.left = props.left;
    this.cpData = [];
    // this.valueScale = d3.scaleLinear().domain([0, 100]).range([0, 100]);
  }

  setData(d) {
    const me = this;
    me.lock = true;
    let value = d.value;
    let max = Math.max.apply(null, value);
    let min = Math.min.apply(null, value);
    this.valueScale = d3.scaleLinear().range([0, 100]).domain([min, max]);
    me.setState({
      data: d.data
    });
  }

  changeMapJson(name) {
    this.lock = true;
    let data = json[name];
    if (data) {
      this.cpData = [];
      this.setState({
        mapData: data
      });
    }
  }

  componentDidUpdate() {
    if (!this.lock) {
      return false;
    }
    const me = this;
    const state = me.state;
    if (!state.data) {
      return false;
    }
    if (me.timer) {
      me.timer.stop();
    }
    if (me.timer1) {
      me.timer1.stop();
    }
    state.mapData.features.forEach((s) => {
      let name = s.properties.name;
      s.properties.value = 1;
      s.properties.type = '';
      s.properties.nameShi = '';
      state.data.forEach((k) => {
        if (name == k.name) {
          Object.assign(s.properties, k);
        }
      });
    });
    me.mapRef.innerHTML = '';
    me.drawMap({
      color: darkColor
    });
    me.drawMap({
      isText: true,
      offsetY: -10,
      color,
      up: true
    });
    me.timer.start();
    me.timer1.start();
    me.lock = false;
  }

  componentWillUnmount() {
    if (this.timer && this.timer1) {
      this.timer.stop();
      this.timer1.stop();
    }
  }

  drawMap(option) {
    const me = this;
    const state = me.state;
    const props = me.props;
    let offsetY = 0;
    let isText = false;
    let data = state.mapData;
    let color = ['#1f7ccc', '#21ace1', '#69d0f4', '#c1ebfe'];
    if (option) {
      isText = option.isText;
      offsetY = option.offsetY || 0;
      color = option.color;
    }
    let svg = d3.select(me.mapRef).append('svg')
      .attr('width', state.width)
      .attr('height', state.height)
      .style('position', 'absolute');
    let projection = d3.geoMercator()
      .fitExtent([[0, 20], [state.width, state.height]], data);

    d3.geoPath()
      .projection(projection);

    let g = svg.selectAll('g').data(data.features).enter();

    // path
    let map = g.append('g').append('path')
      .style('cursor', 'pointer')
      .attr('class', function (d) {
        return 'map' + d.id;
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('fill', function (d, i) {
        let index = 3;
        let value = me.valueScale(Number(d.properties.value));
        if (value > 90) {
          index = 0;
        } else if (value > 72) {
          index = 1;
        } else if (value > 50) {
          index = 2;
        }
        return color[index];
      })
      .attr('d', function (d, i) {
        if (option.up) {
          let temp = {};
          temp.cp = projection(d.properties.cp);
          temp.name = d.properties.name;
          me.cpData.push(temp);
        }
        let site = d.geometry.coordinates[0];
        let path = '';
        if (d.geometry.type == 'MultiPolygon') {
          site = d.geometry.coordinates;
          for (let i = 0; i < site.length; i++) {
            for (let k = 0; k < site[i][0].length; k++) {
              let dot = projection(site[i][0][k]);
              if (k === 0) {
                path += 'M' + dot[0] + ',' + (dot[1] + offsetY) + ' ';
              } else {
                path += 'L' + dot[0] + ',' + (dot[1] + offsetY) + ' ';
              }
            }
          }
          return path;
        }
        for (let i = 0; i < site.length; i++) {
          let dot = projection(site[i]);
          if (i === 0) {
            path += 'M' + dot[0] + ',' + (dot[1] + offsetY) + ' ';
          } else {
            path += 'L' + dot[0] + ',' + (dot[1] + offsetY) + ' ';
          }
        }
        return path;
      });

    if (option.up) {
      map.on('mouseover', function (d, i) {
        d3.selectAll('.map' + d.id).attr('fill', function (d, i) {
          let index = 3;
          let value = me.valueScale(Number(d.properties.value));
          if (value > 90) {
            index = 0;
          } else if (value > 72) {
            index = 1;
          } else if (value > 50) {
            index = 2;
          }
          if (i == 0) {
            return d3.rgb(darkColor[index]).darker();
          } else {
            return d3.rgb(color[index]).darker();
          }
        });
        me.isMouseIn = true;
        me.showTooltip.call(me, d);
      })
        .on('mouseout', function (d, i) {
          if (d.isclick) {
            return false;
          }
          d3.selectAll('.map' + d.id).attr('fill', function (d, i) {
            let index = 3;
            let value = me.valueScale(Number(d.properties.value));
            if (value > 90) {
              index = 0;
            } else if (value > 72) {
              index = 1;
            } else if (value > 50) {
              index = 2;
            }
            if (i == 0) {
              return darkColor[index];
            } else {
              return color[index];
            }
          });
          me.tooltipRef.classList.remove('active');
          me.isMouseIn = false;
        })
        .on('click', function (d, i) {
          let name = d.properties.name;
          if (d.properties.nameShi) {
            name = d.properties.nameShi;
          }
          me.tooltipRef.classList.remove('active');
          let isDown = json[name];
          if (props.options.changeJosn) {
            if (isDown) {
              me.hasBeDown = true;
              me.resize();
            }
            me.changeMapJson(name);
          }
          props.changeMap(name, isDown, me.hasBeDown);
          me.showTooltip.call(me, d);
          me.state.mapData.features.forEach((s) => {
            s.isclick = false;
            d3.selectAll('.map' + s.id).attr('fill', function (d, i) {
              let index = 3;
              let value = me.valueScale(Number(d.properties.value));
              if (value > 90) {
                index = 0;
              } else if (value > 72) {
                index = 1;
              } else if (value > 50) {
                index = 2;
              }
              if (i == 0) {
                return darkColor[index];
              } else {
                return color[index];
              }
            });
          });
          d.isclick = true;
          d3.selectAll('.map' + d.id).attr('fill', function (d, i) {
            let index = 3;
            let value = me.valueScale(Number(d.properties.value));
            if (value > 90) {
              index = 0;
            } else if (value > 72) {
              index = 1;
            } else if (value > 50) {
              index = 2;
            }
            if (i == 0) {
              return d3.rgb(darkColor[index]).darker();
            } else {
              return d3.rgb(color[index]).darker();
            }
          });
        });
    }

    // text
    if (isText) {
      if (props.options.lose) {
        g.append('g')
          .append('image')
          .style('pointer-events', 'none')
          .attr('x', function (d) {
            return projection(d.properties.cp)[0] - 7.5;
          })
          .attr('y', function (d) {
            return projection(d.properties.cp)[1] - 28;
          })
          .attr('xlink:href', function (d, i) {
            if (d.properties.lose) {
              return lose;
            }
            return 'none';
          });
      }
      // circle
      for (let i = 0; i < 3; i++) {
        g.append('g').append('text')
          .style('pointer-events', 'none')
          .attr('x', function (d) {
            return projection(d.properties.cp)[0];
          })
          .attr('y', function (d) {
            return projection(d.properties.cp)[1];
          })
          .attr('dy', 0)
          .text(function (d) {
            return d.properties.name;
          })
          .style('text-anchor', 'middle')
          .style('fill', '#1c2e40')
          .style('font-size', 14);
        g.append('g')
          .append('circle')
          .style('pointer-events', 'none')
          .attr('class', 'map-circle' + i)
          .attr('cx', function (d) {
            return projection(d.properties.cp)[0];
          })
          .attr('cy', function (d) {
            return projection(d.properties.cp)[1];
          })
          .attr('r', 5)
          .style('fill', function (d, i) {
            let option = d.properties;
            let color = 'none';
            if (option.type == 'up') {
              color = circleColor.up;
            } else if (option.type == 'down') {
              color = circleColor.down;
            } else if (option.type == 'risk') {
              color = circleColor.risk;
            }
            return color;
          })
          .style('cursor', 'pointer');
      }

      let r = 5;
      let timer = new Timer(100);
      let scaleOpacity = d3.scaleLinear()
        .domain([5, 20])
        .range([.8, .1]);
      timer.on('timer', function () {
        r += 1;
        if (r > 20) {
          r = 5;
        }
        d3.selectAll('.map-circle2')
          .attr('r', r)
          .style('opacity', scaleOpacity(r));
      });

      let r1 = 5;
      let timer1 = new Timer(100);
      let scaleOpacity1 = d3.scaleLinear()
        .domain([5, 15])
        .range([.8, .1]);
      timer1.on('timer', function () {
        r1 += 1;
        if (r1 > 15) {
          r1 = 5;
        }
        d3.selectAll('.map-circle1')
          .attr('r', r1)
          .style('opacity', scaleOpacity1(r1));
      });
      timer1.delay = 1000;
      me.timer = timer;
      me.timer1 = timer1;
    }
    return svg;
  }

  showTooltip(d) {
    const me = this;
    const dist = d.properties;
    const name = dist.name;
    me.tooltipRef.classList.remove('active');
    for (let i = 0; i < me.cpData.length; i++) {
      if (me.cpData[i].name == name) {
        let x = me.cpData[i].cp[0];
        let y = me.cpData[i].cp[1];
        setTimeout(() => {
          if (me.isMouseIn) {
            me.tooltipRef.classList.add('active');
          }
        }, 100);
        me.tooltipRef.style.transform = `translate(${x - 5}px,calc(-100% + ${(y - 35) * Math.cos(Math.PI / 6)}px)`;
        me.props.options.tooltip.forEach((s, i) => {
          let num = Number(dist[s.name]);
          if (num && /\./.test(num)) {
            num = num.toFixed(2);
          }
          if (num === 0) {
            num = '0';
          }
          me.refs['tooltipRef' + i].innerText = num || '--';
        });
        return false;
      }
    }
  }

  resize() {
    this.lock = true;
    this.setState({
      width: 600,
      height: 600,
      top: 180,
      left: 340
    });
  }

  backMap() {
    this.changeMapJson('全国');
    this.hasBeDown = false;
    this.lock = true;
    this.setState({
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left
    });
  }

  render() {
    const me = this;
    const props = me.props;
    const options = props.options;
    const state = me.state;
    return (
      <div style={{
        position: 'absolute',
        top: state.top || props.top,
        left: state.left || props.left,
        zIndex: 2
      }}>
        <div ref={(s) => {
          this.mapRef = s;
        }} style={{
          transform: 'rotateX(30deg)'
        }}></div>
        <div className={'map-tooltip-xf'} ref={(s) => {
          me.tooltipRef = s;
        }}>
          <div className={'map-tooltip-xf-line-wrap'}>
            <div className={'map-tooltip-xf-line'}></div>
            <div className={'map-tooltip-xf-dot'}></div>
          </div>
          <div className={'map-tooltip-xf-content-wrap'}>
            <div className={'map-tooltip-xf-content-border-left'}></div>
            <div className={'map-tooltip-xf-content-border-right'}></div>
            <div className={'map-tooltip-xf-content'}>
              {
                options.tooltip.map((s, i) => {
                  return (
                    <div key={'list' + i}>
                      <span>{options.tooltip[i].value}：</span>
                      <span><i ref={'tooltipRef' + i}>5</i></span>
                      <span>{options.tooltip[i].unit}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div >
    );
  }
};

export default Page;
