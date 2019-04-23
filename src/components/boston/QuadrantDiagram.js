/* eslint-disable */
import React, { Component } from 'react';
import bg from './fourIndex.png';
import tooltip from './tooltip.png';
import BallCharts from './ball/Ball3d';
import { getGlobalPosition, getLocalPosition } from '@jusfoun-vis/scaler';

/**
 *
 * 张会冉
 * 2018.10.08
 *
 * */

class QuadrantDiagram extends Component {
  constructor(props) {
    super(props);
    let me = this;
    let date = this.dealDate();
    let timeData = date.timeData;
    me.startTime = date.time;
    me.yymm = date.yymm;
    me.totalLen = timeData.length - 1;
    me.state = {
      count: 0,
      timeData,
      arr: [
        {
          name: "苹果",
          districtName: "111",
          id: "AF01001",
          quadrant: 'a',
          x: 200,
          y: 200
        }, {
          name: "鸡蛋",
          districtName: "222",
          id: "AL05001",
          x: -200,
          y: 200
        }, {
          name: "猪肉",
          districtName: "333",
          id: "AL01002",
          x: 200,
          y: -200
        }, {
          name: "猪肉",
          districtName: "444",
          id: "AL01002",
          x: -200,
          y: -200
        }, {
          name: "猪肉",
          districtName: "555",
          id: "AL01004",
          x: 0,
          y: 0
        }, {
          name: "猪肉",
          districtName: "666",
          id: "AL01005",
          x: -100,
          y: -100
        }, {
          name: "活草鱼",
          districtName: "777",
          id: "AM01002",
          x: 100,
          y: 100
        }]
    };
  }

  _flag = false;

  _setData(d, count) {
    let me = this;
    me._flag = true;
    if (count) {
      me.setState({
        data: d,
        count: 0
      });
    } else {
      me.setState({
        data: d,
      });
    }
  }

  _clearTimer() {
    clearInterval(this.timer);
  }

  randomCoordinate(n) {
    if (n > 0) {
      return Math.random() * 200;
    } else if (n < 0) {
      return Math.random() * 200 * (-1);
    } else {
      return 0;
    }
  }

  dealDate() {
    let date = new Date();
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let dist = { timeData: [], yymm: [] };
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
      dist.yymm[11 - i] = '' + yy + ((mm < 10) ? ('0' + mm) : mm) + '01';
    }
    dist.time = '' + year + ((mounth < 10 ? ('0' + mounth) : mounth)) + '01';
    return dist;
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

  _timeChange(n) {
    let me = this;
    me.newTime = me.yymm[n];
    me.props.change(me.newTime);
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

  render() {
    let me = this;
    return (
      <div style={{ width: '680px', height: '280px', position: 'absolute', left: '0' }}>
        {/*<div style={{width: '210px', height: '210px', position: 'absolute', left: '20px', top: '20px'}}>*/}
        {/*<img src={bg} style={{width: '100%', height: '100%'}}/>*/}
        {/*</div>*/}
        <div ref={'box1'} style={{ position: 'absolute', top: me.props.top || '-20px', left: me.props.left || '80px', width: '860px', height: '680px' }}>
        </div>
        <div style={{ background: `url(${tooltip})`, color: '#fff', fontSize: '14px', display: 'none', width: '230px', height: '110px' }} ref={'tooltip'}>
          <p style={{ textIndent: '24px', fontSize: '16px', height: '28px', lineHeight: '28px' }} ref={'title'}></p>
          <p style={{ height: '24px', lineHeight: '24px' }}>
            <span style={{ margin: '9px', background: '#fff', float: 'left', width: '6px', height: '6px', borderRadius: '6px', display: 'block' }}></span>
            <span style={{ float: 'left', height: '24px', display: 'block' }}>价格涨跌：</span>
            <span ref={'price'} style={{ float: 'left', height: '24px', borderRadius: '6px', display: 'block' }}></span>
            <span style={{ float: 'left', height: '24px', display: 'block' }}>元/公斤</span>
          </p>
          <p style={{ height: '24px', lineHeight: '24px' }}>
            <span style={{ margin: '9px', background: '#fff', float: 'left', width: '6px', height: '6px', borderRadius: '6px', display: 'block' }}></span>
            <span style={{ float: 'left', height: '24px', display: 'block' }}>价格变化率：</span>
            <span ref={'pricechange'} style={{ float: 'left', height: '24px', borderRadius: '6px', display: 'block' }}></span>
          </p>
          <p style={{ height: '24px', lineHeight: '24px' }}>
            <span ref={'circle'} style={{ margin: '7px', background: '#fff', float: 'left', width: '10px', height: '10px', borderRadius: '6px', display: 'block' }}></span>
            <span ref={'location'} style={{ float: 'left', height: '24px', borderRadius: '6px', display: 'block' }}></span>
          </p>
        </div>
        <div onClick={me._timeLineClick.bind(this)} ref={'timeLine'} className={'time-line-box'} style={{
          width: me.props.barWidth,
          display: me.props.showBar ? 'block' : 'none',
          top: me.props.barTop,
          left: me.props.barLeft
        }} >
          <ul className={'time-line'} style={{
            width: me.props.barWidth,
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
            width: me.props.barWidth,
            transform: `scaleX(${me.state.count / me.totalLen})`,
            transition: 'transform 0.5s'
          }}></div>
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    let me = this;
    if (me._flag) {
      let data = me.state.data.slice();
      let matrixData = data.map((item, i) => {
        return {
          districtId: item.districtId,
          districtName: item.districtName,
          increase: item.increase,
          speed: item.speed,
          //x: me.randomCoordinate(item.increase),
          x: item.increase,
          //y: me.randomCoordinate(item.speed)
          y: item.speed
        }
      });
      me.ballObj.show(matrixData);
      me._flag = false;
    }
  }

  componentDidMount() {
    let me = this;
    me.box1 = me.refs.box1;
    const t = me.refs.tooltip;
    me.ballObj = BallCharts(me.box1, function () {

    }, {
        over: function (info, ps) {
          t.style.position = 'absolute';
          t.style.top = ps.y - 55 + 'px';
          t.style.left = ps.x + 'px';
          me.refs.tooltip.style.display = 'block';
          me.refs.title.innerHTML = info.districtName;
          me.refs.price.innerHTML = info.increase;
          me.refs.pricechange.innerHTML = info.speed;

          if (info.increase > 0 && info.speed > 0) {
            me.refs.location.innerHTML = '第一象限';
            me.refs.circle.style.background = '#ff7898';
          } else if (info.increase <= 0 && info.speed > 0) {
            me.refs.location.innerHTML = '第二象限';
            me.refs.circle.style.background = '#ffd585';
          } else if (info.increase <= 0 && info.speed <= 0) {
            me.refs.location.innerHTML = '第三象限';
            me.refs.circle.style.background = '#00a2e6';
          } else {
            me.refs.location.innerHTML = '第四象限';
            me.refs.circle.style.background = '#02e4ff';
          }
        }, out: function () {
          me.refs.tooltip.style.display = 'none';
        }
      });
    me.ballObj.init();
    //
    // me.ballObj.show(me.state.arr);
  }
}

export default QuadrantDiagram;
