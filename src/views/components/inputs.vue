<template>
<div>
    <button class="btn-1">등록</button>
    <button class="btn-2">삭제</button>
    <button class="btn-3">목록</button>
    <input type="radio" checked><label>선택됨</label>
    <input type="radio"><label>선택안함</label>
    <input type="radio" disabled><label>비활성</label>
    <input type="checkbox" checked><label>선택됨</label>
    <input type="checkbox"><label>선택안함</label>
    <input type="checkbox" disabled><label>비활성</label>
    <input type="text" placeholder="텍스트입력">
    <input type="text" value="텍스트입력">
    <input type="text" placeholder="텍스트입력" disabled>
    <!--<Select @onChange="//console.log(v)" :options="['10개씩 보기','20개씩 보기','30개씩 보기','50개씩 보기','100개씩 보기']"></Select>-->
    <input type="date">
    <img src="/images/icon01.svg">
    <img src="/images/icon02.svg">
    <img src="/images/icon03.svg">
    <img src="/images/icon04.svg">
    <img src="/images/icon05.svg">
    <img src="/images/icon06.svg">
    <img src="/images/icon07.svg">
    <img src="/images/icon08.svg"><br>
    <img src="/images/icon09.svg">
    <img src="/images/icon10.svg">
    <img src="/images/icon11.svg">
    <img src="/images/icon12.svg">
    <img src="/images/icon13.svg">
    <img src="/images/icon14.svg">
    <img src="/images/icon15.svg">
    <img src="/images/icon16.svg">
    <img src="/images/icon17.svg">
    <img src="/images/icon19.svg"><br>
    <img src="/images/icon20.svg">
    <img src="/images/icon21.svg">
    <img src="/images/icon22.svg">
    <img src="/images/icon23.svg">
    <img src="/images/icon24.svg">
    <img src="/images/icon25.svg">
    <img src="/images/icon26.svg">
    <img src="/images/icon27.svg">
    <img src="/images/icon28.svg">
    <img src="/images/icon29.svg">
    <img src="/images/Group1251.svg">
    <img src="/images/Group1252.svg">
    <img src="/images/Group1253.svg">

</div>
<div>

    <Pagination2></Pagination2>
    <div class="tit"></div><label>기본 정보</label>
    <div class="logo">
        <div class="logo1"></div>
        <div class="logo2"></div>
        <div class="logo3"></div>
        <div class="logo4"></div>
    </div>
    <img src="/images/logo/fullLogo.svg">
    <div class="small-pop">
        <div class="small-pop-header">
            <div class="small-pop-close"></div>
        </div>
        <div class="small-pop-inner"> 123<br>이용방법을 알아보세요</div>
    </div>

    <div class="input-help"><img src="/images/icon26.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:#F05050;"><img src="/images/icon26.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:4876EF;"><img src="/images/icon26.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help"><img src="/images/icon27.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:#F05050;"><img src="/images/icon27.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:#4876EF;"><img src="/images/icon27.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help"><img src="/images/icon28.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:#F05050;"><img src="/images/icon28.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
    <div class="input-help" style="color:#4876EF;"><img src="/images/icon28.svg" class="input-help-icon1">영어 대소문자, 숫자, 특수문자 세가지 이상 조합자</div>
</div>
<div>
</div>

<ToggleSwitch active="admin"></ToggleSwitch>
<br>
<ToggleSwitch active="lrs"></ToggleSwitch>
>
<ToggleSwitch active="lcms"></ToggleSwitch>

<div style="display:flex;">
    <Tab :first="true" :active="true" title="첫번째 탭 선택됨"></Tab>
    <Tab :first="false" :active="false" title="기본 탭 선택 안됨"></Tab>
    <Tab :first="false" :active="false" title="기본 탭 선택 안됨"></Tab>
</div>
<div style="display:flex;">
    <Tab :first="true" :active="false" title="첫번째 탭 선택 안됨"></Tab>
    <Tab :first="false" :active="false" title="기본 탭 선택 안됨"></Tab>
    <Tab :first="false" :active="true" title="기본 탭 선택됨"></Tab>
    <Tab :first="false" :active="false" title="기본 탭 선택 안됨"></Tab>
</div>
<div style=" display: flex;flex-direction: column;align-items: flex-start;gap: 8px;padding: 0.5rem;">
    <MenuList :menuList="menu"></MenuList>
</div>
</template>

<script>
import Pagination2 from '../components/Pagination.vue'
import Select from '../components/Select.vue'
import Tab from '../components/Tab.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'
import MenuList from './MenuList.vue'
export default {
    components: {
        Select,
        Pagination2,
        ToggleSwitch,
        Tab,
        MenuList
    },
    props: {},
    data() {
        return {
            menu: [{
                    value: 'LCMS',
                    icon: true,
                    depth: 1,
                    show: true
                },
                {
                    value: '콘텐츠관리',
                    icon: false,
                    depth: 2,
                    show: true,
                    path: '/contentsMng'
                },
                {
                    value: '문항관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '모듈관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '코스관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '학습맵',
                    icon: true,
                    depth: 1,
                    show: true
                },
                {
                    value: '학습맵관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '지식맵관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '교육과정표준체계',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: '코스관리',
                    icon: false,
                    depth: 2,
                    show: true
                },
                {
                    value: 'LRS',
                    icon: false,
                    depth: 1,
                    show: true
                },
                {
                    value: '콘텐츠 통계',
                    icon: true,
                    depth: 1,
                    show: true
                },
                {
                    value: '콘텐츠 통계 depth2',
                    icon: true,
                    depth: 2,
                    show: false
                },
                {
                    value: '콘텐츠 통계 depth3',
                    icon: false,
                    depth: 3,
                    show: false
                },
                {
                    value: '콘텐츠 통계 depth3',
                    icon: false,
                    depth: 3,
                    show: false,
                    disabled: true
                }
            ]
        }
    },
    methods: {},
}
</script>

<style scoped>

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
    color: #5C667B;
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
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
    border: 1px solid #EDEEF0;
    background: #FFF;
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
    content: url('/images/smallpopclose.svg');
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
    color: #5C667B;
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
    background: url('/images/logo/img_logo1.svg') lightgray 50% / cover no-repeat;
}

.logo2::after {
    width: 9.898px;
    height: 10px;
    flex-shrink: 0;
    content: url('/images/logo/Group1198.svg')
}

.logo3::after {
    width: 59.978px;
    height: 19px;
    flex-shrink: 0;
    content: url('/images/logo/AIDT.svg');
    line-height: 19px;
    vertical-align: bottom;
}

.logo4::after {
    width: 117.525px;
    height: 17.67px;
    flex-shrink: 0;
    content: url('/images/logo/bologo.svg');
    line-height: 17.67px;
    vertical-align: bottom;
}

label {
    all: unset;
    color: var(--black, #373F57);
    font-family: SpoqaHanSansNeo;
    font-style: normal;
    line-height: 150%;
    letter-spacing: -0.35px;
    vertical-align: middle;
}
</style>
