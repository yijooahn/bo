<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 코치마크 관리</p>
    <p class="heading">코치마크 수정</p>
    <div class="tit-container" style="margin-top: 2rem">
      <div class="tit"></div>
      <label>기본 정보</label>
    </div>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <span>No.</span>
          </th>
          <td>
            <span>{{ currentId }}</span>
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
          <th><span>대상</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="['교사용', '학생용']"
                v-model:selected="coachMarkTrgt"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>화면명</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="scrnList.map((item) => item.scrnTtl)"
                v-model:selected="selectedScrnNm"
                style="width: 15rem"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>제목</span><span class="text-red">*</span></th>
          <td>
            <span>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                maxlength="100"
                v-model="coachMarkTtl"
              />
            </span>
          </td>
        </tr>
        <tr>
          <th><span>게재 기간</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="['기한없음', '기간설정']"
                v-model:selected="pblcnUseYn"
              ></select-comp>
              <calendar-comp
                v-if="pblcnUseYn == '기간설정'"
                v-model:startDate="pblcnBgngYmd"
                v-model:endDate="pblcnEndYmd"
                :selectBox="false"
              ></calendar-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>파일첨부</span><span class="text-red">*</span></th>
          <td>
            <div class="dp-b">
              <div class="dp-f">
                <span v-if="fileList.length == 0" style="margin: 0 0.5rem"
                  >첨부된 파일이 없습니다</span
                >
                <input
                  type="file"
                  ref="uploadFiles"
                  id="upload-files"
                  accept=".png, .jpg, .jpeg, .gif, .bmp"
                  @change="fileChange"
                  multiple
                  hidden
                />
                <label for="upload-files" style="line-height: 100%">
                  <img src="/images/btnSelectFile.svg" class="cs-p" />
                </label>
                <span class="text-red"
                  >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
                >
              </div>
              <table v-if="fileList.length > 0">
                <tbody>
                  <tr v-for="(file, idx) in fileList" :key="idx">
                    <td
                      style="width: 50px; text-align: center"
                      v-if="fileList.length > 1"
                    >
                      <img
                        src="/images/icon37.svg"
                        v-if="idx > 0"
                        @click="changeOrder(-1, idx)"
                        class="cs-p"
                      />
                      <img
                        src="/images/icon36.svg"
                        v-if="idx + 1 < fileList.length"
                        @click="changeOrder(1, idx)"
                        class="cs-p"
                      />
                    </td>
                    <td>
                      <div style="grid-gap: 0.1rem">
                        <span>{{ file.name }}</span>
                        <img
                          src="/images/icon07red.svg"
                          @click="removeFile(file)"
                          style="cursor: pointer; width: 15px; height: 15px"
                        />
                      </div>
                    </td>
                    <td style="width: 180px">
                      <div style="justify-content: center">
                        <img
                          width="160px"
                          style="max-height: 200px"
                          v-if="fileList.length > 0"
                          :src="file.url"
                          :alt="file.name"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>이미지 설명<span class="text-red"> *</span></span>
                        <input
                          type="text"
                          v-model="file.description"
                          placeholder="등록할 이미지의 설명을 입력해 주세요."
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>내용</span><span class="text-red">*</span></th>
          <td>
            <div>
              <textarea
                class=""
                rows="10"
                v-model="coachMarkCn"
                maxlength="2000"
              ></textarea>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="ct-17">
        <button class="btn-1" @click="save">적용</button>
        <button class="btn-3" @click="router.push('/coachMarkMng')">
          목록
        </button>
      </div>
    </div>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      :is="AlertModalComp"
      @on-confirm-handler="router.push('/coachMarkMng')"
      @on-submit-handler="beforeTriggerSubmit()"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import { useTextbookStore } from "@/store/textbook";
import { useUiStore } from "@/store/ui";
import CalendarComp from "@/views/components/Calendar.vue";
import AlertModalComp from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

const detailMaskingFlag = inject("detailMaskingFlag");
const uploadFiles = ref();
const currentId = ref(0);

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const uiStore = useUiStore();
const { getUiCodeList } = uiStore;
const scrnList = ref([]);
const selectedScrnNm = ref();

const coachMarkTrgt = ref("");
const coachMarkTtl = ref("");
const pblcnUseYn = ref("");
const pblcnBgngYmd = ref();
const pblcnEndYmd = ref();
const coachMarkCn = ref("");
const fileList = ref([]);
const popupIsActive = ref(false);

const beforeFileList = ref([]);
const willBeRemoveFileList = ref([]);
const successPopup = ref(false);
const failPopup = ref(false);
const store = useFileStore();
const { fileCheckImages } = store;

