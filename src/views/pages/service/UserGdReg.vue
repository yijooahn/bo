<template>
    <div class="wrap" ref="wrap">
		<p class="category">서비스 관리 > 이용 등록</p>
		<p class="title">이용가이드 등록</p><br>
		
		<table>
			<colgroup>
				<col width="10%">
				<col width="90%">
			</colgroup>
			
			<tr>
				<th class="align-left"><span>대상</span><span class="text-danger"> *</span></th>
				<td><select v-model="userGdTrgt">
						<option value="TCHR"><span>교사용</span></option>
						<option value="STDNT"><span>학생용</span></option>
					</select>
				</td>
			</tr>
			<tr>
				<th class="align-left"><span>제목</span><span class="text-danger"> *</span></th>
				<td><input type="text" v-model="userGdTtl" style="display:inline-block;width:70%;" placeholder="제목을 입력하세요"></td>
			</tr>
			<tr>
				<th class="align-left"><span>게재 기간</span><span class="text-danger"> *</span></th>
				<td><select v-model="pblcnUseYn" @change="changeDate">
						<option value="N"><span>기한없음</span></option>
						<option value="Y"><span>기간설정</span></option>
					</select>&emsp;
					<div v-if="pblcnUseYn === 'Y'" style="display: inline-flex">
						<input type="date" v-model="pblcnBgngYmd" />
				        <span style="align-self: center; padding: 0 1rem">~</span>
				        <input type="date" v-model="pblcnEndYmd" />
					</div>
				</td>
			</tr>
			<tr>
				<th class="align-left"><span>파일첨부</span></th>
				<td><div v-if="atchFile != null" class="dp-if">
						<img src="/images/icon06.svg"><span>{{ atchFile }}</span>&emsp;
					</div>
					<div v-if="atchFile === null" class="dp-if"><span>첨부된 파일이 없습니다</span>&emsp;</div>
					<div style="display:inline;"><input type="file" id="upload-image" @change="handleFileChange" hidden/>
						<label for="upload-image">
							<img src="/images/btnSelectFile.svg" class="clickable"/>
						</label>
					</div>
				</td>
			</tr>
			<tr>
				<th><span>내용</span><span class="text-danger"> *</span></th>
				<td><textarea rows="5" v-model="userGdCn" placeholder="내용을 입력하세요">{{ userGdCn }}</textarea></td>
			</tr>
		</table><br>
		<div class="align-center">
			<button class="btn-1" @click="handleClick">등록</button>
			<button class="btn-1" @click="$router.push('/userGdMng')">목록</button>
		</div><br><br><br><br>
		 <ConfirmPopup ref="confirmPopup" :content="confirmPopupContent" />
		 <YesNoPopup ref="yesNoPopup" :content="yesNoPopupContent" />
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import ConfirmPopup from "@/views/components/popup/ConfirmPopup.vue";
import YesNoPopup from "@/views/components/popup/YesNoPopup.vue";
import axios from 'axios';
import { onMounted, ref } from 'vue';
const userGdTrgt = ref("TCHR")
const userGdTtl = ref()
const pblcnUseYn = ref("N")
const pblcnBgngYmd = ref()
const pblcnEndYmd = ref()
const atchFile = ref(null)
const userGdCn = ref()

const confirmPopup = ref(null);
const yesNoPopup = ref(null);
const confirmPopupContent = ref([""]);
const yesNoPopupContent = ref([""]);
const handleClick = async () => {
	//빈값체크
	if(userGdTrgt.value === undefined || userGdTtl.value === undefined || userGdCn.value === undefined
	|| userGdTrgt.value === null || userGdTtl.value === null || userGdCn.value === null
	|| userGdTrgt.value === '' || userGdTtl.value === '' || userGdCn.value === ''){
		confirmPopupContent.value = ["입력되지 않은 항목이 있습니다.",
							"확인 후 다시 시도해 주십시오."]
		const ok = await confirmPopup.value.show();
	} else {
		yesNoPopupContent.value = ["등록 하시겠습니까?"]
		const ok = await yesNoPopup.value.show();
		if (ok) {
			create()
		}
	}
}

const handleFileChange = (e) => {
	atchFile.value = e.target.files[0].name;
}
const create =  () => {
	let formData = new FormData()
	let file = document.getElementById("upload-image")
	formData.append("atchFiles",file.files[0])
    axios.post("/userguide/create",formData, {headers: {'Content-Type': 'multipart/form-data'}, 
    								params:{'userGdTrgt':userGdTrgt.value,
											'userGdTtl':userGdTtl.value,
											'pblcnUseYn':pblcnUseYn.value,
											'pblcnBgngYmd':pblcnBgngYmd.value,
											'pblcnEndYmd':pblcnEndYmd.value,
											'userGdCn':userGdCn.value,
											'userGdUseYn':'Y',
											'userGdStts':'현재버전'}})
    	 .then(() => {
    		router.push('userGdMng')
	})
}
const wrap = ref()
onMounted(() => {
	wrap.value.scrollIntoView();
})

const changeDate = () => {
	if(pblcnUseYn.value == 'Y') {
		pblcnBgngYmd.value = new Date().toJSON().slice(0,10)
		pblcnEndYmd.value = new Date().toJSON().slice(0,10)
	} else {
		pblcnBgngYmd.value = ''
		pblcnEndYmd.value = ''
	}
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
  
textarea {width:800px;height: 200px;resize: none;border:1px solid #E4E1E1;border-radius: 6px;padding:7px 10px 7px 10px;}
</style>

