import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Api from './service/api';
import zjport from 'zj-port';
import mixin from '@/plugins/mixin/mixin';
// 扫描components下所有组件进行注册，优化import（build时按依赖引用也不会有冗余）
import './components/global.js';


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Api);
Vue.use(zjport);
Vue.mixin(mixin)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
