import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  regist,
  checkId,
} from "@/api/member.js";
import { apiInstance } from "@/api/http-common";
const http = apiInstance();

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    favorite: [],
    idCheck: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
    getFavorite(state) {
      return state.favorite;
    },
    getCheckId(state) {
      return state.idCheck;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_ID_CHECK: (state, idCheck) => {
      state.idCheck = idCheck;
    },
    SET_FAVORITE(state, favorite) {
      state.favorite = favorite;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
            alert("로그인 성공했습니다.");
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
            alert("로그인 실패했습니다.");
          }
        },
        (error) => {
          console.log(error);
          alert("로그인 실패했습니다.");
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "토큰 재발급 >> 기존 토큰 정보 : {}",
        sessionStorage.getItem("access-token")
      );
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
            console.log("로그아웃!!!!");
            commit("SET_IS_LOGIN", false);
            router.push({ name: "Home" });
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userRegist({ commit }, user) {
      await regist(
        user,
        ({ data }) => {
          if (data.message === "success") {
            alert("회원가입 성공했습니다.");
          } else {
            alert("회원가입 실패했습니다.");
          }
        },
        (error) => {
          console.log(error);
          alert("회원가입 실패했습니다.");
        }
      );
    },
    async userCheckId({ state, commit }, user) {
      await checkId(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_ID_CHECK", true);
          } else {
            alert("중복된 아이디입니다.");
          }
        },
        (error) => {
          console.log(error);
          console.log(state.idCheck);
          alert("회원가입 실패했습니다.");
        }
      );
    },
    async insertFavorite({ state, dispatch }, data) {
      console.log(data);
      http
        .post(`/map/favor`, {
          user_id: data.user_id,
          dongCode: data.dongCode,
          aptName: data.aptName,
        })
        .then((response) => {
          console.log(response);
          dispatch("getFavorite");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteFavorite({ state, dispatch }, data) {
      http
        .delete(
          `/map/favor?user_id=${data.user_id}&dongCode=${data.dongCode}&aptName=${data.aptName}`
        )
        .then((response) => {
          console.log(response);
          dispatch("getFavorite");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getFavorite({ state, commit }, userinfo) {
      console.log(userinfo);
      let list = [];
      await http
        .get(`/map/favor/apt?user_id=${userinfo.userid}`)
        .then((response) => {
          console.log(response);
          commit("SET_FAVORITE", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(list);
    },
    async getFavoriteAll({ state, commit }) {
      let list = [];
      await http
        .get(`/map/favor`)
        .then((response) => {
          list = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      return list;
    },
  },
};

export default memberStore;
