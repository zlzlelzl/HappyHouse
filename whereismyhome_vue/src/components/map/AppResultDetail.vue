<template>
  <!-- result -->
  <div style="background-color: white">
    <!-- color="rgb(207, 231, 255, 1)" -->
    <VBtn class="" color="rgb(0, 0, 0, 1)" icon @click="closeDetail">
      <VIcon>mdi-close</VIcon>
    </VBtn>
    <v-card
      outlined
      color="rgb(255, 255, 255, 1)"
      class="pa-5 ma-0 rounded"
      height="95%"
      width="100%"
      style="position: absolute; z-index: 20; overflow: auto; border-radius: 0px"
      :class="scrollbarTheme"
    >
      <!-- 로드뷰 -->
      <h6 class="text-h5 text-center">
        {{ mapdata.app.result.detail.houseinfo.aptName }}
      </h6>
      <v-card
        id="roadview"
        class="mb-5"
        style="width: 100%; height: 300px; border-radius: 25px"
      >
      </v-card>

      <!-- 아파트 상세정보 -->
      <v-card class="mb-10" style="width: 100%; height: 300px; border-radius: 25px">
        <h6 class="text-h8 text-center pa-5">
          {{ mapdata.app.result.detail.houseinfo }}
        </h6>
      </v-card>

      <!-- 라인차트 거래가추이 -->
      <h5 class="text-h10 text-center mb-5">거래가 추이</h5>
      <v-card class="mb-10" height="30%">
        <line-chart></line-chart>
      </v-card>

      <!-- 다각형차트 인프라점수 -->
      <v-card class="mb-10">
        <radar-chart></radar-chart>
      </v-card>

      <!-- 거래내역 -->
      <v-list
        outlined
        dense
        class="rounded mb-5"
        style="overflow-x: hidden"
        height="55%"
        :class="scrollbarTheme"
      >
        <v-subheader class="text-center">아파트 거래내역</v-subheader>
        <v-list-item-group v-if="mapdata.app.result.detail.housedeals.length == 0">
          <v-list-item>거래 내역이 없습니다.</v-list-item>
        </v-list-item-group>
        <v-list-item-group v-else>
          <v-list-item v-for="(deal, i) in calData" :key="i">
            <!-- <v-list-item-icon>
            <v-icon v-text="house.icon"></v-icon>
          </v-list-item-icon> -->
            <!-- getter 코드로 최적화 필요 -->
            <v-list-item-content>
              <v-list-item-title
                >날짜 : {{ deal.dealYear }} 년{{ deal.dealMonth }} 월
                {{ deal.dealDay }}일</v-list-item-title
              >
              <v-list-item-subtitle>금액 : {{ deal.dealAmount }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ deal.floor }} 층</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-pagination v-model="curPageNum" :length="numOfPages" circle></v-pagination>
    </v-card>
  </div>
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
    return {
      dataPerPage: 4,
      curPageNum: 1,

      benched: 0,
    };
  },
  created() {},
  mounted() {
    this.setRoadView();
  },
  watch: {},
  computed: {
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      return Math.ceil(
        this.mapdata.app.result.detail.housedeals.length / this.dataPerPage
      );
    },
    calData() {
      return this.mapdata.app.result.detail.housedeals.slice(
        this.startOffset,
        this.endOffset
      );
    },
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData"]),
    gethouseinfo() {
      return this.mapdata.app.result.detail.houseinfo;
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
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
      this.mapdata.app.result.detail.houseinfo = null;
      this.mapdata.app.result.detail.housedeals = null;
      this.mapdata.app.result.detail.isUse = false;
      // this.CLEAR_DETAIL_APT();
    },

    // <!-- 로드뷰 -->
    setRoadView() {
      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      // let map = this.getMap;
      let houseInfo = this.gethouseinfo;

      var position = new kakao.maps.LatLng(houseInfo.lat, houseInfo.lng);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
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
  background: rgb(110, 109, 109);
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
