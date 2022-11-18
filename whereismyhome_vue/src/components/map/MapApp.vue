<template>
  <div>
    <div id="map" class="pa-5" style="width: 100%; height: 800px">
      <v-card
        elevation="15"
        width="30%"
        height="100%"
        style='z-index:2; opacity: 0.8;'
      >
        <!-- seacrh -->
        <app-search></app-search>
        <!-- result -->
        <app-result></app-result>
      </v-card>
    </div>

    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(1200)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
  </div>
</template>

<script>
import AppResult from './AppResult.vue';
import AppSearch from './AppSearch.vue';


import { apiInstance } from "@/api/http-common";

const http = apiInstance();

export default {
  components: { AppResult, AppSearch },
  name: "MapApp",
  data() {
    return {

        map:{
            app : {
                search : {
                    // 서치리스트에서 클릭할 경우 typename을 기반으로 확대 레벨별 클러스터링 또는 houseinfo 검색
                    types : {}
                },
                result : {
                    // 전체 데이터
                    // dongcodes:[],
                    dongcode:{},
                    // 타입이 houseinfo 검색일 경우 houseinfo 데이터가 들어감
                    houseinfos:[],
                    // houseinfo 기준 거래내역
                    housedeals:[]
                }
            },
            infra : {}
        },

      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
      infowindow: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      this.setMarker();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
      this.setMarker();
    }
  },
  created() {
    // this.getHouseInfos("1111010100"),
    this.getHouseDeals("45")
  },
  methods: {
    getHouseInfos(dongcode){
        http.get(`/map/apt?dong=${dongcode}`).then(({ data }) => {
            this.map.app.result.houseinfos = data
            console.log(data)
        });
    },
    getHouseDeals(aptCode){
        http.get(`/map/deal?aptCode=${aptCode}`).then(({ data }) => {
            this.map.app.result.housedeals = data
            console.log(data)
        });
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.height = `800px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
    //   setMarker() {
    //     // 지도에 마커를 표시합니다
    //     var marker = new kakao.maps.Marker({
    //       map: map,
    //       position: new kakao.maps.LatLng(33.450701, 126.570667),
    //     });

    //     // 커스텀 오버레이에 표시할 컨텐츠 입니다
    //     // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    //     // 별도의 이벤트 메소드를 제공하지 않습니다
    //     var content =
    //       '<div class="wrap">' +
    //       '    <div class="info">' +
    //       '        <div class="title">' +
    //       "            카카오 스페이스닷원" +
    //       '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    //       "        </div>" +
    //       '        <div class="body">' +
    //       '            <div class="img">' +
    //       '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
    //       "           </div>" +
    //       '            <div class="desc">' +
    //       '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
    //       '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
    //       '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
    //       "            </div>" +
    //       "        </div>" +
    //       "    </div>" +
    //       "</div>";

    //     // 마커 위에 커스텀오버레이를 표시합니다
    //     // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    //     var overlay = new kakao.maps.CustomOverlay({
    //       content: content,
    //       map: map,
    //       position: marker.getPosition(),
    //     });

    //     // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    //     kakao.maps.event.addListener(marker, "click", function () {
    //       overlay.setMap(map);
    //     });
    //   },
    //   // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
    //   closeOverlay() {
    //     overlay.setMap(null);
    //   },
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
