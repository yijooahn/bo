<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 장애대응체계 관리</p>
    <p class="heading">장애대응체계 등록</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>구분</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <component
                :is="Select"
                v-model:selected="obstlSe"
                :options="[
                  '긴급대응체계',
                  '장애모의훈련',
                  '모의해킹',
                  '보안취약점진단',
                  '기타',
                ]"
              ></component>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>제목</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                v-model.trim="obstlTtl"
                maxlength="100"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th><span>파일첨부</span><span class="text-red"> *</span></th>
          <td>
            <div style="display: flex">
              <div v-if="atchFile == null" style="align-self: center">
                <span>첨부된 파일이 없습니다</span>&emsp;
              </div>
              <div
                v-else
                style="
                  display: flex;
                  flex-direction: column;
                  align-self: center;
                "
              >
                <span
                  >{{ atchFile.name }}&nbsp;
                  <img
                    src="/images/icon07red.svg"
                    class="cs-p"
                    @click="rmvFile()"
                  />&emsp;
                </span>
              </div>
              <div>
                <input
                  type="file"
                  id="upload-image"
                  ref="fileInput"
                  @change="handleFileChange"
                  accept=".png, .jpg, .jpeg, .gif, .bmp, .hwp, .ppt, .pptx, .xlsx, .xls, .doc, .docx, .pdf"
                  hidden
                />
                <label for="upload-image" style="line-height: 100%">
                  <img src="/images/btnSelectFile.svg" class="cs-p" />
                </label>
              </div>
              <span
                class="text-red"
                style="margin-left: 10px; text-align: left; line-height: 20px"
              >
                * png, jpg, jpeg, gif, bmp <br />
                ppt, pptx, xlsx, xls, doc, docx, pdf 파일첨부 가능합니다
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td>
            <textarea
              class=""
              rows="20"
              v-model.trim="obstlCn"
              maxlength="2000"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">등록</button>
      <button class="btn-3" @click="router.push('/obstlRspdSysMng')">
        목록
      </button>
    </div>
    <reg-modal
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @onSubmitHandler="triggerSubmit()"
      @onConfirmHandler="router.push('/obstlRspdSysMng')"
    ></reg-modal>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import Select from "@/views/components/Select.vue";
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "submit",
      content: "예",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "아니오",
      addClass: "btn-2",
    },
  ],
});

const router = useRouter();
const popupIsActive = ref(false);
const store = useFileStore();
const { fileCheck } = store;

const obstlSe = ref("긴급대응체계");
const obstlTtl = ref("");
const obstlCn = ref("");
const fileInput = ref();
const atchFile = ref(null);

function handleFileChange(e) {
  const allowedExtensions = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "bmp",
    "hwp",
    "ppt",
    "pptx",
    "xlsx",
    "xls",
    "doc",
    "docx",
    "pdf",
  ];
  const MAX_SIZE = 30;
  fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile);
}

const rmvFile = () => {
  fileInput.value.value = "";
  atchFile.value = null;
};

const check = () => {
  if (obstlSe.value == "" || obstlTtl.value == "" || atchFile.value == null) {
    alertModal.value.bodyHtml =
      "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  } else {
    alertModal.value.bodyHtml = "<span>등록하시겠습니까?</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "submit",
        content: "예",
        addClass: "btn-1",
      },
      {
        clickEvent: "close",
        content: "아니오",
        addClass: "btn-2",
      },
    ];
    popupIsActive.value = true;
  }
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let obstlRspdSysDto = {
    obstlTtl: obstlTtl.value,
    obstlSe:
      obstlSe.value == "긴급대응체계"
        ? 1
        : obstlSe.value == "장애모의훈련"
        ? 2
        : obstlSe.value == "모의해킹"
        ? 3
        : obstlSe.value == "보안취약점진단"
        ? 4
        : 5,
    obstlCn: obstlCn.value,
  };
  formData.append(
    "obstlRspdSysDto",
    new Blob([JSON.stringify(obstlRspdSysDto)], {
      type: "application/json",
    })
  );

  try {
    const response = await axios.post("/obstacle/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
};

onMounted(() => {});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}
</style>