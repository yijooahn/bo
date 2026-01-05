<template>
  <modal-comp
    @on-confirm-click="onConfirm"
    @on-reload-click="onReload"
    @on-relocate-click="onRelocate"
    @on-submit-click="onSubmit"
    @on-search-click="onSearch"
    :alertModal="alertModal"
    v-if="isActive"
    v-model:isActive="isActive"
  >
    <template #header>
      <div v-html="alertModal.headerHtml"></div>
    </template>
    <template #body>
      <div
        class="modal-container"
        style="margin: 1rem; height: 80vh; overflow: auto"
      >
        <div class="tit-container">
          <div class="tit"></div>
          <label>시스템명</label><span class="text-red"> *</span>
        </div>
        <input
          type="text"
          style="margin-left: 10px; text-align: left"
          v-model="sysNm"
          placeholder="시스템명을 입력하세요"
          maxlength="20"
        />
        <br />
        <div class="tit-container">
          <div class="tit"></div>
          <label>정</label>
        </div>
        <table class="table-2">
          <colgroup>
            <col width="10%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th><span>소속</span><span class="text-red"> *</span></th>
              <td>
                <input
                  type="text"
                  v-model="ogdpInst"
                  placeholder="소속을 입력하세요"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th><span>이름</span><span class="text-red"> *</span></th>
              <td>
                <input
                  type="text"
                  v-model="mngrNm"
                  placeholder="이름을 입력하세요"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th><span>직급</span><span class="text-red"> *</span></th>
              <td>
                <input
                  type="text"
                  v-model="mngrRank"
                  placeholder="직급을 입력하세요"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th><span>연락처</span><span class="text-red"> *</span></th>
              <td>
                <input
                  type="tel"
                  v-model="mblNo"
                  placeholder="연락처를 입력하세요"
                  pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th><span>이메일</span><span class="text-red"> *</span></th>
              <td>
                <input
                  type="email"
                  v-model="emlAddr"
                  placeholder="이메일을 입력하세요"
                  maxlength="100"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="tit-container">
          <div class="tit"></div>
          <label>부</label>
        </div>
        <table class="table-2">
          <colgroup>
            <col width="10%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <span>소속</span>
              </th>
              <td>
                <input type="text" v-model="ogdpInst2" maxlength="20" />
              </td>
            </tr>
            <tr>
              <th>
                <span>이름</span>
              </th>
              <td>
                <input type="text" v-model="mngrNm2" maxlength="20" />
              </td>
            </tr>
            <tr>
              <th>
                <span>직급</span>
              </th>
              <td>
                <input type="text" v-model="mngrRank2" maxlength="20" />
              </td>
            </tr>
            <tr>
              <th>
                <span>연락처</span>
              </th>
              <td>
                <input
                  type="tel"
                  v-model="mblNo2"
                  pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                  maxlength="20"
                />
              </td>
            </tr>
            <tr>
              <th>
                <span>이메일</span>
              </th>
              <td>
                <input type="email" v-model="emlAddr2" maxlength="100" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            class="btn-1"
            v-if="popupType == 'modify'"
            @click="check(popupType)"
          >
            수정
          </button>
          <button
            class="btn-1"
            v-if="popupType == 'register'"
            @click="check(popupType)"
          >
            추가
          </button>
        </div>
      </div>
      <reg-modal
        v-model:isActive="regModalIsActive"
        :alertModal="regModal"
        @onConfirmHandler="handleModalConfirm()"
        @onSubmitHandler="triggerSubmit(popupType)"
      ></reg-modal>
    </template>
  </modal-comp>
</template>
  
