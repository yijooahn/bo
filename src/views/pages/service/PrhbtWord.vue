<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 금칙어 관리</p>
    <p class="heading">금칙어 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>등록일자</span></th>
        <td>
          <div>
            <calendar-comp
              v-model:startDate="startDate"
              v-model:endDate="endDate"
              :selectBox="true"
              :reverse="false"
            ></calendar-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>키워드</span></th>
        <td>
          <div>
            <select-comp
              :options="['금칙어', '등록자']"
              v-model:selected="searchKeyword"
            ></select-comp>
            <input
              type="text"
              placeholder="키워드를 입력하세요"
              v-model.trim="searchWord"
              @keyup.enter="
                pageable.number = undefined;
                inquiry();
              "
            />
          </div>
        </td>
      </tr>
    </table>
    <div class="ct-18">
      <button
        @click="
          pageable.number = undefined;
          inquiry();
        "
        class="btn-1"
      >
        조회
      </button>
    </div>
    <div
      style="
        background-color: #373f57;
        padding: 30px;
        margin: 16px 0px 0px 0px;
        text-align: center;
      "
    >
      <button
        :class="{
          'btn-filtering': true,
          active: k_spelling === selectedFilterString,
        }"
        :key="k_spelling"
        v-for="k_spelling in k_list"
        @click="clickSpellBtn(k_spelling)"
      >
        {{ k_spelling }}
      </button>
      <br />
      <button
        :class="{
          'btn-filtering': true,
          active: e_spelling === selectedFilterString,
        }"
        :key="e_spelling"
        v-for="e_spelling in e_list"
        @click="clickSpellBtn(e_spelling)"
      >
        {{ e_spelling }}
      </button>
      <br />
      <button
        :class="{
          'btn-filtering': true,
          active: x_spelling === selectedFilterString,
        }"
        :key="x_spelling"
        v-for="x_spelling in x_list"
        @click="clickSpellBtn(x_spelling)"
      >
        {{ x_spelling }}
      </button>
      <button
        class="btn-filtering"
        style="float: right; width: 6rem"
        @click="reset()"
      >
        초기화
      </button>
    </div>
    <table>
      <tr>
        <th style="background-color: lightgray; text-align: center">
          <input
            type="text"
            v-model="textRegWord"
            style="display: inline-block; width: 40%; text-align: left"
            placeholder="금칙어를 입력하세요"
            maxlength="1000"
          />
          <button class="btn-1" @click="check()">추가</button>
        </th>
      </tr>
    </table>
    <div class="ct-19">
      <component
        :is="pagination"
        v-model:pageable="pageable"
        :isPageSize="true"
      ></component>
      <div class="ct-21">
        <button class="btn-1" v-if="masking" @click="unmasking()">
          마스킹 해제
        </button>
        <button class="btn-2" @click="choiceDelete()">선택삭제</button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="50%" />
        <col width="8%" />
        <col width="8%" />
        <col width="12%" />
        <col width="12%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="checkAll"
              @click="clickCheckAll"
              :disabled="disableCheckAll"
            />
          </th>
          <th><span>No.</span></th>
          <th><span>금칙어</span></th>
          <th><span>등록자명</span></th>
          <th><span>최종수정자명</span></th>
          <th class="sort-column" @click="sort('A.REG_DT')">
            <span>등록일시</span>
            <span
              v-if="'A.REG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'A.REG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('A.CHG_DT')">
            <span>최종수정일시</span>
            <span
              v-if="'A.CHG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'A.CHG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!pageable.empty">
        <tr v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <input
              type="checkbox"
              v-model="selectList"
              :id="sr.prhbtWordId"
              :value="sr.prhbtWordId"
            />
          </td>
          <td>
            <span>{{ sr.prhbtWordId }}</span>
          </td>
          <td class="td-title" @click="openModify(sr.prhbtWordId)">
            {{ setTextform(sr.prhbtWord) }}
          </td>
          <td>
            <span>{{ sr.rgtr }}</span>
          </td>
          <td>
            <span>{{ sr.chgr }}</span>
          </td>
          <td>
            <span>{{ sr.regDt }}</span>
          </td>
          <td>
            <span>{{ sr.chgDt }}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="t-c">
          <td colspan="7">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <div class="ct-22">
      <component
        @on-change-handler="inquiry(true)"
        :is="pagination"
        v-model:pageable="pageable"
      ></component>
    </div>
    <component
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="inquiry(masking)"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="regPopupIsActive"
      :alertModal="regModal"
      @onSubmitHandler="regTriggerSubmit()"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="modifyPopupIsActive"
      :alertModal="modifyModal"
      :is="MdfnPrhbtWordPopup"
      @on-reload-handler="inquiry(masking)"
    ></component>
    <component
      v-model:isActive="deleteCheckedPopupIsActive"
      :alertModal="deleteCheckedModal"
      @on-reload-handler="inquiry(masking)"
      @onSubmitHandler="deleteCheckedSubmit()"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import MdfnPrhbtWordPopup from "@/views/components/popup/ModifyPrhbtWordPopup.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
const maskingStore = useMaskingStore();
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

