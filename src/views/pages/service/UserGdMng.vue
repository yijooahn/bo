<template>
    <div class="wrap" ref="wrap">
		<p class="category">서비스 관리 > 이용가이드 관리</p>
		<p class="title">이용가이드</p><br>
		
		<table>
			<colgroup>
				<col width="10%">
				<col width="90%">
			</colgroup>
			
			<tr>
				<th class="align-left"><span>대상</span></th>
				<td>
					<input type="radio" name="rdTrgt" id="Whol1" value="" v-model="userGdTrgt"/>
					<label for="Whol1"><span>전체</span></label>
					<input type="radio" name="rdTrgt" id="TCHR" value="TCHR" v-model="userGdTrgt"/>
					<label for="TCHR"><span>교사용</span></label>
					<input type="radio" name="rdTrgt" id="STDNT" value="STDNT" v-model="userGdTrgt"/>
					<label for="STDNT"><span>학생용</span></label>
				</td>
			</tr>
			<tr>
				<th class="align-left"><span>현황</span></th>
				<td>
					<input type="radio" name="rdStts" id="Whol2" value="" v-model="userGdStts"/>
					<label for="Whol2"><span>전체</span></label>
					<input type="radio" name="rdStts" id="Y" value="현재버전" v-model="userGdStts"/>
					<label for="Y"><span class="text-danger">현재버전</span></label>
					<input type="radio" name="rdStts" id="N" value="종료" v-model="userGdStts"/>
					<label for="N"><span>종료</span></label>
				</td>
			</tr>
			<tr>
				<th class="align-left"><span>등록일자</span></th>
				<td><input type="radio" id="rdWhol3"  name="rdRegDt" @click="regDtInit()" checked><label for="rdWhol3" ><span>전체</span></label>
					<input type="radio" id="rdToday"  name="rdRegDt" @click="regDtToday()"><label for="rdToday" ><span>오늘</span></label>
					<input type="radio" id="rdRcnt7"  name="rdRegDt" @click="regDtRcnt7()"><label for="rdRcnt7" ><span>최근 7일</span></label>
					<input type="radio" id="rdRcnt30" name="rdRegDt" @click="regDtRcnt30()"><label for="rdRcnt30"><span>최근 30일</span></label>
					<input type="radio" id="rdPrd"    name="rdRegDt"><label for="rdPrd"   ><span>기간</span></label>
					<div style="display: inline-flex">
						<input type="date" v-model="stDate" />
				        <span style="align-self: center; padding: 0 1rem">~</span>
				        <input type="date" v-model="edDate" />
					</div>
				</td>
			</tr>
			<tr>
				<th class="align-left"><span>키워드</span></th>
				<td><select v-model="selected1" @change="change">
						<option><span>제목</span></option>
						<option><span>등록자</span></option>
					</select>
					<!-- <input type="text" class="ml-10" style="display:inline-block;width:70%;" v-model="keyword1"> -->
					<input type="text" class="ml-10" style="display:inline-block;width:70%;" v-model="keyword">
				</td>
			</tr>
		</table>
		<button class="btn-1" style="float:right;" @click="inq()">조회</button><br><br><br><br>
		
		<select v-model="pageSize" @change="changePageSize()">
			<option value="10"><span>10개씩 보기</span></option>
			<option value="20"><span>20개씩 보기</span></option>
			<option value="30"><span>30개씩 보기</span></option>
			<option value="50"><span>50개씩 보기</span></option>
			<option value="100"><span>100개씩 보기</span></option>
		</select>&emsp;
		
		<span> 검색결과 : {{totalElements}}</span>
		<button class="btn-1" style="float:right;" @click="$router.push('/userGdReg')">등록</button>
		<button class="btn-1" style="float:right;" @click="handleClick">마스킹 해제</button><br>
		<table>
			<colgroup>
				<col width="5%">
				<col width="10%">
				<col width="25%">
				<col width="10%">
				<col width="10%">
				<col width="18%">
				<col width="18%">
			</colgroup>
			
			<thead>
				<tr>
					<th><span>No.</span></th>
					<th><span>대상</span></th>
					<th><span>제목</span></th>
					<th><span>현황</span></th>
					<th><span>최종수정자명</span></th>
					<th><span>등록일시</span></th>
					<th><span>최종수정일시</span></th>
				</tr>
			</thead>
			<tbody class="align-center">
				<tr v-if="totalElements == 0">
					<td colspan="7"><span>조회된 결과가 없습니다</span></td>
				</tr>
				<tr v-if="totalElements != 0" v-for="row in contentList" :key="row.userGdId">
					<td><span>{{ row.userGdId }}</span></td>
					<td v-if="row.userGdTrgt==='TCHR'"><span>교사용</span></td>
					<td v-if="row.userGdTrgt==='STDNT'"><span>학생용</span></td>
					<td><a @click="moveToDetail(row.userGdId)">
						<span>{{ row.userGdTtl }}</span></a>
					</td>
					<td><span v-if="row.userGdStts === '현재버전'" class="text-danger">{{ row.userGdStts }}</span>
						<span v-if="row.userGdStts != '현재버전'">{{ row.userGdStts }}</span></td>
					<td><span>{{ mskgName(row.chgr) }}</span></td>
					<td><span>{{ row.regDt }}</span></td>
					<td><span>{{ row.chgDt }}</span></td>
				</tr>
			</tbody>
		</table><br>
		<!-- 페이징 -->
		<div class="paging-outer">
			<div class="paging-inner">
				<div>
					<img class="btn-first" v-if="firstPageYn === true" src="/images/icon_btn-first_disabled.svg">
					<img class="btn-first" v-if="firstPageYn === false" src="/images/icon_btn-first.svg" @click="firstPage()">
				</div>
				<div>
					<img class="btn-prev" v-if="pageNumber === 0" src="/images/icon_btn-prev_disabled.svg">
				<img class="btn-prev" v-if="pageNumber !=  0" src="/images/icon_btn-prev.svg" @click="previewPage()">
				</div>
				<div class="btn-no clickable" v-for="page in pageList" :key="page" @click="setPage(page)"><span>{{ page+1 }}</span></div>
				<div>
					<img class="btn-next" v-if="pageNumber+1 === totalPages" src="/images/icon_btn-next_disabled.svg">
					<img class="btn-next" v-if="pageNumber+1 !=  totalPages" src="/images/icon_btn-next.svg" @click="nextPage()">
				</div>
				<div>
					<img class="btn-last" v-if="lastPageYn === true" src="/images/icon_btn-last_disabled.svg">
					<img class="btn-last" v-if="lastPageYn === false" src="/images/icon_btn-last.svg" @click="lastPage()">
				</div>
			</div>
		</div>
    </div>
    
    <RmvMskgPopup ref="rmvMskgPopup" :content="modalContent" />
