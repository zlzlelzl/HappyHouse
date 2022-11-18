<template></template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    async logout() {
      await this.userLogout();
    },
  },
  mounted() {
    this.logout();
  },
};
</script>
