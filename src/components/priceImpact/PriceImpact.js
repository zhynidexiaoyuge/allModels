import React from 'react';
import echarts from 'echarts';
import line from './line.png';

/**
 * 房价影响
 * */

class PriceImpact extends React.Component {
  _type = 1; // 1-回看 2-预测
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }

  render() {
    const me = this;
    const props = me.props;
    return (
      <div ref={(s) => {
        me.lineChart = s;
      }} style={{width: props.width, height: props.height}}></div>
    );
  }

  _setData(d, obj) {
    console.log(obj);
    this._type = obj.type;
    this.setState({
      data: d
    });
  }

  componentDidUpdate() {
    let me = this;
    if (me.state.data && me._type == 1) {
      let res = me.state.data;
      let datas = res.result;
      let xData = datas.months.reverse();
      me.option.xAxis.data = xData;
      me.option.series[0].data = datas.prices.reverse();
      me.option.series[1].data = [];
      me.myChart.setOption(me.option, true);
      me.myChart.on('click', function (e) {
        let seriesData = [];
        for (let name in datas.forecastmap) {
          if (e.name == name) {
            let data = datas.forecastmap[name];
            let key = {};
            xData.map((e, i) => {
              key[e] = '';
              data.map((t, j) => {
                if (e == t[0]) {
                  key[t[0]] = t[1];
                }
              });
            });
            seriesData.push(key);
          }
        }
        let arrData = [];
        for (let name in seriesData[0]) {
          arrData.push(seriesData[0][name]);
        }
        me.option.series[1].data = arrData;
        me.myChart.setOption(me.option, true);
      });
    } else if (me.state.data && me._type == 2) {
      let datas = me.state.data.result;
      let xData = [];
      let dataYc = [];
      let setData = datas.ycprices.reverse();
      for (let i = 0; i < datas.months.length - 1; i++) {
        dataYc.push('');
      }
      dataYc.push(datas.prices[0]);
      xData.push(...datas.months.reverse(), ...datas.ycmonths);
      xData.map((t, i) => {
        datas.ycmonths.map((d, j) => {
          if (t === d) {
            dataYc.push(setData[j]);
          }
        });
      });
      me.option.xAxis.data = xData;
      me.option.series[0].data = datas.prices.reverse();
      me.option.series[1].data = dataYc;
      me.myChart.setOption(me.option, true);
    }
  }

  componentDidMount() {
    let me = this;
    let dom = me.lineChart;
    me.myChart = echarts.init(dom);
    me.option = {
      color: ['#2fd1c6', '#4aabfc'],
      tooltip: {
        trigger: 'axis',
        enterable: true,
        // hideDelay: 100,
        triggerOn: 'click',
        formatter: function (p) {
          let data = me.state.data.result.forecastzcmap;
          let divBox = '';
          for (let name in data) {
            if (p[0].name == name) {
              divBox = document.createElement('div');
              data[name].forEach((t, i) => {
                divBox.innerHTML += `<div title = ${t.policyName}>${i + 1}. ${t.policyName.substring(0, 6)}...</div>`;
              });
              return `<div style=display:flex;flex-direction: row;font-size:14px;>
                      <div style=margin-right:34px;>
                         <h3 style=color:#fecb2f;font-size:16px;>影响政策列表</h3>
                         ${divBox.innerHTML}
                      </div>
                      <div style=margin-left:16px;>
                        <h3 style=color:#2afd9f;font-size:16px;>出台政策列表</h3>
                         ${divBox.innerHTML}
                      </div>
                  </div>`;
            }
          }
        },
        enterable: true,
        triggerOn: 'click',
        padding: [5, 10],
        backgroundColor: '#203e72'
      },
      legend: {
        data: [{
          name: '历史价格',
          icon: 'rect'
        }, {
          name: '分析价格',
          icon: `image://${line}`
        }],
        textStyle: {
          color: '#6c7987',
          fontSize: 14
        },
        right: 20,
        top: 60,
        itemWidth: 22,
        itemHeight: 6,
        itemGap: 35
      },
      xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: [],
        boundaryGap: ['10%', '10%'],
        axisLine: {
          lineStyle: {
            color: '#1c8cfb'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6c7987',
            fontSize: 14
          }
        }
      },
      grid: {
        top: '25%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        name: '价格',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#85c1fd'
          }
        },
        splitArea: {
          interval: 1,
          show: true,
          areaStyle: {
            color: ['#fff', '#ebf6fe']
          }
        },
        axisLabel: {
          textStyle: {
            color: '#6c7987',
            fontSize: 14
          }
        },
        nameTextStyle: {
          color: '#6c7987',
          fontSize: 14
        }
      },
      series: [{
        name: '历史价格',
        type: 'line',
        symbolSize: 5,
        lineStyle: {
          type: 'solid',
          width: 2,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        data: []
      }, {
        name: '分析价格',
        type: 'line',
        lineStyle: {
          type: 'dashed',
          width: 2,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        data: []
      }]
    };
    me.myChart.setOption(me.option, true);
  }
}

export default PriceImpact;
