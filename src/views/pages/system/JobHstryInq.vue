<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 관리자 작업이력 조회</p>
    <p class="heading">관리자 작업이력 조회</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>접근 메뉴</span></th>
          <td>
            <div>
              <select-comp
                :options="menuNmList"
                v-model:selected="selectedMenuNm"
                class="select-comp"
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
          <th><span>작업내용</span></th>
          <td>
            <div>
              <span>
                <input
                  type="checkbox"
                  id="desc0"
                  value="전체"
                  v-model="checkAll1"
                  @click="clickCheckAll1"
                />
                <label for="desc0">전체</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc1"
                  value="P"
                  v-model="searchJobCn"
                />
                <label for="desc1">접근 이력</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc2"
                  value="R"
                  v-model="searchJobCn"
                />
                <label for="desc2">조회</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc3"
                  value="C"
                  v-model="searchJobCn"
                />
                <label for="desc3">등록</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc4"
                  value="U"
                  v-model="searchJobCn"
                />
                <label for="desc4">수정</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc5"
                  value="D"
                  v-model="searchJobCn"
                />
                <label for="desc5">삭제</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="desc6"
                  value="W"
                  v-model="searchJobCn"
                />
                <label for="desc6">다운로드</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>시스템</span></th>
          <td>
            <div>
              <span>
                <input
                  type="checkbox"
                  id="sysName0"
                  v-model="checkAll2"
                  @click="clickCheckAll2"
                />
                <label for="sysName0">전체</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="sysName1"
                  value="BO"
                  v-model="searchSysNmList"
                />
                <label for="sysName1">BO</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="sysName2"
                  value="LCMS"
                  v-model="searchSysNmList"
                />
                <label for="sysName2">LCMS</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="sysName3"
                  value="LRS"
                  v-model="searchSysNmList"
                />
                <label for="sysName3">LRS</label>
              </span>
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
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>시스템</span></th>
          <th><span>접근 메뉴</span></th>
          <th><span>작업내용</span></th>
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
            <span>{{ sr.jobId }}</span>
          </td>
          <td>
            <span>{{ sr.sysNm }}</span>
          </td>
          <td>
            <span>{{ sr.menuNm }}</span>
          </td>
          <td>
            <span v-if="sr.jobCn == 'P'">메뉴접속</span>
            <span v-if="sr.jobCn == 'C'">등록</span>
            <span v-if="sr.jobCn == 'R'">조회</span>
            <span v-if="sr.jobCn == 'U'">수정</span>
            <span v-if="sr.jobCn == 'D'">삭제</span>
            <span
              v-if="sr.jobCn == 'W'"
              @click="
                clickPopup(
                  sr.menuNm,
                  sr.downloadQuery,
                  sr.mbrNm,
                  sr.userOgdp,
                  sr.jobDt,
                  sr.sysNm
                )
              "
              style="cursor: pointer; text-decoration: underline"
            >
              다운로드
            </span>
          </td>
          <td>
            <span>{{ sr.mbrNm }}</span>
          </td>
          <td>
            <span>{{ sr.userOgdp }}</span>
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
    <component
      v-model:isActive="downIsActive"
      :alertModal="downModal"
      :is="DownComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import DownComp from "@/views/components/popup/DownModal.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

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

const downModal = ref({
  contentAlign: "start",
  overflow: "hidden",
  headerHtml: "<h4>다운로드 상세내역</h4>",
  menuNm: "",
  downloadQuery: "",
  mbrNm: "",
  userOgdp: "",
  jobDt: "",
  sysNm: "",
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

const maskingStore = useMaskingStore();
const masking = ref(true);
const popupIsActive = ref(false);
const downIsActive = ref(false);

const pageable = ref({});

const searchMenu = ref([]);
const menuNmList = ref([]);
const selectedMenuNm = ref();
const searchType = ref("작업자명");
const searchWord = ref("");
const startDate = ref();
const endDate = ref();
const checkAll1 = ref(true);
const searchJobCn = ref(["P", "R", "C", "U", "D", "W"]);
const checkAll2 = ref(true);
const searchSysNmList = ref(["BO", "LCMS", "LRS"]);
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

const clickCheckAll1 = () => {
  if (!checkAll1.value) {
    searchJobCn.value = ["P", "R", "C", "U", "D", "W"];
  } else {
    searchJobCn.value = [];
  }
};

watch(searchJobCn, (v) => {
  checkAll1.value = searchJobCn.value.length == 5 ? true : false;
});

const clickCheckAll2 = () => {
  if (!checkAll2.value) {
    searchSysNmList.value = ["BO", "LCMS", "LRS"];
  } else {
    searchSysNmList.value = [];
  }
};

watch(searchSysNmList, (v) => {
  checkAll2.value = searchSysNmList.value.length == 3 ? true : false;
});

const clickPopup = (menuNm, downloadQuery, mbrNm, userOgdp, jobDt, sysNm) => {
  downModal.value.menuNm = menuNm;
  downModal.value.downloadQuery = downloadQuery;
  downModal.value.mbrNm = mbrNm;
  downModal.value.userOgdp = userOgdp;
  downModal.value.jobDt = jobDt;
  downModal.value.sysNm = sysNm;
  downIsActive.value = true;
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
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
    menuId: "",
    searchStartDate: null,
    searchEndDate: null,
    jobCnList: [],
    sysNmList: [],
    mbrNm: "",
    userOgdp: "",
  };
  if (selectedMenuNm.value == "전체") {
    param.menuId = "";
  } else {
    param.menuId = searchMenu.value.find(
      (item) => item.menuNm == selectedMenuNm.value
    )?.menuId;
  }
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  param.jobCnList = searchJobCn.value;
  param.sysNmList = searchSysNmList.value;
  if (searchType.value == "작업자명") {
    param.mbrNm = searchWord.value;
  } else if (searchType.value == "소속") {
    param.userOgdp = searchWord.value;
  }

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.JOB_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `/adminjob/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
    "/adminjob/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
const menuInquiry = async () => {
  let param = {};
  await axios
    .post(`/adminjob/pageinquiry`, param)
    .then(async (response) => {
      if (response.data != null) {
        searchMenu.value = response.data.map((item) => ({
          menuId: item.menuId,
          menuNm: item.menuNm,
        }));
        menuNmList.value = response.data.map((item) => item.menuNm);
        menuNmList.value.unshift("전체");
        selectedMenuNm.value = menuNmList.value[0];
      }
      await inquiry(masking.value);
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
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}

.select-comp {
  width: 40% !important;
}
</style>