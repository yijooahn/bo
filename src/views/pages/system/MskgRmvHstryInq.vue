<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 마스킹 해제 이력조회</p>
    <p class="heading">마스킹 해제 이력조회</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>구분</span></th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdMenu"
                id="rdMenuALL"
                value="ALL"
                v-model="rdMenu"
              />
              <label for="rdMenuALL">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdMenu"
                id="rdMenuSEL"
                value="SEL"
                v-model="rdMenu"
              />
              <label for="rdMenuSEL">메뉴</label>
            </span>
            <select-comp
              :options="menuNmList"
              v-model:selected="selectedMenuNm"
              class="select-comp"
              :disabled="rdMenu == 'ALL'"
            ></select-comp>
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
              :options="['작업자명', '소속']"
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
          () => {
            pageable.number = undefined;
            inquiry();
          }
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
    </div>
    <table class="table-2 t-c">
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대메뉴명</span></th>
          <th><span>사유</span></th>
          <th><span>대상자수</span></th>
          <th><span>작업자명</span></th>
          <th><span>소속</span></th>
          <th class="sort-column" @click="sort('A.JOB_DT')">
            <span>작업일시</span>
            <span
              v-if="'A.JOB_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'A.JOB_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.mskgId }}</span>
          </td>
          <td>
            <span>{{ sr.mskgSe }}</span>
          </td>
          <td class="td-title">
            <span
              @click="clickPopup(sr.mskgSe, sr.mskgRsn)"
              style="cursor: pointer; text-decoration: underline"
              >{{ setTextform(sr.mskgRsn) }}</span
            >
          </td>
          <td>
            <span>{{ sr.rmvMbrCnt }}</span>
          </td>
          <td>
            <span>{{ sr.oprtrNm }}</span>
          </td>
          <td>
            <span>{{ sr.oprtrOgdp }}</span>
          </td>
          <td>
            <span>{{ sr.jobDt }}</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="7">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="ct-22">
      <component
        @on-change-handler="inquiry(true)"
        :is="pagination"
        v-model:pageable="pageable"
      ></component>
    </div>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="mskgModal"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import ModalComp from "@/views/components/popup/MskgModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const mskgModal = ref({
  contentAlign: "start",
  overflow: "hidden",
  headerHtml: "<h4>마스킹 해제</h4>",
  mskgSe: "",
  mskgRsn: "",
  display: "block",
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

const rdMenu = ref("SEL");
const popupIsActive = ref(false);

const pageable = ref({});

const startDate = ref();
const endDate = ref();
const searchMenu = ref([]);
const menuNmList = ref([]);
const selectedMenuNm = ref();
const searchType = ref("작업자명");
const searchWord = ref("");
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("A.JOB_DT");
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
    await inquiry();
  }
});

watch(sortColumn, async (newVal, oldval) => {
  if (newVal != oldval) {
    pageable.value.sort = newVal;
    await inquiry();
  }
});

watch(rdMenu, (newVal, oldVal) => {
  if (newVal != oldVal && newVal == "ALL") {
    selectedMenuNm.value = "선택해 주세요";
  }
});

function setTextform(text) {
  let mskgRsn = text.trim();
  if (mskgRsn.length > 10) {
    return mskgRsn.slice(0, 10) + "...";
  } else {
    return mskgRsn;
  }
}

const clickPopup = (mskgSe, mskgRsn) => {
  mskgModal.value.mskgSe = mskgSe;
  mskgModal.value.mskgRsn = mskgRsn;
  popupIsActive.value = true;
};

function setEndPoint(paging) {
  if (!paging) pageable.value.number = 0;
  return "inquiry";
}

function setParam() {
  searchResult.value = [];
  let param = {
    mskgSe: "",
    searchStartDate: null,
    searchEndDate: null,
    oprtrNm: "",
    oprtrOgdp: "",
  };
  if (selectedMenuNm.value == "선택해 주세요") {
    param.mskgSe = "";
  } else {
    param.mskgSe = searchMenu.value.find(
      (item) => item.menuNm == selectedMenuNm.value
    )?.menuId;
  }
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  if (searchType.value == "작업자명") {
    param.oprtrNm = searchWord.value;
  } else if (searchType.value == "소속") {
    param.oprtrOgdp = searchWord.value;
  }
  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.JOB_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (paging = false) => {
  const endp = setEndPoint(paging);
  const param = setParam();

  await axios
    .post(
      `/masking/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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

const menuInquiry = async () => {
  let param = {};
  await axios
    .post(`/masking/pageinquiry`, param)
    .then(async (response) => {
      if (response.data != null) {
        searchMenu.value = response.data.map((item) => ({
          menuId: item.menuId,
          menuNm: item.menuNm,
        }));
        menuNmList.value = response.data.map((item) => item.menuNm);
        menuNmList.value.unshift("선택해 주세요");
        selectedMenuNm.value = menuNmList.value[0];
      }
      await inquiry();
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
    });
};

onMounted(async () => {
  await menuInquiry();
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

.select-comp {
  width: 40% !important;
}
</style>