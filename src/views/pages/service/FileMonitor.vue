<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 파일 모니터링 관리</p>
    <p class="heading">파일 모니터링 관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <span>구분</span>
          </th>
          <td>
            <div>
              <span
                ><input
                  type="checkbox"
                  id="fileSe0"
                  v-model="checkAll"
                  @click="userSelect = true"
                /><label for="fileSe0">전체</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe1"
                  value="1"
                  v-model="searchFileSe"
                /><label for="fileSe1">자료함</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe2"
                  value="2"
                  v-model="searchFileSe"
                /><label for="fileSe2">교사(과제)</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe3"
                  value="3"
                  v-model="searchFileSe"
                /><label for="fileSe3">학생(과제)</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe4"
                  value="4"
                  v-model="searchFileSe"
                /><label for="fileSe4">교사(활동)</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe5"
                  value="5"
                  v-model="searchFileSe"
                /><label for="fileSe5">학생(활동)</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe6"
                  value="6"
                  v-model="searchFileSe"
                /><label for="fileSe6">교사/학생(프로필이미지)</label></span
              >
              <span
                ><input
                  type="checkbox"
                  id="fileSe7"
                  value="7"
                  v-model="searchFileSe"
                /><label for="fileSe7">기타</label></span
              >
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>상태</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  id="fileStts0"
                  value=""
                  name="fileStts"
                  v-model="fileStts"
                  checked
                />
                <label for="fileStts0">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="fileStts1"
                  value="1"
                  name="fileStts"
                  v-model="fileStts"
                />
                <label for="fileStts1">노출</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="fileStts2"
                  value="2"
                  name="fileStts"
                  v-model="fileStts"
                />
                <label for="fileStts2" class="text-red">강제비노출</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>검열여부</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  id="cnsrshpYn0"
                  value=""
                  name="cnsrshpYn"
                  v-model="cnsrshpYn"
                />
                <label for="cnsrshpYn0">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="cnsrshpYn1"
                  value="Y"
                  name="cnsrshpYn"
                  v-model="cnsrshpYn"
                />
                <label for="cnsrshpYn1">완료</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="cnsrshpYn2"
                  value="N"
                  name="cnsrshpYn"
                  v-model="cnsrshpYn"
                  checked
                />
                <label for="cnsrshpYn2" class="text-red">미완료</label>
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
                :options="['파일명', '최종수정자']"
                v-model:selected="searchType"
              ></select-comp>
              <input
                type="text"
                placeholder="키워드를 입력하세요"
                v-model.trim="searchWord"
                @keyup.enter="() => inquiry('bare')"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-18">
      <button @click="() => inquiry('bare')" class="btn-1">조회</button>
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
        <button class="btn-1" @click="ilgwal()">일괄검열</button>
        <button class="btn-2" @click="expose(2)">강제비노출</button>
        <button class="btn-1" @click="expose(1)">노출</button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="6%" />
        <col width="15%" />
        <col width="10%" />
        <col width="5%" />
        <col width="8%" />
        <col width="8%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <input
              v-model="checkAll2"
              type="checkbox"
              @click="userSelect = true"
            />
          </th>
          <th><span>No.</span></th>
          <th><span>구분</span></th>
          <th><span>파일명</span></th>
          <th><span>썸네일</span></th>
          <th><span>상태</span></th>
          <th><span>검열여부</span></th>
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
          <th class="sort-column" @click="sort('A.APR_DT')">
            <span>최종승인일시</span>
            <span
              v-if="'A.APR_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'A.APR_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!pageable.empty"
          v-for="(sr, idx) in searchResult"
          :class="
            selected.includes(pageable.offset + idx + 1) ? 'selected' : ''
          "
          :key="idx"
        >
          <td>
            <span
              ><input
                v-model="selectList"
                :value="sr.fileMntrId"
                type="checkbox"
            /></span>
          </td>
          <td>
            <span>{{ sr.fileMntrId }}</span>
          </td>
          <td>
            <span v-if="sr.fileSe == 1">자료함</span>
            <span v-else-if="sr.fileSe == 2">교사(과제)</span>
            <span v-else-if="sr.fileSe == 3">학생(과제)</span>
            <span v-else-if="sr.fileSe == 4">교사(활동)</span>
            <span v-else-if="sr.fileSe == 5">학생(활동)</span>
            <span v-else-if="sr.fileSe == 6">교사/학생(프로필이미지)</span>
            <span v-else>기타</span>
          </td>
          <td>
            <span
              @click="
                selected.push(pageable.offset + idx + 1);
                detailModal.no = pageable.offset + idx + 1;
                detailModal.currentId = sr.fileMntrId;
                detailModal.masking = false;
                detailPopupIsActive = true;
              "
              style="cursor: pointer; text-decoration: underline"
              >{{ sr.atchFileNm }}</span
            >
          </td>
          <td><img width="100px" height="100px" :src="sr.thumbNailLink" /></td>
          <td>
            <span v-if="sr.fileStts == 1">노출</span>
            <span v-else class="text-red">강제비노출</span>
          </td>
          <td>
            <span v-if="sr.cnsrshpYn == 'Y'">완료</span>
            <span
              v-else
              @click="confirmUpdate(sr.fileMntrId)"
              style="text-decoration: underline; cursor: pointer"
              class="text-red"
              >(미완료)</span
            >
          </td>
          <td>
            <span>{{ sr.chgr }}</span>
          </td>
          <td>
            <span>{{ sr.regDt }}</span>
          </td>
          <td>
            <span>{{ sr.aprDt }}</span>
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
      @on-update-handler="(v) => update(v)"
      @on-confirm-handler="(v) => submitExpose(v)"
      @on-reload-handler="() => inquiry()"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <file-detail-modal
      v-model:isActive="detailPopupIsActive"
      :alertModal="detailModal"
    ></file-detail-modal>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import FileDetailModal from "@/views/components/popup/FileDetailModal.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const maskingStore = useMaskingStore();
