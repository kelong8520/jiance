import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () => import("@/App.vue"),
    // redirect: { name: "home" },
    redirect: { name: "index" }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home"),
    redirect: { name: "index" },
    children: [
      // 首页 titlepage
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/home/index"),
        children: [
          // 韶关过程检测
          // 测试输入
          {
            path: '/sctp',
            name: 'sctp',
            component: () => import("@/views/process/sctp/sctp"),
          },
          //  aa
          {
            path: '/aa',
            name: 'aa',
            component: () => import("@/views/process/sctp/aa"),
          },

          // 展示界面A
          {
            path: '/lxpzA',
            name: 'lxpzA',
            component: () => import("@/views/process/lxpz/lxpza"),
          },
          // 展示界面B
          {
            path: '/lxpzB',
            name: 'lxpzB',
            component: () => import("@/views/process/lxpz/lxpzb"),
          },
          // 展示界面C
          {
            path: '/lxpzC',
            name: 'lxpzC',
            component: () => import("@/views/process/lxpz/lxpzc"),
          },
          // 展示界面D
          {
            path: '/lxpzD',
            name: 'lxpzD',
            component: () => import("@/views/process/lxpz/lxpzd"),
          },
          // 展示界面E
          {
            path: '/lxpzE',
            name: 'lxpzE',
            component: () => import("@/views/process/lxpz/lxpze"),
          },
          // 历史数据
          {
            path: '/history',
            name: 'history',
            component: () => import("@/views/process/history/history"),
          },
          {
            path: '/production',
            name: 'production',
            component: () => import("@/views/process/history/production"),
          },
          
          // 韶关能耗检测
          // 母液检测
          {
            path: '/myjc',
            name: 'myjc',
            component: () => import("@/views/muliquor/myjc/myjc"),
          },
          {
            path: '/bb',
            name: 'bb',
            component: () => import("@/views/muliquor/myjc/bb"),
          },
          // 母液展示
          {
            path: '/myjcA',
            name: 'myjcA',
            component: () => import("@/views/muliquor/myjcA/myjcA"),
          },
          // 母液历史
          {
            path: '/mhistory',
            name: 'mhistory',
            component: () => import("@/views/muliquor/history/mhistory"),
          },
          {
            path: '/mproduction',
            name: 'mproduction',
            component: () => import("@/views/muliquor/history/mproduction"),
          },

          // 韶关数据导出
          // 浆染
          {
            path: '/jiangran',
            name: 'jiangran',
            component: () => import("@/views/export/jiangran"),
          },
          // 后整
          {
            path: '/houzheng',
            name: 'houzheng',
            component: () => import("@/views/export/houzheng"),
          },
        ]
      },

    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
  },
  {
    path: '*',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
