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
              <v-col v-if="list.length == 0">
                <h3 class="text-h6 grey--text text-center py-3">
                  최근 본 방이 없습니다.
                </h3>
              </v-col>
              <v-col cols="12" md="4" lg="4" v-for="(item, idx) in list" :key="idx">
                <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
                  <div>
                    <v-card
                      flat
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      hover
                      to="/detail"
                    >
                      <v-img
                        src="https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg"
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
                          {{ item.v.aptName }}
                        </div>

                        <div class="text-body-1 py-4">
                          {{
                            item.v.sidoName +
                            " " +
                            item.v.gugunName +
                            " " +
                            item.v.dongName
                          }}
                        </div>

                        <div class="text-body-1 py-4">{{ item.v.recentPrice }} 만원</div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">built {{ item.v.buildYear }}</div>
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
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const mapStore = "mapStore";

export default {
  name: "CategoryView",
  components: {
    MainSidebar: () => import("@/components/details/MainSidebar"),
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getCacheList();
  },
  computed: {
    ...mapState(mapStore, ["cache"]),
  },
  methods: {
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
  },
};
</script>
