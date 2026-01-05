<template>
  <modal-comp
    @on-confirm-click="onConfirm"
    @on-reload-click="onReload"
    @on-relocate-click="onRelocate"
    @on-submit-click="onSubmit"
    @on-search-click="onSearch"
    :alertModal="alertModal"
    v-if="isActive"
    v-model:isActive="isActive"
  >
    <template #header>
      <div v-html="alertModal.headerHtml"></div>
    </template>
    <template #body>
      <div class="modal-div">
        <table class="table-1">
          <colgroup>
            <col width="10%" />
            <col width="90%" />
          </colgroup>
          <tbody>
            <tr>
              <th><span>배치이름</span></th>
              <td>
                <input
                  type="text"
                  disabled
                  style="width: 95%"
                  v-model="batchNm"
                />
              </td>
            </tr>
            <tr>
              <th><span>기간</span></th>
              <td>
                <div>
                  <select-comp
                    :options="['작업시작일자', '작업종료일자']"
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
          </tbody>
        </table>
        <div class="ct-18">
          <component
            :is="pagination"
            v-model:pageable="pageable"
            :unit="'건'"
            :label="'총 처리건수 : '"
            :isPageSize="true"
          ></component>
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
        <table class="table-2 t-c">
          <colgroup>
            <col width="7%" />
            <col width="9%" />
            <col width="9%" />
            <col width="45%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>No.</span></th>
              <th><span>시스템</span></th>
              <th><span>배치결과</span></th>
              <th><span>오류 메시지</span></th>
              <th><span>작업시작일시</span></th>
              <th><span>작업종료일시</span></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="!pageable.empty"
              v-for="(sr, idx) in searchResult"
              :key="idx"
            >
              <td>
                <span>{{ sr.batchHstryId }}</span>
              </td>
              <td>
                <span>{{ sr.batchSysNm }}</span>
              </td>
              <td>
                <span v-if="sr.batchRslt == 'Y'">O</span>
                <span v-else>X</span>
              </td>
              <td>{{ sr.errCn }}</td>
              <td>
                <span>{{ sr.batchBgngDt }}</span>
              </td>
              <td>
                <span>{{ sr.batchEndDt }}</span>
              </td>
            </tr>
            <tr v-else>
              <td colspan="6">조회된 결과가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ct-22">
        <component
          @on-change-handler="inquiry()"
          :is="pagination"
          v-model:pageable="pageable"
        ></component>
      </div>
    </template>
  </modal-comp>
</template>
  
<script setup lang="ts">
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { defineEmits, defineModel, defineProps, ref, watch } from "vue";
import ModalComp from "../Pop.vue";

const isActive = defineModel("isActive", {
  type: Boolean,
  required: false,
  default: false,
});
const emits = defineEmits([
  "onConfirmHandler",
  "onReloadHandler",
  "onRelocateHandler",
  "onSubmitHandler",
  "onSearchHandler",
]);
const props = defineProps({
  alertModal: {
    type: Object,
    required: false,
  },
});
function onConfirm() {
  isActive.value = false;
  emits("onConfirmHandler");
}
function onReload() {
  isActive.value = false;
  emits("onReloadHandler");
}
function onRelocate() {
  isActive.value = false;
  emits("onRelocateHandler");
}
function onSubmit() {
  isActive.value = false;
  emits("onSubmitHandler");
}
function onSearch() {
  isActive.value = true;
  emits("onSearchHandler", props.alertModal.batchId);
}

const today = ref(
  new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
);

const pageable = ref({});

const batchId = ref(0);
const batchNm = ref("");
const searchKeyword = ref("작업시작일자");
const startDate = ref();
const endDate = ref();
const searchResult = ref([]);

watch(isActive, async (v) => {
  if (v) {
    batchId.value = props.alertModal.batchId;
    batchNm.value = props.alertModal.batchNm;
    startDate.value = today.value;
    endDate.value = today.value;
    pageable.value.number = 0;
    await inquiry();
  }
});

const insertComma = (num) => {
  if (num == null) {
    return "0";
  } else if (num.toString().length > 3) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

const inquiry = async () => {
  pageable.value.size = 10;
  if (pageable.value.number == undefined) pageable.value.number = 0;

  searchResult.value = [];
  let param = {
    batchId: batchId.value,
    searchKeyword:
      searchKeyword.value == "작업시작일자" ? "batchBgngDt" : "batchEndDt",
    searchStartDate: startDate.value,
    searchEndDate: endDate.value,
  };

  await axios
    .post(
      `/batchmonitor/detail?page=${pageable.value.number}&size=${pageable.value.size}`,
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
</script>

<style scoped>
input[type="text"] {
  width: 100%;
}

.modal-div {
  margin: 1rem;
}
.ct-18 {
  display: flex;
}
</style>
  