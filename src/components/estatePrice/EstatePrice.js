import React from 'react';
import './EstatePrice.css';

/**
 * 上月区（县）楼盘价格信息
 * */

class EstatePrice extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  };

  _upSort(name) {
    if (typeof this.props.handleClickUpSort == 'function') {
      this.props.handleClickUpSort({
        name: name,
        type: '升序'
      });
    }
  }

  _downSort(name) {
    if (typeof this.props.handleClickDownSort == 'function') {
      this.props.handleClickDownSort({
        name: name,
        type: '降序'
      });
    }
  }

  render() {
    if (this.state.data) {
      const data = this.state.data;
      return (
        <div style={{position: 'absolute'}}>
          <table className={'e_tableList'}>
            <thead className={'e_tableHead'}>
              <tr>
                <th>序号</th>
                <th>楼盘</th>
                <th>均价<span onClick={this._upSort.bind(this, '均价')}>↑</span><span
                  onClick={this._downSort.bind(this, '均价')}>↓</span>
                </th>
                <th>同比</th>
                <th>销售率</th>
                <th>租金<span onClick={this._upSort.bind(this, '租金')}>↑</span><span
                  onClick={this._downSort.bind(this, '租金')}>↓</span></th>
              </tr>
            </thead>
            <tbody className={'e_tableBody'}>
              {
                data.map((t, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td width={'30%'}>{t.buildingName}</td>
                      <td>{t.avgPrice}</td>
                      <td>{t.showPrice}</td>
                      <td>{t.ratio}%</td>
                      <td>{t.rentMoney}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div style={{fontSize: 16, color: '#fff'}}>暂无数据</div>
      );
    }
  }

  _setData(d) {
    this.setState({
      data: d
    });
  }
};
export default EstatePrice;
