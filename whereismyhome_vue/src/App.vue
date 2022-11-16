<!--<template>
  <div>
    <v-app id="app">
      <main-header></main-header>
      <main-view></main-view>
      <main-footer></main-footer>
    </v-app>
  </div>
</template>

<script>
import MainHeader from "@/components/header/MainHeader.vue"
import MainFooter from "@/components/footer/MainFooter.vue"
import MainView from "@/views/MainView.vue"

export default {
  name: "App",
  components: { MainHeader, MainView, MainFooter },
  data: () => ({}),
}
</script>
-->
<template>
  <v-app>
    <main-appbar></main-appbar>

    <v-container class="mt-16">
      <router-view></router-view>
    </v-container>

    <main-footer></main-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    MainAppbar: () => import("@/components/layout/MainAppbar.vue"),
    MainFooter: () => import("@/components/layout/MainfFooter.vue"),
  },
  data: () => ({}),
};
</script>
