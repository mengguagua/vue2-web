// 公共组建放在/src/components目录下
import Vue from 'vue';
// 用于扫描components，自动注册组件
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const requireComponent = require.context(
  '.', true, /\.vue$/
  // 找到components文件夹下以.vue命名的文件
);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  let a = fileName.lastIndexOf('/');
  fileName = '.' + fileName.slice(a);
  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});
