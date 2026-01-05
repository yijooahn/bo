<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 장애대응체계 관리</p>
    <p class="heading">장애대응체계 관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>구분</span></th>
          <td>
            <div>
              <span>
                <input
                  type="checkbox"
                  id="stts0"
                  value="0"
                  v-model="checkAll1"
                  @click="clickCheckAll1"
                />
                <label for="stts0">전체</label>
              </span>
              <span>
                <input type="checkbox" id="stts1" value="1" v-model="obstlSe" />
                <label for="stts1">긴급대응체계</label>
              </span>
              <span>
                <input type="checkbox" id="stts2" value="2" v-model="obstlSe" />
                <label for="stts2">장애모의훈련</label>
              </span>
              <span>
                <input type="checkbox" id="stts3" value="3" v-model="obstlSe" />
                <label for="stts3">모의해킹</label>
              </span>
              <span>
                <input type="checkbox" id="stts4" value="4" v-model="obstlSe" />
                <label for="stts4">보안취약점진단</label>
              </span>
              <span>
                <input type="checkbox" id="stts5" value="5" v-model="obstlSe" />
                <label for="stts5">기타</label>
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
          <th><span>현황</span></th>
          <td>
            <div>
              <input
                type="radio"
                name="rdStts"
                id="rdo0"
                value=""
                v-model="searchObstlStts"
                checked
              />
              <label for="rdo0">전체</label>
              <input
                type="radio"
                name="rdStts"
                id="rdo1"
                value="Y"
                v-model="searchObstlStts"
              />
              <label for="rdo1" class="text-red">현재버전</label>
              <input
                type="radio"
                name="rdStts"
                id="rdo2"
                value="N"
                v-model="searchObstlStts"
              />
              <label for="rdo2">종료</label>
            </div>
          </td>
        </tr>
      </tbody>
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
      <div class="ct-21">
        <button class="btn-1" v-if="masking" @click="unmasking()">
          마스킹 해제
        </button>
        <button class="btn-2" @click="choiceDelete()">선택삭제</button>
        <button class="btn-1" @click="router.push('/obstlRspdSysMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="10%" />
        <col width="30%" />
        <col width="10%" />
        <col width="10%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <div>
              <input
                type="checkbox"
                v-model="checkAll2"
                @click="clickCheckAll2"
                :disabled="disableCheckAll2"
              />
            </div>
          </th>
          <th><span>No.</span></th>
          <th><span>구분</span></th>
          <th><span>제목</span></th>
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
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span
              ><input
                type="checkbox"
                v-model="selectList"
                :value="sr.obstlId"
                :id="sr.obstlId"
                :disabled="sr.obstlStts == 'Y'"
            /></span>
          </td>
          <td>
            <span>{{ sr.obstlId }}</span>
          </td>
          <td>
            <span v-if="sr.obstlSe == 1">긴급대응체계</span>
            <span v-if="sr.obstlSe == 2">장애모의훈련</span>
            <span v-if="sr.obstlSe == 3">모의해킹</span>
            <span v-if="sr.obstlSe == 4">보안취약점진단</span>
            <span v-if="sr.obstlSe == 5">기타</span>
          </td>
          <td class="td-title" @click="moveToDetail(sr.obstlId)">
            <span style="text-decoration: underline">{{ sr.obstlTtl }}</span>
          </td>
          <td>
            <span v-if="sr.obstlStts == 'Y'" class="text-red">현재버전</span>
            <span v-else>종료</span>
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
      @on-reload-handler="inquiry(masking)"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="deleteCheckedPopupIsActive"
      :is="ModalComp"
      :alertModal="deleteCheckedModal"
      @onSubmitHandler="deleteCheckedSubmit()"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
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

const deleteCheckedModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>선택한 항목을 삭제하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "submit",
      content: "예",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "아니오",
      addClass: "btn-2",
    },
  ],
});

const router = useRouter();
const popupIsActive = ref(false);
const deleteCheckedPopupIsActive = ref(false);

const pageable = ref({});

const masking = ref(true);
const startDate = ref();
const endDate = ref();
const checkAll1 = ref(true);
const checkAll2 = ref(false);
const disableCheckAll2 = ref(true);
const searchObstlStts = ref();
const obstlSe = ref([1, 2, 3, 4, 5]);
const searchResult = ref([]);
const selectList = ref([]);

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
  if (!checkAll1.value) {
    obstlSe.value = [1, 2, 3, 4, 5];
  } else {
    obstlSe.value = [];
  }
};

watch(obstlSe, (v) => {
  checkAll1.value = obstlSe.value.length == 5 ? true : false;
});

const clickCheckAll2 = () => {
  if (!checkAll2.value) {
    selectList.value = searchResult.value
      .filter((item) => item.obstlStts != "Y")
      .map((item) => item.obstlId);
  } else {
    selectList.value = [];
  }
};

watch(selectList, (v) => {
  checkAll2.value =
    selectList.value.length > 0 &&
    selectList.value.length ==
      searchResult.value.filter((item) => item.obstlStts != "Y").length
      ? true
      : false;
});

watch(searchResult, (v) => {
  if (searchResult.value != undefined && searchResult.value != null) {
    disableCheckAll2.value =
      searchResult.value.filter((item) => item.obstlStts != "Y").length > 0
        ? false
        : true;
  }
});

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const choiceDelete = () => {
  if (selectList.value.length > 0) {
    deleteCheckedModal.value.bodyHtml =
      "<span>선택한 항목을 삭제하시겠습니까?</span>";
    deleteCheckedModal.value.buttons = [
      {
        clickEvent: "submit",
        content: "예",
        addClass: "btn-1",
      },
      {
        clickEvent: "close",
        content: "아니오",
        addClass: "btn-2",
      },
    ];
    deleteCheckedPopupIsActive.value = true;
  } else {
    deleteCheckedModal.value.bodyHtml =
      "<span>삭제할 장애대응체계를 선택해 주세요.</span>";
    deleteCheckedModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    deleteCheckedPopupIsActive.value = true;
  }
};

const deleteCheckedSubmit = async () => {
  try {
    for (const obstlId of selectList.value) {
      await axios.delete(`/obstacle/delete/${obstlId}`);
    }
    alertModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
        alertModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
        alertModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        popupIsActive.value = true;
      }
    }
  } finally {
    selectList.value = [];
    masking.value = true;
    await inquiry(masking.value);
  }
};

const moveToDetail = (obstlId) => {
  router.push({
    name: "obstlRspdSysDtlView",
    state: { id: obstlId },
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
    searchStartDate: null,
    searchEndDate: null,
    obstlStts: "",
    searchObstlSe: [],
  };
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  param.obstlStts = searchObstlStts.value;
  param.searchObstlSe = obstlSe.value;
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
      `/obstacle/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
    .finally(() => {
      masking.value = true;
      selectList.value = [];
    });
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/obstacle/inquirybare",
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