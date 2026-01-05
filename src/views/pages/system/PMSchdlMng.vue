<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > PM 일정 관리</p>
    <p class="heading">PM 일정 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>상태</span></th>
        <td>
          <div>
            <span>
              <input
                type="checkbox"
                id="chkPmSchdlSttsA"
                name="chkPmSchdlStts"
                value=""
                v-model="checkAll"
                @click="clickCheckAll"
              />
              <label for="chkPmSchdlSttsAF">전체</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkPmSchdlSttsW"
                name="chkPmSchdlStts"
                value="W"
                v-model="pmSchdlStts"
              />
              <label for="chkPmSchdlSttsW">대기</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkPmSchdlSttsP"
                name="chkPmSchdlStts"
                value="P"
                v-model="pmSchdlStts"
              />
              <label for="chkPmSchdlSttsP">진행중</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkPmSchdlSttsE"
                name="chkPmSchdlStts"
                value="E"
                v-model="pmSchdlStts"
              />
              <label for="chkPmSchdlSttsE">종료</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkPmSchdlSttsC"
                name="chkPmSchdlStts"
                value="C"
                v-model="pmSchdlStts"
              />
              <label for="chkPmSchdlSttsC">취소</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>등록일자</span></th>
        <td>
          <div>
            <calendar-comp
              v-model:startDate="startDate"
              v-model:endDate="endDate"
              :selectBox="true"
            ></calendar-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>키워드</span></th>
        <td>
          <div>
            <select-comp
              :options="['제목', '내용', '긴급연락처', '등록자']"
              v-model:selected="searchType"
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
        <button class="btn-1" @click="router.push('/pmSchdlMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="30%" />
        <col width="10%" />
        <col width="10%" />
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>제목</span></th>
          <th><span>시작일시</span></th>
          <th><span>종료일시</span></th>
          <th><span>상태</span></th>
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
            <span>{{ sr.pmSchdlId }}</span>
          </td>
          <td class="td-title" @click="moveToDetail(sr.pmSchdlId)">
            <span style="text-decoration: underline">{{ sr.pmSchdlTtl }}</span>
          </td>
          <td>
            <span>{{ sr.jobBgngDt }}</span>
          </td>
          <td>
            <span>{{ sr.jobEndDt }}</span>
          </td>
          <td>
            <span v-if="sr.pmSchdlStts == 'W'" class="text-red">대기</span>
            <span v-if="sr.pmSchdlStts == 'P'">진행중</span>
            <span v-if="sr.pmSchdlStts == 'E'">종료</span>
            <span v-if="sr.pmSchdlStts == 'C'">취소</span>
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
          <td colspan="9">조회된 결과가 없습니다.</td>
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
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="inquiry(masking)"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
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

const router = useRouter();
const popupIsActive = ref(false);

const pageable = ref({});

const masking = ref(true);
const startDate = ref();
const endDate = ref();
const checkAll = ref(true);
const pmSchdlStts = ref(["W", "P", "E", "C"]);
const searchType = ref("제목");
const searchWord = ref("");
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

watch(pmSchdlStts, (v) => {
  checkAll.value = pmSchdlStts.value.length == 4 ? true : false;
});

const clickCheckAll = () => {
  if (!checkAll.value) {
    pmSchdlStts.value = ["W", "P", "E", "C"];
  } else {
    pmSchdlStts.value = [];
  }
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const moveToDetail = (pmSchdlId) => {
  router.push({
    name: "pmSchdlDtlView",
    state: { id: pmSchdlId },
  });
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
    searchPmSchdlStts: pmSchdlStts.value,
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    pmSchdlTtl: "",
    pmSchdlCn: "",
    emct: "",
    rgtr: "",
  };

  if (searchType.value == "제목") {
    param.pmSchdlTtl = searchWord.value;
  } else if (searchType.value == "내용") {
    param.pmSchdlCn = searchWord.value;
  } else if (searchType.value == "긴급연락처") {
    param.emct = searchWord.value;
  } else if (searchType.value == "등록자") {
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
      `/pmSchedule/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
    .finally(() => {});
};
const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/pmSchedule/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  await inquiry(masking.value);
});
</script>

<style scoped>
.td-title {
  cursor: pointer;
  text-align: left;
  padding-left: 1rem;
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
