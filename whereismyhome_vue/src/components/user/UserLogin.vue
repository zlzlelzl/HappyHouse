<template>
  <v-container id="signinup-form" class="fill-height">
    <!-- <Notification
      :message="snackbarMessage"
      :snackbar="snackbar"
      :type="snackbarType"
    /> -->
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="12" md="12" class="">
        <v-card class="evelation-12 card ma-16">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class="">
                <v-col cols="12" md="8" class="pt-16 pb-16">
                  <v-card-text>
                    <v-form class="signup-form-form" @click.prevent="confirm">
                      <h1
                        class="text-center display-1 mt-16 mb-16"
                        :class="`${bgColor}--text`"
                      >
                        로그인
                      </h1>
                      <v-text-field
                        class="mt-16 mb-8"
                        required
                        id="username"
                        prepend-inner-icon="mdi-account"
                        v-model="user.userid"
                        label="User Id"
                        name="Username"
                        type="text"
                        :color="bgColor"
                        @keyup.enter="confirm"
                      />
                      <v-text-field
                        required
                        id="password"
                        prepend-inner-icon="mdi-lock"
                        v-model="user.userpwd"
                        label="Password"
                        name="Password"
                        type="password"
                        :color="bgColor"
                        @keyup.enter="confirm"
                      />
                      <div class="text-center"></div>
                      <div class="text-center mt-16 mb-16">
                        <v-btn
                          type="submit"
                          large
                          :color="bgColor"
                          dark
                          @click.prevent="confirm"
                          >로그인</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-8">회원이 아니신가요?</h1>
                      <h5 class="text-center overline mb-3"></h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 2">회원가입</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!--SignUp-->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="darken-2 vcenter" :class="`${bgColor}`">
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">이미 회원이신가요?</h1>
                      <h5 class="text-center overline mb-3"></h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">로그인</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="mt-16 mb-8">
                  <v-card-text>
                    <h1
                      class="text-center display-1 mt-16 mb-16"
                      :class="`${bgColor}--text`"
                    >
                      회원가입
                    </h1>
                    <v-form class="signup-form-form" @submit.prevent="regist">
                      <v-text-field
                        required
                        id="userid"
                        v-model="user.userid"
                        label="User Id"
                        name="userid"
                        type="text"
                        @keyup.enter="regist"
                      />
                      <v-text-field
                        required
                        id="username"
                        v-model="user.username"
                        label="User name"
                        name="username"
                        type="text"
                        @keyup.enter="regist"
                      />
                      <v-text-field
                        required
                        id="email"
                        v-model="user.email"
                        label="Email"
                        name="email"
                        type="email"
                        @keyup.enter="regist"
                      />
                      <v-text-field
                        required
                        id="password"
                        v-model="user.userpwd"
                        label="Password"
                        name="password"
                        type="password"
                        @keyup.enter="regist"
                      />
                      <div class="text-center mt-6">
                        <v-btn
                          type="submit"
                          large
                          :color="bgColor"
                          dark
                          @click.prevent="regist"
                        >
                          회원가입</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  name: "UserLogin",
  props: {
    source: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "indigo",
    },
    fgColor: {
      type: String,
      default: "white",
    },
  },
  data() {
    return {
      // isLoginError: false,
      step: 1,
      user: {
        userid: null,
        userpwd: null,
        email: null,
        username: null,
      },
    };
  },
  // data: () => ({
  //   // username: '',
  //   // email: '',
  //   // password: '',
  //   // login: '',
  //   // snackbarType: 'success',
  //   // snackbarMessage: '',
  //   // snackbar: false,
  //   user: {
  //       userid: null,
  //       userpwd: null,
  //     },
  // }),
  created() {
    this.SET_ID_CHECK(false);
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo", "idCheck"]),
    ...mapGetters(memberStore, ["getCheckId"]),
    getIdCheck() {
      console.log(" ");
      console.log(this.idCheck);
      return this.idCheck;
    },
  },
  methods: {
    ...mapActions(memberStore, [
      "userConfirm",
      "getUserInfo",
      "userRegist",
      "userCheckId",
    ]),
    ...mapMutations(memberStore, ["SET_ID_CHECK"]),
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
    async regist() {
      //아이디 중복확인
      console.log(this.getIdCheck);
      this.SET_ID_CHECK(false);
      console.log(this.getIdCheck);
      await this.userCheckId(this.user);
      if (this.getIdCheck) {
        console.log(this.getIdCheck);
        this.SET_ID_CHECK(false);
        console.log(this.getIdCheck);
        await this.userRegist(this.user);
        console.log("this.getIdCheck");
        console.log(this.getIdCheck);
        if (this.getIdCheck) this.step = 1;
        else {
          this.user.userid = null;
          this.user.userpwd = null;
          this.user.email = null;
          this.user.username = null;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
}
a.no-text-decoration {
  text-decoration: none;
}
#signinup-form {
  max-width: 75rem;
}
.signup-form-form {
  max-width: 23rem;
  margin: 0 auto;
}
.card {
  overflow: hidden;
}
.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
