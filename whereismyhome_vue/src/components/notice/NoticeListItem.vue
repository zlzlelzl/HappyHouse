<template>
  <tr>
    <td>{{ article.articleno }}</td>
    <td>
      <router-link :to="`/notice/view/${article.articleno}`">{{
        article.subject
      }}</router-link>
    </td>
    <td>{{ article.userid }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.regtime }}</td>
  </tr>
</template>

<script>
export default {
  name: "NoticeListItem",
  props: {
    article: Object,
  },
  data() {
    return {
      items: {},
    };
  },
  created() {},
};
</script>

<style></style>
