<template>
  <!-- result -->
  <div style="background-color: white">
    <!-- color="rgb(207, 231, 255, 1)" -->
    <VBtn class="" color="rgb(0, 0, 0, 1)" icon @click="closeDetail">
      <VIcon>mdi-close</VIcon>
    </VBtn>

    <VBtn class="float-right" color="rgb(255, 255, 0, 1)" icon @click="changeFavorite">
      <VIcon>{{ iconName[this.iconFlg] }}</VIcon>
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
      <v-card class="mb-10" style="width: 100%; height: 240px; border-radius: 25px">
        <v-container>
          <v-row>
            <v-col cols="5">아파트 명</v-col>
            <v-col cols="7" style="font-family: mfont-w" text-center>
              {{ mapdata.app.result.detail.houseinfo.aptName }}
            </v-col>
            <v-col cols="3">주소</v-col>
            <v-col
              cols="9"
              style="font-family: mfont-w; font-size: 0.9em"
              class="text-h10 text-center"
            >
              {{ mapdata.app.result.detail.houseinfo.sidoName }}
              {{ mapdata.app.result.detail.houseinfo.gugunName }}
              {{ mapdata.app.result.detail.houseinfo.dongName }}
            </v-col>
            <v-col cols="5">건설 년도</v-col>
            <v-col cols="7" style="font-family: mfont-w" class="text-h10 text-left">
              {{ mapdata.app.result.detail.houseinfo.buildYear }}년
            </v-col>
            <v-col cols="5">최근 거래가</v-col>
            <v-col cols="7" style="font-family: mfont-w" class="text-h10 text-left">
              {{
                Number(
                  mapdata.app.result.detail.houseinfo.recentPrice.split(",").join("")
                ) / 10000
              }}억
            </v-col>
            <!-- <h6 class="text-h8 text-left px-5 pb-3" style="font-family: mfont-w"></h6> -->
          </v-row>
        </v-container>
      </v-card>

      <!-- 라인차트 거래가추이 -->
      <!-- <v-header class="text-center">거래가 추이</v-header> -->
      <!-- <v-subheader class="text-center">거래가 추이</v-subheader> -->
      <h5 class="text-h10 text-center mb-5">거래가 추이</h5>
      <v-card class="mb-10" height="30%">
        <line-chart></line-chart>
      </v-card>

      <!-- 다각형차트 인프라점수 -->
      <!-- <v-subheader class="text-center">인프라 점수</v-subheader> -->
      <h5 class="text-h10 text-center mb-5">인프라 점수</h5>
      <v-card class="mb-10" v-show="raderChartShow">
        <radar-chart></radar-chart>
      </v-card>

      <v-card class="mb-10" v-show="!raderChartShow">
        <v-container class="pt-8 pb-16 ma-0">
          <v-row>
            <v-col cols="12" class="text-center pb-4 grey--text" style="font-size: 0.7em"
              >인프라 점수를 나타내기 위해</v-col
            >
            <v-col cols="5" class="text-right pa-0 grey--text" style="font-size: 0.7em"
              >인프라를 최소</v-col
            >
            <v-col cols="1" class="text-center pa-0 red--text" style="font-size: 0.8em">
              3
            </v-col>
            <v-col cols="4" class="text-left pa-0 grey--text" style="font-size: 0.7em">
              &nbsp개 선택해주세요
            </v-col>

            <!-- <h6 class="text-h8 text-left px-5 pb-3" style="font-family: mfont-w"></h6> -->
          </v-row>
        </v-container>
      </v-card>

      <!-- 거래내역 -->
      <h5 class="text-h10 text-center mb-5">아파트 거래내역</h5>
      <!-- <v-subheader class="text-center">아파트 거래내역</v-subheader> -->
      <v-list
        outlined
        dense
        class="rounded mb-5"
        style="overflow-x: hidden"
        height="55%"
        :class="scrollbarTheme"
      >
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
              <v-list-item-subtitle
                >금액 :
                {{ Number(deal.dealAmount.split(",").join("")) / 10000 }}
                억</v-list-item-subtitle
              >
              <v-list-item-subtitle>{{ deal.floor }} 층</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-pagination
        v-model="curPageNum"
        :length="numOfPages"
        circle
        size="sm"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script>