const regModal = ref({
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

const modifyModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>금칙어 수정</h4>",
  width: "30rem",
  height: "20rem",
  prhbtWordId: "",
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

const k_list = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const e_list = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const x_list = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "<",
  ">",
  "[",
  "]",
  "{",
  "}",
  "\\",
  "?",
  "/",
  ":",
  ";",
  '"',
  "'",
  "+",
  "-",
];

const alertPopupIsActive = ref(false);
const regPopupIsActive = ref(false);
const modifyPopupIsActive = ref(false);
const deleteCheckedPopupIsActive = ref(false);

const filterString = ref("");
const selectedFilterString = ref("");
const textRegWord = ref();

const pageable = ref({});

const masking = ref(true);
const startDate = ref();
const endDate = ref();
const searchKeyword = ref("금칙어");
const searchWord = ref("");
const checkAll = ref(false);
const disableCheckAll = ref(true);
const selectList = ref([]);
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("A.REG_DT");
const store = useSortStore();
const { sortTable } = store;

function sort(column) {
  sortTable(sortColumn, column, ascending);
}

watch(ascending, async (newVal, oldVal) => {
  if (newVal != oldVal) {
    if (newVal) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    masking.value = true;
    await inquiry(masking.value);
  }
});

watch(sortColumn, async (newVal, oldval) => {
  if (newVal != oldval) {
    pageable.value.sort = newVal;
    masking.value = true;
    await inquiry(masking.value);
  }
});

const clickCheckAll = () => {
  if (!checkAll.value) {
    selectList.value = searchResult.value.map((sr) => sr.prhbtWordId);
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

watch(searchResult, (v) => {
  if (searchResult.value != undefined && searchResult.value != null) {
    disableCheckAll.value = searchResult.value.length > 0 ? false : true;
  }
});

watch(modifyPopupIsActive, async (newVal, oldVal) => {
  if (oldVal && oldVal != newVal) {
    await inquiry(masking.value);
  }
});

function setTextform(prhbtWord) {
  const maxLength = 100;
  let formatText = "";
  if (prhbtWord.length > maxLength) {
    for (let i = 0; i < prhbtWord.length; i += maxLength) {
      formatText += prhbtWord.substring(i, i + maxLength) + "\n";
    }
    return formatText.trimEnd();
  } else {
    return prhbtWord;
  }
}

const unmasking = () => {
  alertModal.value.masking = true;
  alertPopupIsActive.value = true;
};

const choiceDelete = async () => {
  if (selectList.value.length > 0) {
    deleteCheckedModal.value.headerHtml = "<h4>알림</h4>";
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
    deleteCheckedModal.value.headerHtml = "<h4>알림</h4>";
    deleteCheckedModal.value.bodyHtml =
      "<span>삭제할 금칙어를 선택해 주세요.</span>";
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

const deleteCheckedSubmit = async () => {
  try {
    for (const prhbtWordId of selectList.value) {
      await axios.delete(`/notext/delete/${prhbtWordId}`);
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
    alertPopupIsActive.value = true;
  } catch (error) {
    if (error.repsonse != null) {
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
      }
    }
  } finally {
    selectList.value = [];
    await inquiry();
  }
};

const clickSpellBtn = async (filterStr) => {
  if (filterStr != null && filterStr != undefined) {
    selectedFilterString.value = filterStr;
    filterString.value = filterStr;
    await inquiry();
  }
};

const reset = async () => {
  selectedFilterString.value = "";
  filterString.value = "";
  await inquiry();
};

const check = () => {
  if (
    textRegWord.value === "" ||
    textRegWord.value === undefined ||
    textRegWord.value === null
  ) {
    alertModal.value.headerHtml = "<h4>알림</h4>";
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
  } else {
    beforeRegTriggerSubmit();
  }
};

const beforeRegTriggerSubmit = () => {
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
  regPopupIsActive.value = true;
};

const regTriggerSubmit = async () => {
  let param = {
    prhbtWord: textRegWord.value,
  };

  try {
    const response = await axios.post(`/notext/create`, param);
    alertModal.value.headerHtml = "<h4>알림</h4>";
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "reload",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    textRegWord.value = null;
  } catch (error) {
    alertModal.value.headerHtml = "<h4>알림</h4>";
    alertModal.value.bodyHtml = "<span>이미 등록된 금칙어 입니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    textRegWord.value = null;
  }
};

const openModify = (prhbtWordId) => {
  modifyModal.value.prhbtWordId = prhbtWordId;
  modifyPopupIsActive.value = true;
};

function setEndPoint(maskFlag) {
  if (maskFlag == null) {
    masking.value = true;
    pageable.value.number = 0;
    return "inquiry";
  } else if (!maskFlag) {
    masking.value = false;
    return "inquirybare";
  } else {
    masking.value = true;
    return "inquiry";
  }
}

function setParam() {
  searchResult.value = [];
  let param = {
    filterString: filterString.value,
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    prhbtWord: "",
    rgtr: "",
  };

  if (searchKeyword.value == "금칙어") {
    param.prhbtWord = searchWord.value;
  } else if (searchKeyword.value == "등록자") {
    param.rgtr = searchWord.value;
  }

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `notext/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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

        if (response.data.content != null) {
          if (response.data.content.length > 0) {
            searchResult.value = response.data.content;
          } else {
            pageable.value.empty = true;
            searchResult.value = [];
          }
        }
      } else {
        pageable.value.empty = true;
        searchResult.value = [];
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
      selectList.value = [];
    });
};
const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/notext/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
.td-title {
  text-decoration: underline;
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

.btn-filtering {
  width: 2rem;
  height: 2rem;
  padding: 0px;
  margin: 5px;
  background-color: white;
  color: #373f57;
  align-items: center;
  place-content: center;
  border: 0px;
  cursor: pointer;
}

.btn-filtering:hover {
  background-color: lightgray;
}

.btn-filtering.active {
  background-color: lightblue;
}
</style>
