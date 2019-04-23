import builder from './api-common';

/* 房价指数 */
export const housePriceIndexData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceIndex/salePriceIndex',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/priceIndex/housePriceIndex.json',
  isFormData: true
});
/* 房价指数下拉 */
export const housePriceSelect = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/address/majorCity',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/riskAnalysis/premiumRate.json'
});
/* 租金指数 */
export const rendIndexData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceIndex/rentPriceIndex',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/priceIndex/rentIndex.json',
  isFormData: true
});
/* 房价指数下拉 */
export const rendIndexSelect = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/address/majorCity',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/riskAnalysis/premiumRate.json'
});
/* 房价典型特征展示*/
export const characteRistics = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceIndex/priceTypeFeatureShow',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/priceIndex/characteRistics.json',
  isFormData: true
});

/* force*/
export const mapData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceIndex/priceIndexByCity',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});
