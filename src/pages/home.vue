<template lang="pug">
  div.top-content
    span.title 欢迎登录
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      aaaa: 'aaa',
    }
  },
  methods: {
    getKey() {
      return 'aaaa';
    }
  },
  mounted() {
    let b111222 = 'ok112'
    let b111333 = 'ok1122'
    console.log(b111222);
    // console.log('test', b111222);
  }
};
</script>

<style scoped lang="less">
.title {
  display: block;
  padding: 40px 80px;
  font-size: 24px;
  color: #333333;
}
</style>
