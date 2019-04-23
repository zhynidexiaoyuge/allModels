import ApiBuilder from '../../ApiBuilder';

const builder = new ApiBuilder({
  baseUrl: 'http://localhost:3000/apis',
  simulation: false
});

/**
 * http://0.0.0.0:8080/
 * @type {string}
 */

builder.BASEURL_01 = window.BASEURL_01 || 'http://192.168.12.36';
builder.BASEURL_02 = window.BASEURL_02 || 'http://172.16.101.213:60030';
// builder.BASEURL_03 = window.BASEURL_03 || 'http://172.16.113.212:60030';

export default builder;
