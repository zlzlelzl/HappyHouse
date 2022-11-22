<template>
  <!-- result -->
  <v-card class="pa-0 ma-3" height="82%" width="93%" style="position: absolute; top: 15%">
    <template v-if="isUseCheck">
      <app-result-detail></app-result-detail>
    </template>

    <v-list dense class="overflow-y-auto ma-3" height="98%" :class="scrollbarTheme">
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
  watch: {
    // isUseCheck(val) {
    //   console.log("ckechk1");
    //   if (!val) return;
    //   let houseinfo = this.mapdata.app.detail.houseinfo;
    //   let key = houseinfo.aptName;
    //   let value =
    //     houseinfo.sidoName + " " + houseinfo.gugunName + " " + houseinfo.dongName;
    //   this.cache.set(key, value);
    //   // this.getCacheList();
    // },
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData", "getCircle", "getCheckCircle"]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse;
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapMutations(mapStore, ["CLEAR_APT_LIST", "SET_HOUSE_DEAL", "SET_DETAIL_HOUSE"]),
    ...mapActions(mapStore, ["setHouseDetail"]),
    setHouseDetailInfo(house) {
      console.log(house);
      this.setHouseDetail(house);
      this.moveMapLocation(house);
      this.drawCircleFromHouse(house);
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, data.lng);
      console.log(this.map);
      this.map.setCenter(moveLatLon);
    },
    drawCircleFromHouse(data) {
      // 이전 원 지우기
      if (this.mapdata.infra.circle.length > 0) {
        this.mapdata.infra.circle.forEach((circle) => {
          circle.setMap(null);
        });
        this.mapdata.infra.circle = [];
      }
      let circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(data.lat, data.lng), // 원의 중심좌표 입니다
        radius: 1000, // 미터 단위의 원의 반지름입니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });
      this.mapdata.infra.circle.push(circle);

      // 지도에 원을 표시합니다
      circle.setMap(this.map);
      this.mapdata.infra.checkCircle = true;
      // this.SET_CIRCLE(circles);
    },
  },
};
</script>
<style scoped>
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
