<template>
  <div id="app">
    <Header></Header>
    <div class="el-wrap-con">
      <div class="slide-con" :style="`width: ${toggleSide ? '250px' : '66px'}`">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="defaultActive"
            :router="true"
            text-color="#c1c6c8"
            :collapse="!toggleSide"
          >
            <el-submenu
              v-for="(item, index) in leftMenuArray"
              :key="`s${index}`"
              :index="`${index}`"
            >
              <template slot="title">
                <div v-if="!toggleSide">{{ item.menuName.slice(0, 1) }}</div>
                <span>{{ item.menuName }}</span>
              </template>
              <template v-for="itemChild in item.children">
                <el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.menuUrl" :key="itemChild.menuUrl">
                  <template slot="title">
                    <span>{{itemChild.menuName}}</span>
                  </template>
                  <!--三级菜单-->
                  <el-menu-item v-for="itemChild_child in itemChild.children" :index="itemChild_child.menuUrl" :key="itemChild_child.menuUrl">
                    <template slot="title">
                      <span>{{itemChild_child.menuName}}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <template v-else>
                  <el-menu-item
                    :index="itemChild.menuUrl"
                    :key="`c${itemChild.menuUrl}`"
                    >{{ itemChild.menuName }}</el-menu-item
                  >
                </template>
              </template>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="wrap-con" :style="`left: ${toggleSide ? '250px' : '66px'}`">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <i
            :class="`home-ico ${
              toggleSide ? 'el-icon-s-fold' : 'el-icon-s-unfold'
            }`"
            @click="handleSide"
          ></i>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ routeName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="content">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <router-view v-if="isReady"></router-view>
          </el-scrollbar>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      isReady: false,
      leftMenu: {},
      toggleSide: true,
      leftMenuArray: [],
      tempLeftMenuArray: [
        {
          menuName: '一级菜单1',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单1', menuUrl: '/registration/register' },
          ]
        },
      ],
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
      // this.Api.queryMenu().then(res => {
      //   if (res.length) {
      //     let leftMenu = [];
      //     res.forEach((item) => {
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
  mounted: async function () {
    this.getMenuList(); // 获取菜单
    this.isReady = true;
    console.log(this.isReady)
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
}
/*修改表格紧凑度*/
.el-table .el-table__cell {
  padding: 4px 0;
}
.el-table th.el-table__cell>.cell {
  padding: 4px 8px;
}
a {
  text-decoration: none;
}
#app {
  width: 100%;
  height: 100%;
  .grid-content {
    padding: 10px 15px;
    &.bg-greys {
      font-size: 14px;
      font-weight: bold;
      background: #fafafa;
      border: 1px solid #e6ebf5;
    }
    .el-select,
    .el-date-editor--datetimerange {
      width: 100%;
    }
  }
  .el-wrap-con {
    position: relative;
    height: calc(100% - 70px) !important;
    .el-menu-vertical {
      &:not(.el-menu--collapse) {
        width: 250px;
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
        .el-submenu__title {
          background: #1e222d !important;
        }
        .el-submenu__title i {
          color: #eee;
        }
      }
      .el-submenu .el-menu {
        background: #262f3e !important;
      }
      .el-menu-item.is-active {
        color: #fff;
        background: rgba(46, 110, 246, 0.9);
      }
      .el-menu-item:hover {
        color: #fff;
        background: #1e222d;
      }
    }
    .wrap-con {
      position: absolute;
      top: 0;
      right: 0;
      left: 250px;
      height: 100%;
      padding-top: 45px;
      transition: all 0.3s;
      .el-breadcrumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 8px;
        line-height: 24px;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        transition: all 0.3s;
      }
      .content {
        height: 100%;
        padding: 16px;
        .el-scrollbar {
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="less">
// 全局样式优化
// 弹窗样式
.el-dialog--center {
  .el-dialog__body {
    padding: 15px 25px 10px;
    max-height: calc(90vh - 125px);
    overflow: auto;
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-form-item__error {
      padding-top: 0px;
    }
  }
  .el-dialog__footer {
    .el-button {
      margin: 0 35px;
    }
  }
}
// EasyTable样式
.easy-table-container .el-table .el-button--text {
  font-size: 14px;
  font-weight: normal;
}
</style>
