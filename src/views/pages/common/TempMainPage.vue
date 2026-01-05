<template>
  <div
    style="
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      display: flex;
      padding: 0 !important;
    "
  >
    <div
      style="
        width: 100%;
        height: 100%;
        vertical-align: middle;
        align-content: center;
        margin: 0 auto;
        position: absolute;
        left: 0;
        top: 0;
      "
    >
      <div
        style="
          align-content: center;
          top: 30%;
          left: 40%;
          width: fit-content;
          height: fit-content;
          position: fixed;
          text-align: -webkit-center;
        "
      >
        <div class="err-5"></div>
        <div class="err-text">AIDT 통합관리시스템에 접속하였습니다.</div>
        <div calss="err-text-inner">
          권한이 없는 경우 접근이 제한됩니다.
          <br />
          권한 요청은 관리자에게 문의해 주세요.
          <br />
          <br />
          (service@oooa.com)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
import { onMounted } from "vue";
onMounted(() => {
  if (
    document.cookie.split("; ").filter((el) => el.startsWith("UserInfo="))[0] ==
    null
  ) {
    router.push("/login");
  }
});
</script>

<style scoped>
.err-text {
  width: 469px;
  height: 80px;

  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  /* or 143% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  /* black */
  color: #373f57;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 1rem;
}

.err-text-inner {
  width: 325px;
  height: 44px;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-top: 1rem;
  line-height: 100%;
  /* or 157% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  /* black */
  color: #373f57;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
