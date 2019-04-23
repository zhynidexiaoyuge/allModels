import React from 'react';
import echarts from 'echarts';
import tip from './tip.png';

/**
 * 房价指数
 * */

class PriceIndex extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    let me = this;
    let dom = me.lineChart;
    me.myChart = echarts.init(dom);
    me.option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        splitLine: {show: false},
        data: [],
        boundaryGap: false,
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
        top: '30%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },

      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#85c1fd'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#6c7987',
            fontSize: 14
          },
          formatter: me.props.yAxisLabel || {}
        }
      },
      series: [{
        type: 'line',
        smooth: true,
        data: [],
        itemStyle: {
          normal: {
            color: '#3ca2f9'
          }
        },
        lineStyle: {
          type: 'solid',
          color: me.props.color || '#3ca2f9',
          width: 2,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        markPoint: {
          symbol: me.props.symbolImg ? `image://${me.props.symbolImg}` : `image://${tip}`,
          symbolSize: [30, 40],
          symbolOffset: [0, '-50%'],
          itemStyle: {
            normal: {
              color: '#3ca2f9'
            }
          },
          data: [{
            type: 'max',
            name: '最大值',
            label: {
              show: true,
              color: '#203f72'
            }
          }, {
            type: 'min',
            name: '最小值',
            label: {
              show: true,
              color: '#203f72'
            }
          }]
        }
      }]
    };
    me.myChart.setOption(me.option);
  }

  componentDidUpdate() {
    if (this.state.data) {
      let data = this.state.data;
      this.option.xAxis.data = data[0].xData;
      this.option.series[0].data = data[0].seriesData[0].value;
      this.myChart.setOption(this.option);
    }
  }
}

export default PriceIndex;
