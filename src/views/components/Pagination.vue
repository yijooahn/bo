<template>
  <div v-if="isPageSize" class="pagesize-ct">
    <div class="ct-20">
      <select-comp
        :isString="false"
        :options="pageSizeList"
        v-model:selectedObj="selectedPagesize"
      ></select-comp>
      <label>{{ label }}</label
      ><span v-if="!pageable.empty"
        >{{ (pageable?.totalElements * 1).toLocaleString() }}{{ unit }}</span
      ><span v-else>0{{ unit }}</span>
    </div>
  </div>
  <div v-if="!pageable.empty && !isPageSize">
    <div class="pagination">
      <div class="pagination-inner">
        <div
          @click="() => goPage(0)"
          :class="pageable.first ? 'disabled' : ''"
          class="btn-first"
        ></div>
        <div
          @click="() => goPage(pageable.startPage - 11)"
          :class="pageable.startPage == 1 ? 'disabled' : ''"
          class="btn-prev"
        ></div>
        <div
          @click="() => goPage(pg - 1)"
          class="btn-no"
          v-for="pg in pageList"
          :class="pageable.number + 1 == pg ? 'current' : ''"
        >
          {{ pg }}
        </div>
        <div
          @click="() => goPage(pageable.startPage + 9)"
          :class="
            pageable.startPage + 9 >= pageable.totalPages ? 'disabled' : ''
          "
          class="btn-next"
        ></div>
        <div
          @click="() => goPage(pageable.totalPages - 1)"
          :class="pageable.last ? 'disabled' : ''"
          class="btn-end"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectComp from "@/views/components/Select.vue";
import {
  defineEmits,
  defineModel,
  defineProps,
  onMounted,
  ref,
  watch,
} from "vue";
const props = defineProps({
  isPageSize: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: "검색결과 : ",
    required: false,
  },
  unit: {
    type: String,
    default: "",
    required: false,
  },
});
const emits = defineEmits(["onChangeHandler"]);
const pageable = defineModel("pageable", {
  type: Object,
  default: false,
  required: false,
});
const pageSizeList = ref([
  {
    value: 10,
    name: "10개씩 보기",
  },
  {
    value: 20,
    name: "20개씩 보기",
  },
  {
    value: 30,
    name: "30개씩 보기",
  },
  {
    value: 50,
    name: "50개씩 보기",
  },
  {
    value: 100,
    name: "100개씩 보기",
  },
]);
const selectedPagesize = ref({
  value: 10,
  name: "10개씩 보기",
});
const pageList = ref([]);
onMounted(() => {
  pageable.value.size = 10;
  pageable.value.number = 0;
  pageable.value.empty = true;
  pageable.value.sort = "REG_DT";
  pageable.value.direction = "DESC";
});
async function goPage(num) {
  if (num <= 0) {
    num = 0;
  }
  if (num >= pageable.value.totalPages) {
    num = pageable.value.totalPages - 1;
  }
  pageable.value.totalPages = undefined;
  pageable.value.number = num;
  await emits("onChangeHandler");
}
watch(
  () => [pageable.value.number, pageable.value.totalPages],
  (newVal, oldVal) => {
    if (newVal[0] != undefined && newVal[1] != undefined) {
      pageList.value = [];
      pageable.value.startPage =
        Math.floor(pageable.value.number / 10) * 10 + 1;
      pageable.value.tempEndPage = pageable.value.startPage + 10 - 1;
      pageable.value.endPage =
        pageable.value.tempEndPage < pageable.value.totalPages
          ? pageable.value.tempEndPage
          : pageable.value.totalPages;
      if (pageable.value.startPage + 9 < pageable.value.endPage) {
        pageable.value.endPage = pageable.value.startPage + 9;
      }
      for (var i = pageable.value.startPage; i <= pageable.value.endPage; i++) {
        pageList.value.push(i);
      }
    } else if (newVal[2] == undefined || newVal[2] == 0 || newVal[2] == "0") {
      pageable.value.empty = true;
    }
  }
);
watch(
  () => pageable.value.size,
  async (n, o) => {
    if (n != o) {
      selectedPagesize.value = {
        value: n,
        name: n + "개씩 보기",
      };
      pageable.value.totalPages = undefined;
      pageable.value.number = 0;
      if (o !== undefined) {
        await emits("onChangeHandler");
      }
    }
  }
);
watch(
  () => selectedPagesize.value.value,
  (n, o) => {
    if (n != o) {
      pageable.value.size = n;
    }
  }
);
</script>

