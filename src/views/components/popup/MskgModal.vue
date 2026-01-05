<template>
  <div class="modal-container" v-if="isActive">
    <div
      class="pop"
      :style="{ width: alertModal.width, height: alertModal.height }"
    >
      <div class="pop-header">
        <span class="pop-title">
          <slot name="header">마스킹 해제</slot>
        </span>
        <div @click="isActive = false" class="close-btn">
          <img src="/images/Group111.svg" width="20rem" />
        </div>
      </div>
      <div
        class="pop-content "
        :style="{
          alignItems: alertModal.contentAlign,
          display: alertModal.display,
          width: alertModal.msgWidth,
          height: alertModal.msgHeight,
          overflow: alertModal.overflow,
        }"
      >
        <slot name="body">
          <div class="ct-3">
            <span>{{ alertModal.mskgSe }}</span>
          </div>
          <div class="ct-1">
            <textarea
              style="resize: none"
              maxlength="100"
              class=""
              v-model="alertModal.mskgRsn"
              rows="10"
              readonly
            ></textarea>
          </div>
        </slot>
      </div>
      <div class="pop-footer">
        <div class="pop-footer-btns">
          <button class="btn-1" @click="clickListener('close')">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { defineEmits, defineModel, defineProps } from "vue";

const props = defineProps({
  alertModal: {
    type: Object,
    required: false,
  },
});
const isActive = defineModel("isActive", {
  type: Boolean,
  default: false,
  required: false,
});

const emits = defineEmits([
  "onConfirmClick",
  "onReloadClick",
  "onMaskingClick",
  "onSubmitClick",
  "onRelocateClick",
  "onSearchClick",
  "onUpdateClick",
]);

function clickListener(v) {
  if (v == "close") {
    isActive.value = false;
  } else if (v == "confirm") {
    emits("onConfirmClick");
  } else if (v == "reload") {
    emits("onReloadClick");
  } else if (v == "masking") {
    emits("onMaskingClick");
  } else if (v == "submit") {
    emits("onSubmitClick");
  } else if (v == "relocate") {
    emits("onRelocateClick");
  } else if (v == "search") {
    emits("onSearchClick");
  } else if (v == "update") {
    emits("onUpdateClick");
  }
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
}

.pop {
  max-width: 95%;
  max-height: 95%;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: absolute;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 10px 16px 0px rgba(0, 0, 0, 0.08);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline;
}

.pop img {
  max-width: 50vw;
  max-height: 50vh;
}

.pop-header {
  width: 100%;
  height: 100%;
  max-height: 50px;
  flex-shrink: 0;
  background: var(--black, #373f57);
  color: #fff;
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
}

.close-btn {
  cursor: pointer;
}

.pop-title,
.close-btn {
  padding: 1rem;
}

.pop-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 80%;
  height: 100%;
  color: var(--black, #373f57);
  overflow: auto;
  text-align: center;
  font-family: SpoqaHanSansNeo;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;
  margin: 0 auto;
  vertical-align: middle;
  width: 100%;
  min-width: 18vw;
}

.pop-footer {
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  display: contents;
}

.pop-footer-btns {
  margin: 1rem 0;
}
</style>