watch(successPopup, (v) => {
  if (v) {
    failPopup.value = false;
    alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
});

watch(failPopup, (v) => {
  if (v) {
    successPopup.value = false;
    alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
});

watch(coachMarkTrgt, async (newVal, oldVal) => {
  if (oldVal != null && oldVal != "" && selectedScrnNm.value != undefined) {
    await getUiCodeList("/coachmark", coachMarkTrgt, scrnList, selectedScrnNm);
  }
});

function fileChange(e) {
  fileCheckImages(e, uploadFiles, 30, fileList);
}

async function beforeTriggerSubmit() {
  if (willBeRemoveFileList.value.length > 0) {
    for (var i = 0; i < willBeRemoveFileList.value.length; i++) {
      try {
        const res = await axios.get(
          "/atchFile/removeFile/" + willBeRemoveFileList.value[i]
        );
        if (res && i == willBeRemoveFileList.value.length - 1) {
          triggerSubmit();
        }
      } catch (err) {
        successPopup.value = false;
        alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
        alertModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        popupIsActive.value = true;
      }
    }
  } else {
    triggerSubmit();
  }
}

function removeFile(file) {
  if (file.atchFileId != null) {
    if (!willBeRemoveFileList.value.includes(file.atchFileId)) {
      willBeRemoveFileList.value.push(file.atchFileId);
    }
    const temp = [];
    if (fileList.value.length > 0) {
      for (var i = 0; i < fileList.value.length; i++) {
        if (fileList.value[i].atchFileId != null) {
          if (fileList.value[i].atchFileId != file.atchFileId) {
            temp.push(fileList.value[i]);
          }
        } else {
          temp.push(fileList.value[i]);
        }
      }
      fileList.value = temp;
    }
  } else {
    const arr = Array.from(fileList.value).filter((el) => el.name == file.name);
    if (arr.length > 0) {
      if (fileList.value.length > 0) {
        const temp = [];
        for (var i = 0; i < fileList.value.length; i++) {
          if (fileList.value[i].name != file.name) {
            temp.push(fileList.value[i]);
          }
        }
        fileList.value = temp;
      }
    }
  }
}

function changeOrder(increment, idx) {
  const temp = fileList.value[idx + increment];
  fileList.value[idx + increment] = fileList.value[idx];
  fileList.value[idx] = temp;
}

function save() {
  var cnt = 0;
  if (fileList.value.length > 0) {
    for (var i = 0; i < fileList.value.length; i++) {
      var alt = null;
      alt = fileList.value[i].description;
      if (alt == null) {
        cnt++;
      } else if (alt == "") {
        cnt++;
      }
    }
  }
  if (
    cnt > 0 ||
    selectedSubjectNm.value == "" ||
    selectedScrnNm.value == "" ||
    coachMarkTrgt.value == "" ||
    coachMarkTtl.value == "" ||
    (pblcnUseYn.value == "Y" && pblcnBgngYmd.value == "") ||
    (pblcnUseYn.value == "Y" && pblcnEndYmd.value == "") ||
    coachMarkCn.value == ""
  ) {
    alertModal.headerHtml = "알림";
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
  } else {
    alertModal.headerHtml = "알림";
    alertModal.value.bodyHtml = "<span>수정 사항을 적용하시겠습니까?</span>";
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
}

async function triggerSubmit() {
  const altTextList = [];
  for (var i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].atchFileId == null) {
      altTextList.push(fileList.value[i].description);
    }
  }
  const coachMarkDto = {
    coachMarkTrgt: coachMarkTrgt.value == "교사용" ? "TCHR" : "STDNT",
    scrnId: scrnList.value.find((item) => item.scrnTtl == selectedScrnNm.value)
      .scrnId,
    coachMarkTtl: coachMarkTtl.value,
    pblcnUseYn: pblcnUseYn.value == "기간설정" ? "Y" : "N",
    //	'pblcnBgngYmd':pblcnUseYn.value=='기간설정'?pblcnBgngYmd.value:'',
    //	'pblcnEndYmd':pblcnUseYn.value=='기간설정'?pblcnEndYmd.value:'',
    coachMarkCn: coachMarkCn.value,
    coachMarkUseYn: "Y",
    coachMarkStts: "Y",
    coachMarkSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };
  if (altTextList.length > 0) {
    coachMarkDto.altTextList = altTextList;
  }
  coachMarkDto.coachMarkId = currentId.value;
  if (coachMarkDto.pblcnUseYn == "Y") {
    if (pblcnBgngYmd.value != "") {
      coachMarkDto.pblcnBgngYmd = pblcnBgngYmd.value;
    }
    if (pblcnEndYmd.value != "") {
      coachMarkDto.pblcnEndYmd = pblcnEndYmd.value;
    }
  }
  var formData = new FormData();
  for (var i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].atchFileId == null) {
      formData.append("atchFiles", fileList.value[i]);
    }
  }
  formData.append(
    "coachmarkDto",
    new Blob([JSON.stringify(coachMarkDto)], {
      type: "application/json",
    })
  );

  try {
    beforeFileList.value = fileList.value;
    const response = await axios.post("/coachmark/modify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    try {
      const result = await fetchData();
      if (result) {
        if (beforeFileList.value.length > 0) {
          const temp = [];
          for (var i = 0; i < beforeFileList.value.length; i++) {
            for (var j = 0; j < fileList.value.length; j++) {
              if (beforeFileList.value[i].name == fileList.value[j].name) {
                fileList.value[j].description =
                  beforeFileList.value[i].description;
                temp.push(fileList.value[j]);
                break;
              }
            }
          }
          beforeFileList.value = temp;
          const atchfiles = [];
          for (var i = 0; i < beforeFileList.value.length; i++) {
            for (var i = 0; i < beforeFileList.value.length; i++) {
              var obj = {};
              obj.atchFileId = beforeFileList.value[i].atchFileId;
              obj.altText = beforeFileList.value[i].description;
              atchfiles.push(obj);
            }
          }
          try {
            const res = await axios.post("/atchFile/modifyAlt", atchfiles);
            const attachFiles = [];
            for (var i = 0; i < beforeFileList.value.length; i++) {
              var obj = {};
              obj.atchFileId = beforeFileList.value[i].atchFileId;
              obj.coachMarkSeq = i + 1;
              attachFiles.push(obj);
            }
            try {
              const r = await axios.post("/atchFile/orderFiles", attachFiles);
              successPopup.value = true;
            } catch (err) {
              failPopup.value = true;
            }
          } catch (err) {
            failPopup.value = true;
          }
        } else {
          successPopup.value = true;
        }
      } else {
        failPopup.value = true;
      }
    } catch (err) {
      failPopup.value = true;
    }
  } catch (err) {
    failPopup.value = true;
  }
}
async function fetchData() {
  if (currentId.value == 0) {
    if (history.state.id != null && history.state.id * 1 > 0) {
      currentId.value = history.state.id;
    } else {
      router.push("/coachMarkMng");
    }
  }
  try {
    var cDto = {};
    cDto.coachMarkId = currentId.value;
    cDto.maskFlag = false;
    const response = await axios.post("/coachmark/detail", cDto);
    const coachmarkDto = response.data.coachmarkDto;
    if (coachmarkDto.coachMarkTrgt == "TCHR") {
      coachMarkTrgt.value = "교사용";
    } else if (coachmarkDto.coachMarkTrgt == "STDNT") {
      coachMarkTrgt.value = "학생용";
    }
    try {
      await getTextbookCodeList(subjectList, selectedSubjectNm);
      await getUiCodeList(
        "/coachmark",
        coachMarkTrgt,
        scrnList,
        selectedScrnNm
      );
      selectedSubjectNm.value = coachmarkDto.comCdNm;
      selectedScrnNm.value = coachmarkDto.scrnTtl;
      coachMarkTtl.value = coachmarkDto.coachMarkTtl;
      if (coachmarkDto.pblcnUseYn == "N") {
        pblcnUseYn.value = "기한없음";
      } else if (coachmarkDto.pblcnUseYn == "Y") {
        pblcnUseYn.value = "기간설정";
        pblcnBgngYmd.value = coachmarkDto.pblcnBgngYmd;
        pblcnEndYmd.value = coachmarkDto.pblcnEndYmd;
      }
      coachMarkCn.value = coachmarkDto.coachMarkCn;
      fileList.value = [];
      const fList = response.data.atchFileDtoList;
      let sortedFList = fList.sort((a, b) => {
        return a.coachMarkSeq - b.coachMarkSeq;
      });
      if (sortedFList.length > 0) {
        for (var i = 0; i < sortedFList.length; i++) {
          var file = {};
          file.description = sortedFList[i].altText;
          file.atchFileId = sortedFList[i].atchFileId;
          file.url = sortedFList[i].atchFileLink;
          file.name = sortedFList[i].atchFileNm;
          fileList.value.push(file);
        }
      }
      return true;
    } catch (err) {
      return false;
    }
  } catch (err) {
    router.push("/coachMarkMng");
    return false;
  }
}

onMounted(async () => {
  await fetchData();
});
</script>

    
<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 80%;
}
</style>
