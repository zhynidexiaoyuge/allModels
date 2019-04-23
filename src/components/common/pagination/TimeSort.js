import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './Button';
import { createElement } from '@jusfoun-vis/common';

/**
 * 时间升序-时间降序
 * @author xf
 */
class Page extends ReactComponentWithEventDispatcher {
  constructor() {
    super();
    this.activeIndex = 1;
    this.state = {
      activeIndex: this.activeIndex
    };
  }

  componentDidMount() {
    const me = this;
    const state = me.state;

    const btn1 = me.btn1;
    btn1.backgroundColor = [
      {
        offset: 0,
        color: '#01fcfc'
      },
      {
        offset: 1,
        color: '#00c8fe'
      }
    ];
    btn1.borderRadius = 5;
    btn1.fontLetterSpace = 1;
    btn1.on('click', function (e) {
      me.activeIndex = 1;
      me.updateState();
      me._fire();
    });

    const btn2 = me.btn2;
    btn2.backgroundColor = 'rgba(0,202,255,0.2)';
    btn2.borderRadius = 5;
    btn2.fontLetterSpace = 1;
    btn2.fontColor = 'rgba(1,252,252,1)';
    btn2.on('click', function (e) {
      me.activeIndex = 2;
      me.updateState();
      me._fire();
    });
  }

  updateState() {
    const me = this;
    me.isInputChange = false;
    me.setState({
      activeIndex: me.activeIndex
    });
  }

  _fire() {
    this.fire({
      type: 'click',
      index: this.state.activeIndex
    })
  }

  inputChange(e) {
    this.isInputChange = true;
    this.setState({
      activeIndex: e.target.value
    })
  }

  componentDidUpdate() {
    const me = this;
    const state = me.state;
    if (me.isInputChange) return;
    const btn1 = me.btn1;
    const btn2 = me.btn2;
    const activeIndex = state.activeIndex;
    if (activeIndex === 1) {
      btn2.backgroundColor = 'rgba(0,202,255,0.2)';
      btn2.fontColor = 'rgba(1,252,252,1)';
      btn1.fontColor = 'black';
      btn1.backgroundColor = [
        {
          offset: 0,
          color: '#01fcfc'
        },
        {
          offset: 1,
          color: '#00c8fe'
        }
      ];
    } else {
      btn1.backgroundColor = 'rgba(0,202,255,0.2)';
      btn1.fontColor = 'rgba(1,252,252,1)';
      btn2.fontColor = 'black';
      btn2.backgroundColor = [
        {
          offset: 0,
          color: '#01fcfc'
        },
        {
          offset: 1,
          color: '#00c8fe'
        }
      ];
    }
    me.isInputChange = false;
  }

  render() {
    const me = this;
    const state = me.state;
    const style = me.props.style;
    const total = state.total;
    const activeIndex = state.activeIndex;
    return (
      <div
        style={style}
        ref={'container'}
      >
        <Button
          text={'时间升序'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btn1 = ref;
          }}
        />
        <Button
          text={'时间降序'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btn2 = ref;
          }}
        />
      </div>
    )
  }
}

export default Page;