const ascending = ref(false);
const sortColumn = ref("A.REG_DT");
const searchFileSe = ref([]);
const fileStts = ref();
const cnsrshpYn = ref("N");
const startDate = ref();
const endDate = ref();
const checkAll = ref(true);
const checkAll2 = ref(false);
const userSelect = ref(true);
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
const masking = ref(true);
const selectList = ref([]);
const popupIsActive = ref(false);
const pageable = ref({});
const router = useRouter();
const searchType = ref("파일명"); //파일명,최종수정자
const searchWord = ref(""); //검색어
const searchResult = ref([]);
const detailPopupIsActive = ref(false);
const detailModal = ref({
  contentAlign: "start",
  overflow: "hidden",
  display: "block",
  headerHtml: "<h4>파일정보</h4>",
  masking: true,
  currentId: 0,
  //bodyHtml: "<span>승인 하시겠습니까?</span>",
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
const selected = ref([]);
const tempId = ref();
const store = useSortStore();
const { sortTable } = store;

watch(
  checkAll,
  (v) => {
    if (userSelect.value) {
      searchFileSe.value = [];
      if (v) {
        searchFileSe.value = [1, 2, 3, 4, 5, 6, 7];
      }
    }
  },
  {
    immediate: true,
  }
);
watch(
  searchFileSe,
  (v) => {
    if (v.length == 7) {
      userSelect.value = false;
      checkAll.value = true;
    } else {
      userSelect.value = false;
      checkAll.value = false;
    }
  },
  { deep: true }
);
watch(checkAll2, (v) => {
  if (userSelect.value) {
    if (v) {
      selectList.value = searchResult.value.map((sr) => sr.fileMntrId);
    } else {
      selectList.value = [];
    }
  }
});
watch(selectList, (v) => {
  if (searchResult.value.length > 0 && v.length == searchResult.value.length) {
    userSelect.value = false;
    checkAll2.value = true;
  } else {
    userSelect.value = false;
    checkAll2.value = false;
  }
});
function sort(col) {
  sortTable(sortColumn, col, ascending);
}

const confirmUpdate = (fileMntrId) => {
  tempId.value = fileMntrId;
  alertModal.value.masking = false;
  alertModal.value.bodyHtml = "<span>완료 처리하시겠습니까?</span>";
  alertModal.value.buttons = [
    {
      clickEvent: "update",
      content: "예",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "아니오",
      addClass: "btn-2",
    },
  ];
  popupIsActive.value = true;
};
const update = async () => {
  var param = {};
  param.fileMntrId = tempId.value;
  await axios
    .post("/filemonitor/modifycns", param)
    .then((response) => {
      if (response.status != null) {
        if (response.status == 200) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "reload",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          checkAll2.value = false;
        }
      }
    })
    .catch((error) => {
      alertModal.value.masking = false;
      alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "reload",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      checkAll2.value = false;
    });
};
const ilgwal = async () => {
  var param = {};
  if (searchFileSe.value.length == 7) {
    param.searchFileSe = [];
  } else if (searchFileSe.value.length == 0) {
    param.searchFileSe = [];
  } else {
    param.searchFileSe = searchFileSe.value;
  }
  if (searchType.value == "파일명") {
    if (searchWord.value != "") {
      param.atchFileNm = searchWord.value;
    }
  } else if (searchType.value == "최종수정자") {
    if (searchWord.value != "") {
      param.userNm = searchWord.value;
    }
  }
  param.fileStts = fileStts.value;
  param.cnsrshpYn = cnsrshpYn.value;

  await axios
    .post("/filemonitor/modifycnsall", param)
    .then((response) => {
      if (response.status != null) {
        if (response.status == 200) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "reload",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          checkAll2.value = false;
        }
      }
    })
    .catch((error) => {
      alertModal.value.masking = false;
      alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "reload",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      checkAll2.value = false;
    });
};
const submitExpose = async (stts) => {
  // var param = {};
  // param.fileMntrIdList = selectList.value;
  // selectList.value = [];
  // param.fileStts = stts;
  // console.log(param)
  // return;
  // const response = await fetchDatas("/filemonitor/modifystts", param);
  // if (response) {
  //     alertModal.value.masking = false;
  //     alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
  //     alertModal.value.buttons = [{
  //         clickEvent: 'reload',
  //         content: '확인',
  //         addClass: 'btn-1',
  //     }];
  //     popupIsActive.value = true;
  //     checkAll2.value = false;
  // } else {
  //     alertModal.value.masking = false;
  //     alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
  //     alertModal.value.buttons = [{
  //         clickEvent: 'reload',
  //         content: '확인',
  //         addClass: 'btn-1',
  //     }];
  //     popupIsActive.value = true;
  //     checkAll2.value = false;
  // }
  try {
    let param = {
      fileMntrIdList: selectList.value,
      fileStts: stts,
    };
    const response = await axios.post(`/filemonitor/modifystts`, param);

    alertModal.value.masking = false;
    alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "reload",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    checkAll2.value = false;
  } catch (error) {
    alertModal.value.masking = false;
    alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "reload",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    checkAll2.value = false;
  } finally {
    selectList.value = [];
  }
};

