<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 안내 동영상 관리</p>
    <p class="heading">안내 동영상 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>학과명</span></th>
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
          <th>
            <span>대상</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  id="TCHR"
                  value="TCHR"
                  name="rdTrgt"
                  v-model="gdVdoTrgt"
                />
                <label for="TCHR">교사용</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="STDNT"
                  value="STDNT"
                  name="rdTrgt"
                  v-model="gdVdoTrgt"
                />
                <label for="STDNT">학생용</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>현황</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  id="Whol2"
                  value=""
                  name="rdStts"
                  v-model="gdVdoStts"
                  checked
                />
                <label for="Whol2">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="Y"
                  value="Y"
                  name="rdStts"
                  v-model="gdVdoStts"
                />
                <label for="Y" class="text-red">현재버전</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="N"
                  value="N"
                  name="rdStts"
                  v-model="gdVdoStts"
                />
                <label for="N">종료</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>등록일자</span>
          </th>
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
                :options="['UI명', '제목', '내용', '최종수정자명']"
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
        <button class="btn-1" @click="router.push('/gdVdoMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="15%" />
        <col width="25%" />
        <col width="25%" />
        <col width="10%" />
        <col width="10%" />
        <col width="12.5%" />
        <col width="12.5%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대상</span></th>
          <th><span>UI명</span></th>
          <th><span>제목</span></th>
          <th><span>내용</span></th>
          <th><span>현황</span></th>
          <th><span>최종수정자명</span></th>
          <th class="sort-column" @click="sort('v.REG_DT')">
            <span>등록일시</span>
            <span
              v-if="'v.REG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'v.REG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('v.CHG_DT')">
            <span>최종수정일시</span>
            <span
              v-if="'v.CHG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'v.CHG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.gdVdoId }}</span>
          </td>
          <td>
            <span v-if="sr.gdVdoTrgt == 'TCHR'">교사용</span
            ><span v-if="sr.gdVdoTrgt == 'STDNT'">학생용</span>
          </td>
          <td>
            <span>{{ sr.uiTtl }}</span>
          </td>
          <td
            class="td-title"
            @click="
              router.push({
                name: 'gdVdoDtlView',
                state: { id: `${sr.gdVdoId}` },
              })
            "
          >
            <span style="text-decoration: underline">{{ sr.gdVdoTtl }}</span>
          </td>
          <td class="td-title">
            <span>{{ truncateText(sr.gdVdoCn, 30) }}</span>
          </td>
          <td>
            <span v-if="sr.gdVdoStts === 'Y'" class="text-red">현재버전</span>
            <span v-if="sr.gdVdoStts != 'Y'">종료</span>
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
          <td colspan="8">조회된 결과가 없습니다.</td>
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

const maskingStore = useMaskingStore();
const masking = ref(true);
const gdVdoTrgt = ref("TCHR");
const gdVdoStts = ref("");
const startDate = ref();
const endDate = ref();
const searchType = ref("UI명");
const searchWord = ref("");
const searchResult = ref([]);
const ascending = ref(false);
const sortColumn = ref("v.REG_DT");
const store = useSortStore();
const { sortTable } = store;

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

function sort(column) {
  sortTable(sortColumn, column, ascending);
}

const truncateText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  } else {
    return text;
  }
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/guidevideo/inquirybare",
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
    uiId: "",
    gdVdoTtl: "",
    searchStartDate: null,
    searchEndDate: null,
    gdVdoCn: "",
    chgr: "",
    gdVdoTrgt: "",
    gdVdoStts: "",
    gdVdoSbjctCd: "",
  };

  if (selectedSubjectNm.value == "전체") {
    param.gdVdoSbjctCd = "";
  } else {
    param.gdVdoSbjctCd = subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    )?.comCdId;
  }
  param.gdVdoTrgt = gdVdoTrgt.value;
  param.gdVdoStts = gdVdoStts.value;
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  if (searchType.value == "UI명") {
    param.uiId = searchWord.value;
  } else if (searchType.value == "제목") {
    param.gdVdoTtl = searchWord.value;
  } else if (searchType.value == "내용") {
    param.gdVdoCn = searchWord.value;
  } else if (searchType.value == "최종수정자명") {
    param.chgr = searchWord.value;
  }

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "v.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (maskFlag = null) => {
  const endp = setEndPoint(maskFlag);
  const param = setParam();

  await axios
    .post(
      `/guidevideo/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
            searchResult.value = [];
          }
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
