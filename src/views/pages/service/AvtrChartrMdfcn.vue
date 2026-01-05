<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 아바타 관리</p>
    <p class="heading">아바타 캐릭터 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>
          <span>{{ avtrId }}</span>
        </td>
      </tr>
      <tr>
        <th><span>아바타이름</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            style="display: inline-block; width: 800px"
            v-model="avtrNm"
            placeholder="아바타이름을 입력하세요."
          />
        </td>
      </tr>
      <tr>
        <th><span>대상</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="checkbox"
            id="chkTrgtT"
            name="chkTrgt"
            value="T"
            v-model="avtrTrgt"
          /><label for="chkTrgtT"><span>교사</span></label>
          <input
            type="checkbox"
            id="chkTrgtE"
            name="chkTrgt"
            value="E"
            v-model="avtrTrgt"
          /><label for="chkTrgtE"><span>초등</span></label>
          <input
            type="checkbox"
            id="chkTrgtM"
            name="chkTrgt"
            value="M"
            v-model="avtrTrgt"
          /><label for="chkTrgtM"><span>중등</span></label>
          <input
            type="checkbox"
            id="chkTrgtH"
            name="chkTrgt"
            value="H"
            v-model="avtrTrgt"
          /><label for="chkTrgtH"><span>고등</span></label>
        </td>
      </tr>
      <tr>
        <th><span>성별</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="checkbox"
            id="chkGndrM"
            name="chkGndr"
            value="M"
            v-model="avtrGndr"
          /><label for="chkGndrM"><span>남성</span></label>
          <input
            type="checkbox"
            id="chkGndrW"
            name="chkGndr"
            value="W"
            v-model="avtrGndr"
          /><label for="chkGndrW"><span>여성</span></label>
        </td>
      </tr>
      <tr>
        <th><span>노출여부</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <select-comp
              :options="['노출', '비노출']"
              v-model:selected="expsrYn"
            ></select-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>파일첨부</span><span class="text-red"> *</span></th>
        <td>
          <div style="display: flex">
            <div v-if="atchFile == null" style="align-content: center">
              <span>첨부된 파일이 없습니다</span>&emsp;
            </div>
            <div v-else style="display: flex; flex-direction: column">
              <span
                >{{ atchFile.name }}&nbsp;
                <img
                  src="/images/icon07red.svg"
                  class="cs-p"
                  @click="rmvFile()"
                />&emsp;
              </span>
              <img
                width="160px"
                height="auto"
                :src="atchFile.url"
                :alt="atchFile.name"
              />
            </div>
            <div style="width: 1000px">
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
              <br /><br />
              <div>
                <span v-if="atchFile != null">
                  이미지 설명<span class="text-red"> *</span>
                </span>
                <input
                  v-if="atchFile != null"
                  type="text"
                  v-model="altText"
                  maxlength="1000"
                  placeholder="등록할 이미지의 설명을 입력해 주세요."
                />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">적용</button>
      <button class="btn-2" @click="clickDelete()">삭제</button>
      <button class="btn-3" @click="router.push('/avtrChartrMng')">목록</button>
    </div>
    <div>
      <reg-modal
        v-model:isActive="popupIsActive"
        :alertModal="regModal"
        @onSubmitHandler="beforeTriggerSubmit()"
        @onConfirmHandler="router.push('/avtrChartrMng')"
      ></reg-modal>
      <reg-modal
        v-model:isActive="deletePopupIsActive"
        :alertModal="deleteModal"
        @onSubmitHandler="deleteSubmit()"
      ></reg-modal>
      <reg-modal
        v-model:isActive="deleteConfirmPopupIsActive"
        :alertModal="alertModal"
        @onConfirmHandler="router.push('/avtrChartrMng')"
      ></reg-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import SelectComp from "@/views/components/Select.vue";
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
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

const router = useRouter();
const popupIsActive = ref(false);
const deleteConfirmPopupIsActive = ref(false);
const deletePopupIsActive = ref(false);

const avtrId = ref();
const avtrNm = ref("");
const avtrTrgt = ref([]);
const avtrGndr = ref([]);
const expsrYn = ref("");
const fileInput = ref();
const originalAtchFile = ref();
const atchFile = ref(null);
const altText = ref("");
const store = useFileStore();
const { fileCheck } = store;
let rmvFileList = [];

function handleFileChange(e) {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
  const MAX_SIZE = 30;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
    altText.value = "";
  }
}

const rmvFile = () => {
  rmvFileList.push(atchFile.value);
  fileInput.value.value = "";
  atchFile.value = null;
  altText.value = "";
};

const clickDelete = async () => {
  deletePopupIsActive.value = true;
};

const deleteSubmit = async () => {
  try {
    await axios.delete(`/avatar/delete/${avtrId.value}`);
    alertModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    deleteConfirmPopupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    deleteConfirmPopupIsActive.value = true;
  }
};

const check = () => {
  if (
    avtrNm.value == "" ||
    avtrTrgt.value.length == 0 ||
    avtrGndr.value.length == 0 ||
    expsrYn.value == "" ||
    atchFile.value == null ||
    altText.value == ""
  ) {
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

  let avatarDto = {
    avtrId: avtrId.value,
    avtrNm: avtrNm.value,
    avtrTrgt: avtrTrgt.value,
    avtrGndr: avtrGndr.value,
    expsrYn: expsrYn.value == "노출" ? "Y" : "N",
    altText: altText.value,
  };
  formData.append(
    "avatarDto",
    new Blob([JSON.stringify(avatarDto)], {
      type: "application/json",
    })
  );

  try {
    const response = await axios.post("/avatar/modify", formData, {
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
      }
    }
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("avtrChartrMng");
  } else {
    avtrId.value = history.state.id;
    let avatarDto = {
      avtrId: avtrId.value,
      maskFlag: false,
    };

    await axios
      .post(`/avatar/detail`, avatarDto)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.avatarDto;
          avtrNm.value = dto.avtrNm;
          avtrTrgt.value = dto.avtrTrgt;
          avtrGndr.value = dto.avtrGndr;
          expsrYn.value = dto.expsrYn == "Y" ? "노출" : "비노출";
          if (response.data.atchFileDto != null) {
            altText.value = response.data.atchFileDto.altText;
            originalAtchFile.value = response.data.atchFileDto;
            atchFile.value = Object.assign({}, response.data.atchFileDto, {
              atchFileId: response.data.atchFileDto.atchFileId,
              name: response.data.atchFileDto.atchFileNm,
              url: response.data.atchFileDto.atchFileLink,
            });
          }
        }
      })
      .catch((error) => {
        router.push("avtrChartrMng");
      });
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

input[type="checkbox"] {
  margin: 0px 10px 0px 10px;
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

.select-box {
  width: 30%;
}
</style>