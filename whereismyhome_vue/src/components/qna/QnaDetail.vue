<template>
  <div id="detailWrapper">
    <div id="detailContents">
      <div id="sectorOne">
        <div class="cols">
          <div style="margin-right: 5px; font-weight: bold">글번호</div>
          <div class="view">{{ article.qnano }}</div>
        </div>
        <div class="cols">
          <div style="margin-right: 5px; font-weight: bold">글제목</div>
          <div class="view">{{ article.subject }}</div>
        </div>
      </div>
      <div id="sectorTwo">
        <div class="cols">
          <div style="margin-right: 5px; font-weight: bold">작성자</div>
          <div class="view">{{ article.userid }}</div>
        </div>
      </div>
      <div id="sectorThree">
        <div class="cols">
          <div style="margin-right: 5px; font-weight: bold">조회수</div>
          <div class="view">{{ article.hit }}</div>
        </div>
        <div class="cols">
          <div style="margin-right: 5px; font-weight: bold">작성시간</div>
          <div class="view">{{ article.regtime }}</div>
        </div>
      </div>
      <div id="sectorFour">
        <div style="font-weight: bold; margin-bottom: 5px">내용</div>
        <div class="view">{{ article.content }}</div>
      </div>
    </div>

    <div id="btnWrapper">
      <!-- <router-link :to="{ name: 'qnamodify', params: { qnano: article.qnano } }">수정</router-link> -->
      <v-btn elevation="2" color="primary" style="margin-right: 5px">수정</v-btn>
      <!-- <router-link :to="{ name: 'qnadelete', params: { qnano: article.qnano } }">삭제</router-link> -->
      <v-btn elevation="2" color="error">삭제</v-btn>
    </div>
  </div>
</template>

<script>
import http from "@/api/http-common"
export default {
  name: "QnaDetail",
  props: ["qnano", "isModify"],
  data() {
    return {
      isChildModify: false,
      article: Object,
    }
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    // this.article = {
    //   qnano: 10,
    //   userid: "안효인",
    //   subject: "안녕하세요",
    //   content: "안녕하세요!!!!",
    //   hit: 10,
    //   regtime: "2022-11-08 17:03:15",
    // };
  },
  mounted() {
    http.get(`/qna/${this.qnano}`).then(({ data }) => {
      this.article = data
    })
  },
  methods: {
    toModify() {
      return true
    },
  },
}
</script>

<style>
#detailWrapper {
  /* border:1px solid #EEEEEE; */
  width: 70%;
  margin: 3% 3%;
  align-items: center;
}
#detailContents {
  border: 1px solid #eeeeee;
}
#sectorOne {
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: row;
  /* margin-bottom: 3px; */
}
#sectorTwo {
  border: 1px solid #eeeeee;
  display: flex;
  /* margin-bottom: 3px; */
}
#sectorThree {
  border: 1px solid #eeeeee;
  display: flex;
  /* margin-bottom: 3px; */
}
#sectorFour {
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  height: 300px;
}
.cols {
  display: flex;
  flex-direction: row;
  margin: 6px 20px 6px 0px;
  justify-content: space-between;
}
#btnWrapper {
  /* border:1px solid red; */
  margin-top: 5px;
}
</style>
