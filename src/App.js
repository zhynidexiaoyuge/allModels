import React, {Component} from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import ResizeManager from './components/common/ResizeManager';
import SvgModel from './page/svgModel/svgModel';
import D3Model from './page/d3Model/d3Model';
import ThreeModel from './page/threeModel/threeModel';
import CssModel from './page/cssModel/cssModel';
import EchartsModel from './page/echartsModel/echartsModel';
import BaduMap from './page/baduMap/baduMap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'threeModel'
    };
  }

  componentDidMount() {
    const me = this;
    let storage = window.sessionStorage;
    window.onhashchange = function() {
      const pathArr = window.location.hash.split('?')[0].split('/');
      const path = pathArr[pathArr.length - 1] || 'threeModel';
      me.setState({
        currentPage: path
      });
    };
    me.setState({
      currentPage: storage.getItem('name')
    });
  }

  click(name) {
    let sessionStorage = window.sessionStorage;
    sessionStorage.removeItem('name');
    sessionStorage.setItem('name', name);
    this.setState({
      currentPage: name
    });
  }

  render() {
    let me = this;
    const width = 1920;
    const height = 1080;
    const mode = window.resizeMode || ResizeManager.MODE_DEBUG;
    if (sessionStorage.getItem('name') === 'threeModel' || sessionStorage.getItem('name') === null) {
      sessionStorage.setItem('name', 'threeModel');
    }
    const currentPage = me.state.currentPage;
    return (
      <div>
        <div className='app'>
          <ResizeManager fullWidth={width} fullHeight={height} mode={mode}/>
          <h1 className={'titleTxt'}></h1>
          <ul className={'sideNav'}>
            <Link to='/'>
              <li
                title='threeModel'
                onClick={me.click.bind(this, 'threeModel')}
                className={currentPage === 'threeModel' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'threeModel' ? 'block' : 'block'}}>THREE</span>
              </li>
            </Link>
            <Link to='/d3Model'>
              <li
                title='d3' onClick={me.click.bind(this, 'd3Model')}
                className={currentPage === 'd3Model' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'd3Model' ? 'block' : 'block'}}>D3</span>
              </li>
            </Link>
            <Link to='/svgModel'>
              <li
                title='svg'
                onClick={me.click.bind(this, 'svgModel')}
                className={currentPage === 'svgModel' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'svgModel' ? 'block' : 'block'}}>SVG</span>
              </li>
            </Link>
            <Link to='/cssModel'>
              <li
                title='css3'
                onClick={me.click.bind(this, 'cssModel')}
                className={currentPage === 'cssModel' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'cssModel' ? 'block' : 'block'}}>CSS3</span>
              </li>
            </Link>
            <Link to='/baduMap'>
              <li
                title='百度地图'
                onClick={me.click.bind(this, 'baduMap')}
                className={currentPage === 'baduMap' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'baduMap' ? 'block' : 'block'}}>BMAP</span>
              </li>
            </Link>
            <Link to='/echartsModel'>
              <li
                title='echarts'
                onClick={me.click.bind(this, 'echartsModel')}
                className={currentPage === 'echartsModel' ? 'page-title-selected' : 'page-title-default'}>
                <span style={{display: currentPage === 'echartsModel' ? 'block' : 'block'}}>ECHARTS</span>
              </li>
            </Link>
          </ul>
          <div>
            <Route exact path='/' component={ThreeModel}/>
            <Route path='/d3Model' component={D3Model}/>
            <Route path='/svgModel' component={SvgModel}/>
            <Route path='/cssModel' component={CssModel}/>
            <Route path='/baduMap' component={BaduMap}/>
            <Route path='/echartsModel' component={EchartsModel}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