<style scoped>
.pagination {
  all: unset;
  width: 100%;
  display: flex;
  padding-right: 12px;
  align-items: center;
  flex-shrink: 0;
}

.pagination-inner {
  display: flex;
  align-items: flex-start;
  gap: 5px;
}

.pagination-inner div {
  cursor: pointer;
}

.disabled {
  pointer-events: none !important;
  cursor: default !important;
}

.pagination .btn-first {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: #fff;
  text-align: center;
  line-height: 28px;
  align-self: center;
}

.btn-first.disabled::after {
  content: url("/images/icon_btn-first_disabled.svg") !important;
}

.btn-end.disabled::after {
  content: url("/images/icon_btn-last_disabled.svg") !important;
}

.pagination .btn-first::after {
  width: 15.98px;
  height: 15px;
  flex-shrink: 0;
  content: url("/images/icon_btn-first.svg");
  vertical-align: middle;
}

.pagination .btn-prev {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: #fff;
  text-align: center;
  line-height: 28px;
  align-self: center;
}

.pagination .btn-prev::after {
  width: 7.98px;
  height: 15px;
  flex-shrink: 0;
  content: url("/images/icon_btn-prev.svg");
  vertical-align: middle;
}

.pagination .btn-prev.disabled::after {
  content: url("/images/icon_btn-prev_disabled.svg") !important;
}

.pagination .btn-next {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: #fff;
  text-align: center;
  line-height: 28px;
  align-self: center;
}

.pagination .btn-next::after {
  width: 7.98px;
  height: 15px;
  flex-shrink: 0;
  content: url("/images/icon_btn-next.svg");
  vertical-align: middle;
}

.pagination .btn-next.disabled::after {
  content: url("/images/icon_btn-next_disabled.svg") !important;
}

.pagination .btn-end {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: #fff;
  text-align: center;
  line-height: 28px;
  align-self: center;
}

.pagination .btn-end::after {
  width: 15.98px;
  height: 15px;
  flex-shrink: 0;
  content: url("/images/icon_btn-last.svg");
  vertical-align: middle;
}

.pagination .btn-no {
  display: flex;
  padding: 6px 10px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  border: 0.5px solid #dddfe0;
  background: #fff;
  color: #000;
  text-align: center;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  box-shadow: 1px 3px 6px #0000000f;
}

.pagination .current {
  display: flex;
  padding: 6px 10px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  border: 0.5px solid #dddfe0;
  background: #f8f8f8;
  color: var(--blue, #4876ef);
  text-align: center;
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.pagination-inner .btn-no:hover {
  background: #f8f8f8;
  color: var(--blue, #4876ef);
  animation: flip 0.5s ease-in-out;
}

@keyframes flip {
  0% {
    transform: perspective(400px) rotateY(0);
    animation-timing-function: ease-out;
  }
  40% {
    transform: perspective(400px) translateZ(50px) rotateY(170deg);
    animation-timing-function: ease-out;
  }
  50% {
    transform: perspective(400px) translateZ(50px) rotateY(190deg) scale(1);
    animation-timing-function: ease-in;
  }
  80% {
    transform: perspective(400px) rotateY(360deg) scale(0.95);
    animation-timing-function: ease-in;
  }
  100% {
    transform: perspective(400px) scale(1);
    animation-timing-function: ease-in;
  }
}
.pagesize-ct {
  width: 100%;
  display: flex;
}
</style>
