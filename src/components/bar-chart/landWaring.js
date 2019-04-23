import React from 'react';
import echarts from 'echarts';
import bgs from './img/handle.png';
/**
 * 土地倒挂预警图
 */
class LandWaring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      <div >
        <div ref={(s) => {
          me.landWarn = s;
        }} style={{
          width: props.width,
          height: props.height,
          position: 'absolute',
          left: 45,
          top: 45
        }}>
        </div>
        <div ref={'tip'} style={{
          display: 'none',
          position: 'absolute',
          color: '#fff',
          fontSize: 14,
          pointerEvents: 'none',
          background: '#203e72'
        }}></div>
      </div>
    );
  }
  componentDidUpdate() {
    let me = this;
    if (!me.flag) {
      return;
    };
    if (!me.state.data) {
      return;
    }
    me._option.xAxis[0].data = me.state.data.xData;
    me._option.series[0].data = me.state.data.series1;
    me._option.series[1].data = me.state.data.series2;
    me._option.series[2].data = me.state.data.series3;
    me._option.series[3].data = me.state.data.series4;
    me.landWarnChart.setOption(me._option);
  }
  componentDidMount() {
    let me = this;
    me.landWarnChart = echarts.init(me.landWarn);
    me._option = {
      title: {
        text: '价格',
        left: 5,
        textStyle: {
          color: '#99a1aa',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#203e72',
        formatter: function (val) {
          return val[0].data + '<br />' + val[2].data;
        },
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['周边二手房', '新拿地楼面价'],
        right: 50,
        itemGap: 56,
        itemWidth: 19,
        itemHeight: 9
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '12%',
        top: '16%',
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
          end: 15,
          zoomLock: true,
          showDetail: false,
          handleIcon: 'image://' + bgs + ' ',
          handleStyle: { /* 手柄的样式*/
            color: '#294b97',
            borderColor: '#5476c2'
          },
          fillerColor: '#4cb7f4'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: [],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1c8cfb'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#1c8cfb'
            }
          },
          axisLabel: {
            color: '#6c7987',
            fontSize: 16,
            formatter: function (val) {
              if (val.length > 4) {
                return val.substring(0, 4);
              } else {
                return val;
              }
            }
          },
          triggerEvent: true
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#9ccdfd',
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            color: '#6c7987'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '周边二手房',
          type: 'bar',
          stack: '广告',
          data: [],
          itemStyle: {
            color: '#37e3d7'
          },
          barWidth: 24
        },
        {
          name: '',
          type: 'bar',
          stack: '广告',
          itemStyle: {
            color: 'rgba(60,162,249,0.2)'
          },
          data: []
        },
        {
          name: '新拿地楼面价',
          type: 'bar',
          barWidth: 5,
          stack: '搜索引擎',
          data: [],
          itemStyle: {
            color: '#4aabfc'
          },
          barWidth: 24
        },
        {
          name: '',
          type: 'bar',
          stack: '搜索引擎',
          itemStyle: {
            color: 'rgba(60,162,249,0.2)'
          },
          data: []
        }
      ]
    };
    me.landWarnChart.setOption(me._option);
    me.landWarnChart.on('mouseover', function (params) {
      if (params.componentType == 'xAxis') {
        let tt = me.refs.tip;
        tt.innerHTML = params.value;
        tt.style.left = params.event.event.offsetX - 40 + 'px';
        tt.style.top = params.event.event.offsetY - 10 + 'px';
        tt.style.display = 'block';
      }
    });
    me.landWarnChart.on('mouseout', function (params) {
      me.refs.tip.style.display = 'none';
    });
    me.landWarnChart.on('click', function (params) {
      if (params.componentType == 'xAxis') {
        me.props.companyClick(params.value);
      }
    });
  }
  componentWillUnmount() {
    if (this.landWarnChart) {
      this.landWarnChart.dispose();
    }
  }
}
export default LandWaring;
