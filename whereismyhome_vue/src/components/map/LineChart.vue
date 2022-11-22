<template>
  <div style="width: 100%">
    <LineChartGen
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
import { Line as LineChartGen } from "vue-chartjs"
import {
  Chart as ChartJS1,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js"
import { mapState, mapActions, mapMutations, mapGetters } from "vuex"

const mapStore = "mapStore"

ChartJS1.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  namespaced: true,
  name: "LineChart",
  components: { LineChartGen },
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
  mounted() {
    // this.setChartData()
  },
  created() {
    this.areaChange()
    // this.setChartData()
    // this.getChartData()
    // this.getDetails()
  },
  methods: {
    areaChange() {
      this.isAreaChanged = true
      console.log(this.isAreaChanged)
    },
    getDetails() {
      console.log("housedeals", this.mapdata.app.result.detail.housedeals)
    },
    getChartData() {
      console.log(this.chartData.labels)
      console.log(this.chartData.datasets[0].data)
    },
    async setChartData() {
      this.areaMap = {}
      this.areaOrder = []

      //   console.log("prev")
      //   this.getChartData()

      let deals = await this.mapdata.app.result.detail.housedeals
      for (let i = 0; i < deals.length; i++) {
        if (!this.areaMap[deals[i]["area"]]) {
          this.areaMap[deals[i]["area"]] = []
          this.areaOrder.push(deals[i]["area"])
        }
        this.areaMap[deals[i]["area"]].push({
          x: new Date(deals[i].dealYear, deals[i].dealMonth, deals[i].dealDay).getTime(),
          y: deals[i].dealAmount,
        })
      }
      this.areaOrder.sort()
      // console.log(this.areaMap)
      for (let i = 0; i < this.areaOrder.length; i++) {
        this.areaMap[this.areaOrder[i]].sort((a, b) => a.x - b.x)
      }
      //   console.log("this.areaMap", this.areaMap)
      //   console.log("this.areaOrder", this.areaOrder)

      //   console.log(this.areaOrder[0])
      this.chartData.labels = []
      this.chartData.datasets[0].data = []
      //   console.log(deals.length)
      let cnt = 0
      for (let i = 0; i < deals.length; i++) {
        // 가장 작은 것을 매핑
        // 나중에 집 크기 버튼 만들면 모두 매핑해야됨
        if (deals[i].area == this.areaOrder[0]) {
          this.chartData.labels.push(this.areaMap[this.areaOrder[0]][cnt].x)
          this.chartData.datasets[0].data.push(Number(this.areaMap[this.areaOrder[0]][cnt].y.split(",").join("")))
          cnt++
        }
      }
      //   console.log(11, this.chartData.labels)
      //   console.log(22, this.chartData.datasets[0].data)

      // console.log(this.areaMap)

      // for(let i=0;i<deals.length;i++){
      //     if(deals[i].area=="59.98")
      //         console.log(new Date(deals[i].dealYear,deals[i].dealMonth,deals[i].dealDay).getTime(), deals[i].dealAmount)
      // }
    },
  },
  computed: {
    ...mapState(mapStore, ["mapdata"]),
  },
  data() {
    return {
      isAreaChanged: false,
      chartData: {
        labels: [],
        datasets: [
          {
            xAxisID: "x",
            label: "Data One",
            backgroundColor: "#f87979",

            data: [],
            fill: false,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        position: "relative",
        scales: {
          x: {
            type: "linear",
            ticks: {
              callback: function (value) {
                let date = new Date(value)
                return `${date.getFullYear()}. ${date.getMonth() + 1}`
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: function (tooltipItem) {
                return new Date(tooltipItem[0].parsed.x).toLocaleDateString()
              },
              label: function (context) {
                return context.parsed.y / 10000 + "억"
              },
            },
          },
        },
      },
    }
  },
  watch: {
    isAreaChanged() {
      this.setChartData()
    },
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
    //   // console.log(this.areaMap)
    //   // for(let i=0;i<deals.length;i++){
    //   //     if(deals[i].area=="59.98")
    //   //         console.log(new Date(deals[i].dealYear,deals[i].dealMonth,deals[i].dealDay).getTime(), deals[i].dealAmount)
    //   // }
    // },
  },
}
</script>
