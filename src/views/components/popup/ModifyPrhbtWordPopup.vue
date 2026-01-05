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
      <div class="modal-div">
        <br />
        <div class="input-container">
          <textarea
            class=""
            v-model="prhbtWord"
            maxlength="1000"
          ></textarea>
        </div>
        <br />
        <div>
          <button class="btn-1" @click="triggerSubmit()">수정</button>
        </div>
      </div>
      <component
        v-model:isActive="subAlertModalIsActive"
        @on-submit-handler="isActive = false"
        :alertModal="subAlertModal"
        :is="SubAlertModal"
      ></component>
    </template>
  </modal-comp>
</template>
  
<script setup lang="ts">
import axios from "axios";
import { defineEmits, defineModel, defineProps, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ModalComp from "../Pop.vue";
import SubAlertModal from "../popup/SignUpModal.vue";

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
  isActive.value = false;
  emits("onSearchHandler");
}

const subAlertModal = ref({
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

const router = useRouter();
const prhbtWordId = ref();
const prhbtWord = ref();
const subAlertModalIsActive = ref(false);

watch(isActive, async (v) => {
  if (v) {
    prhbtWordId.value = props.alertModal.prhbtWordId;
    await inquiry();
  }
});

const inquiry = async () => {
  try {
    const response = await axios.get(`/notext/detail/${prhbtWordId.value}`);
    prhbtWord.value = response.data.notextDto.prhbtWord;
  } catch (error) {
    router.push("/prhbtWord");
  }
};

const triggerSubmit = () => {
  if (
    prhbtWordId.value == null ||
    prhbtWordId.value == undefined ||
    prhbtWord.value == null ||
    prhbtWord.value == undefined ||
    prhbtWord.value == ""
  ) {
    subAlertModal.value.headerHtml = "<h4>알림</h4>";
    subAlertModal.value.bodyHtml =
      "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
    subAlertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    subAlertModalIsActive.value = true;
    return;
  } else {
    modify();
  }
};

const modify = async () => {
  let param = {
    prhbtWordId: Number(prhbtWordId.value),
    prhbtWord: prhbtWord.value,
  };

  try {
    const response = await axios.post(`/notext/modify`, param);
    subAlertModal.value.headerHtml = "<h4>알림</h4>";
    subAlertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    subAlertModal.value.buttons = [
      {
        clickEvent: "submit",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    subAlertModalIsActive.value = true;
  } catch (error) {
    if (error.response.data === "FAIL(DUPLICATED)") {
      subAlertModal.value.headerHtml = "<h4>알림</h4>";
      subAlertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
      subAlertModal.value.buttons = [
        {
          clickEvent: "submit",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      subAlertModalIsActive.value = true;
    } else {
      subAlertModal.value.headerHtml = "<h4>알림</h4>";
      subAlertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
      subAlertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      subAlertModalIsActive.value = true;
      return;
    }
  }
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  backdrop-filter: none;
}

textarea {
  display: flex !important;
  width: 20rem !important;
  height: 8rem;
  align-items: flex-start !important;
  gap: 10px !important;
  border-radius: 6px !important;
  border: 1px solid #e4e1e1 !important;
  background: #fff !important;
  color: var(--black, #373f57) !important;
  font-family: SpoqaHanSansNeo !important;
  font-style: normal !important;
  line-height: 100% !important;
  overflow: auto;
  resize: none;
}

textarea:hover,
textarea:focus {
  display: flex !important;
  width: 20rem !important;
  height: 8rem;
  outline: rgb(41, 132, 251);
  align-items: flex-start !important;
  gap: 10px !important;
  border-radius: 6px !important;
  border: 1px solid var(--blue, #4876ef) !important;
  line-height: 100% !important;
  resize: none;
}
</style>