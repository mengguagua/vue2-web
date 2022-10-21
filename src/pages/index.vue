<template>
  <div id="app">
    <HeaderBlue class="header-all"></HeaderBlue>
    <div class="el-wrap-con">
      <div class="container">
        <div class="menu">
          <ul class="menu-list">
            <li class="menu-item" v-for="(item, index) in tempLeftMenuArray">
              <button class="menu-button"><i class="el-icon-folder menu-icon"></i>{{item.menuName}}<i class="el-icon-arrow-right arrow"></i></button>
              <ul class="menu-sub-list">
                <li class="menu-item">
                  <button class="menu-button" v-for="(ret, rIndex) in item.children" @click="goUrl(ret)">
                    <i class="el-icon-tickets"></i>{{ret.menuName}}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-con">
        <section class="content">
          <el-breadcrumb>
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
import Header from '@/components/Header';
// feather.replace()
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
          menuName: '一级菜单1',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单1', menuUrl: '/registration/register' },
            { menuName: '二级菜单2', menuUrl: '/registration/register' },
            { menuName: '二级菜单3', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单2',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
            { menuName: '二级菜单5', menuUrl: '/registration/register' },
            { menuName: '二级菜单6', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单3',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单4',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单5',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单6',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
      ]
    };
  },
  computed: {
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
    goUrl(ret) {
      this.$router.push(ret.menuUrl);
    },
  },
  mounted: function () {
    this.getMenuList(); // 获取菜单
  },

}
</script>

<style lang="less">
*,
*:after,
*:before {
  box-sizing: border-box;
}
:root {
  --color-bg-primary: #d0d6df;
  --color-bg-primary-offset: #f1f3f7;
  --color-bg-secondary: #fff;
  --color-text-primary: #3a3c42;
  --color-text-primary-offset: #898c94;
  --color-orange: #dc9960;
  --color-green: #1eb8b1;
  --color-purple: #657cc4;
  --color-black: var(--color-text-primary);
  --color-red: #d92027;
}
.menu {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(#404040, 0.15);
  height: 100%;
  font-size: 14px;
  i {
    margin-right: 8px;
  }
}
.menu-list {
  margin: 0;
  display: block;
  width: 100%;
  padding: 8px;
  list-style-type: none;
  & + .menu-list {
    border-top: 1px solid #ddd;
  }
}
.menu-sub-list {
  display: none;
  padding: 8px;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(#404040, 0.15);
  position: absolute;
  left: 100%;
  right: 0;
  z-index: 100;
  width: 100%;
  top: 0;
  flex-direction: column;
  list-style-type: none;
  &:hover {
    display: flex;
  }
}
.menu-item {
  position: relative;
}
.menu-button {
  font: inherit;
  border: 0;
  padding: 8px 8px;
  padding-right: 36px;
  width: 100%;
  border-radius: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--color-bg-secondary);
  color: #606266;
  &:hover {
    background-color: var(--color-bg-primary-offset);
    color: #333;
    & + .menu-sub-list {
      display: flex;
    }
    .menu-icon {
      color: var(--color-text-primary);
    }
  }
  .menu-icon {
    color: var(--color-text-primary-offset);
  }
}
.container {
  margin: 8px;
  width: 280px;
  height: calc(100vh - 86px);
  //height: 800px;
}
.arrow {
  position: absolute;
  right: 10px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', sans-serif;
  /*修改表格紧凑度*/
  .el-table .el-table__cell {
    padding: 8px 0;
  }
  .el-table th.el-table__cell>.cell {
    padding: 0px 8px;
  }
  background: #f8fafb;
}
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .header-all {
    //margin: 0px 8px;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 8px rgba(#404040, 0.15);
  }
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
    height: calc(100% - 86px) !important;;
    min-height: calc(100vh - 86px) !important;
    display: flex;
    .wrap-con {
      position: relative;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
      .content {
        height: 100%;
        //width: calc(100vw - 280px - 0.5vw);
        .el-scrollbar {
          height: 100%;
          margin-top: 56px;
          box-shadow: 0 10px 20px rgba(#404040, 0.15);
          width: calc(100vw - 265px);
          min-height: calc(100vh - 135px);
          border-radius: 4px;
          padding: 0px 4px;
          .el-scrollbar__wrap {
            overflow-x: hidden;
            .el-scrollbar__view {
              padding: 10px 0 10px;
            }
          }
        }
        .el-breadcrumb {
          position: absolute;
          top: 10px;
          //width: 100%;
          background: #fff;
          padding: 8px;
          line-height: 24px;
          box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
          transition: all 0.3s;
          border-radius: 4px;
          width: calc(100vw - 265px);
        }
      }
    }
  }
}
</style>


<style>
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  font-weight: 500;
}
.el-breadcrumb__separator {
  font-weight: 500;
}
.el-button--small {
  padding: 7px 12px;
}
</style>
