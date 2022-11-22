<template>
  <div style="width: 100%">
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
import { Radar as RadarChartGen } from "vue-chartjs"
import { mapState, mapActions, mapMutations, mapGetters } from "vuex"
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
} from "chart.js"

const mapStore = "mapStore"

ChartJS2.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, RadialLinearScale)
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
  methods: {
    ...mapMutations(mapStore, ["SET_ISTOGGLE"]),
    changeInfra() {
      console.log(this.isToggle)
      //   console.log(this.mapdata.infra)
      //   this.mapdata.infra.data[this.buttonMapping[i]]
    },
  },
  computed: {
    ...mapState(mapStore, ["mapdata", "isToggle"]),
    ...mapGetters(mapStore, ["GetIsToggle"]),
  },
  created() {
    console.log(this.isToggle)
    this.infra = this.mapdata.infra
  },
  mounted() {
    this.changeInfra()
  },
  watch: {},
  data() {
    return {
      infra: {},
      chartData: {
        labels: [
          1432220400000, 1443625200000, 1474038000000, 1471618800000, 1463756400000, 1486911600000, 1511622000000,
          1536591600000, 1556895600000, 1572015600000, 1594825200000, 1601218800000, 1633618800000, 1632754800000,
        ],
        datasets: [
          {
            xAxisID: "x",
            label: "Data One",
            backgroundColor: "#f87979",

            data: [33000, 37400, 39800, 38400, 38400, 38000, 44000, 54500, 53000, 53800, 62000, 68250, 83000, 83500],
            fill: false,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        position: "relative",
      },
    }
  },
  actions: {
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
}
</script>
