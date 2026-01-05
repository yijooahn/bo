<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 비상연락망 관리</p>
    <p class="heading">비상연락망 관리</p>
    <div style="float: right; margin-bottom: 10px">
      <button class="btn-1" v-if="masking" @click="unmasking()">
        마스킹 해제
      </button>
      <button class="btn-2" @click="choiceDelete()">선택삭제</button>
      <button class="btn-1" @click="emctPop('register', null)">추가</button>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="checkAll"
              @click="clickCheckAll"
              :checked="
                searchResult.length > 0 &&
                selectList.length == searchResult.length
              "
            />
          </th>
          <th><span>시스템</span></th>
          <th><span>구분</span></th>
          <th><span>소속</span></th>
          <th><span>이름</span></th>
          <th><span>직급</span></th>
          <th><span>연락처</span></th>
          <th><span>이메일</span></th>
        </tr>
      </thead>
      <tbody>
        <template
          v-if="searchResult.length > 0"
          v-for="(sr, idx) in searchResult"
          :key="idx"
        >
          <tr>
            <td rowspan="2">
              <span
                ><input
                  type="checkbox"
                  v-model="selectList"
                  :value="sr.emctId"
                  :id="sr.emctId"
              /></span>
            </td>
            <td
              rowspan="2"
              class="td-title"
              @click="emctPop('modify', sr.emctId)"
            >
              <span style="text-decoration: underline">{{ sr.sysNm }}</span>
            </td>
            <td>
              <span v-if="sr.mngrSe == '1'">정</span>
              <span v-else></span>
            </td>
            <td>
              <span>{{ sr.ogdpInst }}</span>
            </td>
            <td>
              <span>{{ sr.mngrNm }}</span>
            </td>
            <td>
              <span>{{ sr.mngrRank }}</span>
            </td>
            <td>
              <span>{{ sr.mblNo }}</span>
            </td>
            <td>
              <span>{{ sr.emlAddr }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">부</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">{{ sr.ogdpInst2 }}</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">{{ sr.mngrNm2 }}</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">{{ sr.mngrRank2 }}</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">{{ sr.mblNo2 }}</span>
              <span v-else></span>
            </td>
            <td>
              <span v-if="sr.mngrSe2 == '0'"></span>
              <span v-if="sr.mngrSe2 == '2'">{{ sr.emlAddr2 }}</span>
              <span v-else></span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="8">조회된 결과가 없습니다.</td>
          </tr>
        </template>
      </tbody>
    </table>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="inquiry('mask')"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="emctPopupIsActive"
      :is="EmctModal"
      :alertModal="emctModal"
      @on-reload-handler="inquiry('mask')"
    ></component>
    <component
      v-model:isActive="deleteCheckedPopupIsActive"
      :is="ModalComp"
      :alertModal="deleteCheckedModal"
      @onSubmitHandler="deleteCheckedSubmit()"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import EmctModal from "@/views/components/popup/EmctModal.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const maskingStore = useMaskingStore();
const router = useRouter();
const deleteCheckedPopupIsActive = ref(false);
const emctPopupIsActive = ref(false);
const popupIsActive = ref(false);

const masking = ref(true);
const checkAll = ref(false);
const selectList = ref([]);
const searchResult = ref([]);

const alertModal = ref({
  contentAlign: "start",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  masking: false,
  display: "block",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>승인 하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "취소",
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

const emctModal = ref({
  contentAlign: "left",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  display: "block",
  headerHtml: "<h4>비상연락망 수정</h4>",
  bodyHtml: "",
  width: "fit-content",
  height: "fit-content",
  msgWidth: "fit-content",
  msgHeight: "fit-content",
  popupType: "",
  emctId: 0,
});

const clickCheckAll = () => {
  if (!checkAll.value) {
    selectList.value = searchResult.value.map((sr) => sr.emctId);
  } else {
    selectList.value = [];
  }
};

watch(selectList, (v) => {
  checkAll.value =
    selectList.value.length > 0 &&
    selectList.value.length == searchResult.value.length
      ? true
      : false;
});

watch(emctPopupIsActive, async (newVal, oldVal) => {
  if (oldVal && oldVal != newVal) {
    await inquiry("bare");
  }
});

const emctPop = (popupType, emctId) => {
  if (popupType === "register") {
    emctModal.value.popupType = popupType;
    emctModal.value.emctId = null;
    emctModal.value.headerHtml = "<h4>비상연락망 추가</h4>";
  } else if (popupType === "modify") {
    if (Array.isArray(emctId) && emctId.length > 1) {
      alertModal.value.headerHtml = "<h4>알림</h4>";
      alertModal.value.bodyHtml = "<span>단일 시스템을 선택해주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      return;
    } else if (Array.isArray(emctId) && emctId.length == 1) {
      emctModal.value.popupType = popupType;
      emctModal.value.emctId = emctId[0];
      emctModal.value.headerHtml = "<h4>비상연락망 수정</h4>";
    } else if (Array.isArray(emctId) && emctId.length == 0) {
      alertModal.value.headerHtml = "<h4>알림</h4>";
      alertModal.value.bodyHtml = "<span>시스템을 선택해주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      return;
    } else if (!Array.isArray(emctId) && emctId != null) {
      emctModal.value.popupType = popupType;
      emctModal.value.emctId = emctId;
      emctModal.value.headerHtml = "<h4>비상연락망 수정</h4>";
    }
  }
  emctPopupIsActive.value = true;
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const deleteCheckedSubmit = async () => {
  try {
    for (const emctId of selectList.value) {
      await axios.delete(`/emergency/delete/${emctId}`);
    }
    alertModal.value.headerHtml = "<h4>알림</h4>";
    alertModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
        alertModal.value.headerHtml = "<h4>알림</h4>";
        alertModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
        alertModal.value.buttons = [
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
  } finally {
    selectList.value = [];
    if (masking.value) {
      await inquiry();
    } else {
      await inquiry("bare");
    }
  }
};

const choiceDelete = async () => {
  if (selectList.value.length > 0) {
    deleteCheckedModal.value.bodyHtml =
      "<span>선택한 항목을 삭제하시겠습니까?</span>";
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
  } else {
    deleteCheckedModal.value.bodyHtml =
      "<span>삭제할 시스템을 선택해 주세요.</span>";
    deleteCheckedModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    deleteCheckedPopupIsActive.value = true;
  }
};

const inquiry = async (bare) => {
  let endp = "inquiry";
  if (!masking.value) {
    endp += "bare";
  }
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
  }

  searchResult.value = [];
  let param = {};

  await axios
    .post(`/emergency/${endp}`, param)
    .then((response) => {
      if (response.data != null) {
        searchResult.value = response.data;
      } else {
        searchResult.value = [];
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status != null) {
          if (error.response.status == 404) {
            searchResult.value = [];
          }
        }
      }
    })
    .finally(() => {
      masking.value = true;
      selectList.value = [];
    });
};
const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/emergency/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  await inquiry("bare");
});
</script>

<style scoped>
.td-title {
  color: blue;
  cursor: pointer;
  text-align: left;
  padding-left: 1rem;
}

.modal-container {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>