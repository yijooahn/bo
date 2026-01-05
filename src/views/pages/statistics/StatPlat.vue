<template>
  <div class="mg-1">
    <p class="breadcrumb">통계 관리 > 서비스 이용 통계 > 플랫폼 현황</p>
    <p class="heading">플랫폼 현황</p>
    <div class="dp-f">
      <tab-comp
        :first="true"
        :active="currentTab == '접속 OS 통계'"
        title="접속 OS 통계"
        @click="tabClick('접속 OS 통계')"
      />
      <tab-comp
        :first="false"
        :active="currentTab == '플랫폼 통계'"
        title="플랫폼 통계"
        @click="tabClick('플랫폼 통계')"
      />
      <tab-comp
        :first="false"
        :active="currentTab == '브라우저 통계'"
        title="브라우저 통계"
        @click="tabClick('브라우저 통계')"
      />
    </div>
    <div v-if="currentTab == '접속 OS 통계'">
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
          <tr>
            <th><span>대상</span></th>
            <td>
              <span>
                <input type="radio" id="radioAll" name="trgt" checked />
                <label for="radioAll">전체</label>
              </span>
              <span>
                <input type="radio" id="tchr" name="trgt" />
                <label for="tchr">교사</label>
              </span>
              <span>
                <input type="radio" id="stdt" name="trgt" />
                <label for="stdt">학생</label>
              </span>
            </td>
          </tr>
          <tr>
            <th><span>범주</span></th>
            <td>
              <div>
                <span>
                  <input type="checkbox" id="checkAll" checked />
                  <label for="checkAll">전체</label>
                </span>
                <select-comp
                  :options="['과목 전체', '과목1', '과목2']"
                ></select-comp>
                <select-comp
                  :options="['학년 전체', '학년1', '학년2']"
                ></select-comp>
                <select-comp
                  :options="['교과서 전체', '교과1', '교과2']"
                ></select-comp>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span>기간</span>
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
        </tbody>
      </table>
      <div class="inq-btn"><button class="btn-1">조회</button></div>
      <img style="width: 100%" src="/images/tempChartImage2.png" />
    </div>
    <div v-if="currentTab == '플랫폼 통계'">
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
          <tr>
            <th><span>대상</span></th>
            <td>
              <span>
                <input type="radio" id="radioAll" name="trgt" checked />
                <label for="radioAll">전체</label>
              </span>
              <span>
                <input type="radio" id="tchr" name="trgt" />
                <label for="tchr">교사</label>
              </span>
              <span>
                <input type="radio" id="stdt" name="trgt" />
                <label for="stdt">학생</label>
              </span>
            </td>
          </tr>
          <tr>
            <th><span>범주</span></th>
            <td>
              <div>
                <span>
                  <input type="checkbox" id="checkAll" checked />
                  <label for="checkAll">전체</label>
                </span>
                <select-comp
                  :options="['과목 전체', '과목1', '과목2']"
                ></select-comp>
                <select-comp
                  :options="['학년 전체', '학년1', '학년2']"
                ></select-comp>
                <select-comp
                  :options="['교과서 전체', '교과1', '교과2']"
                ></select-comp>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span>기간</span>
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
        </tbody>
      </table>
      <div class="inq-btn"><button class="btn-1">조회</button></div>
      <img style="width: 100%" src="/images/tempChartImage3.png" />
    </div>
    <div v-if="currentTab == '브라우저 통계'">
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
          <tr>
            <th><span>대상</span></th>
            <td>
              <span>
                <input type="radio" id="radioAll" name="trgt" checked />
                <label for="radioAll">전체</label>
              </span>
              <span>
                <input type="radio" id="tchr" name="trgt" />
                <label for="tchr">교사</label>
              </span>
              <span>
                <input type="radio" id="stdt" name="trgt" />
                <label for="stdt">학생</label>
              </span>
            </td>
          </tr>
          <tr>
            <th><span>범주</span></th>
            <td>
              <div>
                <span>
                  <input type="checkbox" id="checkAll" checked />
                  <label for="checkAll">전체</label>
                </span>
                <select-comp
                  :options="['과목 전체', '과목1', '과목2']"
                ></select-comp>
                <select-comp
                  :options="['학년 전체', '학년1', '학년2']"
                ></select-comp>
                <select-comp
                  :options="['교과서 전체', '교과1', '교과2']"
                ></select-comp>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span>기간</span>
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
        </tbody>
      </table>
      <div class="inq-btn"><button class="btn-1">조회</button></div>
      <img style="width: 100%" src="/images/tempChartImage4.png" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CalendarComp from "@/views/components/Calendar.vue";
import SelectComp from "@/views/components/Select.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import TabComp from "@/views/components/Tab.vue";
import axios from "axios";
import { onMounted, ref, inject, watch } from "vue";
import { useRouter } from "vue-router";
const loading = inject("loadingSpinnerIsActive");
loading.value = false;
const currentTab = ref("접속 OS 통계");
const startDate = ref();
const endDate = ref();
const years = ref([]);

function tabClick(title) {
  currentTab.value = title;
  if (title != currentTab.value) {
  }
}
onMounted(() => {
  const y = new Date().getFullYear();
  years.value = [];
  for (var i = 2023; i <= y; i++) {
    years.value.push(i);
  }
});
</script>
<style scoped>
.table-1,
.table-2 {
  margin-top: 1rem;
}
.mg-1 {
  margin: 1rem;
}

.dp-f {
  display: flex;
}

.inq-btn {
  width: 100%;
  text-align: right;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-chart-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  margin: 1rem 0;
}

.stat-chart-container-2 {
  width: 100%;
  display: flex;
  margin-top: 3rem;
}

.stat-chart-container-inner {
  width: 100%;
  justify-content: space-between;
  display: flex;
}

.stat-chart-container-inner div {
  margin: 0.5rem;
  align-content: center;
}

.stat-chart-container-chart {
  width: 98%;
  margin: 0 auto;
}

.stat-graph-container {
  margin: 0.5rem 0;
}

.stat-graph-container-inner {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}

.blue-box-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  justify-items: center;
  margin: 2.5rem 0;
}

.blue-box {
  background: #eff5ff;
  border-radius: 16px;
  color: #373f57;
  box-shadow: 1px 9px 12px #00000014;
  width: 18vw;
  height: 18vw;
}

.blue-box-inner {
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  align-content: center;
}
.blue-box-inner * {
  line-height: 100%;
  vertical-align: middle;
}
.font-bold {
  font-family: SpoqaHanSansNeoBold;
  font-size: 250%;
}

.font-small {
  font-size: 55%;
  margin-left: 0.3rem;
}

.people-icon {
  width: 30px;
  margin: 0.3rem;
}
</style>