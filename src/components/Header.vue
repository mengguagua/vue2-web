<!-- 头部 -->
<template lang="pug">
section.head
  div.nav
    div.logo.fn-left
      router-link(to="/")
        span.title VUE2管理后台模板
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: {}
    };
  },
  mounted: function() {
    // this.Api.queryUserInfo().then(resp => {
    //   this.user = resp || {};
    // });
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  z-index: 99;
  height: 70px;
  overflow: hidden;
  .nav {
    height: 70px;
    background: #262f3e;
    .logo {
      padding: 24px 0 0 10px;
      .title {
        color: #fff;
      }
    }
    .fn-right {
      float: right;
    }
    .nav_item {
      color: #fff;
      padding-top: 24px;
      padding-right: 15px;
      font-size: 14px;
      a {
        color: #fff;
      }
      .text-underline {
        text-decoration: underline;
      }
      .el-dropdown {
        color: #fff;
        cursor: pointer;
      }
      .head-img {
        width: 35px;
        height: 28px;
        margin: 0 3px 0 20px;
        /*background: #fff;*/
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
