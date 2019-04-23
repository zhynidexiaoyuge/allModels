import React from 'react';
import risk from './image/risk.png';
import lose from './image/lose.png';
import down from './image/shrink.png';
import up from './image/relax.png';
const color = ['#1f7ccc', '#21ace1', '#69d0f4', '#c1ebfe'];
const img = {risk, lose, down, up};

class Text extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'none'
    };
    this.outMap = this.outMap.bind(this);
    this.hidden = this.hidden.bind(this);
  }
  outMap() {
    this.props.outMap();
  }

  hidden() {
    this.props.backMap();
    this.setState({
      display: 'none',
      top: 800
    });
  }

  show() {
    this.setState({
      display: 'block',
      top: 500
    });
  }

  render() {
    const options = this.props.options;
    return (
      <div>
        <div className={'map-xf-nanhai'} style={{
          top: options.nanhaiTop
        }}>南海诸岛</div>
        <div className={'map-xf-title'}>{options.title}</div>
        <div className={'map-xf-icon'}>
          {
            options.legend.map((s, i) => {
              return (
                <div key={'list' + i} style={{
                  backgroundImage: `url(${img[s.name]})`
                }}>{s.value}</div>
              );
            })
          }
        </div>
        {options.legendText ? <p className={'map-xf-legend-text'}>注：{options.legendText}</p> : ''}
        <div className={'map-xf-view-wrap'} style={{
          top: this.state.top
        }}>
          <p>高</p>
          {color.map((s, i) => {
            return (
              <div key={'color' + i} style={{
                width: 18,
                height: 30,
                backgroundColor: s
              }}></div>
            );
          })}
          <p>低</p>
          <p>注：{options.viewText}</p>
        </div>
        <div className={'map-xf-function-icon'} style={{
          display: options.showOut ? 'display' : 'none'
        }}>
          <div className={'map-xf-out'} style={{
            display: options.outFile ? 'display' : 'none'
          }} onClick={this.outMap}></div>
          <div style={{
            display: this.state.display
          }} className={'map-xf-back'} onClick={this.hidden}></div>
        </div>
      </div >
    );
  };
};

export default Text;
