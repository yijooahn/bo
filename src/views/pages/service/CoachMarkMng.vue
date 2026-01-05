<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 코치마크 관리</p>
    <p class="heading">코치마크 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tbody>
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
                  type="radio"
                  name="rdTrgt"
                  id="TCHR"
                  value="TCHR"
                  v-model="coachMarkTrgt"
                />
                <label for="TCHR">교사용</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdTrgt"
                  id="STDNT"
                  value="STDNT"
                  v-model="coachMarkTrgt"
                />
                <label for="STDNT">학생용</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>현황</span></th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  name="rdStts"
                  id="Whol2"
                  value=""
                  v-model="coachMarkStts"
                />
                <label for="Whol2">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdStts"
                  id="Y"
                  value="Y"
                  v-model="coachMarkStts"
                />
                <label for="Y" class="text-red">현재버전</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdStts"
                  id="N"
                  value="N"
                  v-model="coachMarkStts"
                />
                <label for="N">종료</label>
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
                :options="['화면명', '제목', '등록자']"
                v-model:selected="searchType"
              ></select-comp>
              <input
                type="text"
                placeholder="키워드를 입력하세요"
                v-model.trim="searchWord"
                @keyup.enter="inquiry('bare')"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-18">
      <button @click="inquiry('bare')" class="btn-1">조회</button>
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
        <button class="btn-1" @click="router.push('/coachMarkMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
        <col width="25%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>대상</span></th>
          <th><span>화면명</span></th>
          <th><span>제목</span></th>
          <th><span>현황</span></th>
          <th><span>등록자명</span></th>
          <th><span>최종수정자명</span></th>
          <th class="sort-column" @click="sort('C.REG_DT')">
            <span>등록일시</span>
            <span
              v-if="'C.REG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'C.REG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('C.CHG_DT')">
            <span>최종수정일시</span>
            <span
              v-if="'C.CHG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'C.CHG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.coachMarkId }}</span>
          </td>
          <td>
            <span v-if="sr.coachMarkTrgt == 'TCHR'">교사용</span>
            <span v-if="sr.coachMarkTrgt == 'STDNT'">학생용</span>
          </td>
          <td>
            <span>{{ sr.scrnTtl }}</span>
          </td>
          <!-- <td class="cs-p" @click="router.push(`/coachMarkMngRead/${sr.coachMarkId}`)"><span style="text-decoration: underline;">{{ sr.coachMarkTtl }}</span></td> -->
          <td
            class="cs-p"
            @click="
              router.push({
                name: 'coachMarkDtlView',
                state: { id: `${sr.coachMarkId}` },
              })
            "
          >
            <span style="text-decoration: underline">{{
              sr.coachMarkTtl
            }}</span>
          </td>
          <td>
            <span v-if="sr.coachMarkStts == 'Y'" class="text-red"
              >현재버전</span
            >
            <span v-else>종료</span>
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
        @on-change-handler="inquiry()"
        :is="pagination"
        v-model:pageable="pageable"
      ></component>
    </div>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="inquiry()"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
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
const coachMarkTrgt = ref("TCHR");
const coachMarkStts = ref("");
const startDate = ref();
const endDate = ref();
const searchType = ref("화면명");
const searchWord = ref("");
const searchResult = ref([]);
const ascending = ref(false);
const sortColumn = ref("C.REG_DT");
const store = useSortStore();
const { sortTable } = store;
function sort(col) {
  sortTable(sortColumn, col, ascending);
}

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const inquiry = async (bare) => {
  let endp = "inquiry";
  if (!masking.value) endp += "bare";
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
    pageable.value.size = 10;
    pageable.value.number = 0;
  }

  searchResult.value = [];
  let param = {
    coachMarkTrgt: "",
    coachMarkStts: "",
    searchStartDate: null,
    searchEndDate: null,
    coachMarkTtl: "",
    scrnId: "",
    rgtr: "",
    coachMarkSbjctCd: "",
  };
  param.coachMarkTrgt = coachMarkTrgt.value;
  param.coachMarkStts = coachMarkStts.value;
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;

  if (selectedSubjectNm.value == "전체") {
    param.coachMarkSbjctCd = "";
  } else {
    param.coachMarkSbjctCd = subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    )?.comCdId;
  }

  if (searchType.value == "화면명") {
    param.scrnId = searchWord.value;
  } else if (searchType.value == "제목") {
    param.coachMarkTtl = searchWord.value;
  } else if (searchType.value == "등록자") {
    param.rgtr = searchWord.value;
  }
  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "C.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/coachmark/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
        //console.log(response);
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
    .finally(() => {
      masking.value = true;
    });
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/coachmark/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
watch(ascending, async (n, o) => {
  if (n != o) {
    if (n) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    await inquiry();
  }
});
watch(sortColumn, async (n, o) => {
  if (n != o) {
    pageable.value.sort = n;
    await inquiry();
  }
});

onMounted(async () => {
  await getTextbookCodeList(subjectList, selectedSubjectNm, "전체");
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
