<template>
  <div style="width: 100%">
    <p class="pt-5 px-5 mb-0 grey--text float-center" style="font-size: 1px">
      점수 : 1000 - 가장 가까운 인프라의 거리(단위 : m)
    </p>
    <RadarChartGen
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Radar as RadarChartGen } from "vue-chartjs";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {
  Chart as ChartJS2,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  RadialLinearScale,
} from "chart.js";

const mapStore = "mapStore";

ChartJS2.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  RadialLinearScale
);
export default {
  namespaced: true,
  name: "RadarChart",
  components: { RadarChartGen },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapState(mapStore, ["mapdata", "isToggle"]),
    ...mapGetters(mapStore, ["getIsToggle"]),
    getIsToggle(val) {
      console.log("rader toggle");
      console.log(val);
      return this.$store.getters["getIsToggle"];
    },
  },
  created() {
    this.infra = this.mapdata.infra;
  },
  mounted() {
    this.changeInfra();
  },
  methods: {
    ...mapMutations(mapStore, ["SET_ISTOGGLE"]),
    changeInfra() {
      console.log("rader toggle");
      console.log(this.isToggle);
      //   console.log(this.mapdata.infra)
      //   this.mapdata.infra.data[this.buttonMapping[i]]
    },
    calcInfraScore(val) {
      // 인프라 가져오기
      let totalScore = 0;
      let categoryMap = this.infra.categoryGroupCodes;

      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];

      for (let i = 0; i < val.length; i++) {
        let order = val[i];
        let code = this.buttonMapping[order];
        let datas = this.mapdata.infra.data[code];
        // console.log("this.mapdata.infra.data[code]",
        // this.mapdata.infra.data[code])
        // console.log("code", code)

        // 0~1000m, 0m에 가까울수록 고득점
        // console.log(this.infra[code][0])
        if (datas.length != 0) {
          let score = 1000 - datas[0].distance;
          totalScore += score;

          // 삼각형부터 구분 가능
          if (val.length >= 3) {
            this.chartData.labels.push(categoryMap[order].Description);
            this.chartData.datasets[0].data.push(score);
          }
        }
        // console.log("totalScore",totalScore);
        // console.log("avgScore",totalScore/val.length)
        // console.log("data",datas.length,this.chartData.datasets[0].data)

        this.avgScore = Math.round(totalScore / val.length);
        this.chartData.datasets[0].label = "avg : " + this.avgScore;
      }
    },
  },
  watch: {
    isToggle(val) {
      console.log("rader toggle watch2");
      console.log(val);

      console.log(this.chartData.labels);
      console.log(this.chartData.datasets[0].data);
      this.calcInfraScore(val);
      //   console.log(this.mapdata.infra.data)
      //   console.log(this.buttonMapping)

      //   for(let v in val){
      //     if (this.mapdata.infra.data[this.buttonMapping[val[v]]].length != 0) {
      //       score += 1000 - this.mapdata.infra.data[this.buttonMapping[val[v]]].distance
      //     }
      //   }
    },
    // getIsToggle: {
    //   // This will let Vue know to look inside the array
    //   deep: true,

    //   // We have to move our method to a handler field
    //   handler(){
    //     console.log('The list of colours has changed!');
    //   }

    // },
    // isToggle: {
    //   // This will let Vue know to look inside the array
    //   deep: true,

    //   // We have to move our method to a handler field
    //   handler(){
    //     console.log('The list of colours has changed!');
    //   }
  },
  data() {
    return {
      avgScore: 0,
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
      infra: {},
      chartData: {
        labels: [],
        datasets: [
          {
            xAxisID: "x",
            label: "avg",
            backgroundColor: "#f87979",

            data: [],
            fill: false,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        position: "relative",
        scale: {
          r: {
            suggestedMin: 200,
            suggestedMax: 200,
            max: 1000,
            min: 0,
            ticks: {
              stepSize: 200,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.formattedValue;
              },
            },
          },
        },
      },
    };
  },
  actions: {
    // async getAllInfra() {
    //   for (let i = 0; i < this.categoryGroupCodes.length; i++) {
    //     let code = this.categoryGroupCodes[i]["Name"];
    //     await this.getInfra(code);
    //   }
    //   //  console.log(this.infra)
    // },
    // // async getInfra(code) {
    // //   // console.log(code)
    // //   await axios
    // //     .get(
    // //       `https://dapi.kakao.com/v2/local/search/category.json?x=${this.pos[1]}&y=${this.pos[0]}&radius=1000&category_group_code=${code}&sort=distance`,
    // //       { headers: { Authorization: "KakaoAK eabef36bdbe62ae96579c8dc428e0a1f" } }
    // //     )
    // //     .then(({ data }) => {
    // //       // this.map.app.result.housedeals = data
    // //       this.infra[code] = data.documents;
    // //       // console.log(this.infra[code])
    // //     });
    // // },
    // getHouseInfos(dongcode) {
    //   http.get(`/map/apt?dong=${dongcode}`).then(({ data }) => {
    //     this.map.app.result.houseinfos = data;
    //     console.log(data);
    //   });
    // },
    // async getHouseDeals(aptCode) {
    //   await http.get(`/map/deal?aptCode=${aptCode}`).then(({ data }) => {
    //     this.map.app.result.housedeals = data;
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
    //   let deals = this.map.app.result.housedeals;
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
  },
};
</script>
