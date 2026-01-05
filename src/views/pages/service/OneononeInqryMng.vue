<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 1:1 문의 관리</p>
    <p class="heading">1:1 문의 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>구분</span></th>
        <td>
          <div>
            <select-comp
              :options="[
                '전체',
                '자료요청',
                '제안',
                '오류신고',
                '사이트이용',
                '기타',
              ]"
              v-model:selected="inqrySe"
            ></select-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>상태</span></th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdStts"
                id="Whol1"
                value=""
                v-model="inqryStts"
              />
              <label for="Whol1">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdStts"
                id="rdSttsW"
                value="대기"
                v-model="inqryStts"
              />
              <label for="rdSttsW" class="text-red">대기</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdStts"
                id="rdSttsC"
                value="답변완료"
                v-model="inqryStts"
              />
              <label for="rdSttsC">답변완료</label>
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
        <th><span>제목</span></th>
        <td>
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              v-model.trim="inqryTtl"
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
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="4%" />
        <col width="7%" />
        <col width="20%" />
        <col width="7%" />
        <col width="8%" />
        <col width="8%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>구분</span></th>
          <th><span>제목</span></th>
          <th><span>상태</span></th>
          <th><span>UUID</span></th>
          <th><span>소속</span></th>
          <th class="sort-column" @click="sort('INQRY_DT')">
            <span>문의일시</span>
            <span
              v-if="'INQRY_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'INQRY_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!pageable.empty">
        <tr v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.inqryId }}</span>
          </td>
          <td>
            <span>{{ sr.inqrySe }}</span>
          </td>
          <td class="td-title" @click="moveToDetail(sr.inqryId)">
            <span v-html="DOMPurify.sanitize(sr.inqryTtl)" style="text-decoration: underline"></span>
          </td>
          <td>
            <span v-if="sr.inqryStts == '대기'" class="text-red">대기</span>
            <span v-if="sr.inqryStts == '답변완료'">답변완료</span>
          </td>
          <td>
            <span>{{ sr.userUuid }}</span>
          </td>
          <td>
            <span>{{ sr.inqrSchl }}</span>
          </td>
          <td>
            <span>{{ sr.inqryDt }}</span>
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
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import DOMPurify from 'dompurify';
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
const inqrySe = ref("전체");
const inqryStts = ref("");
const startDate = ref();
const endDate = ref();
const inqryTtl = ref();
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("INQRY_DT");
const store = useSortStore();
const { sortTable } = store;

function sort(column) {
  sortTable(sortColumn, column, ascending);
}

watch(ascending, (newVal, oldVal) => {
  if (newVal != oldVal) {
    if (newVal) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    masking.value = true;
    inquiry(masking.value);
  }
});

watch(sortColumn, (newVal, oldval) => {
  if (newVal != oldval) {
    pageable.value.sort = newVal;
    masking.value = true;
    inquiry(masking.value);
  }
});

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const moveToDetail = (inqryId) => {
  router.push({
    name: "oneononeInqryDtlView",
    state: { id: inqryId },
  });
};

function setEndPoint(maskFlag) {
  if (maskFlag == null) {
    masking.value = true;
    pageable.value.number = 0;
    return "list";
  } else if (!maskFlag) {
    masking.value = false;
    return "listbare";
  } else {
    masking.value = true;
    return "list";
  }
}

function setParam() {
  searchResult.value = [];
  let param = {
    inqrySe: inqrySe.value == "전체" ? "" : inqrySe.value,
    inqryStts: inqryStts.value,
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    inqryTtl: inqryTtl.value,
  };

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "INQRY_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `/inquiry/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
    "/inquiry/listbare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(() => {
  inquiry(masking.value);
});
</script>

<style scoped>
.td-title {
  cursor: pointer;
  text-align: left;
  padding-left: 1rem;
}

input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 100% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>