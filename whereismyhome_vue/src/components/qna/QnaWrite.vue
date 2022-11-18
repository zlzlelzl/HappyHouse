<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> 글쓰기 </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="작성자(추후 고정)*" v-model="userid"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="제목*" required v-model="subject"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="내용*" required v-model="content"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>*필수</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="registArticle"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import http from "@/api/http-common"
export default {
  name: "QnaWrite",
  data() {
    return {
      dialog: false,
      userid: null,
      subject: null,
      content: null,
    }
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true
      let msg = ""
      !this.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus())
      err && !this.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus())
      err && !this.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus())

      if (!err) alert(msg)
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle()
    },
    registArticle() {
      // 비동기
      // TODO : 글번호에 해당하는 글정보 등록.
      console.log("글작성 하러가자!!!!")
      let article = {
        userid: this.userid,
        subject: this.subject,
        content: this.content,
        parentno: "",
      }

      http
        .post("/qna", article)
        .then(({ data }) => {
          let msg = "등록중 문제발생"
          if (data === "success") msg = "등록 성공"
          alert(msg)

          this.moveList()
        })
        .finally(() => {
          this.dialog = false
        })
    },

    moveList() {
      console.log("글목록 보러가자!!!")
      this.$router.go(this.$router.currentRoute)
    },
  },
}
</script>

<style></style>
