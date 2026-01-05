<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 장애대응체계 관리</p>
    <p class="heading">장애대응체계 수정</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>No.</span></th>
          <td>
            <span>{{ obstlId }}</span>
          </td>
        </tr>
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
            <input
              type="text"
              style="display: inline-block; width: 87.5%"
              v-model.trim="obstlTtl"
              maxlength="100"
            />
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
          <th><span>현황</span></th>
          <td>
            <span v-if="obstlStts == 'Y'" class="text-red">현재버전</span>
            <span v-else>종료</span>
          </td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td>
            <textarea
              class=""
              rows="20"
              v-model="obstlCn"
              maxlength="2000"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">적용</button>
      <button class="btn-2" @click="clickDelete()">삭제</button>
      <button class="btn-3" @click="router.push('/obstlRspdSysMng')">
        목록
      </button>
    </div>
    <reg-modal
      v-model:isActive="popupIsActive"
      :alertModal="regModal"
      @onSubmitHandler="beforeTriggerSubmit()"
      @onConfirmHandler="router.push('/obstlRspdSysMng')"
    ></reg-modal>
    <reg-modal
      v-model:isActive="deletePopupIsActive"
      :alertModal="deleteModal"
      @onSubmitHandler="deleteSubmit()"
    ></reg-modal>
    <reg-modal
      v-model:isActive="deleteCheckedPopupIsActive"
      :alertModal="deleteCheckedModal"
      @onSubmitHandler="deleteCheckedSubmit()"
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

const deleteModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>삭제하시겠습니까?</span>",
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

const deleteCheckedModal = ref({
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

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>",
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

const router = useRouter();
const popupIsActive = ref(false);
const deletePopupIsActive = ref(false);
const deleteCheckedPopupIsActive = ref(false);
const store = useFileStore();
const { fileCheck } = store;

const obstlId = ref();
const obstlSe = ref();
const obstlTtl = ref("");
const obstlStts = ref("");
const obstlCn = ref("");
const fileInput = ref();
const originalAtchFile = ref();
const atchFile = ref(null);
let rmvFileList = [];

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
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
  }
}

const rmvFile = () => {
  deleteCheckedModal.value.bodyHtml = "<span>파일을 삭제하시겠습니까?</span>";
  deleteCheckedModal.value.buttons = [
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
  deleteCheckedPopupIsActive.value = true;
};

const deleteCheckedSubmit = () => {
  rmvFileList.push(atchFile.value);
  fileInput.value.value = "";
  atchFile.value = null;
};

const clickDelete = () => {
  deletePopupIsActive.value = true;
};

const deleteSubmit = async () => {
  await axios
    .delete(`obstacle/delete/${obstlId.value}`)
    .then((response) => {})
    .catch((error) => {
      router.push("/obstlRspdSysMng");
    });
  router.push("/obstlRspdSysMng");
};

const check = () => {
  if (obstlSe.value == "" || obstlTtl.value == "" || atchFile.value == null) {
    regModal.value.bodyHtml =
      "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
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
    popupIsActive.value = true;
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
          regModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
          regModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
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

  let obstlRspdSysDto = {
    obstlId: obstlId.value,
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
    obstlTtl: obstlTtl.value,
    obstlCn: obstlCn.value,
  };
  formData.append(
    "obstlRspdSysDto",
    new Blob([JSON.stringify(obstlRspdSysDto)], {
      type: "application/json",
    })
  );

  try {
    const response = await axios.post("/obstacle/modify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    regModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    if (error.response.status != null) {
      if (error.response.status == axios.HttpStatusCode.NotModified) {
        regModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
        regModal.value.buttons = [
          {
            clickEvent: "confirm",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        popupIsActive.value = true;
      } else {
        regModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
        regModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        popupIsActive.value = true;
        return;
      }
    }
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/obstlRspdSysMng");
  } else {
    obstlId.value = history.state.id;
    let param = {
      obstlId: obstlId.value,
      maskFlag: false,
    };

    await axios
      .post(`/obstacle/detail`, param)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.obstlRspdSysPopDto;
          obstlSe.value =
            dto.obstlSe == 1
              ? "긴급대응체계"
              : dto.obstlSe == 2
              ? "장애모의훈련"
              : dto.obstlSe == 3
              ? "모의해킹"
              : dto.obstlSe == 4
              ? "보안취약점진단"
              : "기타";
          obstlTtl.value = dto.obstlTtl;
          obstlStts.value = dto.obstlStts;
          obstlCn.value = dto.obstlCn;
          if (response.data.atchFileDtoList[0] != null) {
            originalAtchFile.value = response.data.atchFileDto;
            atchFile.value = Object.assign(
              {},
              response.data.atchFileDtoList[0],
              {
                name: response.data.atchFileDtoList[0].atchFileNm,
                url: response.data.atchFileDtoList[0].atchFileLink,
              }
            );
          }
        }
      })
      .catch((err) => {
        if (err.repsonse != null) {
          if (err.response.status != null) {
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
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
