import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './Button';
import { createElement } from '@jusfoun-vis/common';
const colorList = [
  [{ offset: 0, color: '#01fcfc' }, { offset: 1, color: '#00c8fe' }]
]

/**
 * data：data={[{text:'查询'},{text:'导出'},{text:'重置',color:[{ offset: 0, color: '#edff77' }, { offset: 1, color: '#ffcc00' }]}]}
 * @author zhy
 * 
 */
class TextButton extends ReactComponentWithEventDispatcher {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const me = this;
    for (let i = 0; i < me.refs.buttonBox.children.length; i++) {
      me.refs[i].backgroundColor = me.props.data[i].color || colorList[0];
      me.refs[i].borderRadius = 5;
      me.refs[i].fontLetterSpace = 0;
      me.refs[i].on('click', function (e) {
        me.activeIndex = i;
        me.updateState();
        me._fire(e);
      });
    }
  }
  updateState() {
    const me = this;
    me.isInputChange = false;
    me.setState({
      activeIndex: me.activeIndex
    });
  }
  _fire(e) {
    this.fire({
      type: 'click',
      text:e.text,
      index: this.state.activeIndex
    })
  }
  componentDidUpdate() {
  }

  render() {
    const me = this;
    const style = me.props.style;
    return (
      <div
        style={style}
        ref='buttonBox'
      >
        {
          me.props.data.map((s, i) => {
            return <Button
              key={i}
              text={s.text}
              fontLetterSpace={10}
              disabled={false}
              style={{
                width: 108,
                height: 32,
                marginRight: 20,
                borderRadius: 5,
              }}
              ref={i}
            />
          })
        }
      </div>
    )
  }
}

export default TextButton;
