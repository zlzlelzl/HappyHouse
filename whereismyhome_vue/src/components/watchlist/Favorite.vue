<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="12">
        <div>
          <div>
            <div>
              <!-- <h2 class="text-h4 font-weight-bold">ANIMAL</h2>
              <h4 class="text-h6">Some category description goes here</h4> -->
            </div>
            <v-divider class="my-4"></v-divider>

            <v-row height="400vmin">
              <v-col v-if="getFavoriteList.length == 0">
                <h3 class="text-h6 grey--text text-center py-3">
                  찜한 아파트가 없습니다.
                </h3>
              </v-col>
              <v-col
                cols="12"
                md="4"
                lg="4"
                v-for="(item, idx) in getFavoriteList"
                :key="idx"
              >
                <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
                  <div>
                    <v-card
                      flat
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      hover
                      :to="{ name: 'Map', query: { aptCode: item.aptCode } }"
                    >
                      <v-img
                        src="@/assets/house1.jpg"
                        :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="200px"
                        class="elevation-2"
                        style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn color="accent"> 이쁜이미지</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          {{ item.aptName }}
                        </div>

                        <div class="text-body-1 py-4">
                          {{
                            item.sidoName +
                            " " +
                            item.gugunName +
                            " " +
                            item.dongName
                          }}
                        </div>

                        <div class="text-body-1 py-4">
                          <!-- {{ item.recentPrice}}억 -->
                          {{ Number(item.recentPrice.split(",").join("")) / 10000 }}억
                          원
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">built {{ item.buildYear }}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import houseImg from "@/assets/house1.jpg"
const memberStore = "memberStore";
const mapStore = "mapStore";
export default {
  name: "Favorite",
  components: {},
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getCacheList();
    // this.insertFavorite({ user_id: "ssafy", dongCode: "1123010200", aptName: "가우디캐슬" });
    // this.insertFavorite({ user_id: "ssafy", dongCode: "1111016700", aptName: "CS타워" });
    // this.getFavorite();
    // this.deleteFavorite({ user_id: "ssafy", dongCode: "1111016700", aptName: "CS타워" });
    this.showFavoriteList();
  },
  computed: {
    ...mapState(mapStore, ["cache"]),
    ...mapState(memberStore, ["isLogin", "favorite", "userInfo"]),
    isLoginCheck() {
      return this.isLogin;
    },
    getFavoriteList() {
      console.log("gfl")
      console.log(this.favorite)
      return this.favorite;
    },
    getUserInfo() {
      return this.userInfo;
    },
  },
  methods: {
    ...mapActions(memberStore, ["insertFavorite", "deleteFavorite", "getFavorite"]),
    getCacheList() {
      let list = [];
      console.log(this.cache.size);
      this.cache.forEach((value, key, cache) => {
        list.push({ k: key, v: value });
      });
      console.log(list);
      this.list = list;
      return list;
    },
    showFavoriteList() {
      if (!this.isLoginCheck) return;
      this.getFavorite(this.getUserInfo);
    },
  },
};
</script>
