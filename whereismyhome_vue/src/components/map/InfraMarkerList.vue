<template>
  <v-card class="float-right ma-0" style="z-index: 100; background-color: rgba(255, 255, 255, 0)" v-if="isUseCheck">
    <v-btn-toggle multiple v-model="isToggle">
      <v-btn v-for="(item, i) in mapdata.infra.categoryGroupCodes" :key="i" class="ma-0">
        <!-- @click="clickInfraButton(item)" -->
        <v-icon v-text="item.icon"> </v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-card>
</template>

<script>
/* global kakao */
import { apiInstance } from "@/api/http-common"
import { mapState, mapGetters, mapActions, mapMutations } from "vuex"
import axios from "axios"
import img from "@/assets/logo.png"
const mapStore = "mapStore"
const http = apiInstance()

export default {
  namespaced: true,
  name: "InfraMarkerList",
  props: { map: null },

  data() {
    return {
      isToggle: [],
      buttonMapping: ["MT1", "CS2", "PS3", "SC4", "PK6", "OL7", "SW8", "BK9", "FD6", "CE7", "HP8", "PM9"],
    }
  },
  mounted() {
    // this.mapdata.infra=[];
    console.log(this.mapdata.infra)
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
    // this.setChart("45")
    // this.getInfra(this.categoryGroupCodes[0]["Name"])
    // this.getAllInfra()
    // this.calcInfraScore(this.pos)
  },
  watch: {
    async isUseCheck(val) {
      if (val) {
        await this.getAllInfra()
        // await this.clearAllMarker();
        await this.createAllMarker()
      }
    },
    async isToggle(val) {
      console.log(val)
      await this.clickInfraButton(val)
    },
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData", "getClusterer", "getMarkers"]),
    isUseCheck() {
      return this.mapdata.app.result.detail.isUse
    },
    getHouseInfo() {
      return this.mapdata.app.result.detail.houseinfo
    },
  },
  methods: {
    ...mapMutations(mapStore, ["SET_MARKERS", "SET_CLUSTERER"]),
    ...mapActions(mapStore, ["setHouseDetail"]),
    //차트 ------------------------------------------------------------------------------
    async calcInfraScore(pos) {
      // 인프라 가져오기
      await this.getAllInfra()
      let score = 0
      for (let i = 0; i < this.mapdata.infra.categoryGroupCodes.length; i++) {
        let code = this.mapdata.infra.categoryGroupCodes[i]["Name"]
        // 0~1000m, 0m에 가까울수록 고득점
        // console.log(this.infra[code][0])
        if (this.mapdata.infra.data[code].length != 0) {
          score += 1000 - this.infra.data[code][0].distance
        }
        // console.log(this.infra)
      }
      // await 때문에 조금 느림
      console.log(score)
    },
    async getAllInfra() {
      for (let i = 0; i < this.mapdata.infra.categoryGroupCodes.length; i++) {
        let code = this.mapdata.infra.categoryGroupCodes[i]["Name"]
        await this.getInfra(code)
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
          this.mapdata.infra.data[code] = data.documents
          // console.log("get infra");
          // console.log(this.mapdata.infra.data[code]);
          // console.log(this.mapdata.infra.data[code])
        })
    },

    displayMarker(data) {
      //마커 초기화
      let markers = this.getMarkers
      if (markers.length > 0) {
        markers.forEach((marker) => marker.setMap(null))
      }

      if (data.length > 0) {
        markers = []
        data.forEach((d) => {
          let marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(d.lat, d.lng),
            title: JSON.stringify(d),
          })
          markers.push(marker)
          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커 위에 인포윈도우를 표시합니다
            console.log(JSON.parse(marker.getTitle()))
            this.setHouseDetailInfo(JSON.parse(marker.getTitle()))
          })
        })
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
        console.log("getcl")
        console.log(this.getClusterer)
        let clusterer = this.getClusterer
        console.log(clusterer)
        clusterer.addMarkers(markers)
        // this.SET_CLUSTERER(clusterer);
        // this.SET_MARKERS(markers);
      }
    },
    setSeoulMarker() {
      http
        .get(`/map/apt/type?name=서울특별시&type=시`)
        .then((response) => {
          this.SET_MARKERS(this.displayMarker(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setHouseDetailInfo(house) {
      // console.log("setHouseDetail st");
      // console.log(house);
      this.setHouseDetail(house)
      this.moveMapLocation(house)
    },
    moveMapLocation(data) {
      var moveLatLon = new kakao.maps.LatLng(data.lat, Number(data.lng) - 0.005)
      console.log(this.map)
      this.map.setCenter(moveLatLon)
    },
    //마커---------------------------------------------------------------------------
    // changeMarker(type) {
    //   var coffeeMenu = this.$refs.list[0];
    //   var storeMenu = this.$refs.list[1];
    //   var carparkMenu = this.$refs.list[2];

    //   // 커피숍 카테고리가 클릭됐을 때
    //   if (type === "coffee") {
    //     // 커피숍 카테고리를 선택된 스타일로 변경하고
    //     // coffeeMenu.className = "menu_selected";
    //     // // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
    //     // storeMenu.className = "";
    //     // carparkMenu.className = "";
    //     // // 커피숍 마커들만 지도에 표시하도록 설정합니다
    //     this.setCoffeeMarkers(this.map);
    //     this.setStoreMarkers(null);
    //     this.setCarparkMarkers(null);
    //   } else if (type === "store") {
    //     this.setCoffeeMarkers(null);
    //     this.setStoreMarkers(this.map);
    //     this.setCarparkMarkers(null);
    //   } else if (type === "carpark") {
    //     this.setCoffeeMarkers(null);
    //     this.setStoreMarkers(null);
    //     this.setCarparkMarkers(this.map);
    //   }
    // },
    // setMarkers(map,idx){
    //   for(let i=0;i<this.infraMarker[idx].length;++i){
    //     this.infraMarker[idx][i].setMap(map);
    //   }
    // },
    clearAllMarker() {
      console.log("cls all marker")
      if (this.mapdata.infra.markers == null || this.mapdata.infra.markers == undefined) return
      this.mapdata.infra.markers.forEach((list) => {
        if (list == null || list == undefined) return
        list.forEach((data) => {
          data.setMap(null)
        })
        list = []
      })
    },
    createAllMarker() {
      console.log("insert all marker")
      // let imageSize = new kakao.maps.Size(22, 26);
      // let imageOptions = {
      //   spriteOrigin: new kakao.maps.Point(10, 72),
      //   spriteSize: new kakao.maps.Size(36, 98),
      // };
      for (let i = 0; i < this.buttonMapping.length; ++i) {
        // it.forEach((data)=>{console.log(data)})
        let markers = []
        this.mapdata.infra.data[this.buttonMapping[i]].forEach((info) => {
          // var markerImage = this.createMarkerImage(
          //   img,
          //   imageSize,
          //   imageOptions
          // );
          let position = new kakao.maps.LatLng(info.y, info.x)
          // let marker = this.createMarker(position, markerImage);
          let marker = this.createMarker(position)

          markers.push(marker)
        })
        this.mapdata.infra.markers[this.buttonMapping[i]] = markers
      }
      console.log("insert all marker done")
    },
    changeMarker(type, flg) {
      // console.log("ch marker");
      // console.log(type, flg);
      var val = null
      if (flg == 1) val = this.map
      console.log(this.mapdata.infra.markers)
      this.mapdata.infra.markers[type].forEach((marker) => {
        marker.setMap(val)
      })

      // console.log("ch marker");
      // console.log(type, flg);
      // let val = null;
      // if (flg) val = this.map;
      // console.log(this.mapdata.infra.markers[type])
      // this.mapdata.infra.markers[type].forEach((marker) => {
      //   marker.setMap(val);
      // });
    },
    createMarker(position) {
      // console.log(position);
      let marker = new kakao.maps.Marker({
        position: position,
      })
      return marker
    },
    createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(img, size, options)
      return markerImage
    },
    clickInfraButton(item) {
      console.log("infra btn")
      let flgList = []
      for (let i = 0; i < this.buttonMapping.length; ++i) {
        flgList.push(0)
      }
      item.forEach((data) => {
        flgList[data] = 1
      })

      for (let i = 0; i < this.buttonMapping.length; ++i) {
        console.log(this.buttonMapping[i])
        console.log(flgList[i])
        this.changeMarker(this.buttonMapping[i], flgList[i])
      }
      // let type = item.Name;
      // let icon = item.icon;
      // if (
      //   this.mapdata.infra.markers[type] == null ||
      //   this.mapdata.infra.markers[type] == undefined
      // )
      //   return;

      // let flg = false;
      //   console.log( this.isToggle);
      // //해당 idx의 버튼이 눌렸는지 확인
      // // this.isToggle.forEach((data) => {
      // //   if (type == this.buttonMapping[data]) flg = true;
      // // });
      // //flg==true setmap(map)
      // //flg==false setmap(null);
      // this.mapdata.infra.data[type].forEach(() => {
      //   //마커 표시
      //   // console.log(data);
      //   // this.changeMarker(type, flg);
      // });
    },
  },
}
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
