<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 배치 현황 조회</p>
    <p class="heading">배치 현황 조회</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>시스템</span></th>
        <td>
          <div>
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmWhole"
                name="searchBatchSysNm"
                value=""
                @click="clickCheckAll"
                :checked="batchSysNm.length == 5"
              /><label for="chkBatchSysNmWhole">전체</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmBO"
                name="searchBatchSysNm"
                value="BO"
                v-model="batchSysNm"
              /><label for="chkBatchSysNmBO">BO</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmLCMS"
                name="searchBatchSysNm"
                value="LCMS"
                v-model="batchSysNm"
              /><label for="chkBatchSysNmLCMS">LCMS</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmLRS"
                name="searchBatchSysNm"
                value="LRS"
                v-model="batchSysNm"
              /><label for="chkBatchSysNmLRS">LRS</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmLMS"
                name="searchBatchSysNm"
                value="LMS"
                v-model="batchSysNm"
              /><label for="chkBatchSysNmLMS">LMS</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchSysNmDC"
                name="searchBatchSysNm"
                value="DC"
                v-model="batchSysNm"
              /><label for="chkBatchSysNmDC">DC</label></span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th>배치이름</th>
        <td>
          <div>
            <input
              type="text"
              placeholder="배치이름을 입력하세요"
              v-model.trim="batchNm"
              @keyup.enter="
                pageable.number = undefined;
                inquiry();
              "
            />
          </div>
        </td>
      </tr>
      <tr>
        <th>배치주기</th>
        <td>
          <div>
            <span
              ><input
                type="checkbox"
                id="chkBatchTypeD"
                name="searchBatchType"
                value="01"
                v-model="batchType"
              /><label for="chkBatchTypeD">일배치</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchTypeM"
                name="searchBatchType"
                value="02"
                v-model="batchType"
              /><label for="chkBatchTypeM">월배치</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchTypeS"
                name="searchBatchType"
                value="03"
                v-model="batchType"
              /><label for="chkBatchTypeS">학기배치</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchTypeY"
                name="searchBatchType"
                value="04"
                v-model="batchType"
              /><label for="chkBatchTypeY">연배치</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkBatchTypeE"
                name="searchBatchType"
                value="05"
                v-model="batchType"
              /><label for="chkBatchTypeE">기타</label></span
            >
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
          <th><span>배치이름</span></th>
          <th><span>배치주기</span></th>
          <th><span>시스템</span></th>
          <th><span>배치결과</span></th>
          <th><span>오류 메시지</span></th>
          <th><span>처리건수</span></th>
          <th class="sort-column" @click="sort('BATCH_BGNG_DT')">
            <span>작업시작일시</span>
            <span
              v-if="'BATCH_BGNG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'BATCH_BGNG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('BATCH_END_DT')">
            <span>작업종료일시</span>
            <span
              v-if="'BATCH_END_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'BATCH_END_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.batchId }}</span>
          </td>
          <td class="cs-p" @click="batchDetail(sr.batchId, sr.batchNm)">
            <span style="text-decoration: underline">{{ sr.batchNm }}</span>
          </td>
          <td>
            <span v-if="sr.batchType == '01'">일배치</span>
            <span v-if="sr.batchType == '02'">월배치</span>
            <span v-if="sr.batchType == '03'">학기배치</span>
            <span v-if="sr.batchType == '04'">연배치</span>
            <span v-if="sr.batchType == '05'">기타</span>
          </td>
          <td>
            <span>{{ sr.batchSysNm }}</span>
          </td>
          <td>
            <span v-if="sr.batchRslt == 'Y'">O</span>
            <span v-else>X</span>
          </td>
          <td>{{ setTextform(sr.errCn) }}</td>
          <td>
            <span>{{ sr.rsltCnt }} 건</span>
          </td>
          <td>
            <span>{{ sr.batchBgngDt }}</span>
          </td>
          <td>
            <span>{{ sr.batchEndDt }}</span>
          </td>
        </tr>
        <tr v-else>
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
      :is="BatchDetailModal"
      v-model:isActive="detailPopupIsActive"
      :alertModal="batchDetailModal"
      @on-reload-handler="inquiry()"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useSortStore } from "@/store/sort";
import pagination from "@/views/components/Pagination.vue";
import BatchDetailModal from "@/views/components/popup/BatchDetailModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const batchDetailModal = ref({
  contentAlign: "start",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  display: "block",
  headerHtml: "배치별 상세보기",
  bodyHtml: "",
  width: "95%",
  height: "fit-content",
  msgWidth: "95%",
  msgHeight: "fit-content",
  batchId: 0,
  batchNm: "",
});

const detailPopupIsActive = ref(false);

const pageable = ref({});

const batchSysNm = ref(["BO", "LCMS", "LRS", "LMS", "DC"]);
const batchNm = ref("");
const batchType = ref(["01", "02", "03", "04", "05"]);
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("BATCH_BGNG_DT");
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

const batchDetail = (batchId, batchNm) => {
  batchDetailModal.value.batchId = batchId;
  batchDetailModal.value.batchNm = batchNm;
  detailPopupIsActive.value = true;
};

const clickCheckAll = () => {
  if (batchSysNm.value.length < 5) {
    batchSysNm.value = ["BO", "LCMS", "LRS", "LMS", "DC"];
  } else {
    batchSysNm.value = [];
  }
};

function setTextform(errcn) {
  const MAX_LENGTH = 40;
  let formatText = "";
  if (errcn.length > MAX_LENGTH) {
    for (let i = 0; i < errcn.length; i += MAX_LENGTH) {
      formatText += errcn.substring(i, i + MAX_LENGTH) + "\n";
    }
    return formatText.trimEnd();
  } else {
    return errcn;
  }
}

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
    searchBatchSysNm: [],
    batchNm: "",
    searchBatchType: [],
  };
  param.searchBatchSysNm = batchSysNm.value;
  param.batchNm = batchNm.value;
  param.searchBatchType = batchType.value;

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "BATCH_BGNG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async () => {
  const param = setParam();

  await axios
    .post(
      `/batchmonitor/inquiry?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
            pageable.value.totalPages = 0;
            searchResult.value = [];
          }
        }
      } else {
        pageable.value.empty = true;
        pageable.value.totalPages = 0;
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