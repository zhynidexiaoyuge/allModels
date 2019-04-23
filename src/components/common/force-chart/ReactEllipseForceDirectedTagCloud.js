import React, {Component} from 'react';
import EllipseForceDirectedTagCloud from './EllipseForceDirectedTagCloud';
import {getGlobalPosition, getLocalPosition} from '@jusfoun-vis/scaler';
/* css */
import './time-line.css';
/* 图片引入*/
import img5 from './image/bg.png';

/**
 * 椭圆力导向词云图。
 * 基于React包装，并实现特定样式。
 * @see EllipseForceDirectedTagCloud
 * @author Molay
 */
class ReactEllipseForceDirectedTagCloud extends Component {
  constructor(props) {
    super(props);
    let date = this.dealDate();
    let timeData = date.timeData;
    this.startTime = date.time;
    this.yymm = date.yymm;
    this.state = {
      num: 0,
      timeData,
      count: 0
    };
    this.totalLen = timeData.length - 1;
    this.timer = null;
    this.liStyle = {
      cursor: 'pointer',
      borderRadius: '5px',
      float: 'left',
      marginRight: '8px',
      fontSize: '20px',
      color: '#00a3e9',
      border: '2px solid #00a3e9',
      borderColor: '#00a3e9',
      height: 34,
      lineHeight: '34px',
      transform: 'skewX(-30deg)'
    };
    this.spanStyle = {padding: '0 10px', height: 34, textAlign: 'center', transform: 'skewX(30deg)', display: 'block'};
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

  _domElement = undefined;
  _ellipseForceDirectedTagCloud = undefined;
  _dataFlag = false;

  render() {
    let me = this;
    let width = me.state.width || me.props.width;
    let height = me.state.height || me.props.height;
    return (
      <div>
        <div ref='domElement' style={{
          width: width,
          height: height,
          position: 'absolute',
          top: '30px',
          left: 0
        }}></div>
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
        <div style={{
          width: 120,
          color: '#fff',
          fontSize: 30,
          textAlign: 'center',
          position: 'absolute',
          top: 292,
          left: 366,
          zIndex: 0
        }}>
          <p style={{
            fontSize: 20,
            margin: 0
          }}>房价指数</p>
          {/* <p>191919</p> */}
        </div>
        <div style={{
          width: width,
          height: height,
          position: 'absolute',
          top: 30,
          left: 0,
          transform: `translate(${width / 2}px,${height / 2}px)`,
          pointerEvents: 'none'
        }}>
          <ul ref={'tooltipRef'} className={'foce-tooltip-xf'} style={{
            opacity: 0,
            marginBottom: 0
          }}>
            <li style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              fontSize: 18,
              marginBottom: 10
            }}>
              <p style={{margin: 0, width: 18, height: 18, backgroundColor: '#fd8f35', borderRadius: '50%', marginRight: 10}}></p>
              <p style={{margin: 0}} ref={'nameRef'}>--</p>
            </li>
            <li style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
              marginBottom: 0
            }}>
              <p>价格指数：</p>
              <p ref={'valueRef'}>3993</p>
              <p ref={'addRef'}>＋</p>
              <p ref={'addValueRef'}>22</p>
              <p ref={'signRef'} style={{
                color: 'red'
              }}>↑</p>
            </li>
          </ul>
        </div>
      </div >
    );
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
    // let t = me.formatterTime(me.startTime);
    // let date = new Date(t);
    // let y = date.getFullYear();
    // let m = date.getMonth() + n + 1;
    // let d = date.getDate();
    // me.newTime = y + (m < 10 ? '0' + m : '' + m) + (d < 10 ? '0' + d : '+d');
    me.newTime = me.yymm[n];
    me.refs.tooltipRef.style.opacity = 0;
    me.props.change(me.newTime);
  }

  // _setData(d, name) {
  //   // 当数据过多时，限定数据只在指定范围内。
  // 3=142248&4=73&2=2243&1=1707&0=1764
  //   let data = d.slice(0, Math.min(30, d.length));
  //   let _data = data.map((item, i) => {
  //     let arr = {};
  //     item.value.split('&').map((t) => {
  //       arr[t.split('=')[0]] = t.split('=')[1];
  //     });
  //     return {
  //       label: item.name,
  //       size: Number(arr[3]),
  //       category: arr[4] > 100 ? 0 : 1,
  //       distance: Number(arr[0]) || 0
  //     };
  //   });
  //   let me = this;
  //   me._dataFlag = true;
  //   if (_data.length == 0) {
  //     let count = me.state.count;
  //     count++;
  //     count = count > me.totalLen ? 0 : count;
  //     me._timeChange(count);
  //     me.setState({
  //       data: _data,
  //       count: count
  //     });
  //   }
  //   me.setState({
  //     data: _data
  //   });
  // }

  setData(d) {
    const me = this;
    me._dataFlag = true;
    me.setState({
      data: d
    });
  }

  // _changeData() {
  //   let me = this;
  //   me._ellipseForceDirectedTagCloud.data = [
  //     '门票',
  //     '好玩',
  //     '天气',
  //     '自驾游',
  //     '旅行社',
  //     '特色住宿',
  //     '天下第一关',
  //     '四野临时指挥部',
  //     '长城博物馆',
  //     '关城旅游攻略',
  //     '关城',
  //     '古城景区',
  //     '小吃',
  //     '关东天气',
  //     '王家大院'
  //   ].map(function (name) {
  //     let categories = me._ellipseForceDirectedTagCloud.categories;
  //     return {
  //       label: name,
  //       size: 1000 + Math.random() * 5000,
  //       category: Math.floor(Math.random() * categories.length),
  //       distance: Math.floor(10 + Math.random() * 100)
  //     };
  //   });
  // }

  showTooltip(options, isShow) {
    const me = this;
    const ref = me.refs;
    ref.tooltipRef.style.opacity = 1;
    if (isShow) {
      ref.tooltipRef.style.opacity = 0;
    }
    ref.tooltipRef.style.top = options.y + 'px';
    ref.tooltipRef.style.left = options.x + 25 + 'px';
    ref.nameRef.innerText = options.label;
    ref.valueRef.innerText = options.size;
    ref.addRef.innerText = options.category ? '-' : '+';
    ref.addValueRef.innerText = options.addValue;
    ref.signRef.style.color = options.category ? 'yellow' : 'red';
    ref.signRef.style.transform = options.category ? 'rotate(180deg)' : '';
  }

  clicked(options) {
    this.props.onClick(options.label);
  }

  componentDidMount() {
    let me = this;
    let domElement = me.refs.domElement;
    me._domElement = domElement;

    let ellipseForceDirectedTagCloud = new EllipseForceDirectedTagCloud();
    me._ellipseForceDirectedTagCloud = ellipseForceDirectedTagCloud;
    domElement.appendChild(ellipseForceDirectedTagCloud.domElement);
    ellipseForceDirectedTagCloud.collisionPadding = 60;
    ellipseForceDirectedTagCloud.minCollisionRadius = 20;
    ellipseForceDirectedTagCloud.minRadius = 15; // 球半径
    ellipseForceDirectedTagCloud.maxRadius = 40;
    ellipseForceDirectedTagCloud.resize(undefined, me.props.height);
    ellipseForceDirectedTagCloud.mousehover = me.showTooltip.bind(me);
    ellipseForceDirectedTagCloud.click = me.clicked.bind(me);

    ellipseForceDirectedTagCloud.title = '';
    ellipseForceDirectedTagCloud.decorations = [
      // {
      //   path: img4,
      //   x: -553 / 2,
      //   y: -549 / 2
      // },
      // {
      //   path: img3,
      //   x: -770 / 2,
      //   y: -680 / 2
      // },
      // {
      //   path: img2,
      //   x: -520 / 2,
      //   y: -520 / 2
      // },
      // {
      //   path: img1,
      //   x: -265 / 2,
      //   y: -250 / 2
      // },
      {
        path: img5,
        x: -me.props.width / 2,
        y: -me.props.height / 2
      }
    ];
    ellipseForceDirectedTagCloud.categories = [
      {
        id: 0,
        name: '上升',
        stroke: '#fd8f35',
        strokeOpacity: 1,
        strokeWidth: 2,
        fill: '#fd8f35',
        fillOpacity: .8,
        textFill: '#6c7987'
      },
      {
        id: 1,
        name: '下降',
        stroke: '#2bd4c5',
        strokeOpacity: 1,
        strokeWidth: 2,
        fill: '#2bd4c5',
        fillOpacity: .8,
        textFill: '#6c7987'
      }
    ];
    ellipseForceDirectedTagCloud.data = [
      '第几',
      '太原',
      '野果',
      '逆天',
      '房价',
      '建筑',
      '大同',
      '大学',
      '天气',
      '高铁',
      '西安',
      '母亲',
      '父亲',
      '高中',
      '山西'
    ].map(function (name) {
      let categories = ellipseForceDirectedTagCloud.categories;
      return {
        label: name,
        size: ~~(1000 + Math.random() * 1000),
        category: Math.floor(Math.random() * categories.length),
        distance: Math.floor(4000 + Math.random() * 8000),
        addValue: ~~(10 + Math.random() * 80)
      };
    });
  }

  componentDidUpdate() {
    let me = this;

    let domElement = me._domElement;
    let width = domElement.clientWidth;
    let height = domElement.clientHeight;
    let n = Math.min(width, height) / 3;

    let ellipseForceDirectedTagCloud = me._ellipseForceDirectedTagCloud;
    // ellipseForceDirectedTagCloud.collisionPadding = n;
    // ellipseForceDirectedTagCloud.minCollisionRadius = 20;
    if (me._dataFlag) {
      ellipseForceDirectedTagCloud.data = me.state.data;
      me.refresh();
      me.playTimeLine();
      me._dataFlag = false;
    }
    ellipseForceDirectedTagCloud.resize(width, height);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refresh() {
    let me = this;
    if (me._ellipseForceDirectedTagCloud) {
      me._ellipseForceDirectedTagCloud.appear();
    }
  }
}

export default ReactEllipseForceDirectedTagCloud;
