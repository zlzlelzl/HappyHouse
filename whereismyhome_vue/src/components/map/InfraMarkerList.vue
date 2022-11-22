<template>
  <v-card
    class="float-right ma-0"
    style="z-index: 100; background-color: rgba(255, 255, 255, 0)"
    v-if="isUseCheck"
  >
    <v-btn-toggle multiple v-model="isToggle">
      <v-btn v-for="(item, i) in mapdata.infra.categoryGroupCodes" :key="i" class="ma-0">
        <!-- @click="clickInfraButton(item)" -->
        <v-icon v-text="item.icon"> </v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-card>
</template>

<script>
import { apiInstance } from "@/api/http-common";
import { mapState, mapGetters, mapActions, mapMutations, Store } from "vuex";
import axios from "axios";
import mdistore from "@/assets/map/store.png";
import mdistore24 from "@/assets/map/store-24-hour.png";
import mdicradle from "@/assets/map/cradle.png";
import mdischool from "@/assets/map/school.png";
import mdiparking from "@/assets/map/parking.png";
import mdigasStation from "@/assets/map/gas-station.png";
import mdisubway from "@/assets/map/subway-variant.png";
import mdibank from "@/assets/map/bank.png";
import mdiSFK from "@/assets/map/silverware-fork-knife.png";
import mdicoffee from "@/assets/map/coffee.png";
import mdihospital from "@/assets/map/hospital-box.png";
import mdipill from "@/assets/map/pill.png";
import store from "@/store";

const mapStore = "mapStore";
const http = apiInstance();

