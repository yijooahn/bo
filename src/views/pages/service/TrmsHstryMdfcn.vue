<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 약관 이력 관리</p>
    <p class="heading">약관 상세정보 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>
          <span>{{ trmsId }}</span>
        </td>
      </tr>
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
        <th><span>현황</span></th>
        <td>
          <span v-if="trmsStts == 'Y'" class="text-red">현재버전</span>
          <span v-else>종료</span>
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
      <button class="btn-1" @click="check()">적용</button>
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
      @onSubmitHandler="beforeTriggerSubmit()"
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
  bodyHtml: "<span>수정 사항을 적용하시겠습니까?</span>",
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

const trmsId = ref();
const trmsSeId = ref();
const esntlSeId = ref();
const trmsPstgYmd = ref();
const trmsStts = ref();
const trmsCn = ref();
const fileInput = ref();
const atchFile = ref(null);
const originalAtchFile = ref();
let rmvFileList = [];

function handleFileChange(e) {
  const allowedExtensions = ["html"];
  const MAX_SIZE = 30;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
  }
}

const rmvFile = () => {
  rmvFileList.push(atchFile.value);
  atchFile.value = null;
};

const check = async () => {
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
    regModal.value.bodyHtml = "<span>수정 사항을 적용하시겠습니까?</span>";
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
  }
};

const beforeTriggerSubmit = async () => {
  if (rmvFileList.length > 0) {
    for (let i = 0; i < rmvFileList.length; i++) {
      if (
        rmvFileList[i].atchFileId != undefined &&
        rmvFileList[i].atchFileId != null
      ) {
        try {
          await axios.get("/atchFile/removeFile/" + rmvFileList[i].atchFileId);
        } catch (error) {
          alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          alertPopupIsActive.value = true;
          return;
        }
      }
    }
    triggerSubmit();
  } else {
    triggerSubmit();
  }
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let termsDto = {
    trmsId: trmsId.value,
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
    const response = await axios.post("/terms/modify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
  } catch (error) {
    if (error.response.status != null) {
      if (error.response.status == axios.HttpStatusCode.NotModified) {
        alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
        alertModal.value.buttons = [
          {
            clickEvent: "confirm",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        alertPopupIsActive.value = true;
      } else {
        alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
        alertModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        alertPopupIsActive.value = true;
        return;
      }
    }
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/trmsHstryMng");
  } else {
    trmsId.value = history.state.id;
    let trmsDto = {
      trmsId: trmsId.value,
      maskFlag: false,
    };

    await axios
      .post(`/terms/detail`, trmsDto)
      .then((response) => {
        let dto = response.data.termsDto;
        trmsSeId.value =
          dto.trmsSeId == "TOS"
            ? "이용약관"
            : "개인정보처리";
        esntlSeId.value =
          dto.esntlSeId == "EST"
            ? "필수"
            : dto.esntlSeId == "CHC"
            ? "선택"
            : "고지";
        trmsPstgYmd.value = dto.trmsPstgYmd;
        trmsStts.value = dto.trmsStts;
        trmsCn.value = dto.trmsCn;
        if (response.data.atchFileDtoList.length > 0) {
          originalAtchFile.value = response.data.atchFileDtoList[0];
          atchFile.value = Object.assign({}, response.data.atchFileDtoList[0], {
            name: response.data.atchFileDtoList[0].atchFileNm,
            url: response.data.atchFileDtoList[0].atchFileLink,
          });
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("/trmsHstryMng");
          }
        }
      });
  }
};

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
th,
td {
  font-weight: unset;
  font-style: unset;
  padding: 0.3rem !important;
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>