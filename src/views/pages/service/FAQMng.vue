<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > FAQ 관리</p>
    <p class="heading">FAQ 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
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
            <span
              ><input
                type="checkbox"
                id="chkTrgtC"
                name="chkTrgt"
                value="COM"
                v-model="faqTrgt"
              /><label for="chkTrgtC">공통</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtT"
                name="chkTrgt"
                value="TCHR"
                v-model="faqTrgt"
              /><label for="chkTrgtT">교사용</label></span
            >
            <span
              ><input
                type="checkbox"
                id="chkTrgtS"
                name="chkTrgt"
                value="STDNT"
                v-model="faqTrgt"
              /><label for="chkTrgtS">학생용</label></span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th><span>구분</span></th>
        <td>
          <div>
            <select-comp
              :options="[
                '전체',
                '회원가입',
                '과제부여',
                '툴팁',
                'AI보조교사',
                'AI튜터',
              ]"
              v-model:selected="faqSe"
            ></select-comp>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>노출여부</span></th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdExpsrYn"
                id="Whol1"
                value=""
                v-model="expsrYn"
              />
              <label for="Whol1">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdExpsrYn"
                id="Y"
                value="Y"
                v-model="expsrYn"
              />
              <label for="Y">노출</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdExpsrYn"
                id="N"
                value="N"
                v-model="expsrYn"
              />
              <label class="text-red" for="N">비노출</label>
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
        <th>
          <span>키워드</span>
        </th>
        <td>
          <div>
            <select-comp
              :options="['제목', '등록자', '수정자']"
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
        <button class="btn-1" @click="router.push('/faqMngWrite')">등록</button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="8%" />
        <col width="5%" />
        <col width="15%" />
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대상</span></th>
          <th><span>구분</span></th>
          <th class="sort-column" @click="sort('A.FAQ_SEQ')">
            <span>노출순서</span>
            <span
              v-if="'A.FAQ_SEQ' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'A.FAQ_SEQ' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th><span>제목</span></th>
          <th><span>노출여부</span></th>
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
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.faqId }}</span>
          </td>
          <td>
            <span v-if="sr.faqTrgt == 'TCHR'">교사용</span>
            <span v-if="sr.faqTrgt == 'COM'">공통</span>
            <span v-if="sr.faqTrgt == 'STDNT'">학생용</span>
          </td>
          <td>
            <span>{{ sr.faqSeNm }}</span>
          </td>
          <td>
            <span>{{ sr.faqSeq }}</span>
          </td>
          <td class="td-title">
            <span
              style="text-decoration: underline; cursor: pointer"
              @click="moveToDetail(sr.faqId)"
              >{{ sr.faqTtl }}</span
            >
          </td>
          <td>
            <span v-if="sr.expsrYn == 'Y'">노출</span>
            <span v-else class="text-red">비노출</span>
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
        <tr v-else>
          <td colspan="10">조회된 결과가 없습니다.</td>
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

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const maskingStore = useMaskingStore();
const masking = ref(true);
const faqTrgt = ref(["COM", "TCHR", "STDNT"]);
const faqSe = ref("전체");
const expsrYn = ref("");
const startDate = ref();
const endDate = ref();
const searchType = ref("제목");
const searchWord = ref("");
const searchResult = ref([]);

const pageable = ref({});

const ascending = ref(true);
const sortColumn = ref("A.FAQ_SEQ");
const store = useSortStore();
const { sortTable } = store;

function sort(column) {
  sortTable(sortColumn, column, ascending);
}

watch(ascending, (n, o) => {
  if (n != o) {
    if (n) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    masking.value = true;
    inquiry(masking.value);
  }
});

watch(sortColumn, (n, o) => {
  if (n != o) {
    pageable.value.sort = n;
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
    "/faq/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};

const moveToDetail = (faqId) => {
  router.push({
    name: "faqDtlView",
    state: { id: faqId },
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
    searchFaqTrgt: faqTrgt.value,
    faqSe: "",
    expsrYn: expsrYn.value,
    faqTtl: "",
    rgtr: "",
    chgr: "",
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    faqSbjctCd: "",
  };

  if (selectedSubjectNm.value == "전체") {
    param.faqSbjctCd = "";
  } else {
    param.faqSbjctCd = subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    )?.comCdId;
  }

  if (faqSe.value == "전체") {
    param.faqSe = "";
  } else if (faqSe.value == "회원가입") {
    param.faqSe = "JOIN";
  } else if (faqSe.value == "과제부여") {
    param.faqSe = "WORK";
  } else if (faqSe.value == "툴팁") {
    param.faqSe = "TOOL";
  } else if (faqSe.value == "AI보조교사") {
    param.faqSe = "AI01";
  } else if (faqSe.value == "AI튜터") {
    param.faqSe = "AI02";
  }

  if (searchType.value == "제목") {
    if (searchWord.value != "") {
      param.faqTtl = searchWord.value;
    }
  } else if (searchType.value == "등록자") {
    if (searchWord.value != "") {
      param.rgtr = searchWord.value;
    }
  } else if (searchType.value == "수정자") {
    if (searchWord.value != "") {
      param.chgr = searchWord.value;
    }
  }

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.FAQ_SEQ";
  if (pageable.value.direction == undefined) pageable.value.direction = "ASC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `/faq/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response.data.content != null) {
        pageable.value.empty = response.data.empty;
        pageable.value.first = response.data.first;
        pageable.value.last = response.data.last;
        pageable.value.number = response.data.number;
        pageable.value.totalElements = response.data.totalElements;
        pageable.value.totalPages = response.data.totalPages;
        pageable.value.offset = response.data.pageable.offset;

        if (response.data.content != null) {
          searchResult.value = response.data.content;
        } else {
          searchResult.value = [];
        }
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
  pageable.value.direction = "ASC";
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
  width: 70% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>
