<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 서비스 공지사항 관리</p>
    <p class="heading">서비스 공지사항 수정</p>
    <br />
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>
          <span>{{ srvcNtcId }}</span>
        </td>
      </tr>
      <tr>
        <th><span>학과목</span><span class="text-red">*</span></th>
        <td>
          <div>
            <component
              :is="Select"
              :options="subjectList.map((item) => item.comCdNm)"
              v-model:selected="selectedSubjectNm"
              class="select-comp"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>대상</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="Select"
              v-model:selected="srvcNtcTrgt"
              :options="['공통', '교사용', '학생용']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>제목</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            style="display: inline-block; width: 800px"
            placeholder="제목을 입력하세요"
            v-model="srvcNtcTtl"
            maxlength="100"
          />
        </td>
      </tr>
      <tr>
        <th><span>노출여부</span><span class="text-red"> *</span></th>
        <td>
          <div style="display: inline-flex; margin-right: 10px">
            <component
              :is="Select"
              v-model:selected="expsrMthd"
              :options="['노출', '기간노출', '비노출']"
            ></component>
          </div>
          <div v-if="expsrMthd === '기간노출'" style="display: inline-flex">
            <input type="date" v-model="expsrBgngYmd" :max="maxDate" />
            <span style="align-self: center; padding: 0 1rem">~</span>
            <input type="date" v-model="expsrEndYmd" :max="maxDate" />
          </div>
        </td>
      </tr>
      <tr>
        <th><span>상단고정 여부</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="Select"
              v-model:selected="uptFixYn"
              :options="['고정', '고정아님']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td>
          <div v-if="atchFile != null" class="dp-if">
            <span>{{ atchFile.name }}</span
            ><img
              src="/images/icon07red.svg"
              class="cs-p"
              @click="rmvFile()"
            />&emsp;
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
              accept=".png, .jpg, .jpeg, .gif, .bmp"
              hidden
            />
            <label for="upload-image" style="line-height: 100%">
              <img src="/images/btnSelectFile.svg" class="cs-p" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th><span>내용</span><span class="text-red"> *</span></th>
        <td>
          <textarea
            class=""
            rows="10"
            v-model="srvcNtcCn"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">적용</button>
      <button class="btn-3" @click="router.push('/srvcNtcMttrMng')">
        목록
      </button>
    </div>
    <reg-modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push('/srvcNtcMttrMng')"
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
import { useTextbookStore } from "@/store/textbook";
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

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const srvcNtcId = ref();
const srvcNtcTrgt = ref();
const srvcNtcTtl = ref();
const expsrMthd = ref();
const uptFixYn = ref();
const srvcNtcCn = ref();
const expsrBgngYmd = ref();
const expsrEndYmd = ref();
const maxDate = "2100-12-31";
const fileInput = ref();
const atchFile = ref(null);
const originalAtchFile = ref();
let rmvFileList = [];

function handleFileChange(e) {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
  const MAX_SIZE = 30;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
  }
}

const rmvFile = () => {
  rmvFileList.push(atchFile.value);
  fileInput.value.value = "";
  atchFile.value = null;
};

const check = async () => {
  if (
    srvcNtcTrgt.value === undefined ||
    srvcNtcTtl.value === undefined ||
    expsrMthd.value === undefined ||
    srvcNtcCn.value === undefined ||
    srvcNtcTrgt.value === null ||
    srvcNtcTtl.value === null ||
    expsrMthd.value === null ||
    srvcNtcCn.value === null ||
    srvcNtcTrgt.value === "" ||
    srvcNtcTtl.value === "" ||
    expsrMthd.value === "" ||
    srvcNtcCn.value === "" ||
    selectedSubjectNm.value == "" ||
    selectedSubjectNm.value == "선택"
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
  } else if (
    expsrMthd.value == "기간노출" &&
    (expsrBgngYmd.value == "" ||
      expsrBgngYmd.value == null ||
      expsrEndYmd.value == "" ||
      expsrEndYmd.value == null)
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
        await axios.get("/atchFile/removeFile/" + rmvFileList[i].atchFileId);
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

  if (expsrMthd.value == "노출" || expsrMthd.value == "비노출") {
    expsrBgngYmd.value = null;
    expsrEndYmd.value = null;
  }

  let servicenoticeDto = {
    srvcNtcId: srvcNtcId.value,
    srvcNtcTrgt:
      srvcNtcTrgt.value == "공통"
        ? "COM"
        : srvcNtcTrgt.value == "교사용"
        ? "TCHR"
        : "STDNT",
    srvcNtcTtl: srvcNtcTtl.value,
    expsrMthd:
      expsrMthd.value == "노출"
        ? "Y"
        : expsrMthd.value == "기간노출"
        ? "P"
        : "N",
    uptFixYn: uptFixYn.value == "고정" ? "Y" : "N",
    srvcNtcCn: srvcNtcCn.value,
    expsrBgngYmd: expsrBgngYmd.value,
    expsrEndYmd: expsrEndYmd.value,
    srvcNtcSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };

  formData.append(
    "servicenoticeDto",
    new Blob([JSON.stringify(servicenoticeDto)], {
      type: "application/json",
    })
  );

  try {
    await axios.post("/servicenotice/modify", formData, {
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
    router.push("/srvcNtcMttrMng");
  } else {
    srvcNtcId.value = history.state.id;
    let serviceNoticeDto = {
      srvcNtcId: srvcNtcId.value,
      maskFlag: false,
    };

    await axios
      .post(`/servicenotice/detail`, serviceNoticeDto)
      .then((response) => {
        let dto = response.data.servicenoticeDto;
        selectedSubjectNm.value = dto.comCdNm;
        srvcNtcTrgt.value =
          dto.srvcNtcTrgt == "COM"
            ? "공통"
            : dto.srvcNtcTrgt == "TCHR"
            ? "교사용"
            : "학생용";
        srvcNtcTtl.value = dto.srvcNtcTtl;
        expsrMthd.value =
          dto.expsrMthd == "Y"
            ? "노출"
            : dto.expsrMthd == "P"
            ? "기간노출"
            : "비노출";
        if (expsrMthd.value === "기간노출") {
          expsrBgngYmd.value = dto.expsrBgngYmd;
          expsrEndYmd.value = dto.expsrEndYmd;
        }
        uptFixYn.value = dto.uptFixYn == "Y" ? "고정" : "고정아님";
        srvcNtcCn.value = dto.srvcNtcCn;
        if (response.data.atchFileDtoList.length > 0) {
          originalAtchFile.value = response.data.atchFileDtoList[0];
          atchFile.value = Object.assign({}, response.data.atchFileDtoList[0], {
            name: response.data.atchFileDtoList[0].atchFileNm,
            url: response.data.atchFileDtoList[0].atchFileLink,
          });
        }
      })
      .catch((error) => {
        router.push("/srvcNtcMttrMng");
      });
  }
};

onMounted(async () => {
  await getTextbookCodeList(subjectList, selectedSubjectNm);
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>