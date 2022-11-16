const { default: axios } = require("axios");

function getNaverNews() {
  let search = "부동산";
  let config = {
    headers: {
      "X-Naver-Client-Id": "t0HvsNpl7cfb2bainYVM",
      "X-Naver-Client-Secret": "KstSGGZtNm",
    },
  };
  axios
    .get(
      `https://openapi.naver.com/v1/search/blog.json?query=${search}&sort=date`,
      config
    )
    .then((response) => {
      console.log(response);
    });
}