</template>

<script setup lang="ts">
import router from '@/router'
import { useUserGdStore } from '@/store/userGd.js'
import RmvMskgPopup from '@/views/components/popup/RmvMskgPopup.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'


const userGdTrgt = ref('')
const userGdStts = ref('')

//페이징
const pageSize = ref(10)
const pageNumber = ref(0)
const totalElements = ref(0)
const totalPages = ref()
const firstPageYn = ref(true)
const lastPageYn = ref(false)
const pageSection = ref(0)
const setPageSection = () => {
	if(pageNumber.value > 9){
		if(pageNumber.value.toString().substring(1) === "0") {
			pageSection.value = parseInt(pageSection.value.toString().substring(0))-1
		} else {
			pageSection.value = parseInt(pageSection.value.toString().substring(0))
		}
	} else {
		pageSection.value = 0
	}
}
const pageList = ref([])
const setPageList = () => {
	let inputList = [];
	let maxPages = 10
	let share = Math.floor(pageNumber.value / 10) *10
	let remain = pageNumber.value % 10

	for(let i = share ; i < share + maxPages; i++) {
		if(i >= totalPages.value) {
			break;
		}
		inputList.push(i)
	}

//   for (let i = 0; i < totalPages.value; i++) {
//     inputList.push(i);
//   }
	pageList.value = inputList;
}
const setPage = (page) => {
	pageList.value = ''
	pageNumber.value = page
	inq()
}

