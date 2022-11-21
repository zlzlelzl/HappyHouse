import { apiInstance } from "@/api/http-common";
const http = apiInstance();

/* global kakao */
const mapStore = {
  namespaced: true,
  state: {
  //   map:{
  //     app : {
  //         search : {
  //             // 서치리스트에서 클릭할 경우 typename을 기반으로 확대 레벨별 클러스터링 또는 houseinfo 검색
  //             types : {}
  //         },
  //         result : {
  //             // 전체 데이터
  //             // dongcodes:[],
  //             dongcode:{},
  //             // 타입이 houseinfo 검색일 경우 houseinfo 데이터가 들어감
  //             houseinfos:[],
  //             // houseinfo 기준 거래내역
  //             housedeals:[]
  //         }
  //     },
  //     infra : {}
  // },
  houses: [],
  house: null,
  isUse: false,
  markers: [],
  infowindow: null,
  clusterer: [],
  infra:[],
  infraMarkers:[],
    
  },
  getters: {
    getMarkers(state){
      return state.markers;
    },    
    getClusterer(state){
      return state.clusterer;
    },
  },
  mutations: {
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
      state.isUse = false;
    },    
    CLEAR_DETAIL_APT(state) {
      state.house = null;
      state.isUse = false;
    },    
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
      state.isUse = true;
    },
    CLEAR_IS_USE(state) {
      state.isUse = false;
    },    
    SET_IS_USE(state,bool) {
      state.isUse = bool;
    },
    SET_MARKERS(state,markers){
      state.markers=markers;
    },
    SET_INFO_WINDOW(state,infowindow){
      state.infowindow=infowindow;
    },
    CLEAR_MARKERS(state){
      state.markers=null;
    },
    CLEAR_INFO_WINDOW(state){
      state.infowindow=null;
    },
    SET_CLUSTERER(state,clusterer){
      state.clusterer=clusterer;
    },
  },
  actions: {
    searchByType({ commit, state },data){
      console.log(data.name, data.type);
      http
        .get(`/map/apt/type?name=${data.name}&type=${data.type}`)
        .then(response => {
          console.log("s");
          commit("SET_HOUSE_LIST",response.data);
          commit("SET_IS_USE",false);
          console.log(state.houses);
        })
        .catch(error => {
          console.log("e");
          console.log(error);
        });
    },   
    getHouseList: ({ commit }, gugunCode) => {
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202207",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default mapStore;
