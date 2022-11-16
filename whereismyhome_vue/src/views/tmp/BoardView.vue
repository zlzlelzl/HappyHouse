<template>
  <div id="content">
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
};
</script>
