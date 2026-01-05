<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 1:1 문의 관리</p>
    <p class="heading">1:1 문의 상세정보</p>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>
          <span>{{ inqryOriId }}</span>
        </td>
      </tr>
      <tr>
        <th><span>상태</span></th>
        <td>
          <span>{{ inqryStepStts }}</span>
        </td>
      </tr>
      <tr>
        <th><span>구분</span></th>
        <td>
          <span>{{ inqrySe }}</span>
        </td>
      </tr>
      <tr>
        <th><span>제목</span></th>
        <td>
          <div v-html="DOMPurify.sanitize(inqryTtl)"></div>
        </td>
      </tr>
      <tr>
        <th><span>문의내용</span></th>
        <td><div v-html="DOMPurify.sanitize(inqryCn1)"></div></td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td v-if="atchFileListInq1 != undefined">
          <div
            v-for="(row, index) in atchFileListInq1"
            :key="index"
            class="dp-b"
          >
            <div class="dp-f">
              <img src="/images/icon06.svg" />
              <span
                class="cs-p"
                @click="downloadFile(row.atchFileUrl, row.atchFileNm)"
              >
                {{ row.atchFileNm }}
              </span>
            </div>
          </div>
          <div v-if="atchFileListInq1.length === 0">
            <span>첨부된 파일이 없습니다</span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>문의자정보</span></th>
        <td>
          <span>{{ userUuid1 }} ({{ inqryDt1 }})</span>
        </td>
      </tr>
    </table>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th class="color-purple">
          <input type="checkbox" v-model="answrStep1" /><span>답변</span>
        </th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="ansCn1"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
      <!-- <tr>
        <th class="color-purple"><span>파일첨부</span></th>
        <td>
          <div
            v-if="
              atchFileAns1 != null &&
              atchFileAns1 != undefined &&
              atchFileAns1 != ''
            "
            class="dp-if"
            style="vertical-align: middle"
          >
            <img src="/images/icon06.svg" />
            <span
              class="cs-p"
              @click="downloadFile(atchFileAns1.url, atchFileAns1.name)"
              >{{ atchFileAns1.name }}</span
            >
            <img
              src="/images/icon07red.svg"
              class="clickable"
              @click="rmvFile1()"
            />&emsp;
          </div>
          <div
            v-if="
              atchFileAns1 === null ||
              atchFileAns1 === undefined ||
              atchFileAns1 === ''
            "
            class="dp-if"
            style="vertical-align: middle"
          >
            <span>첨부된 파일이 없습니다</span>
          </div>
          &emsp;
          <div style="display: inline">
            <input
              type="file"
              id="upload-image1"
              ref="fileInput1"
              @change="handleFileChange1"
              accept=".png, .jpg, .jpeg, .gif, .bmp"
              hidden
            />
            <label for="upload-image1">
              <img src="/images/btnSelectFile.svg" class="clickable" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr> -->
      <tr v-if="ansDt1 != undefined">
        <th class="color-purple"><span>답변자정보</span></th>
        <td>
          <span>{{ ansAnswrId1 }} ({{ ansDt1 }})</span>
        </td>
      </tr>
    </table>
    <table v-if="inqryDt2 != undefined && inqryDt2 != null && inqryDt2 != ''">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>2차 문의 내용</span></th>
        <td><div v-html="DOMPurify.sanitize(inqryCn2)"></div></td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td v-if="atchFileListInq2 != undefined">
          <div
            v-for="(row, index) in atchFileListInq2"
            :key="index"
            class="dp-b"
          >
            <div class="dp-f">
              <img src="/images/icon06.svg" />
              <span
                class="cs-p"
                @click="downloadFile(row.atchFileUrl, row.atchFileNm)"
              >
                {{ row.atchFileNm }}
              </span>
            </div>
          </div>
          <div v-if="atchFileListInq2.length === 0">
            <span>첨부된 파일이 없습니다</span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>문의자정보</span></th>
        <td>
          <span>{{ userUuid2 }} ({{ inqryDt2 }})</span>
        </td>
      </tr>
    </table>
    <table v-if="inqryDt2 != undefined">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th class="color-purple">
          <input type="checkbox" v-model="answrStep2" /><span>2차 답변</span>
        </th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="ansCn2"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
      <!-- <tr>
        <th class="color-purple"><span>파일첨부</span></th>
        <td>
          <div
            v-if="
              atchFileAns2 != null &&
              atchFileAns2 != undefined &&
              atchFileAns2 != ''
            "
            class="dp-if"
          >
            <img src="/images/icon06.svg" />
            <span
              class="cs-p"
              @click="downloadFile(atchFileAns2.url, atchFileAns2.name)"
              >{{ atchFileAns2.name }}</span
            >
            <img
              src="/images/icon07red.svg"
              class="clickable"
              @click="rmvFile2()"
            />&emsp;
          </div>
          <div
            v-if="
              atchFileAns2 === null ||
              atchFileAns2 === undefined ||
              atchFileAns2 === ''
            "
            class="dp-if"
          >
            <span>첨부된 파일이 없습니다</span>
          </div>
          &emsp;
          <div style="display: inline">
            <input
              type="file"
              id="upload-image2"
              ref="fileInput2"
              @change="handleFileChange2"
              accept=".png, .jpg, .jpeg, .gif, .bmp"
              hidden
            />
            <label for="upload-image2">
              <img src="/images/btnSelectFile.svg" class="clickable" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr> -->
      <tr v-if="ansDt2 != undefined">
        <th class="color-purple"><span>답변자정보</span></th>
        <td>
          <span>{{ ansAnswrId2 }} ({{ ansDt2 }})</span>
        </td>
      </tr>
    </table>
    <table v-if="inqryDt3 != undefined">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>3차 문의 내용</span></th>
        <td><div v-html="DOMPurify.sanitize(inqryCn3)"></div></td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td v-if="atchFileListInq3 != undefined">
          <div
            v-for="(row, index) in atchFileListInq3"
            :key="index"
            class="dp-b"
          >
            <div class="dp-f">
              <img src="/images/icon06.svg" />
              <span
                class="cs-p"
                @click="downloadFile(row.atchFileUrl, row.atchFileNm)"
              >
                {{ row.atchFileNm }}
              </span>
            </div>
          </div>
          <div v-if="atchFileListInq3.length === 0">
            <span>첨부된 파일이 없습니다</span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>문의자정보</span></th>
        <td>
          <span>{{ userUuid3 }} ({{ inqryDt3 }})</span>
        </td>
      </tr>
    </table>
    <table v-if="inqryDt3 != undefined">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th class="color-purple">
          <input type="checkbox" v-model="answrStep3" /><span>3차 답변</span>
        </th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="ansCn3"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
      <!-- <tr>
        <th class="color-purple"><span>파일첨부</span></th>
        <td>
          <div
            v-if="
              atchFileAns3 != null &&
              atchFileAns3 != undefined &&
              atchFileAns3 != ''
            "
            class="dp-if"
          >
            <img src="/images/icon06.svg" />
            <span
              class="cs-p"
              @click="downloadFile(atchFileAns3.url, atchFileAns3.name)"
              >{{ atchFileAns3.name }}</span
            >
            <img
              src="/images/icon07red.svg"
              class="clickable"
              @click="rmvFile3()"
            />&emsp;
          </div>
          <div
            v-if="
              atchFileAns3 === null ||
              atchFileAns3 === undefined ||
              atchFileAns3 === ''
            "
            class="dp-if"
          >
            <span>첨부된 파일이 없습니다</span>
          </div>
          &emsp;
          <div style="display: inline">
            <input
              type="file"
              id="upload-image3"
              ref="fileInput3"
              @change="handleFileChange3"
              accept=".png, .jpg, .jpeg, .gif, .bmp"
              hidden
            />
            <label for="upload-image3">
              <img src="/images/btnSelectFile.svg" class="clickable" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr> -->
      <tr v-if="ansDt3 != undefined">
        <th class="color-purple"><span>답변자정보</span></th>
        <td>
          <span>{{ ansAnswrId3 }} ({{ ansDt3 }})</span>
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="handleClick()">답변달기</button>
      <button class="btn-2" @click="deleteClick()">선택답변삭제</button>
      <button class="btn-3" @click="router.push('/oneononeInqryMng')">
        목록
      </button>
    </div>
    <modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push('/oneononeInqryMng')"
    ></modal>
    <modal
      v-model:isActive="regPopupIsActive"
      :alertModal="regModal"
      @onSubmitHandler="beforeTriggerSubmit()"
    ></modal>
    <modal
      v-model:isActive="deletePopupIsActive"
      :alertModal="deleteModal"
      @onSubmitHandler="deleteTriggerSubmit()"
    ></modal>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import Modal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import DOMPurify from 'dompurify';
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const store = useFileStore();
const { downloadFile } = store;
const router = useRouter();
const alertPopupIsActive = ref(false);
const regPopupIsActive = ref(false);
const deletePopupIsActive = ref(false);
let rmvFileList = [];

