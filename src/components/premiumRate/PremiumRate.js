import React from 'react';
import PriceIndex from '../priceIndex/PriceIndex';
import tip from './tip.png';

/**
 * 土地溢价率
 * */

class PremiumRate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      yAxisLabel: '{value}%'
    };
  }

  render() {
    return (
      <PriceIndex ref={(ref) => {
        this._lineChart = ref;
      }} width={this.props.width} height={this.props.height} symbolImg={tip} yAxisLabel = {this.state.yAxisLabel} />
    );
  }

  _setData(d) {
    this._lineChart._setData(d);
  }
}

export default PremiumRate;
