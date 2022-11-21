<template>
  <!-- result -->
  <v-card
    color="rgb(0, 0, 0, 1)"
    class="pa-5 ma-0"
    height="100%"
    width="100%"
    style="position: absolute; z-index: 20"
  >
    <VBtn color="rgb(255, 255, 255, 1)" icon @click="closeDetail">
      <VIcon>mdi-close</VIcon>
    </VBtn>
    <!-- 로드뷰 -->
    <v-card class="mb-10" height="25%">
      <div id="roadview" style="width: 100%; height: 300px"></div>
    </v-card>

    <!-- 라인차트 거래가추이 -->
    <v-card class="mb-10" height="25%">
      <line-chart></line-chart>
    </v-card>

    <!-- 다각형차트 인프라점수 -->
    <v-card class="mb-10" height="25%">
      <radar-chart></radar-chart>
    </v-card>

    <!-- 거래내역 -->
    <v-list dense class="overflow-y-auto rounded" height="55%">
      <v-subheader>아파트 거래내역</v-subheader>
      <v-list-item-group v-if="house.length == 0">
        <v-list-item>거래 내역이 없습니다.</v-list-item>
      </v-list-item-group>
      <v-list-item-group v-else>
        <v-list-item v-for="(h, i) in house" :key="i">
          <!-- <v-list-item-icon>
            <v-icon v-text="house.icon"></v-icon>
          </v-list-item-icon> -->
          <!-- getter 코드로 최적화 필요 -->
          <v-list-item-content>
            <v-list-item-title
              >날짜 : {{ h.dealYear }} 년{{ h.dealMonth }} 월
              {{ h.dealDay }}일</v-list-item-title
            >
            <v-list-item-subtitle>금액 : {{ h.dealAmount }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ h.floor }} 층</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
/* global kakao */
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { apiInstance } from "@/api/http-common";
import LineChart from "./LineChart.vue";
import RadarChart from "./RadarChart.vue";

const mapStore = "mapStore";
const http = apiInstance();

export default {
  components: { LineChart, RadarChart },
  name: "AppResultDetail",
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.setRoadView();
  },
  watch: {},
  computed: {
    ...mapState(mapStore, ["house", "houses", "isUse", "map"]),
    ...mapGetters(mapStore, ["getMap"]),
  },
  methods: {
    ...mapActions(mapStore, ["detailHouse", "getHouseList"]),
    ...mapMutations(mapStore, [
      "SET_HOUSE_LIST",
      "CLEAR_APT_LIST",
      "SET_DETAIL_HOUSE",
      "CLEAR_DETAIL_APT",
    ]),
    //디테일창 닫기 버튼
    closeDetail() {
      this.CLEAR_DETAIL_APT();
    },

    // <!-- 로드뷰 -->
    setRoadView() {
      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      let map = this.getMap;
      let houseInfos = map.app.result.houseinfos;

      var position = new kakao.maps.LatLng(houseInfos.lat, houseInfos.lng);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
  },
};
</script>
<style scoped></style>
