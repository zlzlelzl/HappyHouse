<template>
  <div>
    <map-app></map-app>
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
