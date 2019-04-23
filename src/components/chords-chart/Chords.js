import React from 'react';
import * as d3 from 'd3';

const outerColor = ['#fbaa35', '#fed52f', '#37e3d7', '#75defc', '#4aabfc', '#1682fb', '#b860ef', '#e55db0', '#fa5e78', '#fbaa35', '#fed52f', '#37e3d7', '#75defc', '#4aabfc', '#1682fb', '#b860ef', '#e55db0', '#fa5e78'];

const innerColor = ['rgba(50,255,254,.3)', 'rgba(74,171,252,.3)', 'rgba(254,203,47,.3)'];

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '--',
      dataName: ['项目1', '项目2', '项目3', '项目4', '北京', '上海', '广州'],
      city: ['北京', '上海', '广州'],
      obj: ['项目1', '项目2', '项目3', '项目4'],
      data: [
        [0, 0, 0, 0, 1, 2, 7],
        [0, 0, 0, 0, 3, 3, 4],
        [0, 0, 0, 0, 5, 1, 4],
        [0, 0, 0, 0, 7, 2, 1],
        [2.5, 2.5, 2.5, 2.5, 0, 0, 0],
        [2.5, 2.5, 2.5, 2.5, 0, 0, 0],
        [2.5, 2.5, 2.5, 2.5, 0, 0, 0]
      ]
    };
    this.width = props.width || 445;
    this.height = props.height || 240;
    this.arc = d3.arc;
  }

  setData(d) {
    this.lock = true;
    this.setState({
      dataName: d.dataName,
      city: d.city,
      obj: d.obj,
      data: d.data,
      name: d.name
    });
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
    let R = this.height / 2 - 30;
    let r = R - 15;
    let g = svg.append('g')
      .attr('transform', `translate(${me.width / 2},${me.height / 2})`);
    let layout = d3.chord()
      .padAngle(Math.PI / 180 * 5)
      .sortSubgroups(d3.ascending);
    let tempData = layout(me.state.data);
    let chordData = tempData.slice(0, -1);
    let length = me.state.dataName.length;
    let outerChord = g.append('g')
      .selectAll('g')
      .data(me.state.dataName)
      .enter()
      .append('g');
    outerChord.append('path')
      .attr('d', function (d, i) {
        return me.creatArc(R, r, 2 * Math.PI * i / length, 2 * Math.PI * (i + 1) / length - 5 * Math.PI / 180);
      })
      .attr('fill', function (d, i) {
        return outerColor[i];
      });

    outerChord.append('text')
      .text(function (d, i) {
        return d.slice(0, 3);
      })
      .style('fill', '#6c7987')
      .style('font-size', 14)
      .style('text-anchor', 'middle')
      .attr('x', function (d, i) {
        return (R + 20) * Math.sin(2 * Math.PI * i / length + Math.PI / length);
      })
      .attr('y', function (d, i) {
        return -(R + 20) * Math.cos(2 * Math.PI * i / length + Math.PI / length);
      })
      .on('click', function (d, i) {
        if (!me.props.onClick) {
          return false;
        }
        me.props.onClick(d);
      });

    let chordPath = d3.ribbon()
      .radius(r);
    let innerChord = g.append('g')
      .selectAll('g')
      .data(chordData)
      .enter()
      .append('g');
    innerChord.append('path')
      .attr('d', function (d, i) {
        // let source = me.state.dataName[d.source.index];
        // if (source == '北京' || source == '上海' || source == '广州') {
        //   return false;
        // }
        return chordPath(d);
      })
      .attr('fill', function (d, i) {
        return innerColor[~~(3 * Math.random())];
      })
      .on('mouseover', function (d, i) {
        let temp1 = me.state.dataName[d.target.index]; // 城市
        let temp2 = me.state.dataName[d.source.index]; // 项目
        let value1 = d.source.value;
        let value2 = d.target.value;
        if (!me.mouseSite) {
          return false;
        }
        if (me.state.city.indexOf(temp1) < 0) {
          me.refs.tooltipRef.innerText = temp2 + ': 有' + temp1 + ' ' + value2 + '个';
        } else if (me.state.city.indexOf(temp2) < 0) {
          me.refs.tooltipRef.innerText = temp1 + ': 有' + temp2 + ' ' + value1 + '个';
        }
        me.refs.tooltipRef.style.opacity = 1;
        me.refs.tooltipRef.style.top = 360 + me.mouseSite.y + 20 + 'px';
        me.refs.tooltipRef.style.left = 120 + me.mouseSite.x + 20 + 'px';
      })
      .on('mouseout', function (d, i) {
        me.refs.tooltipRef.style.opacity = 0;
      });
    me.lock = false;
  }

  // componentDidMount() {
  //   const me = this;
  //   // me.refs.box.onmousemove = (e) => {
  //   //   let x = e.offsetX;
  //   //   let y = e.offsetY;
  //   //   me.mouseSite = {x, y};
  //   // };
  //   let svg = d3.select(this.refs.box)
  //     .append('svg')
  //     .attr('width', me.width)
  //     .attr('height', me.height);
  //   let R = this.height / 2 - 30;
  //   let r = R - 15;
  //   let g = svg.append('g')
  //     .attr('transform', `translate(${me.width / 2},${me.height / 2})`);
  //   let layout = d3.chord()
  //     .padAngle(Math.PI / 180 * 5)
  //     .sortSubgroups(d3.ascending);
  //   let tempData = layout(me.state.data);
  //   // console.log(tempData);
  //   let chordData = tempData.slice(0, -1);
  //   let length = me.state.dataName.length;
  //   let outerChord = g.append('g')
  //     .selectAll('g')
  //     .data(me.state.dataName)
  //     .enter()
  //     .append('g');
  //   outerChord.append('path')
  //     .attr('d', function (d, i) {
  //       return me.creatArc(R, r, 2 * Math.PI * i / length, 2 * Math.PI * (i + 1) / length - 5 * Math.PI / 180);
  //     })
  //     .attr('fill', function (d, i) {
  //       return outerColor[i];
  //     });

  //   outerChord.append('text')
  //     .text(function (d, i) {
  //       return d;
  //     })
  //     .style('fill', '#6c7987')
  //     .style('font-size', 14)
  //     .style('text-anchor', 'middle')
  //     .attr('x', function (d, i) {
  //       return (R + 20) * Math.sin(2 * Math.PI * i / length + Math.PI / length);
  //     })
  //     .attr('y', function (d, i) {
  //       return -(R + 20) * Math.cos(2 * Math.PI * i / length + Math.PI / length);
  //     });

  //   let chordPath = d3.ribbon()
  //     .radius(r);
  //   let innerChord = g.append('g')
  //     .selectAll('g')
  //     .data(chordData)
  //     .enter()
  //     .append('g');
  //   innerChord.append('path')
  //     .attr('d', function (d, i) {
  //       // let source = me.state.dataName[d.source.index];
  //       // if (source == '北京' || source == '上海' || source == '广州') {
  //       //   return false;
  //       // }
  //       return chordPath(d);
  //     })
  //     .attr('fill', function (d, i) {
  //       return innerColor[~~(3 * Math.random())];
  //     })
  //     .on('mouseover', function (d, i) {
  //       console.log(d, i);
  //       let temp1 = me.state.dataName[d.target.index]; // 城市
  //       let temp2 = me.state.dataName[d.source.index]; // 项目
  //       let value1 = d.source.value;
  //       let value2 = d.target.value;
  //       if (!me.mouseSite) {
  //         return false;
  //       }
  //       if (me.state.city.indexOf(temp1) < 0) {
  //         me.refs.tooltipRef.innerText = temp2 + ': 有' + temp1 + ' ' + value2 + '个';
  //       } else if (me.state.city.indexOf(temp2) < 0) {
  //         me.refs.tooltipRef.innerText = temp1 + ': 有' + temp2 + ' ' + value1 + '个';
  //       }
  //       me.refs.tooltipRef.style.opacity = 1;
  //       me.refs.tooltipRef.style.top = 360 + me.mouseSite.y + 20 + 'px';
  //       me.refs.tooltipRef.style.left = 120 + me.mouseSite.x + 20 + 'px';
  //     })
  //     .on('mouseout', function (d, i) {
  //       me.refs.tooltipRef.style.opacity = 0;
  //     });
  // }

  creatArc(R, r, start, end) {
    let path = this.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end);
    return path();
  }

  render() {
    return (
      <div>
        <div ref={'box'} style={{position: 'absolute', top: 360, left: 120}}>
        </div>
        <p style={{position: 'absolute', top: 330, left: 30, color: '#1482c8', fontSize: 18, fontWeight: 'bold'}}>{this.state.name}房产项目分布情况</p>
        <div ref={'tooltipRef'} style={{
          padding: '5px 10px',
          color: '#fff',
          fontSize: 14,
          backgroundColor: 'rgba(12,44,100,.8)',
          position: 'absolute',
          opacity: 0
        }}></div>
      </div>
    );
  }
};

export default Page;
