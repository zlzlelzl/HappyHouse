<template>
  <v-main class=""
    ><router-view></router-view>
    <!-- Login Component -->
    <v-container style="max-width: 450px" fill-height>
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h1 style="text-align: center" class="mb-10">로그인</h1>
              <form>
                <v-text-field 
                required
                v-model="user.userid" 
                label="ID" 
                prepend-inner-icon="mdi-account" 
                @keyup.enter="confirm"
                >
                </v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="user.userpwd"
                  type="password"
                  label="Password"
                  @keyup.enter="confirm"
                  required
                >
                </v-text-field>
                <v-btn
                  @click.prevent="confirm"
                  type="submit"
                  color="blue lighten-1 text-capitalize"
                  depressed
                  large
                  block
                  dark
                  class="mb-3"
                >
                  로그인
                </v-btn>
                <v-btn
                  @click.prevent="movePage"
                  color="blue lighten-1 text-capitalize"
                  depressed
                  large
                  block
                  dark
                >
                  회원가입
                </v-btn>
              </form>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
  data() {
    return {
      // isLoginError: false,
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "Home" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>
</script>
