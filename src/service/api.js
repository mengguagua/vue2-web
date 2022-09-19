// 全局拦截器，全局方法等逻辑
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Message, MessageBox } from 'element-ui';

Vue.use(VueAxios, axios);

const Api = {};
Api.install = () => {
  let apiCancelTokens = []; // 存放请求cancelToken

  // request请求拦截处理
  Vue.axios.interceptors.request.use(
    config => {
      if (config.method === 'get') {
        config.params = Object.assign({ t: Date.now() }, config.params);
      }
      config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'redirectUrl': location.href
      };
      return config;
    },
    error => Promise.reject(error)
  );

  // response响应拦截处理
  Vue.axios.interceptors.response.use(
    res => {
      // 没登录，跳转登录
      if (res.data.code === '318') {
        window.location.href = res.data.data;
        return;
      }
      // 请求成功，但是操作不成功时显示后端返回的错误信息
      if (res.data.code !== '200') {
        Message({
          message: res.data.msg || '获取数据失败，请稍后重试',
          type: 'error',
          duration: 2000
        });
        return Promise.reject(res.data);
      }
      return res.data.data;
    },
    err => {
      Message({
        message: `${err.response.data.msg || '服务访问失败'}`,
        type: 'error'
      });
      return Promise.reject(err);
    }
  );

  // 全局接口列表
  Vue.prototype.Api = {
    // 查询用户信息
    queryUserInfo() {
      return Vue.axios.post('/fe/sys/user');
    },
    // 查询菜单信息
    queryMenu() {
      return Vue.axios.post('/fe/sys/menu');
    },
  };
};

export default Api;
