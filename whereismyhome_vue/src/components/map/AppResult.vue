<template>
  <!-- result -->
  <v-card class="pa-0 ma-3" height="82%" width="93%" style="position: absolute; top: 15%">
    <template v-if="isUseCheck">
      <app-result-detail></app-result-detail>
    </template>

    <v-list dense class="overflow-y-auto ma-3" height="98%">
      <v-subheader>아파트 검색 결과</v-subheader>
      <v-list-item-group v-if="mapdata.app.result.houseinfos.length == 0">
        <v-list-item>검색 결과가 없습닌다.</v-list-item>
      </v-list-item-group>
      <v-list-item-group v-else>
        <v-list-item
          v-for="(house, i) in mapdata.app.result.houseinfos"
          :key="i"
          @click="setHouseDetailInfo(house)"
        >
          <!-- <v-list-item-icon>
            <v-icon v-text="house.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title v-text="house.aptName"></v-list-item-title>
            <v-list-item-subtitle
              >{{ house.sidoName }} {{ house.gugunName }}
              {{ house.dongName }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import AppResultDetail from "./AppResultDetail.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { apiInstance } from "@/api/http-common";

const mapStore = "mapStore";
const http = apiInstance();

export default {
  name: "AppResult",
  components: {
    AppResultDetail,
  },
  data() {
    return {};
  },
  props: {
    map: {},
  },
  created() {
    this.CLEAR_APT_LIST();
  },
  watch: {},
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData"]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse;
    },
  },
  methods: {
    ...mapMutations(mapStore, ["CLEAR_APT_LIST", "SET_HOUSE_DEAL", "SET_DEATAIL_HOUSE"]),
    setHouseDetailInfo(house) {
      http
        .get(`/map/deal?aptCode=${house.aptCode}`)
        .then((response) => {
          console.log("setHouseDetailInfo - s " + response);
          console.log(response.data);
          this.SET_HOUSE_DEAL(response.data);
          this.SET_DEATAIL_HOUSE(house);
          // let map = this.getMap;
          // map.app.result.detail.houseinfo = house;
          this.moveMapLocation(house);
        })
        .catch((error) => {
          console.log("setHouseDetailInfo - e " + error);
        });
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, data.lng);
      console.log(this.map);
      this.map.setCenter(moveLatLon);
    },
  },
};
</script>
<style scoped></style>
