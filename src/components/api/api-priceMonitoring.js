import builder from './api-common';

/* 重点城市历史走势占比 */
export const trendAccountData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/housingHistory',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/priceMonitoring/trendAccount.json'
});

// top排行
export const priceIncrease = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/preMonthHousingTop',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/priceMonitoring/topRange.json'
});
export const priceDrop = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/preMonthHousingTop',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/priceMonitoring/topRange.json'
});
/* 上月区（县）楼盘价格信息 */
export const estatePriceData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/buildingPrice',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/priceMonitoring/estatePrice.json'
});

/* 近一年房产交易量价分析 */
export const oneYearHouseTrade = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/nearOneYearHousing',
  method: 'GET',
  simulation: false,
  simulator: './static/api/priceMonitoring/oneYearHouseTrade.json'
});

/* map */
export const housingMap = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/housingMap',
  method: 'GET',
  simulation: false,
  simulator: './static/api/priceMonitoring/oneYearHouseTrade.json'
});
/* 列表下拉获取内容 */
export const selectTxt = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/queryReginByCity',
  method: 'GET',
  simulation: true,
  simulator: './static/api/priceMonitoring/queryReginByCity.json'
});

/* 分析--导出 */
export const outFile = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/priceMonitorIndex/export',
  method: 'POST',
  simulation: false,
  simulator: './',
  isFormData: true
});
