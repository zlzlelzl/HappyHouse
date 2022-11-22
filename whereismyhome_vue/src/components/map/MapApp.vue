<template>
  <div>
    <div id="map" class="pa-5" style="width: 100%; height: 85vh">
      <!-- marker -->
      <infra-marker-list :map="map"></infra-marker-list>
      <v-card
        elevation="15"
        width="30%"
        height="100%"
        style="z-index: 2; background-color: rgba(255, 255, 255, 0.8)"
      >
        <!-- seacrh -->
        <app-search></app-search>
        <!-- result -->
        <app-result :map="map"></app-result>
      </v-card>
    </div>

    <div class="button-group">
      <!-- <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(1200)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button> -->
      <!-- <button @click="displayChart">chart</button> -->
    </div>
  </div>
</template>

<script>
/* global kakao */
import AppResult from "./AppResult.vue";
import AppSearch from "./AppSearch.vue";
import { apiInstance } from "@/api/http-common";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import InfraMarkerList from "./InfraMarkerList.vue";

const mapStore = "mapStore";
const http = apiInstance();

export default {
  namespaced: true,
  name: "MapApp",
  components: { AppResult, AppSearch, InfraMarkerList, InfraMarkerList },
  props: {},

  data() {
    return {
      map: {},

      pos: null,

      infra: {},
      areaMap: {},
      areaOrder: {},
      //   headers:{"Authorization": "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f"}
    };
  },
  mounted() {
    this.init();
    console.log(this.mapdata.infra);
    // this.SET_CIRCLE([]);
    this.setSeoulMarker();
    this.mapdata.infra.circle = [];
  },
  updated() {},
  created() {
    // this.getHouseInfos("1111010100"),
    // this.getHouseDeals("45")
    // this.setChartData("45")
    // this.getCircle = [];
    // this.setChart("45");
    // this.getInfra(this.categoryGroupCodes[0]["Name"])
    // this.getAllInfra()
    // this.calcInfraScore(this.pos)
  },
  watch: {
    isUseCheck(val) {
      console.log(val);
      if (!val && !this.mapdata.infra.checkCircle) {
        if (this.mapdata.infra.circle?.length != 0) {
          this.mapdata.infra.circle.forEach((data) => {
            data.setMap(null);
          });

          this.mapdata.infra.circle = [];
        }
      }
      this.mapdata.infra.checkCircle = false;
    },
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, [
      "getMapData",
      "getClusterer",
      "getMarkers",
      "getCircle",
      "getCheckCircle",
    ]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse;
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapMutations(mapStore, ["SET_MARKERS", "SET_CLUSTERER", "SET_CIRCLE"]),
    ...mapActions(mapStore, ["setHouseDetail"]),
    //카카오맵 init---------------------------------------------------------------------
    init() {
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.async = true;
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9549d558e1a1a37bc6398c7bedc83d2c&libraries=services,clusterer";
        document.head.appendChild(script);
      }
    },
    async initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      var clusterer = new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
      });

      this.SET_CLUSTERER(clusterer);
    },
    //차트 ------------------------------------------------------------------------------
    // displayChart() {
    //   this.isChart = true;
    // },
    // async calcInfraScore(pos) {
    //   // 인프라 가져오기
    //   await this.getAllInfra();

    //   let score = 0;

    //   for (let i = 0; i < this.categoryGroupCodes.length; i++) {
    //     let code = this.categoryGroupCodes[i]["Name"];
    //     // 0~1000m, 0m에 가까울수록 고득점
    //     // console.log(this.infra[code][0])
    //     if (this.infra[code].length != 0) {
    //       score += 1000 - this.infra[code][0].distance;
    //     }
    //     // console.log(this.infra)
    //   }
    //   // await 때문에 조금 느림
    //   console.log(score);
    // },
    // async getAllInfra() {
    //   for (let i = 0; i < this.categoryGroupCodes.length; i++) {
    //     let code = this.categoryGroupCodes[i]["Name"];
    //     await this.getInfra(code);
    //   }

    //   //  console.log(this.infra)
    // },
    // async getInfra(code) {
    //   // console.log(code)
    //   await axios
    //     .get(
    //       `https://dapi.kakao.com/v2/local/search/category.json?x=${this.pos[1]}&y=${this.pos[0]}&radius=1000&category_group_code=${code}&sort=distance`,
    //       { headers: { Authorization: "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f" } }
    //     )
    //     .then(({ data }) => {
    //       // this.map.app.result.housedeals = data
    //       // this.infra[code] = data.documents;
    //       // console.log(this.infra[code])
    //     });
    // },
    // getHouseInfos(dongcode) {
    //   http.get(`/map/apt?dong=${dongcode}`).then(({ data }) => {
    //     this.mapdata.app.result.houseinfos = data;
    //     console.log(data);
    //   });
    // },
    // async getHouseDeals(aptCode) {
    //   await http.get(`/map/deal?aptCode=${aptCode}`).then(({ data }) => {
    //     this.mapdata.app.result.housedeals = data;
    //     // console.log(data)
    //   });
    // },
    // async setChart(aptCode) {
    //   await this.setChartData(aptCode);
    //   console.log(this.areaMap, this.areaOrder);
    // },
    // async setChartData(aptCode) {
    //   await this.getHouseDeals(aptCode);

    //   this.areaMap = {};
    //   this.areaOrder = [];
    //   let deals = this.mapdata.app.result.housedeals;
    //   for (let i = 0; i < deals.length; i++) {
    //     if (!this.areaMap[deals[i]["area"]]) {
    //       this.areaMap[deals[i]["area"]] = [];
    //       this.areaOrder.push(deals[i]["area"]);
    //     }
    //     this.areaMap[deals[i]["area"]].push({
    //       x: new Date(deals[i].dealYear, deals[i].dealMonth, deals[i].dealDay).getTime(),
    //       y: deals[i].dealAmount,
    //     });
    //   }
    //   this.areaOrder.sort();
    //   // console.log(this.areaMap)
    //   for (let i = 0; i < this.areaOrder.length; i++) {
    //     this.areaMap[this.areaOrder[i]].sort((a, b) => a.x - b.x);
    //   }
    // console.log(this.areaMap)

    // for(let i=0;i<deals.length;i++){
    //     if(deals[i].area=="59.98")
    //         console.log(new Date(deals[i].dealYear,deals[i].dealMonth,deals[i].dealDay).getTime(), deals[i].dealAmount)
    // }
    // },
    //---------------------------------------------------------------------------
    //카카오 기본 코드---------------------------------------------------------------
    // changeSize(size) {
    //   const container = document.getElementById("map");
    //   container.style.height = `800px`;
    //   this.map.relayout();
    // },

    // displayInfoWindow() {
    //   if (this.infowindow && this.infowindow.getMap()) {
    //     //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
    //     this.map.setCenter(this.infowindow.getPosition());
    //     return;
    //   }

    //   var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //     iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    //     iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    //   // this.infowindow = new kakao.maps.InfoWindow({
    //   //   map: this.map, // 인포윈도우가 표시될 지도
    //   //   position: iwPosition,
    //   //   content: iwContent,
    //   //   removable: iwRemoveable,
    //   // });

    //   this.map.setCenter(iwPosition);
    // },

    // setCluster() {},
    // setMarker() {
    //   // 지도에 마커를 표시합니다
    //   //   var marker = new window.kakao.maps.Marker({
    //   //     map: this.map,
    //   //     position: new window.kakao.maps.LatLng(33.450701, 126.570667),
    //   //   });
    //   //   // 커스텀 오버레이에 표시할 컨텐츠 입니다
    //   //   // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    //   //   // 별도의 이벤트 메소드를 제공하지 않습니다
    //   //   var content =
    //   //     '<div class="wrap">' +
    //   //     '    <div class="info">' +
    //   //     '        <div class="title">' +
    //   //     "            카카오 스페이스닷원" +
    //   //     '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    //   //     "        </div>" +
    //   //     '        <div class="body">' +
    //   //     '            <div class="img">' +
    //   //     '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
    //   //     "           </div>" +
    //   //     '            <div class="desc">' +
    //   //     '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
    //   //     '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
    //   //     '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
    //   //     "            </div>" +
    //   //     "        </div>" +
    //   //     "    </div>" +
    //   //     "</div>";
    //   //   // 마커 위에 커스텀오버레이를 표시합니다
    //   //   // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    //   //   var overlay = new kakao.maps.CustomOverlay({
    //   //     content: content,
    //   //     map: map,
    //   //     position: marker.getPosition(),
    //   //   });
    //   //   // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    //   //   kakao.maps.event.addListener(marker, "click", function () {
    //   //     overlay.setMap(map);
    //   //   });
    //   // },
    //   // // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    //   // closeOverlay() {
    //   //   overlay.setMap(null);
    // },
    // changeList(datas) {
    //   let lists = [];
    //   datas.forEach((data) => {
    //     //console.log(data);
    //     let d1 = data.roadName;
    //     let d2 = data.roadNumber;
    //     lists.push(d1 + " " + d2);
    //     console.log(d1 + " " + d2);
    //   });
    //   return lists;
    // },
    // changeLatLng(lists) {
    //   let geocoder = new kakao.maps.services.Geocoder();
    //   let retList = [];
    //   lists.forEach((data) => {
    //     geocoder.addressSearch(data, function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //         let info = {
    //           lat: result[0].y,
    //           lng: result[0].x,
    //         };
    //         retList.push(info);
    //       }
    //     });
    //   });
    //   console.log(retList);
    //   return retList;
    // },
    //카카오 기본 코드---------------------------------------------------------------

    displayMarker(data) {
      //마커 초기화
      let markers = this.getMarkers;
      if (markers.length > 0) {
        markers.forEach((marker) => marker.setMap(null));
      }

      if (data.length > 0) {
        markers = [];
        data.forEach((d) => {
          let marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(d.lat, d.lng),
            title: JSON.stringify(d),
          });
          markers.push(marker);
          // 마커에 클릭이벤트를 등록합니다
          // console.log(marker.getTitle());
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 위에 인포윈도우를 표시합니다
            // console.log(JSON.parse(marker.getTitle()));
            this.setHouseDetailInfo(JSON.parse(marker.getTitle()));
          });
        });
        // markers = positions.map(
        //   (p) =>
        //     new kakao.maps.Marker({
        //       map: this.map,
        //       p,
        //     })
        // );
        // const bounds = positions.reduce(
        //   (bounds, latlng) => bounds.extend(latlng),
        //   new kakao.maps.LatLngBounds()
        // );
        // this.map.setBounds(bounds);
        // console.log("getcl");
        // console.log(this.getClusterer);
        let clusterer = this.getClusterer;
        // console.log(clusterer);
        clusterer.addMarkers(markers);
        // this.SET_CLUSTERER(clusterer);
        // this.SET_MARKERS(markers);
      }
    },
    setSeoulMarker() {
      http
        .get(`/map/apt/type?name=서울특별시&type=시`)
        .then((response) => {
          console.log(response.data);
          this.SET_MARKERS(this.displayMarker(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setHouseDetailInfo(house) {
      // console.log("setHouseDetail st");
      // console.log(house);
      this.setHouseDetail(house);
      this.moveMapLocation(house);
      this.drawCircleFromHouse(house);
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, Number(data.lng) - 0.005);
      this.map.setCenter(moveLatLon);
    },
    drawCircleFromHouse(data) {
      // 이전 원 지우기
      if (this.mapdata.infra.circle.length > 0) {
        console.log("draw circls");
        console.log(this.mapdata.infra.circle);
        this.mapdata.infra.circle.forEach((item) => {
          item.setMap(null);
        });
        this.mapdata.infra.circle = [];
        console.log(this.mapdata.infra.circle);
      }
      let cc = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(data.lat, data.lng), // 원의 중심좌표 입니다
        radius: 1000, // 미터 단위의 원의 반지름입니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.3, // 채우기 불투명도 입니다
      });
      this.mapdata.infra.circle.push(cc);

      // 지도에 원을 표시합니다
      cc.setMap(this.map);
      this.mapdata.infra.checkCircle = true;
      // this.SET_CIRCLE(circles);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

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
