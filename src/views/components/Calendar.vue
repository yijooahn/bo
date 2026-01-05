<template>
  <div>
    <div v-if="statPeriod" class="dp-if">
      <div v-if="selectBox" class="dp-if">
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchAllCheck"
            :value="1"
            v-model="selectType"
          />
          <label for="searchAllCheck">전체</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchYesterdayCheck"
            :value="6"
            v-model="selectType"
          />
          <label for="searchYesterdayCheck">최근 1일</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchWeekCheck"
            :value="3"
            v-model="selectType"
          />
          <label for="searchWeekCheck">최근 7일</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchMonthCheck"
            :value="4"
            v-model="selectType"
          />
          <label for="searchMonthCheck">최근 30일</label>
        </span>
      </div>
      <div class="ct-4">
        <span v-if="selectBox" class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchPeriodCheck"
            :value="5"
            v-model="selectType"
          />
          <label for="searchPeriodCheck">기간</label>
        </span>
        <input
          type="date"
          :max="today"
          min="defaultDay"
          v-model="stDate"
          :disabled="stDateDisable"
        />
        <span style="align-self: center">~</span>
        <input
          type="date"
          :max="today"
          min="defaultDay"
          v-model="edDate"
          :disabled="edDateDisable"
        />
      </div>
    </div>
    <div v-else class="dp-if">
      <div v-if="selectBox" class="dp-if">
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchAllCheck"
            :value="1"
            v-model="selectType"
          />
          <label for="searchAllCheck">전체</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchTodayCheck"
            :value="2"
            v-model="selectType"
          />
          <label for="searchTodayCheck">오늘</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchWeekCheck"
            :value="3"
            v-model="selectType"
          />
          <label for="searchWeekCheck">최근 7일</label>
        </span>
        <span class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchMonthCheck"
            :value="4"
            v-model="selectType"
          />
          <label for="searchMonthCheck">최근 30일</label>
        </span>
      </div>
      <div class="ct-4">
        <span v-if="selectBox" class="dp-if">
          <input
            type="radio"
            name="searchPeriod"
            id="searchPeriodCheck"
            :value="5"
            v-model="selectType"
          />
          <label for="searchPeriodCheck">기간</label>
        </span>
        <input
          type="date"
          :max="selectBox ? today : ''"
          min="defaultDay"
          v-model="stDate"
          :disabled="stDateDisable"
        />
        <span style="align-self: center">~</span>
        <input
          type="date"
          :max="selectBox ? today : ''"
          min="defaultDay"
          v-model="edDate"
          :disabled="edDateDisable"
        />
      </div>
    </div>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      :is="ModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import { defineModel, defineProps, onBeforeMount, ref, watch } from "vue";

