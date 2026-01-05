<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 사용자 작업이력 조회</p>
    <p class="heading">사용자 작업이력 조회</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>구분</span></th>
          <td>
            <div>
              <select-comp
                :options="[
                  '전체',
                  '교사 - 로그인',
                  '교사 - 로그아웃',
                  '교사 - 뷰어 실행',
                  '교사 - 진도 저장',
                  '교사 - 코스 재구성 _ 임시저장',
                  '교사 - 코스 재구성 _ 저장',
                  '교사 - 학습 자료 등록',
                  '교사 - (진단/총괄/형성) 평가 부여(오픈)',
                  '교사 - AI 처방 부여',
                  '교사 - 과제 부여 / 과제 취소',
                  '교사 - 과제 반려',
                  '교사 - 누가 기록',
                ]"
                v-model:selected="searchOption"
                class="select-comp"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>작업일시</span></th>
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
                :options="['UUID', '작업내용']"
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
      </tbody>
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
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="15%" />
        <col width="25%" />
        <col width="15%" />
        <col width="10%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>시스템명</span></th>
          <th><span>작업내용</span></th>
          <th><span>UUID</span></th>
          <th><span>소속</span></th>
          <th class="sort-column" @click="sort('JOB_DT')">
            <span>작업일시</span>
            <span
              v-if="'JOB_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'JOB_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.jobId }}</span>
          </td>
          <td>
            <span>{{ sr.jobMenuNm }}</span>
          </td>
          <td>
            <span>{{ sr.jobCn }}</span>
          </td>
          <td>
            <span>{{ sr.userUuid }}</span>
          </td>
          <td>
            <span>{{ sr.userOdgp }}</span>
          </td>
          <td>
            <span>{{ sr.jobDt }}</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="6">조회된 결과가 없습니다.</td>
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
      @on-reload-handler="() => inquiry(masking)"
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

const masking = ref(true);
const popupIsActive = ref(false);

const pageable = ref({});

const startDate = ref();
const endDate = ref();
const searchOption = ref("전체");
const searchKeyword = ref("UUID");
const searchWord = ref("");
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("JOB_DT");
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

const insertComma = (num) => {
  if (num == null) {
    return "0";
  } else if (num.toString().length > 3) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/userjob/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
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
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    jobTrgt: "TCHR",
    jobSe: "",
    userUuid: "",
    jobCn: "",
  };

  // 공통코드 추가 예정 - 임시 하드코딩
  if (searchOption.value != "전체") {
    let jobTrgt = searchOption.value
      .substring(0, searchOption.value.indexOf("-"))
      .trim();
    let jobSe = searchOption.value
      .substring(searchOption.value.indexOf("-") + 1)
      .trim();
    if (jobTrgt == "교사" && jobSe == "로그인") {
      param.jobSe = "TCHR001";
    } else if (jobTrgt == "교사" && jobSe == "로그아웃") {
      param.jobSe = "TCHR002";
    } else if (jobTrgt == "교사" && jobSe == "뷰어 실행") {
      param.jobSe = "TCHR003";
    } else if (jobTrgt == "교사" && jobSe == "진도 저장") {
      param.jobSe = "TCHR004";
    } else if (jobTrgt == "교사" && jobSe == "코스 재구성 _ 임시저장") {
      param.jobSe = "TCHR005";
    } else if (jobTrgt == "교사" && jobSe == "코스 재구성 _ 저장") {
      param.jobSe = "TCHR006";
    } else if (jobTrgt == "교사" && jobSe == "학습 자료 등록") {
      param.jobSe = "TCHR007";
    } else if (
      jobTrgt == "교사" &&
      jobSe == "(진단/총괄/형성) 평가 부여(오픈)"
    ) {
      param.jobSe = "TCHR008";
    } else if (jobTrgt == "교사" && jobSe == "AI 처방 부여") {
      param.jobSe = "TCHR009";
    } else if (jobTrgt == "교사" && jobSe == "과제 부여 / 과제 취소") {
      param.jobSe = "TCHR010";
    } else if (jobTrgt == "교사" && jobSe == "과제 반려") {
      param.jobSe = "TCHR011";
    } else if (jobTrgt == "교사" && jobSe == "누가 기록") {
      param.jobSe = "TCHR012";
    }
  }

  if (searchKeyword.value == "UUID") {
    if (searchWord.value != "") {
      param.userUuid = searchWord.value;
    }
  } else if (searchKeyword.value == "작업내용") {
    if (searchWord.value != "") {
      param.jobCn = searchWord.value;
    }
  }

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "JOB_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `/userjob/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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

onMounted(async () => {
  await inquiry(masking.value);
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}

.select-comp {
  width: 20%;
}
</style>
