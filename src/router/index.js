import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/pages/index');
const home = () => import('@/pages/home');

const register = () => import('@/pages/registration/register');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: home,
    },
    {
      path: '/registration',
      name: '一级菜单',
      component: index,
      children: [
        { path: 'register', name: '二级菜单', component: register },
      ]
    },
  ]
})
