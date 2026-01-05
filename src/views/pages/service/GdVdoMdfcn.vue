<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 안내 동영상 관리</p>
    <p class="heading">안내 동영상 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tbody>
        <tr>
          <th><span>No.</span></th>
          <td>
            <span>{{ gdVdoId }}</span>
          </td>
        </tr>
        <tr>
          <th><span>학과목</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="subjectList.map((item) => item.comCdNm)"
                v-model:selected="selectedSubjectNm"
                class="select-comp"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>대상</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <component
                :is="SelectComp"
                v-model:selected="gdVdoTrgt"
                :options="['교사용', '학생용']"
                style="width: fit-content"
              ></component>
              <!-- <button class="btn-3" @click="inquiryUiNm()">조회</button> -->
            </div>
          </td>
        </tr>
        <tr>
          <th><span>UI명</span><span class="text-red"> *</span></th>
          <td>
            <component
              :is="SelectComp"
              :options="uiList.map((item) => item.uiTtl)"
              v-model:selected="selectedUiNm"
              style="width: 15rem"
            ></component>
          </td>
        </tr>
        <tr>
          <th><span>제목</span><span class="text-red"> *</span></th>
          <td>
            <input
              type="text"
              v-model="gdVdoTtl"
              placeholder="제목을 입력하세요"
              style="display: inline-block; width: 800px"
            />
          </td>
        </tr>
        <tr>
          <th><span>게재 기간</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <component
                :is="SelectComp"
                v-model:selected="pblcnUseYn"
                :options="['기한없음', '기간설정']"
                @change="change()"
                style="width: fit-content"
              ></component>
              <div v-if="pblcnUseYn === '기간설정'">
                <calendar-comp
                  v-model:startDate="pblcnBgngYmd"
                  v-model:endDate="pblcnEndYmd"
                  :selectBox="false"
                ></calendar-comp>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th class="align-left">
            <span>파일첨부</span><span class="text-red"> *</span>
          </th>
          <td>
            <div
              v-if="
                atchFile === null || atchFile === undefined || atchFile === ''
              "
              style="
                vertical-align: middle;
                display: inline-flex;
                grid-gap: unset;
                align-items: center;
                align-content: center;
                line-height: 100%;
                align-self: center;
              "
            >
              <span>첨부된 파일이 없습니다</span>&emsp;
            </div>
            <div
              v-if="atchFile != null && atchFile != undefined && atchFile != ''"
              style="
                vertical-align: middle;
                display: inline-flex;
                grid-gap: unset;
                align-items: center;
                align-content: center;
                line-height: 100%;
                align-self: center;
              "
            >
              <img src="/images/icon06.svg" />
              <span>{{ atchFile.name }}</span
              >&nbsp;
              <img
                src="/images/icon07red.svg"
                class="clickable"
                @click="rmvFile()"
              />&emsp;
            </div>
            <div style="display: inline">
              <input
                type="file"
                id="upload-image"
                ref="fileInput"
                @change="handleFileChange"
                accept=".mp4,.avi,.wmv,.mkv,.mov,.mpeg,.webm"
                hidden
              />
              <label for="upload-image">
                <img src="/images/btnSelectFile.svg" class="clickable" />
              </label>
              <span class="text-red" style="margin-left: 10px"
                >* mp4, avi, wmv, mkv, mov, mpeg, webm 파일첨부 가능합니다</span
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
              v-model="gdVdoCn"
              maxlength="2000"
              placeholder="내용을 입력하세요"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">적용</button>
      <button class="btn-3" @click="router.push('/gdVdoMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push('/gdVdoMng')"
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
import { useUiStore } from "@/store/ui";
import CalendarComp from "@/views/components/Calendar.vue";
import SelectComp from "@/views/components/Select.vue";
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const alertModal = ref({
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

const gdVdoId = ref();
const alertPopupIsActive = ref(false);
const regPopupIsActive = ref(false);
const router = useRouter();

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const uiStore = useUiStore();
const { getUiCodeList } = uiStore;
const uiList = ref([]);
const selectedUiNm = ref();

const gdVdoTrgt = ref();
const gdVdoTtl = ref("");
const pblcnUseYn = ref("기한없음");
const pblcnBgngYmd = ref(null);
const pblcnEndYmd = ref(null);
const gdVdoCn = ref("");

const store = useFileStore();
const { fileCheck } = store;
const atchFileId = ref();
const fileInput = ref();
const atchFile = ref(null);
const originalAtchFile = ref();
let rmvFileList = [];

watch(gdVdoTrgt, async (newVal, oldVal) => {
  if (oldVal != null && oldVal != "" && selectedUiNm.value != undefined) {
    await getUiCodeList("/guidevideo", gdVdoTrgt, uiList, selectedUiNm);
  }
});

function handleFileChange(e) {
  const allowedExtensions = ["mp4", "avi", "wmv", "mkv", "mov", "mpeg", "webm"];
  const MAX_SIZE = 500;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
  }
}

const change = () => {
  if (pblcnUseYn.value == "기한없음") {
    pblcnBgngYmd.value = null;
    pblcnEndYmd.value = null;
  }
};

const rmvFile = () => {
  rmvFileList.push(atchFileId.value);
  fileInput.value.value = "";
  atchFile.value = null;
};

function invalidPopup() {
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
}

const check = () => {
  if (
    gdVdoTrgt.value == "" ||
    gdVdoTtl.value == "" ||
    pblcnUseYn.value == "" ||
    gdVdoCn.value == "" ||
    atchFile.value == null ||
    selectedSubjectNm.value == "" ||
    selectedUiNm.value == ""
  ) {
    invalidPopup();
    return;
  } else if (pblcnUseYn.value == "기간설정") {
    if (pblcnBgngYmd.value == null || pblcnEndYmd.value == null) {
      invalidPopup();
      return;
    }
  }
  regPopupIsActive.value = true;
};

const beforeTriggerSubmit = async () => {
  if (rmvFileList.length > 0) {
    for (let i = 0; i < rmvFileList.length; i++) {
      if (
        rmvFileList[i].atchFileId != undefined &&
        rmvFileList[i].atchFileId != null
      ) {
        try {
          await axios.get(`/atchFile/removeFile/` + rmvFileList[i].atchFileId);
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

  var guidevideoDto = {
    gdVdoId: gdVdoId.value,
    gdVdoTrgt: gdVdoTrgt.value == "교사용" ? "TCHR" : "STDNT",
    gdVdoTtl: gdVdoTtl.value,
    pblcnUseYn: pblcnUseYn.value == "기간설정" ? "Y" : "N",
    pblcnBgngYmd:
      pblcnUseYn.value == "기간설정"
        ? pblcnBgngYmd.value == ""
          ? null
          : pblcnBgngYmd.value
        : null,
    pblcnEndYmd:
      pblcnUseYn.value == "기간설정"
        ? pblcnEndYmd.value == ""
          ? null
          : pblcnEndYmd.value
        : null,
    gdVdoStts: "Y",
    gdVdoCn: gdVdoCn.value,
    uiId: uiList.value.find((item) => item.uiTtl == selectedUiNm.value).uiId,
    gdVdoSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };

  formData.append(
    "guidevideoDto",
    new Blob([JSON.stringify(guidevideoDto)], {
      type: "application/json",
    })
  );

  try {
    await axios.post("/guidevideo/modify", formData, {
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
      }
    }
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/gdVdoMng");
  } else {
    gdVdoId.value = history.state.id;
    let gvDto = {
      gdVdoId: history.state.id,
      maskFlag: false,
    };
    try {
      const response = await axios.post(`/guidevideo/detail`, gvDto);
      const guidevideoDto = response.data.guidevideoDto;
      if (guidevideoDto.gdVdoTrgt == "TCHR") {
        gdVdoTrgt.value = "교사용";
      } else if (guidevideoDto.gdVdoTrgt == "STDNT") {
        gdVdoTrgt.value = "학생용";
      }
      gdVdoTtl.value = guidevideoDto.gdVdoTtl;
      if (guidevideoDto.pblcnUseYn == "N") {
        pblcnUseYn.value = "기한없음";
      } else if (guidevideoDto.pblcnUseYn == "Y") {
        pblcnUseYn.value = "기간설정";
        pblcnBgngYmd.value = guidevideoDto.pblcnBgngYmd;
        pblcnEndYmd.value = guidevideoDto.pblcnEndYmd;
      }
      if (response.data.atchFileDtoList.length > 0) {
        originalAtchFile.value = response.data.atchFileDtoList[0];
        atchFile.value = Object.assign({}, response.data.atchFileDtoList[0], {
          atchFileId: response.data.atchFileDtoList[0].atchFileId,
          name: response.data.atchFileDtoList[0].atchFileNm,
          url: response.data.atchFileDtoList[0].atchFileLink,
        });
        atchFileId.value = response.data.atchFileDtoList[0].atchFileId;
      }
      gdVdoCn.value = guidevideoDto.gdVdoCn;
      await getTextbookCodeList(subjectList, selectedSubjectNm);
      await getUiCodeList("/guidevideo", gdVdoTrgt, uiList, selectedUiNm);
      selectedSubjectNm.value = guidevideoDto.comCdNm;
      selectedUiNm.value = guidevideoDto.uiTtl;
    } catch (error) {
      if (error.response.status != null) {
        router.push("/gdVdoMng");
      }
    }
  }
};

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}

textarea,
textarea:hover,
textarea:focus {
  width: 80% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}

table {
  justify-content: center;
}

.select-box {
  width: 30%;
}

.clickable {
  cursor: pointer;
}
</style>