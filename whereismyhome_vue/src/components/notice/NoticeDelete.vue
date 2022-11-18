<template>
  <div class="regist">
    <h1>SSAFY 글 삭제</h1>
    <div>삭제중....</div>
  </div>
</template>

<script>
import { apiInstance } from "@/api/http-common";

const http = apiInstance();
export default {
  name: "NoticeDelete",
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글을 삭제.
    http.delete(`/board/${this.$route.params.articleno}`).then(({ data }) => {
      let msg = "삭제중 문제발생";
      if (data === "success") msg = "삭제 성공";
      // alert(msg)
      this.$router.go({ name: "NoticeList" });
    });
  },
};
</script>

<style></style>
