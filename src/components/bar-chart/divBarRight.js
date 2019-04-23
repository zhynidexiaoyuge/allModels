import React from 'react';
import img1 from './img/icon1.png';
import img2 from './img/icon2.png';
import img3 from './img/icon3.png';
import img4 from './img/icon4.png';
import img5 from './img/icon5.png';
class Bar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  _setData(d) {
    let me = this;
    me.lock = true;
    me.setState({
      data: d
    });
  }
  addList() {
    let me = this;
    let bg = undefined;
    if (!me.state.data) {
      return;
    }
    let str = '';
    return me.state.data.map((s, i) => {
      if (s.areaName.length > 3) {
        str = s.areaName.slice(0, 2) + '...';
      } else {
        str = s.areaName;
      }
      if (i == 0) {
        bg = img1;
      } else if (i == 1) {
        bg = img2;
      } else if (i == 2) {
        bg = img3;
      } else if (i == 3) {
        bg = img4;
      } else if (i == 4) {
        bg = img5;
      }
      return <li key={i} style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        color: '#6c7987',
        fontSize: 16,
        marginTop: 12
      }}>
        <div style={{
          width: 193,
          height: 25,
          background: 'rgba(60,162,249,0.2)'
        }}>
          <span ref={'barRef' + i} style={{
            width: 0,
            height: 25,
            display: 'block',
            background: 'linear-gradient(to right, #a1d6fd, #7cc4fd)',
            color: '#fff',
            textAlign: 'center'
          }}>
            {Math.abs(s.avgPriceRatio)}
          </span>
        </div>
        <span title={s.areaName} style={{width: 50, display: 'block', marginLeft: 13, marginRight: 8}}>{str}</span>
        <span style={{
          width: 26,
          height: 30,
          display: 'block',
          background: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          textAlign: 'right'
        }}></span>
      </li>;
    });
  }
  moving() {
    const me = this;
    let data = me.state.data;
    let len = data.length;
    let barW = 193;
    let max = Math.max.apply(null, me.state.data.map((s) => Math.abs(s.avgPriceRatio)));
    for (let i = 0; i < len; i++) {
      me.refs['barRef' + i].style.width = `${barW * (Math.abs(me.state.data[i].avgPriceRatio) / max)}px`;
      me.refs['barRef' + i].style.transition = 'width 1s';
    }
  }
  render() {
    const me = this;
    return (
      <div style={{
        width: 340,
        height: 210
      }}>
        <p style={{
          width: 20,
          height: 9,
          background: '#4aabfc',
          position: 'absolute',
          right: 284,
          top: 58
        }}></p>
        <p style={{
          color: '#6c7987',
          fontSize: 16,
          position: 'absolute',
          right: 194,
          top: 50
        }}>均价跌幅%</p>
        <ul>
          {me.addList()}
        </ul>
      </div>
    );
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    if (!this.lock) {
      return;
    }
    this.lock = false;
    if (this.state.data.length === 0) {
      return;
    }
    setTimeout(() => {
      this.moving();
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.moving);
  }
}

export default Bar;
