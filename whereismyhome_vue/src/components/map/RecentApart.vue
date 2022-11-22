<template>
  <div>
    <div>
      <h3 class="text-h5 font-weight-medium pb-4">최근 본 방</h3>

      <v-divider></v-divider>
      <div>
        <v-row v-for="(item, idx) in this.computedObj" :key="idx" class="py-2">
          <v-col cols="12" md="6" lg="5">
            <v-card height="100%" flat>
              <v-img
                src="https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_1280.jpg"
                :aspect-ratio="16 / 9"
                height="100%"
              ></v-img>
            </v-card>
          </v-col>
          <v-col>
            <div>
              <v-btn depressed color="accent" small>아파트 보러가기</v-btn>
              <h3 class="text-h6 font-weight-bold primary--text py-3">{{ item.k }}</h3>

              <div class="d-flex align-center">
                <v-avatar color="accent" size="24">
                  <v-icon dark small>mdi-feather</v-icon>
                </v-avatar>

                <div class="pl-2">{{ item.v }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
        <button @click="limit = limit + 5">Show more</button>
      </div>
    </div>
  </div>
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

<style></style>
