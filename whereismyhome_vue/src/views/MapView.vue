<template>
  <div>
    <main-map></main-map>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {
    MapApp: () => import("@/components/map/MapApp.vue"),
  },
};
</script>
