<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 코치마크 관리</p>
    <p class="heading">코치마크 등록</p>
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
              <!-- <button @click="loadScrnIdList" class="btn-3">조회</button> -->
            </div>
          </td>
        </tr>
        <tr>
          <th><span>화면명</span><span class="text-red">*</span></th>
          <td>
            <div>
              <!-- <select-comp :options="scrnIdList" v-model:selected="scrnId"></select-comp> -->
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
                  id="upload-files"
                  ref="uploadFiles"
                  accept=".png, .jpg, .jpeg, .gif, .bmp"
                  @change="fileChange"
                  multiple
                  hidden
                />
                <label for="upload-files" style="line-height: 100%">
                  <img src="/images/btnSelectFile.svg" class="cs-p" />
                </label>
                <span class="text-red" style="margin-left: 10px"
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
                          @click="removeFile(`${file.name}`)"
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
                        <span
                          >이미지 설명 <span class="text-red"> *</span></span
                        >
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
        <button class="btn-1" @click="save">등록</button>
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
      @on-submit-handler="(v) => triggerSubmit(v)"
    ></component>
  </div>
  <!--
    <div class="wrap" ref="wrap">
        <p class="breadcrumb">서비스 관리 > 코치마크 관리 > 등록</p>
        <p class="heading">코치마크 등록</p>
        <table class="table-1">
            <colgroup>
                <col width="10%">
                <col width="90%">
            </colgroup>
            <tbody>
                <tr>
                    <th><span>대상</span><span class="text-red"> *</span></th>
                    <td>
                        <div>
                            <component :is="SelectComp" v-model:selected="coachMarkTrgt" :options="['교사용','학생용']" style="width:fit-content"></component>
                            <button class="btn-3" @click="inquiryScrnId()">조회</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><span>화면명</span><span class="text-red"> *</span></th>
                    <td v-if="scrnIdList != null">
                        <component :is="SelectComp" v-model:selected="scrnId" :options="scrnIdList" style="width:fit-content"></component>
                    </td>
                </tr>
                <tr>
                    <th><span>제목</span><span class="text-red"> *</span></th>
                    <td>
                        <input type="text" maxlength="100" v-model="coachMarkTtl" placeholder="제목을 입력하세요" style="display: inline-block;width: 800px;">
                    </td>
                </tr>
                <tr>
                    <th><span>게재 기간</span><span class="text-red"> *</span></th>
                    <td>
                        <div>
                            <component :is="SelectComp" v-model:selected="pblcnUseYn" :options="['기한없음','기간설정']" style="width:fit-content"></component>
                            <div v-if="pblcnUseYn === '기간설정'">
                                <input type="date" v-model="pblcnBgngYmd" />
                                <span style="align-self: center; padding: 0 1rem">~</span>
                                <input type="date" v-model="pblcnEndYmd" />
                                <calendar-comp v-model:startDate="pblcnBgngYmd" v-model:endDate="pblcnEndYmd" :selectBox="false"></calendar-comp>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="align-left"><span>파일첨부</span><span class="text-red"> *</span></th>
                    <td>
                        <div>
                            <div style="display:inline;">
                                <span v-if="atchFile.length == 0 || atchFile == undefined">첨부된 파일이 없습니다</span>&emsp;
                               <input type="file" id="upload-image" ref="fileInput" @change="handleFileChange" accept="image/*" multiple hidden />
                                <label for="upload-image">
                                    <img src="/images/btnSelectFile.svg" class="clickable" />
                                </label>
                            </div>
                            <span class="text-red">* PNG, JPG 파일첨부 가능합니다<br></span>
                        </div>
                        <table v-if="atchFile != null && atchFile != undefined && atchFile.length > 0">
                            <tbody v-for="(row, index) in atchFile" :key="index" class="tblImg">
                                <tr>
                                    <td style="width:50px;text-align:center;">
                                        <img v-if="index != 0" src="/images/icon37.svg" @click="fileOrderUp(index)" class="clickable">
                                        <img v-if="index != fileCount-1" src="/images/icon36.svg" @click="fileOrderDown(index)" class="clickable">
                                    </td>
                                    <td>
                                        <div style="display: flex;">
                                            <div style="display: flex;flex-direction: column;">
                                                <span>{{ row.name }}&nbsp;<img src="/images/icon07red.svg" class="clickable" @click="rmvFile(index)"></span>
                                                <img width="160px" height="auto" v-if="index > -1" :src="row.url" :alt="row.name">
                                            </div>
                                            <div style="width:800px">
                                                <br>
                                                <span style="display: inline;">이미지 설명</span><span class="text-red"> *</span><br><br>
                                                <input type="text" placeholder="등록할 이미지의 설명을 입력해 주세요." v-model="row.description">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th><span>내용</span><span class="text-red"> *</span></th>
                    <td><textarea class="" rows="10" v-model="coachMarkCn" maxlength="2000" placeholder="내용을 입력하세요"></textarea></td>
                </tr>
            </tbody>
        </table>
        <div class="ct-17">
            <button class="btn-1" @click="check()">등록</button>
            <button class="btn-3" @click="router.push('/coachMarkMng')">목록</button>
        </div>
        <reg-modal v-model:isActive="popupIsActive" :alertModal="alertModal" @onSubmitHandler="triggerSubmit()" @onConfirmHandler="router.push('/coachMarkMng')"></reg-modal>
    </div>
    -->
