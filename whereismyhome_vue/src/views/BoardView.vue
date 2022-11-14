<template>
  <div id="content">
    <v-main>
      <!-- <router-link to="/step00">step00</router-link> | <router-link to="/step01">step01</router-link> |
      <router-link to="/step02">step02</router-link> | <router-link to="/step03">step03</router-link> |
      -->
      <router-view />

      <!-- <board-list></board-list> -->
    </v-main>
  </div>
</template>

<script>
import BoardList from "@/components/board/BoardList.vue"
export default {
  components: { BoardList },
  data() {
    return {
      search: "",
      calories: "",
      articles: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Calories",
          value: "calories",
          filter: (value) => {
            if (!this.calories) return true

            return value < parseInt(this.calories)
          },
        },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ]
    },
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      )
    },
  },
}
</script>
