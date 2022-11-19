<template>
  <div>
    <v-card>
      <v-card-title>
        Q&A
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="articles"
        :single-expand="true"
        :expanded.sync="expanded"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        item-key="qnano"
        :item-class="setReplyRow"
        show-expand
        class="elevation-1"
        :page.sync="page"
        @page-count="pageCount = totalPg"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col class="text-right">
              <qna-write></qna-write>
            </v-col>
          </v-toolbar>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" v-if="!isModify">
            <div id="detailWrapper">
              <div id="detailContents">
                <div id="sectorOne">
                  <div class="cols">
                    <div style="margin-right: 5px; font-weight: bold">글번호</div>
                    <div class="view">{{ item.qnano }}</div>
                  </div>
                  <div class="cols">
                    <div style="margin-right: 5px; font-weight: bold">글제목</div>
                    <div class="view">{{ item.subject }}</div>
                  </div>
                </div>
                <div id="sectorTwo">
                  <div class="cols">
                    <div style="margin-right: 5px; font-weight: bold">작성자</div>
                    <div class="view">{{ item.userid }}</div>
                  </div>
                </div>
                <div id="sectorThree">
                  <div class="cols">
                    <div style="margin-right: 5px; font-weight: bold">조회수</div>
                    <div class="view">{{ item.hit }}</div>
                  </div>
                  <div class="cols">
                    <div style="margin-right: 5px; font-weight: bold">작성시간</div>
                    <div class="view">{{ item.regtime }}</div>
                  </div>
                </div>
                <div id="sectorFour">
                  <div style="font-weight: bold; margin-bottom: 5px">내용</div>
                  <div class="view" style="border: 1px solid #eeeeee; margin: 5px; width: 95%; height: 200px">
                    {{ item.content }}
                  </div>
                </div>
              </div>

              <div id="btnWrapper">
                <v-btn elevation="2" color="primary" style="margin-right: 5px" @click="reply">
                  <qna-reply :parentno="item.qnano"></qna-reply>
                </v-btn>
                <v-btn elevation="2" color="primary" style="margin-right: 5px" @click=";[toModify(), setValue(item)]"
                  >수정</v-btn
                >
                <v-btn elevation="2" color="error" @click="deleteArticle(item)">삭제</v-btn>
              </div>
            </div>
          </td>
          <td :colspan="headers.length" v-else>
            <div class="regist_form">
              <div id="detailWrapper">
                <div id="detailContents">
                  <div id="sectorOne">
                    <div class="cols">
                      <div style="margin-right: 5px; font-weight: bold">글번호</div>
                      <div class="view">{{ item.qnano }}</div>
                    </div>
                    <div class="cols">
                      <div style="margin-right: 5px; font-weight: bold">글제목</div>
                      <div class="view">{{ item.subject }}</div>
                    </div>
                  </div>
                  <div id="sectorTwo">
                    <div class="cols">
                      <div style="margin-right: 5px; font-weight: bold">작성자</div>
                      <div class="view">
                        <input type="text" id="userid" v-model="modArticle.userid" ref="userid" />
                      </div>
                    </div>
                  </div>
                  <div id="sectorThree">
                    <div class="cols">
                      <div style="margin-right: 5px; font-weight: bold">조회수</div>
                      <div class="view">{{ item.hit }}</div>
                    </div>
                    <div class="cols">
                      <div style="margin-right: 5px; font-weight: bold">작성시간</div>
                      <div class="view">{{ item.regtime }}</div>
                    </div>
                  </div>
                  <div id="sectorFour">
                    <div style="font-weight: bold; margin-bottom: 5px">내용</div>
                    <div class="view">
                      <textarea id="content" v-model="modArticle.content" ref="content" cols="200" rows="5"></textarea>
                    </div>
                  </div>
                </div>

                <div id="btnWrapper">
                  <v-btn elevation="2" color="primary" style="margin-right: 5px" @click="checkValue">확인</v-btn>
                  <v-btn elevation="2" color="error" @click="toDetail">취소</v-btn>
                </div>
              </div>
            </div>
          </td>
        </template>
      </v-data-table>
      <v-pagination @input="handlePagination($event)" v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { apiInstance } from "@/api/http-common";

const http = apiInstance();
import QnaListItem from "@/components/qna/QnaListItem"
import QnaDetail from "@/components/qna/QnaDetail"
import QnaWrite from "@/components/qna/QnaWrite"
import QnaModify from "@/components/qna/QnaModify"
import QnaReply from "@/components/qna/QnaReply"

export default {
  name: "QnaList",
  components: {
    QnaListItem,
    QnaDetail,
    QnaWrite,
    QnaModify,
    QnaReply,
  },
  data() {
    return {
      search: "",
      qnano: "",
      parentno: "",
      pg: "1",
      page: 1,
      pageCount: 0,
      dialog: false,
      isModify: false,
      headers: [
        {
          text: "번호",
          //   align: "start",
          //   sortable: false,
          value: "qnano",
        },
        { text: "제목", value: "subject" },
        { text: "작성자", value: "userid" },
        { text: "조회수", value: "hit" },
        { text: "작성일", value: "regtime" },
      ],
      articles: [],
      modArticle: {},
    }
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.

    http.get(`/qna/totalPage`).then(({ data }) => {
      this.totalPg = data
    })
    this.pg = this.$route.params.pg == undefined ? "1" : this.$route.params.pg
    this.page = Number(this.$route.params.pg)
    http.get(`/qna?pg=${this.pg}`).then(({ data }) => {
      this.articles = data
      console.log(data)
    })
  },
  methods: {
    handlePagination(e) {
      location.href = "./" + e
    },
    setReplyRow(item) {
      return item.parentno == 0 ? "white" : "grey lighten-3"
    },
    setValue(item) {
      Object.assign(this.modArticle, item)
    },

    toDetail() {
      this.isModify = false
    },
    toModify() {
      this.isModify = true
    },

    filterOnlyCapsText(value, search, item) {
      return (
        value != null && search != null && typeof value === "string" && item.subject.toString().indexOf(search) !== -1
      )
    },
    // headers() {
    //   return [
    //     {
    //       // text: "Dessert (100g serving)",
    //       align: "left",
    //       sortable: false,
    //       value: "name",
    //       filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'name' ].toLowerCase() ) }
    //     },
    //   ];
    // },

    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true
      let msg = ""
      !this.modArticle.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus())
      err && !this.modArticle.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus())
      err && !this.modArticle.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus())

      if (!err) alert(msg)
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.modifyArticle()
    },
    modifyArticle() {
      console.log("글수정 하러가자!!!!")
      // 비동기
      // TODO : 글번호에 해당하는 글정보 수정.
      http.put("/qna", this.modArticle).then(({ data }) => {
        let msg = "수정중 문제발생"
        if (data === "success") msg = "수정 성공"
        alert(msg)
        this.$router.go(this.$router.currentRoute)
      })
    },
    moveList() {
      console.log("글목록 보러가자!!!")
      // this.$router.push({ name: "qnalist" })
      this.$router.go(this.$router.currentRoute)
    },
    deleteArticle(item) {
      // TODO : 글번호에 해당하는 글을 삭제.
      http.delete(`/qna/${item.qnano}`).then(({ data }) => {
        let msg = "삭제중 문제발생"
        if (data === "success") msg = "삭제 성공"
        alert(msg)
        // this.$router.push({ name: "qnalist" })
        this.moveList()
      })
    },
  },
}
</script>

<style>
#detailWrapper {
  /* border:1px solid #EEEEEE; */
  width: 1500px;
  margin: 3% auto;
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