const { fileCheck } = store;
const detailMaskingFlag = inject("detailMaskingFlag");
const inqryOriId = ref();
const inqryStep = ref();
const inqryStts = ref();
const inqryStepStts = ref();
const inqrySe = ref();
const inqryTtl = ref();

const inqryId1 = ref();
const inqrNm1 = ref();
const userUuid1 = ref();
const inqrSchl1 = ref();
const inqryCn1 = ref();
const atchFileListInq1 = ref([]);
const inqryDt1 = ref();
const answrStep1 = ref(false);
const ansCn1 = ref();
const ansAnswr1 = ref();
const ansAnswrId1 = ref();
const fileInput1 = ref();
const atchFileAns1 = ref();
const ansDt1 = ref();

const inqryStep2 = ref();
const inqryStts2 = ref();
const inqryStepStts2 = ref();
const inqrySe2 = ref();
const inqryTtl2 = ref();
const inqryId2 = ref();
const inqrNm2 = ref();
const userUuid2 = ref();
const inqrSchl2 = ref();
const atchFileListInq2 = ref([]);
const inqryCn2 = ref();
const inqryDt2 = ref();
const answrStep2 = ref(false);
const ansCn2 = ref();
const ansAnswr2 = ref();
const fileInput2 = ref();
const atchFileAns2 = ref();
const ansAnswrId2 = ref();
const ansDt2 = ref();