/* global kakao */
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { apiInstance } from "@/api/http-common";
import LineChart from "./LineChart.vue";
import RadarChart from "./RadarChart.vue";

const memberStore = "memberStore";
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

      iconFlg: 0,
      iconName: ["mdi-star-outline", "mdi-star"],

      raderChartShow: false,

      benched: 0,
    };
  },
  created() {},
  mounted() {
    this.setRoadView();
    this.checkIsFavorite();
  },
  watch: {
    getIsToggle(val) {
      console.log("getIsToggle");
      console.log(val);
      if (val.length > 2) {
        this.raderChartShow = true;
      } else {
        this.raderChartShow = false;
      }
      console.log(this.raderChartShow);
    },
    getIsFavorite(val) {
      if (val) this.iconFlg = 1;
      else this.iconFlg = 0;
    },
  },
  computed: {
    ...mapState(mapStore, ["mapdata", "isToggle"]),
    ...mapGetters(mapStore, ["getMapData", "getClusterer", "getMarkers", "getIsToggle"]),
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
    ...mapState(memberStore, ["isLogin", "favorite", "userInfo"]),
    ...mapGetters(mapStore, ["getMapData"]),
    gethouseinfo() {
      return this.mapdata.app.result.detail.houseinfo;
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    getIsFavorite() {
      return this.mapdata.app.result.detail.isFavorite;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getIconFlg() {
      return this.iconFlg;
    },
  },
  methods: {
    ...mapActions(mapStore, ["detailHouse", "getHouseList"]),
    ...mapActions(memberStore, [
      "insertFavorite",
      "deleteFavorite",
      "getFavorite",
      "getFavoriteAll",
    ]),
    ...mapMutations(mapStore, [
      "SET_HOUSE_LIST",
      "CLEAR_APT_LIST",
      "SET_DETAIL_HOUSE",
      "CLEAR_DETAIL_APT",
      "FLIP_IS_FAVORITE",
      "SET_IS_FAVORITE",
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
    changeFavorite() {
      // this.checkIsFavorite();
      let data = {
        user_id: this.getUserInfo.userid,
        aptName: this.gethouseinfo.aptName,
        dongCode: this.gethouseinfo.dongCode,
      };
      console.log("changeFavorite");
      console.log(this.iconFlg);

      if (this.getIsFavorite) {
        // user_id,aptName,dongCode
        this.deleteFavorite(data);
        // 아이콘바꾸기
      } else {
        this.insertFavorite(data);
      }

      this.iconFlg = (this.iconFlg + 1) % 2;
      console.log("changeFavorite2");
      console.log(this.iconFlg);
      this.FLIP_IS_FAVORITE();
    },
    async checkIsFavorite() {
      const userInfo = this.getUserInfo;
      const houseinfo = this.gethouseinfo;
      console.log("checkIsFavorite");
      console.log(userInfo);
      if (userInfo == undefined || userInfo == null || userInfo == "") {
        alert("로그인이 필요한 기능입니다..");
        this.$router.push({ name: "login" });
      }
      // let returnValue=0;
      this.iconFlg = 0;
      this.SET_IS_FAVORITE(false);
      const list = await this.getFavoriteAll();
      list.forEach((data) => {
        console.log(data);
        if (
          data.user_id != userInfo.userid ||
          houseinfo.dongCode != data.dongCode ||
          houseinfo.aptName != data.aptName
        )
          return;
        this.SET_IS_FAVORITE(true);
        this.iconFlg = 1;
        if ((this.iconFlg = 1)) console.log("11111111111111111");
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
