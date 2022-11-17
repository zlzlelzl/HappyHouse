<template>
  <div>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "QnaView",
  components: {
    MainSidebar: () => import("@/components/details/MainSidebar"),
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
