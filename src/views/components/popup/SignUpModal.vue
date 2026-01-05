<template>
  <Transition name="popup-transition">
    <modal-comp
      @on-confirm-click="onConfirm"
      @on-reload-click="onReload"
      @on-update-click="onUpdate"
      @on-masking-click="onMasking"
      @on-relocate-click="onRelocate"
      @on-submit-click="onSubmit"
      :alertModal="alertModal"
      v-if="isActive"
      v-model:isActive="isActive"
    >
      <template #header>
        <div v-if="alertModal.masking"><h4>마스킹 해제</h4></div>
        <div v-else v-html="alertModal.headerHtml"></div>
      </template>
      <template #body v-if="!alertModal.masking">
        <div class="ct-2" v-html="alertModal.bodyHtml"></div>
      </template>
      <template #masking v-else>
        <div class="ct-3">
          <span
            >요청자({{ alertModal.loginUser }}) 마스킹 해제 사유 입력 :</span
          >
        </div>
        <div class="ct-1">
          <textarea
            style="resize: none"
            maxlength="100"
            class=""
            v-model="msg"
            rows="10"
          ></textarea>
        </div>
      </template>
    </modal-comp>
  </Transition>
</template>


<script setup lang="ts">
import { defineModel, defineProps, ref, watch } from "vue";
import ModalComp from "../Pop.vue";
const isActive = defineModel("isActive", {
  type: Boolean,
  required: false,
  default: false,
});
const emits = defineEmits([
  "onConfirmHandler",
  "onReloadHandler",
  "onMaskingHandler",
  "onRelocateHandler",
  "onSubmitHandler",
  "onUpdateHandler",
]);
const props = defineProps({
  alertModal: {
    type: Object,
    required: false,
  },
});
const msg = ref("");
watch(isActive, (v) => {
  if (v) {
    msg.value = "";
  } else if (props.alertModal.masking) {
    props.alertModal.masking = false;
  }
});

function onConfirm() {
  isActive.value = false;
  emits("onConfirmHandler", props.alertModal.stts);
}
function onReload() {
  isActive.value = false;
  emits("onReloadHandler");
}
function onMasking() {
  isActive.value = false;
  emits("onMaskingHandler", msg.value);
}
function onRelocate() {
  isActive.value = false;
  emits("onRelocateHandler");
}
function onSubmit() {
  isActive.value = false;
  emits("onSubmitHandler");
}
function onUpdate() {
  isActive.value = false;
  emits("onUpdateHandler");
}
</script>

<style scoped>
input[type="text"] {
  width: 100%;
}
</style>
