<template>
  <div v-if="!popupIsActive" class="header">
    <div class="Top">
      <div class="dp-if">
        <div class="Logo">
          <img class="ImgLogo1" src="/images/logo/fullLogo.png" />
        </div>
        <toggle-switch
          v-if="loginUser"
          v-model:activeUser="activeUser"
          class="tg-sw"
        ></toggle-switch>
      </div>
      <div v-if="loginUser" class="log">
        <div class="Frame3465879">
          <div class="Icon21">
            <img src="/images/icon21.svg" />
          </div>
          <div class="EdAidtAi">{{ email }}</div>
        </div>
        <div class="tit"></div>
        <div class="20240110163513 last">마지막접속시간 {{ lastLoginDt }}</div>
        <div class="Frame3465877">
          <div class="out" @click="popupIsActive = true">로그아웃</div>
        </div>
      </div>
    </div>
  </div>
  <component
    v-else
    v-model:isActive="popupIsActive"
    :alertModal="alertModal"
    @on-confirm-handler="() => triggerLogout()"
    :is="ModalComp"
  ></component>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/store/member.js";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import ToggleSwitch from "./ToggleSwitch.vue";
const store = useMemberStore();
const { removeUserInfo } = store;
const router = useRouter();
const lastLoginDt = ref("");
const email = ref("");
const activeUser = ref("");
const loginUser = ref(false);
const popupIsActive = ref(false);
const alertModal = ref({
  contentAlign: "start",
  // loginUser: document.cookie.split('; ').filter(el => el.startsWith('maskedId='))[0].replace('maskedId=', ''),
  overflow: "hidden",
  masking: false,
  display: "block",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>로그아웃하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "취소",
      addClass: "btn-2",
    },
  ],
});
onBeforeMount(() => {
  const signUpPage = router.currentRoute.value.path.includes("/signUp");
  if (signUpPage) {
    //localStorage.removeItem("UserInfo");
    //localStorage.removeItem("maskedId");
    //localStorage.removeItem("lastLoggedIn");
    loginUser.value = false;
    return;
  }
  var loggedIn = document.cookie
    .split("; ")
    .filter((el) => el.startsWith("lastLoggedIn="));
  if (loggedIn.length > 0) {
    lastLoginDt.value = decodeURI(
      document.cookie
        .split("; ")
        .filter((el) => el.startsWith("lastLoggedIn="))[0]
        .replace("lastLoggedIn=", "")
    );
    // lastLoginDt.value = localStorage.getItem("lastLoggedIn");
  }
  loggedIn = document.cookie
    .split("; ")
    .filter((el) => el.startsWith("UserInfo="));
  if (loggedIn.length > 0) {
    loginUser.value = true;
    const userInfo = JSON.parse(
      document.cookie
        .split("; ")
        .filter((el) => el.startsWith("UserInfo="))[0]
        .replace("UserInfo=", "")
    );
    //const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    const bareEmail = userInfo.emlAddr;
    if (bareEmail.includes("@")) {
      var maskedEmailId = "";
      const emailId = bareEmail.split("@")[0];
      const length = emailId.length;
      if (length <= 3) {
        maskedEmailId = "*".repeat(length);
      } else {
        const replacedPart = "*".repeat(3);
        const remainingPart = emailId.slice(0, length - 3);
        maskedEmailId = remainingPart + replacedPart;
      }
      email.value = maskedEmailId + "@" + bareEmail.split("@")[1];
      document.cookie = "maskedId = " + email.value + ";path=/";
      alertModal.value.loginUser = email.value;
      //localStorage.setItem('maskedId', email.value);
    }
    activeUser.value = "admin";
  }
});

const triggerLogout = async () => {
  await axios.get("/member/logout").finally((response) => {
    removeUserInfo();
    router.push("/login");
  });
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eaeaea;
  background: #fff;
  height: 100%;
  width: 100%;
  place-self: center;
}

.header img {
  max-height: 4.5vh;
}
.Top {
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  display: inline-flex;
  position: relative;
  background: white;
  justify-content: space-between;
  border-bottom: 1px #eaeaea solid;
}
.Logo {
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
  position: relative;
  height: 100%;
  left: 1rem;
}
.tg-sw {
  left: 2rem;
  width: fit-content;
  height: fit-content;
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  margin: 0 auto;
}
.log {
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  float: right;
  position: relative;
  height: 100%;
  right: 1rem;
}
.Frame3465879 {
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  display: flex;
}
.Icon21 {
  width: 24px;
  height: 24px;
  position: relative;
}
.EdAidtAi {
  color: #4876ef;
  font-size: 13px;
  font-weight: 400;
  word-wrap: break-word;
}
.tit {
  background: rgba(0, 0, 0, 0.2);
  width: 2px;
}
.last {
  color: #5c667b;
  font-size: 13px;
  font-weight: 400;
  word-wrap: break-word;
}
.Frame3465877 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  background: #ccd0d6;
  border-radius: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
}
.out {
  color: white;
  font-size: 12px;
  font-weight: 400;
  word-wrap: break-word;
  cursor: pointer;
}
</style>
