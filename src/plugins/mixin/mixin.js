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
  }
};
