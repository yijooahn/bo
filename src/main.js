import axios from "axios";
import { createPinia } from "pinia";
import { createApp, ref } from "vue";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from "./App.vue";
import router from "./router/index.js";

//axios.defaults.baseURL = "https://dev-bo.d-aidt.com:40001/bo-was";
axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/bo-was";
//axios.defaults.baseURL = 'http://172.30.1.32:5173/bo-was'
//axios.defaults.baseURL = 'http://localhost:8080/bo-was'

const loading = ref(true);
const detailMaskingFlag = ref(true);
const today = new Date().toLocaleDateString("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
axios.interceptors.request.use(
  function (config) {
    if (config.data != null) {
      if ((config.url?.includes("/inquiry")&&!config.url?.includes("/inquiry/"))||config.url?.includes("/inquiry/list")) {
        if (
          config.data.hasOwnProperty("searchStartDate") &&
          config.data.hasOwnProperty("searchEndDate")
          ) {
            if(config.data.hasOwnProperty("searchKeyword") && config.data?.searchKeyword == "trmsPstgYmd"){
                if(
                  config.data.searchStartDate == '2024-07-01' && 
                  config.data.searchEndDate == today
                ){
                  config.data.searchStartDate = null;
                  config.data.searchEndDate = null;
                }
            }else if (
            config.data.searchStartDate == null ||
            config.data.searchEndDate == null ||
            config.data.searchStartDate == "" ||
            config.data.searchEndDate == ""
          ) {
            config.data.searchStartDate = today;
            config.data.searchEndDate = today;
          }
        } else if (
          config.data.hasOwnProperty("chgBgngYmd") &&
          config.data.hasOwnProperty("chgEndYmd")
        ) {
          if (
            config.data.chgBgngYmd == null ||
            config.data.chgEndYmd == null ||
            config.data.chgBgngYmd == "" ||
            config.data.chgEndYmd == ""
          ) {
            const today = new Date().toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            config.data.chgBgngYmd = today;
            config.data.chgEndYmd = today;
          }
        }
      }
    }
    document.getElementsByClassName("main")[0]?.scrollTo(0,0);
    document.getElementsByClassName("main-ct")[0]?.scrollTo(0,0);
    loading.value = true;
    const loggedIn = document.cookie
      .split("; ")
      .filter((el) => el.startsWith("UserInfo="));
    if (loggedIn.length > 0) {
      const userInfo = JSON.parse(
        document.cookie
          .split("; ")
          .filter((el) => el.startsWith("UserInfo="))[0]
          .replace("UserInfo=", "")
      );
      config.headers.set("Authorization", userInfo.jwt);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    loading.value = false;
    if (response.config != null) {
      if ((response.config.url?.includes("/inquiry")&&!response.config.url?.includes("/inquiry/")) || response.config.url?.includes("/inquiry/list")) {
      if ((response.config.url?.includes("/inquirybare")&&!response.config.url?.includes("/inquiry/")) || response.config.url?.includes("/inquiry/listbare")) {
        detailMaskingFlag.value=false
      }else{
        detailMaskingFlag.value=true;
      }

        if (response.config.data != null) {
          const reqData = JSON.parse(response.config.data);
          if (
            reqData.searchStartDate != null &&
            reqData.searchEndDate != null
          ) {
            const arr = Array.from(
              document.getElementsByTagName("input")
            ).filter((el) => el.type == "date");
            if (arr.length == 2) {
              arr[0].value = reqData.searchStartDate;
              arr[1].value = reqData.searchEndDate;
            }
          } else if (reqData.chgBgngYmd != null && reqData.chgEndYmd != null) {
            const arr = Array.from(
              document.getElementsByTagName("input")
            ).filter((el) => el.type == "date");
            if (arr.length == 2) {
              arr[0].value = reqData.chgBgngYmd;
              arr[1].value = reqData.chgEndYmd;
            }
          }
        }
      }
    }
    return response;
  },
  function (error) {
    loading.value = false;
    if (error.response != null) {
      if (error.response.status != null) {
        if (error.response.status == 401 || error.response.status == 403) {
          detailMaskingFlag.value=true;
          if (!router.currentRoute.value.path.includes("/login") && !router.currentRoute.value.path.includes("/signUp")) {
            if (error.response.status == 403) {
              alert("접근 권한이 없습니다.");
              router.go(-1);
              return Promise.reject(error);
            } else if (error.response.status == 401) {
              if (error.response.data?.includes('xpire')) {
                alert("장시간 이용이 없어 로그인 화면으로 이동합니다.");
                axios.get("/member/logout").finally((response) => {
                  if (document.cookie.split(";").filter((el) => el.includes("lastLoggedIn")).length > 0) {
                    document.cookie = "lastLoggedIn=; Max-Age=0; path=/;";
                  }
                  if (document.cookie.split(";").filter((el) => el.includes("UserInfo")).length > 0) {
                    document.cookie = "UserInfo=; Max-Age=0; path=/;";
                  }
                  if (document.cookie.split(";").filter((el) => el.includes("maskedId")).length > 0) {
                    document.cookie = "maskedId=; Max-Age=0; path=/;";
                  }
                  router.push("/login");
                  return;
                });
              } else {
                alert("세션 오류가 발생했습니다.");
                if (document.cookie.split(";").filter((el) => el.includes("lastLoggedIn")).length > 0) {
                  document.cookie = "lastLoggedIn=; Max-Age=0; path=/;";
                }
                if (document.cookie.split(";").filter((el) => el.includes("UserInfo")).length > 0) {
                  document.cookie = "UserInfo=; Max-Age=0; path=/;";
                }
                if (document.cookie.split(";").filter((el) => el.includes("maskedId")).length > 0) {
                  document.cookie = "maskedId=; Max-Age=0; path=/;";
                }
                router.push("/login");
                return;
              }
            }else{
              alert("세션 오류가 발생했습니다.");
              router.go(-1);
              return Promise.reject(error);
            }
          }
        } else if (error.response.status == 404) {
          if (error.config != null) {
            if (error.config.data != null) {
              if ((error.config.url?.includes("/inquiry")&&!error.config.url?.includes("/inquiry/"))||error.config.url?.includes("/inquiry/list")) {
                const reqData = JSON.parse(error.config.data);
                if (
                  reqData.searchStartDate != null &&
                  reqData.searchEndDate != null
                ) {
                  const arr = Array.from(
                    document.getElementsByTagName("input")
                  ).filter((el) => el.type == "date");
                  if (arr.length == 2) {
                    arr[0].value = reqData.searchStartDate;
                    arr[1].value = reqData.searchEndDate;
                  }
                } else if (
                  reqData.chgBgngYmd != null &&
                  reqData.chgEndYmd != null
                ) {
                  const arr = Array.from(
                    document.getElementsByTagName("input")
                  ).filter((el) => el.type == "date");
                  if (arr.length == 2) {
                    arr[0].value = reqData.chgBgngYmd;
                    arr[1].value = reqData.chgEndYmd;
                  }
                }
              }
            }
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vue3Toastify,{
  multiple:false
});
app.config.globalProperties.axios = axios;
app.provide("loadingSpinnerIsActive", loading);
app.provide("detailMaskingFlag",detailMaskingFlag);
app.mount("#app");
