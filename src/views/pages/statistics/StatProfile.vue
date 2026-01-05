<template>
  <div class="mg-1">
    <p class="breadcrumb">통계 관리 > 서비스 이용 통계 > 프로필</p>
    <p class="heading">프로필</p>
    <div class="dp-f">
      <tab-comp
        :first="true"
        :active="currentTab == '이미지 이용률'"
        title="이미지 이용률"
        @click="tabClick('이미지 이용률')"
      />
      <tab-comp
        :first="false"
        :active="currentTab == '이미지별 이용률'"
        title="이미지별 이용률"
        @click="tabClick('이미지별 이용률')"
      />
    </div>
    <div v-if="currentTab == '이미지 이용률'">
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>프로필 이미지 이용 현황</label>
        </div>
      </div>
      <div class="blue-box-container">
        <div class="blue-box">
          <div class="blue-box-inner">
            <h2>
              <img src="/images/filecheck.svg" class="people-icon" />아바타 설정
              완료
            </h2>
            <h1 class="font-bold">10,000<span class="font-small">명</span></h1>
          </div>
        </div>
        <div class="blue-box">
          <div class="blue-box-inner">
            <h2>
              <img src="/images/chart.svg" class="people-icon" />아바타 총 설정
              횟수
            </h2>
            <h1 class="font-bold">87<span class="font-small">회</span></h1>
          </div>
        </div>
        <div class="blue-box">
          <div class="blue-box-inner">
            <h2>
              <img src="/images/pie.svg" class="people-icon" />아바타 설정 비율
            </h2>
            <h1 class="font-bold">60<span class="font-small">%</span></h1>
          </div>
        </div>
      </div>
      <div class="blue-box-container" style="grid-template-columns: 1fr 1fr">
        <div class="blue-box-rect">
          <div class="blue-box-inner">
            <h2>
              <img src="/images/filecheck.svg" class="people-icon" />유니크
              이용자
            </h2>
            <h1 class="font-bold">60<span class="font-small">%</span></h1>
          </div>
        </div>
        <div class="blue-box-rect">
          <div class="blue-box-inner">
            <h2>
              <img src="/images/pie.svg" class="people-icon" />유니크 이용자
            </h2>
            <h2>평균 프로필 설정 횟수</h2>
            <h1 class="font-bold">400<span class="font-small">회</span></h1>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentTab == '이미지별 이용률'">
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>프로필 이미지별 이용 현황</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>No.</span></th>
              <th><span>아바타 이미지 고유 번호</span></th>
              <th><span>저장한 학생 수</span></th>
              <th><span>비율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td>
                <span>{{ 10 - idx }}</span>
              </td>
              <td><span>1</span></td>
              <td><span>1,000</span></td>
              <td><span>33%</span></td>
            </tr>
            <!--
                            <tr v-else>
                                <td colspan="7">조회된 결과가 없습니다.</td>
                            </tr>
                            -->
          </tbody>
        </table>
        <div class="ct-22">
          <!-- <component @on-change-handler="inquiry()" :is="pagination" v-model:pageable="pageable"></component>-->
          <component v-model:pageable="pageable" :is="pagination"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import TabComp from "@/views/components/Tab.vue";
import { inject, onMounted, ref } from "vue";
const loading = inject("loadingSpinnerIsActive");
loading.value = false;
const currentTab = ref("이미지 이용률");
const startDate = ref();
const endDate = ref();
const years = ref([]);
const pageable = ref({});

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
.blue-box-rect {
  background: #eff5ff;
  border-radius: 16px;
  color: #373f57;
  box-shadow: 1px 9px 12px #00000014;
  width: 25vw;
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