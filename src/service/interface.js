// 业务接口都写在interface这个文件内
import Vue from 'vue';

/* 接口备注 */
export function aa(req) {
  return Vue.axios.post(`/url/a`, req);
}
export function bb(req) {
  return Vue.axios.get(`/url/b`, {params: req});
}