export default {
  namespaced: true,
  name: "InfraMarkerList",
  props: { map: null },

  data() {
    return {
      // isToggle: [],
      buttonMapping: [
        "MT1",
        "CS2",
        "PS3",
        "SC4",
        "PK6",
        "OL7",
        "SW8",
        "BK9",
        "FD6",
        "CE7",
        "HP8",
        "PM9",
      ],
    };
  },
  mounted() {
    // this.mapdata.infra=[];
    // console.log(this.mapdata.infra);
  },

  updated() {},
  created() {
    // this.getHouseInfos("1111010100"),
    // this.getHouseDeals("45")
    // this.setChartData("45")
    // this.setChart("45")
    // this.getInfra(this.categoryGroupCodes[0]["Name"])
    // this.getAllInfra()
    // this.calcInfraScore(this.pos)
  },
  watch: {
    async isUseCheck(val) {
      if (val) {
        await this.getAllInfra();
        // await this.clearAllMarker();
        await this.createAllMarker();
      } else {
        //모든마커초기화
        this.clearAllMarker();
        //버튼 토글값 초기화
        // this.isToggle = [];
      }
    },
    // isToggle(val) {
    //   console.log("get11");
    //   console.log(this.isToggle);
    //   this.clickInfraButton(val);
    // },
    // isToggle: {
    //   // This will let Vue know to look inside the array
    //   deep: true,

    //   // We have to move our method to a handler field
    //   handler(val){
    //   console.log("get11");
    //   console.log(this.isToggle);
    //   this.clickInfraButton(val);
    //   }
    
    // }
  },
  computed: {
    ...mapState(mapStore, ["mapdata", "isToggle"]),
    ...mapGetters(mapStore, ["getMapData", "getClusterer", "getMarkers", "getIsToggle"]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse;
    },
    getHouseInfo() {
      return this.mapdata.app.result.detail.houseinfo;
    },

    isToggle: {
      get() {
        // console.log(this.isToggle);
        if(this.$store.state.isToggle==undefined ||this.$store.state.isToggle==null){
          this.$store.state.isToggle= [];
        }
        return this.$store.state.isToggle;
      },
      set(isToggle) {
        console.log(isToggle);
        // let storeData=this.$store.state.isToggle;
        
        // console.log(storeData);
        // console.log(isToggle.length);
        // if(storeData.length>isToggle.length){
        // console.log("del");
        //   this.$delete(storeData,storeData.length-1);
        // }else{
        // console.log("set");
        //   this.$set(storeData,storeData.length,isToggle[isToggle.length-1]);
        // }
        this.SET_ISTOGGLE(isToggle);
        // this.$store.state.isToggle=isToggle;
        this.clickInfraButton(isToggle);
      },
    },
  },
  methods: {
    ...mapMutations(mapStore, ["SET_MARKERS", "SET_CLUSTERER", "SET_ISTOGGLE"]),
    ...mapActions(mapStore, ["setHouseDetail"]),
    //차트 ------------------------------------------------------------------------------
    async calcInfraScore(pos) {
      // 인프라 가져오기
      await this.getAllInfra();
      let score = 0;
      for (let i = 0; i < this.mapdata.infra.categoryGroupCodes.length; i++) {
        let code = this.mapdata.infra.categoryGroupCodes[i]["Name"];
        // 0~1000m, 0m에 가까울수록 고득점
        // console.log(this.infra[code][0])
        if (this.mapdata.infra.data[code].length != 0) {
          score += 1000 - this.infra.data[code][0].distance;
        }
        // console.log(this.infra)
      }
      // await 때문에 조금 느림
      console.log(score);
    },
    async getAllInfra() {
      for (let i = 0; i < this.mapdata.infra.categoryGroupCodes.length; i++) {
        let code = this.mapdata.infra.categoryGroupCodes[i]["Name"];
        await this.getInfra(code);
      }

      //  console.log(this.infra)
    },
    async getInfra(code) {
      // console.log("giet infra")
      // console.log(this.mapdata.app.result.detail.houseinfo.lat+ " "+this.mapdata.app.result.detail.houseinfo.lng)
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/search/category.json?x=${this.mapdata.app.result.detail.houseinfo.lng}&y=${this.mapdata.app.result.detail.houseinfo.lat}&radius=1000&category_group_code=${code}&sort=distance`,
          {
            headers: {
              Authorization: "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f",
            },
          }
        )
        .then(({ data }) => {
          // this.map.app.result.housedeals = data
          // console.log(this.mapdata.infra.data[code]);
          this.mapdata.infra.data[code] = data.documents;
          // console.log("get infra");
          // console.log(this.mapdata.infra.data[code]);
          // console.log(this.mapdata.infra.data[code])
        });
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
      this.setHouseDetail(house);
      this.moveMapLocation(house);
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, Number(data.lng) - 0.005);
      console.log(this.map);
      this.map.setCenter(moveLatLon);
    },
    //마커---------------------------------------------------------------------------
    clearAllMarker() {
      console.log("cls all marker");
      if (this.mapdata.infra.markers == null || this.mapdata.infra.markers == undefined) {
        console.log("cls all marker ret");
        return;
      }
      console.log(this.mapdata.infra.markers);

      for (let i = 0; i < this.buttonMapping.length; ++i) {
        this.mapdata.infra.markers[this.buttonMapping[i]].forEach((data) => {
          // if (list == null || list == undefined) return;
          // list.forEach((data) => {
          data.setMap(null);
          // });
          // list = [];
        });
        this.mapdata.infra.markers[this.buttonMapping[i]] = [];
      }
      // this.mapdata.infra.markers.forEach((list) => {
      //   if (list == null || list == undefined) return;
      //   list.forEach((data) => {
      //     console.log("cls all marker st");
      //     data.setMap(null);
      //   });
      //   list = [];
      // });
    },
    createAllMarker() {
      console.log("insert all marker");
      let imageSize = new kakao.maps.Size(22, 26);
      let imageOptions = {
        // spriteOrigin: new kakao.maps.Point(10, 72),
        // spriteSize: new kakao.maps.Size(36, 98),
      };
      for (let i = 0; i < this.buttonMapping.length; ++i) {
        let markers = [];

        this.mapdata.infra.data[this.buttonMapping[i]].forEach((info) => {
          var markerImage = this.createMarkerImage(
            this.getImageSrc(info.category_group_code),
            imageSize,
            imageOptions
          );
          let title = JSON.stringify(info);
          let position = new kakao.maps.LatLng(info.y, info.x);
          let marker = this.createMarker(position, markerImage);
          // let overlay = this.createOverlay(this.createInfoWindowContent(title), marker);
          let infoWindow = this.createInfoWindow(this.createInfoWindowContent(title));
          this.setMouseEvent(infoWindow, marker);
          markers.push(marker);
        });
        this.mapdata.infra.markers[this.buttonMapping[i]] = markers;
      }
      console.log("insert all marker done");
    },
    changeMarker(type, flg) {
      var val = null;
      if (flg == 1) val = this.map;
      this.mapdata.infra.markers[type].forEach((marker) => {
        marker.setMap(val);
      });
    },
    createMarker(position, markerImage, title) {
      let marker = new kakao.maps.Marker({
        position: position,
        title: title,
        image: markerImage,
      });
      return marker;
    },

    createInfoWindow(content) {
      let infowindow = new kakao.maps.InfoWindow({
        content: content,
      });
      return infowindow;
    },
    createInfoWindowContent(input) {
      input = JSON.parse(input);
      // console.log(input);
      let ret =
        '<div style="padding:5px; width:100%;">' +
        input.place_name +
        "&nbsp &nbsp </div>";
      return ret;
    },
    setMouseEvent(infowindow, marker) {
      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(this.map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });
      // kakao.maps.event.addListener(marker, "mouseover", function () {
      //   infowindow.open(map, marker);
      // });
      // kakao.maps.event.addListener(marker, "mouseout", function () {
      //   infowindow.close();
      // });
    },
    closeOverlay(a) {
      a.setMap(null);
    },
    createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;
    },
    clickInfraButton(item) {
      // console.log("item");
      // console.log(item);
      let flgList = [];
      for (let i = 0; i < this.buttonMapping.length; ++i) {
        flgList.push(0);
      }
      item.forEach((data) => {
        flgList[data] = 1;
      });

      for (let i = 0; i < this.buttonMapping.length; ++i) {
        this.changeMarker(this.buttonMapping[i], flgList[i]);
      }
    },
    getImageSrc(input) {
      switch (input) {
        case "MT1":
          return mdistore;
        case "CS2":
          return mdistore24;
        case "PS3":
          return mdicradle;
        case "SC4":
          return mdischool;
        case "PK6":
          return mdiparking;
        case "OL7":
          return mdigasStation;
        case "SW8":
          return mdisubway;
        case "BK9":
          return mdibank;
        case "FD6":
          return mdiSFK;
        case "CE7":
          return mdicoffee;
        case "HP8":
          return mdihospital;
        case "PM9":
          return mdipill;
      }
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

.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
