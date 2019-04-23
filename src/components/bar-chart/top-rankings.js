import React from 'react';
import echarts from 'echarts';
import './bar.css';
/**
 * top 排行
 */
class TopRankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    });
  };
  _addListLeft() {
    let me = this;
    if (!me.state.data) {
      return;
    }
    let datas = me.state.data.seriesVal;
    return datas.map((s, i) => {
      return <li key={i}></li>;
    });
  }
  _addListRight() {
    let me = this;
    if (!me.state.data) {
      return;
    }
    let datas = me.state.data.seriesVal;
    return datas.map((s, i) => {
      return <li key={i}></li>;
    });
  }
  _option(bool, color, direction) {
    return {
      grid: {
        left: '15%',
        right: '1%',
        bottom: '0%',
        top: '30%',
        containLabel: true
      },
      legend: {
        data: ['均价涨幅%', '均价跌幅%'],
        top: '17%',
        textStyle: {
          fontSize: 16,
          color: '#6c7987'
        }
      },
      xAxis: {
        type: 'value',
        inverse: bool,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false,
          inside: 'true'
        },
        axisLine: {
          lineStyle: {
            color: '#2abce1',
            fontSize: 14
          }
        },
        axisLabel: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        position: direction,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#6c7987',
          fontSize: 16,
          align: 'center'
        },
        data: []
        // this.state.data.Ydata1
      },
      series: [
        {
          // for shadow
          type: 'bar',
          silent: true,
          label: {
            normal: {
              show: false, // 背景数字
              position: 'right',
              offset: [5, 0],
              formatter: function (d) {
                return d.data.a;
              },
              textStyle: {
                color: '#fff'
              }
            }
          },
          barWidth: '25px',
          barGap: '-100%',
          // barCategoryGap: '50%',
          animation: false,
          itemStyle: {
            normal: {color: color}
            // barBorderRadius:10
          },
          data: []
        },
        {
          name: '',
          type: 'bar',
          barWidth: '25px',
          itemStyle: {
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              color: '#fff',
              fontSize: 16
            }
          },
          data: this.state.data.seriesVal
        }

      ]
    };
  };
  componentDidUpdate() {
    let me = this;
    if (!me.state.data) {
      return;
    }
    let options = me._option(true, 'rgba(60,162,249,0.1)', 'left');
    let option = me._option(false, 'rgba(60,162,249,0.1)', 'right');
    let dataMax = 0;
    for (let i = 0; i < me.state.data.seriesVal.length; i++) {
      if (dataMax < me.state.data.seriesVal[i]) {
        dataMax = me.state.data.seriesVal[i];
      }
    }
    dataMax = 1.1 * dataMax;

    let dataShadow = [];
    for (let j = 0; j < me.state.data.seriesVal.length; j++) {
      dataShadow.push(
        {
          value: dataMax,
          a: me.state.data.seriesVal[j],
          label: {
            normal: {
              textStyle: {
                color: '#12fdfd'
              },
              fontSize: 13
            }
          }
        }
      );
    }

    options.series[0].data = dataShadow;
    option.series[0].data = dataShadow;
    // 左
    me.myCharts = echarts.init(this.dom1Ref);
    options.yAxis.data = me.state.data.Ydata1;
    options.legend.left = '55%';
    options.series[1].name = '均价涨幅%';
    options.series[1].itemStyle = {
      normal: {
        borderWidth: 1,
        borderColor: '#ffb400',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#febc0b'
          },
          {
            offset: 0.5, color: '#ffae00'
          },
          {
            offset: 1, color: 'rgba(243,219,157,0.5)'
          }
          ],
          globalCoord: false
        }
      }
    };
    me.myCharts.setOption(options);
    // 右
    me.myChart = echarts.init(this.dom2Ref);

    option.yAxis.data = me.state.data.Ydata2;
    option.legend.left = '30%';
    option.series[1].name = '均价跌幅%';
    option.series[1].itemStyle = {
      normal: {
        borderWidth: 1,
        borderColor: '#4aabfc',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: 'rgba(165,216,253,0.5)'
          }, {
            offset: 0.5, color: '#4aabfc'
          },
          {
            offset: 1, color: '#5cb4fc'
          }
          ],
          globalCoord: false
        }
      }
    };
    me.myChart.setOption(option);
  };
  render() {
    const me = this;
    const props = me.props;
    return (
      <div style={{
        position: 'relative'
      }}>
        <ul className={'imgSrcList'}>
          {me._addListLeft()}
        </ul>
        <div ref={(s) => {
          me.dom1Ref = s;
        }} style={{
          width: props.width,
          height: props.height,
          position: 'absolute',
          left: 10,
          top: 0
        }}></div>
        <div ref={(s) => {
          me.dom2Ref = s;
        }} style={{
          width: props.width,
          height: props.height,
          position: 'absolute',
          left: 280,
          top: 0
        }}></div>
        <ul className={'imgSrcList imgSrc'}>
          {me._addListRight()}
        </ul>
      </div>
    );
  }
  componentWillUnmount() {
    let me = this;
    if (me.myChart && me.myCharts) {
      me.myChart.dispose();
      me.myCharts.dispose();
    }
  }
}
export default TopRankings;
