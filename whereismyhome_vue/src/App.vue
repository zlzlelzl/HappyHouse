<template>
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
