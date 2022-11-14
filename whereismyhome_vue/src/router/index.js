import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ApartView from "../views/ApartView.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/board",
    name: "board",
    component: () => import("@/views/BoardView.vue"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "write",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite.vue"),
      },
      {
        path: "view/:articleno",
        name: "boarddetail",
        component: () => import("@/components/board/BoardDetail.vue"),
      },
      {
        path: "modify/:articleno",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify.vue"),
      },
      {
        path: "delete/:articleno",
        name: "boarddelete",
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
  {
    path: "/apt",
    name: "apt",
    component: ApartView,
    children: [],
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