</template>


<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import { useTextbookStore } from "@/store/textbook";
import { useUiStore } from "@/store/ui";
import CalendarComp from "@/views/components/Calendar.vue";
import AlertModalComp from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록 하시겠습니까?</span>",
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

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const uiStore = useUiStore();
const { getUiCodeList } = uiStore;
const scrnList = ref([]);
const selectedScrnNm = ref();

const coachMarkTrgt = ref("교사용");
const coachMarkTtl = ref("");
const pblcnUseYn = ref("");
const pblcnBgngYmd = ref();
const pblcnEndYmd = ref();
const coachMarkCn = ref("");
const fileList = ref([]);
const popupIsActive = ref(false);
const uploadFiles = ref();

const store = useFileStore();
const { fileCheckImages } = store;

watch(coachMarkTrgt, async (newVal, oldVal) => {
  await getUiCodeList("/coachmark", coachMarkTrgt, scrnList, selectedScrnNm);
});

function fileChange(e) {
  fileCheckImages(e, uploadFiles, 30, fileList);
}

function removeFile(name) {
  const arr = Array.from(fileList.value).filter((el) => el.name == name);
  if (arr.length > 0) {
    if (fileList.value.length > 0) {
      const temp = [];
      for (var i = 0; i < fileList.value.length; i++) {
        if (fileList.value[i].name != name) {
          temp.push(fileList.value[i]);
        }
      }
      fileList.value = temp;
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
    selectedSubjectNm.value == "선택" ||
    coachMarkTrgt.value == "" ||
    selectedScrnNm.value == "" ||
    coachMarkTtl.value == "" ||
    (pblcnUseYn.value == "Y" && pblcnBgngYmd.value == "") ||
    (pblcnUseYn.value == "Y" && pblcnEndYmd.value == "") ||
    coachMarkCn.value == "" ||
    fileList.value.length == 0
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
}

async function triggerSubmit() {
  const altTextList = [];
  for (var i = 0; i < fileList.value.length; i++) {
    altTextList.push(fileList.value[i].description);
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
    altTextList: altTextList,
    coachMarkSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };
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
    formData.append("atchFiles", fileList.value[i]);
  }
  formData.append(
    "coachmarkDto",
    new Blob([JSON.stringify(coachMarkDto)], {
      type: "application/json",
    })
  );
  await axios
    .post("/coachmark/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "confirm",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
    })
    .catch((err) => {
      alertModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
    })
    .finally(() => {
      //  router.push('/coachMarkMng')
    });
}

onMounted(async () => {
  await getTextbookCodeList(subjectList, selectedSubjectNm, "선택");
  await getUiCodeList("/coachmark", coachMarkTrgt, scrnList, selectedScrnNm);
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 80%;
}
</style>
