<template>
  <div class="down11">
    <el-container class="allHeight">
      <el-aside width="200px" v-show="accord" style="background-color: #0A1420;">
        <el-menu class="el-menu-vertical-demo">
          <el-submenu :index="String(item)" v-for="(work,item) in sixList" :key="item">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="color:#fff;">{{work.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item+'-'+idx"
                v-for="(model,idx) in work.model"
                :class="model.icon"
                :key="idx"
                @click="addTabs(model.name,model.title)"
                style="color:#fff;"
              >{{model.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px; height:40px;color:#333;display:flex;">
          <div @click="switchClcik" style="padding:10px;width:15px;">
            <i class="el-icon-s-fold" style="width:20px;height:20px;"></i>
          </div>
          <WorkBench @reload="reload"></WorkBench>
        </el-header>

        <el-main class="mainBackground">
          <div class="pagetitle" v-if="$route.path =='/index'">韶关检测</div>
          <router-view v-if="flag"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import querystring from "querystring";
import store from "@/store";

export default {
  name: "index",
  data() {
    return {
      accord: true,
      // iconlist: [
      //   "el-icon-s-finance",
      //   "el-icon-s-custom",
      //   "el-icon-document-checked",
      //   "el-icon-s-goods",
      //   "el-icon-s-order",
      //   "el-icon-s-data",
      //   "el-icon-s-platform",
      //   "el-icon-s-promotion"
      // ],
      sixList: [
        {
          title: "韶关过程检测",
          model: [
            {
              title: "过程检测输入",
              name: "sctp",
              icon: "el-icon-document"
            },
            {
              title: "展示界面-A",
              name: "lxpzA",
              icon: "el-icon-data-analysis"
            },
            {
              title: "展示界面-B",
              name: "lxpzB",
              icon: "el-icon-data-analysis"
            },
            {
              title: "展示界面-C",
              name: "lxpzC",
              icon: "el-icon-data-analysis"
            },
            {
              title: "展示界面-D",
              name: "lxpzD",
              icon: "el-icon-data-analysis"
            },
            {
              title: "展示界面-E",
              name: "lxpzE",
              icon: "el-icon-data-analysis"
            },
            {
              title: "历史数据",
              name: "history",
              icon: "el-icon-data-analysis"
            }
          ]
        },
        {
          title: "韶关母液检测",
          model: [
            {
              title: "母液化料选择",
              name: "myjc",
              icon: "el-icon-document"
            },
            {
              title: "展示界面",
              name: "myjcA",
              icon: "el-icon-data-analysis"
            },
            // {
            //   title: "历史数据",
            //   name: "mhistory",
            //   icon: "el-icon-data-analysis"
            // }
          ]
        },
        {
          title: "韶关数据导出",
          model: [
            {
              title: "浆染",
              name: "jiangran",
              icon: "el-icon-document"
            },
            {
              title: "后整",
              name: "houzheng",
              icon: "el-icon-document"
            }
          ]
        }
      ],
      flag: true
    };
  },
  methods: {
    switchClcik() {
      if (this.accord == true) {
        this.accord = false;
      } else {
        this.accord = true;
      }
    },
    reload() {
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
    },
    // 添加 tabs
    addTabs(name, title) {
      if (this.$store.state.tabArr.some(item => item.name == name)) {
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      } else {
        store.commit("addTabArr", {
          name,
          title
        });
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.el-menu-vertical-demo {
  /* width: 199px; */
  min-height: 400px;
  background-color: #0a1420;
}
.el-menu-vertical-demo li {
  background-color: #0a1420;
}
.el-menu {
  border-right: 0;
}
.el-submenu .el-menu-item {
  min-width: 100%;
}
/* 侧边栏 :hover颜色 */
.el-submenu__title:hover {
  background: #4d96f4;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: #4d96f4;
}

.down11 {
  height: 100%;
}
.allHeight {
  height: 100%;
}
.mainBackground {
  background: #f2f2f3;
}
.mainBackground .pagetitle {
  font-size: 30px;
  line-height: 46px;
}
.el-header {
  /* background: #b3c0d1; */
  color: #333;
  padding: 0;
}
/* .el-aside {
  background: #b3c0d1;
  color: #333;
} */
</style>