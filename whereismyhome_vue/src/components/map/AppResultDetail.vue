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
    <v-card class="mb-10" height="25%">
      <line-chart></line-chart>
    </v-card>
    <v-card class="mb-10" height="25%">
      <radar-chart></radar-chart>
    </v-card>
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
import { mapState, mapActions, mapMutations } from "vuex";
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
  watch: {},
  computed: {
    ...mapState(mapStore, ["house", "houses", "isUse"]),
  },
  methods: {
    ...mapActions(mapStore, ["detailHouse", "getHouseList"]),
    ...mapMutations(mapStore, [
      "SET_HOUSE_LIST",
      "CLEAR_APT_LIST",
      "SET_DETAIL_HOUSE",
      "CLEAR_DETAIL_APT",
    ]),
    // setHouseDetailInfo(aptCode){
    //   http
    //     .get(`/map/deal?aptCode=${aptCode}`)
    //     .then((response)=>{
    //       console.log("setHouseDetailInfo - s "+response);
    //       this.SET_DETAIL_HOUSE(response.data);
    //       console.log(response.data);
    //     })
    //     .catch((error)=>{
    //       console.log("setHouseDetailInfo - e "+error);
    //     });
    // },
    closeDetail() {
      this.CLEAR_DETAIL_APT();
    },
  },
};
</script>
<style scoped></style>
