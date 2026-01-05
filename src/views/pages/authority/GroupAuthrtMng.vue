<template>
  <div>
    <p class="breadcrumb">회원 관리 > 그룹관리</p>
    <p class="heading">그룹별 권한관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <span>최종 수정일</span>
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
                :options="['전체', '그룹명', '등록자']"
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
        <button class="btn-2" @click="triggerRemove()">선택삭제</button>
        <button
          class="btn-1"
          @click="
            router.push({ name: 'groupAuthrtMngWriteView', state: { id: 0 } })
          "
        >
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="6%" />
        <col width="8%" />
        <col width="8%" />
        <col width="30%" />
        <col width="8%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>
            <span
              ><input
                type="checkbox"
                v-model="checkAll"
                @click="userSelect = true"
            /></span>
          </th>
          <th><span>No.</span></th>
          <th><span>권한유무</span></th>
          <th><span>그룹명</span></th>
          <th><span>멤버수</span></th>
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
        <tr
          v-if="searchResult.length > 0"
          v-for="(sr, idx) in searchResult"
          :key="idx"
        >
          <td>
            <span
              ><input
                v-model="selectList"
                :value="sr.groupAuthrtId"
                type="checkbox"
                :disabled="sr.mbrCnt > 0"
            /></span>
          </td>
          <!--<td><span>{{ pageable.offset + idx + 1 }}</span></td>-->
          <td>
            <span>{{ sr.groupAuthrtId }}</span>
          </td>
          <td>
            <span
              v-if="sr.menuList > 0"
              style="text-decoration: underline; cursor: pointer"
              @click="clickPopup(sr.groupAuthrtId, sr.groupNm)"
              >{{ (sr.menuList * 1).toLocaleString() }}</span
            >
            <span
              v-else
              style="cursor: none; pointer-events: none"
              class="text-red"
              >권한없음</span
            >
          </td>
          <!-- <td class="cs-p" @click="router.push(`/groupAuthrtMngWrite/${sr.groupAuthrtId}`)"><span style="text-decoration: underline;">{{ sr.groupNm }}</span></td>-->
          <td
            class="cs-p"
            @click="
              router.push({
                name: 'groupAuthrtMngWriteView',
                state: { id: `${sr.groupAuthrtId}` },
              })
            "
          >
            <span style="text-decoration: underline">{{ sr.groupNm }}</span>
          </td>
          <td>
            <span>{{ sr.mbrCnt }}</span>
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
      @on-reload-handler="inquiry('mask')"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="detailPopupIsActive"
      :alertModal="detailModal"
      :is="AuthDetailModal"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import AuthDetailModal from "@/views/components/popup/GroupAuthDetailModal.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const maskingStore = useMaskingStore();
const selectList = ref([]);
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
const detailModal = ref({
  contentAlign: "start",
  // loginUser : document.cookie.split('; ').filter(el=>el.startsWith('maskedId='))[0].replace('maskedId=',''),
  overflow: "hidden",
  masking: false,
  display: "block",
  //headerHtml: '<h4>알림</h4>',
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
const detailPopupIsActive = ref(false);
const router = useRouter();
const popupIsActive = ref(false);
const pageable = ref({});

const masking = ref(true);
const startDate = ref();
const endDate = ref();
const searchType = ref("전체");
const searchWord = ref("");
const searchResult = ref([]);
const checkAll = ref(false);
const userSelect = ref(true);
const ascending = ref(false);
const sortColumn = ref("A.REG_DT");
const store = useSortStore();
const { sortTable } = store;
function sort(col) {
  sortTable(sortColumn, col, ascending);
}

watch(checkAll, (v) => {
  if (userSelect.value) {
    if (v) {
      selectList.value = Array.from(searchResult.value)
        .filter((sr) => sr.mbrCnt <= 0)
        .map((sr) => sr.groupAuthrtId);
    } else {
      selectList.value = [];
    }
  }
});
watch(
  selectList,
  (v) => {
    if (v.length == searchResult.value.filter((sr) => sr.mbrCnt <= 0).length) {
      userSelect.value = false;
      checkAll.value = true;
    } else {
      userSelect.value = false;
      checkAll.value = false;
    }
  },
  {
    deep: true,
  }
);

async function triggerRemove() {
  if (selectList.value.length > 0) {
    for (var i = 0; i < selectList.value.length; i++) {
      var id = selectList.value[i];
      try {
        const response = await axios.delete(`/authoritygroup/delete/${id}`);
        if (response.status == 200 && i == selectList.value.length - 1) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>삭제했습니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "reload",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
        }
      } catch (err) {
        if (err.response.status == 304) {
          alertModal.value.masking = false;
          alertModal.value.bodyHtml = "<span>삭제 실패했습니다.</span>";
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
    }
  } else {
    alertModal.value.masking = false;
    alertModal.value.bodyHtml = "<span>삭제할 그룹을 선택해 주세요.</span>";
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

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const clickPopup = (id, name) => {
  detailModal.value.id = id;
  detailModal.value.headerHtml = `<h4>${name}님의 권한보기<h4>`;
  //alertModal.value.bodyHtml = `<span>권한보기</span><br><span>${menuList}</span>`;
  detailModal.value.buttons = [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ];
  detailPopupIsActive.value = true;
};

async function inquiry(bare) {
  let endp = "inquiry";
  if (!masking.value) {
    endp += "bare";
  }
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
    pageable.value.size = 10;
    pageable.value.number = 0;
  } else if (bare == "mask") {
    searchWord.value = "";
  }
  searchResult.value = [];
  let param = {};
  if (searchType.value == "전체") {
    if (searchWord.value != "") {
      param.searchTypeAll = true;
      param.groupNm = searchWord.value;
      param.rgtr = searchWord.value;
    }
  } else if (searchType.value == "그룹명") {
    if (searchWord.value != "") {
      param.groupNm = searchWord.value;
    }
  } else if (searchType.value == "등록자") {
    if (searchWord.value != "") {
      param.rgtr = searchWord.value;
    }
  }
  //if(startDate.value != null && endDate.value != null){
  param.chgBgngYmd = startDate.value;
  param.chgEndYmd = endDate.value;
  //}else{

  //}

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/authoritygroup/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
}
const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/authority/inquirybare",
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
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>
