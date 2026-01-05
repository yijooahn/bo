<template>
  <div>
    <p class="breadcrumb">회원 관리 > 계정관리</p>
    <p class="heading">시스템관리자 계정관리</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <span>상태</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="checkbox"
                  id="stts0"
                  v-model="checkAll"
                  @click="userSelect = true"
                />
                <label for="stts0">전체</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="stts1"
                  value="1"
                  v-model="searchMbrStts"
                />
                <label for="stts1">승인</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="stts2"
                  value="2"
                  v-model="searchMbrStts"
                />
                <label for="stts2" class="text-red">승인대기</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="stts3"
                  value="3"
                  v-model="searchMbrStts"
                />
                <label for="stts3">반려</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="stts4"
                  value="4"
                  v-model="searchMbrStts"
                />
                <label for="stts4">사용정지</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>기간 </span>
          </th>
          <td>
            <div>
              <select-comp
                :options="['등록일', '최종수정일']"
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
          <th>
            <span>키워드 </span>
          </th>
          <td>
            <div>
              <select-comp
                :options="['전체', '이메일', '소속기관', '등록자']"
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
        <button class="btn-1" @click="router.push('/accountMngWrite')">
          관리자 생성
        </button>
        <!-- 한도희 - 승인 주석 처리 추후 예정 - 승인처리의 경우 시스템관리자 계정 수정에 들어가 상태 라디오를 변경 -->
        <button class="btn-3" @click="approve(1)">승인</button>
        <button class="btn-2" @click="approve(3)">승인거절</button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="5%" />
        <col width="10%" />
        <col width="10%" />
        <col width="8%" />
        <col width="8%" />
        <col width="8%" />
        <col width="13%" />
        <col width="13%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <div>
              <input
                v-model="checkAll2"
                type="checkbox"
                @click="userSelect = true"
              />
            </div>
          </th>
          <th><span>No.</span></th>
          <th><span>이메일</span></th>
          <th><span>관리자명</span></th>
          <th><span>상태</span></th>
          <th><span>마지막접속일</span></th>
          <th><span>소속기관명</span></th>
          <th><span>등록자명</span></th>
          <th><span>최종수정자명</span></th>
          <th class="sort-column" @click="sort('a.REG_DT')">
            <span>등록일시</span>
            <span
              v-if="'a.REG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'a.REG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('a.CHG_DT')">
            <span>최종수정일시</span>
            <span
              v-if="'a.CHG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'a.CHG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!pageable.empty"
          v-for="(sr, idx) in searchResult"
          :key="index"
        >
          <td>
            <span
              ><input v-model="selectList" :value="sr.mbrId" type="checkbox"
            /></span>
          </td>
          <!-- <td><span>{{pageable.offset + idx + 1}}</span></td>-->
          <td>
            <span>{{ sr.mbrId }}</span>
          </td>
          <!-- <td class="cs-p" @click="router.push(`/accountMngModify/${sr.mbrId}`)"><span style="text-decoration: underline;">{{sr.emlAddr}}</span></td> -->
          <td
            class="cs-p"
            @click="
              router.push({
                name: 'accountMngModifyView',
                state: { id: `${sr.mbrId}` },
              })
            "
          >
            <span style="text-decoration: underline">{{ sr.emlAddr }}</span>
          </td>
          <td>
            <span>{{ sr.mbrNm }}</span>
          </td>
          <td>
            <span v-if="sr.mbrStts == 1">승인</span>
            <span v-else-if="sr.mbrStts == 2">승인대기</span>
            <span v-else-if="sr.mbrStts == 3">반려</span>
            <span v-else-if="sr.mbrStts == 4">사용중지</span>
          </td>
          <!--<td><span>{{sr.lastLoginDt}}</span><span>{{latestBefore(sr.lastLoginDt)}}</span></td>-->
          <td>
            <span>{{ latestBefore(sr.lastLoginDt) }}</span>
          </td>
          <td>
            <span>{{ sr.ogdpInst }}</span>
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
      @on-confirm-handler="(v) => submitApprove(v)"
      @on-reload-handler="() => inquiry()"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";

