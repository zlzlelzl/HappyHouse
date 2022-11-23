<template>
  <!-- seacrh -->
  <v-container class="">
    <v-row class="pa-3" style="height: 85vh">
      <v-col cols="10" v-click-outside="onClickOutside">
        <v-text-field
          v-model="inputMsg"
          filled
          outlined
          dense
          @focus="autoSearchList = true"
          style="z-index: 10; opacity: 1"
          @keyup.enter="insertSearchBar"
          ref="searchBar"
          @keydown.up="movePreSearchList(-1)"
          @keydown.down="moveNextSearchList(-1)"
        >
        </v-text-field>
        <transition name="top-slide" mode="in-out">
          <div class="align-center flex-column d-flex" style="height: 50vmin">
            <v-list
              outlined
              style="z-index: 21; width: 100%"
              class="pa-0 ma-0 search-list overflow-y-auto"
              v-show="autoSearchList"
              light
            >
              <v-list-item-group>
                <!-- // 마우스 오버 시 효과를 주기위한 v-hover -->
                <v-hover v-slot="{ hover }" v-for="(item, index) in completeData" :key="index" ref="test">
                  <!-- // 자동완성 결과값들의 리스트 -->
                  <v-list-item
                    class="pa-3 pl-5"
                    :class="{ 'on-hover': hover }"
                    @click="searchByTypeClick(item)"
                    @keydown.up="movePreSearchList(index)"
                    @keydown.down="moveNextSearchList(index)"
                  >
                    <v-list-item-content class="">
                      <v-list-item-title>
                        <span class="search-list-title"> {{ item.name }} </span>
                      </v-list-item-title>
                      <v-list-item-subtitle class="pt-2">
                        <span class="search-list-subtitle"> {{ item.type }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-hover>
              </v-list-item-group>
            </v-list>
          </div>
        </transition>
      </v-col>
      <v-col cols="1">
        <v-btn icon @click="insertSearchBar">
          <v-icon size="30">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vClickOutside from "v-click-outside"
import { apiInstance } from "@/api/http-common"
import { mapState, mapActions, mapMutations, mapGetters } from "vuex"
import axios from "axios"

const mapStore = "mapStore"
const http = apiInstance()
export default {
  name: "AppSearch",
  data() {
    return {
      item: [],
      inputMsg: "",
      inputType: "",
      autoSearchList: false,
      completeData: null,
    }
  },
  props: {
    map: {},
  },
  mounted() {},
  watch: {
    inputMsg(val) {
      if (!val) {
        this.completeData = []
      }
      this.autoSearchList = true
      this.fetchEntriesDebounced()
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
    ...mapGetters(mapStore, ["getMapData"]),
  },
  methods: {
    ...mapActions(mapStore, ["searchByType"]),
    //DB에 불필요한 데이터 입력 방지위해 입력 기다리기
    fetchEntriesDebounced() {
      this.completeData = null
      clearTimeout(this._timerId)
      // 0.5초 동안 동작이 없으면 completeSearch 함수 호출
      this._timerId = setTimeout(() => {
        // maybe : this.fetch_data()
        this.completeSearch()
      }, 500)
    },

    //자동완성 기능
    completeSearch() {
      let str = this.inputMsg
      str = str.trim() //양끝 공백 제거
      str = str.replace(/\s/g, "+") //스페이스바 +로 치환
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|+]/.test(str) //특문검사 정규식
      if (!reg && str !== "") {
        http
          .get(`/map/searchlist?inputmsg=${str}`)
          .then((response) => {
            console.log("search s")
            this.completeData = response.data
            console.log(this.completeData)
          })
          .catch((error) => {
            console.log(error.response)
          })
      }
    },
    //자동검색 리스트에서 바깥부분 클릭시 리스트 닫음
    onClickOutside() {
      this.autoSearchList = false
    },
    // moveNextSearchList(idx){
    //   if(!this.completeData)return;
    //   else if(this.completeData.length>idx+1){
    //     //다음 리스트로 포커스 이동
    //       console.log("nextmove - "+(idx+1));
    //       console.log(this.$refs);
    //     this.$refs.test[(idx+1)].focus;
    //   }
    // },
    // movePreSearchList(idx){
    //   if(!this.completeData)return;
    //   else if(idx==-1){
    //     //첫번째 리스트로 포커스 이동
    //       console.log("nextmove - last");
    //     this.$refs.test[0].focus;
    //   }
    //   else if(idx>0){
    //     //이전 리스트로 포커스 이동
    //       console.log("nextmove - "+(idx-1));
    //     this.$refs.test[(idx-1)].focus;
    //   }
    // },
    //검색 버튼
    // searchByType(){
    //   http
    //     .get(`/map/apt/type?name=${this.inputMsg}&type=${this.inputType}`)
    //     .then(response => {
    //       console.log("s");
    //       this.SET_HOUSE_LIST(response.data);
    //       this.autoSearchList=false;
    //       console.log(this.houses);
    //     })
    //     .catch(error => {
    //       console.log("e");
    //       console.log(error);
    //     });
    // },
    insertSearchBar() {
      if (this.completeData != null) {
        this.inputMsg = this.completeData[0].name
        this.inputType = this.completeData[0].type
        this.searchByType({ name: this.inputMsg, type: this.inputType })
      }
    },
    searchByTypeClick(item) {
      this.inputMsg = item.name
      this.inputType = item.type

      console.log("itemitem", item)
      axios
        .get(`https://dapi.kakao.com/v2/local/search/address.json?query=${item.query}`, {
          headers: {
            Authorization: "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f",
          },
        })
        .then(({ data }) => {
          this.map.setLevel(item.maxlevel, { animate: true })

          console.log("ddd", data)
          if (data.documents.length >= 1) {
            this.map.panTo(new kakao.maps.LatLng(data.documents[0].y, data.documents[0].x))
          }
        })

      this.searchByType({ name: this.inputMsg, type: this.inputType })
    },
  },
}
</script>

<style scoped></style>
