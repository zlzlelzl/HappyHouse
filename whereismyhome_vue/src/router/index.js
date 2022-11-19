import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import store from "@/store"
Vue.use(VueRouter)

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters["memberStore/checkUserInfo"]
    const checkToken = store.getters["memberStore/checkToken"]
    let token = sessionStorage.getItem("access-token")
    console.log("로그인 처리 전", checkUserInfo, token)

    if (checkUserInfo != null && token) {
        console.log("토큰 유효성 체크하러 가자!!!!")
        await store.dispatch("memberStore/getUserInfo", token)
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..")
        // next({ name: "login" });
        router.push({ name: "login" })
    } else {
        console.log("로그인 했다!!!!!!!!!!!!!.")
        next()
    }
}

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
        path: "/map",
        name: "Map",
        component: () => import("@/views/MapView.vue"),
    },
    {
        path: "/user",
        name: "user",
        component: () => import("@/views/UserView.vue"),
        children: [
            {
                path: "join",
                name: "join",
                component: () => import("@/components/user/UserRegister.vue"),
            },
            {
                path: "login",
                name: "login",
                component: () => import("@/components/user/UserLogin.vue"),
            },
            {
                path: "mypage",
                name: "mypage",
                beforeEnter: onlyAuthUser,
                component: () => import("@/components/user/UserMyPage.vue"),
            },
            ,
            {
                path: "logout",
                name: "logout",
                component: () => import("@/components/user/UserLogout.vue"),
            },
        ],
    },
]
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
