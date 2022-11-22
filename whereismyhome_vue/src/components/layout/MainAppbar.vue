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
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
              v-if="!$vuetify.breakpoint.mdAndUp"
              @click.stop="drawer = !drawer"
            />

            <v-toolbar-title
              class="font-weight-bold text-h5 primary--text"
              style="cursor: pointer"
              @click="$router.push('/')"
              ><img src="@/assets/ssafy_logo.png" height="70px" />
              <!-- Where is my
              <span class="accent--text">HOME</span> -->
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
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

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <template v-if="loginCheck">
              <v-btn
                v-for="(item, i) in btnItemsLogout"
                :key="i"
                :color="item.color"
                :href="item.href"
                :outlined="item.outlined"
                :target="item.target"
                :to="item.to"
                class="ml-3 text-capitalize"
              >
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.text }}
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                v-for="(item, i) in btnItemsLogin"
                :key="i"
                :color="item.color"
                :href="item.href"
                :outlined="item.outlined"
                :target="item.target"
                :to="item.to"
                class="ml-3 text-capitalize"
              >
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.text }}
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
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
        icon: "mdi-login ",
      },
      {
        text: "마이페이지",
        to: "/user/mypage",
        target: "_black",
        color: "primary",
        icon: "mdi-login ",
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
        to: "/user/regist",
        target: "_black",
        color: "primary",
        icon: "mdi-login ",
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
