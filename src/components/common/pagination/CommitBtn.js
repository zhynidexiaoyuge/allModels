import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './Button';
import { createElement } from '@jusfoun-vis/common';
const colorList = [
  [{ offset: 0, color: '#01fcfc' }, { offset: 1, color: '#00c8fe' }],
  [{ offset: 0, color: '#edff77' }, { offset: 1, color: '#ffcc00' }]
]

/**
 * 提交-关闭
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

    const btnCommit = me.btnCommit;
    btnCommit.backgroundColor = colorList[1];
    btnCommit.borderRadius = 5;
    btnCommit.fontLetterSpace = 2;
    btnCommit.on('click', function (e) {
      me.activeIndex = 1;
      me.updateState();
      me._fire();
    });

    const btnClose = me.btnClose;
    btnClose.backgroundColor = colorList[0];
    btnClose.borderRadius = 5;
    btnClose.fontLetterSpace = 2;
    btnClose.on('click', function (e) {
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
          text={this.props.titles || '提交'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btnCommit = ref;
          }}
        />
        <Button
          text={this.props.titleList || '关闭'}
          disabled={false}
          style={{
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.btnClose = ref;
          }}
        />
      </div>
    )
  }
}

export default Page;
