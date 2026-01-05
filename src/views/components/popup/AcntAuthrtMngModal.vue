<template>
  <modal-comp
    @on-submit-click="onSubmit"
    :alertModal="memberModal"
    v-if="!popupIsActive && isActive"
    v-model:isActive="isActive"
  >
    <template #header>
      <div v-html="memberModal.headerHtml"></div>
    </template>
    <template #body>
      <div class="m-2">
        <table class="table-1">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <span>권한유무</span>
              </th>
              <td>
                <div>
                  <span>
                    <input
                      type="radio"
                      name="rdAuthrtYn"
                      id="rdo0"
                      value="0"
                      v-model="authrtYn"
                      checked
                    />
                    <label for="rdo0">전체</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="rdAuthrtYn"
                      id="rdo1"
                      value="1"
                      v-model="authrtYn"
                    />
                    <label for="rdo1">권한있음</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="rdAuthrtYn"
                      id="rdo2"
                      value="2"
                      v-model="authrtYn"
                    />
                    <label for="rdo2" class="text-red">권한없음</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span>키워드</span>
              </th>
              <td>
                <div>
                  <select-comp
                    :options="['이메일', '관리자명', '소속명']"
                    v-model:selected="searchType"
                  ></select-comp>
                  <input
                    type="text"
                    placeholder="키워드를 입력하세요"
                    v-model.trim="searchWord"
                    @keyup.enter="() => inquiry('bare')"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-2">
        <div class="ct-21">
          <button class="btn-1" v-if="masking" @click="unmasking">
            마스킹 해제
          </button>
          <button class="btn-1" @click="() => inquiry('bare')">검색</button>
        </div>
      </div>
      <div class="m-2">
        <component
          :is="pagination"
          v-model:pageable="pageable"
          :isPageSize="true"
        ></component>
        <table class="table-2 t-c">
          <thead>
            <tr>
              <th>
                <span
                  ><input
                    type="checkbox"
                    v-model="checkall"
                    @input="(v) => checkAll(v)"
                /></span>
              </th>
              <th>
                <span>계정</span>
              </th>
              <th>
                <span>관리자명</span>
              </th>
              <th>
                <span>소속명</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="searchResult.length > 0"
              v-for="(sr, idx) in searchResult"
              :key="idx"
            >
              <td>
                <span
                  ><input
                    type="checkbox"
                    @click="() => selectClick(sr.mbrId)"
                    :checked="selectCheck(sr.mbrId)"
                /></span>
              </td>
              <td>
                <span>{{ sr.emlAddr }}</span>
              </td>
              <td>
                <span>{{ sr.mbrNm }}</span>
              </td>
              <td>
                <span>{{ sr.ogdpInst }}</span>
              </td>
            </tr>
            <tr v-else>
              <td colspan="4">조회된 결과가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ct-22">
        <component
          @on-change-handler="() => inquiry()"
          :is="pagination"
          v-model:pageable="pageable"
        ></component>
      </div>
    </template>
  </modal-comp>
  <component
    v-model:isActive="popupIsActive"
    :alertModal="alertModal"
    @on-masking-handler="(v) => submitMasking(v)"
    :is="MaskingModal"
  ></component>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import MaskingModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { defineEmits, defineModel, ref, watch } from "vue";
import ModalComp from "../Pop.vue";
const searchResult = ref([]);
const ascending = ref(false);
const sortColumn = ref("");
const store = useSortStore();
const maskingStore = useMaskingStore();
const { sortTable } = store;
function sort(col) {
  sortTable(sortColumn, col, ascending);
}
const pageable = ref({});
const checkall = ref(false);
const sendList = ref([]);
const emits = defineEmits(["onSubmitHandler"]);
const selectedMemberList = ref([]);
const isActive = defineModel("isActive", {
  type: Boolean,
  default: false,
  required: false,
});
watch(isActive, async (v) => {
  if (v) {
    searchWord.value = "";
    pageable.value = {};
    await inquiry();
  }
});

