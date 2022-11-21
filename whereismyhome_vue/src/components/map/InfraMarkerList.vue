<template>
  <v-card
    class="float-right ma-0"
    style="z-index: 100; background-color: rgba(255, 255, 255, 0)"
    v-if="isUseCheck"
  >
    <v-btn-toggle multiple>
      <v-btn v-for="(item, i) in mapdata.infra.categoryGroupCodes" :key="i" class="ma-0">
        <v-icon v-text="item.icon"> </v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-card>
</template>

<script>
/* global kakao */
import { apiInstance } from "@/api/http-common";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";

const mapStore = "mapStore";
const http = apiInstance();

export default {
  namespaced: true,
  name: "InfraMarkerList",
  props: { map: null },

  data() {
    return {};
  },
  mounted() {
    this.init();
    this.setSeoulMarker();
    console.log(this.getMapData);
  },
  updated() {
    // this.createCoffeeMarkers(); // 커피숍 마커를 생성하고 커피숍 마커 배열에 추가합니다
    // this.createStoreMarkers(); // 편의점 마커를 생성하고 편의점 마커 배열에 추가합니다
    // this.createCarparkMarkers(); // 주차장 마커를 생성하고 주차장 마커 배열에 추가합니다
    // this.changeMarker("store");
  },
  created() {
    // this.getHouseInfos("1111010100"),
    // this.getHouseDeals("45")
    // this.setChartData("45")
    this.setChart("45");
    // this.getInfra(this.categoryGroupCodes[0]["Name"])
    // this.getAllInfra()
    // this.calcInfraScore(this.pos)
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData", "getClusterer", "getMarkers"]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse;
    },
    getHouseInfo() {
      return this.mapdata.app.result.detail.houseinfo;
    },
  },
  methods: {
    ...mapMutations(mapStore, ["SET_MARKERS", "SET_CLUSTERER"]),
    ...mapActions(mapStore, ["setHouseDetail"]),
    drawCircleFromHouse() {
      //이전 원 지우기
      if (circle != null) {
        circle.setMap(null);
      }
      const pos = this.getHouseInfo;
      // 지도에 표시할 원을 생성합니다
      let circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(pos.lat, pos.lng), // 원의 중심좌표 입니다
        radius: 500, // 미터 단위의 원의 반지름입니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });

      // 지도에 원을 표시합니다
      circle.setMap(map);
    },
    //차트 ------------------------------------------------------------------------------
    displayChart() {
      this.isChart = true;
    },
    async calcInfraScore(pos) {
      // 인프라 가져오기
      await this.getAllInfra();

      let score = 0;

      for (let i = 0; i < this.categoryGroupCodes.length; i++) {
        let code = this.categoryGroupCodes[i]["Name"];
        // 0~1000m, 0m에 가까울수록 고득점
        // console.log(this.infra[code][0])
        if (this.infra[code].length != 0) {
          score += 1000 - this.infra[code][0].distance;
        }
        // console.log(this.infra)
      }
      // await 때문에 조금 느림
      console.log(score);
    },
    async getAllInfra() {
      for (let i = 0; i < this.categoryGroupCodes.length; i++) {
        let code = this.categoryGroupCodes[i]["Name"];
        await this.getInfra(code);
      }

      //  console.log(this.infra)
    },
    async getInfra(code) {
      // console.log(code)
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/search/category.json?x=${this.pos[1]}&y=${this.pos[0]}&radius=1000&category_group_code=${code}&sort=distance`,
          { headers: { Authorization: "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f" } }
        )
        .then(({ data }) => {
          // this.map.app.result.housedeals = data
          this.infra[code] = data.documents;
          // console.log(this.infra[code])
        });
    },
    getHouseInfos(dongcode) {
      http.get(`/map/apt?dong=${dongcode}`).then(({ data }) => {
        this.mapdata.app.result.houseinfos = data;
        console.log(data);
      });
    },
    async getHouseDeals(aptCode) {
      await http.get(`/map/deal?aptCode=${aptCode}`).then(({ data }) => {
        this.mapdata.app.result.housedeals = data;
        // console.log(data)
      });
    },
    async setChart(aptCode) {
      await this.setChartData(aptCode);
      console.log(this.areaMap, this.areaOrder);
    },
    async setChartData(aptCode) {
      await this.getHouseDeals(aptCode);

      this.areaMap = {};
      this.areaOrder = [];
      let deals = this.mapdata.app.result.housedeals;
      for (let i = 0; i < deals.length; i++) {
        if (!this.areaMap[deals[i]["area"]]) {
          this.areaMap[deals[i]["area"]] = [];
          this.areaOrder.push(deals[i]["area"]);
        }
        this.areaMap[deals[i]["area"]].push({
          x: new Date(deals[i].dealYear, deals[i].dealMonth, deals[i].dealDay).getTime(),
          y: deals[i].dealAmount,
        });
      }
      this.areaOrder.sort();
      // console.log(this.areaMap)
      for (let i = 0; i < this.areaOrder.length; i++) {
        this.areaMap[this.areaOrder[i]].sort((a, b) => a.x - b.x);
      }
      // console.log(this.areaMap)

      // for(let i=0;i<deals.length;i++){
      //     if(deals[i].area=="59.98")
      //         console.log(new Date(deals[i].dealYear,deals[i].dealMonth,deals[i].dealDay).getTime(), deals[i].dealAmount)
      // }
    },

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
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 위에 인포윈도우를 표시합니다
            console.log(JSON.parse(marker.getTitle()));
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
        console.log("getcl");
        console.log(this.getClusterer);
        let clusterer = this.getClusterer;
        console.log(clusterer);
        clusterer.addMarkers(markers);
        // this.SET_CLUSTERER(clusterer);
        // this.SET_MARKERS(markers);
      }
    },
    setSeoulMarker() {
      http
        .get(`/map/apt/type?name=서울특별시&type=시`)
        .then((response) => {
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
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, Number(data.lng) - 0.005);
      console.log(this.map);
      this.map.setCenter(moveLatLon);
    },
    //마커---------------------------------------------------------------------------
    changeMarker(type) {
      var coffeeMenu = this.$refs.list[0];
      var storeMenu = this.$refs.list[1];
      var carparkMenu = this.$refs.list[2];

      // 커피숍 카테고리가 클릭됐을 때
      if (type === "coffee") {
        // 커피숍 카테고리를 선택된 스타일로 변경하고
        // coffeeMenu.className = "menu_selected";
        // // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
        // storeMenu.className = "";
        // carparkMenu.className = "";
        // // 커피숍 마커들만 지도에 표시하도록 설정합니다
        this.setCoffeeMarkers(this.map);
        this.setStoreMarkers(null);
        this.setCarparkMarkers(null);
      } else if (type === "store") {
        this.setCoffeeMarkers(null);
        this.setStoreMarkers(this.map);
        this.setCarparkMarkers(null);
      } else if (type === "carpark") {
        this.setCoffeeMarkers(null);
        this.setStoreMarkers(null);
        this.setCarparkMarkers(this.map);
      }
    },
    // changeMarker2(type,idx) {
    //   for(let i=0;i<this.infra.length;++i){
    //     if(i==idx){
    //       this.setMarkers(this.map,idx);
    //     }else{
    //       this.setMarkers(null,idx);
    //     }
    //   }
    // },
    // setMarkers(map,idx){
    //   for(let i=0;i<this.infraMarker[idx].length;++i){
    //     this.infraMarker[idx][i].setMap(map);
    //   }
    // },
    createAllMarker(idx, position, image) {
      infra.forEach((data, idx1) => {
        data.forEach((data2, idx2) => {
          let imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
              spriteOrigin: new kakao.maps.Point(10, 72),
              spriteSize: new kakao.maps.Size(36, 98),
            };
          // 마커이미지와 마커를 생성합니다
          var markerImage = this.createMarkerImage(
              this.items[idx2].icon,
              imageSize,
              imageOptions
            ),
            marker = this.createMarker(this.infra[idx][j], markerImage);

          // 생성된 마커를 주차장 마커 배열에 추가합니다
          this.infraMarker[i].push(marker);
        });
      });
    },
    setCarparkMarkers(map) {
      for (var i = 0; i < this.carparkMarkers.length; i++) {
        this.carparkMarkers[i].setMap(map);
      }
    },
    createCarparkMarkers() {
      var carparkPositions = [
        new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
        new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
        new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
        new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
        new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
        new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
        new kakao.maps.LatLng(37.497680616783086, 127.02518427952202),
      ];
      for (var i = 0; i < carparkPositions.length; i++) {
        var imageSize = new kakao.maps.Size(22, 26),
          imageOptions = {
            spriteOrigin: new kakao.maps.Point(10, 72),
            spriteSize: new kakao.maps.Size(36, 98),
          };

        // 마커이미지와 마커를 생성합니다
        var markerImage = this.createMarkerImage(
            this.items[2].icon,
            imageSize,
            imageOptions
          ),
          marker = this.createMarker(carparkPositions[i], markerImage);

        // 생성된 마커를 주차장 마커 배열에 추가합니다
        this.carparkMarkers.push(marker);
      }
    },
    setStoreMarkers(map) {
      for (var i = 0; i < this.storeMarkers.length; i++) {
        this.storeMarkers[i].setMap(map);
      }
    },
    createStoreMarkers() {
      var storePositions = [
        new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
        new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
        new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
        new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
        new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
        new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
        new kakao.maps.LatLng(37.49996818951873, 127.02943721562295),
      ];
      for (var i = 0; i < storePositions.length; i++) {
        var imageSize = new kakao.maps.Size(22, 26),
          imageOptions = {
            spriteOrigin: new kakao.maps.Point(10, 36),
            spriteSize: new kakao.maps.Size(36, 98),
          };

        // 마커이미지와 마커를 생성합니다
        var markerImage = this.createMarkerImage(
            this.items[1].icon,
            imageSize,
            imageOptions
          ),
          marker = this.createMarker(storePositions[i], markerImage);

        // 생성된 마커를 편의점 마커 배열에 추가합니다
        this.storeMarkers.push(marker);
      }
    },
    setCoffeeMarkers(map) {
      for (var i = 0; i < this.coffeeMarkers.length; i++) {
        this.coffeeMarkers[i].setMap(map);
      }
    },
    createCoffeeMarkers() {
      var coffeePositions = [
        new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
        new kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
        new kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
        new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
        new kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
        new kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
        new kakao.maps.LatLng(37.49754540521486, 127.02546694890695),
      ];
      for (var i = 0; i < coffeePositions.length; i++) {
        var imageSize = new kakao.maps.Size(22, 26),
          imageOptions = {
            spriteOrigin: new kakao.maps.Point(10, 0),
            spriteSize: new kakao.maps.Size(36, 98),
          };

        // 마커이미지와 마커를 생성합니다
        var markerImage = this.createMarkerImage(
            this.items[0].icon,
            imageSize,
            imageOptions
          ),
          marker = this.createMarker(coffeePositions[i], markerImage);

        // 생성된 마커를 커피숍 마커 배열에 추가합니다
        this.coffeeMarkers.push(marker);
      }
    },
    createMarker(position, image) {
      var marker = new kakao.maps.Marker({
        position: position,
        image: image,
      });

      return marker;
    },
    createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png",
        size,
        options
      );
      return markerImage;
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
</style>
