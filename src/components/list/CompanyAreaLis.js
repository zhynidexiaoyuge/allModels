import React from 'react';
import './companyInfoList.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '--公司基本信息',
      data: [
        {
          name: '统一社会信用代码',
          value: ''
        },
        {
          name: '组织机构代码',
          value: ''
        }
      ]
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
