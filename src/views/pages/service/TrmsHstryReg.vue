<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 약관 이력 관리</p>
    <p class="heading">약관 등록</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>약관구분</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              style="width: 20%"
              :is="Select"
              v-model:selected="trmsSeId"
              :options="['이용약관', '개인정보처리']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>필수여부</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="Select"
              v-model:selected="esntlSeId"
              :options="['필수', '선택', '고지']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>약관게시일</span><span class="text-red"> *</span></th>
        <td>
          <input type="date" max="9999-12-31" v-model="trmsPstgYmd" />
        </td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td>
          <div v-if="atchFile != null" class="dp-if">
            <span
              >{{ atchFile.name }}&nbsp;
              <img
                src="/images/icon07red.svg"
                class="cs-p"
                @click="rmvFile()"
              />&emsp;
            </span>
          </div>
          <div v-if="atchFile === null" class="dp-if">
            <span>첨부된 파일이 없습니다</span>&emsp;
          </div>
          <div style="display: inline">
            <input
              type="file"
              id="upload-image"
              ref="fileInput"
              @change="handleFileChange"
              accept=".html"
              hidden
            />
            <label for="upload-image" style="line-height: 100%">
              <img src="/images/btnSelectFile.svg" class="cs-p" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* html 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th><span>약관 변경 내용</span></th>
        <td>
          <textarea
            class=""
            rows="10"
            v-model="trmsCn"
            maxlength="20000"
          ></textarea>
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">등록</button>
      <button class="btn-3" @click="router.push('/trmsHstryMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push('/trmsHstryMng')"
    ></reg-modal>
    <reg-modal
      v-model:isActive="regPopupIsActive"
      :alertModal="regModal"
      @onSubmitHandler="triggerSubmit()"
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
  bodyHtml:
    "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ],
});

const regModal = ref({
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
const alertPopupIsActive = ref(false);
const regPopupIsActive = ref(false);
const store = useFileStore();
const { fileCheck } = store;

const trmsSeId = ref("이용약관");
const esntlSeId = ref("필수");
const trmsPstgYmd = ref(new Date().toJSON().slice(0, 10));
const trmsCn = ref();
const atchFile = ref(null);
const fileInput = ref();

function handleFileChange(e) {
  const allowedExtensions = ["html"];
  const MAX_SIZE = 30;
  fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile);
}

const rmvFile = () => {
  fileInput.value.value = "";
  atchFile.value = null;
};

const check = () => {
  if (
    trmsSeId.value === undefined ||
    esntlSeId.value === undefined ||
    trmsPstgYmd.value === undefined ||
    trmsSeId.value === null ||
    esntlSeId.value === null ||
    trmsPstgYmd.value === null ||
    trmsSeId.value === "" ||
    esntlSeId.value === "" ||
    trmsPstgYmd.value === ""
  ) {
    alertModal.value.bodyHtml =
      "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    return;
  } else {
    beforeTriggerSubmit();
  }
};

const beforeTriggerSubmit = () => {
  regModal.value.bodyHtml = "<span>등록하시겠습니까?</span>";
  regModal.value.buttons = [
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
  regPopupIsActive.value = true;
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let termsDto = {
    trmsSeId:
      trmsSeId.value == "이용약관"
        ? "TOS"
        : trmsSeId.value == "개인정보처리"
        ? "PRH"
        : "ORP",
    esntlSeId:
      esntlSeId.value == "필수"
        ? "EST"
        : esntlSeId.value == "선택"
        ? "CHC"
        : "NTC",
    trmsPstgYmd: trmsPstgYmd.value,
    trmsCn: trmsCn.value,
  };
  formData.append(
    "termsDto",
    new Blob([JSON.stringify(termsDto)], {
      type: "application/json",
    })
  );

  try {
    const response = await axios.post("/terms/create", formData, {
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
    alertPopupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
  }
};

onMounted(() => {});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>