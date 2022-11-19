<template>
    <!-- seacrh -->
    <v-container class ="overflow-visible">
    <v-row class="pa-3">
      <v-col cols="10" v-click-outside="onClickOutside">
        <v-text-field
            v-model="inputMsg"
            filled
            outlined
            dense
            @focus="autoSearchList = true"
            @click.enter="searchByAptCode"
            style='z-index:10; opacity: 1;'
        >
        </v-text-field>
        <transition name="top-slide" mode="in-out">
          <div class="justify-center align-center flex-column d-flex" >
            <v-list class="pa-0 ma-0 search-list" v-show="autoSearchList" light>
              <v-list-item-group>
                <!-- // 마우스 오버 시 효과를 주기위한 v-hover -->
                <v-hover v-slot="{ hover }"
                        v-for="(item,index) in completeData"
                        :key="index" 
                >   
                  <!-- // 자동완성 결과값들의 리스트 -->
                  <v-list-item
                      class="pa-3 pl-5 top-list"
                      :class="{ 'on-hover': hover }"
                      @click="inputMsg=item"
                      
                  >                      
                    <!-- <v-list-item-content class="pl-8"> -->
                      <!-- <v-list-item-title> -->
                        <span class="search-list-title" @click="detailView(item.bid)"> {{item}} </span>
                      <!-- </v-list-item-title> -->
                      <!-- <v-list-item-subtitle class="pt-2">
                        <span class="search-list-subtitle"> {{ item }} | {{item}}</span>
                      </v-list-item-subtitle> -->
                    <!-- </v-list-item-content> -->
                  </v-list-item>
                </v-hover>
              </v-list-item-group>
            </v-list>
          </div>
        </transition>
      </v-col>
      <v-col cols="1" >
        <v-btn icon @click="searchByAptCode">
        <v-icon size="30">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    
  </v-container>
  </template>
  
  <script>
  import vClickOutside from 'v-click-outside'
  import { apiInstance } from "@/api/http-common";

  const http = apiInstance();
  export default {
    name: "AppSearch",
    data() {
      return {
        item:[],
        inputMsg:"",
        autoSearchList:false,
        completeData:[],
      };
    },
    mounted() {
    },
    watch: {
      inputMsg(val) {
        if (!val) {
          this.completeData=[]
        }
        this.fetchEntriesDebounced()
      },
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
    methods: {
      //DB에 불필요한 데이터 입력 방지위해 입력 기다리기
      fetchEntriesDebounced() {
        this.completeData = null;
      
        clearTimeout(this._timerId);
        // 0.5초 동안 동작이 없으면 completeSearch 함수 호출
        this._timerId = setTimeout(() => {
          // maybe : this.fetch_data()
          this.completeSearch()
        }, 500);
      },
      
      //자동완성 기능
      completeSearch(){
        let str = this.inputMsg
        str = str.trim()                                             //양끝 공백 제거
        str = str.replace(/\s/g,'+')            //스페이스바 +로 치환
        const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|+]/.test(str);         //특문검사 정규식
        if(!reg && str !== ""){
            http.get(`/map/searchlist?inputmsg=${str}`)
              .then(response => {
                console.log("search s");
                this.completeData = response.data
                console.log(this.completeData);
              }).catch(error => {
            console.log(error.response);
          })
        }
      },
      //자동검색 리스트에서 바깥부분 클릭시 리스트 닫음
      onClickOutside () {
        this.autoSearchList = false
      },
      //검색 버튼
      searchByAptCode(){
        http.get(`/map/deal?aptCode=${this.inputMsg}`)
              .then(response => {
                this.item = response.data
            console.log("s");
            console.log(response);
              }).catch(error => {
            console.log("e");
            console.log(error);
            });
        },
    },
  };
  </script>
  
  <style scoped>
  </style>