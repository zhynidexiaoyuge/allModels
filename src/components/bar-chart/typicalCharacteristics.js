import React from 'react';
import echarts from 'echarts';

/**
 * 房价典型特征展示
 */
class TypicalCharacteristics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.container = React.createRef();
  }

  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    });
  }
  render() {
    const me = this;
    const props = me.props;
    return (
      <div>
        <div ref={(s) => {
          me.container = s;
        }} style={{
          width: props.width,
          height: props.height,
          position: 'absolute',
          left: 45,
          top: 55
        }}></div>
      </div>
    );
  }
  componentDidUpdate() {
    let me = this;
    if (!me.flag) {
      return;
    }
    ;
    if (!me.state.data) {
      return;
    }
    let yMax = Math.max(...me.state.data.seriesData);


    let dataShadow = [];
    for (let i = 0; i < me.state.data.seriesData.length; i++) {
      dataShadow.push(yMax);
    }
    me._option.xAxis.data = me.state.data.xdata;
    me._option.series[0].data = dataShadow;
    me._option.series[1].data = me.state.data.seriesData;
    me.priceChart.setOption(me._option);
  }

  componentDidMount() {
    let me = this;
    me.priceChart = echarts.init(me.container);
    me._option = {
      title: {
        x: 'center',
        text: '相对比值(log坐标)',
        left: 1,
        top: 7,
        textStyle: {
          color: '#8e97a2',
          fontSize: 14
        }
      },
      tooltip: {
        backgroundColor: '#203e72',
        formatter: '{c}'
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#6c7987'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#379afb'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#379afb'
          }
        }
      },
      yAxis: {
        type: 'log',
        logBase: 10,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1c8cfb'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#9ccdfd',
            type: 'dashed'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
        // min: 0,
        // max: 10
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'rgba(60,162,249,0.1)'
            }
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          barWidth: '32px',
          data: '',
          animation: false,
          tooltip: {
            show: false
          }
        },
        {
          type: 'bar',
          barWidth: 32,
          itemStyle: {
            normal: {
              color: '#4aabfc'
            },
            emphasis: {
              color: '#ffbd4a'
            }
          },
          data: []
        }
      ]
    };
    me.priceChart.setOption(me._option);
  }
  componentWillUnmount() {
    if (this.priceChart) {
      this.priceChart.dispose();
    }
  }
}

export default TypicalCharacteristics;
