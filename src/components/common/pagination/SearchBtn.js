import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './Button';
import { createElement } from '@jusfoun-vis/common';
const colorList = [
  [{ offset: 0, color: '#01fcfc' }, { offset: 1, color: '#00c8fe' }],
  [{ offset: 0, color: '#edff77' }, { offset: 1, color: '#ffcc00' }]
]

/**
 * 查询-重置
 * @author xf
 * 默认两个按钮 type={3} 表示有三个按钮
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

    const btnSearch = me.btnSearch;
    btnSearch.backgroundColor = colorList[0];
    btnSearch.borderRadius = 5;
    btnSearch.fontLetterSpace = 10;
    btnSearch.on('click', function (e) {
      me.activeIndex = 1;
      me.updateState();
      me._fire();
    });

    const btnAdd = me.btnAdd;
    btnAdd.backgroundColor = colorList[0];
    btnAdd.borderRadius = 5;
    btnAdd.fontLetterSpace = 10;
    btnAdd.on('click', function (e) {
      me.activeIndex = 2;
      me.updateState();
      me._fire();
    });

    const btnRetry = me.btnRetry;
    btnRetry.backgroundColor = colorList[1];
    btnRetry.borderRadius = 5;
    btnRetry.fontLetterSpace = 10;
    btnRetry.on('click', function (e) {
      me.activeIndex = 3;
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
    const btnSearch = me.btnSearch;
    const btnRetry = me.btnRetry;
    const activeIndex = state.activeIndex;
    if (activeIndex === 1) {

    } else {

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
          text={'查询'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btnSearch = ref;
          }}
        />
        <Button
          text={'新增'}
          disabled={false}
          style={{
            width: 108,
            height: 32,
            display: `${me.props.type == 3 ? 'block' : 'none'}`
          }}
          ref={ref => {
            me.btnAdd = ref;
          }}
        />
        <Button
          text={'重置'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btnRetry = ref;
          }}
        />
      </div>
    )
  }
}

export default Page;
