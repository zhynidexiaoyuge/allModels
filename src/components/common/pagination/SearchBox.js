import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import { createElement } from '@jusfoun-vis/common';
import search from './img/search.png'
/**
 * 搜索框
 * @author zdd
 */
class SearchBox extends ReactComponentWithEventDispatcher {
  constructor() {
    super();
  }
  /*点击事件*/
  _search(n) {
    let name = this.refs.input.value;
    this.props.searchClick(name)
  }
  render() {
    let me = this;
    return (
      <div ref={'serchButton'} style={{
        width: this.props.width || 432,
        height: this.props.height || 40,

      }}>
        <div>
          <input className={"ipt_search"} type="" placeholder="企业名称" style={{
          }} ref={'input'} />
          <span onClick={this._search.bind(this)}>
            <img src={search} style={{
              position: 'absolute',
              top: 11,
              left: 400
            }} />
          </span>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const me = this;
  }
}

export default SearchBox;