const previewPage = () => {
	if(pageNumber.value > 0) {
		setPage(pageNumber.value -1)
	}
}

const nextPage = () => {
	if(pageNumber.value < totalPages.value -1) {
		setPage(pageNumber.value+1)
	}
}

const firstPage = () => {
	if(pageNumber.value < 10) {
		setPage(0)
	} else {
		setPage(pageNumber.value - 10)
	}
}

const lastPage = () => {
	// alert(pageNumber.value)
	if(pageNumber.value + 10 > totalPages.value) {
		setPage(totalPages.value - 1)
	} else {
		setPage(pageNumber.value +10)
	}
}

//등록일자
const today = ref(new Date().toJSON().slice(0,10))
const stDate = defineModel('startDate', {
  type: String,
  required: false
})
const edDate = defineModel('endDate', {
  type: String,
  required: false
})
const regDtInit = () => {
	stDate.value = '2024-01-01'
	edDate.value = today.value
}
const regDtToday = () => {
	stDate.value = today.value
	edDate.value = today.value
}
function regDtRcnt7() {
  const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  stDate.value = sevenDaysAgo.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  edDate.value = today.value
}
function regDtRcnt30() {
  const sevenDaysAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
  stDate.value = sevenDaysAgo.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  edDate.value = today.value
}
const selected1 = ref("제목")
// const keyword1 = ref(null)
const keyword = ref(null)
let keyword1 = null
let keyword2 = null
const selectKeyword = () => {
	if(selected1.value === "제목") {
		keyword1 = keyword.value
		keyword2 = null
	} else if(selected1.value === "등록자") {
		keyword2 = keyword.value
		keyword1 = null
		// keyword2 = keyword1.value
		// keyword1.value = null
	}
}

//상세보기 페이지 이동
const moveToDetail = (uid) => {
	setStore()
	router.push({
		name:'userGdDtlView',
		state:{userGdId:uid}
	})
}

////axios
let contentList = ref([])
//조회
const inq = () => {
	selectKeyword()
	const param = {	'userGdTrgt':userGdTrgt.value,
					'userGdStts':userGdStts.value,
					// 'userGdTtl':keyword1.value,
					'userGdTtl':keyword1,
					'rgtr':keyword2,
					'searchStartDate':stDate.value,
					'searchEndDate':edDate.value,
					'size':pageSize.value,
					'page':pageNumber.value }
    axios.post("/userguide/inquiry", null, {params:param})
    	 .then((result) => {
			if(result.data.totalElements == null) {
				totalElements.value = 0
			} else {
				totalElements.value = result.data.totalElements
			}
    		contentList.value = result.data.content;
    		// totalElements.value = result.data.totalElements
    		totalPages.value = result.data.totalPages
    		firstPageYn.value = result.data.first
    		lastPageYn.value = result.data.last
    		setPageList()
		})
		.catch((error) => {
			contentList.value = []
			if(error.response.status == 404) {
				contentList.value = []
				totalElements.value = 0
				totalPages.value = 0
    			firstPageYn.value = true
    			lastPageYn.value = true
				setPageList()
			}
		})
}

//마스킹
const mskgRmvYn = ref(false)
const mskgRmv = () => {
	mskgRmvYn.value = true
}
const mskgName = (name) => {
	if(mskgRmvYn.value === false){
		if(name.lerngth === 2){
			return name.replaceAll(/(?<=.{1})./gi, "*")
		} else if (name.length === 3){
			return name.replaceAll(/(?<=.{2})./gi, "*")
		} else {
			return name.replaceAll(/(?<=.{3})./gi, "*")
		}
	} else {
		return name
	}
}
//마스킹 해제 팝업 호출
const rmvMskgPopup = ref(null);
const modalContent = ref(["요청자(aidt***@aidt.ai) 마스킹 해제 사유 입력 :"]);
const handleClick = async () => {
	const ok = await rmvMskgPopup.value.show();
	if (ok) {
		mskgRmv()
	}
}