const inqryStep3 = ref();
const inqryStts3 = ref();
const inqryStepStts3 = ref();
const inqrySe3 = ref();
const inqryTtl3 = ref();
const inqryId3 = ref();
const inqrNm3 = ref();
const userUuid3 = ref();
const inqrSchl3 = ref();
const atchFileListInq3 = ref([]);
const inqryCn3 = ref();
const inqryDt3 = ref();
const answrStep3 = ref(false);
const ansCn3 = ref();
const ansAnswr3 = ref();
const fileInput3 = ref();
const atchFileAns3 = ref();
const ansAnswrId3 = ref();
const ansDt3 = ref();

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록이 완료되었습니다.</span>",
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
  bodyHtml: "<span>답변을 다시겠습니까?</span>",
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

const deleteModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>선택한 항목을 삭제하시겠습니까?</span>",
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

// 20240924 답변 파일 업로드 제외
// const handleFileChange1 = (e) => {
//   const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
//   const MAX_SIZE = 30;
//   if (atchFileAns1.value !== undefined && atchFileAns1.value !== null) rmvFileList.push(atchFileAns1.value);
//   fileCheck(e, fileInput1, allowedExtensions, MAX_SIZE, atchFileAns1);
// };

// const handleFileChange2 = (e) => {
//   const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
//   const MAX_SIZE = 30;
//   if (atchFileAns2.value !== undefined && atchFileAns2.value !== null) rmvFileList.push(atchFileAns2.value);
//   fileCheck(e, fileInput2, allowedExtensions, MAX_SIZE, atchFileAns2);
// };

