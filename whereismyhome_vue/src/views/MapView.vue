<template>
  <div>
    <main-map></main-map>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {
    MainMap: () => import("@/components/map/MainMap.vue"),
  },
};
</script>
