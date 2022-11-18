<template>
  <tr>
    <td>{{ article.qnano }}</td>
    <td>
      <router-link :to="`/qna/view/${article.qnano}`">{{ article.subject }}</router-link>
    </td>
    <td>{{ article.userid }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.regtime }}</td>
  </tr>
</template>

<script>
export default {
  name: "QnaListItem",
  props: {
    article: Object,
  },
  data() {
    return {
      items: {},
    }
  },
  created() {},
}
</script>

<style></style>
