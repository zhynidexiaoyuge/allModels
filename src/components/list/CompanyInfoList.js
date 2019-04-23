import React from 'react';
import './companyInfoList.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   name: '九次方大数据信息集团有限公司基本信息',
      //   data: [
      //     {
      //       name: '统一社会信用代码',
      //       value: '91440300192181490G'
      //     },
      //     {
      //       name: '组织机构代码',
      //       value: '192181490'
      //     },
      //     {
      //       name: '注册号',
      //       value: '440301102900139'
      //     },
      //     {
      //       name: '经营状态',
      //       value: '存续（在营、开业、在册）'
      //     },
      //     {
      //       name: '公司类型',
      //       value: '股份有限公司(上市)'
      //     },
      //     {
      //       name: '成立日期',
      //       value: '1984年05月30日'
      //     },
      //     {
      //       name: '登记机关',
      //       value: '深圳市市场监'
      //     },
      //     {
      //       name: '注册资本',
      //       value: '1099521.0218 万人民币'
      //     }
      //   ]
    };
  }

  setData(d) {
    this.setState({
      name: d.name,
      data: d.data
    });
  }

  createList() {
    const me = this;
    let data = me.state.data;
    if (!data) {
      return;
    }
    return data.map((s, i) => {
      return (
        <li className={'company-info-xf-li'} key={'list' + i}>
          <div className={'company-info-xf-dot'}></div>
          <p>{s.name}:</p>
          <p>{s.value}</p>
        </li>
      );
    });
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <div className={'company-info-xf-wrap'}>
        <p className={'company-info-xf-title'}>{this.state.name}</p>
        <ul className={'company-info-xf-ul'}>
          {this.createList()}
        </ul>
        <div className={'company-info-xf-btn'} onClick={this.close.bind(this)}></div>
      </div>
    );
  }
};

export default Page;
