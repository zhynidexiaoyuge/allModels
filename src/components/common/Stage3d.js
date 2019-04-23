import React, {Component} from 'react';
import {General3DEnv} from '@jusfoun-vis/threejs-chart';
import * as THREE from 'three';

/**
 * @deprecated
 * 基础3D环境。
 * @author Molay
 */
class Env extends General3DEnv {
  constructor(option) {
    super(option);

    this.initialize();
  }

  _initEngine() {
    super._initEngine();

    const me = this;

    const renderer = me.renderer;
    renderer.setPixelRatio(1/2);
    // renderer.setPixelRatio(1);

    const camera = me.camera;
    camera.position.set(
      0, 0, 1400
    );
    camera.near = 0.1;
    camera.far = 10000;
  }

  _initObjects() {
  }

  _initFinally() {
    const me = this;

    const controls = me.controls;
    controls.update();
    // controls.enablePan = false;
    // controls.enableRotate = false;
    // controls.minDistance = -100;
    // controls.maxDistance = camera.far;
    controls.enabled = false;
  }

  lookAt(cameraPosition, controlsTarget) {
  }

}

/**
 * 三维场景，所有三维对象放置在此场景中。
 * @author Molay
 */
class Stage3d extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const me = this;
    return (
      <div ref={'domElement'} style={{
        position: 'absolute',
        left: 0,
        top: 0,
        ...me.props.style
      }}/>
    );
  }

  componentDidMount() {
    const me = this;
    const refs = me.refs;
    const domElement = refs.domElement;
    const props = me.props;

    const env = new Env();
    env.resize(props.width || 100, props.height || 100);
    domElement.appendChild(env.domElement);
    env.startRender();
    me._env = env;
  }

  componentWillUnmount() {
    const me = this;

    me._env.stopRender();
  }

  get env() {
    return this._env;
  }

}

export default Stage3d;
