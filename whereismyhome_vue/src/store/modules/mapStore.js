import { apiInstance } from "@/api/http-common"
const http = apiInstance()

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
          { Name: "MT1", Description: "대형마트", icon: "mdi-store" },
          { Name: "CS2", Description: "편의점", icon: "mdi-store-24-hour" },
          { Name: "PS3", Description: "어린이집, 유치원", icon: "mdi-cradle" },
          { Name: "SC4", Description: "학교", icon: "mdi-school" },
          { Name: "PK6", Description: "주차장", icon: "mdi-parking" },
          { Name: "OL7", Description: "주유소, 충전소", icon: "mdi-gas-station" },
          { Name: "SW8", Description: "지하철역", icon: "mdi-subway-variant" },
          { Name: "BK9", Description: "은행", icon: "mdi-bank" },
          { Name: "FD6", Description: "음식점", icon: "mdi-silverware-fork-knife" },
          { Name: "CE7", Description: "카페", icon: "mdi-coffee" },
          { Name: "HP8", Description: "병원", icon: "mdi-hospital-box" },
          { Name: "PM9", Description: "약국", icon: "mdi-pill" },
        ],
        circle: [],
      },
    },
    infowindow: null,
    isToggle: [],
  },
  getters: {
    getIsToggle(state) {
      return state.isToggle
    },
    getMapData(state) {
      return state.mapdata
    },
    getMarkers(state) {
      return state.mapdata.app.markers
    },
    getClusterer(state) {
      return state.mapdata.app.clusterer
    },
    getCircle(state) {
      return state.mapdata.infra.circle
    },
  },
  mutations: {
    CLEAR_APT_LIST(state) {
      state.mapdata.app.result.houseinfos = []
      state.mapdata.app.result.detail.housedeals = null
      state.mapdata.app.result.detail.isUse = false
    },
    CLEAR_DETAIL_APT(state) {
      state.mapdata.app.result.detail.houseinfo = null
      state.mapdata.app.result.detail.housedeals = null
      state.mapdata.app.result.detail.isUse = false
      // state.house = null;
      // state.isUse = false;
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses
    },
    SET_HOUSE_DEAL(state, house) {
      state.mapdata.app.result.detail.housedeals = house
      state.mapdata.app.result.detail.isUse = true
    },
    SET_DETAIL_HOUSE(state, house) {
      state.mapdata.app.result.detail.houseinfo = house
    },
    CLEAR_IS_USE(state) {
      state.isUse = false
    },
    SET_IS_USE(state, bool) {
      state.isUse = bool
    },
    SET_MARKERS(state, markers) {
      state.mapdata.app.markers = markers
    },
    SET_INFO_WINDOW(state, infowindow) {
      state.infowindow = infowindow
    },
    CLEAR_MARKERS(state) {
      state.markers = null
    },
    CLEAR_INFO_WINDOW(state) {
      state.infowindow = null
    },
    SET_CLUSTERER(state, clusterer) {
      state.mapdata.app.clusterer = clusterer
    },
    SET_MAP_DATA(state, mapdata) {
      state.mapdata = mapdata
    },
    SET_CIRCLE(state, circle) {
      state.mapdata.infra.circle = circle
    },
    SET_ISTOGGLE(state, isToggle) {
      state.isToggle = isToggle
    },
  },
  actions: {
    searchByType({ commit, state }, data) {
      console.log(data.name, data.type)
      http
        .get(`/map/apt/type?name=${data.name}&type=${data.type}`)
        .then((response) => {
          console.log("s")
          state.mapdata.app.result.houseinfos = response.data
          state.mapdata.app.result.detail.isUse = false
          // commit("SET_HOUSE_LIST", response.data);
          // commit("SET_IS_USE", false);
          console.log(state.houses)
        })
        .catch((error) => {
          console.log("e")
          console.log(error)
        })
    },
    getHouseList: ({ commit, state }, gugunCode) => {
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202207",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      }
      houseList(
        params,
        ({ data }) => {
          state.mapdata.app.result.houseinfos = data.response.body.items.item
          // commit("SET_HOUSE_LIST", data.response.body.items.item);
        },
        (error) => {
          console.log(error)
        }
      )
    },
    detailHouse: ({ commit, state }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      state.mapdata.app.result.detail.houseinfo = house
      // commit("SET_DETAIL_HOUSE", house);
    },
    setHouseDetail({ state }, house) {
      state.mapdata.app.result.detail.isUse = false
      http
        .get(`/map/deal?aptCode=${house.aptCode}`)
        .then((response) => {
          // console.log("setHouseDetailInfo - s " + response);
          // console.log(response.data);
          // this.SET_HOUSE_DEAL(response.data);
          // this.SET_DETAIL_HOUSE(house);
          // let map = this.getMap;
          state.mapdata.app.result.detail.houseinfo = house
          state.mapdata.app.result.detail.housedeals = response.data
          state.mapdata.app.result.detail.isUse = true
          // this.moveMapLocation(house);
          // var moveLatLon = new kakao.maps.LatLng(house.lat, house.lng);
          // console.log(this.map);//
          // this.map.setCenter(moveLatLon);
        })
        .catch((error) => {
          console.log("setHouseDetailInfo - e " + error)
        })
    },
  },
}

export default mapStore
