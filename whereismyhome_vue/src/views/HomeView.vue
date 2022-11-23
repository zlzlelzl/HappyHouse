<template>
  <div>
    <div class="pt-16 pb-16">
      <v-card to="map">
        <v-img
          :aspect-ratio="16 / 9"
          dark
          gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
          height="700px"
          src="@/assets/main2.jpg"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <!-- <v-col>
                <v-btn color="accent" to="category">Travel</v-btn>
              </v-col> -->
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 pb-16 pl-5" style="line-height: 1.2">
                  당신의 집을 찾아보세요
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="pt-16">
            <v-card width="100%" height="500px">
              <img />
            </v-card>
          </div>
        </v-col>
        <v-col cols="4">
          <div>
            <div class="">
              <h2 class="text-h4 font-weight-bold pb-4 text-center">부동산 NEWS</h2>

              <v-hover v-slot:default="{ hover }" close-delay="50" open-delay="50">
                <v-card rounded>
                  <v-carousel class="mb-10">
                    <template v-for="news in newsList">
                      <a :href="news.link" target="_blank">
                        <v-carousel-item src="@/assets/main.jpg"
                          ><h2 class="text-h5 pa-10 white--text" style="line-height: 1.2">
                            {{ news.title }}
                            <!-- </br>
                            {{ news.description }} -->
                          </h2>
                        </v-carousel-item>
                      </a>
                    </template>
                  </v-carousel>
                </v-card>
              </v-hover>
            </div>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="pt-16">
            <v-card class="pa-3">
              <recent-apart></recent-apart>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import RecentApart from "../components/map/RecentApart.vue";

const newsStore = "newsStore";

export default {
  name: "HomeView",
  components: {
    MainSidebar: () => import("@/components/details/MainSidebar"),
    RecentApart,
  },
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(newsStore, ["getNews"]),
    async init() {
      await this.getNews("부동산");
      this.regex();
    },
    regex() {
      console.log("regex");
      console.log(this.newsList);
      this.newsList.forEach((data) => {
        console.log("regex2");
        console.log(data.title);
        data.title = String(data.title).replace(/<+[|w]>/g, "sesss");
        data.title = String(data.title).replace(/&+[|w];/g, "sesss");
        console.log(data.title);
      });
      return this.getNewsList;
    },
  },
  computed: {
    ...mapState(newsStore, ["newsList"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
};
</script>

<style scoped>
.blurEffect {
  filter: blur(3px);
  -webkit-filter: blur(3px);
}
</style>
