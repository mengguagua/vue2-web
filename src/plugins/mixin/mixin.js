// 封装一些公用方法，或着数据
export default {
  data() {
    return {
      entryAndExitOptions: [],
      companyTypeOptions: [],
      dateTypeOptions: {
        1: '年度',
        2: '季度',
        3: '月度',
      },
      quarterOptions: {
        1: '1季度',
        2: '2季度',
        3: '3季度',
        4: '4季度',
      },
      monthOptions: {
        1: '1月',
        2: '2月',
        3: '3月',
        4: '4月',
        5: '5月',
        6: '6月',
        7: '7月',
        8: '8月',
        9: '9月',
        10: '10月',
        11: '11月',
        12: '12月',
      },
      confirmItem: {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      },
      requiredRule: {
        required: true,
        message: '必填',
        trigger: 'change',
      },
    };
  },
  methods: {
    getQueryStringArgs() {
      let queryData = '';
      if (location.search) {
        queryData = location.search;
      } else if (location.hash) {
        queryData = '?' + location.hash.split('?')[1];
      }
      let qs = (queryData.length > 0 ? queryData.substring(1) : '');
      let args = [];
      for (let item of qs.split('&').map( kv => kv.split('=') )) {
        let name = decodeURIComponent(item[0]);
        let value = decodeURIComponent(item[1]);
        if (name) {
          args[name] = value;
        }
      }
      return args;
    },
    tipMessage(msg = '操作成功', type = 'success') {
      this.$message({
        type: type,
        message: msg
      });
    },
    ifNullToArray(obj) {
      if (obj === null) {
        return [];
      } else {
        return obj;
      }
    },
    confirmDialog(tip = '此操作不可恢复, 是否继续?', type = 'warning') {
      return this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type
      });
    },
    // 后退一页
    goBack() {
      history.go(-1);
    },
    // 偏离当前几天对日期, num负数为往前几天
    getAnyDayFormatDate (num) {
      let date = new Date();
      let seperator = '-';
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      let date2 = new Date(date);
      date2.setDate(date.getDate() + num);
      let year2 = date2.getFullYear();
      let month2 = date2.getMonth() + 1;
      let strDate2 = date2.getDate();
      if (month2 >= 1 && month2 <= 9) {
        month2 = '0' + month2;
      }
      if (strDate2 >= 0 && strDate2 <= 9) {
        strDate2 = '0' + strDate2;
      }

      let startFormatDate = year2 + seperator + month2 + seperator + strDate2;
      let endFormatDate = year + seperator + month + seperator + strDate;
      return [startFormatDate, endFormatDate];
    },
    // type: 1本月，2上月，3本年，4上年，5近一年; 返回数组
    quickGetTime(type) {
      let date = new Date();
      let seperator = '-';
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let lastMonth = date.getMonth();
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (lastMonth >= 1 && lastMonth <= 9) {
        lastMonth = '0' + lastMonth;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      let endFormatDate = year + seperator + month + seperator + strDate;
      if (type === '1') {
        return [year + seperator + month + '-01', endFormatDate];
      } else if (type === '2') {
        let day = 30;
        let lastMonthNum = date.getMonth();
        if ([1, 3, 5, 7, 8, 10, 12].includes(lastMonthNum)) {
          day = 31;
        }
        return [year + seperator + lastMonth + '-01', year + seperator + lastMonth + seperator + day];
      } else if (type === '3') {
        return [year + '-01-01', endFormatDate];
      } else if (type === '4') {
        return [year - 1 + '-01-01', year - 1 + '-12-31'];
      } else if (type === '5') {
        return [(year - 1) + seperator + month + seperator + strDate, endFormatDate];
      }
    },
    // 生成指定范围的整数，包含两边
    selectFromRange(lowerValue, upperValue) {
      let choices = upperValue - lowerValue + 1;
      return Math.floor(Math.random() * choices + lowerValue); // floor舍去小数； random生成 0～1，不包括1的数。
    },
    // 生成随机颜色
    randomColor() {
      let color = '#';
      let point = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
      for (let i = 0; i < 6; i++) {
        let index = this.selectFromRange(0, 16);
        color = color + point[index];
      }
      return color;
    },
    // 对象属性设置为空 （在新建弹窗，对象置空时用到）
    objectAttributeReset(obj) {
      Object.keys(obj).forEach(key => { obj[key] = ''; });
    },
    // 节流函数,默认函数调用延迟0.5s
    throttle(fn, interval) {
      let __self = fn; // 需要被延迟执行的函数引用
      let timer = null; // 定时器
      let firstTime = true; // 第一次调用标记
      return function () {
        let args = arguments; // 被延迟执行的函数的变量
        let __me = this; // 被延迟执行的函数的this
        if ( firstTime ) { // 第一次不用延时
          __self.apply(__me, args); // 执行被延迟执行的函数
          firstTime = false;
          return false;
        }
        if ( timer ) { // 定时器还在证明在延时期间，不调用原函数
          return false;
        }
        timer = setTimeout( () => {
          clearTimeout(timer); // 清空本次定时器对象
          timer = null;
          __self.apply(__me, args);
        }, interval || 500); // 默认延迟0.5s
      };
    },
    // 格式化日期 formatDate(yyyy-MM-dd)
    formatDate(date = new Date(), fmt = 'yyyy-MM-dd') {
      let o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    // 下载流通用处理方式，如果是word则设置为msword，excel为excel
    download(res, type = 'application/pdf;chartset=UTF-8', filename) {
      // 创建blob对象，解析流数据
      const blob = new Blob([res], {
        // 如何后端没返回下载文件类型，则需要手动设置：type: 'application/pdf;chartset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
        type: type
      })
      const a = document.createElement('a')
      // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
      const URL = window.URL || window.webkitURL
      // 根据解析后的blob对象创建URL 对象
      const herf = URL.createObjectURL(blob)
      // 下载链接
      a.href = herf
      // 下载文件名
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      // 在内存中移除URL 对象
      window.URL.revokeObjectURL(herf)
    },
    // 函数组合的通用方法
    compose(f,g) {
      return function(x) {
        return f(g(x));
      };
    },
  }
};
