<template>
  <div>
    <map-app></map-app>
    <div style="display: hidden; width: 100%; height: 85vh"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {
    MapApp: () => import("@/components/map/MapApp.vue"),
  },
}
</script>
