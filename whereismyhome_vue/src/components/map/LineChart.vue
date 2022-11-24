<template>
  <div>
    <v-btn-toggle class="pt-5 justify-center">
      <v-col cols="12">
        <v-btn
          width="65"
          v-for="(item, i) in areaOrder"
          :key="i"
          @click="setArea(i)"
          small
          class="pa-1 ma-1 justify-center"
        >
          <v-icon small>{{ item + "㎡" }}</v-icon>
        </v-btn>
      </v-col>
    </v-btn-toggle>
    <p class="pt-0 pr-8 mb-0 grey--text float-right" style="font-size: 1px">
      평수 별로 거래가를 보려면 버튼을 눌러주세요
    </p>
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
  </div>
</template>

<script>
import { Line as LineChartGen } from "vue-chartjs";
import {
  Chart as ChartJS1,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

const mapStore = "mapStore";

ChartJS1.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

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
    this.areaChange();
    // this.setChartData()
    // this.getChartData()
    // this.getDetails()
  },
  methods: {
    setArea(e) {
      this.setChartData(e);
    },
    areaChange() {
      this.isAreaChanged = true;
      console.log(this.isAreaChanged);
    },
    getDetails() {
      console.log("housedeals", this.mapdata.app.result.detail.housedeals);
    },
    getChartData() {
      console.log(this.chartData.labels);
      console.log(this.chartData.datasets[0].data);
    },
    async setChartData(e) {
      //   console.log("prev")
      //   this.getChartData()
      this.areaMap = {}
      this.areaOrder = []

      let deals = await this.mapdata.app.result.detail.housedeals;

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

      this.areaOrder.sort((a, b) => Number(a) - Number(b));
      console.log("areaOrder", this.areaOrder);
      console.log("areaMap", this.areaMap);
      // console.log(this.areaMap)
      for (let i = 0; i < this.areaOrder.length; i++) {
        this.areaMap[this.areaOrder[i]].sort((a, b) => a.x - b.x);
      }
      //   console.log("this.areaMap", this.areaMap)
      //   console.log("this.areaOrder", this.areaOrder)

      //   console.log(this.areaOrder[e])
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      //   console.log(deals.length)
      let cnt = 0;
      for (let i = 0; i < deals.length; i++) {
        // 가장 작은 것을 매핑
        // 나중에 집 크기 버튼 만들면 모두 매핑해야됨
        if (deals[i].area == this.areaOrder[e]) {
          this.chartData.labels.push(this.areaMap[this.areaOrder[e]][cnt].x);
          this.chartData.datasets[0].data.push(
            Number(this.areaMap[this.areaOrder[e]][cnt].y.split(",").join(""))
          );
          cnt++;
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
      areaMap: {},
      areaOrder: [],
      areas: {},
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
                let date = new Date(value);
                return `${date.getFullYear()}. ${date.getMonth() + 1}`;
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
                return new Date(tooltipItem[0].parsed.x).toLocaleDateString();
              },
              label: function (context) {
                return context.parsed.y / 10000 + "억";
              },
            },
          },
        },
      },
    };
  },
  watch: {
    isAreaChanged() {
      this.setChartData(0);
    },
  },
  actions: {},
};
</script>