const store = useUserGdStore()
const { setUserGdTrgt } = store
const { setUserGdStts } = store
const { setRegDateOption } = store
const { setSearchStartDate } = store
const { setSearchEndDate } = store
const { setKeywordOption } = store
const { setKeywordString } = store
const getStore = () => {
	let existInq = false
	if(store.userGdTrgtStore != undefined && store.userGdTrgtStore != ''){ 
		userGdTrgt.value = store.userGdTrgtStore
		existInq=true 
	}
	if(store.userGdSttsStore != undefined && store.userGdSttsStore != ''){ 
		userGdStts.value = store.userGdSttsStore 
		existInq=true 
		}
	if(store.searchStartDateStore != undefined && store.searchStartDateStore != ''){ 
		stDate.value = store.searchStartDateStore 
		existInq=true }
	if(store.searchEndDateStore != undefined && store.searchEndDateStore != ''){ 
		edDate.value = store.searchEndDateStore 
		existInq=true 
	}
	if(store.keywordOptionStore != undefined && store.keywordOptionStore != ''){
		selected1.value = store.keywordOptionStore 
		existInq=true 
	}
	if(store.keywordStringStore != undefined && store.keywordStringStore != ''){ 
		keyword.value = store.keywordStringStore
		existInq=true 
	}
	if(existInq === true){
		inq()
	}
}
const setStore = () => {
	setUserGdTrgt(userGdTrgt.value)
	setUserGdStts(userGdStts.value)
	setSearchStartDate(stDate.value)
	setSearchEndDate(edDate.value)
	setKeywordOption(selected1.value)
	setKeywordString(keyword.value)
}
const wrap = ref()
onMounted(() => {
	wrap.value.scrollIntoView();
	regDtInit()
	getStore()
	setPageSection()
	inq()
})


const change = () => {
	keyword.value = null
}
const changePageSize = () => {
	inq()
}
</script>

