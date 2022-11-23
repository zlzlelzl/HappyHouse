<template>
  <div>
    <v-navigation-drawer
      v-if="!$vuetify.breakpoint.smAndUp"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-list color="primary" nav>
        <v-list-item
          v-for="(item, i) in btnItems"
          :key="i"
          :href="item.href"
          :target="item.target"
          :to="item.to"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in barItems"
          :key="i"
          :href="item.href"
          :target="item.target"
          :to="item.to"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      elevate-on-scroll
      flat
    >
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
          :no-gutters="!$vuetify.breakpoint.smAndUp"
          align="center"
          justify="space-between"
        >
          <v-col cols="3" class="d-flex align-left">
            <v-app-bar-nav-icon
              v-if="!$vuetify.breakpoint.mdAndUp"
              @click.stop="drawer = !drawer"
            />

            <v-toolbar-title class="" style="cursor: pointer" @click="$router.push('/')"
              ><img src="@/assets/ssafy_logo.png" height="70px" />
            </v-toolbar-title>
          </v-col>

          <v-col class="align-center d-flex" v-if="$vuetify.breakpoint.mdAndUp" cols="5">
            <v-btn
              v-for="(item, i) in barItems"
              :key="i"
              :to="item.to"
              class="text-capitalize"
              exact
              exact-active-class="accent--text"
              text
              >{{ item.title }}
            </v-btn>
          </v-col>

          <v-col cols="3" class="text-right d-inline">
            <h2 v-if="loginCheck" class="text-subtitle-1 text-left d-inline">
              {{ userInfo.username }}님 환영합니다.
            </h2>
            <v-menu offset-y class="d-inline">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="primary" icon>
                  <v-icon>fas fa-bars</v-icon>
                </v-btn>
              </template>

              <template v-if="loginCheck">
                <v-list>
                  <v-list-item
                    v-for="(item, i) in btnItemsLogout"
                    :key="i"
                    :color="item.color"
                    :href="item.href"
                    :outlined="item.outlined"
                    :target="item.target"
                    :to="item.to"
                    offset-y
                    class="ma-3 text-capitalize"
                  >
                    <v-icon class="mr-3">{{ item.icon }} </v-icon>
                    {{ item.text }}
                  </v-list-item>
                </v-list>
              </template>
              <template v-else>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in btnItemsLogin"
                    :key="i"
                    :color="item.color"
                    :href="item.href"
                    :outlined="item.outlined"
                    :target="item.target"
                    :to="item.to"
                    class="ma-3 text-capitalize"
                  >
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.text }}
                  </v-list-item>
                </v-list>
              </template>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/js/all.js";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  data: () => ({
    drawer: null,
    btnItemsLogout: [
      {
        text: "로그아웃",
        to: "/user/logout",
        target: "_black",
        color: "primary",
        icon: "mdi-logout ",
      },
      {
        text: "마이페이지",
        to: "/user/mypage",
        target: "_black",
        color: "primary",
        icon: "mdi-account ",
      },
    ],
    btnItemsLogin: [
      {
        text: "로그인",
        to: "/user/login",
        target: "_black",
        color: "primary",
        icon: "mdi-login ",
      },
      {
        text: "회원가입",
        to: "/user/join",
        target: "_black",
        color: "primary",
        icon: "mdi-account-plus",
      },
    ],
    barItems: [
      {
        title: "홈",
        to: "/",
      },
      {
        title: "공지사항",
        to: "/notice",
      },
      {
        title: "Q&A",
        to: "/qna",
      },
      {
        title: "지도",
        to: "/map",
      },
      {
        title: "관심목록",
        to: "/watchlist",
      },
    ],
  }),
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    loginCheck() {
      return this.isLogin;
    },
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "userLogout", "getUserInfo"]),
  },
};
</script>
