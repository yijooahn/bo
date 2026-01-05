<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 서비스 공지사항 관리</p>
    <p class="heading">서비스 공지사항 관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tr>
        <th><span>학과목</span></th>
        <td>
          <div>
            <select-comp
              :options="subjectList.map((item) => item.comCdNm)"
              v-model:selected="selectedSubjectNm"
              class="select-comp"
            ></select-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>대상</span></th>
        <td>
          <div>
            <span>
              <input
                type="checkbox"
                id="chkTrgtC"
                value="COM"
                v-model="srvcNtcTrgt"
              />
              <label for="chkTrgtC">공통</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkTrgtT"
                value="TCHR"
                v-model="srvcNtcTrgt"
              />
              <label for="chkTrgtT">교사용</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkTrgtS"
                value="STDNT"
                v-model="srvcNtcTrgt"
              />
              <label for="chkTrgtS">학생용</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>노출여부</span></th>
        <td>
          <div>
            <span>
              <input
                type="checkbox"
                id="chkExpsrMthdY"
                name="chkExpsrMthd"
                value="Y"
                v-model="expsrMthd"
              />
              <label for="chkExpsrMthdY">노출</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkExpsrMthdP"
                name="chkExpsrMthd"
                value="P"
                v-model="expsrMthd"
              />
              <label for="chkExpsrMthdP">기간노출</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkExpsrMthdN"
                name="chkExpsrMthd"
                value="N"
                v-model="expsrMthd"
              />
              <label for="chkExpsrMthdN" class="text-red">비노출</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>상단고정</span></th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdUptFixYn"
                id="uptFixYnA"
                value=""
                v-model="uptFixYn"
              />
              <label for="uptFixYnA">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdUptFixYn"
                id="uptFixYnY"
                value="Y"
                v-model="uptFixYn"
              />
              <label for="uptFixYnY">고정</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdUptFixYn"
                id="uptFixYnN"
                value="N"
                v-model="uptFixYn"
              />
              <label for="uptFixYnN">고정아님</label>
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
              :options="['제목', '등록자']"
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
        <button class="btn-1" @click="router.push('/srvcNtcMttrMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="20%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대상</span></th>
          <th><span>제목</span></th>
          <th><span>노출여부</span></th>
          <th><span>상단고정</span></th>
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
            <span>{{ sr.srvcNtcId }}</span>
          </td>
          <td>
            <span v-if="sr.srvcNtcTrgt == 'COM'">공통</span>
            <span v-if="sr.srvcNtcTrgt == 'TCHR'">교사용</span>
            <span v-if="sr.srvcNtcTrgt == 'STDNT'">학생용</span>
          </td>
          <td class="td-title" @click="moveToDetail(sr.srvcNtcId)">
            <span style="text-decoration: underline">{{ sr.srvcNtcTtl }}</span>
          </td>
          <td>
            <span v-if="sr.expsrMthd == 'Y'">노출</span>
            <span v-if="sr.expsrMthd == 'P'">기간노출</span>
            <span v-if="sr.expsrMthd == 'N'" class="text-red">비노출</span>
          </td>
          <td>
            <span v-if="sr.uptFixYn == 'Y'">고정</span>
            <span v-if="sr.uptFixYn == 'N'">고정아님</span>
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
import { useTextbookStore } from "@/store/textbook";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

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

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const srvcNtcTrgt = ref(["COM", "TCHR", "STDNT"]);
const expsrMthd = ref(["Y", "P", "N"]);
const uptFixYn = ref("");

const maskingStore = useMaskingStore();
const masking = ref(true);
const startDate = ref();
const endDate = ref();
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

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/servicenotice/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};

const moveToDetail = (srvcNtcId) => {
  router.push({
    name: "srvcNtcMttrDtlView",
    state: { id: srvcNtcId },
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
    searchSrvcNtcTrgt: srvcNtcTrgt.value,
    searchExpsrMthd: expsrMthd.value,
    uptFixYn: uptFixYn.value,
    searchStartDate: null,
    searchEndDate: null,
    srvcNtcTtl: "",
    rgtr: "",
    srvcNtcSbjctCd: "",
  };

  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;

  if (selectedSubjectNm.value == "전체") {
    param.srvcNtcSbjctCd = "";
  } else {
    param.srvcNtcSbjctCd = subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    )?.comCdId;
  }
  if (searchType.value == "제목") {
    param.srvcNtcTtl = searchWord.value;
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
      `/servicenotice/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
  await getTextbookCodeList(subjectList, selectedSubjectNm, "전체");
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
