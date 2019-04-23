import React from 'react';
import './page.css';

/**
 * panel 框
 * @author xf
 * width, height, top, left, title, titleWidth
 * 引入组件基于 panel 框左上角定位
 * <Panel title={'这是标题'} width={400} height={400} top={40} left={40}></Panel>
 */

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const me = this;
    const props = me.props;
    return (
      <div className={'panel-wrap-xf'} style={{
        width: props.width,
        height: props.height,
        top: props.top,
        left: props.left
      }}>
        <div className={'panel-title-wrap-xf'}>
          <div className={'panel-title-xf'} style={{
            width: props.titleWidth
          }}>
            <p>{props.title}</p>
          </div>
          <div className={'panel-title-xf-line'} style={{
            width: (props.titleWidth - 5) || '39.5%'
          }}></div>
        </div>
        <div>{props.children}</div>
      </div >
    );
  }
};

export default Page;
