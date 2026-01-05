<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 시스템 현황 조회</p>
    <p class="heading">시스템 현황 조회</p>
    <div class="blue-box-container">
      <div class="blue-box">
        <div
          class="blue-box-inner"
          :class="searchType === 'yesterday' ? 'selected' : 'select'"
          @click="clickBox('yesterday')"
        >
          <h2>접속자 수(전일)</h2>
          <h1 class="font-bold">
            {{ insertComma(yesterdayLoginUserCount)
            }}<span class="font-small">명</span>
          </h1>
          <h3
            class="positive"
            v-if="changeCount > 0 && changeCount !== Infinity"
          >
            (전전일 대비 ▲ {{ changeCount }} 명)
          </h3>
          <h3 class="negative" v-if="changeCount < 0">
            (전전일 대비 ▼ {{ changeCount }} 명)
          </h3>
          <h3 v-if="changeCount == 0">(전전일과 동일)</h3>
        </div>
      </div>
      <div class="blue-box">
        <div
          class="blue-box-inner"
          :class="searchType === 'dayBeforeYesterday' ? 'selected' : 'select'"
          @click="clickBox('dayBeforeYesterday')"
        >
          <h2>접속자 수(전전일)</h2>
          <h1 class="font-bold">
            {{ insertComma(dayBeforeYesterdayLoginUserCount)
            }}<span class="font-small">명</span>
          </h1>
          <div style="height: 2rem"></div>
        </div>
      </div>
      <div class="blue-box">
        <div
          class="blue-box-inner"
          :class="searchType === 'thisMonth' ? 'selected' : 'select'"
          @click="clickBox('thisMonth')"
        >
          <h2>접속자 수(당월)</h2>
          <h1 class="font-bold">
            {{ insertComma(thisMonthLoginUserCount)
            }}<span class="font-small">명</span>
          </h1>
          <h3 class="positive" v-if="changeRate > 0 && changeRate !== Infinity">
            (전월 대비 ▲ {{ changeRate }} %)
          </h3>
          <h3 class="negative" v-if="changeRate < 0">
            (전월 대비 ▼ {{ changeRate }} %)
          </h3>
          <h3 v-if="changeRate == 0">(전월과 동일)</h3>
        </div>
      </div>
      <div class="blue-box">
        <div
          class="blue-box-inner"
          :class="searchType === 'lastMonth' ? 'selected' : 'select'"
          @click="clickBox('lastMonth')"
        >
          <h2>접속자 수(전월)</h2>
          <h1 class="font-bold">
            {{ insertComma(lastMonthLoginUserCount)
            }}<span class="font-small">명</span>
          </h1>
        </div>
      </div>
    </div>
    <!---->
    <div style="text-align: center; margin-top: 2rem; margin-bottom: -1rem">
      <p class="heading">{{ subTitle1 }}</p>
    </div>
    <div class="div-container2">
      <div class="box-chart">
        <div class="chart-container">
          <GChart
            v-if="subjectColumnChartData.length > 0"
            type="ColumnChart"
            :data="subjectColumnChartData"
            :options="subjectColumnChartOption"
          />
          <span v-else>조회된 결과가 없습니다.</span>
        </div>
      </div>
      <div class="box-table">
        <div class="table-container">
          <table class="table-2 t-c">
            <colgroup>
              <col width="10%" />
              <col width="50%" />
              <col width="25%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th><span>번호</span></th>
                <th><span>학과목명</span></th>
                <th class="sort-column" @click="sort('loginUserCountSubject')">
                  <span>접속자 수[명]</span>
                  <span
                    v-if="
                      'loginUserCountSubject' == sortColumnSubject &&
                      ascendingSubject
                    "
                    class="arrow-up"
                  ></span>
                  <span
                    v-if="
                      'loginUserCountSubject' == sortColumnSubject &&
                      !ascendingSubject
                    "
                    class="arrow-down"
                  ></span>
                </th>
                <th><span>사용률[%]</span></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="searchResultSubject.length > 0">
                <tr
                  v-for="(sr, idx) in searchResultSubject"
                  :key="idx"
                  :class="
                    selectedRow === sr.idx
                      ? 'tr-selected'
                      : sr.idx === 0
                      ? 'tr-default-subject'
                      : 'tr-subject'
                  "
                >
                  <template v-if="idx == 0">
                    <td @click="inquiryUuid(sr.idx, sr.subjectCode)">
                      <span>-</span>
                    </td>
                    <td
                      @click="inquiryUuid(sr.idx, sr.subjectCode)"
                      class="td-title"
                    >
                      <span>{{ sr.subjectName }}</span>
                    </td>
                    <td
                      @click="inquiryUuid(sr.idx, sr.subjectCode)"
                      class="td-number"
                    >
                      <span>{{ insertComma(sr.loginUserCount) }}</span>
                    </td>
                    <td @click="inquiryUuid(sr.idx, sr.subjectCode)">
                      <span>{{ sr.useRate }}</span>
                    </td>
                  </template>
                  <template v-else>
                    <td @click="inquiryUuid(sr.idx, sr.subjectCode)">
                      <span>{{ sr.idx }}</span>
                    </td>
                    <td
                      @click="inquiryUuid(sr.idx, sr.subjectCode)"
                      class="td-title"
                    >
                      <span>{{ sr.subjectName }}</span>
                    </td>
                    <td
                      @click="inquiryUuid(sr.idx, sr.subjectCode)"
                      class="td-number"
                    >
                      <span>{{ insertComma(sr.loginUserCount) }}</span>
                    </td>
                    <td @click="inquiryUuid(sr.idx, sr.subjectCode)">
                      <span>{{ sr.useRate }}</span>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="4">조회된 결과가 없습니다.</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 2rem; margin-bottom: -1rem">
      <p class="heading">{{ subTitle2 }}</p>
    </div>
    <div class="div-container3">
      <div class="box-chart">
        <div class="chart-container">
          <GChart
            v-if="uuidColumnChartData.length > 0"
            type="ColumnChart"
            :data="uuidColumnChartData"
            :options="uuidColumnChartOption"
          />
          <span v-else>조회된 결과가 없습니다.</span>
        </div>
      </div>
      <div class="box-table">
        <div class="table-container">
          <table class="table-1">
            <colgroup>
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th><span>학교 UUID</span></th>
                <td>
                  <div class="ct-19">
                    <input
                      type="text"
                      placeholder="학교 UUID를 입력하세요"
                      v-model.trim.lazy="searchUuid"
                      @keyup.enter="
                        pageable.number = undefined;
                        inquiryUuid(null, searchSubjectCode);
                      "
                    />
                    <div style="width: 22%; text-align: right; margin: 0">
                      <button
                        class="btn-1"
                        @click="
                          pageable.number = undefined;
                          inquiryUuid(null, searchSubjectCode);
                        "
                      >
                        조회
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ct-19">
          <component
            :is="pagination"
            v-model:pageable="pageable"
            :isPageSize="true"
          ></component>
          <div class="ct-21">
            <button class="btn-1" @click="downloadExcelFile()">
              엑셀 다운로드
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="table-2 t-c">
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="15%" />
              <col width="15%" />
              <col width="20%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th><span>번호</span></th>
                <th><span>학교 UUID</span></th>
                <th class="sort-column" @click="sort('CNT')">
                  <span>접속자 수[명]</span>
                  <span
                    v-if="'CNT' == sortColumnUuid && ascendingUuid"
                    class="arrow-up"
                  ></span>
                  <span
                    v-if="'CNT' == sortColumnUuid && !ascendingUuid"
                    class="arrow-down"
                  ></span>
                </th>
                <th><span>사용률[%]</span></th>
                <th><span>콘텐츠 사용량[%]</span></th>
                <th><span>페이지 수</span></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="searchResultUuid.length > 0">
                <tr
                  v-for="(sr, idx) in searchResultUuid"
                  :key="idx"
                  :class="sr.idx === 0 ? 'tr-default-uuid' : ''"
                >
                  <template v-if="sr.idx == 0">
                    <td><span>-</span></td>
                    <td class="td-title">
                      <span>{{ sr.uuid }}</span>
                    </td>
                    <td class="td-number">
                      <span>{{ insertComma(sr.loginUserCount) }}</span>
                    </td>
                    <td>
                      <span>{{ sr.useRate }}</span>
                    </td>
                    <td>
                      <span>{{ sr.contUseRate }}</span>
                    </td>
                    <td>
                      <span>{{ insertComma(sr.pageCount) }}</span>
                    </td>
                  </template>
                  <template v-else>
                    <td>
                      <span v-if="!ascendingUuid">{{
                        pageable.number * pageable.size + idx
                      }}</span>
                      <span v-if="ascendingUuid">{{
                        pageable.totalElements - pageable.offset - idx
                      }}</span>
                    </td>
                    <td class="td-title">
                      <span>{{ sr.uuid }}</span>
                    </td>
                    <td class="td-number">
                      <span>{{ insertComma(sr.loginUserCount) }}</span>
                    </td>
                    <td>
                      <span>{{ sr.useRate }}</span>
                    </td>
                    <td>
                      <span>{{ sr.contUseRate }}</span>
                    </td>
                    <td>
                      <span>{{ insertComma(sr.pageCount) }}</span>
                    </td>
                  </template>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6">조회된 결과가 없습니다.</td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="ct-22">
            <component
              @on-change-handler="inquiryUuid(null, searchSubjectCode)"
              :is="pagination"
              v-model:pageable="pageable"
            ></component>
          </div>
        </div>
      </div>
    </div>
    <div>
      <alert-modal
        v-model:isActive="popupIsActive"
        :alertModal="alertModal"
      ></alert-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortStore } from "@/store/sort.js";
