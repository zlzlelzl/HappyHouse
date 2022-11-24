<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#32BCC3"
        v-bind="attrs"
        v-on="on"
        elevation="0"
        dark
        class="float-left"
        width="100"
      >
        <font-awesome-icon icon="fa-solid fa-pen" />
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col offset="3 " cols="12" sm="6" md="6" class="flaot-center">
              <v-text-field readonly label="아이디" v-model="userid"></v-text-field>
            </v-col>
            <v-col offset="3 " cols="12" sm="6" md="6" class="flaot-center">
              <v-text-field
                type="password"
                label="비밀번호"
                required
                v-model="userpwd"
              ></v-text-field>
            </v-col>
            <v-col offset="3 " cols="12" sm="6" md="6" class="flaot-center">
              <v-text-field label="이름" required v-model="username"></v-text-field>
            </v-col>
            <v-col offset="3 " cols="12" sm="6" md="6" class="flaot-center">
              <v-text-field label="이메일" required v-model="email"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="updateUser"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserUpdateForm",
  components: {},
  data() {
    return {
      dialog: false,
      userid: null,
      userpwd: null,
      username: null,
      email: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    getUserInfo() {
      return this.userInfo;
    },
  },
  created() {
    this.setUserForm();
  },
  methods: {
    setUserForm() {
      console.log(this.getUserInfo);
      this.userid = this.getUserInfo.userid;
      this.userpwd = this.getUserInfo.userpwd;
      this.username = this.getUserInfo.username;
      this.email = this.getUserInfo.email;
    },
    updateUser() {
      console.log("업데이트 유저");
      let userInfo = {
        userid: this.userid,
        userpwd: this.userpwd,
        username: this.username,
        email: this.email,
      };

      http
        .put("/user", userInfo)
        .then(({ data }) => {
          let msg = "등록중 문제발생";
          if (data === "success") msg = "등록 성공";
          alert(msg);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
};
</script>

<style></style>