//팝업
const popupIsActive = ref(false);
const alertModal = ref({
  contentAlign: "start",
  overflow: "hidden",
  masking: false,
  display: "block",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span></span>",
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
//오늘
const today = ref(
  new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
);

//2024-07-01
const defaultDay = "2024-07-01";

const props = defineProps({
  // 라디오버튼박스 여부
  selectBox: {
    type: Boolean,
    default: true,
    required: false,
  },
  //통계 기간 설정 여부
  statPeriod: {
    type: Boolean,
    default: false,
    required: false,
  },
  //시작일자 선택 비활성화
  stDateDisable: {
    type: Boolean,
    default: false,
  },
  //종료일자 선택 비활성화
  edDateDisable: {
    type: Boolean,
    default: false,
    required: false,
  },
  //최대 가능 기간(일 수)
  maxDays: {
    type: Number,
    default: undefined,
    required: false,
  },
});
//시작 일자
const stDate = defineModel("startDate", {
  type: String,
  required: false,
});
//종료 일자
const edDate = defineModel("endDate", {
  type: String,
  required: false,
});
//초기화
function initCalendar() {
  stDate.value = defaultDay;
  edDate.value = today.value;
}
//오늘 선택 시
function select1() {
  stDate.value = today.value;
  edDate.value = today.value;
}
//최근 7일 선택 시
function select2() {
  const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  stDate.value = sevenDaysAgo.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  edDate.value = today.value;
}
//최근 30일 선택 시
function select3() {
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  stDate.value = thirtyDaysAgo.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  edDate.value = today.value;
}
//최근 1일 선택 시 - 통계
function select4() {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  stDate.value = yesterday.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  edDate.value = today.value;
}
//선택 타입
const selectType = ref();

watch(
  () => edDate.value,
  (newValue, oldValue) => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const oneString = yesterday.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    const sevenString = sevenDaysAgo.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const thirtyString = thirtyDaysAgo.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (oldValue != null && new Date(stDate.value) > new Date(edDate.value)) {
      edDate.value = oldValue;
      alertModal.value.bodyHtml =
        "<span>시작일보다 이전 날짜로 <br> 종료일을 설정할 수 없습니다.</span>";
      popupIsActive.value = true;
      return;
    } else if (props.statPeriod && props.maxDays != undefined) {
      const maxDaysAgo = new Date(
        new Date(newValue).setDate(new Date(newValue).getDate() - props.maxDays)
      );
      if (new Date(stDate.value) < maxDaysAgo) {
        edDate.value = oldValue;
        if (props.maxDays == 31) {
          alertModal.value.bodyHtml =
            "<span>검색 기간은 1개월을 초과할 수 없습니다.</span>";
        } else {
          alertModal.value.bodyHtml = `<span>검색 기간은 ${props.maxDays}일을 <br> 초과할 수 없습니다.</span>`;
        }
        popupIsActive.value = true;
        return;
      }
    } else if (props.selectBox) {
      if (edDate.value == today.value) {
        if (stDate.value == defaultDay) {
          selectType.value = 1;
        } else if (stDate.value == today.value && !props.statPeriod) {
          selectType.value = 2;
        } else if (stDate.value == oneString && props.statPeriod) {
          selectType.value = 6;
        } else if (stDate.value == sevenString) {
          selectType.value = 3;
        } else if (stDate.value == thirtyString) {
          selectType.value = 4;
        } else {
          selectType.value = 5;
        }
      } else if (newValue == null || newValue == "" || newValue == undefined) {
        if (!props.statPeriod) {
          selectType.value = 2;
        } else {
          selectType.value = 6;
        }
      } else {
        selectType.value = 5;
      }
    } else if (newValue == null || newValue == "" || newValue == undefined) {
      if(props.selectBox){
        edDate.value = today.value;
      }
      return;
    }
  }
);

watch(
  () => stDate.value,
  (newValue, oldValue) => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const oneString = yesterday.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    const sevenString = sevenDaysAgo.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const thirtyString = thirtyDaysAgo.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (oldValue != null && new Date(stDate.value) > new Date(edDate.value)) {
      stDate.value = oldValue;
      alertModal.value.bodyHtml =
        "<span>종료일보다 이전 날짜로 <br> 시작일을 설정할 수 없습니다.</span>";
      popupIsActive.value = true;
      return;
    } else if (props.statPeriod && props.maxDays != undefined) {
      const maxDaysAgo = new Date(
        new Date(edDate.value).setDate(
          new Date(edDate.value).getDate() - props.maxDays
        )
      );
      if (new Date(newValue) < maxDaysAgo) {
        stDate.value = oldValue;
        if (props.maxDays == 31) {
          alertModal.value.bodyHtml =
            "<span>검색 기간은 1개월을 초과할 수 없습니다.</span>";
        } else {
          alertModal.value.bodyHtml = `<span>검색 기간은 ${props.maxDays}일을 <br> 초과할 수 없습니다.</span>`;
        }
        popupIsActive.value = true;
        return;
      }
    } else if (props.selectBox) {
      if (edDate.value == today.value) {
        if (stDate.value == defaultDay) {
          selectType.value = 1;
        } else if (stDate.value == today.value && !props.statPeriod) {
          selectType.value = 2;
        } else if (stDate.value == oneString && props.statPeriod) {
          selectType.value = 6;
        } else if (stDate.value == sevenString) {
          selectType.value = 3;
        } else if (stDate.value == thirtyString) {
          selectType.value = 4;
        } else {
          selectType.value = 5;
        }
      } else if (newValue == null || newValue == "" || newValue == undefined) {
        if (!props.statPeriod) {
          selectType.value = 2;
        } else {
          selectType.value = 6;
        }
      } else {
        selectType.value = 5;
      }
    } else if (newValue == null || newValue == "" || newValue == undefined) {
      if(props.selectBox){
        stDate.value = defaultDay;
      }
      return;
    }
  }
);

watch(selectType, (v) => {
  if (props.selectBox) {
    if (v == 1) {
      //전체
      initCalendar();
    } else if (v == 2) {
      //오늘
      select1();
    } else if (v == 3) {
      //최근 7일
      select2();
    } else if (v == 4) {
      //최근 30일
      select3();
    } else if (v == 5) {
      //기간 선택 시
    } else if (v == 6) {
      //최근 1일
      select4();
    }
  }
});

onBeforeMount(() => {
  if (props.statPeriod && props.selectBox) {
    // 통계 - 초기값 : 최근 1일
    selectType.value = 6;
  } else if (props.selectBox) {
    //default - 오늘
    selectType.value = 2;
  } else {
    //기간 선택
    selectType.value = 5;
  }
});
</script>

<style scoped>
</style>