import pagination from "@/views/components/Pagination.vue";
import AlertModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { GChart } from "vue-google-charts";

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>다운로드할 항목이 없습니다.</span>",
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

const today = ref(
  new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
);
const popupIsActive = ref(false);
const searchType = ref();
const yesterdayLoginUserCount = ref();
const dayBeforeYesterdayLoginUserCount = ref();
const lastMonthLoginUserCount = ref();
const thisMonthLoginUserCount = ref();
const changeCount = ref();
const changeRate = ref();

const store = useSortStore();
const { sortTable } = store;
const sortColumnSubject = ref("loginUserCountSubject");
const ascendingSubject = ref(false);
const sortColumnUuid = ref("CNT");
const ascendingUuid = ref(false);

const selectedRow = ref(null);
const searchSubjectCode = ref(null);
const searchUuid = ref(null);
const searchResultSubject = ref([]);
const searchResultUuid = ref([]);

const subTitle1 = ref();
const subTitle2 = ref();

const pageable = ref({});

const chartWidth = ref(window.innerWidth * 0.4);
const chartHeight = ref(window.innerHeight * 0.85);

const subjectColumnChartData = ref([]);
const subjectColumnChartOption = reactive({
  width: chartWidth.value,
  height: chartHeight.value,
  sliceVisibilityThreshold: 0,
  legend: {
    position: "top",
    alignment: "end",
  },
  hAxis: {
    showTextEvery: 1,
    slantedText: true,
    slantedTextAngle: 50,
    title: "학과목명",
    titleTextStyle: {
      fontSize: 14,
      bold: true,
    },
  },
});

