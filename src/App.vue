<template>
  <div class="divc1" v-if="router.currentRoute.value.meta.requiresAuth">
    <Header></Header>
    <div class="main-ct">
      <div class="main" :style="{ gridTemplateColumns: collapseSt }">
        <GNB :key="`component-${$route.path}`" v-model:collapse="collapse"></GNB>
        <div class="contents">
          <div class="contents-inner" style="overflow-x: auto">
            <Transition>
              <RouterView v-if="true" style="margin: 1rem 1rem 5rem 1rem"></RouterView>
            </Transition>
            <loading-spinner v-if="!router.currentRoute.value.path.includes('/main')"
              v-model:isActive="loading"></loading-spinner>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <div class="divc1" v-else-if="router.currentRoute.value.path.includes('/signUp')">
    <Header></Header>
    <div class="main-ct">
      <div class="main">
        <div class="contents">
          <div class="contents-inner">
            <Transition>
              <RouterView v-if="true" style="margin: 1rem 1rem 5rem 1rem"></RouterView>
            </Transition>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <div class="divc2" v-else>
    <div class="main">
      <div class="contents">
        <div class="contents-inner">
          <Transition>
            <RouterView v-if="true"></RouterView>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "@/store/toast";
import LoadingSpinner from "@/views/components/Loading.vue";
import { useFavicon } from "@vueuse/core";
import { inject, onUpdated, provide, ref, watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import Footer from "./views/components/Footer.vue";
import GNB from "./views/components/GNB.vue";
import Header from "./views/components/Header.vue";
import fav from "/images/logo/fav.svg";
const router = useRouter();
const loading = inject("loadingSpinnerIsActive");
const collapse = ref(false);
const collapseSt = ref("1fr 10fr");
const store = useToastStore();
provide("toast", store);
watch(collapse, (newVal) => {
  if (newVal) {
    collapseSt.value = "1fr 45fr";
  } else {
    collapseSt.value = "1fr 10fr";
  }
});
document.title = "ooooAIDT 통합관리시스템";
const icon = useFavicon();
icon.value = fav;
onUpdated(async () => {
  var inputs = Array.from(document.getElementsByTagName("input")).filter(
    (el) => el.type == "email"
  );
  if (inputs.length > 0) {
    inputs[0].focus();
  } else {
    inputs = Array.from(document.getElementsByTagName("input")).filter(
      (el) => el.type == "password"
    );
    if (inputs.length > 0) {
      inputs[0].focus();
    } else {
      inputs = Array.from(document.getElementsByTagName("input")).filter(
        (el) => el.type == "text"
      );
      if (inputs.length > 0 && router.currentRoute.value.path !== "/sysMntr") {
        inputs[0].focus();
      }
    }
  }
});
</script>

<style>
@import url("/custom.css");

.v-enter-active,
.v-leave-active {
  transition: opacity 1s 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.popup-transition-enter-active,
.popup-transition-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.popup-transition-enter-from,
.popup-transition-leave-to {
  opacity: 0;
}

html,
body {
  all: unset;
  font-family: SpoqaHanSansNeoRegular;
}

#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

.divc1 {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8% 92%;
}

.divc2 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.main-ct {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.main {
  display: grid;
  overflow: hidden;
  height: 95%;
  width: 100%;
  min-height: fit-content;
}

.contents {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  box-shadow: 1px 4px 4px #0000002b;
}

.contents-inner {
  width: 100%;
  height: 100%;
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  background: #39adff33 !important;
  color: #526fa5 !important;
  font-family: unset !important;
}

.Toastify__toast-body {
  font-size: smaller !important;
  gap: 0.4rem !important;
}
</style>
