<template>
  <div>
    <div>
      <v-card to="detail">
        <v-img
          :aspect-ratio="16 / 9"
          dark
          gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
          height="700px"
          src="@/assets/main_img.jpg"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <!-- <v-col>
                <v-btn color="accent" to="category">Travel</v-btn>
              </v-col> -->
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">
                  당신의 집을 찾아보세요
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
                <!-- <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-feather</v-icon>
                </v-avatar>

                <div class="text-h6 pl-2">Yan Lee · 22 July 2019</div> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">부동산 뉴우스</h2>

            <v-row>
              <v-hover v-slot:default="{ hover }" close-delay="50" open-delay="50">
                <div>
                  <!-- <v-card
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      flat
                      hover
                      to="/detail"
                    >
                      <v-img
                        :aspect-ratio="16 / 9"
                        class="elevation-2"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="200px"
                        src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                        style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn color="accent" to="category">TIPS</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          How to write an awesome blog post in 5 steps
                        </div>

                        <div class="text-body-1 py-4">
                          Ultrices sagittis orci a scelerisque. Massa placerat duis
                          ultricies lacus sed turpis
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">Yan Lee · 22 July 2019</div>
                        </div>
                      </v-card-text>
                    </v-card> -->
                  <v-carousel>
                  <!--
                    <v-carousel-item
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      cover
                    ></v-carousel-item>

                    <v-carousel-item
                      src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                      cover
                    ></v-carousel-item>

                    <v-carousel-item
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      cover
                    ></v-carousel-item>
                    -->
                    <template v-for="news in newsList" >
                    <a :href="news.link">
                      <v-carousel-item 
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        {{ news.title }}
                        </br>
                        {{ news.description }}
                      </v-carousel-item>
                    </a>
                    </template>
                  </v-carousel>
                </div>
              </v-hover>
            </v-row>
          </div>

          <!-- <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Featured</h2>

            <v-row>
              <v-col v-for="i in 3" :key="i" cols="6" lg="4">
                <v-card dark flat>
                  <v-img
                    :aspect-ratio="16 / 9"
                    class="elevation-2 fill-height"
                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                    height="600px"
                    src="https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg"
                  >
                    <div class="d-flex flex-column justify-space-between fill-height">
                      <v-card-text>
                        <v-btn color="accent">ANIMALS</v-btn>
                      </v-card-text>

                      <v-card-text>
                        <div
                          class="text-h5 py-3 font-weight-bold"
                          style="line-height: 1.2"
                        >
                          15 things I have always wondered about birds
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                        </div>
                      </v-card-text>
                    </div>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold">Latest Posts</h2>

            <div>
              <v-row v-for="i in 6" :key="i" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%">
                    <v-img
                      :aspect-ratio="16 / 9"
                      height="100%"
                      src="https://cdn.pixabay.com/photo/2021/01/27/06/54/nova-scotia-duck-tolling-retriever-5953883_1280.jpg"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
                    <v-btn color="accent" depressed>TRAVEL</v-btn>

                    <h3 class="text-h4 font-weight-bold pt-3">
                      Ut enim blandit volutpat maecenas volutpat blandit
                    </h3>

                    <p class="text-h6 font-weight-regular pt-3 text--secondary">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                      cupidatat non proident, sunt in culpa qui officia deserunt mollit
                      anim id est laborum.
                    </p>

                    <div class="d-flex align-center">
                      <v-avatar color="accent" size="36">
                        <v-icon dark>mdi-feather</v-icon>
                      </v-avatar>

                      <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div> -->
        </div>
      </v-col>

      <v-col>
        <div class="pt-16">
          <main-sidebar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
import axios from "axios";

const newsStore = "newsStore";

export default {
  name: "HomeView",
  components: {
    MainSidebar: () => import("@/components/details/MainSidebar"),
  },
  data() {
    return{
    }
  },
  created(){
    this.getNews("부동산");
  },
  methods: {
    ...mapActions(newsStore,["getNews"]),
  },
  computed: {
    ...mapState(newsStore, ["newsList"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
};
</script>
