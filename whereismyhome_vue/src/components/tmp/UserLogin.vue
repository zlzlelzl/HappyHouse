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
              <a id="kakao-login-btn" @click="kakaoLoginBtn">
                <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="100%"
                  alt="카카오 로그인 버튼" />
              </a>
              <p id="token-result"></p>
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
  created() { 
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
    //토큰받기
    kakaoLoginBtn(){
      if(!window.Kakao.Auth.getAccessToken()){
        window.Kakao.Auth.login({
          success: (response) =>{
            console.log(response);
            const token = response.access_token;
            window.Kakao.Auth.setAccessToken(token);
            getKakaoUserInfo();
          },
          fail: function (error) {
            console.log(error)
          },
        });
      }
    },
    //연결끊기
    KakaoLogout(){
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log(response)
          },
          fail: function (error) {
            console.log(error)
          },
        })
        // window.Kakao.Auth.logout();
        window.Kakao.Auth.setAccessToken(undefined);
        console.log("kakao logout");
      }
    },
    //유저정보얻기
    getKakaoUserInfo(){
    window.Kakao.API.request({
      url: '/v2/user/me',
      data: {
        property_keys: ["kakao_account.email"]
      },
      success: async (response) =>{
        console.log(response);
        let code = response.id;
        let email= response.kakao_account.email;
        //this.getKakaoAccessToken(code,email);
      },
      fail: function (error) {
        console.log(error);
        alert("카카오 로그인 실패");
      },
    });
    },
    //토큰받기
    getKakaoAccessToken:function(code, email){
        console.log(code,email);
        const restApiKey="***REMOVED***";
        const redirect_uri="https://localhost:9999/vue/oauth";
        const secretKey="***REMOVED***";
        const url=`https://kauth.kakao.com/oauth/token?client_id=${restApiKey}&client_secret=${secretKey}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${code}`;
        // axios.
        //   get(url).
        //   then((response)=>{
        //     console.log(response);
        //   }).catch((error)=>{
        //     console.log(error);
        //   });
      },
  },
};
</script>
</script>
//유저 처리를 어떻게 할 것인가?
// social check?

// 토큰의 관리 - social?
//탈퇴 처리
//탈퇴했다 재가입시?

//카카오로 회원가입시 컬럼 어캐 넣을 것인가
//유저정보수정시 카카오 처리
//
