import React from 'react';
import './timeSelect.css';
import TimeSelect from './timeSelect';

/* 格式化参数 */
let setParams = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;

  return {
    startDate: [year - 1, month].join('-'),
    endDate: [year, month].join('-')
  };
};

/*
* 事故智能分析时间组件
* @author msh
* */
class homeTimeSelect extends React.Component {
  constructor() {
    super();
    let me = this;
    me.state = setParams();
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div className={'intelligent-analysis-select-box'} style={props.style}>
        <div className={'intelligent-analysis-select-text01'}>时间 :</div>
        <TimeSelect
          style={{
            width: 100,
            height: 32,
            top: 0,
            left: 100
          }}
          defaultDate={props.startDate || me.state.startDate}
          callBack={me.startDateClick.bind(this)}
        />
        <div className={'intelligent-analysis-select-text02'}>至</div>
        <TimeSelect
          style={{
            width: 100,
            height: 32,
            top: 0,
            left: 235
          }}
          defaultDate={props.endDate || me.state.endDate}
          callBack={me.endDateClick.bind(this)}
        />
      </div>
    );
  }
  startDateClick(n) {
    let me = this;
    let state = me.state;
    state.startDate = n;
    me.props.startClick(n);
  }

  endDateClick(n) {
    let me = this;
    let state = me.state;
    state.endDate = n;
    me.props.endClick(n);
  }
}

export default homeTimeSelect;