<script setup lang="ts">
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { defineEmits, defineModel, defineProps, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ModalComp from "../Pop.vue";

const isActive = defineModel("isActive", {
  type: Boolean,
  required: false,
  default: false,
});
const emits = defineEmits([
  "onConfirmHandler",
  "onReloadHandler",
  "onRelocateHandler",
  "onSubmitHandler",
  "onSearchHandler",
]);
const props = defineProps({
  alertModal: {
    type: Object,
    required: false,
  },
});
function onConfirm() {
  isActive.value = false;
  emits("onConfirmHandler");
}
function onReload() {
  isActive.value = false;
  emits("onReloadHandler");
}
function onRelocate() {
  isActive.value = false;
  emits("onRelocateHandler");
}
function onSubmit() {
  isActive.value = false;
  emits("onSubmitHandler");
}
function onSearch() {
  isActive.value = true;
  emits("onSearchHandler");
}

const router = useRouter();
const popupType = ref("");
const emctId = ref(null);
const maskFlag = ref(true);

const sysNm = ref("");
const mngrSe = ref();
const ogdpInst = ref("");
const mngrNm = ref("");
const mngrRank = ref("");
const mblNo = ref("");
const emlAddr = ref("");
const mngrSe2 = ref();
const ogdpInst2 = ref("");
const mngrNm2 = ref("");
const mngrRank2 = ref("");
const mblNo2 = ref("");
const emlAddr2 = ref("");
const regModalIsActive = ref(false);

const regModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록하시겠습니까?</span>",
  width: "70%",
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

watch(isActive, async (v) => {
  if (v) {
    emctId.value = props.alertModal.emctId;
    popupType.value = props.alertModal.popupType;
    if (emctId.value != null && popupType.value == "modify") {
      await inquiry();
    } else {
      sysNm.value = "";
      mngrSe.value = null;
      ogdpInst.value = "";
      mngrNm.value = "";
      mngrRank.value = "";
      mblNo.value = "";
      emlAddr.value = "";
      mngrSe2.value = null;
      ogdpInst2.value = "";
      mngrNm2.value = "";
      mngrRank2.value = "";
      mblNo2.value = "";
      emlAddr2.value = "";
    }
  }
});

const check = (popupType) => {
  if (popupType == "modify") {
    if (
      emctId.value == "" ||
      sysNm.value == "" ||
      ogdpInst.value == "" ||
      mngrNm.value == "" ||
      mngrRank.value == "" ||
      mblNo.value == "" ||
      emlAddr.value == "" ||
      sysNm.value == null ||
      ogdpInst.value == null ||
      mngrNm.value == null ||
      mngrRank.value == null ||
      mblNo.value == null ||
      emlAddr.value == null
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
      regModalIsActive.value = true;
      return;
    }
  } else if (popupType == "register") {
    if (
      sysNm.value == "" ||
      ogdpInst.value == "" ||
      mngrNm.value == "" ||
      mngrRank.value == "" ||
      mblNo.value == "" ||
      emlAddr.value == ""
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
      regModalIsActive.value = true;
      return;
    }
  }
  if (
    ogdpInst2.value != "" ||
    mngrNm2.value != "" ||
    mngrRank2.value != "" ||
    mblNo2.value != "" ||
    emlAddr2.value != ""
  ) {
    mngrSe.value = 1;
    mngrSe2.value = 2;
  } else {
    mngrSe.value = 1;
    mngrSe2.value = null;
  }

  beforeTriggerSubmit(popupType);
};

const beforeTriggerSubmit = (popupType) => {
  if (popupType == "modify") {
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
    regModalIsActive.value = true;
  } else if (popupType == "register") {
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
    regModalIsActive.value = true;
  }
};

const triggerSubmit = async (popupType) => {
  if (popupType == "modify") {
    let param = {
      emctId: emctId.value,
      sysNm: sysNm.value,
      mngrSe: mngrSe.value,
      ogdpInst: ogdpInst.value,
      mngrNm: mngrNm.value,
      mngrRank: mngrRank.value,
      mblNo: mblNo.value,
      emlAddr: emlAddr.value,
      mngrSe2: mngrSe2.value,
      ogdpInst2: ogdpInst2.value,
      mngrNm2: mngrNm2.value,
      mngrRank2: mngrRank2.value,
      mblNo2: mblNo2.value,
      emlAddr2: emlAddr2.value,
    };
    try {
      const response = await axios.post(`/emergency/modify`, param);
      regModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
      regModal.value.buttons = [
        {
          clickEvent: "confirm",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      regModalIsActive.value = true;
    } catch (err) {
      regModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
      regModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      regModalIsActive.value = true;
      return;
    }
  } else if (popupType == "register") {
    let param = {
      emctId: emctId.value,
      sysNm: sysNm.value,
      mngrSe: mngrSe.value,
      ogdpInst: ogdpInst.value,
      mngrNm: mngrNm.value,
      mngrRank: mngrRank.value,
      mblNo: mblNo.value,
      emlAddr: emlAddr.value,
      mngrSe2: mngrSe2.value,
      ogdpInst2: ogdpInst2.value,
      mngrNm2: mngrNm2.value,
      mngrRank2: mngrRank2.value,
      mblNo2: mblNo2.value,
      emlAddr2: emlAddr2.value,
    };
    try {
      const response = await axios.post(`/emergency/create`, param);
      regModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
      regModal.value.buttons = [
        {
          clickEvent: "confirm",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      regModalIsActive.value = true;
    } catch (err) {
      regModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
      regModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      regModalIsActive.value = true;
      return;
    }
  }
};

const handleModalConfirm = () => {
  isActive.value = false;
};

const inquiry = async () => {
  await axios
    .get(`/emergency/detail/${emctId.value}`)
    .then((response) => {
      if (response.data != null) {
        const dto = response.data.emctPopDto;
        sysNm.value = dto.sysNm;
        ogdpInst.value = dto.ogdpInst;
        mngrNm.value = dto.mngrNm;
        mngrRank.value = dto.mngrRank;
        mblNo.value = dto.mblNo;
        emlAddr.value = dto.emlAddr;
        ogdpInst2.value = dto.ogdpInst2;
        mngrNm2.value = dto.mngrNm2;
        mngrRank2.value = dto.mngrRank2;
        mblNo2.value = dto.mblNo2;
        emlAddr2.value = dto.emlAddr2;
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status != null) {
          if (error.response.status == 404) {
          }
        }
      }
    })
    .finally(() => {});
};
</script>

<style scoped>
.modal-container {
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  backdrop-filter: none;
}

.tit-container {
  margin-top: 0;
  text-align: left;
  height: 1vh;
}

th,
td {
  font-weight: unset;
  font-style: unset;
  padding: 0.3rem !important;
  height: 1vh !important;
}

input[type="text"],
input[type="tel"],
input[type="password"],
input[type="number"],
input[type="email"] {
  all: unset;
  display: flex;
  min-width: 150px;
  min-width: 7vw;
  padding: 7px 10px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid #e4e1e1;
  background: #fff;
  color: var(--black, #373f57);
  font-family: SpoqaHanSansNeo;
  font-style: normal;
  line-height: 100%;
  width: 90% !important;
  height: 1.6vh !important;
}

input[type="text"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
input[type="password"]:focus {
  all: unset;
  display: flex;
  min-width: 7vw;
  padding: 7px 10px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid var(--blue, #4876ef);
  background: #fff;
  color: var(--black, #373f57);
  line-height: 100%;
  height: 1.6vh !important;
}
</style>
  