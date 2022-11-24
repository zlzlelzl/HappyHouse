<template>
  <v-container id="">
    <div>
      <h3 class="text-h5 font-weight-medium pb-0 text-center">최근 본 아파트</h3>

      <v-divider></v-divider>
      <v-card height="410px" v-if="list.length == 0">
        <h3 class="text-h6 grey--text text-center py-3">최근 본 방이 없습니다.</h3>
        <v-img src="@/assets/cache_empty.png"></v-img>
      </v-card>
      <v-card height="410px" v-else>
        <v-row v-for="(item, idx) in calData" :key="idx" class="pa-2">
          <v-col cols="12" md="6" lg="5">
            <v-card height="100%" flat>
              <v-img
                src="@/assets/house/house1.jpg"
                :aspect-ratio="16 / 9"
                height="100%"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <div>
              <v-btn
                depressed
                color="accent"
                small
                :to="{ name: 'Map', query: { aptCode: item.v.aptCode } }"
                >아파트 보러가기</v-btn
              >
              <h3 class="text-h6 font-weight-bold primary--text py-3">
                {{ item.v.aptName }}
              </h3>

              <div style="font-family: mfont-w" class="d-flex align-center">
                <v-avatar color="accent" size="24">
                  <v-icon dark small>mdi-feather</v-icon>
                </v-avatar>

                <div class="pl-2">
                  {{ item.v.sidoName + " " + item.v.gugunName + " " + item.v.dongName }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>

          <v-pagination
            v-model="curPageNum"
            :length="numOfPages"
            circle
            bottom
          ></v-pagination
        ></v-row>
        <!-- <button @click="limit += 5">Show more</button> -->
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const mapStore = "mapStore";

export default {
  namespaced: true,
  name: "RecentApart",
  data() {
    return {
      list: [],
      limit: 5,
      dataPerPage: 2,
      curPageNum: 1,
    };
  },
  created() {
    this.getCacheList();
  },
  watch: {},
  computed: {
    ...mapState(mapStore, ["mapdata", "cache"]),
    ...mapGetters(mapStore, ["getMapData"]),
    // getSize() {
    //   return this.cache.size;
    // },
    computedObj() {
      return this.limit ? this.list.slice(0, this.limit) : this.list;
    },
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      return Math.ceil(this.list.length / this.dataPerPage);
    },
    calData() {
      return this.list.slice(this.startOffset, this.endOffset);
    },
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

<style>
#vc .v-container-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}
</style>
