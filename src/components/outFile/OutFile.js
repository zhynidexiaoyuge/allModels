import React from 'react';
import './outFile.css';
import close from './close.png';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      download: '',
      downloadText: ''
    };
  }

  setData(d) {
    this.setState({download: d, downloadText: d});
  }

  exportData(jsonData, type) {
    this.lock = true;
    this.setState({
      jsonData: jsonData,
      postType: type,
      downloadText: `http://192.168.12.36/priceMonitorIndex/export?type=${type}&jsonStr=${JSON.stringify(jsonData)}`
    });
  }

  click(type) {
    if (type) {
      if (this.lock) {
        // let jsonStr = this.state.jsonData || '{"msg":"���óɹ�","result":[{"areaName":"�Ϻ�","avgPrice":400.0,"transactionNum":600,"preAvgPrice":null,"preTransactionNum":null,"preAvgPriceRatio":0,"preTransactionNumRatio":0},{"areaName":"����","avgPrice":125.0,"transactionNum":180,"preAvgPrice":50,"preTransactionNum":100,"preAvgPriceRatio":60,"preTransactionNumRatio":0}],"code":"1"}';
        // this.postcall('http://172.16.101.213:60030/priceMonitorIndex/export', {type: this.state.postType, jsonStr: jsonStr});
        this.props.requestOutFile(this.state.postType, this.state.jsonData);
        this.lock = false;
      }
    } else {
      this.props.close();
    }
  }

  // postcall(url, data) {
  //   axios({
  //     method: 'post',
  //     url,
  //     data
  //   });
  // }

  postcall(url, params, target) {
    let tempform = document.createElement('form');
    tempform.action = url;
    tempform.method = 'post';
    tempform.style.display = 'none';
    if (target) {
      tempform.target = target;
    }

    for (let x in params) {
      let opt = document.createElement('input');
      opt.name = x;
      opt.value = params[x];
      tempform.appendChild(opt);
    }

    let opt = document.createElement('input');
    opt.type = 'submit';
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);
  }

  render() {
    return (
      <div className={'out-file-xf-wrap'}>
        <div className={'out-file-xf-title'}>
          <p>导出数据文件示例</p>
          <div onClick={this.click.bind(this, 0)} style={{
            backgroundImage: `url(${close})`
          }}></div>
        </div>
        <div className={'out-file-xf-content'}>
          <p>路径：</p>
          <textarea value={this.state.downloadText} readOnly></textarea>
        </div>
        <div className={'out-file-xf-button'}>
          <a href={this.state.download || '#'} target={this.state.download ? '_blank' : '_self'}>
            <div ref={'outRef'} className={'out-file-xf-button-btn'}
              onClick={this.click.bind(this, 1)}>导出
            </div>
          </a>
          <div ref={'closeRef'} className={'out-file-xf-button-btn'} onClick={this.click.bind(this, 0)}>取消</div>
        </div>
      </div>
    );
  }
};

export default Page;
