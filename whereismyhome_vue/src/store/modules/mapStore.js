import { apiInstance } from "@/api/http-common"
const http = apiInstance()
const LRU = require("lru-cache")
/* global kakao */
const mapStore = {
  namespaced: true,
  state: {
    mapdata: {
      app: {
        search: {
          // 서치리스트에서 클릭할 경우 typename을 기반으로 확대 레벨별 클러스터링 또는 houseinfo 검색
          types: {},
        },
        result: {
          // 전체 데이터
          // dongcodes:[],
          dongcode: {},
          // 타입이 houseinfo 검색일 경우 houseinfo 데이터가 들어감
          houseinfos: [],

          detail: {
            //detail의 houseinfo
            houseinfo: {},

            // houseinfo 기준 거래내역
            housedeals: [],

            isUse: false,
          },
        },
        markers: [],
        clusterer: {},
      },
      infra: {
        data: [],
        markers: [],
        categoryGroupCodes: [
          {
            Name: "MT1",
            Description: "대형마트",
            icon: "mdi-store",
            iconSrc: "store24",
            iconSrc: "mdistore",
          },
          {
            Name: "CS2",
            Description: "편의점",
            icon: "mdi-store-24-hour",
            iconSrc: "mdistore24",
          },
          {
            Name: "PS3",
            Description: "어린이집, 유치원",
            icon: "mdi-cradle",
            iconSrc: "mdicradle",
          },
          { Name: "SC4", Description: "학교", icon: "mdi-school", iconSrc: "mdischool" },
          {
            Name: "PK6",
            Description: "주차장",
            icon: "mdi-parking",
            iconSrc: "mdiparking",
          },
          {
            Name: "OL7",
            Description: "주유소, 충전소",
            icon: "mdi-gas-station",
            iconSrc: "mdigasStation",
          },
          {
            Name: "SW8",
            Description: "지하철역",
            icon: "mdi-subway-variant",
            iconSrc: "mdisubway",
          },
          { Name: "BK9", Description: "은행", icon: "mdi-bank", iconSrc: "mdibank" },
          {
            Name: "FD6",
            Description: "음식점",
            icon: "mdi-silverware-fork-knife",
            iconSrc: "mdiSFK",
          },
          { Name: "CE7", Description: "카페", icon: "mdi-coffee", iconSrc: "mdicoffee" },
          {
            Name: "HP8",
            Description: "병원",
            icon: "mdi-hospital-box",
            iconSrc: "mdihospital",
          },
          { Name: "PM9", Description: "약국", icon: "mdi-pill", iconSrc: "mdipill" },
        ],
        circle: [],
        checkCircle: false,
      },
    },
    cache: null,
    infowindow: null,
    isToggle: [],
  },
  getters: {
    getIsToggle(state) {
      return state.isToggle;
    },
    getMapData(state) {
      return state.mapdata;
    },
    getMarkers(state) {
      return state.mapdata.app.markers;
    },
    getClusterer(state) {
      return state.mapdata.app.clusterer;
    },
    getCircle(state) {
      return state.mapdata.infra.circle;
    },
    getCheckCircle(state) {
      return state.mapdata.infra.checkCircle
    },
    getHouseInfos(state) {
      return state.mapdata.app.result.houseinfos;
    },
  },
  mutations: {
    CLEAR_APT_LIST(state) {
      state.mapdata.app.result.houseinfos = [];
      state.mapdata.app.result.detail.housedeals = null;
      state.mapdata.app.result.detail.isUse = false;
    },
    CLEAR_DETAIL_APT(state) {
      state.mapdata.app.result.detail.houseinfo = null;
      state.mapdata.app.result.detail.housedeals = null;
      state.mapdata.app.result.detail.isUse = false;
      // state.house = null;
      // state.isUse = false;
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_HOUSE_DEAL(state, house) {
      state.mapdata.app.result.detail.housedeals = house;
      state.mapdata.app.result.detail.isUse = true;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.mapdata.app.result.detail.houseinfo = house;
    },
    CLEAR_IS_USE(state) {
      state.isUse = false;
    },
    SET_IS_USE(state, bool) {
      state.isUse = bool;
    },
    SET_MARKERS(state, markers) {
      state.mapdata.app.markers = markers;
    },
    SET_INFO_WINDOW(state, infowindow) {
      state.infowindow = infowindow;
    },
    CLEAR_MARKERS(state) {
      state.markers = [];
    },
    CLEAR_INFO_WINDOW(state) {
      state.infowindow = [];
    },
    SET_CLUSTERER(state, clusterer) {
      state.mapdata.app.clusterer = clusterer;
    },
    SET_MAP_DATA(state, mapdata) {
      state.mapdata = mapdata;
    },
    SET_CIRCLE(state, circle) {
      state.mapdata.infra.circle = circle;
    },
    SET_ISTOGGLE(state, isToggle) {
      state.isToggle = isToggle;
    },
    SET_CACHE(state, key, value) {
      state.cache.set(key, value)
    },
    INIT_CACHE(state) {
      const options = {
        max: 25,
        maxSize: 30,
        sizeCalculation: (value, key) => {
          return 1
        },
        dispose: (value, key) => {
          //freeFromMemoryOrWhatever(value);
        },
        ttl: 1000 * 60 * 5,
        allowStale: false,
        updateAgeOnGet: false,
        updateAgeOnHas: false,
        fetchMethod: async (key, staleValue, { options, signal }) => {},
      }
      console.log("cache init")
      state.cache = new LRU(options)
    },
    INIT(state) {
      // this.mappdata.app.markers = [];
    },
  },
  actions: {
    searchByType({ commit, state }, data) {
      // console.log(data.name, data.type);
      http
        .get(`/map/apt/type?name=${data.name}&type=${data.type}`)
        .then((response) => {
          // console.log("s");
          state.mapdata.app.result.houseinfos = response.data;
          state.mapdata.app.result.detail.isUse = false;
          // commit("SET_HOUSE_LIST", response.data);
          // commit("SET_IS_USE", false);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log("e");
          console.log(error);
        });
    },
    getHouseList: ({ commit, state }, gugunCode) => {
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202207",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        ({ data }) => {
          state.mapdata.app.result.houseinfos = data.response.body.items.item;
          // commit("SET_HOUSE_LIST", data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit, state }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      state.mapdata.app.result.detail.houseinfo = house;
      // commit("SET_DETAIL_HOUSE", house);
    },
    setHouseDetail({ state }, house) {
      state.mapdata.app.result.detail.isUse = false;
      http
        .get(`/map/deal?aptCode=${house.aptCode}`)
        .then((response) => {
          // console.log("setHouseDetailInfo - s " + response);
          // console.log(response.data);
          // this.SET_HOUSE_DEAL(response.data);
          // this.SET_DETAIL_HOUSE(house);
          // let map = this.getMap;
          // console.log(state.mapdata.app.result.houseinfos);
          state.mapdata.app.result.detail.houseinfo = house
          state.mapdata.app.result.detail.housedeals = response.data
          state.mapdata.app.result.detail.isUse = true
          //캐시에추가
          console.log("cache set")
          let value = house.sidoName + " " + house.gugunName + " " + house.dongName

          state.cache.set(house.aptCode, house)
          // this.moveMapLocation(house);
          // var moveLatLon = new kakao.maps.LatLng(house.lat, house.lng);
          // console.log(this.map);//
          // this.map.setCenter(moveLatLon);
        })
        .catch((error) => {
          console.log("setHouseDetailInfo - e " + error);
        });
    },
  },
};

export default mapStore;
