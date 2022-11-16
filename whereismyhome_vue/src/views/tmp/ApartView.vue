<template>
  <div>
  <h2>아파트 목록</h2>

  <div id="app">
  <v-app id="inspire">
    <v-container fluid>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-select
            :items="sido"
            item-text="name"
            item-value="code"
            label="시도선택"
            dense
            outlined
            v-model="sidocode"
            @change="changeSido()"
          ></v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-select
            :items="gugun"
            item-text="name"
            item-value="code"
            label="구군선택"
            dense
            outlined
            v-model="guguncode"
            @change="changeGugun()"
          ></v-select>
        </v-col>
                <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-select
            :items="dong"
            label="동선택"
            dense
            outlined
          ></v-select>
        </v-col>
                <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-select
            :items="items"
            label="매매년도선택"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="2"
        >
          <v-select
            :items="items"
            label="매매월선택"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</div>



    <!-- <input type="number" v-model="lawdCd" />
    <input type="number" v-model="dealYmd" />
    <button @click="getAptList">아파트목록얻기</button>
    <table>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 30%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 30%" />
      </colgroup>
      <tr>
        <td>일련번호</td>
        <td>아파트명</td>
        <td>법정동</td>
        <td>층</td>
        <td>매매가격</td>
      </tr>
      <tbody>
        <apt-list-item v-for="(apt, index) in apts" :key="index" :apt="apt"></apt-list-item>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import axios from "axios";
import AptListItem from "@/components/AptListItem.vue";

export default {
  name: "AptView",
  components: {
    AptListItem,
  },
  created(){
    this.sendRequest("sido", "*00000000");
  },
  data() {
    return {
      lawdCd: "",
      dealYmd: "",
      sidocode:"",
      guguncode:"",
      dongcode:"",
      apts: [],
      sido:[],
      gugun:[],
      dong:[],
      items:[],
      citymap:{
        "sido":this.sido,
        "gugun":this.gugun,
        "dong":this.dong,
      }
    };
  },
  methods: {
    sendRequest(selid, regcode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      let params = "regcode_pattern=" + regcode + "&is_ignore_zero=true";
      axios
      .get(`${url}?${params}`)
      .then(({data}) => {
        this.citymap[selid] = data.regcodes;
        });
    },

    getAptList() {
      // const serviceKey =
      //   "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
      // const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&LAWD_CD=${this.lawdCd}&DEAL_YMD=${this.dealYmd}`;
      const url = `http://localhost:9999/vue/map/aptlist/${this.lawdCd}/${this.dealYmd}`;
      axios.get(url).then((response) => (this.apts = response.data.response.body.items.item));
    },
    changeSido(){
      if (this.sidocode) {
        let regcode = this.sido.substr(0, 2) + "*00000";
        this.sendRequest("gugun", regcode);
      } else {
        // initOption("gugun");
        // initOption("dong");
      }
    },
    changeGugun(){
      console.log("--------");
      console.log(this.guguncode);
    if (this.guguncode) {
        let regcode = this.guguncode.substr(0, 5) + "*";
        this.sendRequest("dong", regcode);
      } else {
        // initOption("dong");
      }
    },

  },
};
</script>