import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
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
const masking = ref(true);
const selectList = ref([]);
const popupIsActive = ref(false);
const pageable = ref({});
const startDate = ref();
const endDate = ref();
const router = useRouter();
const searchKeyword = ref("등록일"); //regDt, chgDt 기간 검색 유형
const searchType = ref("전체"); //이메일, 소속기관, 등록자 검색어 유형
const searchWord = ref(""); //검색어
const checkAll = ref(false);
const checkAll2 = ref(false);
const searchMbrStts = ref([]);
const searchResult = ref([]);
const userSelect = ref(true);
const ascending = ref(false);
const sortColumn = ref("a.REG_DT");
const store = useSortStore();
const { sortTable } = store;
function sort(col) {
  sortTable(sortColumn, col, ascending);
}
const latestBefore = (value) => {
  if (value == "") {
    return;
  }
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  return `${betweenTimeDay}일 전`;
};
watch(checkAll, (v) => {
  if (userSelect.value) {
    if (v) {
      searchMbrStts.value = [1, 2, 3, 4];
    } else {
      searchMbrStts.value = [];
    }
  }
});
watch(searchMbrStts, (v) => {
  if (v.length == 4) {
    userSelect.value = false;
    checkAll.value = true;
  } else {
    userSelect.value = false;
    checkAll.value = false;
  }
});
watch(checkAll2, (v) => {
  if (userSelect.value) {
    if (v) {
      selectList.value = searchResult.value.map((sr) => sr.mbrId);
    } else {
      selectList.value = [];
    }
  }
});
watch(selectList, (v) => {
  if (v.length == searchResult.value.length) {
    userSelect.value = false;
    checkAll2.value = true;
  } else {
    userSelect.value = false;
    checkAll2.value = false;
  }
});

const fetchDatas = async (url, param) => {
  try {
    const response = await axios.post(url, param);
    if (response.data != null) {
      if (response.data > 0) {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
        if (err.response.status == 304) {
          return true;
        }
      }
    }
    return false;
  }
};
const submitApprove = async (stts) => {
  var param = {};
  var mbrIdList = "";
  for (var i = 0; i < selectList.value.length; i++) {
    if (i > 0) {
      mbrIdList += ",";
    }
    mbrIdList += selectList.value[i];
  }
  //  param.mbrIdList = selectList.value;
  param.mbrIdList = mbrIdList;
  param.mbrStts = stts;
  const response = await fetchDatas("/member/emailStatus", param);
  if (response) {
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
    selectList.value = [];
  } else {
  }
};

const approve = (stts) => {
  const list = [];
  for (var i = 0; i < selectList.value.length; i++) {
    var id = selectList.value[i];
    for (var j = 0; j < searchResult.value.length; j++) {
      if (searchResult.value[j].mbrId == id) {
        if (stts != searchResult.value[j].mbrStts) {
          list.push(id);
        } else if (stts == 1) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>기존에 승인된 계정입니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          return;
        } else if (stts == 3) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>기존에 반려된 계정입니다.</span>";
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
    }
  }
  selectList.value = list;
  alertModal.value.masking = false;
  if (selectList.value.length > 0) {
    if (stts == 1) {
      alertModal.value.bodyHtml = "<span>승인하시겠습니까?</span>";
      alertModal.value.stts = "1";
    } else if (stts == 3) {
      alertModal.value.bodyHtml = "<span>승인 거절하시겠습니까?</span>";
      alertModal.value.stts = "3";
    }
    alertModal.value.buttons = [
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
    ];
  } else {
    alertModal.value.bodyHtml = "<span>해당 항목을 선택해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
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
  if (searchMbrStts.value.length == 4) {
    param.searchMbrStts = [];
  } else if (searchMbrStts.value.length == 0) {
    param.searchMbrStts = [];
  } else {
    param.searchMbrStts = searchMbrStts.value;
  }
  if (searchKeyword.value == "등록일") {
    param.searchKeyword = "regDt";
  } else if (searchKeyword.value == "최종수정일") {
    param.searchKeyword = "chgDt";
  }
  //if(startDate.value != null && endDate.value != null){
  param.searchStartDate = startDate.value;
  param.searchEndDate = endDate.value;
  //}else{

  //}
  if (searchType.value == "이메일") {
    if (searchWord.value != "") {
      param.emlAddr = searchWord.value;
    }
  } else if (searchType.value == "소속기관") {
    if (searchWord.value != "") {
      param.ogdpInst = searchWord.value;
    }
  } else if (searchType.value == "등록자") {
    if (searchWord.value != "") {
      param.rgtr = searchWord.value;
    }
  } else if (searchType.value == "전체") {
    if (searchWord.value != "") {
      param.searchTypeAll = true;
      param.emlAddr = searchWord.value;
      param.ogdpInst = searchWord.value;
      param.rgtr = searchWord.value;
    }
  }
  if (pageable.value.number == undefined) {
    pageable.value.number = 0;
  }
  if (pageable.value.size == undefined) {
    pageable.value.size = 10;
  }
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "a.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/member/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
        //console.log(response)
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
      //  startDate.value=param.searchStartDate;
      //  endDate.value=param.searchEndDate;
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
    "/member/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
onMounted(async () => {
  checkAll.value = true;
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
