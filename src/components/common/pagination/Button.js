import React from 'react';
import ButtonClass from './ButtonClass';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';

/**
 * 针对本项目的按钮组件
 * @author msh
 */
class Button extends ReactComponentWithEventDispatcher {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const me = this;
    const props = me.props;
    const style = props.style;
    const container = me.refs.buttonContainer;
    const button = new ButtonClass();
    button.width = style.width;
    button.height = style.height;
    button.text = props.text;
    button.disabled = props.disabled;
    button.borderRadius = props.borderRadius;
    button.fontLetterSpace = props.fontLetterSpace;
    button.backgroundColor = props.backgroundColor;
    button.on('click', function(e) {
      me.fire(e);
    });

    container.appendChild(button.domElement);
    me.button = button;
  }

  set width(value) {
    this.button.width = value;
  }

  set height(value) {
    this.button.height = value;
  }

  set text(value) {
    this.button.text = value;
  }

  set disabled(boolean) {
    this.button.disabled = boolean;
  }

  set borderRadius(value) {
    this.button.borderRadius = value;
  }

  set fontLetterSpace(value) {
    this.button.fontLetterSpace = value;
  }

  set fontColor(value) {
    this.button.fontColor = value;
  }

  set backgroundColor(value) {
    this.button.backgroundColor = value;
  }

  set isShow(value){
    this.button.isShow=value;
  }
  render() {
    const me = this;
    const style = me.props.style;
    return (
      <div style={style} ref={'buttonContainer'}></div>
    )
  }
}

export default Button;
