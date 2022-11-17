import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/apt",
    name: "Apt",
    component: () => import("@/views/CategoryView.vue"),
  },
  {
    path: "/notice",
    name: "Notice",
    component: () => import("@/views/NoticeView.vue"),
    redirect: "/notice/list/",
    children: [
      {
        path: "list/",
        name: "NoticeList",
        component: () => import("@/components/notice/NoticeList.vue"),
      },
      {
        path: "list/:pg",
        name: "NoticeListPg",
        component: () => import("@/components/notice/NoticeList.vue"),
      },
      {
        path: "write",
        name: "NoticeWrite",
        component: () => import("@/components/notice/NoticeWrite.vue"),
      },
      {
        path: "view/:articleno",
        name: "NoticeDetail",
        component: () => import("@/components/notice/NoticeDetail.vue"),
      },
      {
        path: "modify/:articleno",
        name: "NoticeModify",
        component: () => import("@/components/notice/NoticeModify.vue"),
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: () => import("@/views/QnaView.vue"),
    redirect: "/qna/list/",
    children: [
      {
        path: "list/",
        name: "QnaList",
        component: () => import("@/components/qna/QnaList.vue"),
      },
      {
        path: "list/:pg",
        name: "QnaListPg",
        component: () => import("@/components/qna/QnaList.vue"),
      },
      {
        path: "write",
        name: "QnaWrite",
        component: () => import("@/components/qna/QnaWrite.vue"),
      },
      {
        path: "view/:articleno",
        name: "QnaDetail",
        component: () => import("@/components/qna/QnaDetail.vue"),
      },
      {
        path: "modify/:articleno",
        name: "QnaModify",
        component: () => import("@/components/qna/QnaModify.vue"),
      },
    ],
  },
  {
    path: "/authors",
    name: "Authors",
    component: () => import("@/views/AuthorsView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
