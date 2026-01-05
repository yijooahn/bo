<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 아바타 관리</p>
    <p class="heading">아바타 관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>대상</span></th>
          <td>
            <div>
              <span
                ><input
                  type="checkbox"
                  id="chkTrgtT"
                  name="chkTrgt"
                  value="T"
                  v-model="avtrTrgt"
                /><label for="chkTrgtT">교사</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="chkTrgtE"
                  name="chkTrgt"
                  value="E"
                  v-model="avtrTrgt"
                /><label for="chkTrgtE">초등</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="chkTrgtM"
                  name="chkTrgt"
                  value="M"
                  v-model="avtrTrgt"
                /><label for="chkTrgtM">중등</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="chkTrgtH"
                  name="chkTrgt"
                  value="H"
                  v-model="avtrTrgt"
                /><label for="chkTrgtH">고등</label></span
              >
            </div>
          </td>
        </tr>
        <tr>
          <th><span>성별</span></th>
          <td>
            <div>
              <span
                ><input
                  type="checkbox"
                  id="chkGndrM"
                  name="chkGndr"
                  value="M"
                  v-model="avtrGndr"
                /><label for="chkGndrM">남성</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="chkGndrW"
                  name="chkGndr"
                  value="W"
                  v-model="avtrGndr"
                /><label for="chkGndrW">여성</label></span
              >
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
                  name="rdexpsrYn"
                  id="Whol1"
                  value=""
                  v-model="expsrYn"
                />
                <label for="Whol1">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdexpsrYn"
                  id="Y"
                  value="Y"
                  v-model="expsrYn"
                />
                <label for="Y">노출</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdexpsrYn"
                  id="N"
                  value="N"
                  v-model="expsrYn"
                />
                <label for="N" class="text-red">비노출</label>
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
                :options="['등록자', '수정자', '아바타이름']"
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
        <button class="btn-2" @click="choiceDelete()">선택삭제</button>
        <button class="btn-1" @click="router.push('/avtrChartrMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="3%" />
        <col width="3%" />
        <col width="8%" />
        <col width="20%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="3%" />
        <col width="20%" />
        <col width="4%" />
        <col width="5%" />
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="checkAll"
              @click="clickCheckAll"
              :disabled="disableCheckAll"
            />
          </th>
          <th><span>No.</span></th>
          <th><span>이미지</span></th>
          <th><span>아바타이름</span></th>
          <th><span>교사</span></th>
          <th><span>초등</span></th>
          <th><span>중등</span></th>
          <th><span>고등</span></th>
          <th><span>이미지 설명</span></th>
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
            <span
              ><input
                type="checkbox"
                v-model="selectList"
                :value="sr.avtrId"
                :id="sr.avtrId"
                :disabled="sr.expsrYn == 'Y'"
            /></span>
          </td>
          <td>
            <span>{{ sr.avtrId }}</span>
          </td>
          <td>
            <span
              ><img
                :src="sr.fileLink"
                style="width: 100px; height: 100px; cursor: pointer"
                @click="moveToDetail(sr.avtrId)"
            /></span>
          </td>
          <td class="td-title">
            <span>{{ sr.avtrNm }}</span>
          </td>
          <td>
            <span
              v-if="
                sr.avtrTrgt[0] === 'T' ||
                sr.avtrTrgt[1] === 'T' ||
                sr.avtrTrgt[2] === 'T' ||
                sr.avtrTrgt[3] === 'T'
              "
              >O</span
            ><span v-else>-</span>
          </td>
          <td>
            <span
              v-if="
                sr.avtrTrgt[0] === 'E' ||
                sr.avtrTrgt[1] === 'E' ||
                sr.avtrTrgt[2] === 'E' ||
                sr.avtrTrgt[3] === 'E'
              "
              >O</span
            ><span v-else>-</span>
          </td>
          <td>
            <span
              v-if="
                sr.avtrTrgt[0] === 'M' ||
                sr.avtrTrgt[1] === 'M' ||
                sr.avtrTrgt[2] === 'M' ||
                sr.avtrTrgt[3] === 'M'
              "
              >O</span
            ><span v-else>-</span>
          </td>
          <td>
            <span
              v-if="
                sr.avtrTrgt[0] === 'H' ||
                sr.avtrTrgt[1] === 'H' ||
                sr.avtrTrgt[2] === 'H' ||
                sr.avtrTrgt[3] === 'H'
              "
              >O</span
            ><span v-else>-</span>
          </td>
          <td class="td-title">
            <span>{{ setTextform(sr.altText) }}</span>
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
          <td colspan="14">조회된 결과가 없습니다.</td>
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
import SelectComp from "@/views/components/Select.vue";
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
const avtrTrgt = ref(["T", "E", "M", "H"]);
const avtrGndr = ref(["M", "W"]);
const expsrYn = ref("");

const checkAll = ref(false);
const disableCheckAll = ref(true);
const selectList = ref([]);
const searchType = ref("등록자");
const searchWord = ref("");
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

const clickCheckAll = () => {
  if (!checkAll.value) {
    selectList.value = searchResult.value
      .filter((item) => item.expsrYn != "Y")
      .map((item) => item.avtrId);
  } else {
    selectList.value = [];
  }
};

watch(selectList, (v) => {
  checkAll.value =
    selectList.value.length > 0 &&
    selectList.value.length ==
      searchResult.value.filter((item) => item.expsrYn != "Y").length
      ? true
      : false;
});

watch(searchResult, (v) => {
  if (searchResult.value != undefined && searchResult.value != null) {
    disableCheckAll.value =
      searchResult.value.filter((item) => item.expsrYn != "Y").length > 0
        ? false
        : true;
  }
});

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const choiceDelete = async () => {
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
      "<span>삭제할 아바타를 선택해 주세요.</span>";
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
    for (const avtrId of selectList.value) {
      await axios.delete(`/avatar/delete/${avtrId}`);
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
  } catch (error) {
    if (error.repsonse != null) {
      if (error.response.status != null) {
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

function setTextform(text) {
  let altText = text.trim();
  if (altText.length > 10) {
    return altText.slice(0, 10) + "...";
  } else {
    return altText;
  }
}

const moveToDetail = (avtrId) => {
  router.push({
    name: "avtrChartrDtlView",
    state: { id: avtrId },
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
    avtrTrgt: [],
    avtrGndr: [],
    expsrYn: "",
    searchStartDate: null,
    searchEndDate: null,
    rgtr: "",
    chgr: "",
    avtrNm: "",
  };

  param.avtrTrgt = avtrTrgt.value;
  param.avtrGndr = avtrGndr.value;
  param.expsrYn = expsrYn.value;
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;

  if (searchType.value == "등록자") {
    param.rgtr = searchWord.value;
  } else if (searchType.value == "수정자") {
    param.chgr = searchWord.value;
  } else if (searchType.value == "아바타이름") {
    param.avtrNm = searchWord.value;
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
      `/avatar/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response.data != null) {
        const dto = response.data.avatarDtoList;
        pageable.value.empty = dto.empty;
        pageable.value.first = dto.first;
        pageable.value.last = dto.last;
        pageable.value.number = dto.number;
        pageable.value.totalElements = dto.totalElements;
        pageable.value.totalPages = dto.totalPages;

        pageable.value.offset = dto.pageable.offset;
        if (response.data.avatarDtoList != null) {
          if (response.data.avatarDtoList.content.length > 0) {
            searchResult.value = response.data.avatarDtoList.content;
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
    .finally(() => {
      selectList.value = [];
    });
};

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/avatar/inquirybare",
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
  text-align: left;
  padding-left: 1rem;
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
