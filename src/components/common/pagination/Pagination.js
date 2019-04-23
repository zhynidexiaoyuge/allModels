import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './Button';
// import {createElement} from '@jusfoun-vis/common';
import './pagination.css';

/**
 * 分页
 * @author msh
 * type值为 true 的时候会显示 “共为您找到相关结果{this.state.count}个”
 */
class Pagination extends ReactComponentWithEventDispatcher {
  constructor() {
    super();
    this.activeIndex = 1;
    this.state = {
      total: 0,
      count: 0,
      activeIndex: this.activeIndex
    };
  }

  appear() {
    this.refs.container.style.display = 'block';
  }

  disappear() {
    this.refs.container.style.display = 'none';
  }

  componentDidMount() {
    const me = this;
    let total = 0;

    const pervPageButton = me.pervPageButton;
    pervPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#01fcfc'
      },
      {
        offset: 1,
        color: '#00c8fe'
      }
    ];
    pervPageButton.text = '上一页';
    pervPageButton.borderRadius = 5;
    pervPageButton.fontLetterSpace = 5;
    pervPageButton.on('click', function (e) {
      if (me.activeIndex < 1) return;
      me.activeIndex--;
      me.updateState();
      me._fire();
    });

    const nextPageButton = me.nextPageButton;
    nextPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#01fcfc'
      },
      {
        offset: 1,
        color: '#00c8fe'
      }
    ];
    nextPageButton.text = '下一页';
    nextPageButton.borderRadius = 5;
    nextPageButton.fontLetterSpace = 5;
    nextPageButton.on('click', function (e) {
      me.activeIndex = me.state.activeIndex;
      total = me.state.total;
      if (me.activeIndex > total) return;
      me.activeIndex++;
      me.updateState();
      me._fire();
    });

    const firstPageButton = me.firstPageButton;
    firstPageButton.isShow = me.props.isShow == 0 ? false : true; // 0（隐藏）1（显示）

    firstPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#01fcfc'
      },
      {
        offset: 1,
        color: '#00c8fe'
      }
    ];
    firstPageButton.text = '首页';
    firstPageButton.borderRadius = 5;
    firstPageButton.fontLetterSpace = 5;
    firstPageButton.on('click', function (e) {
      me.activeIndex = 1;
      me.updateState();
      me._fire();
    });

    const endPageButton = me.endPageButton;
    endPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#01fcfc'
      },
      {
        offset: 1,
        color: '#00c8fe'
      }
    ];
    endPageButton.text = '尾页';
    endPageButton.borderRadius = 5;
    endPageButton.fontLetterSpace = 5;
    endPageButton.isShow = me.props.isShow == 0 ? false : true; // 0（隐藏）1（显示）

    endPageButton.on('click', function (e) {
      me.activeIndex = me.state.total;
      me.updateState();
      me._fire();
    });
    const confirmPageButton = me.confirmPageButton;
    confirmPageButton.backgroundColor = [
      {
        offset: 0,
        color: 'transparent'
      },
      {
        offset: 1,
        color: 'transparent'
      }
    ];
    confirmPageButton.borderRadius = 5;
    confirmPageButton.fontLetterSpace = 5;
    confirmPageButton.on('click', function (e) {
      total = me.state.total;
      me.activeIndex = +me.input.value;
      me.state.activeIndex = me.input.value;
      if (me.activeIndex < 1) me.activeIndex = 1;
      if (me.activeIndex > total) me.activeIndex = total;

      if (me.activeIndex === me.state.activeIndex) return false;
      me.updateState();
      me._fire();
    });

    me.componentDidUpdate();
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
    });
  }

  inputChange(e) {
    this.isInputChange = true;
    this.setState({
      activeIndex: e.target.value
    });
  }

  initActive(num) {
    // console.log(num);
    this.activeIndex = num || 1;
  }

  // 设置总条数
  _setPageCount(d) {
    let showNum = this.props.showNum || 5;
    this.setState({
      count: d,
      total: Math.ceil(d / showNum),
      activeIndex: this.activeIndex
    });
  }

  componentDidUpdate() {
    const me = this;
    const state = me.state;
    const activeIndex = state.activeIndex;
    const total = state.total;

    if (me.isInputChange) return;

    const pervPageButton = me.pervPageButton;
    pervPageButton._id = 1;
    const nextPageButton = me.nextPageButton;
    nextPageButton._id = total;
    const firstPageButton = me.firstPageButton;
    const endPageButton = me.endPageButton;
    // firstPageButton._id = 1;
    const buttons = [pervPageButton, nextPageButton, firstPageButton, endPageButton];

    buttons.forEach((t) => {
      if (t._id === activeIndex) {
        t.disabled = true;
        t.fontColor = '#6c7987';
        t.backgroundColor = '#ebf6fe';
      } else {
        t.backgroundColor = [
          {
            offset: 0,
            color: '#3ca2f9'
          },
          {
            offset: 1,
            color: '#3ca2f9'
          }
        ];
        t.fontColor = '#fff';
        t.disabled = false;
      }
    });

    me.isInputChange = false;
  }

  render() {
    const me = this;
    const state = me.state;
    const style = me.props.style;
    const total = state.total;
    const count = state.count;
    const activeIndex = state.activeIndex;
    return (
      <div
        style={style}
        className={'pagination-container'}
        ref={'container'}
      >
        <p className={`pagination-count ${me.props.type ? 'active' : ''}`}>共为您找到相关结果{count}个</p>
        <Button
          disabled={true}
          style={{
            position: 'absolute',
            top: 5,
            left: 110,
            width: 68,
            height: 22
          }}
          ref={(ref) => {
            me.pervPageButton = ref;
          }}
        />
        <Button
          style={{
            position: 'absolute',
            top: 5,
            left: 200,
            width: 68,
            height: 22
          }}
          ref={(ref) => {
            me.nextPageButton = ref;
          }}
        />
        <Button
          disabled={true}
          style={{
            position: 'absolute',
            top: 5,
            left: 290,
            width: 68,
            height: 22
          }}
          ref={(ref) => {
            me.firstPageButton = ref;
          }}
        />
        <Button
          style={{
            position: 'absolute',
            top: 5,
            left: 384,
            width: 68,
            height: 22
          }}
          ref={(ref) => {
            me.endPageButton = ref;
          }}
        />
        <div className={'pagination-input'} style={{
          right: me.props.currentPageRight || -35
        }}>
          当前
          <input ref={(ref) => {
            me.input = ref;
          }} type="text" value={activeIndex} onChange={me.inputChange.bind(me)} />
          页
        </div>
        <Button
          text={'前往'}
          style={{
            position: 'absolute',
            top: 5,
            right: me.props.goRight || -95,
            width: 68,
            height: 22
          }}
          ref={(ref) => {
            me.confirmPageButton = ref;
          }}
        />

        {/*<div className={'pagination-total'}>共{total}页</div>*/}
      </div>
    );
  }
}

export default Pagination;
