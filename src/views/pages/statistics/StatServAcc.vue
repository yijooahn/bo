<template>
  <div class="mg-1">
    <p class="breadcrumb">통계 관리 > 서비스 이용 현황</p>
    <p class="heading">서비스 이용 현황</p>
    <div class="dp-f">
      <tab-comp
        :first="true"
        :active="currentTab == tab1"
        :title="tab1"
        @click="currentTab = tab1"
      />
      <tab-comp
        :first="false"
        :active="currentTab == tab2"
        :title="tab2"
        @click="currentTab = tab2"
      />
      <tab-comp
        :first="false"
        :active="currentTab == tab3"
        :title="tab3"
        @click="currentTab = tab3"
      />
      <tab-comp
        :first="false"
        :active="currentTab == tab4"
        :title="tab4"
        @click="currentTab = tab4"
      />
      <tab-comp
        :first="false"
        :active="currentTab == tab5"
        :title="tab5"
        @click="currentTab = tab5"
      />
    </div>
    <div>
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
          <tr v-if="currentTab == tab1">
            <th><span>대상</span></th>
            <td>
              <span @click="reload = true">
                <input
                  type="radio"
                  id="tchr"
                  name="actorType"
                  :value="actorType1"
                  v-model="actorType"
                  checked
                />
                <label for="tchr">교사</label>
              </span>
              <span @click="reload = true">
                <input
                  type="radio"
                  id="stdt"
                  name="actorType"
                  :value="actorType2"
                  v-model="actorType"
                />
                <label for="stdt">학생</label>
              </span>
            </td>
          </tr>
          <tr>
            <th><span>범주</span></th>
            <td>
              <div>
                <span
                  :style="
                    selectAll ? 'pointer-events:none;' : 'pointer-events:unset;'
                  "
                >
                  <input
                    type="checkbox"
                    id="checkAll"
                    v-model="selectAll"
                    @click="reload = true"
                  />
                  <label for="checkAll">전체</label>
                </span>
                <select-comp
                  :isString="false"
                  :options="subjectList"
                  v-model:selectedObj="selectedSubject"
                ></select-comp>
                <select-comp
                  :isString="false"
                  :options="gradeList"
                  v-model:selectedObj="selectedGrade"
                ></select-comp>
                <select-comp
                  :isString="false"
                  :options="textBookList"
                  v-model:selectedObj="selectedTextbook"
                ></select-comp>
              </div>
            </td>
          </tr>
          <tr v-if="currentTab != tab1">
            <th>
              <span>기간</span>
            </th>
            <td>
              <div>
                <calendar-comp
                  @click="reload = true"
                  v-model:startDate="startDate"
                  v-model:endDate="endDate"
                  :statPeriod="true"
                  :selectBox="true"
                ></calendar-comp>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="inq-btn">
        <button class="btn-1" @click="inquiry('inquiry')">조회</button>
      </div>
      <div v-if="currentTab == tab1">
        <div class="stat-chart-container">
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label>월별 로그인 현황</label>
            </div>
            <div>
              <select-comp
                :options="years"
                v-model:selected="monthlyLoginSearchYear"
              ></select-comp>
            </div>
          </div>
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label>일별 로그인 현황</label>
            </div>
            <div>
              <calendar-comp
                @click="reload = true"
                v-model:startDate="dateStartDate"
                v-model:endDate="dateEndDate"
                :maxDays="dateMaxPeriodDay"
                :statPeriod="true"
                :selectBox="false"
              ></calendar-comp>
            </div>
          </div>
          <div class="stat-chart-container-chart">
            <table class="table-2 t-c">
              <colgroup>
                <col width="6%" />
                <col width="24%" />
                <col width="14%" />
                <col width="9%" />
                <col width="24%" />
                <col width="14%" />
                <col width="9%" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    v-for="(thd, idx) in Object.entries(monthSearchResultHead)"
                    :key="idx"
                  >
                    <span>{{ thd[1] }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="monthSearchResults?.length > 0"
                  v-for="(sr, idx) in monthSearchResults"
                  :key="idx"
                  :class="{ entire: idx == 0 }"
                >
                  <td
                    v-for="(thd, index) in Object.entries(
                      monthSearchResultHead
                    )"
                    :key="index"
                  >
                    {{ sr[thd[0]] }}
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="7">조회된 결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            :class="dateSearchResults?.length > 12 ? 'max-height-fix' : ''"
            class="stat-chart-container-chart "
          >
            <table class="table-2 t-c">
              <colgroup>
                <col width="10%" />
                <col width="45%" />
                <col width="45%" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    v-for="(thd, idx) in Object.entries(dateSearchResultHead)"
                    :key="idx"
                  >
                    <span>{{ thd[1] }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="dateSearchResults?.length > 0"
                  v-for="(sr, idx) in dateSearchResults"
                  :key="idx"
                  :class="{ entire: idx == 0 }"
                >
                  <td
                    v-for="(thd, index) in Object.entries(dateSearchResultHead)"
                    :key="index"
                  >
                    {{ sr[thd[0]] }}
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="3">조회된 결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="stat-chart-container-3">
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label>요일별 로그인 현황</label>
            </div>
            <div>
              <calendar-comp
                @click="reload = true"
                v-model:startDate="dayStartDate"
                v-model:endDate="dayEndDate"
                :maxDays="maxPeriodDay"
                :statPeriod="true"
                :selectBox="false"
              ></calendar-comp>
            </div>
          </div>
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label>시간대별 로그인 현황</label>
            </div>
            <div>
              <calendar-comp
                @click="reload = true"
                v-model:startDate="hourStartDate"
                v-model:endDate="hourEndDate"
                :maxDays="maxPeriodDay"
                :statPeriod="true"
                :selectBox="false"
              ></calendar-comp>
            </div>
          </div>
          <div
            class="stat-chart-container-chart max-height-fix "
          >
            <table class="table-2 t-c">
              <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    v-for="(thd, idx) in Object.entries(daySearchResultHead)"
                    :key="idx"
                  >
                    <span>{{ thd[1] }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="daySearchResults?.length > 0"
                  v-for="(sr, idx) in daySearchResults"
                  :key="idx"
                  :class="{ entire: idx == 0 }"
                >
                  <td
                    v-for="(thd, index) in Object.entries(daySearchResultHead)"
                    :key="index"
                  >
                    {{ sr[thd[0]] }}
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="3">조회된 결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="stat-chart-container-chart max-height-fix "
          >
            <table class="table-2 t-c">
              <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    v-for="(thd, idx) in Object.entries(hourSearchResultHead)"
                    :key="idx"
                  >
                    <span>{{ thd[1] }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="hourSearchResults?.length > 0"
                  v-for="(sr, idx) in hourSearchResults"
                  :key="idx"
                  :class="{ entire: idx == 0 }"
                >
                  <td
                    v-for="(thd, index) in Object.entries(hourSearchResultHead)"
                    :key="index"
                  >
                    {{ sr[thd[0]] }}
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="3">조회된 결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-else-if="currentTab == tab2 || currentTab == tab3">
        <div>
          <div class="tit"></div>
          <label
            >서비스 이용
            {{ currentTab == tab2 ? " 학교 " : " 학급 " }} 현황</label
          >
        </div>
        <div class="blue-box-container">
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/school.svg" class="people-icon" />사용자 1회
                이상
              </h2>
              <h2>
                로그인 {{ currentTab == tab2 ? " 학교 " : " 학급 " }} 수(유니크)
              </h2>
              <h1 class="font-bold">
                {{
                  (uniqSchlClasCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (uniqSchlClasCnt * 1).toLocaleString()
                }}<span class="font-small">개</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/teacher.svg" class="people-icon" />{{
                  currentTab == tab2 ? " 학교 " : " 학급 "
                }}
                당 평균
              </h2>
              <h2>로그인 계정 수(교사)</h2>
              <h1 class="font-bold">
                {{
                  (avgTchrSchlClasCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (avgTchrSchlClasCnt * 1).toLocaleString()
                }}<span class="font-small">명</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/student.svg" class="people-icon" />{{
                  currentTab == tab2 ? " 학교 " : " 학급 "
                }}
                당 평균
              </h2>
              <h2>로그인 계정 수(학생)</h2>
              <h1 class="font-bold">
                {{
                  (avgStdntSchlClasCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (avgStdntSchlClasCnt * 1).toLocaleString()
                }}<span class="font-small">명</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="stat-chart-container-2">
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label
                >월별 로그인
                {{ currentTab == tab2 ? " 학교 " : " 학급 " }} 수</label
              >
            </div>
            <div>
              <select-comp
                :options="years"
                v-model:selected="monthlySchlClasSearchYear"
              ></select-comp>
            </div>
          </div>
        </div>
        <div class="stat-chart-container-chart">
          <table class="table-2 t-c">
            <colgroup>
              <col width="4%" />
              <col width="32%" />
              <col width="32%" />
              <col width="32%" />
            </colgroup>
            <thead>
              <tr>
                <th
                  v-for="(thd, idx) in Object.entries(
                    monthlySchlClasSearchResultHead
                  )"
                  :key="idx"
                >
                  <span>{{ thd[1] }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="monthlySchlClasSearchResults?.length > 0"
                v-for="(sr, idx) in monthlySchlClasSearchResults"
                :key="idx"
                :class="{ entire: idx == 0 }"
              >
                <td
                  v-for="(thd, index) in Object.entries(
                    monthlySchlClasSearchResultHead
                  )"
                  :key="index"
                >
                  {{ sr[thd[0]] }}
                </td>
              </tr>
              <tr v-else>
                <td colspan="4">조회된 결과가 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="stat-chart-container-2">
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label
                >월별 로그인 계정 수({{
                  currentTab == tab2 ? "학교" : "학급"
                }}/교사)</label
              >
            </div>
            <div>
              <select-comp
                :options="years"
                v-model:selected="monthlyTchrSearchYear"
              ></select-comp>
            </div>
          </div>
        </div>
        <div class="stat-chart-container-chart">
          <table class="table-2 t-c">
            <colgroup>
              <col width="4%" />
              <col width="32%" />
              <col width="32%" />
              <col width="32%" />
            </colgroup>
            <thead>
              <th
                v-for="(thd, idx) in Object.entries(
                  monthlySchlClasSearchResultHead
                )"
                :key="idx"
              >
                <span>{{ thd[1] }}</span>
              </th>
            </thead>
            <tbody>
              <tr
                v-if="monthlyTchrSearchResults?.length > 0"
                v-for="(sr, idx) in monthlyTchrSearchResults"
                :key="idx"
                :class="{ entire: idx == 0 }"
              >
                <td
                  v-for="(thd, index) in Object.entries(
                    monthlySchlClasSearchResultHead
                  )"
                  :key="index"
                >
                  {{ sr[thd[0]] }}
                </td>
              </tr>
              <tr v-else>
                <td colspan="4">조회된 결과가 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="stat-chart-container-2">
          <div class="stat-chart-container-inner">
            <div>
              <div class="tit"></div>
              <label
                >월별 로그인 계정 수({{
                  currentTab == tab2 ? "학교" : "학급"
                }}/학생)</label
              >
            </div>
            <div>
              <select-comp
                :options="years"
                v-model:selected="monthlyStdntSearchYear"
              ></select-comp>
            </div>
          </div>
        </div>
        <div class="stat-chart-container-chart">
          <table class="table-2 t-c">
            <colgroup>
              <col width="4%" />
              <col width="32%" />
              <col width="32%" />
              <col width="32%" />
            </colgroup>
            <thead>
              <tr>
                <th
                  v-for="(thd, idx) in Object.entries(
                    monthlySchlClasSearchResultHead
                  )"
                  :key="idx"
                >
                  <span>{{ thd[1] }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="monthlyStdntSearchResults?.length > 0"
                v-for="(sr, idx) in monthlyStdntSearchResults"
                :key="idx"
                :class="{ entire: idx == 0 }"
              >
                <td
                  v-for="(thd, index) in Object.entries(
                    monthlySchlClasSearchResultHead
                  )"
                  :key="index"
                >
                  {{ sr[thd[0]] }}
                </td>
              </tr>
              <tr v-else>
                <td colspan="4">조회된 결과가 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="currentTab == tab4 || currentTab == tab5">
        <div>
          <div class="tit"></div>
          <label
            >서비스 이용 {{ currentTab == tab4 ? "교사" : "학생" }} 수</label
          >
        </div>
        <div class="blue-box-container">
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/total.svg" class="people-icon" />
                {{ currentTab == tab4 ? "교사" : "학생" }} 계정 로그인 수
              </h2>
              <h2>(총 로그인 수)</h2>
              <h1 class="font-bold">
                {{
                  (totalLoginCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (totalLoginCnt * 1).toLocaleString()
                }}<span class="font-small">회</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/people.svg" class="people-icon" />로그인 1회
                이상
              </h2>
              <h2>
                {{ currentTab == tab4 ? "교사" : "학생" }} 계정 수(유니크)
              </h2>
              <h1 class="font-bold">
                {{
                  (uniqLoginCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (uniqLoginCnt * 1).toLocaleString()
                }}<span class="font-small">명</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/average.svg" class="people-icon" />{{
                  currentTab == tab4 ? "교사" : "학생"
                }}
                1인당
              </h2>
              <h2>평균 로그인 수</h2>
              <h1 class="font-bold">
                {{
                  (avgLoginCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (avgLoginCnt * 1).toLocaleString()
                }}<span class="font-small">회</span>
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div class="tit"></div>
          <label>서비스 이용 페이지 뷰</label>
        </div>
        <div class="blue-box-container">
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/total.svg" class="people-icon" />페이지 뷰
              </h2>
              <h2>(전체)</h2>
              <h1 class="font-bold">
                {{
                  (totalPageViewCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (totalPageViewCnt * 1).toLocaleString()
                }}<span class="font-small">회</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/people.svg" class="people-icon" />페이지 뷰
                총합
              </h2>
              <h2>(유니크)</h2>
              <h1 class="font-bold">
                {{
                  (uniqPageViewCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (uniqPageViewCnt * 1).toLocaleString()
                }}<span class="font-small">회</span>
              </h1>
            </div>
          </div>
          <div class="blue-box">
            <div class="blue-box-inner">
              <h2>
                <img src="/images/average.svg" class="people-icon" />평균 페이지
                뷰 총합
              </h2>
              <h1 class="font-bold">
                {{
                  (avgPageViewCnt * 1).toLocaleString() == "NaN"
                    ? " - "
                    : (avgPageViewCnt * 1).toLocaleString()
                }}<span class="font-small">회</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="stat-chart-container-inner">
          <div>
            <div class="tit"></div>
            <label
              >페이지뷰(유니크) {{ currentTab == tab4 ? "교사" : "학생" }} 이용
              현황</label
            >
          </div>
        </div>
        <div class="stat-chart-container-chart">
          <component
            :is="pagination"
            v-model:pageable="pageable"
            :isPageSize="true"
          ></component>
          <table class="table-2 t-c">
            <colgroup>
              <col width="20%" />
              <col width="55%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th><span>No.</span></th>
                <th
                  v-for="(thd, idx) in Object.entries(pageViewUserHead)"
                  :key="idx"
                >
                  <span>{{ thd[1] }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="pageViewUserList?.length > 0"
                v-for="(sr, idx) in pageViewUserList"
                :key="idx"
              >
                <td>
                  <span>{{
                    pageable.totalElements - pageable.offset - idx
                  }}</span>
                </td>
                <td
                  v-for="(thd, index) in Object.entries(pageViewUserHead)"
                  :key="index"
                >
                  {{ sr[thd[0]] }}
                </td>
              </tr>
              <tr v-else>
                <td colspan="3">조회된 결과가 없습니다.</td>
              </tr>
            </tbody>
          </table>
          <div class="ct-22">
            <component
              @on-change-handler="inquiry('inquiry')"
              v-model:pageable="pageable"
              :is="pagination"
            ></component>
          </div>
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
import axios from "axios";
import { onMounted, ref, watch } from "vue";

/**
 *
 * 통계 관리
 * constant values
 * 2024-09-02
 * 이주안
 *
 **/

//오늘
const today = new Date().toLocaleDateString("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

//최근 1일
const yesterday = new Date(
  new Date().setDate(new Date().getDate() - 1)
).toLocaleDateString("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

//당해 년도
const thisYear = new Date().getFullYear().toString();

//reload
const reload = ref(true);

//탭
const tab1 = "로그인 현황";
const tab2 = "학교별 현황";
const tab3 = "학급별 현황";
const tab4 = "교사 이용 현황";
const tab5 = "학생 이용 현황";

// 대상
// T : 교사
const actorType1 = "T";
// S : 학생
const actorType2 = "S";

//검색 시작 최초 연도
const yearStartYear = 2024;

//과목 / 학년 / 교과서 선택
const selectAllOption1 = {
  id: "",
  name: "과목 전체",
};
const selectAllOption2 = {
  id: "",
  name: "학년 전체",
};
const selectAllOption3 = {
  id: "",
  name: "교과서 전체",
};

//일별 검색 가능 최대 기간(일수)
const dateMaxPeriodDay = 31;

//요일별/시간대별 검색 가능 최대 기간(일수)
const maxPeriodDay = 90;

/*********************************************************************/

//선택 과목
const selectedSubject = ref(selectAllOption1);
//선택 학년
const selectedGrade = ref(selectAllOption2);
//선택 교과서
const selectedTextbook = ref(selectAllOption3);

//과목 목록
const subjectList = ref([]);
//학년 목록
const gradeList = ref([]);
//교과서 목록
const textBookList = ref([]);

//교과서 목록 호출
const loadTextbookList = async () => {
  if (reload) {
    textBookList.value = [];
    textBookList.value.push(selectAllOption3);
    try {
      var param = {
        sbjctId: selectedSubject.value.id,
        grdId: selectedGrade.value.id,
      };
      if (selectAll.value) {
        param.sbjctId = "";
        param.grdId = "";
      }
      const response = await axios.post("/statistic/comBkKnd", param);
      response?.data?.comCdBkKnd.forEach((el) => {
        var obj = {
          id: el.kndId,
          name: el.kndNm,
        };
        textBookList.value.push(obj);
      });
    } catch (err) {
    } finally {
      selectedTextbook.value = selectAllOption3;
    }
  }
};

//범주 목록 조회
const loadSearchConditionList = async () => {
  subjectList.value = [];
  subjectList.value.push(selectAllOption1);

  gradeList.value = [];
  gradeList.value.push(selectAllOption2);

  try {
    const response = await axios.post("/statistic/comSbjct");
    response?.data?.comCdSbjct.forEach((el) => {
      var obj = {
        id: el.sbjctId,
        name: el.sbjctNm,
      };
      subjectList.value.push(obj);
    });
    reload.value = false;
    selectedSubject.value = selectAllOption1;

    try {
      const response = await axios.post("/statistic/comGrd");
      response?.data?.comCdGrd.forEach((el) => {
        var obj = {
          id: el.grdId,
          name: el.grdNm,
        };
        gradeList.value.push(obj);
      });
      reload.value = true;
      selectedGrade.value = selectAllOption2;
    } catch (err) {}
  } catch (err) {}
};

//선택 탭
const currentTab = ref(tab1);

//전체 체크 박스
const selectAll = ref(false);

watch(
  selectedSubject,
  async (n, o) => {
    if (n != o) {
      if (
        n?.name == selectAllOption1?.name &&
        selectedGrade.value?.name == selectAllOption2?.name &&
        selectedTextbook.value?.name == selectAllOption3?.name
      ) {
        reload.value = false;
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
      if (reload) {
        await loadTextbookList();
        await inquiry("inquiry");
        if (currentTab.value == tab2) {
          await inquiry("monSchoolInquiry");
          await inquiry("monSchoolTInquiry");
          await inquiry("monSchoolSInquiry");
        } else if (currentTab.value == tab3) {
          await inquiry("monClassInquiry");
          await inquiry("monClassTInquiry");
          await inquiry("monClassSInquiry");
        }
      }
    }
  },
  { deep: true }
);

watch(
  selectedGrade,
  async (n, o) => {
    if (n != o) {
      if (
        selectedSubject.value?.name == selectAllOption1?.name &&
        n?.name == selectAllOption2?.name &&
        selectedTextbook.value?.name == selectAllOption3?.name
      ) {
        reload.value = false;
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
      if (reload) {
        await loadTextbookList();
        await inquiry("inquiry");
        if (currentTab.value == tab2) {
          await inquiry("monSchoolInquiry");
          await inquiry("monSchoolTInquiry");
          await inquiry("monSchoolSInquiry");
        } else if (currentTab.value == tab3) {
          await inquiry("monClassInquiry");
          await inquiry("monClassTInquiry");
          await inquiry("monClassSInquiry");
        }
      }
    }
  },
  { deep: true }
);

watch(
  selectedTextbook,
  async (n, o) => {
    if (n != o) {
      if (
        selectedSubject.value?.name == selectAllOption1?.name &&
        selectedGrade.value?.name == selectAllOption2?.name &&
        n?.name == selectAllOption3?.name
      ) {
        reload.value = false;
        selectAll.value = true;
      } else {
        selectAll.value = false;
      }
      if (reload) {
        await inquiry("inquiry");
        if (currentTab.value == tab2) {
          await inquiry("monSchoolInquiry");
          await inquiry("monSchoolTInquiry");
          await inquiry("monSchoolSInquiry");
        } else if (currentTab.value == tab3) {
          await inquiry("monClassInquiry");
          await inquiry("monClassTInquiry");
          await inquiry("monClassSInquiry");
        }
      }
    }
  },
  { deep: true }
);

watch(selectAll, (n, o) => {
  if (n) {
    reload.value = false;
    selectedSubject.value = selectAllOption1;
    reload.value = true;
    selectedGrade.value = selectAllOption2;
    selectedTextbook.value = selectAllOption3;
  } else {
  }
});
//대상
//default : 교사
const actorType = ref(actorType1);

//조회
//검색 시작일자
const startDate = ref(yesterday);
//검색 종료일자
const endDate = ref(today);

/**
 *
 * 월별 로그인 현황
 *
 *  */

//역대 년도 목록
const years = ref([]);

//검색 연도
const monthlyLoginSearchYear = ref(thisYear);

//일별 검색 시작 일자
const dateStartDate = ref(
  new Date(new Date().setDate(new Date().getDate() - 11)).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  )
);
//일별 검색 종료 일자
const dateEndDate = ref(today);

//요일별 검색 시작 일자
const dayStartDate = ref(
  new Date(new Date().setDate(new Date().getDate() - 8)).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  )
);
//요일별 검색 종료 일자
const dayEndDate = ref(
  new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  )
);

//시간대별 검색 시작 일자
const hourStartDate = ref(
  new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  )
);
//시간대별 검색 종료 일자
const hourEndDate = ref(
  new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  )
);

//월별 검색 결과 리스트

const monthSearchResults = ref([]);

//construct
function monthSearchResult(
  gubun,
  totalCnt,
  totIncr,
  totIncrPrcnt,
  uniqCnt,
  uniqIncr,
  uniqPrcnt,
  isHead = false
) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.totalCnt =
      (totalCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (totalCnt * 1).toLocaleString();
    this.totIncr =
      (totIncr * 1).toLocaleString() == "NaN"
        ? "-"
        : (totIncr * 1).toLocaleString();
    this.totIncrPrcnt = totIncrPrcnt;
    this.uniqCnt =
      (uniqCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (uniqCnt * 1).toLocaleString();
    this.uniqIncr =
      (uniqIncr * 1).toLocaleString() == "NaN"
        ? "-"
        : (uniqIncr * 1).toLocaleString();
    this.uniqPrcnt = uniqPrcnt;
  } else {
    this.gubun = gubun;
    this.totalCnt = totalCnt;
    this.totIncr = totIncr;
    this.totIncrPrcnt = totIncrPrcnt;
    this.uniqCnt = uniqCnt;
    this.uniqIncr = uniqIncr;
    this.uniqPrcnt = uniqPrcnt;
  }
}

//convert
function applyMonthSearchResults(result) {
  monthSearchResults.value = [];
  result.forEach((el) => {
    const obj = new monthSearchResult(
      el.month,
      el.thisYearTotCnt,
      el.totIncrease,
      el.totRate,
      el.thisYearUniCnt,
      el.uniIncrease,
      el.uniRate
    );
    monthSearchResults.value.push(obj);
  });
}

//thead
const monthSearchResultHead = new monthSearchResult(
  "구분",
  "총 로그인 수",
  "증감",
  "증감률",
  "유니크 로그인 수",
  "증감",
  "증감률",
  true
);

//일별 검색 결과 리스트

//dayLoginList
const dateSearchResults = ref([]);

//construct
function dateSearchResult(gubun, totalCnt, uniqCnt, isHead = false) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.totalCnt =
      (totalCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (totalCnt * 1).toLocaleString();
    this.uniqCnt =
      (uniqCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (uniqCnt * 1).toLocaleString();
  } else {
    this.gubun = gubun;
    this.totalCnt = totalCnt;
    this.uniqCnt = uniqCnt;
  }
}

//convert
function applyDateSearchResults(result) {
  dateSearchResults.value = [];
  result.forEach((el) => {
    const obj = new dateSearchResult(el.dayMonth, el.dayTotCnt, el.dayUniCnt);
    dateSearchResults.value.push(obj);
  });
}

//thead
const dateSearchResultHead = new dateSearchResult(
  "구분",
  "총 로그인 수",
  "유니크 로그인 수",
  true
);

//요일별 검색 결과 리스트
const daySearchResults = ref([]);

//construct
function daySearchResult(gubun, avgTotCnt, avgUniqCnt, isHead = false) {
  if (!isHead) {
    this.gubun = gubun;
    this.avgTotCnt =
      (avgTotCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (avgTotCnt * 1).toLocaleString();
    this.avgUniqCnt =
      (avgUniqCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (avgUniqCnt * 1).toLocaleString();
  } else {
    this.gubun = gubun;
    this.avgTotCnt = avgTotCnt;
    this.avgUniqCnt = avgUniqCnt;
  }
}

//convert
function applyDaySearchResults(result) {
  daySearchResults.value = [];
  result.forEach((el) => {
    const obj = new daySearchResult(el.dayOfWeek, el.weekTotCnt, el.weekUniCnt);
    daySearchResults.value.push(obj);
  });
}

//thead
const daySearchResultHead = new daySearchResult(
  "구분",
  "평균 로그인 수",
  "평균 유니크 로그인 수",
  true
);

//시간대별 검색 결과 리스트
const hourSearchResults = ref([]);

//construct
function hourSearchResult(gubun, avgTotCnt, avgUniqCnt, isHead = false) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.avgTotCnt =
      (avgTotCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (avgTotCnt * 1).toLocaleString();
    this.avgUniqCnt =
      (avgUniqCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (avgUniqCnt * 1).toLocaleString();
  } else {
    this.gubun = gubun;
    this.avgTotCnt = avgTotCnt;
    this.avgUniqCnt = avgUniqCnt;
  }
}

//convert
function applyHourSearchResults(result) {
  hourSearchResults.value = [];
  result.forEach((el) => {
    const obj = new hourSearchResult(el.time, el.timeTotCnt, el.timeUniCnt);
    hourSearchResults.value.push(obj);
  });
}

//thead
const hourSearchResultHead = new hourSearchResult(
  "구분",
  "평균 로그인 수",
  "평균 유니크 로그인 수",
  true
);

/**
 *
 * 학교별 현황
 * 학급별 현황
 *
 * */

//서비스 이용 학교/학급 현황

//유니크 학교/학급 수
const uniqSchlClasCnt = ref();

//학교/학급당 평균 교사 수
const avgTchrSchlClasCnt = ref();

//학교/학급당 평균 학생 수
const avgStdntSchlClasCnt = ref();

//월별 학교/학급 수

//검색 연도
//year
const monthlySchlClasSearchYear = ref(thisYear);

const monthlySchlClasSearchResults = ref([]);

//construct
function monthlySchlClasSearchResult(
  gubun,
  totCnt,
  incr,
  incrPrcnt,
  isHead = false
) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.totCnt =
      (totCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (totCnt * 1).toLocaleString();
    this.incr =
      (incr * 1).toLocaleString() == "NaN" ? "-" : (incr * 1).toLocaleString();
    this.incrPrcnt = incrPrcnt;
  } else {
    this.gubun = gubun;
    this.totCnt = totCnt;
    this.incr = incr;
    this.incrPrcnt = incrPrcnt;
  }
}

//convert
function applyMonthlySchlClasSearchResults(result) {
  monthlySchlClasSearchResults.value = [];
  result.forEach((el) => {
    const obj = new monthlySchlClasSearchResult(
      el.month,
      currentTab.value == tab2 ? el.thisYearSchlCnt : el.thisYearClassCnt,
      el.totIncrease,
      el.totRate
    );
    monthlySchlClasSearchResults.value.push(obj);
  });
}

//thead
const monthlySchlClasSearchResultHead = new monthlySchlClasSearchResult(
  "구분",
  "로그인 수",
  "증감",
  "증감률",
  true
);

//월별 학교/학급당 교사 수

//검색 연도
//yearT
const monthlyTchrSearchYear = ref(thisYear);

const monthlyTchrSearchResults = ref([]);

//construct
function monthlyTchrSearchResult(
  gubun,
  totCnt,
  incr,
  incrPrcnt,
  isHead = false
) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.totCnt =
      (totCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (totCnt * 1).toLocaleString();
    this.incr =
      (incr * 1).toLocaleString() == "NaN" ? "-" : (incr * 1).toLocaleString();
    this.incrPrcnt = incrPrcnt;
  } else {
    this.gubun = gubun;
    this.totCnt = totCnt;
    this.incr = incr;
    this.incrPrcnt = incrPrcnt;
  }
}

//convert
function applyMonthlyTchrSearchResults(result) {
  monthlyTchrSearchResults.value = [];
  result.forEach((el) => {
    const obj = new monthlyTchrSearchResult(
      el.month,
      currentTab.value == tab2 ? el.thisYearSchlCnt : el.thisYearClassCnt,
      el.totIncrease,
      el.totRate
    );
    monthlyTchrSearchResults.value.push(obj);
  });
}

//월별 학교/학급당 학생 수

//검색 연도
//yearS
const monthlyStdntSearchYear = ref(thisYear);

const monthlyStdntSearchResults = ref([]);

//construct
function monthlyStdntSearchResult(
  gubun,
  totCnt,
  incr,
  incrPrcnt,
  isHead = false
) {
  if (!isHead) {
    this.gubun = gubun.replace(/^0+/, "");
    this.totCnt =
      (totCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (totCnt * 1).toLocaleString();
    this.incr =
      (incr * 1).toLocaleString() == "NaN" ? "-" : (incr * 1).toLocaleString();
    this.incrPrcnt = incrPrcnt;
  } else {
    this.gubun = gubun;
    this.totCnt = totCnt;
    this.incr = incr;
    this.incrPrcnt = incrPrcnt;
  }
}

//convert
function applyMonthlyStdntSearchResults(result) {
  monthlyStdntSearchResults.value = [];
  result.forEach((el) => {
    const obj = new monthlyStdntSearchResult(
      el.month,
      currentTab.value == tab2 ? el.thisYearSchlCnt : el.thisYearClassCnt,
      el.totIncrease,
      el.totRate
    );
    monthlyStdntSearchResults.value.push(obj);
  });
}

/**
 *
 * 교사 이용 현황
 * 학생 이용 현황
 *
 * */

//서비스 이용 교사/학생 수
//총 로그인 수
const totalLoginCnt = ref();
//로그인 1회 이상 유니크 계정 수
const uniqLoginCnt = ref();
//평균 로그인 수
const avgLoginCnt = ref();

//서비스 이용 페이지 뷰
//전체 총합
const totalPageViewCnt = ref();
//유니크 총합
const uniqPageViewCnt = ref();
//평균
const avgPageViewCnt = ref();

//페이지뷰 이용 현황
const pageViewUserList = ref([]);

//construct
function pageViewUser(pageUrl, uniqCnt, isHead = false) {
  if (!isHead) {
    this.pageUrl = pageUrl;
    this.uniqCnt =
      (uniqCnt * 1).toLocaleString() == "NaN"
        ? "-"
        : (uniqCnt * 1).toLocaleString();
  } else {
    this.pageUrl = pageUrl;
    this.uniqCnt = uniqCnt;
  }
}

//conver
function applyPageViewUserList(result) {
  pageViewUserList.value = [];
  result.forEach((el) => {
    const obj = new pageViewUser(el.conUrl, el.uniCnt);
    pageViewUserList.value.push(obj);
  });
}

//thead
const pageViewTchrHead = new pageViewUser(
  "페이지 URL",
  "유니크 방문 교사 수",
  true
);
const pageViewStdntHead = new pageViewUser(
  "페이지 URL",
  "유니크 방문 학생 수",
  true
);
const pageViewUserHead = ref(
  currentTab.value == tab4 ? pageViewTchrHead : pageViewStdntHead
);

//페이지네이션
const pageable = ref({});

// request APIs
const inquiry = async (sub) => {
  if (currentTab.value == tab1) {
    var param = {};
    if (sub == "inquiry") {
      param = {
        year: monthlyLoginSearchYear.value,
        dayStartYmd: dateStartDate.value,
        dayEndYmd: dateEndDate.value,
        weekStartYmd: dayStartDate.value,
        weekEndYmd: dayEndDate.value,
        timeStartYmd: hourStartDate.value,
        timeEndYmd: hourEndDate.value,
        actorType: actorType.value,
        crsId: selectedTextbook.value.id,
      };
    } else if (sub == "monthInquiry") {
      param = {
        year: monthlyLoginSearchYear.value,
        actorType: actorType.value,
        crsId: selectedTextbook.value.id,
      };
    } else if (sub == "dayInquiry") {
      param = {
        dayStartYmd: dateStartDate.value,
        dayEndYmd: dateEndDate.value,
        actorType: actorType.value,
        crsId: selectedTextbook.value.id,
      };
    } else if (sub == "weekInquiry") {
      param = {
        weekStartYmd: dayStartDate.value,
        weekEndYmd: dayEndDate.value,
        actorType: actorType.value,
        crsId: selectedTextbook.value.id,
      };
    } else if (sub == "timeInquiry") {
      param = {
        timeStartYmd: hourStartDate.value,
        timeEndYmd: hourEndDate.value,
        actorType: actorType.value,
        crsId: selectedTextbook.value.id,
      };
    }
    try {
      const response = await axios.post(`/statistic/${sub}`, param);
      if (sub == "inquiry") {
        var result = response?.data?.monLoginList;
        applyMonthSearchResults(result);
        result = response?.data?.dayLoginList;
        applyDateSearchResults(result);
        result = response?.data?.weekLoginList;
        applyDaySearchResults(result);
        result = response?.data?.timeLoginList;
        applyHourSearchResults(result);
      } else if (sub == "monthInquiry") {
        const result = response?.data?.monLoginList;
        applyMonthSearchResults(result);
      } else if (sub == "dayInquiry") {
        const result = response?.data?.dayLoginList;
        applyDateSearchResults(result);
      } else if (sub == "weekInquiry") {
        const result = response?.data?.weekLoginList;
        applyDaySearchResults(result);
      } else if (sub == "timeInquiry") {
        result = response?.data?.timeLoginList;
        applyHourSearchResults(result);
      } else {
      }
    } catch (err) {}
  } else if (currentTab.value == tab2) {
    var param = {};
    if (sub == "inquiry") {
      sub = "schoolInquiry";
      param = {
        startYmd: startDate.value,
        endYmd: endDate.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        const result = response?.data?.schlLoginList?.[0];
        uniqSchlClasCnt.value = result?.uniCnt;
        avgTchrSchlClasCnt.value = result?.teacherRage;
        avgStdntSchlClasCnt.value = result?.studentRage;
      } catch (err) {}
    } else if (sub == "monSchoolInquiry") {
      param = {
        year: monthlySchlClasSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlySchlClasSearchResults(response?.data?.monSchlList);
      } catch (err) {}
    } else if (sub == "monSchoolTInquiry") {
      param = {
        yearT: monthlyTchrSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlyTchrSearchResults(response?.data?.monthSchlTList);
      } catch (err) {}
    } else if (sub == "monSchoolSInquiry") {
      param = {
        yearS: monthlyStdntSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlyStdntSearchResults(response?.data?.monthSchlSList);
      } catch (err) {}
    }
  } else if (currentTab.value == tab3) {
    var param = {};
    if (sub == "inquiry") {
      sub = "classInquiry";
      param = {
        startYmd: startDate.value,
        endYmd: endDate.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        const result = response?.data?.classLoginList?.[0];
        uniqSchlClasCnt.value = result?.uniCnt;
        avgTchrSchlClasCnt.value = result?.teacherRage;
        avgStdntSchlClasCnt.value = result?.studentRage;
      } catch (err) {}
    } else if (sub == "monClassInquiry") {
      param = {
        year: monthlySchlClasSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlySchlClasSearchResults(response?.data?.monClassList);
      } catch (err) {}
    } else if (sub == "monClassTInquiry") {
      param = {
        yearT: monthlyTchrSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlyTchrSearchResults(response?.data?.monthClassTList);
      } catch (err) {}
    } else if (sub == "monClassSInquiry") {
      param = {
        yearS: monthlyStdntSearchYear.value,
        crsId: selectedTextbook.value.id,
      };
      try {
        const response = await axios.post(`/statistic/${sub}`, param);
        applyMonthlyStdntSearchResults(response?.data?.monthClassSList);
      } catch (err) {}
    }
  } else if (currentTab.value == tab4 || currentTab.value == tab5) {
    pageable.value.empty = true;

    if (pageable.value.number == undefined) {
      pageable.value.number = 0;
    }
    if (pageable.value.size == undefined) {
      pageable.value.size = 10;
    }

    var param = {
      actorType: currentTab.value == tab4 ? actorType1 : actorType2,
      startYmd: startDate.value,
      endYmd: endDate.value,
      crsId: selectedTextbook.value.id,
    };

    try {
      const response = await axios.post(
        `/statistic/schlMemberInquiry?page=${pageable.value.number}&size=${pageable.value.size}`,
        param
      );
      totalLoginCnt.value = response?.data?.loginCnt?.[0]?.totCnt;
      uniqLoginCnt.value = response?.data?.loginCnt?.[0]?.uniCnt;
      avgLoginCnt.value = response?.data?.loginCnt?.[0]?.rage;

      totalPageViewCnt.value = response?.data?.pageCnt?.[0]?.pageTotCnt;
      uniqPageViewCnt.value = response?.data?.pageCnt?.[0]?.pageUniCnt;
      avgPageViewCnt.value = response?.data?.pageCnt?.[0]?.pageRage;
      if (response?.data?.uniPageList == null) {
        pageable.value.empty = true;
        pageable.value.totalPages = 0;
      } else {
        pageable.value.empty = response?.data?.uniPageList?.empty;
        pageable.value.first = response?.data?.uniPageList?.first;
        pageable.value.last = response?.data?.uniPageList?.last;
        pageable.value.numberOfElements =
          response?.data?.uniPageList?.numberOfElements;
        pageable.value.totalElements =
          response?.data?.uniPageList?.totalElements;
        pageable.value.totalPages = response?.data?.uniPageList?.totalPages;
        pageable.value.offset = response?.data?.uniPageList?.pageable?.offset;
      }
      applyPageViewUserList(response?.data?.uniPageList?.content);
    } catch (err) {
    } finally {
      reload.value = true;
    }
  }
};

/**
 *
 *  trigger request APIs functions
 *
 * */

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

watch(currentTab, async (n, o) => {
  if (n != o) {
    reload.value = false;

    selectAll.value = true;
    startDate.value = yesterday;
    endDate.value = today;

    reload.value = true;

    pageable.value.number = 0;
    pageable.value.size = 10;

    await inquiry("inquiry");

    if (n == tab1) {
    } else if (n == tab2) {
      await inquiry("monSchoolInquiry");
      await inquiry("monSchoolTInquiry");
      await inquiry("monSchoolSInquiry");
    } else if (n == tab3) {
      await inquiry("monClassInquiry");
      await inquiry("monClassTInquiry");
      await inquiry("monClassSInquiry");
    } else if (n == tab4) {
      pageViewUserHead.value = pageViewTchrHead;
    } else if (n == tab5) {
      pageViewUserHead.value = pageViewStdntHead;
    } else {
    }
  }
});

watch([actorType, startDate, endDate], async (n) => {
  if (reload) {
    await inquiry("inquiry");
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

watch(monthlyLoginSearchYear, async (n, o) => {
  if (n != o) {
    await inquiry("monthInquiry");
  }
});
watch([dayStartDate, dayEndDate], async (n, o) => {
  if (n != o) {
    await inquiry("weekInquiry");
  }
});
watch([hourStartDate, hourEndDate], async (n, o) => {
  if (n != o) {
    await inquiry("timeInquiry");
  }
});
watch([dateStartDate, dateEndDate], async (n, o) => {
  if (n != o) {
    await inquiry("dayInquiry");
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

watch(monthlySchlClasSearchYear, async (n, o) => {
  if (n != o) {
    if (currentTab.value == tab2) {
      await inquiry("monSchoolInquiry");
    } else if (currentTab.value == tab3) {
      await inquiry("monClassInquiry");
    }
  }
});
watch(monthlyTchrSearchYear, async (n, o) => {
  if (n != o) {
    if (currentTab.value == tab2) {
      await inquiry("monSchoolTInquiry");
    } else if (currentTab.value == tab3) {
      await inquiry("monClassTInquiry");
    }
  }
});
watch(monthlyStdntSearchYear, async (n, o) => {
  if (n != o) {
    if (currentTab.value == tab2) {
      await inquiry("monSchoolSInquiry");
    } else if (currentTab.value == tab3) {
      await inquiry("monClassSInquiry");
    }
  }
});

/*********************************************************************/

onMounted(async () => {
  reload.value = false;
  selectAll.value = true;

  years.value = [];
  for (var i = yearStartYear; i <= parseInt(thisYear); i++) {
    years.value.push(i.toString());
  }
  try {
    await loadSearchConditionList();
    await loadTextbookList();
    try {
      await inquiry("inquiry");
    } catch (err) {}
  } catch (err) {}
});
</script>

<style scoped>
.table-1 {
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

.stat-chart-container-3 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
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

.max-height-fix {
  max-height: 77vh;
  overflow: auto;
}

.entire {
  background: #f0f8ff78;
}
</style>
