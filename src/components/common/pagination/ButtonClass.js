import {createElement, UiComponent} from '@jusfoun-vis/common';

/**
 * button 原生组件
 * @author msh
 * 示例
 {
   const container = me.refs.container;
   const button = new Button();
   button.width = 108;
   button.height = 32;

   button.borderRadius = 5;
   button.borderWidth = 1;
   button.borderColor = '#000';
   button.borderStyle = 'solid';

   button.text = '确认';
   button.fontFamily = 'YuanTi SC';
   button.fontSize = 16;
   button.fontColor = '#060f37';
   button.fontLetterSpace = 10;
   button.textAlign = 'center';

   button.backgroundColor = '#fff' 或者 [
   {
     offset: 0,
     color: '#01fcfc'
   },
   {
     offset: 1,
     color: '#00c8fe'
   }
   ];
   button.gradientType = 'linear'; // linear or radial
   button.gradientDescribe = 'to right';
   button.on('click', function (e) {
     console.log(e);
   });
   button.disabled = true;
   container.appendChild(button.domElement);
 }
 */
class ButtonClass extends UiComponent {
  constructor() {
    super();
    const me = this;
    const domElement = createElement('div');
    const style = domElement.style;
    style.cursor = 'pointer';
    style.boxSizing = 'border-box';
    style.transition = 'transform 100ms ease-in-out,boxShadow 100ms ease-in-out';

    me.mouseDownHandle = me._mouseDownHandle.bind(me);
    me.mouseUpHandle = me._mouseUpHandle.bind(me);

    domElement.addEventListener('mousedown', me.mouseDownHandle);
    domElement.addEventListener('mouseup', me.mouseUpHandle);
    me._domElement = domElement;
  }

  dispose() {
    const me = this;
    const domElement = me._domElement;
    domElement.removeEventListener('mousedown', me.mouseDownHandle);
    domElement.removeEventListener('mouseup', me.mouseUpHandle);
    me._domElement = null;
  }

  _mouseDownHandle() {
    const me = this;
    const domElement = me._domElement;
    const style = domElement.style;
    style.transform = 'scaleX(0.95)';
    style.boxShadow = '1px 1px 2px rgba(0,0,0,0.4)';
  };

  _mouseUpHandle(e) {
    const me = this;
    const domElement = me._domElement;
    const style = domElement.style;
    style.transform = 'scaleX(1)';
    style.boxShadow = 'none';
    me.fire({
      type: 'click',
      text: e.target.innerText,
      event: e
    })
  };

  get domElement() {
    return this._domElement;
  }

  /**
   * 禁止
   */
  _disabled = false;
  get disabled() {
    return this._disabled;
  }

  set disabled(boolean) {
    this._disabled = boolean;
    this.updateBackground();
  }

