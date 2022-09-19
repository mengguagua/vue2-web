import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/pages/index');
const home = () => import('@/pages/home');

const registrationCompany = () => import('@/pages/registration/company');
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
      name: '备案登记',
      component: index,
      children: [
        { path: 'company', name: '企业备案', component: registrationCompany },
        { path: 'register', name: '关联企业登记', component: register },
      ]
    },
  ]
})