<style scoped>
@font-face {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 700;
	src: /*local("Spoqa Han Sans Neo Bold"),
	   url('/fonts/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
	  url('/fonts/SpoqaHanSansNeo-Bold.woff') format('woff'),*/
		url("/fonts/SpoqaHanSansNeo-Bold.ttf") format("truetype");
  }
  
  @font-face {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 500;
	src:   /*local("Spoqa Han Sans Neo Medium"),
	url('/fonts/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
	  url('/fonts/SpoqaHanSansNeo-Medium.woff') format('woff'),*/
		url("/fonts/SpoqaHanSansNeo-Medium.ttf") format("truetype");
  }
  
  @font-face {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 400;
	src:  /*local("Spoqa Han Sans Neo Regular"),
	  url('/fonts/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
	  url('/fonts/SpoqaHanSansNeo-Regular.woff') format('woff'),*/
		url("/fonts/SpoqaHanSansNeo-Regular.ttf") format("truetype");
  }
  
  @font-face {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 300;
	src:/* local("Spoqa Han Sans Neo Light"),
	   url('/fonts/SpoqaHanSansNeo-Light.woff2') format('woff2'),
	  url('/fonts/SpoqaHanSansNeo-Light.woff') format('woff'),*/
		url("/fonts/SpoqaHanSansNeo-Light.ttf") format("truetype");
  }
  
  @font-face {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 100;
	src:/* local("Spoqa Han Sans Neo Thin"),
		url('/fonts/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
	  url('/fonts/SpoqaHanSansNeo-Thin.woff') format('woff'),*/
		url("/fonts/SpoqaHanSansNeo-Thin.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeo;
	src: url("/fonts/SpoqaHanSansNeo-Regular.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeoMedium;
	src: url("/fonts/SpoqaHanSansNeo-Medium.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeoBold;
	src: url("/fonts/SpoqaHanSansNeo-Bold.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeoLight;
	src: url("/fonts/SpoqaHanSansNeo-Light.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeoThin;
	src: url("/fonts/SpoqaHanSansNeo-Thin.ttf") format("truetype");
  }
  
  @font-face {
	font-family: SpoqaHanSansNeoRegular;
	src: url("/fonts/SpoqaHanSansNeo-Regular.ttf") format("truetype");
  }
  .text-red {
	color: red;
  }
  
  .text-gray {
	color: gray;
  }
  
  .text-black {
	color: black;
  }
  .icon06 {
	content: url("/images/icon06.svg");
	width: 18px;
	height: 18px;
  }
  .icon30 {
	content: url("/images/icon30.svg");
	width: 10px;
	height: 10px;
	cursor: pointer;
  }
  .icon31 {
	content: url("/images/icon31.svg");
	width: 6px;
	height: 6px;
	cursor: pointer;
  }
  .icon32 {
	content: url("/images/icon32.svg");
	width: 10px;
	height: 10px;
	cursor: pointer;
  }
  .icon26 {
	content: url("/images/icon26.svg");
	width: 12px;
	height: 12px;
  }
  .icon26-blue {
	content: url("/images/icon26blue.svg");
  }
  .icon27 {
	content: url("/images/icon27.svg");
	width: 12px;
	height: 12px;
  }
  .icon28 {
	content: url("/images/icon28.svg");
	width: 12px;
	height: 12px;
  }
  .icon13 {
	content: url("/images/icon13.svg");
	width: 18px;
	height: 18px;
  }
  .icon-arrow {
	content: url("/images/icon-arrow.svg");
	width: 18px;
	height: 10px;
  }
  .icon34 {
	content: url("/images/icon34.svg");
	width: 18px;
	height: 10px;
  }
  .icon36 {
	content: url("/images/icon36.svg");
  }
  .icon37 {
	content: url("/images/icon37.svg");
  }
  .ic1 {
	content: url("/images/ic1.svg");
	width: 12px;
	height: 12px;
	padding: 0 0.2rem;
  }
  .ic2 {
	content: url("/images/ic2.svg");
	width: 12px;
	height: 12px;
	padding: 0 0.2rem;
  }
  .ic3 {
	content: url("/images/ic3.svg");
	width: 12px;
	height: 12px;
	padding: 0 0.2rem;
  }
  .ic4 {
	content: url("/images/ic4.svg");
	width: 12px;
	height: 12px;
	padding: 0 0.2rem;
  }
  .exex,
  .iconex {
	content: url("/images/Group1219.svg");
	width: 18px;
	padding: 0 0.1rem;
  }
  .xlsx {
	color: var(--black, #373f57);
	text-align: left;
	text-decoration: underline;
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
  }
  table {
	text-align: left;
	width: 100%;
	border-collapse: collapse;
	table-layout: auto;
	align-self: center;
	margin: 0.5rem 0;
  }
  
  th,
  td {
	font-weight: unset;
	font-style: unset;
	padding: 0.7rem;
  }
  
  thead {
	text-align: center;
	white-space: nowrap;
	text-wrap: nowrap;
  }
  
  th {
	white-space: nowrap;
	text-wrap: nowrap;
	background: #eff5ff;
	font-family: SpoqaHanSansNeoBold;
  }
  
  td > div {
	display: flex;
  }
  td div {
	grid-gap: 0.5rem;
	padding: 0.1rem 0;
        align-items: center;
}
  tr {
	width: 100%;
	border-top: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
  }
  
  .table-2 th,
  .table-2 td {
	border: 1px solid #eaeaea;
  }
  .table-2 tr td:first-child,
  .table-2 tr td:last-child,
  .table-2 th:first-child,
  .table-2 th:last-child {
	border-left: none;
	border-right: none;
  }
  
  .table-1,
  .table-2 {
	border: none;
  }
  
  .table-1 th {
	width: 15%;
  }
  
  .table-1 th,
  .table-1 td,
  .table-2 th,
  .table-2 td {
	border: 1px solid #eaeaea;
  }
  
  .table-1 th:first-child {
	border-left: none;
  }
  .table-1 td:last-child {
	border-right: none;
  }
  
  /*
  <div class="btn-4">
	  <div class="div"> 파일선택 </div>
  </div>
  */
  .btn-4,
  .btn-4 * {
	box-sizing: border-box;
  }
  
  .btn-4 {
	font-size: small;
	width: fit-content;
	background: #ffffff;
	border-radius: 6px;
	border-style: solid;
	border-color: #8a90af;
	border-width: 1px;
	padding: 0.2rem 1rem;
	display: flex;
	flex-direction: row;
	gap: 0px;
	align-items: flex-start;
	flex-shrink: 0;
	position: relative;
	cursor: pointer;
  }
  .btn-4:hover {
	border-width: 2px;
  }
  .btn-4 .div {
	color: #8a90af;
	text-align: center;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
  }
  
  .breadcrumb {
	font-size: medium;
	color: rgba(92, 102, 123, 1);
	margin: 0.2rem;
  }
  
  .breadcrumb::before,
  .heading::before {
	width: 100%;
	height: fit-content;
  }
  
  .heading {
	font-family: SpoqaHanSansNeoBold;
	font-size: x-large;
	color: rgba(55, 63, 87, 1);
	margin: 0.8rem;
  }
  
  .input-help-icon1::before {
	width: 16px;
	height: 16px;
	flex-shrink: 0;
  }
  
  .input-help-icon1 {
	width: 13.333px;
	height: 13.333px;
	flex-shrink: 0;
  }
  
  .input-help {
	color: #5c667b;
	font-family: SpoqaHanSansNeo;
	font-size: 14px;
	font-style: normal;
	line-height: 20px;
	letter-spacing: -0.35px;
  }
  
  .input-help::after {
	display: flex;
	width: 274px;
	height: 18px;
	padding-right: 2px;
	justify-content: center;
	align-items: center;
	gap: 3px;
	flex-shrink: 0;
  }
  
  .small-pop {
	width: 220px;
	height: 92px;
	flex-shrink: 0;
	border-radius: 8px;
	border: 1px solid #edeef0;
	background: #fff;
	box-shadow: 2px 6px 16px 0px rgba(17, 42, 128, 0.08);
  }
  
  .small-pop-header {
	float: right;
	margin: 5px;
  }
  
  .small-pop-close {
	display: flex;
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
  }
  
  .small-pop-close::after {
	content: url("/images/smallpopclose.svg");
	width: 12px;
	height: 12px;
	flex-shrink: 0;
  }
  
  .small-pop-inner::after {
	height: 40px;
  }
  
  .small-pop-inner {
	display: flex;
	width: 145.074px;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	color: #5c667b;
	font-family: SpoqaHanSansNeo;
	font-size: 14px;
	font-style: normal;
	line-height: 20px;
	letter-spacing: -1px;
	margin: 0 auto;
  }
  
  .logo {
	width: 277px;
	height: 30px;
	flex-shrink: 0;
	display: flex;
	line-height: 30px;
	gap: 5px;
  }
  
  .logo1 {
	width: 70px;
	height: 30px;
	flex-shrink: 0;
	background: url("/images/logo/img_logo1.svg") lightgray 50% / cover no-repeat;
  }
  
  .logo2::after {
	width: 9.898px;
	height: 10px;
	flex-shrink: 0;
	content: url("/images/logo/Group1198.svg");
  }
  
  .logo3::after {
	width: 59.978px;
	height: 19px;
	flex-shrink: 0;
	content: url("/images/logo/AIDT.svg");
	line-height: 19px;
	vertical-align: bottom;
  }
  
  .logo4::after {
	width: 117.525px;
	height: 17.67px;
	flex-shrink: 0;
	content: url("/images/logo/bologo.svg");
	line-height: 17.67px;
	vertical-align: bottom;
  }
  
  label {
	all: unset;
	color: var(--black, #373f57);
	font-family: SpoqaHanSansNeo;
	font-style: normal;
	letter-spacing: -0.35px;
	vertical-align: middle;
	align-self: center;
  }
  span {
	align-self: center;
  }
  
  .tit {
	width: 3px;
	height: 14px;
	border-radius: 9px;
	background: #4876ef;
	display: inline-flex;
	margin: 0 3px;
	line-height: 14px;
	vertical-align: middle;
  }
  
  .tit + label {
	all: unset;
	color: var(--black, #373f57);
	font-family: SpoqaHanSansNeoBold;
	align-self: center;
	letter-spacing: -1px;
  }
  
  button,
  .btn-1,
  .btn-2,
  .btn-3 {
	all: unset;
	cursor: pointer;
	display: inline-flex;
	padding: 7px 30px;
	align-items: flex-start;
	border-radius: 6px;
	background: var(--blue, #4876ef);
	border: 1px solid var(--blue, #4876ef);
	color: #fff;
	text-align: center;
	font-family: SpoqaHanSansNeo;
	font-style: normal;
	line-height: 20px;
	margin: 0 10px;
  }
  .btn-1:hover {
	background: #0750d9;
  }
  
  .btn-2 {
	border: 1px solid var(--red, #f05050);
	background: #fff;
	color: var(--red, #f05050);
  }
  
  .btn-2:hover {
	background : #ffeaea;
  }
  
  .btn-3 {
	border: 1px solid #8a90af;
	background: #8a90af;
	color: #fff;
  }
  
  .btn-3:hover {
	background: #6f7596;
  }
  
  input[type="radio"],
  input[type="checkbox"] {
	appearance: none;
	all: unset;
	margin: 2px;
	vertical-align: middle;
	line-height: 100%;
	cursor: pointer;
	transform: scale(0.8);
  }
  input[type="radio"] + label,
  input[type="checkbox"] + label {
	cursor: pointer;
	word-wrap: nowrap;
	align-self: center;
	white-space: nowrap;
  }
  
  input[type="radio"]:checked::before {
	all: unset;
	content: url("/images/radioon.svg");
  }
  
  input[type="radio"]::before {
	all: unset;
	content: url("/images/radiooff.svg");
  }
  
  input[type="radio"]:disabled::before {
	all: unset;
	content: url("/images/radiodis.svg");
  }
  
  input[type="checkbox"]:checked::before {
	all: unset;
	content: url("/images/checkbox-on.svg");
  }
  
  input[type="checkbox"]::before {
	all: unset;
	content: url("/images/checkbox-off.svg");
  }
  
  input[type="checkbox"]:disabled::before {
	all: unset;
	content: url("/images/checkbox-dis.svg");
  }
  
  input[type="text"],
  input[type="email"],
  input[type="number"],
  input[type="password"] {
	all: unset;
	display: flex;
	width: 150px;
	min-width: 7vw;
	padding: 7px 10px;
	align-items: flex-start;
	gap: 10px;
	border-radius: 6px;
	border: 1px solid #e4e1e1;
	background: #fff;
	color: var(--black, #373f57);
	font-family: SpoqaHanSansNeo;
	font-style: normal;
	line-height: 100%;
  }
  
  input::placeholder {
	color: rgba(55, 63, 87, 0.3);
	font-family: SpoqaHanSansNeo;
	font-style: normal;
	line-height: 100%;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="number"]:focus,
  input[type="password"]:focus {
	all: unset;
	display: flex;
	width: 150px;
	min-width: 7vw;
	padding: 7px 10px;
	align-items: flex-start;
	gap: 10px;
	border-radius: 6px;
	border: 1px solid var(--blue, #4876ef);
	background: #fff;
	color: var(--black, #373f57);
	line-height: 100%;
  }
  
  input[type="text"]:disabled,
  input[type="email"]:disabled,
  input[type="number"]:disabled,
  input[type="password"]:disabled {
	all: unset;
	display: flex;
	width: 150px;
	min-width: 7vw;
	padding: 7px 10px;
	align-items: flex-start;
	gap: 10px;
	border-radius: 6px;
	border: 1px solid #e4e1e1;
	background: #f8f8f8;
	line-height: 100%;
  }
  
  input[type="date"] {
	width: 140px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 6px;
	border: 1px solid #e4e1e1;
	background: #fff;
	color: var(--black, #373f57);
	font-family: SpoqaHanSansNeo;
	font-size: 14px;
	font-style: normal;
	line-height: 100%;
	text-align: center;
  }
  
  input[type="datetime-local"] {
	width: 210px;
	height: 34px;
	flex-shrink: 0;
	border-radius: 6px;
	border: 1px solid #e4e1e1;
	background: #fff;
	color: var(--black, #373f57);
	font-family: SpoqaHanSansNeo;
	font-size: 14px;
	font-style: normal;
	line-height: 100%;
	text-align: center;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
	color: rgba(0, 0, 0, 0);
	opacity: 1;
	display: block;
	background: url("/images/icon22.svg") center/50% no-repeat #e4e1e1;
	width: 37px;
	height: 30px;
	cursor: pointer;
	border-radius: 0px 6px 6px 0px;
	border: 1px solid #e4e1e1;
  }
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
	color: rgba(0, 0, 0, 0);
	opacity: 1;
	display: block;
	background: url("/images/icon22.svg") center/50% no-repeat #e4e1e1;
	width: 37px;
	height: 30px;
	cursor: pointer;
	border-radius: 0px 6px 6px 0px;
	border: 1px solid #e4e1e1;
  }
  table {
	border-collapse: collapse;
	width: 100%;
  }
  tr {
	width: 45px;
  }
  th {
	background: #eff5ff;
	border: 1px solid #eaeaea;
	font-weight: 500;
	padding: 15px 10px;
  }
  td {
	border: 1px solid #eaeaea;
	font-weight: 400;
  }
  tbody td {
	padding: 20px 0px;
  }
  label {
	margin-right: 10px;
  }
  span {
	font-family: "Spoqa Han Sans Neo";
	font-size: 14px;
	letter-spacing: -0.35px;
	color: #373f57;
  }
  textarea {
	width: 800px;
	height: 200px;
	resize: none;
	border: 1px solid #e4e1e1;
	border-radius: 6px;
	padding: 7px 10px 7px 10px;
  }
  textarea::placeholder {
	color: rgba(55, 63, 87, 0.3);
	font-family: SpoqaHanSansNeo;
	font-style: normal;
	line-height: 100%;
  }
  button {
	font-family: "Spoqa Han Sans Neo" !important;
	font-size: 14px !important;
	font-weight: 500 !important;
  }
  a:hover {
	cursor: pointer;
	text-decoration: underline;
  }
  select {
	position: relative;
	display: inline-flex;
	min-width: 8vw;
	justify-content: space-between;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #e4e1e1;
	color: var(--black, #373f57);
	height: 34px;
	line-height: 34px;
	white-space: nowrap;
	cursor: pointer;
  }
  .wrap {
	padding: 20px;
  }
  .ml-10 {
	margin-left: 10px !important;
	padding: 8px !important;
  }
  .title {
	font-family: "Spoqa Han Sans Neo";
	font-size: 28px;
	font-weight: 700;
	letter-spacing: -2px;
	color: #373f57;
	margin-top: -10px;
  }
  .category {
	font-size: 13px;
	color: #5c667b;
  }
  .custom-select {
	display: inline-flex !important;
  }
  .dp-inline-bk {
	display: inline-block;
  }
  .text-danger {
	color: red;
  }
  .pagination {
	margin: auto;
  }
  .align-center {
	text-align: center !important;
  }
  .align-left {
	text-align: left !important;
  }
  .align-right {
	text-align: right !important;
  }
  .btn-selectFile {
	border: 1px solid #8a90af;
	border-radius: 6px;
	padding: 7px 16px;
	background-color: #fff;
	color: #8a90af;
  }
  .label-tit {
	font-family: "Spoqa Han Sans Neo";
	font-weight: 500 !important;
	font-size: 14px !important;
	letter-spacing: -1px;
  }
  .clickable:hover {
	cursor: pointer;
  }
  
  .paging-outer {
	display: flex;
	justify-content: center;
  }
  .paging-inner {
	display: flex;
	align-items: center;
  }
  .btn-first {
	width: 36px;
  }
  .btn-prev {
	width: 36px;
  }
  .btn-no {
	width: 12px;
	height: 20px;
	border: 0.5px solid #dddfe0;
	border-radius: 3px;
	padding: 6px 12px;
	margin: 0 10px;
	background: #ffffff;
	text-align: center;
	font-family: SpoqaHanSansNeo;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
  }
  .btn-next {
	width: 36px;
  }
  .btn-last {
	width: 36px;
  }
  .text-time {
	width: 100px !important;
	text-align: center !important;
	font-size: 14px !important;
	display: inline !important;
	margin-left: 10px !important;
  }
  .underline {
	text-decoration: underline;
  }
  
</style>
