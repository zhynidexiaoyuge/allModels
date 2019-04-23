import builder from './api-common';

/* 土地倒挂预警图 */
export const landWaring = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showLandUpsideDown',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/riskAnalysis/landWaring.json',
  isFormData: true
});
/* 土地溢价率 */
export const pemiumRateData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showLandPremiumRate',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/riskAnalysis/premiumRate.json',
  isFormData: true
});
//http://192.168.12.36/address/majorCity
/* 土地溢价率下拉 */
export const pemiumRateSelect = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/address/majorCity',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/riskAnalysis/premiumRate.json'
});
/* 土地溢价率数据导出 */
export const exportRateData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/keyPropertyAnalysis/exportLandPremiumRate',
  method: 'GET',
  simulation: false,
  simulator: '/static/api/riskAnalysis/premiumRate.json'
});
/* map */
export const mapData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showLandTransaction',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});

/* 重点企业 */
export const vipCompany = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showKeyEnts',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});
export const showKeyEntsDetail = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showKeyEntsDetail',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});

export const ownCompany = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showEntItemsDistribution',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});

export const companyArea = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/riskAnalysis/showItemsDetail',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});
