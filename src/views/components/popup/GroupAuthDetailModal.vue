<template>
  <modal-comp
    @on-confirm-click="onConfirm"
    @on-reload-click="onReload"
    @on-masking-click="onMasking"
    @on-relocate-click="onRelocate"
    :alertModal="alertModal"
    v-if="isActive"
    v-model:isActive="isActive"
  >
    <template #header>
      <div v-html="alertModal.headerHtml"></div>
    </template>
    <template #body>
      <div class="ct-2">
        <div
          style="padding: 0.3rem; text-align: left"
          v-if="menuList.length > 0"
        >
          <select multiple class=" select-multiple">
            <option v-for="(menu, idx) in menuList" :key="idx">
              {{ menu }}
            </option>
          </select>
        </div>
      </div>
    </template>
  </modal-comp>
</template>

<script setup lang="ts">
import axios from "axios";
import { defineEmits, defineModel, defineProps, ref, watch } from "vue";
import ModalComp from "../Pop.vue";
const menuList = ref([]);
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
]);
const props = defineProps({
  alertModal: {
    type: Object,
    required: false,
  },
});
const msg = ref("");

watch(isActive, async (v) => {
  if (v) {
    try {
      menuList.value = [];
      const response = await axios.get(
        `/authoritygroup/detail/${props.alertModal.id}`
      );
      if (response.data != null) {
        if (response.data.menuList.length > 0) {
          for (var i = 0; i < response.data.menuList.length; i++) {
            menuList.value.push(response.data.menuList[i].menuNm);
          }
        }
      }
    } catch (err) {
      if (err.repsonse != null) {
        if (err.response.status != null) {
          if (err.response.status == 404) {
            isActive.value = false;
          }
        }
      }
    }
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
</script>

    
<style scoped>
input[type="text"] {
  width: 100%;
}
</style>
