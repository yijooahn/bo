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
      <div style="padding: 1rem">
        <div style="padding: 0.3rem; text-align: left">
          <table class="table-1">
            <tbody>
              <tr>
                <th>
                  <span>No.</span>
                </th>
                <td>
                  <div>
                    <span>{{ alertModal.no }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th><span>구분</span></th>
                <td>
                  <div>
                    <span v-if="dto.fileSe == 1">자료함</span>
                    <span v-else-if="dto.fileSe == 2">교사(과제)</span>
                    <span v-else-if="dto.fileSe == 3">학생(과제)</span>
                    <span v-else-if="dto.fileSe == 4">교사(활동)</span>
                    <span v-else-if="dto.fileSe == 5">학생(활동)</span>
                    <span v-else-if="dto.fileSe == 6"
                      >교사/학생(프로필이미지)</span
                    >
                    <span v-else>기타</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th><span>파일명</span></th>
                <td>
                  <div style="grid-gap: unset">
                    <span>
                      <img src="/images/icon06.svg" width="18px" />
                    </span>
                    <span>
                      <span
                        class="cs-p"
                        @click="downloadFile(dto.atchFileLink, dto.atchFileNm)"
                      >
                        {{ dto.atchFileNm }}
                      </span>
                    </span>
                  </div>
                  <div style="justify-content: center; width: 100%">
                    <img
                      width="300px"
                      height="200px"
                      v-if="dto.imgPath != undeifned"
                      :src="dto.imgPath"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <span>상태</span>
                </th>
                <td>
                  <span v-if="dto.fileStts == 1">노출</span>
                  <span v-else class="text-red">강제비노출</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>등록일시</span>
                </th>
                <td>
                  <span>{{ dto.regDt }}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>등록자</span>
                </th>
                <td>
                  <span>{{ dto.userUuid }}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>소속</span>
                </th>
                <td>
                  <span>{{ dto.userOgdp }}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <!--   <div class="ct-17">
                        <button class="btn-1" @click="triggerSubmit">수정</button>
                        <button class="btn-3" @click="router.push('/accountMng')">취소</button>
                    </div>
                -->
        </div>
      </div>
    </template>
  </modal-comp>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import axios from "axios";
import { defineEmits, defineModel, defineProps, inject, ref, watch } from "vue";
import ModalComp from "../Pop.vue";
const detailMaskingFlag = inject("detailMaskingFlag");
const store = useFileStore();
const { downloadFile } = store;
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
const dto = ref({});
const msg = ref("");
watch(isActive, async (v) => {
  if (v) {
    var fDto = {};
    fDto.fileMntrId = props.alertModal.currentId;
    fDto.maskFlag = detailMaskingFlag.value;

    try {
      const response = await axios.post("/filemonitor/detail", fDto);
      if (response.status != null) {
        dto.value = response.data.fileMonitorPopDto;
        setTimeout(() => {
          if (dto.value.atchFileLink != "") {
            dto.value.downloadPath = dto.value.atchFileLink;
            if (
              dto.value.atchFileLink.includes(".png") ||
              dto.value.atchFileLink.includes(".jpg") ||
              dto.value.atchFileLink.includes(".svg") ||
              dto.value.atchFileLink.includes(".gif")
            ) {
              dto.value.imgPath = dto.value.atchFileLink;
            } else {
              dto.value.imgPath = undefined;
            }
          } else if (dto.value.thumbNailLink != "") {
            dto.value.downloadPath = dto.value.thumbNailLink;
            if (
              dto.value.thumbNailLink.includes(".png") ||
              dto.value.thumbNailLink.includes(".jpg") ||
              dto.value.thumbNailLink.includes(".svg") ||
              dto.value.thumbNailLink.includes(".gif")
            ) {
              dto.value.imgPath = dto.value.thumbNailLink;
            } else {
              dto.value.imgPath = undefined;
            }
          }
        }, 600);
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
