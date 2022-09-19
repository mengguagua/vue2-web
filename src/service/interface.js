// 业务接口都写在interface这个文件内
import Vue from 'vue';

/* 备案登记 */
// 企业备案
// 获取企业备案信息
export function queryComInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/queryComInfo`, req);
}
// 修改企业备案信息
export function updateComInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/updateComInfo`, req);
}
// 获取企业备案股东信息
export function getfeshInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/getfeshInfo`, req);
}
// 获取企业备案股东信息列表
export function queryfeshInfoList(req) {
  return Vue.axios.post(`/fe/fecominfo/queryfeshInfoList`, req);
}
// 保存企业备案股东信息
export function savefeshInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/savefeshInfo`, req);
}
// 删除企业备案股东信息
export function deletefeshInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/deletefeshInfo`, req);
}
// 修改企业备案股东信息
export function updatefeshInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/updatefeshInfo`, req);
}
// 申报企业备案
export function declareComInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/declareComInfo`, req);
}
// 变更企业备案
export function changeComInfo(req) {
  return Vue.axios.post(`/fe/fecominfo/changeComInfo`, req);
}

// 关联企业登记
// 获取企业登记信息列表
export function queryComReList(req) {
  return Vue.axios.post(`/fe/cr/queryComReList`, req);
}
// 保存企业登记信息
export function saveComRe(req) {
  return Vue.axios.post(`/fe/cr/saveComRe`, req);
}
// 修改企业登记信息
export function updateComRe(req) {
  return Vue.axios.post(`/fe/cr/updateComRe`, req);
}
// 删除企业登记信息
export function deleteComRe(req) {
  return Vue.axios.post(`/fe/cr/deleteComRe`, req);
}
// 获取股东信息列表
export function queryshInfoList(req) {
  return Vue.axios.post(`/fe/cr/queryshInfoList`, req);
}
// 保存股东信息
export function saveshInfo(req) {
  return Vue.axios.post(`/fe/cr/saveshInfo`, req);
}
// 修改股东信息
export function updaeteshInfo(req) {
  return Vue.axios.post(`/fe/cr/updateshInfo`, req);
}
// 删除股东信息
export function deleteshInfo(req) {
  return Vue.axios.post(`/fe/cr/deleteshInfo`, req);
}
// 根据海关编码查询企业信息
export function gtwCompanyInfo(req) {
  return Vue.axios.post(`/fe/cr/gtwCompanyInfo/${req}`);
}

// 公共方法
// 获取全部币种字典
export function dictionDataList(req) {
  return Vue.axios.post(`/fe/diction/dataList/` + req);
}