  /**
   * 宽
   */
  _width = undefined;
  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this.updateSize();
  }

  /**
   * 高
   */
  _height = undefined;
  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this.updateSize();
  }

  /**
   * 圆角
   */
  _borderRadius = 5;
  get borderRadius() {
    return this._borderRadius;
  }

  set borderRadius(value) {
    this._borderRadius = value;
    this.updateBorder();
  }

  /**
   * 边框宽度
   */
  _borderWidth = 0;
  get borderWidth() {
    return this._borderWidth;
  }

  set borderWidth(value) {
    this._borderWidth = value;
    this.updateBorder();
  }

  /**
   * 边框颜色
   */
  _borderColor = 'rgba(0,0,0)';
  get borderColor() {
    return this._borderColor;
  }

  set borderColor(value) {
    this._borderColor = value;
    this.updateBorder();
  }

  /**
   * 边框样式
   */
  _borderStyle = 'solid';
  get borderStyle() {
    return this._borderStyle;
  }

  set borderStyle(value) {
    this._borderStyle = value;
    this.updateBorder();
  }

  /**
   * 文字
   */
  _text = '';
  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
    this.updateText();
  }

  //   fontAlign = 5;
  /**
   * 文字字体
   */
  _fontFamily = 'MicrosoftYaHei';
  get fontFamily() {
    return this._fontFamily;
  }

  set fontFamily(value) {
    this._fontFamily = value;
    this.updateText();
  }

  /**
   * 文字字体
   */
  _fontSize = 14;
  get fontSize() {
    return this._fontSize;
  }

  set fontSize(value) {
    this._fontSize = value;
    this.updateText();
  }

  /**
   * 文字颜色
   */
  _fontColor = '#3ca2f9';
  get fontColor() {
    return this._fontColor;
  }

  set fontColor(value) {
    this._fontColor = value;
    this.updateText();
  }

  /**
   * 文字间隔
   */
  _fontLetterSpace = 0;
  get fontLetterSpace() {
    return this._fontLetterSpace;
  }

  set fontLetterSpace(value) {
    this._fontLetterSpace = value;
    this.updateText();
  }

  /**
   * 文字排版
   */
  _textAlign = 'center';
  get textAlign() {
    return this._textAlign;
  }

  set textAlign(value) {
    this._textAlign = value;
    this.updateText();
  }

  /**
   * 背景颜色
   */
  _backgroundColor = 'transparent';

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(value) {
    this._backgroundColor = value;
    this.updateBackground();
  }

  /**
   * 是否显示（默认显示）
   * params:true(隐藏) false(显示)
   * */
  _isShow = true;
  get isShow() {
    return this._isShow;
  }

  set isShow(boolean) {
    this._isShow=boolean;
    this.updateHide();
  }

  /**
   * 背景渐变颜色
   * Array or String
   */
  _backgroundColorStops = this.backgroundColor;

  get backgroundColorStops() {
    return this._backgroundColorStops;
  }

  set backgroundColorStops(value) {
    this._backgroundColorStops = value;
    this.updateBackground();
  }

  /**
   * 背景渐变方式
   * linear or radial
   */
  _gradientType = 'linear';

  get gradientType() {
    return this._gradientType;
  }

  set gradientType(value) {
    this._gradientType = value;
    this.updateBackground();
  }

  /**
   * 背景渐变方向
   * linear 方向、角度
   * radial 形式、中心点
   */
  _gradientDescribe = 'to bottom';

  get gradientDescribe() {
    return this._gradientDescribe;
  }

  set gradientDescribe(value) {
    this._gradientDescribe = value;
    this.updateBackground();
  }

  /**
   * 大小更新
   */
  isRealUpdateSize = false;

  updateSize() {
    this.isRealUpdateSize = true;
    this.invalidateProperties();
  }

  /**
   * 边框更新
   */
  isRealUpdateBorder = false;

  updateBorder() {
    this.isRealUpdateBorder = true;
    this.invalidateProperties();
  }
  /**
   * 隐藏更新
   * */
  updateHide(){
    this.isRealUpdateHide = true;
    this.invalidateProperties();
  }

  /**
   * 文字更新
   */
  isRealUpdateText = false;

  updateText() {
    this.isRealUpdateText = true;
    this.invalidateProperties();
  }

  /**
   * 背景更新
   */
  isRealUpdateBackground = false;

  updateBackground() {
    this.isRealUpdateBackground = true;
    this.invalidateProperties();
  }

  commitProperties() {
    const me = this;
    const domElement = me.domElement;
    const style = domElement.style;

    // 样式更新
    if (me.isRealUpdateSize) {
      me.isRealUpdateSize = false;
      style.width = me.width + 'px';
      style.height = me.height + 'px';
      style.lineHeight = me.height - me.borderWidth * 2 + 'px';
    }

    // 边框更新
    if (me.isRealUpdateBorder) {
      me.isRealUpdateBorder = false;
      style.borderRadius = me.borderRadius + 'px';
      style.borderWidth = me.borderWidth + 'px';
      style.borderColor = me.borderColor;
      style.borderStyle = me.borderStyle;
    }

    // 文字更新
    if (me.isRealUpdateText) {
      me.isRealUpdateText = false;
      domElement.innerText = me.text;
      style.fontFamily = me.fontFamily;
      style.fontSize = me.fontSize + 'px';
      style.color = me.fontColor;
      style.textAlign = 'center';

      const align = me.textAlign;
      const paddingTotal = me.width - me.fontLetterSpace * me.text.length - me.fontSize * me.text.length;
      let padding = `0 ${paddingTotal / 2}px`;
      switch (align) {
        case 'left':
          padding = `0 ${paddingTotal}px 0 0`;
          break;
        case 'right':
          padding = `0 0 0 ${paddingTotal}px`;
      }
      style.padding = padding;
    }

    // 背景更新
    if (me.isRealUpdateBackground) {
      me.isRealUpdateBackground = false;
      const isArray = Array.isArray(me.backgroundColor);
      const gradientType = me.gradientType.toLocaleLowerCase();

      let _background = me.backgroundColor;

      if (isArray) {
        _background = `${gradientType}-gradient(${me.gradientDescribe ? `${me.gradientDescribe},` : ''}${me.backgroundColor.map((t, i) => {
          return `${i ? ',' : ''}${t.color} ${t.offset * 100}%`;
        }).join('')})`;
      }

      style.background = _background;
    }
    //隐藏更新
    if(me._isShow){
      style.display="block"
    }else{
      style.display="none"
    }

    // 禁止
    if (me._disabled) {
      domElement.removeEventListener('mousedown', me.mouseDownHandle);
      domElement.removeEventListener('mouseup', me.mouseUpHandle);
      style.cursor = 'not-allowed';
    } else {
      domElement.addEventListener('mousedown', me.mouseDownHandle);
      domElement.addEventListener('mouseup', me.mouseUpHandle);
      style.cursor = 'pointer';
    }
  }
}

export default ButtonClass;
