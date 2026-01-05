<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 공통코드관리</p>
    <p class="heading">공통코드관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tr>
        <th><span>키워드</span></th>
        <td>
          <div>
            <select-comp
              :options="[
                '코드그룹ID',
                '코드그룹명',
                '코드ID',
                '코드명',
                '상위코드ID',
              ]"
              v-model:selected="searchType"
            ></select-comp>
            <input
              type="text"
              style="width: 60%"
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
      <tr>
        <th>
          <span>사용 여부</span>
        </th>
        <td>
          <div>
            <span>
              <input
                type="radio"
                name="rdUseYn"
                id="rdoY"
                value="Y"
                v-model="useYn"
              />
              <label for="rdoY">Y</label>
            </span>
            <span>
              <input
                type="radio"
                name="rdUseYn"
                id="rdoN"
                value="N"
                v-model="useYn"
              />
              <label for="rdoN">N</label>
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
        <button class="btn-1" @click="router.push('/comCdMngWrite')">
          등록
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="25%" />
        <col width="30%" />
        <col width="10%" />
        <col width="20%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>코드그룹ID</span></th>
          <th><span>코드그룹명</span></th>
          <th><span>코드수</span></th>
          <th><span>코드보기</span></th>
          <th><span>사용 여부</span></th>
        </tr>
      </thead>
      <tbody v-if="!pageable.empty">
        <tr v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ pageable.totalElements - pageable.offset - idx }}</span>
          </td>
          <td>
            <span>{{ sr.groupCdId }}</span>
          </td>
          <td
            class="td-title"
            @click="
              moveToDetail(
                `${sr.groupCdId}`,
                `${pageable.totalElements - pageable.offset - idx}`
              )
            "
          >
            <span style="text-decoration: underline">{{ sr.groupCdNm }}</span>
          </td>
          <td>
            <span>{{ sr.comCnt }}</span>
          </td>
          <td>
            <button class="btn-1" @click="viewCode(sr.groupCdId)">
              코드보기
            </button>
          </td>
          <td>
            <span>{{ sr.useYn }}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="t-c">
          <td colspan="6">조회된 결과가 없습니다.</td>
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
      :is="ComCdPopup"
      :alertModal="alertModal"
      v-model:isActive="popupIsActive"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useSortStore } from "@/store/sort";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import ComCdPopup from "@/views/components/popup/ComCdPopup.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const alertModal = ref({
  contentAlign: "center",
  msgWidth: "100%",
  msgHeight: "100%",
  headerHtml: "코드 보기",
  width: "fit-content",
  height: "fit-content",
  noCloseBtn: true,
  groupCdId: 0,
  buttons: [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ],
});

const router = useRouter();
const popupIsActive = ref(false);

const pageable = ref({});

const searchType = ref("코드그룹ID");
const searchWord = ref("");
const useYn = ref("Y");
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
    await inquiry();
  }
});

watch(sortColumn, async (newVal, oldval) => {
  if (newVal != oldval) {
    pageable.value.sort = newVal;
    await inquiry();
  }
});

const viewCode = (groupCdId) => {
  alertModal.value.groupCdId = groupCdId;
  popupIsActive.value = true;
};

const moveToDetail = (groupCdId, index) => {
  router.push({
    name: "comCdDtlView",
    state: {
      id: groupCdId,
      idx: index,
    },
  });
};

function setEndPoint(paging) {
  if (!paging) pageable.value.number = 0;
  return "inquiry";
}

function setParam() {
  searchResult.value = [];
  let param = {
    searchType: "",
    groupCdId: "",
    groupCdNm: "",
    subComCdId: "",
    subComCdNm: "",
    subUptCdId: "",
    useYn: "",
  };

  if (searchType.value == "코드그룹ID") {
    param.groupCdId = searchWord.value;
  } else if (searchType.value == "코드그룹명") {
    param.groupCdNm = searchWord.value;
  } else if (searchType.value == "코드ID") {
    param.subComCdId = searchWord.value;
  } else if (searchType.value == "코드명") {
    param.subComCdNm = searchWord.value;
  } else if (searchType.value == "상위코드ID") {
    param.subUptCdId = searchWord.value;
  }
  param.useYn = useYn.value;

  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "A.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";

  return param;
}

const inquiry = async (paging = false) => {
  const endp = setEndPoint(paging);
  const param = setParam();

  await axios
    .post(
      `/commoncode/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
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
  await inquiry();
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