watch(
  selectedMemberList,
  (v) => {
    if (searchResult.value.length > 0) {
      if (v.length < searchResult.value.length) {
        checkall.value = false;
      } else if (v.length == searchResult.value.length) {
        checkall.value = true;
      }
    }
  },
  {
    deep: true,
  }
);
const selectClick = (mbrId) => {
  if (selectedMemberList.value.length > 0) {
    if (!selectedMemberList.value.includes(mbrId)) {
      selectedMemberList.value.push(mbrId);
    } else {
      for (var i = 0; i < selectedMemberList.value.length; i++) {
        if (selectedMemberList.value[i] == mbrId) {
          selectedMemberList.value.splice(i, 1);
          return;
        }
      }
    }
  } else {
    selectedMemberList.value.push(mbrId);
  }
};
const selectCheck = (v) => {
  if (selectedMemberList.value.length > 0) {
    if (selectedMemberList.value.includes(v)) {
      return true;
    }
  }
};
const checkAll = (v) => {
  if (v.target.checked) {
    selectedMemberList.value = searchResult.value.map((sr) => sr.mbrId);
  } else {
    selectedMemberList.value = [];
  }
};
watch(checkall, (v) => {
  var a = {};
  a.target = {};
  a.target.checked = v;
  (a) => checkAll(a);
});
const alertModal = ref({
  contentAlign: "start",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  display: "block",
  headerHtml: "<h4>알림</h4>",
  masking: false,
  //bodyHtml: "<span>승인 하시겠습니까?</span>",
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
const masking = ref(true);
const authrtYn = ref(0);
const searchType = ref("이메일");
const searchWord = ref("");
const popupIsActive = ref(false);
watch(popupIsActive, async (v) => {
  if (!v) {
    pageable.value = {};
    await inquiry();
  }
});
const memberModal = ref({
  display: "block",
  contentAlign: "center",
  headerHtml: "<h4>관리자 검색</h4>",
  //bodyHtml: "<span>입력하신 이메일 주소로 <br> 인증코드를 보냈습니다.</span>",
  width: "60vw",
  height: "80vh",
  buttons: [
    {
      clickEvent: "submit",
      content: "등록",
      addClass: "btn-1",
    },
  ],
});

function onSubmit() {
  sendList.value = [];
  if (selectedMemberList.value.length > 0 && searchResult.value.length > 0) {
    for (var i = 0; i < selectedMemberList.value.length; i++) {
      for (var j = 0; j < searchResult.value.length; j++) {
        if (selectedMemberList.value[i] == searchResult.value[j].mbrId) {
          sendList.value.push(searchResult.value[j]);
          break;
        }
      }
    }
  }
  if (sendList.value.length == 0) {
    alertModal.value.masking = false;
    alertModal.value.headerHtml = "알림";
    alertModal.value.bodyHtml = "관리자를 지정해 주세요.";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } else {
    isActive.value = false;
    emits("onSubmitHandler", sendList.value);
  }
}

const inquiry = async (bare) => {
  checkall.value = false;
  selectedMemberList.value = [];
  var endp = "inquiry";
  if (!masking.value) {
    endp += "bare";
  }
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
    pageable.value.size = 10;
    pageable.value.number = 0;
  }
  searchResult.value = [];
  var param = {};
  param.authrtYn = authrtYn.value;
  if (searchType.value == "이메일") {
    if (searchWord.value != "") {
      param.emlAddr = searchWord.value;
    }
  } else if (searchType.value == "소속명") {
    if (searchWord.value != "") {
      param.ogdpInst = searchWord.value;
    }
  } else if (searchType.value == "관리자명") {
    if (searchWord.value != "") {
      param.mbrNm = searchWord.value;
    }
  }
  if (pageable.value.size == undefined) {
    pageable.value.size = 10;
  }
  if (pageable.value.number == undefined) {
    pageable.value.number = 0;
  }
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "B.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/authority/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response.data != null) {
        pageable.value.empty = response.data.empty;
        pageable.value.first = response.data.first;
        pageable.value.last = response.data.last;
        pageable.value.number = response.data.number;
        pageable.value.totalElements = response.data.totalElements;
        pageable.value.totalPages = response.data.totalPages;
        pageable.value.offset = response.data.pageable.offset;

        if (response.data.content.length > 0) {
          searchResult.value = response.data.content;
        }
      } else {
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status != null) {
          if (error.response.status == 404) {
            pageable.value.empty = true;
            pageable.value.totalPages = 0;
            searchResult.value = [];
          }
        }
      }
    })
    .finally(() => {
      masking.value = true;
    });
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/authority/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};
watch(ascending, async (n, o) => {
  if (n != o) {
    if (n) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    await inquiry();
  }
});
watch(sortColumn, async (n, o) => {
  if (n != o) {
    pageable.value.sort = n;
    await inquiry();
  }
});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
.m-2 {
  margin: 2rem;
}
</style>