// const handleFileChange3 = (e) => {
//   const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
//   const MAX_SIZE = 30;
//   if (atchFileAns3.value !== undefined && atchFileAns3.value !== null) rmvFileList.push(atchFileAns3.value);
//   fileCheck(e, fileInput3, allowedExtensions, MAX_SIZE, atchFileAns3);
// };

// const rmvFile1 = () => {
//   rmvFileList.push(atchFileAns1.value);
//   fileInput1.value.value = "";
//   atchFileAns1.value = null;
// };

// const rmvFile2 = () => {
//   rmvFileList.push(atchFileAns2.value);
//   fileInput2.value.value = "";
//   atchFileAns2.value = null;
// };

// const rmvFile3 = () => {
//   rmvFileList.push(atchFileAns3.value);
//   fileInput3.value.value = "";
//   atchFileAns3.value = null;
// };

const handleClick = () => {
  if ((ansCn1.value !== undefined && ansCn1.value == "") || (ansCn2.value !== undefined && ansCn2.value == "") || (ansCn2.value !== undefined && ansCn3.value == "")) {
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
  }
  regPopupIsActive.value = true;
};

const deleteClick = () => {
  if (answrStep1.value || answrStep2.value || answrStep3.value) {
    deleteModal.value.bodyHtml = "<span>선택한 항목을 삭제하시겠습니까?</span>";
    deleteModal.value.buttons = [
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
    deletePopupIsActive.value = true;
  } else {
    alertModal.value.bodyHtml = "<span>삭제할 답변을 선택해 주세요.</span>";
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
};

const deleteTriggerSubmit = async () => {
  try {
    if (answrStep3.value) {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId3.value
      );
      if (atchFileAns3.value != null || atchFileAns3.value != undefined) {
        const response = await axios.get(
          "/atchFile/removeFile/" + atchFileAns3.value.id
        );
      }
    }

    if (answrStep2.value) {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId2.value
      );
      if (atchFileAns2.value != null || atchFileAns2.value != undefined) {
        const response = await axios.get(
          "/atchFile/removeFile/" + atchFileAns2.value.id
        );
      }
    }

    if (answrStep1.value) {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId1.value
      );
      if (atchFileAns1.value != null || atchFileAns1.value != undefined) {
        const response = await axios.get(
          "/atchFile/removeFile/" + atchFileAns1.value.id
        );
      }
    }
  } catch (error) {
    if (error.response != null) {
      if (error.response.status != null) {
        alertModal.value.headerHtml = "<h4>알림</h4>";
        alertModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
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

  alertModal.value.headerHtml = "<h4>알림</h4>";
  alertModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
  alertModal.value.buttons = [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
  ];
  alertPopupIsActive.value = true;
};

const beforeTriggerSubmit = async () => {
  // if (ansCn1.value == "" && ansCn2.value == "" && ansCn3.value == "") {
  //   alertModal.value.bodyHtml =
  //     "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
  //   alertModal.value.buttons = [
  //     {
  //       clickEvent: "close",
  //       content: "확인",
  //       addClass: "btn-1",
  //     },
  //   ];
  //   alertPopupIsActive.value = true;
  //   return;
  // }

  if (
    inqryId3.value != undefined &&
    inqryId3.value != null
  ) {
    try {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId3.value
      );
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
      return;
    }
  }

  if (
    inqryId2.value != undefined &&
    inqryId2.value != null
  ) {
    try {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId2.value
      );
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
      return;
    }
  }

  if (
    inqryId1.value != undefined &&
    inqryId1.value != null
  ) {
    try {
      const response = await axios.delete(
        "/inquiry/answerdelete/" + inqryId1.value
      );
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
      return;
    }
  }

  if (rmvFileList.length > 0) {
    for (let i = 0; i < rmvFileList.length; i++) {
      if (
        rmvFileList[i].atchFileId != undefined &&
        rmvFileList[i].atchFileId != null
      ) {
        await axios.get("/atchFile/removeFile/" + rmvFileList[i].atchFileId);
      }
    }
    regTriggerSubmit();
  } else {
    regTriggerSubmit();
  }
};

