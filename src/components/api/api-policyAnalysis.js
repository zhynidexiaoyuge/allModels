import builder from './api-common';

/* 价格影响 回看*/
export const priceImpactData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/policy/priceLookback',
  method: 'POST',
  simulation: false,
  simulator: '/static/api/policyAnalysis/priceImpact.json',
  isFormData: true
});
  /* 价格影响 预测*/
  export const priceForecast = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/policy/priceForecast',
    method: 'POST',
    simulation: false,
    simulator: '/static/api/policyAnalysis/priceImpact.json',
    isFormData: true
  });
/* map */
export const mapData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/policy/policyRegulation',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});

/* 政策列表 */
export const policyList = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/policy/policyList',
  method: 'POST',
  simulation: false,
  simulator: '/',
  isFormData: true
});