const expose = (stts) => {
  const list = [];
  const failList = [];
  for (var i = 0; i < selectList.value.length; i++) {
    var id = selectList.value[i];
    for (var j = 0; j < searchResult.value.length; j++) {
      if (searchResult.value[j].fileMntrId == id) {
        if (stts != searchResult.value[j].fileStts) {
          list.push(id);
        } else {
          failList.push(id);
        }
      }
    }
  }
  selectList.value = list;
  alertModal.value.masking = false;

  if (stts == 1) {
    if (selectList.value.length <= 0 || failList.length > 0) {
      selectList.value = [];
      alertModal.value.bodyHtml =
        "<span>강제비노출 항목을 선택해 주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      return;
    }
  } else if (stts == 2) {
    if (selectList.value.length <= 0 || failList.length > 0) {
      selectList.value = [];
      alertModal.value.bodyHtml = "<span>노출 항목을 선택해 주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      return;
    }
  }

  if (selectList.value.length > 0) {
    if (stts == 1) {
      alertModal.value.bodyHtml = "<span>노출로 변경하시겠습니까?</span>";
      alertModal.value.stts = "1";
    } else if (stts == 2) {
      alertModal.value.bodyHtml = "<span>강제비노출로 변경하시겠습니까?</span>";
      alertModal.value.stts = "2";
    }
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "예",
        addClass: "btn-1",
      },
      {
        clickEvent: "close",
        content: "아니오",
        addClass: "btn-2",
      },
    ];
  }
  popupIsActive.value = true;
};

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const inquiry = async (bare) => {
  selected.value = [];
  var endp = "inquiry";
  if (!masking.value) {
    endp += "bare";
  }
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
    pageable.value.size = 10;
    pageable.value.number = 0;
  }
  searchResult.value = [];
  checkAll2.value = false;
  var param = {};
  if (searchFileSe.value.length == 7) {
    param.searchFileSe = [];
  } else if (searchFileSe.value.length == 0) {
    param.searchFileSe = [];
  } else {
    param.searchFileSe = searchFileSe.value;
  }
  if (searchType.value == "파일명") {
    if (searchWord.value != "") {
      param.atchFileNm = searchWord.value;
    }
  } else if (searchType.value == "등록자") {
    if (searchWord.value != "") {
      param.userNm = searchWord.value;
    }
  }
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  param.fileStts = fileStts.value;
  param.cnsrshpYn = cnsrshpYn.value;
  if (pageable.value.number == undefined) {
    pageable.value.number = 0;
  }
  if (pageable.value.size == undefined) {
    pageable.value.size = 10;
  }
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/filemonitor/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response != null) {
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
              // unsortedList.value = response.data.content;
              //  sortedList.value = [];
              //  for (var i = response.data.content.length - 1; i > -1; i--) {
              //      sortedList.value.push(response.data.content[i]);
              //  }
            } else {
              pageable.value.empty = true;
              searchResult.value = [];
            }
          }
        } else {
          pageable.value.empty = true;
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
    .finally(() => {
      masking.value = true;
      selectList.value = [];
    });
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

const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/filemonitor/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
.selected {
  background: #eaf4ff8a;
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
