<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 약관 이력 관리</p>
    <p class="heading">약관 이력 관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tr>
        <th><span>약관구분</span></th>
        <td>
          <div>
            <span>
              <input
                type="checkbox"
                id="chkTrmsALL"
                name="chkTrms"
                value=""
                :checked="trmsSeId.length == 3"
                @click="clickCheckAll1"
              />
              <label for="chkTrmsALL">전체</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkTrmsTOS"
                name="chkTrms"
                value="TOS"
                v-model="trmsSeId"
              />
              <label for="chkTrmsTOS">이용약관</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkTrmsPRH"
                name="chkTrms"
                value="PRH"
                v-model="trmsSeId"
              />
              <label for="chkTrmsPRH">개인정보처리</label>
            </span>
            <!--
            <span>
              <input
                type="checkbox"
                id="chkTrmsORP"
                name="chkTrms"
                value="ORP"
                v-model="trmsSeId"
              />
              <label for="chkTrmsORP">운영정책</label>
            </span>
            -->
          </div>
        </td>
      </tr>
      <tr>
        <th><span>필수여부</span></th>
        <td>
          <div>
            <span>
              <input
                type="checkbox"
                id="chkEsntlSeALL"
                name="chkEsntlSe"
                value=""
                :checked="esntlSeId.length == 3"
                @click="clickCheckAll2"
              />
              <label for="chkEsntlSeALL">전체</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkEsntlSeEST"
                name="chkEsntlSe"
                value="EST"
                v-model="esntlSeId"
              />
              <label for="chkEsntlSeEST">필수</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkEsntlSeCHC"
                name="chkEsntlSe"
                value="CHC"
                v-model="esntlSeId"
              />
              <label for="chkEsntlSeCHC">선택</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="chkEsntlSeNTC"
                name="chkEsntlSe"
                value="NTC"
                v-model="esntlSeId"
              />
              <label for="chkEsntlSeNTC">고지</label>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>기간</span></th>
        <td>
          <div>
            <select-comp
              :options="['약관 게시일', '등록일시', '최종수정일시']"
              v-model:selected="searchKeyword"
            ></select-comp>
            <calendar-comp
              v-model:startDate="startDate"
              v-model:endDate="endDate"
              :selectBox="true"
            ></calendar-comp>
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
                name="rdUptFixYn"
                id="trmsSttsALL"
                value=""
                v-model="trmsStts"
                checked
              />
              <label for="trmsSttsALL">전체</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdUptFixYn"
                id="trmsSttsY"
                value="Y"
                v-model="trmsStts"
              />
              <label for="trmsSttsY" class="text-red">현재버전</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdUptFixYn"
                id="trmsSttsN"
                value="N"
                v-model="trmsStts"
              />
              <label for="trmsSttsN">종료</label>
            </span>
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
        <button class="btn-1" @click="router.push('/trmsHstryMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="20%" />
        <col width="8%" />
        <col width="16%" />
        <col width="8%" />
        <col width="8%" />
        <col width="16%" />
        <col width="16%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>약관구분</span></th>
          <th><span>필수여부</span></th>
          <th><span>약관 게시일</span></th>
          <th><span>현황</span></th>
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
            <span>{{ sr.trmsId }}</span>
          </td>
          <td class="cs-p" @click="moveToDetail(sr.trmsId)">
            <span style="text-decoration: underline" v-if="sr.trmsSeId == 'TOS'"
              >이용약관</span
            >
            <span style="text-decoration: underline" v-if="sr.trmsSeId == 'PRH'"
              >개인정보처리</span
            >
            <!--
            <span style="text-decoration: underline" v-if="sr.trmsSeId == 'ORP'"
              >운영정책</span
            >
            -->
          </td>
          <td>
            <span v-if="sr.esntlSeId == 'EST'">필수</span>
            <span v-if="sr.esntlSeId == 'CHC'">선택</span>
            <span v-if="sr.esntlSeId == 'NTC'">고지</span>
          </td>
          <td>
            <span>{{ sr.trmsPstgYmd }}</span>
          </td>
          <td>
            <span v-if="sr.trmsStts == 'Y'" class="text-red">현재버전</span>
            <span v-if="sr.trmsStts == 'N'">종료</span>
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
const trmsSeId = ref(["TOS", "PRH", "ORP"]);
const esntlSeId = ref(["EST", "CHC", "NTC"]);
const searchKeyword = ref("약관 게시일");
const startDate = ref();
const endDate = ref();
const trmsStts = ref("");
const searchResult = ref([]);

const ascending = ref(false);
const sortColumn = ref("A.REG_DT");
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
  if (trmsSeId.value.length < 3) {
    trmsSeId.value = ["TOS", "PRH", "ORP"];
  } else {
    trmsSeId.value = [];
  }
};

const clickCheckAll2 = () => {
  if (esntlSeId.value.length < 3) {
    esntlSeId.value = ["EST", "CHC", "NTC"];
  } else {
    esntlSeId.value = [];
  }
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const moveToDetail = (trmsId) => {
  router.push({
    name: "trmsHstryDtlView",
    state: { id: trmsId },
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
    searchTrmsSeId: trmsSeId.value,
    searchEsntlSeId: esntlSeId.value,
    searchKeyword: "",
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
    trmsStts: trmsStts.value,
  };

  if (searchKeyword.value == "약관 게시일") {
    param.searchKeyword = "trmsPstgYmd";
  } else if (searchKeyword.value == "등록일시") {
    param.searchKeyword = "regDt";
  } else if (searchKeyword.value == "최종수정일시") {
    param.searchKeyword = "chgDt";
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
      `terms/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
    "/terms/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  await inquiry(masking.value);
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>