const regTriggerSubmit = async () => {
  if (ansCn1.value != undefined && ansCn1.value != "") {
    let formData = new FormData();
    formData.append("atchFiles", atchFileAns1.value);

    let inquiryDto = {
      inqryId: inqryId1.value,
      ansCn: ansCn1.value,
    };
    formData.append(
      "inquiryDto",
      new Blob([JSON.stringify(inquiryDto)], {
        type: "application/json",
      })
    );

    try {
      await axios.post("/inquiry/answercreate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      return;
    }
  }

  if (ansCn2.value != undefined && ansCn2.value != "") {
    let formData = new FormData();
    formData.append("atchFiles", atchFileAns2.value);

    let inquiryDto = {
      inqryId: inqryId2.value,
      ansCn: ansCn2.value,
    };
    formData.append(
      "inquiryDto",
      new Blob([JSON.stringify(inquiryDto)], {
        type: "application/json",
      })
    );

    try {
      await axios.post("/inquiry/answercreate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      return;
    }
  }

  if (ansCn3.value != undefined && ansCn3.value != "") {
    let formData = new FormData();
    formData.append("atchFiles", atchFileAns3.value);

    let inquiryDto = {
      inqryId: inqryId3.value,
      ansCn: ansCn3.value,
    };
    formData.append(
      "inquiryDto",
      new Blob([JSON.stringify(inquiryDto)], {
        type: "application/json",
      })
    );

    try {
      await axios.post("/inquiry/answercreate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      return;
    }
  }
  alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
  alertModal.value.buttons = [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
  ];
  alertPopupIsActive.value = true;
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/oneononeInqryMng");
  } else {
    inqryOriId.value = history.state.id;
    let inquiryDto = {
      inqryOriId: inqryOriId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/inquiry/detail`, inquiryDto)
      .then((response) => {
        if (response.data != null) {
          inqryOriId.value = response.data.inquiryDtoList[0].inqryOriId;
          inqryStep.value = response.data.inquiryDtoList[0].inqryStep;
          inqryStts.value = response.data.inquiryDtoList[0].inqryStts;
          inqryStepStts.value = inqryStep.value + inqryStts.value;
          inqrySe.value = response.data.inquiryDtoList[0].inqrySe;
          inqryTtl.value = response.data.inquiryDtoList[0].inqryTtl;
          inqryId1.value = response.data.inquiryDtoList[0].inqryId;
          inqryCn1.value = response.data.inquiryDtoList[0].inqryCn;
          inqrNm1.value = response.data.inquiryDtoList[0].inqrNm;
          userUuid1.value = response.data.inquiryDtoList[0].userUuid;
          inqrSchl1.value = response.data.inquiryDtoList[0].inqrSchl;
          inqryDt1.value = response.data.inquiryDtoList[0].inqryDt;
          answrStep1.value = inqryStts.value == "답변완료" ? true : false;
          ansCn1.value = response.data.inquiryDtoList[0].ansCn;
          ansAnswr1.value = response.data.inquiryDtoList[0].ansAnswr;
          ansAnswrId1.value = response.data.inquiryDtoList[0].ansAnswrId;
          ansDt1.value = response.data.inquiryDtoList[0].ansDt;
          if (
            response.data.inquiryDtoList[0].atchFileNm1 != null &&
            response.data.inquiryDtoList[0].atchFileUrl1 != null &&
            response.data.inquiryDtoList[0].atchFileNm1 != "" &&
            response.data.inquiryDtoList[0].atchFileUrl1 != ""
          ) {
            atchFileListInq1.value.push({
              atchFileUrl: response.data.inquiryDtoList[0].atchFileUrl1,
              atchFileNm: response.data.inquiryDtoList[0].atchFileNm1,
            });
            if (
              response.data.inquiryDtoList[0].atchFileNm2 != null &&
              response.data.inquiryDtoList[0].atchFileUrl2 != null &&
              response.data.inquiryDtoList[0].atchFileNm2 != "" &&
              response.data.inquiryDtoList[0].atchFileUrl2 != ""
            ) {
              atchFileListInq1.value.push({
                atchFileUrl: response.data.inquiryDtoList[0].atchFileUrl2,
                atchFileNm: response.data.inquiryDtoList[0].atchFileNm2,
              });
              if (
                response.data.inquiryDtoList[0].atchFileNm3 != null &&
                response.data.inquiryDtoList[0].atchFileUrl3 != null &&
                response.data.inquiryDtoList[0].atchFileNm3 != "" &&
                response.data.inquiryDtoList[0].atchFileUrl3 != ""
              ) {
                atchFileListInq1.value.push({
                  atchFileUrl: response.data.inquiryDtoList[0].atchFileUrl3,
                  atchFileNm: response.data.inquiryDtoList[0].atchFileNm3,
                });
                if (
                  response.data.inquiryDtoList[0].atchFileNm4 != null &&
                  response.data.inquiryDtoList[0].atchFileUrl4 != null &&
                  response.data.inquiryDtoList[0].atchFileNm4 != "" &&
                  response.data.inquiryDtoList[0].atchFileUrl4 != ""
                ) {
                  atchFileListInq1.value.push({
                    atchFileUrl: response.data.inquiryDtoList[0].atchFileUrl4,
                    atchFileNm: response.data.inquiryDtoList[0].atchFileNm4,
                  });
                  if (
                    response.data.inquiryDtoList[0].atchFileNm5 != null &&
                    response.data.inquiryDtoList[0].atchFileUrl5 != null &&
                    response.data.inquiryDtoList[0].atchFileNm5 != "" &&
                    response.data.inquiryDtoList[0].atchFileUrl5 != ""
                  ) {
                    atchFileListInq1.value.push({
                      atchFileUrl: response.data.inquiryDtoList[0].atchFileUrl5,
                      atchFileNm: response.data.inquiryDtoList[0].atchFileNm5,
                    });
                  }
                }
              }
            }
          }

          if (response.data.inquiryDtoList.length >= 2) {
            inqryStep2.value = response.data.inquiryDtoList[1].inqryStep;
            inqryStts2.value = response.data.inquiryDtoList[1].inqryStts;
            inqryStepStts2.value = inqryStep2.value + inqryStts2.value;
            inqrySe2.value = response.data.inquiryDtoList[1].inqrySe;
            inqryTtl2.value = response.data.inquiryDtoList[1].inqryTtl;
            inqryId2.value = response.data.inquiryDtoList[1].inqryId;
            inqryCn2.value = response.data.inquiryDtoList[1].inqryCn;
            inqrNm2.value = response.data.inquiryDtoList[1].inqrNm;
            userUuid2.value = response.data.inquiryDtoList[1].userUuid;
            inqrSchl2.value = response.data.inquiryDtoList[1].inqrSchl;
            inqryDt2.value = response.data.inquiryDtoList[1].inqryDt;
            answrStep2.value = inqryStts2.value == "답변완료" ? true : false;
            ansCn2.value = response.data.inquiryDtoList[1].ansCn;
            ansAnswr2.value = response.data.inquiryDtoList[1].ansAnswr;
            ansAnswrId2.value = response.data.inquiryDtoList[1].ansAnswrId;
            ansDt2.value = response.data.inquiryDtoList[1].ansDt;
            if (
              response.data.inquiryDtoList[1].atchFileNm1 != null &&
              response.data.inquiryDtoList[1].atchFileUrl1 != null &&
              response.data.inquiryDtoList[1].atchFileNm1 != "" &&
              response.data.inquiryDtoList[1].atchFileUrl1 != ""
            ) {
              atchFileListInq2.value.push({
                atchFileUrl: response.data.inquiryDtoList[1].atchFileUrl1,
                atchFileNm: response.data.inquiryDtoList[1].atchFileNm1,
              });
              if (
                response.data.inquiryDtoList[1].atchFileNm2 != null &&
                response.data.inquiryDtoList[1].atchFileUrl2 != null &&
                response.data.inquiryDtoList[1].atchFileNm2 != "" &&
                response.data.inquiryDtoList[1].atchFileUrl2 != ""
              ) {
                atchFileListInq2.value.push({
                  atchFileUrl: response.data.inquiryDtoList[1].atchFileUrl2,
                  atchFileNm: response.data.inquiryDtoList[1].atchFileNm2,
                });
                if (
                  response.data.inquiryDtoList[1].atchFileNm3 != null &&
                  response.data.inquiryDtoList[1].atchFileUrl3 != null &&
                  response.data.inquiryDtoList[1].atchFileNm3 != "" &&
                  response.data.inquiryDtoList[1].atchFileUrl3 != ""
                ) {
                  atchFileListInq2.value.push({
                    atchFileUrl: response.data.inquiryDtoList[1].atchFileUrl3,
                    atchFileNm: response.data.inquiryDtoList[1].atchFileNm3,
                  });
                  if (
                    response.data.inquiryDtoList[1].atchFileNm4 != null &&
                    response.data.inquiryDtoList[1].atchFileUrl4 != null &&
                    response.data.inquiryDtoList[1].atchFileNm4 != "" &&
                    response.data.inquiryDtoList[1].atchFileUrl4 != ""
                  ) {
                    atchFileListInq2.value.push({
                      atchFileUrl: response.data.inquiryDtoList[1].atchFileUrl4,
                      atchFileNm: response.data.inquiryDtoList[1].atchFileNm4,
                    });
                    if (
                      response.data.inquiryDtoList[1].atchFileNm5 != null &&
                      response.data.inquiryDtoList[1].atchFileUrl5 != null &&
                      response.data.inquiryDtoList[1].atchFileNm5 != "" &&
                      response.data.inquiryDtoList[1].atchFileUrl5 != ""
                    ) {
                      atchFileListInq2.value.push({
                        atchFileUrl:
                          response.data.inquiryDtoList[1].atchFileUrl5,
                        atchFileNm: response.data.inquiryDtoList[1].atchFileNm5,
                      });
                    }
                  }
                }
              }
            }
          }

          if (response.data.inquiryDtoList.length >= 3) {
            inqryStep3.value = response.data.inquiryDtoList[2].inqryStep;
            inqryStts3.value = response.data.inquiryDtoList[2].inqryStts;
            inqryStepStts3.value = inqryStep3.value + inqryStts3.value;
            inqrySe3.value = response.data.inquiryDtoList[2].inqrySe;
            inqryTtl3.value = response.data.inquiryDtoList[2].inqryTtl;
            inqryId3.value = response.data.inquiryDtoList[2].inqryId;
            inqryCn3.value = response.data.inquiryDtoList[2].inqryCn;
            inqrNm3.value = response.data.inquiryDtoList[2].inqrNm;
            userUuid3.value = response.data.inquiryDtoList[2].userUuid;
            inqrSchl3.value = response.data.inquiryDtoList[2].inqrSchl;
            inqryDt3.value = response.data.inquiryDtoList[2].inqryDt;
            answrStep3.value = inqryStts3.value == "답변완료" ? true : false;
            ansCn3.value = response.data.inquiryDtoList[2].ansCn;
            ansAnswr3.value = response.data.inquiryDtoList[2].ansAnswr;
            ansAnswrId3.value = response.data.inquiryDtoList[2].ansAnswrId;
            ansDt3.value = response.data.inquiryDtoList[2].ansDt;
            if (
              response.data.inquiryDtoList[2].atchFileNm1 != null &&
              response.data.inquiryDtoList[2].atchFileUrl1 != null &&
              response.data.inquiryDtoList[2].atchFileNm1 != "" &&
              response.data.inquiryDtoList[2].atchFileUrl1 != ""
            ) {
              atchFileListInq3.value.push({
                atchFileUrl: response.data.inquiryDtoList[2].atchFileUrl1,
                atchFileNm: response.data.inquiryDtoList[2].atchFileNm1,
              });
              if (
                response.data.inquiryDtoList[2].atchFileNm2 != null &&
                response.data.inquiryDtoList[2].atchFileUrl2 != null &&
                response.data.inquiryDtoList[2].atchFileNm2 != "" &&
                response.data.inquiryDtoList[2].atchFileUrl2 != ""
              ) {
                atchFileListInq3.value.push({
                  atchFileUrl: response.data.inquiryDtoList[2].atchFileUrl2,
                  atchFileNm: response.data.inquiryDtoList[2].atchFileNm2,
                });
                if (
                  response.data.inquiryDtoList[2].atchFileNm3 != null &&
                  response.data.inquiryDtoList[2].atchFileUrl3 != null &&
                  response.data.inquiryDtoList[2].atchFileNm3 != "" &&
                  response.data.inquiryDtoList[2].atchFileUrl3 != ""
                ) {
                  atchFileListInq3.value.push({
                    atchFileUrl: response.data.inquiryDtoList[2].atchFileUrl3,
                    atchFileNm: response.data.inquiryDtoList[2].atchFileNm3,
                  });
                  if (
                    response.data.inquiryDtoList[2].atchFileNm4 != null &&
                    response.data.inquiryDtoList[2].atchFileUrl4 != null &&
                    response.data.inquiryDtoList[2].atchFileNm4 != "" &&
                    response.data.inquiryDtoList[2].atchFileUrl4 != ""
                  ) {
                    atchFileListInq3.value.push({
                      atchFileUrl: response.data.inquiryDtoList[2].atchFileUrl4,
                      atchFileNm: response.data.inquiryDtoList[2].atchFileNm4,
                    });
                    if (
                      response.data.inquiryDtoList[2].atchFileNm5 != null &&
                      response.data.inquiryDtoList[2].atchFileUrl5 != null &&
                      response.data.inquiryDtoList[2].atchFileNm5 != "" &&
                      response.data.inquiryDtoList[2].atchFileUrl5 != ""
                    ) {
                      atchFileListInq3.value.push({
                        atchFileUrl:
                          response.data.inquiryDtoList[2].atchFileUrl5,
                        atchFileNm: response.data.inquiryDtoList[2].atchFileNm5,
                      });
                    }
                  }
                }
              }
            }
          }

          if (
            response.data.atchFileDtoList != undefined &&
            response.data.atchFileDtoList != null
          ) {
            for (let i = 0; i < response.data.atchFileDtoList.length; i++) {
              if (
                response.data.atchFileDtoList[i].inqryStep === 1 &&
                answrStep1
              ) {
                atchFileAns1.value = Object.assign(
                  {},
                  response.data.atchFileDtoList[i],
                  {
                    id: response.data.atchFileDtoList[i].atchFileId,
                    name: response.data.atchFileDtoList[i].atchFileNm,
                    url: response.data.atchFileDtoList[i].atchFileLink,
                  }
                );
              } else if (
                response.data.atchFileDtoList[i].inqryStep === 2 &&
                answrStep2
              ) {
                atchFileAns2.value = Object.assign(
                  {},
                  response.data.atchFileDtoList[i],
                  {
                    id: response.data.atchFileDtoList[i].atchFileId,
                    name: response.data.atchFileDtoList[i].atchFileNm,
                    url: response.data.atchFileDtoList[i].atchFileLink,
                  }
                );
              } else if (
                response.data.atchFileDtoList[i].inqryStep === 3 &&
                answrStep3
              ) {
                atchFileAns3.value = Object.assign(
                  {},
                  response.data.atchFileDtoList[i],
                  {
                    id: response.data.atchFileDtoList[i].atchFileId,
                    name: response.data.atchFileDtoList[i].atchFileNm,
                    url: response.data.atchFileDtoList[i].atchFileLink,
                  }
                );
              }
            }
          }
        } else {
          router.push("/oneononeInqryMng");
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("/oneononeInqryMng");
          }
        }
      })
      .finally(() => {
        detailMaskingFlag.value = true;
      });
  }
};

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}

.color-purple {
  background-color: #f8f3ff;
}
</style>

