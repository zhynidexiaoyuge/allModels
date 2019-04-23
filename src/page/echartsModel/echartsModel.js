import './echartsModel.css';
import './antd.css';
import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import {Route} from 'react-router-dom';
import Panel from '../../components/panel/Page';
import BarChart from '../echartsModel/barChart/barChart';
import LineChart from '../echartsModel/lineChart/lineChart';
import PieChart from '../echartsModel/pieChart/pieChart';


class Page extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      title: '柱状图'
    };
  }

  goPage(path, name) {
    this.setState({
      title: name
    });
    this.props.history.push(this.props.match.path + path);
  }

  render() {
    return (
      <div>
        <LocaleProvider locale={zhCN}>
          <Panel title={this.state.title} titleWidth={220} width={1770} height={940} top={110} left={120}>
            <ul className="sys-nav">
              <li style={{display: this.state.title == '柱状图' ? 'none' : 'block'}}>
                <a onClick={ this.goPage.bind(this, '/echartsModel', '柱状图')}>柱状图</a>
              </li>
              <li style={{display: this.state.title == '折线图' ? 'none' : 'block'}}>
                <a onClick={ this.goPage.bind(this, '/lineChart', '折线图') }>折线图</a>
              </li>
              <li style={{display: this.state.title == '饼图' ? 'none' : 'block'}}>
                <a onClick={ this.goPage.bind(this, '/pieChart', '饼图') }>饼图</a>
              </li>
            </ul>
            <div className="item-panel">
              <Route exact path={`${this.props.match.path}/`} component={BarChart}/>
              <Route path={`${this.props.match.path}/lineChart`} component={LineChart}/>
              <Route path={`${this.props.match.path}/pieChart`} component={PieChart}/>
            </div>
          </Panel>
        </LocaleProvider>
      </div>
    );
  }
}

export default Page;
