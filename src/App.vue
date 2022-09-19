<template>
  <div id="app">
    <Header></Header>
    <div class="el-wrap-con">
      <div class="slide-con" :style="`width: ${toggleSide ? '250px' : '66px'}`">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu :default-active="defaultActive" :router="true"  text-color="#c1c6c8" :collapse="!toggleSide">
            <el-submenu v-for="(item, index) in leftMenuArray" :key="`s${index}`" :index="`${index}`">
              <template slot="title">
                <div v-if="!toggleSide">{{item.menuName.slice(0,1)}}</div>
                <span>{{item.menuName}}</span>
              </template>
              <el-menu-item v-for="(item, cindex) in item.children" :index="item.menuUrl" :key="`c${cindex}`">{{item.menuName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="wrap-con" :style="`padding-left: ${toggleSide ? '250px' : '66px'}`">
        <section class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right" :style="`left: ${toggleSide ? '250px' : '66px'}`">
            <i :class="`home-ico ${toggleSide ? 'el-icon-s-fold': 'el-icon-s-unfold'}`" @click="handleSide"></i>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{routeName}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <router-view></router-view>
          </el-scrollbar>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      leftMenu: {},
      toggleSide: true,
      leftMenuArray: [],
      tempLeftMenuArray: [
        {
          menuName: '企业备案',
          menuUrl: '/registration',
          children: [
            { menuName: '备案登记', menuUrl: '/registration/company' },
            { menuName: '关联企业登记', menuUrl: '/registration/register' },
          ]
        },
      ]
    };
  },
  computed: {
    defaultActive: function () {
      return this.$route.path;
    },
    routeName: function () {
      if (this.$route.query.breadParams) {
        return this.$route.query.breadParams;
      } else {
        return this.$route.name;
      }
    },
  },
  methods: {
    getMenuList() {
      this.leftMenuArray = this.tempLeftMenuArray; // 临时目录
      // this.Api.queryMenu().then(resp => {
      //   if (resp.length) {
      //     let leftMenu = [];
      //     resp.forEach((item) => {
      //       leftMenu.push(item);
      //     });
      //     this.leftMenuArray = leftMenu;
      //   }
      // });
    },
    handleSide() {
      this.toggleSide = !this.toggleSide;
    },
  },
  mounted: function () {
    this.getMenuList(); // 获取菜单
  },

}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .grid-content {
    padding: 10px 15px;
    &.bg-greys{
      font-size: 14px;
      font-weight: bold;
      background: #fafafa;
      border: 1px solid #e6ebf5;
    }
    .el-select,
    .el-date-editor--datetimerange{
      width: 100%;
    }
  }
  .el-wrap-con {
    position: relative;
    height: calc(100% - 70px) !important;;
    min-height: calc(100vh - 70px) !important;
    .el-menu-vertical {
      &:not(.el-menu--collapse) {
        width: 250px;
        /*min-height: 400px;*/
      }
    }
    .home-ico {
      float: left;
      margin-right: 10px;
      font-size: 24px;
      cursor: pointer;
    }
    .slide-con {
      position: absolute;
      top: 0;
      left: 0;
      width: 250px;
      height: 100%;
      background: #1e222d;
      z-index: 999;
      transition: all 0.3s;
      .el-scrollbar {
        height: 100%;
      }
      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }
      .el-menu {
        border-right: none;
        .el-submenu__title{
          background: #1e222d !important;
        }
        .el-submenu__title i {
          color: #eee;
        }
      }
    }
    .wrap-con {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 40px 0 0 250px;
      transition: all 0.3s;
      .content {
        height: 100%;
        padding: 12px 20px;
        width: calc(100vw - 350px - 0.5vw);
        .el-scrollbar {
          height: 100%;
          .el-scrollbar__wrap {
            overflow-x: hidden;
            .el-scrollbar__view {
              padding: 10px 0 10px;
            }
          }
        }
        .el-breadcrumb {
          position: absolute;
          top: 0;
          left: 250px;
          width: 100%;
          background: #fff;
          padding: 8px;
          line-height: 24px;
          box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>
<style scoped>
/deep/ .el-submenu .el-menu {
  background: #262f3e !important;
}
/deep/ .el-menu-item.is-active {
  color: #fff;
  background: rgba(46,110,246,0.9);
}
/deep/ .el-menu-item:hover {
  color: #fff;
  background: #1e222d;
}
</style>