const uuidColumnChartData = ref([]);
const uuidColumnChartOption = reactive({
  width: chartWidth.value,
  height: chartHeight.value,
  sliceVisibilityThreshold: 0,
  legend: {
    position: "top",
    alignment: "end",
  },
  hAxis: {
    showTextEvery: 1,
    slantedText: true,
    slantedTextAngle: 50,
    title: "학교 UUID",
    titleTextStyle: {
      fontSize: 14,
      bold: true,
    },
  },
});

const resizeHandler = (event) => {
  subjectColumnChartOption.width = window.innerWidth * 0.4;
  subjectColumnChartOption.height = window.innerHeight * 0.85;
  uuidColumnChartOption.width = window.innerWidth * 0.4;
  uuidColumnChartOption.height = window.innerHeight * 0.85;
};

function clickBox(type) {
  if (type != null && type != searchType.value) {
    searchType.value = type;
  }
}

watch(
  searchType,
  (newVal, oldVal) => {
    if (oldVal != newVal) {
      searchUuid.value = null;
      inquirySubject(searchType.value);
    }
  },
  {
    immediate: true,
  }
);

function sort(col) {
  if (col === "loginUserCountSubject") {
    ascendingSubject.value = !ascendingSubject.value;
  } else {
    sortTable(sortColumnUuid, col, ascendingUuid);
  }
}

watch(ascendingSubject, (newVal, oldval) => {
  if (newVal != oldval && newVal) {
    searchResultSubject.value = searchResultSubject.value.sort((a, b) => {
      if (a.idx === 0) return -1;
      if (b.idx === 0) return 1;
      return ascendingSubject
        ? a.loginUserCount - b.loginUserCount
        : b.loginUserCount - a.loginUserCount;
    });
  } else {
    searchResultSubject.value = searchResultSubject.value.sort(
      (a, b) => b.loginUserCount - a.loginUserCount
    );
  }
});

