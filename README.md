## vue2管理后台模板项目

### 下载依赖
- npm install
- tip: 假如less报错，按顺序先下载 npm install less-loader@5.0.0 -D 再npm install less
- sass依赖下载 npm install node-sass@npm:dart-sass 下载dart-sass代替node-sass，再下载sass-loader@7.1.0 和 sass
### 注意事项
- 图片引用，使用～@开头，@对应src目录。  例如：~@/assets/images/top1.png

### 可用字体
   示例见404页面
   - Roboto
   - Open Sans
   - Poppins
   - Source Sans Pro
   - Ubuntu

# 前端指南v1.1

[TOC]

## 前端工作流程简述

![前端项目流程.png](https://s2.loli.net/2022/04/07/7GzjHekTCgJIAhv.png)

1、获取需求：通过各方(产品，前端同事等)获取开发需求
2、处理需求：理解需求内容是什么，评估需求工时，加入工作排期内
3、确认角色：确定产品，后端，UI具体是哪个同事
4、建立沟通群(较大需求)：在需求比较大时，建议建群，及时同步进度，沟通问题
5、开发代码：根据原型或UI设计稿，以及需求文档开发代码
6、提交测试：自测后提测，以及修复bug
7、协助升级生产环境

## 基于vue2约定规范

### 组件书写顺序

  0、props
  1、components
  2、computed
  3、watch
  4、data
  5、methods
  6、生命周期函数

### 书写规范

webpack默认的eslint规范，有额外修改的见.eslintrc.js

### html预处理

采用pug，参考https://www.pugjs.cn/language/attributes.html

### 自定义组件引用

代码见 /src/components/global.js
扫描components下所有vue组件，进行注册，在其它组件直接使用即可（组件名取文件名）

### 子组件约定

公用且和业务无关的组件，以组件名建文件夹，在文件夹下新建组件；和业务耦合的子组件，直接在components下新建组件。公用且和业务无关的组件可以申请放置到公司组件库 **zjport**
Tip：部分页面相似，不建议将类似菜单抽象成一个组件，原则上一个菜单对应一个独立组件，避免耦合，后期有需求变更修改也清晰

### 接口定义约定

所有接口在src/service/interface.js内定义，且接口必须以**注释**进行功能模块归类

### mixin使用

使用mixin抽象全局公共的部分，用以复用，如：data内容，methods方法

### 常用样式抽离

一些常用的样式，例如dialog，table为了避免重复编码，都抽离到 src/assets/scss/mixin.scss 文件内

### 使用charts说明

使用vue-chart 节省编写绘制的代码，主要设置option即可。目前是vue2，若要更换为vue3：相关安装见：https://www.npmjs.com/package/vue-echarts

### cookie使用

使用vue-cookie，支持set get等方法，方便操作

### 轮询调用接口约定

使用格式如下：

```js
let _this = this;
// 内部调用methods对象的search，需要取下正确的this对象
this.timer = setInterval(() => _this.search(), 1000 * 60);
// 退出销毁
destroyed() {
  clearInterval(this.timer);
}
```

### 正则校验使用

统一使用test方法，语法为：/正则表达式/.test(字符串)，匹配则返回true,如下：

```js
let pattern = /^[A-Za-z0-9]*$/
pattern.test('123ABCabc') // 返回true
```

### 浏览器打印输出pdf

调用window.print();即可

### ElementUI 默认样式修改

- 在vue文件内单独另起一个<style lang="scss"></style> 注意：去掉scoped,全局生效；或者 /deep/

### Mac开启谷歌浏览器跨域

说明：命令中的文件夹路径`/Users/gcc/Documents/MyChromeDevUserData`是用来保存关闭安全策略后的用户信息，名字可以随意取，位置也可以随意放。

* 开启

  open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/gcc/Documents/MyChromeDevUserData

* 关闭

  关闭新的浏览器(进程)即可

### 分析VUE打包文件模块组成及体积

参考：https://www.jeffjade.com/2017/03/11/120-how-to-write-vue-better/

`package.json`增加命令：

```
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
```

## 样式规范

### 样式选择

- 不同场景可以选择使用css或者css预处理语言
- **css场景**
  1、微信小程序
  2、前后端不分离的项目
  3、部分历史遗留项目
- **less/sass/scss场景**
  1、新增vue项目
  2、新增react项目

### 样式属性顺序

1、布局位置（position，top，right，z-index，display，float等）
2、尺寸大小（宽度，高度，填充，边距）
3、文字系列（字体，行高，字母间距，颜色文字对齐等）
4、视觉效果（background，border等）
5、其他（动画，转换等）

### 缩写属性和属性值

1、CSS有些属性是可以缩写的，比如间距，背景，边框等建议缩写
2、“0px”后面的px可以去除
3、16进制的颜色代码重叠的字符可以缩写的就缩写，如#666666 缩写为 #666

### 命名规范

1、一律小写
2、用英文
3、命名可读性要好
4、名字长的中间加 - (横杠) 来命名class
5、尽量使用class设置样式

### 样式书写位置

1、vue框架优先当前vue页面，样式一对一生效
2、react函数库优先书写独立css文件
3、前端不分离项目，按后端实际情况，独立或当前文件或內联样式
4、小程序项目，如微信，按微信规范独立一个文件



