<!--
<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.username }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.joindate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" href="#" class="mr-1">정보수정</b-button>
          <b-button variant="danger" href="#">회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
-->

<template>
  <v-container>
    <v-row class="py-12 my-3">
      <v-col offset="3" cols="6"
        ><v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
          <v-card
            width="100%"
            height="100%"
            class="pa-16 justify-center"
            :color="hover ? 'blue lighten-5' : 'white'"
            :elevation="hover ? 12 : 0"
            hover
          >
            <v-col offset="0" cols="12" class="justify-center d-flex" width="100%">
              <v-avatar size="220px" class="justify-center d-flex">
                <v-img src="@/assets/avatar.png" />

                <!-- <font-awesome-icon icon="fa-solid fa-circle-user" justify-center d-flex /> -->
              </v-avatar>
            </v-col>
            <v-col offset="0" cols="12" class="background">
              <v-row>
                <v-col>
                  <!------------------ PROFILE DATA ------------------>
                  <div
                    v-if="getUserInfo.userid"
                    class="text-center mb-3 pr-5 pl-5 font-weight-regular"
                  >
                    <font-awesome-icon icon="fa-solid fa-at" />
                    {{ getUserInfo.userid }}
                  </div>
                  <div v-if="getUserInfo.username" class="text-center mb-3">
                    <!-- <v-icon>{{ getUserInfo.userid }}</v-icon> -->
                    <span>
                      {{ getUserInfo.username }}
                    </span>
                  </div>
                  <div v-if="getUserInfo.email" class="text-center mb-3">
                    <!-- <v-icon>{{ getUserInfo.userid }}</v-icon> -->
                    <font-awesome-icon icon="fa-solid fa-globe" />
                    <span>
                      <!-- <a :href="getUserInfo.userid" target="_blank" -->
                      {{ getUserInfo.email }}
                    </span>
                  </div>
                  <div class="text-center">
                    <font-awesome-icon icon="fa-regular fa-calendar" />
                    <span>
                      {{ getUserInfo.joindate }}
                    </span>
                  </div>
                  <div class="mt-5 justify-center d-flex">
                    <div v-if="true">
                      <!-- <template v-slot:top> -->
                      <template class="float-left" width="100">
                        <user-update-form></user-update-form>
                      </template>
                      <v-btn
                        color="#DB4455"
                        v-on="on"
                        elevation="0"
                        dark
                        class="float-right"
                        width="100"
                        @click="deleteUser"
                      >
                        <font-awesome-icon icon="fa-solid fa-eraser" />
                        Delete
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import UserUpdateForm from "@/components/user/UserUpdateForm";

const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  components: {
    UserUpdateForm,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    getUserInfo() {
      return this.userInfo;
    },
  },
  methods: {
    deleteUser() {
      console.log("del user");
    },
  },
};
</script>

<style></style>
