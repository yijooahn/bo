<template>
  <Modal :alertModal="alertModal" v-if="isActive" v-model:isActive="isActive">
    <template #header>
      <div v-html="alertModal.headerHtml"></div>
    </template>
    <template #body>
      <div style="padding: 20px">
        <table>
          <colgroup>
            <col width="10%" />
            <col width="90%" />
          </colgroup>

          <tr>
            <th>파일명</th>
            <td>
              <a
                style="text-decoration: underline"
                @click="downloadFile(atchFileLink, atchFileNm)"
                >{{ atchFileNm }}</a
              >
            </td>
          </tr>
          <tr style="height: 400px">
            <th>미리보기</th>
            <td style="width: 1rem">
              <img style="width: 60rem; height: 30rem" :src="atchFileLink" />
            </td>
          </tr>
        </table>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import { defineModel, defineProps, ref, watch } from "vue";
import Modal from "../Pop.vue";
const store = useFileStore();
const { downloadFile } = store;
const isActive = defineModel("isActive", {
  type: Boolean,
  required: false,
  default: false,
});

const props = defineProps({
  alertModal: Object,
});

const atchFileNm = ref();
const atchFilePath = ref();
const atchFileLink = ref();

watch(isActive, (v) => {
  if (v) {
    let atchFile = props.alertModal.atchFile;
    atchFileNm.value = atchFile.atchFileNm;
    atchFilePath.value = atchFile.atchFilePath;
    atchFileLink.value = atchFile.atchFileLink;
  }
});
</script>

<style scoped>
</style>