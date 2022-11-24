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
    <v-container style="font-family: mfont" class="mt-16" v-scroll:#main="handleScroll">
      <router-view></router-view>
    </v-container>

    <main-footer></main-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const mapStore = "mapStore";
export default {
  name: "App",

  components: {
    MainAppbar: () => import("@/components/layout/MainAppbar.vue"),
    MainFooter: () => import("@/components/layout/MainfFooter.vue"),
  },
  data: () => ({}),
  created() {
    console.log(this.mapdata);
  },
  beforeMount() {
    this.INIT_CACHE();
    // this.INIT();
  },
  watch: {},
  computed: {
    ...mapState(mapStore, ["mapdata", "cache"]),
    ...mapGetters(mapStore, ["getMapData"]),
  },
  methods: {
    handleScroll(e) {
      console.log(e);
      this.scrollPostion = e.target.scrollTop;
    },
    ...mapMutations(mapStore, ["INIT_CACHE", "INIT"]),
  },
};
</script>
<style></style>
