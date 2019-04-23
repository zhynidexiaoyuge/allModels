import React from 'react';
import './timeSelect.css';
import TimeSelect from './timeSelect';

/* 格式化参数 */
let setParams = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 10 ? month : `${month}`;

  return {
    startDate: [year, month].join('-'),
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
          defaultDate={me.state.startDate}
          callBack={me.startDateClick.bind(this)}
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
}

export default homeTimeSelect;
