<template>
  <div class="mg-1">
    <p class="breadcrumb">통계 관리 > 서비스 이용 통계 > 평가/처방</p>
    <p class="heading">평가/처방</p>
    <div class="dp-f">
      <tab-comp
        :first="true"
        :active="currentTab == 'AI 진단 평가/처방'"
        title="AI 진단 평가/처방"
        @click="tabClick('AI 진단 평가/처방')"
      />
      <tab-comp
        :first="false"
        :active="currentTab == 'AI 형성 평가/처방'"
        title="AI 형성 평가/처방"
        @click="tabClick('AI 형성 평가/처방')"
      />
      <tab-comp
        :first="false"
        :active="currentTab == 'AI 총괄 평가/처방'"
        title="AI 총괄 평가/처방"
        @click="tabClick('AI 총괄 평가/처방')"
      />
    </div>
    <div v-if="currentTab == 'AI 진단 평가/처방'">
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
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
                  :options="['학교급 전체', '학교1', '학교2']"
                ></select-comp>
                <select-comp
                  :options="['학년 전체', '학년1', '학년2']"
                ></select-comp>
                <select-comp
                  :options="['학기 전체', '1학기', '2학기']"
                ></select-comp>
                <select-comp
                  :options="['교과서 전체', '교과1', '교과2']"
                ></select-comp>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="inq-btn"><button class="btn-1">조회</button></div>
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 학년(학기) 진단 평가 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="15%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>배부 총 횟수</span></th>
              <th><span>교사 수(유니크)</span></th>
              <th><span>평균 배부 횟수</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 학년(학기) 진단 평가 응시율 현황(1)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="17%" />
            <col width="16%" />
            <col width="16%" />
            <col width="17%" />
            <col width="17%" />
            <col width="17%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>응시 인원</span></th>
              <th><span>응시율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 학년(학기) 진단 평가 응시율(2)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>완료 인원</span></th>
              <th><span>완료율</span></th>
              <th><span>평균 정답률</span></th>
              <th><span>평균 오답률</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>1,000</span></td>
              <td><span>800</span></td>
              <td><span>80%</span></td>
              <td><span>75%</span></td>
              <td><span>25%</span></td>
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

      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 학년(학기) 진단 처방 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>뷰어 실행 총 횟수</span></th>
              <th><span>실행 인원(유니크)</span></th>
              <th><span>비율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>450</span></td>
              <td><span>90%</span></td>
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
    <div v-else-if="currentTab == 'AI 형성 평가/처방'">
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
          <label>AI 형성 평가 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="15%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>배부 총 횟수</span></th>
              <th><span>교사 수(유니크)</span></th>
              <th><span>평균 배부 횟수</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 형성 평가 응시율 현황(1)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="17%" />
            <col width="16%" />
            <col width="16%" />
            <col width="17%" />
            <col width="17%" />
            <col width="17%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>응시 인원</span></th>
              <th><span>응시율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 형성 평가 응시율(2)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>완료 인원</span></th>
              <th><span>완료율</span></th>
              <th><span>평균 정답률</span></th>
              <th><span>평균 오답률</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>1,000</span></td>
              <td><span>800</span></td>
              <td><span>80%</span></td>
              <td><span>75%</span></td>
              <td><span>25%</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 학년(학기) 진단 처방 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>뷰어 실행 총 횟수</span></th>
              <th><span>실행 인원(유니크)</span></th>
              <th><span>비율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>450</span></td>
              <td><span>90%</span></td>
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
    <div v-else-if="currentTab == 'AI 총괄 평가/처방'">
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
          <label>AI 총괄 평가 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="15%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>배부 총 횟수</span></th>
              <th><span>교사 수(유니크)</span></th>
              <th><span>평균 배부 횟수</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 총괄 평가 응시율 현황(1)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="17%" />
            <col width="16%" />
            <col width="16%" />
            <col width="17%" />
            <col width="17%" />
            <col width="17%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>응시 인원</span></th>
              <th><span>응시율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>25</span></td>
              <td><span>20</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 총괄 평가 응시율(2)</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="20%" />
            <col width="5%" />
            <col width="5%" />
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>진단평가 부여 받은 인원</span></th>
              <th><span>완료 인원</span></th>
              <th><span>완료율</span></th>
              <th><span>평균 정답률</span></th>
              <th><span>평균 오답률</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>1,000</span></td>
              <td><span>800</span></td>
              <td><span>80%</span></td>
              <td><span>75%</span></td>
              <td><span>25%</span></td>
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
      <div class="stat-chart-container-inner">
        <div>
          <div class="tit"></div>
          <label>AI 총괄 처방 이용률</label>
        </div>
      </div>
      <div class="stat-chart-container-chart">
        <table class="table-2 t-c">
          <colgroup>
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <thead>
            <tr>
              <th><span>학교급</span></th>
              <th><span>학년</span></th>
              <th><span>학기</span></th>
              <th><span>뷰어 실행 총 횟수</span></th>
              <th><span>실행 인원(유니크)</span></th>
              <th><span>비율</span></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="index">-->
            <tr v-for="idx in 10">
              <td><span>초등학교</span></td>
              <td><span>3</span></td>
              <td><span>1</span></td>
              <td><span>500</span></td>
              <td><span>450</span></td>
              <td><span>90%</span></td>
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
const currentTab = ref("AI 진단 평가/처방");
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

.table-1,
.table-2 {
  margin-top: 1rem;
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