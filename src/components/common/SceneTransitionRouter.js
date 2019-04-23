import React, { Component } from 'react';
import { Timer } from '@jusfoun-vis/common';

/**
 * 路由定义。
 * @author Molay
 */
class Route extends Component {
  constructor(props) {
    super(props);

    const me = this;

    // 延迟卸载（如果场景disappear时不回调callback，则在一定时间后强制卸载）
    const timer = new Timer(2000, 1);
    timer.on('timerComplete', () => {
      me._componentVisible = false;
      me.setState({});
    });
    me._timer = timer;
  }

  init() {
    const me = this;

    if (me._initialized) return;
    me._initialized = true;

    const props = me.props;
    const component = props.component;
    const componentProps = props.componentProps;

    me._componentElement = React.createElement(component, {
      ref: (ref) => {
        me._componentInstance = ref;
      },
      ...componentProps
    });

    me._initFlag = true;
    me._componentVisible = true;
    me.setState({});
  }

  render() {
    const me = this;

    return (
      <div ref={'domElement'} style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0
      }}>
        {me._componentElement}
      </div>
    );
  }

  get componentInstance() {
    return this._componentInstance;
  }

  match(url) {
    const me = this;
    const props = me.props;
    const path = props.path;
    return url.indexOf(path.toLowerCase()) === 0;
  }

  componentDidMount() {
    const me = this;
    const domElement = me.refs.domElement;
    me._domElement = domElement;
    me._parentElement = domElement.parentNode;
  }

  componentDidUpdate() {
    const me = this;

    if (me._initFlag) {
      me._initFlag = false;
      me._componentVisible = false;
      me.setState({});
    }
    if (me._appearFlag) {
      me._appearFlag = false;
      me._timer.reset();
      me._componentInstance.appear(undefined, undefined, () => {
      });
    }
    if (me._disappearFlag) {
      me._disappearFlag = false;
      const timer = me._timer;
      timer.reset();
      timer.start();
      me._componentInstance.disappear(undefined, undefined, () => {
        timer.reset();
        timer.fire({ type: 'timerComplete' });
      });
    }

    //
    const domElement = me._domElement;
    const parentElement = me._parentElement;

    if (me._componentVisible) {
      if (!parentElement.contains(domElement))
        parentElement.appendChild(domElement);
      else if (domElement.nextSibling)
        parentElement.insertBefore(domElement, undefined);
    }
    else {
      if (parentElement.contains(domElement))
        parentElement.removeChild(domElement);
    }
  }

  _timer = undefined;
  _appearFlag = false;
  _disappearFlag = false;

  appear() {
    const me = this;

    me._appearFlag = true;
    me._componentVisible = true;
    me.setState({});
  }

  disappear() {
    const me = this;

    me._disappearFlag = true;
    me.setState({});
  }
}

export {
  Route
};

/**
 * 简易场景过渡路由。
 * 本路由控制器基于如下逻辑执行：
 * 1、以串行方式将所有的场景均初始化。
 * 2、当切换场景A至B时，将B视图装载，调用B的appear方法，调用A的disappear方法，当A的disappear执行完毕（A的逻辑显式调用callback），将A视图卸载（默认超时10s后强制卸载）。
 * @author Molay
 */
class SceneTransitionRouter extends Component {
  constructor(props) {
    super(props);

    const me = this;

    const routes = [];
    me._routes = routes;

    me._routeElements = props.children.map((child, index) => {
      return React.createElement(child.type, {
        key: 'r_' + index,
        ref: ref => {
          routes[index] = ref
        },
        ...child.props
      });
    });

    me._windowHashChangeHandler = function () {
      if (!me._ready) return;

      // 路由不区分大小写，以/开头
      let hash = window.location.hash.toLowerCase().substring(1);
      if (hash.charAt(0) !== '/') hash = '/' + hash;

      let match = undefined;
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.match(hash)) {
          match = route;
          break;
        }
      }

      let current = me._current;
      if (current === match) return;

      if (me._current) {
        me._current.disappear();
      }
      me._current = match;
      if (me._current) {
        me._current.appear();
      }

    };
  }

  _routes = undefined;
  _routeElements = undefined;
  _ready = false;
  _windowHashChangeHandler = null;
  _current = undefined;

  render() {
    const me = this;

    return (
      <div style={{
        ...me.props.style
      }}>
        {me._routeElements}
      </div>
    );
  }

  componentDidMount() {
    const me = this;

    //
    window.addEventListener('hashchange', me._windowHashChangeHandler);

    // 采用串行分步初始化。
    const delay = 50;
    const routes = me._routes;
    let index = 0;
    const timer = new Timer(delay, 1);
    timer.on('timerComplete', function () {
      const route = routes[index];
      route.init();
      if (index < routes.length - 1) {
        index++;
        timer.reset();
        timer.start();
      }
      else done();
    });
    timer.start();

    const done = function () {
      me._ready = true;
      // console.log('DONE');
      me._windowHashChangeHandler();
    };
  }

  componentWillUnmount() {
    const me = this;

    window.removeEventListener('hashchange', me._windowHashChangeHandler);
  }

}

export default SceneTransitionRouter;