watch(ascendingUuid, (newVal, oldVal) => {
  if (newVal != oldVal) {
    if (newVal) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    inquiryUuid(null, searchSubjectCode.value);
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

const downloadExcelFile = async () => {
  if (searchResultUuid.value.length > 1) {
    try {
      const param = {
        searchType: searchType.value,
        sbjctId: searchSubjectCode.value,
        schlId: searchResultUuid.value
          .filter((item) => item.idx > 0)
          .every((item) => item.uuid == searchUuid.value)
          ? searchUuid.value
          : null,
      };

      const response = await axios.post(`/sysmonitor/download`, param, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      const subjectCd = searchSubjectCode.value ?? "";
      link.setAttribute(
        "download",
        `${
          searchResultSubject.value.find(
            (item) => item.subjectCode == subjectCd
          ).subjectName
        }_${today.value}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alertModal.value.bodyHtml = "<span>엑셀 다운로드에 실패했습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
    }
  } else {
    alertModal.value.bodyHtml = "<span>다운로드할 항목이 없습니다.</span>";
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

const inquirySubject = async (searchType) => {
  if (searchType === "dayBeforeYesterday") {
    subTitle1.value = "학과목별 이용 현황(전전일)";
  } else if (searchType === "thisMonth") {
    subTitle1.value = "학과목별 이용 현황(당월)";
  } else if (searchType === "lastMonth") {
    subTitle1.value = "학과목별 이용 현황(전월)";
  } else {
    subTitle1.value = "학과목별 이용 현황(전일)";
  }
  searchResultSubject.value = [];
  subjectColumnChartData.value = [];

  const endPoint = "/sysmonitor/inquiry";
  const systemMonitorDto = {
    searchType: searchType,
  };

  await axios
    .post(`${endPoint}`, systemMonitorDto)
    .then((response) => {
      if (response.data != null) {
        yesterdayLoginUserCount.value = response.data.yesterCnt;
        dayBeforeYesterdayLoginUserCount.value = response.data.twoAgoCnt;
        lastMonthLoginUserCount.value = response.data.monthAgoCnt;
        thisMonthLoginUserCount.value = response.data.currentMonthCnt;
        changeCount.value =
          yesterdayLoginUserCount.value -
          dayBeforeYesterdayLoginUserCount.value;
        changeRate.value =
          thisMonthLoginUserCount.value / lastMonthLoginUserCount.value > 1
            ? parseFloat((thisMonthLoginUserCount.value / lastMonthLoginUserCount.value - 1).toFixed(3))
            : null;
        if (response.data.memberList.length > 1) {
          searchResultSubject.value = response.data.memberList
            .sort((a, b) => b.cnt - a.cnt)
            .map((item, index) => ({
              idx: index,
              subjectCode: item.sbjctCd,
              subjectName: item.sbjctNm,
              loginUserCount: item.cnt,
              useRate: item.total,
            }));
          subjectColumnChartData.value.push(["학과목명", "접속자 수[명]"]);
          searchResultSubject.value
            .filter((item) => item.idx > 0)
            .map((item) => [
              subjectColumnChartData.value.push([
                item.subjectName,
                item.loginUserCount,
              ]),
            ]);
        } else {
          searchResultSubject.value = [];
          subjectColumnChartData.value = [];
        }
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status === axios.HttpStatusCode.NotFound) {
          searchResultSubject.value = [];
          subjectColumnChartData.value = [];
        }
      }
    })
    .finally(() => {
      inquiryUuid(0);
    });
};

const inquiryUuid = async (idx = null, subjectCode = null) => {
  if (searchResultSubject.value.length < 1) {
    searchResultSubject.value = [];
    subjectColumnChartData.value = [];
    searchResultUuid.value = [];
    uuidColumnChartData.value = [];
  } else {
    searchResultUuid.value = [];
    uuidColumnChartData.value = [];
    searchSubjectCode.value = subjectCode;

    if (idx != null) {
      selectedRow.value = idx;
      subTitle2.value =
        searchResultSubject.value.find((item) => item.idx == idx).subjectName +
        " 접속자 수 상위 10개 학교";
      searchUuid.value = null;
    }

    const endPoint = "/sysmonitor/detail";
    const systemMonitorDto = {
      searchType: searchType.value,
      sbjctCd: searchSubjectCode.value,
      schlId: searchUuid.value,
    };

    if (pageable.value.number == undefined) pageable.value.number = 0;
    if (pageable.value.size == undefined) pageable.value.size = 10;
    if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
      pageable.value.sort = "CNT";
    if (pageable.value.direction == undefined)
      pageable.value.direction = "DESC";

    await axios
      .post(
        `${endPoint}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
        systemMonitorDto
      )
      .then((response) => {
        if (response.data.systemTopDataList.length > 0) {
          uuidColumnChartData.value.push(["학교 UUID", "접속자 수[명]"]);
          response.data.systemTopDataList
            .sort((a, b) => b.cnt - a.cnt)
            .map((item) => [
              uuidColumnChartData.value.push([item.schlId, item.cnt]),
            ]);
        }
        if (response.data.systemDataList.content.length > 1) {
          pageable.value.empty = response.data.systemDataList.empty;
          pageable.value.first = response.data.systemDataList.first;
          pageable.value.last = response.data.systemDataList.last;
          pageable.value.number = response.data.systemDataList.number;
          pageable.value.totalElements =
            response.data.systemDataList.totalElements;
          pageable.value.totalPages = response.data.systemDataList.totalPages;
          pageable.value.offset = response.data.systemDataList.pageable.offset;

          searchResultUuid.value = response.data.systemDataList.content.map(
            (item, index) => ({
              idx: index,
              uuid: item.schlId,
              loginUserCount: item.cnt,
              useRate: item.total,
              contUseRate: "-",
              pageCount: "-",
            })
          );
        } else {
          pageable.value.empty = true;
          pageable.value.totalPages = 0;
          searchResultUuid.value = [];
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            if (error.response.status == axios.HttpStatusCode.NotFound) {
              pageable.value.empty = true;
              pageable.value.totalPages = 0;
              searchResultUuid.value = [];
              uuidColumnChartData.value = [];
            }
          }
        }
      })
      .finally(() => {
        if (idx == null || (idx > 0 && subjectCode != null)) {
          document.getElementsByTagName("input")[0].focus();
        }
      });
  }
};

onBeforeMount(() => {
  window.addEventListener("resize", resizeHandler);
});

onMounted(async () => {
  searchType.value = "yesterday";
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 74%;
}

.div-container1 {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 40vh;
}

.div-container2 {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.div-container3 {
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
}

.box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inner-content {
  display: flex;
  align-items: baseline;
  height: 5rem;
}

.span-bold1 {
  font-size: 1.6rem;
}

.span-bold2 {
  font-size: 2.4rem;
  font-weight: bold !important;
}

h3.positive {
  color: red;
}

h3.negative {
  color: blue;
}

.select {
  cursor: pointer;
}

.select:hover {
  transition: background-color 0.2s ease;
  background-color: rgb(235, 234, 234);
}

.select:active {
  box-shadow: 3px 3px 3px #00000014;
}

.selected {
  cursor: pointer;
  margin: 8px;
  border-radius: 16px;
  border: 2px solid #3366cc;
}

.selected:hover {
  background-color: rgb(235, 234, 234);
}

.box-chart {
  width: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-top: 0 auto;
  padding-top: 0 auto;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.box-table {
  width: 50%;
  height: "fit-content";
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-top: 0 auto;
  padding: 1px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  margin-right: 5%;
}

.table-container {
  height: "fit-content";
  width: 100%;
  margin: 0 auto;
}

.tr-subject {
  cursor: pointer;
}

.tr-default-subject {
  cursor: pointer;
  background: #c9cccf8a;
}

.tr-default-uuid {
  background: #c9cccf8a;
}

.tr-selected {
  cursor: pointer;
  background: #668ab18a;
}

.td-title {
  text-align: left;
  padding-left: 1rem;
}

.td-number {
  text-align: right;
  padding-right: 1rem;
}

.blue-box-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  justify-items: center;
  margin: 2rem 0;
}

.blue-box {
  background: #eff5ff;
  border-radius: 16px;
  color: #373f57;
  box-shadow: 1px 9px 12px #00000014;
  width: 18vw;
  height: 18vw;
}

.blue-box-inner {
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  align-content: center;
}

.blue-box-inner * {
  line-height: 100%;
  vertical-align: middle;
}

.font-bold {
  font-family: SpoqaHanSansNeoBold;
  font-size: 250%;
}

.font-small {
  font-size: 55%;
  margin-left: 0.3rem;
}
</style>