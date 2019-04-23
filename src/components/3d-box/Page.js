import React from 'react';
import './page.css';
import axis from './axis-small.png';
import * as d3 from 'd3';
import {getLocalPosition} from '@jusfoun-vis/scaler';

class Page extends React.Component {
  constructor(props) {
    super(props);
    let date = this.dealDate();
    let timeData = date.timeData;
    this.startTime = date.time;
    this.yymm = date.yymm;
    this.totalLen = timeData.length - 1;
    this.timer = null;
    this.state = {
      num: 0,
      timeData,
      count: 0,
      domBall: [],
      data: [
        {
          name: '北京',
          price: 50,
          num: '33'
        },
        {
          name: 'xxx',
          price: 50,
          num: '40'
        },
        {
          name: 'ccc',
          price: -50,
          num: '-33'
        },
        {
          name: 'zzz',
          price: 80,
          num: '-33'
        },
        {
          name: 'www',
          price: 50,
          num: '-33'
        },
        {
          name: 'fff',
          price: 30,
          num: '33'
        },
        {
          name: 'bbb',
          price: -20,
          num: '33'
        },
        {
          name: 'sss',
          price: -44,
          num: '33'
        }
      ]
    };
  }

  _setData(d) {
    this.dealData(d);
  }

  dealData(d) {
    const me = this;
    let maxPrice = d3.max(d, (s) => Math.abs(s.price));
    let minPrice = d3.min(d, (s) => Math.abs(s.price));
    let maxNum = d3.max(d, (s) => Math.abs(s.num));
    let minNum = d3.min(d, (s) => Math.abs(s.num));
    let siteScaleRrice = d3.scaleLinear()
      .range([160, 40])
      .domain([minPrice, maxPrice]);
    let siteScaleNum = d3.scaleLinear()
      .range([40, 160])
      .domain([minNum, maxNum]);
    let data = {data1: [], data2: [], data3: [], data4: []};
    (d || me.state.data).forEach((s, i) => {
      if (s.price >= 0 && s.num >= 0) {
        data.data1.push(s);
      } else if (s.price < 0 && s.num >= 0) {
        data.data2.push(s);
      } else if (s.price < 0 && s.num < 0) {
        data.data3.push(s);
      } else if (s.price >= 0 && s.num < 0) {
        data.data4.push(s);
      }
    });
    let domBall = [];
    let siteScaleZ = d3.scaleLinear()
      .range([-200, 0])
      .domain([1, 12]);
    [1, 2, 3, 4].forEach((p, t) => {
      let n = 1;
      data['data' + p].map((s, i) => {
        let x = siteScaleNum(Math.abs(s.num));
        let y = siteScaleRrice(Math.abs(s.price));
        if (i > 0) {
          if (!data['data' + p][i - 1].z) {
            data['data' + p][i - 1].z = n;
            n++;
          }
          let dataNew = data['data' + p].slice(i);
          dataNew.forEach((k, j) => {
            if (siteScaleRrice(Math.abs(k.price)) >= y && siteScaleRrice(Math.abs(k.price)) <= y && siteScaleNum(Math.abs(k.num)) >= x && siteScaleNum(Math.abs(k.num)) <= x && !k.z) {
              k.z = n;
              n++;
            }
          });
        }
      });
    });
    [1, 2, 3, 4].forEach((s) => {
      let node = <div className={'box-xf-ball-wrap'}>{
        data['data' + s].map((k, j) => {
          let x = siteScaleNum(Math.abs(k.num));
          let y = siteScaleRrice(Math.abs(k.price));
          let z = siteScaleZ(k.z || 1);
          return (
            <div key={'ball' + j} className={'box-xf-ball box-xf-ball-' + s} style={{
              transform: `translate3d(${x}px,${y}px,${z}px)`
            }}>{k.name}</div>
          );
        })
      }</div >;
      domBall.push(node);
    });
    me.setState({domBall});
  }

  dealDate(time) {
    let date = new Date();
    if (time) {
      date = new Date(time);
    }
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let dist = {timeData: [], yymm: []};
    for (let i = 0; i < 12; i++) {
      let temp = mounth - i;
      let yy = year;
      let mm = mounth - i;
      if (temp == 1) {
        temp = year + '年' + '1';
      }
      if (temp < 1) {
        temp = mounth - i + 12;
        mm = mounth - i + 12;
        yy = year - 1;
      }
      dist.timeData[11 - i] = temp + '月';
      dist.yymm[11 - i] = '' + yy + '-' + ((mm < 10) ? ('0' + mm) : mm);
    }
    dist.time = '' + year + '-' + ((mounth < 10 ? ('0' + mounth) : mounth));
    return dist;
  }

  resetDate(time) {
    let date = this.dealDate(time);
    let timeData = date.timeData;
    this.startTime = date.time;
    this.yymm = date.yymm;
    this.totalLen = timeData.length - 1;
    this.setState({
      num: 0,
      timeData,
      count: 0
    });
  }

  _timeLineClick(event) {
    let me = this;
    let minLeft = 0;
    let maxLeft = me.refs.timeLine.clientWidth;
    let nowLeft = getLocalPosition([event.pageX, event.pageY], me.refs.timeLine).x;
    let scale = (nowLeft - minLeft) / (maxLeft - minLeft);
    let index = Math.round(scale * me.totalLen);
    me._timeChange(index);
    me.setState({
      count: index
    });
    me.playTimeLine();
  }

  playTimeLine() {
    let me = this;
    clearInterval(me.timer);
    me.timer = setInterval(function () {
      let count = me.state.count;
      count++;
      count = count > me.totalLen ? 0 : count;
      me._timeChange(count);
      me.setState({
        count: count
      });
    }, 10000);
  }

  formatterTime(time) {
    return `${time.substring(0, 4)}-${time.substring(4, 6)}-${time.substring(6)}`;
  }

  _timeChange(n) {
    let me = this;
    me.newTime = me.yymm[n];
    // me.refs.tooltipRef.style.opacity = 0;
    if (me.props.showBar) {
      me.props.change(me.newTime);
    }
  }

  render() {
    const me = this;
    return (
      <div>
        <div className={'box-xf-stage'} style={{
          top: this.props.top,
          left: this.props.left
        }}>
          <div className={'box-xf-wrap'}>
            {[1, 2, 3, 4].map((s, i) => {
              return (
                <div key={'box-box' + i} ref={'boxRef' + (i + 1)} className={'box-xf-box-' + i}>
                  {['after', 'before', 'left', 'right', 'top', 'bottom'].map((k, j) => {
                    return (
                      <div key={'box' + j} className={'box-xf-box-face box-xf-box-' + k}></div>
                    );
                  })}
                  {
                    this.state.domBall[i]
                  }
                </div>
              );
            })}
            <div style={{
              width: 600,
              height: 600,
              backgroundImage: `url(${axis})`,
              backgroundSize: '100% 100%',
              transform: 'translate3d(-80px,-80px,0)'
            }} />
          </div>
        </div>
        <div onClick={me._timeLineClick.bind(this)} ref={'timeLine'} className={'time-line-box'} style={{
          width: me.props.width
        }} >
          <ul className={'time-line'} style={{
            width: me.props.width,
            margin: 0
          }}>
            {
              me.state.timeData.map((t, i) => {
                return (
                  <li key={`-_-!${i}`}><span>{t}</span></li>
                );
              })
            }
          </ul>
          <div className={'time-line-modal'} style={{
            width: me.props.width,
            transform: `scaleX(${me.state.count / me.totalLen})`,
            transition: 'transform 0.5s'
          }}></div>
        </div>
      </div>
    );
  }
};

export default Page;
