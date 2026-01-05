<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 아바타 관리</p>
    <p class="heading">아바타 캐릭터 등록</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tbody>
        <tr>
          <th><span>아바타이름</span><span class="text-red"> *</span></th>
          <td>
            <input
              type="text"
              style="display: inline-block; width: 800px"
              placeholder="아바타이름을 입력하세요"
              v-model="avtrNm"
              maxlength="100"
            />
          </td>
        </tr>
        <tr>
          <th><span>대상</span><span class="text-red"> *</span></th>
          <td>
            <span
              ><input
                type="checkbox"
                id="chkTrgtT"
                name="chkTrgt"
                value="T"
                v-model="avtrTrgt"
              /><label for="chkTrgtT">교사</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtE"
                name="chkTrgt"
                value="E"
                v-model="avtrTrgt"
              /><label for="chkTrgtE">초등</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtM"
                name="chkTrgt"
                value="M"
                v-model="avtrTrgt"
              /><label for="chkTrgtM">중등</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtH"
                name="chkTrgt"
                value="H"
                v-model="avtrTrgt"
              /><label for="chkTrgtH">고등</label></span
            >
          </td>
        </tr>
        <tr>
          <th><span>성별</span><span class="text-red"> *</span></th>
          <td>
            <span
              ><input
                type="checkbox"
                id="chkGndrM"
                name="chkGndr"
                value="M"
                v-model="avtrGndr"
              /><label for="chkGndrM">남성</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkGndrW"
                name="chkGndr"
                value="W"
                v-model="avtrGndr"
              /><label for="chkGndrW">여성</label></span
            >
          </td>
        </tr>
        <tr>
          <th><span>노출여부</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <component
                :is="SelectComp"
                v-model:selected="expsrYn"
                :options="['노출', '비노출']"
              ></component>
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
                <span v-if="atchFile != null" style="display: block">
                  <br /><br />이미지 설명<span class="text-red"> *</span>
                </span>
                <input
                  v-if="atchFile != null"
                  type="text"
                  maxlength="1000"
                  placeholder="등록할 이미지의 설명을 입력해 주세요."
                  v-model="altText"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">등록</button>
      <button class="btn-3" @click="router.push('/avtrChartrMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @onSubmitHandler="triggerSubmit()"
      @onConfirmHandler="router.push('/avtrChartrMng')"
    ></reg-modal>
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
  bodyHtml: "<span>등록하시겠습니까?</span>",
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
const store = useFileStore();
const { fileCheck } = store;

const avtrNm = ref("");
const avtrTrgt = ref([]);
const avtrGndr = ref([]);
const expsrYn = ref("비노출");
const fileInput = ref();
const atchFile = ref(null);
const altText = ref("");

function handleFileChange(e) {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
  const MAX_SIZE = 30;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    altText.value = "";
  }
}

const rmvFile = () => {
  fileInput.value.value = "";
  atchFile.value = null;
  altText.value = "";
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
    return;
  } else {
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
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let avatarDto = {
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
    const response = await axios.post("/avatar/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>등록을 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
};

onMounted(() => {});
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
