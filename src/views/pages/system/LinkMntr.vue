<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 외부 연동 모니터링</p>
    <p class="heading">외부 연동 모니터링</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th>대상</th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdTrgt"
                id="Whol2"
                value=""
                v-model="linkTrgt"
                checked
              />
              <label for="Whol2">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdTrgt"
                id="NSIL"
                value="NSIL"
                v-model="linkTrgt"
              />
              <label for="NSIL">국가표준통합로그인</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th>구분</th>
        <td>
          <div>
            <span
              ><input
                type="checkbox"
                id="chkTrgt"
                name="searchLinkSe"
                value=""
                :checked="linkSe.length == 3"
                @click="clickCheckAll"
              /><label for="chkTrgt">전체</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtTCHR"
                name="searchLinkSe"
                value="TCHR"
                v-model="linkSe"
              /><label for="chkTrgtTCHR">교사</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtSTDNT"
                name="searchLinkSe"
                value="STDNT"
                v-model="linkSe"
              /><label for="chkTrgtSTDNT">학생</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtSP"
                name="searchLinkSe"
                value="SP"
                v-model="linkSe"
              /><label for="chkTrgtSP">학부모</label></span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th>등록일자</th>
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
    </div>
    <table class="table-2 t-c">
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대상</span></th>
          <th><span>구분</span></th>
          <th><span>연동성공여부</span></th>
          <th><span>API명</span></th>
          <th><span>에러코드</span></th>
          <th><span>에러 메시지</span></th>
          <th><span>설명</span></th>
          <th class="sort-column" @click="sort('LINK_BGNG_DT')">
            <span>연동일시</span>
            <span
              v-if="'LINK_BGNG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'LINK_BGNG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.linkId }}</span>
          </td>
          <td>
            <span v-if="sr.linkTrgt == 'NSIL'">국가표준통합로그인</span>
            <span v-if="sr.linkTrgt == 'AIE'">AI엔진</span>
            <span v-if="sr.linkTrgt == 'ETM'">에듀템</span>
          </td>
          <td>
            <span v-if="sr.linkSe == 'TCHR'">교사</span>
            <span v-if="sr.linkSe == 'STDNT'">학생</span>
            <span v-if="sr.linkSe == 'SP'">학부모</span>
          </td>
          <td>
            <span v-if="sr.linkScsYn == 'Y'">O</span>
            <span v-else>X</span>
          </td>
          <td>
            <span>{{ sr.apiNm }}</span>
          </td>
          <td>
            <span>{{ sr.errCd }}</span>
          </td>
          <td>
            <span>{{ sr.sendMsg }}</span>
          </td>
          <td>
            <span>{{ sr.errExpln }}</span>
          </td>
          <td>
            <span>{{ sr.linkBgngDt }}</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <div class="ct-22">
      <component
        @on-change-handler="inquiry()"
        :is="pagination"
        v-model:pageable="pageable"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const pageable = ref({});

const linkTrgt = ref("전체");
const linkSe = ref(["TCHR", "STDNT", "SP"]);
const startDate = ref();
const endDate = ref();
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("LINK_BGNG_DT");
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

const clickCheckAll = () => {
  if (linkSe.value.length < 3) {
    linkSe.value = ["TCHR", "STDNT", "SP"];
  } else {
    linkSe.value = [];
  }
};

const insertComma = (num) => {
  if (num == null) {
    return "0";
  } else if (num.toString().length > 3) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

function setParam() {
  searchResult.value = [];
  let param = {
    linkTrgt: "",
    searchLinkSe: [],
    searchStartDate: null,
    searchEndDate: null,
  };

  param.linkTrgt = linkTrgt.value == "전체" ? "" : linkTrgt.value;
  param.searchLinkSe = linkSe.value;
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "LINK_BGNG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async () => {
  const param = setParam();

  await axios
    .post(
      `/linkmonitor/inquiry?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response.data != null) {
        const data = response.data;
        pageable.value.empty = data.empty;
        pageable.value.first = data.first;
        pageable.value.last = data.last;
        pageable.value.number = data.number;
        pageable.value.totalElements = data.totalElements;
        pageable.value.totalPages = data.totalPages;
        pageable.value.offset = data.pageable.offset;
        if (data.content != null) {
          if (data.content.length > 0) {
            searchResult.value = data.content;
          } else {
            pageable.value.empty = true;
            pageable.value.totalPages = 0;
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
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>