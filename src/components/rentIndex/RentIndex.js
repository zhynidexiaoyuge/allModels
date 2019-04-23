import React from 'react';
import PriceIndex from '../priceIndex/PriceIndex';
import tip from './greenTip.png';

/**
 * 租金指数
 * */

class RentIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }

  render() {
    return (
      <PriceIndex ref={(ref) => {
        this._lineChart = ref;
      }} width={680} height={300} color={'#2fd1c6'} symbolImg={tip} />
    );
  }

  _setData(d) {
    this._lineChart._setData(d);
  }
}

export default RentIndex;
