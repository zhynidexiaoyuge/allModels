import React from 'react';
import echarts from 'echarts';
import bgs from './img/handle.png';

/**
 * 重点城市历史走势占比
 * */

class TrendAccount extends React.Component {
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

  _setData(d) {
    this.setState({
      data: d
    });
  }

  componentDidUpdate() {
    let me = this;
    me.option.series = [];
    me.option.xAxis.data = [];
    if (me.state.data) {
      me.option.xAxis.data = me.state.data.xData;
      let data = me.state.data.seriesData;
      data.map((t) => {
        me.option.series.push({
          name: t.name,
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: t.value
        });
        me.option.legend.data.push(t.name);
      });
    }
    me.myChart.setOption(me.option, true);
  }

  componentDidMount() {
    let me = this;
    let dom = me.lineChart;
    me.myChart = echarts.init(dom);
    me.option = {
      color: ['#36b6ff', '#ff6969', '#ffbd4a', '#aae177', '#68e5c8', '#3ed1f5', '#3099fb', '#43d7ca', '#2b84fb', '#9073fb', '#ed85fc', '#95b4fc', '#fc9c90'],
      tooltip: {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          return [point[0], '10%'];
        }
      },
      legend: {
        left: 'left',
        data: [],
        textStyle: {
          color: '#6c7987',
          fontSize: 14
        },
        top: 40,
        left: 20,
        icon: 'rect',
        itemWidth: 22,
        itemHeight: 8,
        itemGap: 20
      },
      xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: '#6c7987',
            fontSize: 14
          }
        },
        axisLine: {
          lineStyle: {
            color: '#1c8cfb'
          }
        }
      },
      grid: {
        top: '50%',
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          type: 'slider',
          backgroundColor: '#dddddd',
          height: 10,
          bottom: 11,
          start: 0,
          end: 80,
          showDetail: false,
          handleIcon: 'image://' + bgs + ' ',
          handleStyle: {
            /* 手柄的样式*/
            color: '#294b97',
            borderColor: '#5476c2'
          },
          fillerColor: '#4cb7f4'
        }
      ],
      yAxis: {
        type: 'value',
        name: '均价',
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
      series: []
    };
    me.myChart.setOption(me.option);
  }
}

export default TrendAccount;
