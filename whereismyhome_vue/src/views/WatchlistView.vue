<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="12">
        <div>
          <div>
            <div class="my-2">
              <v-app-bar
                color="#6A76AB"
                dark
                shrink-on-scroll
                prominent
                src="https://picsum.photos/1920/1080?random"
                fade-img-on-scroll
                scroll-target="#scrolling-techniques-3"
              >
                <template v-slot:img="{ props }">
                  <v-img
                    v-bind="props"
                    gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                  ></v-img>
                </template>

                <v-app-bar-title>관심목록</v-app-bar-title>

                <v-spacer></v-spacer>

                <template v-slot:extension>
                  <v-tabs align-with-title>
                    <v-tab to="/watchlist/recent">최근 본 아파트</v-tab>
                    <v-tab to="/watchlist/favorite">찜한 아파트</v-tab>
                  </v-tabs>
                </template>
              </v-app-bar>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const mapStore = "mapStore";

export default {
  name: "CategoryView",
  components: {
    MainSiderbar: () => import("@/components/details/MainSidebar"),
  },
  computed: {
    ...mapState(mapStore, ["cache"]),
  },
};
</script>

<style lang="scss" scoped>
.authors {
  position: relative;
  top: -50px;
  margin-bottom: -50px;
}
</style>
