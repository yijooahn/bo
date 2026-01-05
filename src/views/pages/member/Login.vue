<template>
<div class="div">
    <img class="rectangle-10335" src="/images/emailCertBack.png" />
    <img class="div7" src="/images/logo/logo2.png" />
    <div class="frame-3465953">
        <div class="loginbox">
            <div style="margin: 3rem 0;">
                <div class="logo ct-5">
                    <img src="/images/logo/AIDT.svg">
                    <img src="/images/logo/bologo.svg">
                </div>
            </div>
            <div class="ct-6">
                <div class="bg">
                    <div class="heading">{{ head }}</div>
                </div>
                <div style="width:100%;">
                    <p class="ct-7" :class="status == '인증코드 입력 완료' ? 'line-100' : 'line-250'">|</p>
                </div>
                <div v-if="status == '로그인' || status == '인증하기'" class="ct-8">
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon08.svg" class="ct-10"></div>
                        <div class="ct-11"><span class="font-login th-login">이메일 주소</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12">
                            <input type="email" :disabled="toCert" style="border: none;" v-model.trim="email" required class="text-login" />
                        </div>
                    </div>
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon09.svg" class="ct-10"></div>
                        <div class="ct-11">
                            <span class="font-login th-login">비밀번호</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12"><input type="password" :disabled="toCert" v-model.trim="password" style="border: none;" class="text-login" /></div>
                    </div>
                    <div v-if="status == '인증하기'" class="div-login" style="grid-template-columns: 1fr 3fr 5fr 1fr;">
                        <div class="ct-9"><img src="/images/icon09.svg" class="ct-10"></div>
                        <div class="ct-11">
                            <span class="font-login th-login">인증코드</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12"><input type="text" v-model.trim="tryingCertNum" maxlength="6" style="border: none;" class="text-login" /></div>
                        <div class="ct-13"><span class="timer"> {{ certTime }} </span></div>
                    </div>
                    <div v-if="status == '로그인'">
                        <span class="ct-14">
                            <span class="hover-blue cs-p" @click="router.push('/signUp')">회원가입</span>
                            <span> | </span>
                            <span class="hover-blue cs-p" @click="status='비밀번호 재설정'">비밀번호 재설정</span>
                        </span>
                    </div>
                    <div v-else>
                        <span class="ct-14">
                            <span class="hover-blue cs-p" @click="countDownTrigger();sendLoginCertEmail();">인증코드 재발송</span>
                            <span> | </span>
                            <span class="hover-blue cs-p" @click="reload();">다른 계정으로 로그인</span>
                        </span>
                    </div>
                </div>
                <div v-else-if="status == '비밀번호 재설정'">
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon08.svg" class="ct-10"></div>
                        <div class="ct-11"><span class="font-login th-login">이름</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12"><input type="text" v-model.trim="name" style="border: none;" class="text-login" /></div>
                    </div>
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon08.svg" class="ct-10"></div>
                        <div class="ct-11"><span class="font-login th-login">이메일 주소</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12"><input type="email" v-model.trim="email" style="border: none;" class="text-login" /></div>
                    </div>
                    <div style="margin-top:1rem;"><span>가입하실 때 입력하신 <br> 정보를 기입해 주세요.</span></div>
                </div>
                <div v-else-if="status == '인증코드 입력'">
                    <div class="div-login" style="grid-template-columns: 1fr 3fr 5fr 1fr;">
                        <div class="ct-9"><img src="/images/icon09.svg" class="ct-10"></div>
                        <div class="ct-11">
                            <span class="font-login th-login">인증코드</span>
                            <span class="font-login separate"> | </span>
                        </div>
                        <div class="ct-12">
                            <input type="text" v-model.trim="tryingCertNum" maxlength="6" style="border: none;" class="text-login" />
                        </div>
                        <div class="ct-13"><span class="timer"> {{ certTime }} </span></div>
                    </div>
                    <div>
                        <span class="ct-14">
                            <span class="hover-blue cs-p" @click="countDownTrigger();sendPasswordCertEmail();">인증코드 재발송</span>
                            <span> | </span>
                            <span class="hover-blue cs-p" @click="reload();">다른 계정으로 로그인</span>
                        </span>
                    </div>
                    <div style="margin-top:1rem;"><span>이메일 주소로 보내드린 <br> 인증코드를 입력해 주세요.</span></div>
                </div>
                <div v-else-if="status == '인증코드 입력 완료'">
                    <p style="display: inline-flex;"><span style="text-decoration: underline;">{{email}}</span> 계정의</p>
                    <p>새로운 비밀번호를 입력해 주세요.</p>
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon09.svg" class="ct-10"></div>
                        <div class="ct-11">
                            <span class="font-login th-login">비밀번호</span>
                            <span class="font-login separate" style="left:90px;"> | </span>
                        </div>
                        <div class="ct-12">
                            <input :type="eyeIconOpen ? 'text' : 'password'" style="border: none;" class="text-login" v-model.trim="password" @focus="pwdShow = true" required />
                            <div class="ct-15" @click="eyeIconOpen=!eyeIconOpen">
                                <img v-if="!eyeIconOpen" src="/images/icon11.svg" style="width:25px;height:25px;filter:contrast(0) brightness(1) opacity(0.5)">
                                <img v-else src="/images/icon10.svg" style="width:25px;height:25px;filter:contrast(0) brightness(1) opacity(0.5)">
                            </div>
                        </div>
                    </div>
                    <div class="div-login">
                        <div class="ct-9"><img src="/images/icon09.svg" class="ct-10"></div>
                        <div class="ct-11">
                            <span class="font-login th-login">비밀번호 확인</span>
                            <span class="font-login separate" style="left:90px;"> | </span>
                        </div>
                        <div class="ct-12">
                            <input :type="eyeIconOpen ? 'text' : 'password'" style="border: none;" class="text-login" v-model.trim="confirmPassword" @focus="pwdShow = true" required />
                            <div class="ct-15" @click="eyeIconOpen=!eyeIconOpen">
                                <img v-if="!eyeIconOpen" src="/images/icon11.svg" style="width:25px;height:25px;filter:contrast(0) brightness(1) opacity(0.5)">
                                <img v-else src="/images/icon10.svg" style="width:25px;height:25px;filter:contrast(0) brightness(1) opacity(0.5)">
                            </div>
                        </div>
                    </div>
                    <div v-show="pwdShow && password == ''" class="ct-16" v-if="pwdRule1 && pwdRule2 && pwdRule3 && pwdRule4 && (password == confirmPassword) ? false : true">
                        <div class="input-help text-gray">
                            <div class="icon27-gray" ></div>
                            영어 대소문자, 숫자, 특수문자 세가지 이상 조합 (8~15글자)
                        </div>
                        <div class="input-help text-gray">
                            <div class="icon27-gray" ></div>
                            이메일 주소와 4글자 이상 동일한 비밀번호 사용 불가
                        </div>
                        <div class="input-help text-gray">
                            <div class="icon27-gray" ></div>
                            특수문자 ‘‘!, @, $, %, ^, &, *’ 외 사용 불가
                        </div>
                        <div class="input-help text-gray">
                            <div class="icon27-gray" ></div>
                            3개 이상 연속 되거나 동일한 문자/숫자/특수문자 제외
                        </div>
                        <div class="input-help text-gray">
                            <div class="icon27-gray" ></div>
                            동일한 비밀번호를 입력해 주세요
                        </div>
                    </div>
                    <div v-show="pwdShow && password != ''" class="ct-16" v-if="pwdRule1 && pwdRule2 && pwdRule3 && pwdRule4 && (password == confirmPassword) ? false : true">
                        <div class="input-help" :class="!pwdRule1 ? 'text-red' : 'text-blue'">
                            <div :class="!pwdRule1 ? 'icon27' : 'icon26-blue'" ></div>
                            영어 대소문자, 숫자, 특수문자 세가지 이상 조합 (8~15글자)
                        </div>
                        <div class="input-help" :class="!pwdRule2 ? 'text-red' : 'text-blue'">
                            <div :class="!pwdRule2 ? 'icon27' : 'icon26-blue'" ></div>
                            이메일 주소와 4글자 이상 동일한 비밀번호 사용 불가
                        </div>
                        <div class="input-help" :class="!pwdRule3 ? 'text-red' : 'text-blue'">
                            <div :class="!pwdRule3 ? 'icon27' : 'icon26-blue'" ></div>
                            특수문자 ‘‘!, @, $, %, ^, &, *’ 외 사용 불가
                        </div>
                        <div class="input-help" :class="!pwdRule4 ? 'text-red' : 'text-blue'">
                            <div :class="!pwdRule4 ?  'icon27' : 'icon26-blue'" ></div>
                            3개 이상 연속 되거나 동일한 문자/숫자/특수문자 제외
                        </div>
                        <div class="input-help" :class="password != confirmPassword ? 'text-red' : 'text-blue'">
                            <div :class="password != confirmPassword  ?  'icon27' : 'icon26-blue'" ></div>
                            동일한 비밀번호를 입력해 주세요
                        </div>
                    </div>
                </div>
                <div v-else-if="status == '비밀번호 재설정 완료'">
                    <div>
                        <p>비밀번호 재설정이 완료되었습니다.</p>
                        <p>로그인 화면으로 이동합니다.</p>
                    </div>
                </div>
            </div>
            <div><button class="btn-1 btn-login" @click="clickBtn">{{ btnTxt }}</button></div>
        </div>
    </div>
    <component v-model:isActive="popupIsActive" :alertModal="alertModal" @onReloadHandler="reload()" :is="LoginModal"></component>
</div>
</template>

<script setup lang="ts">
import LoginModal from "@/views/components/popup/SignUpModal.vue";
import CryptoJS from "crypto-js";
//import NodeRSA from 'node-rsa';
import {
    useRouter
} from 'vue-router';

import { useMemberStore } from '@/store/member.js';
import axios from "axios";
import {
    computed,
    onMounted,
    ref,
    watch
} from "vue";
onMounted(() => {})
const status = ref("로그인");
const head = ref("로그인");
const btnTxt = ref("인증하기");
const eyeIconOpen = ref(false);
//const correctCertNo = ref("");
const certId = ref("");
const tryingCertNum = ref("");
const toCert = ref(false);
const router = useRouter();
const name = ref("");
const certTime = ref("5:00");
const countDownSec = ref(300);
const alertModal = ref({
    contentAlign: 'start',
    headerHtml: '<h4>알림</h4>',
    bodyHtml: "<span>입력하신 이메일 주소로 <br> 인증코드를 보냈습니다.</span>",
    width: 'fit-content',
    height: 'fit-content',
    buttons: [{
        clickEvent: 'close',
        content: '확인',
        addClass: 'btn-1'
    }]
});
const popupIsActive = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const pwdShow = ref(false);
const mailHelp = computed(() => {
    const reg = /[@][a-zA-Z0-9-]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*$/;
    return !reg.test(email.value);
});

watch(tryingCertNum,(v)=>{
    var no =  v.replace(/[^0-9+$]/g, '');
    tryingCertNum.value = no + '';
})

// const checkMaxLength = (v) =>{
//     if (v.target.value.length > 6) {
//         tryingCertNum.value = v.target.value.replace(/\D/g, '').slice(0, 6);
//     }
// }

const store = useMemberStore();
const {pr1,pr2,pr3,pr4,removeUserInfo} = store;
const pwdRule1 = computed(()=>{return pr1(password)});
const pwdRule2 = computed(()=>{return pr2(password,email)});
const pwdRule3 = computed(()=>{return pr3(password)});
const pwdRule4 = computed(()=>{return pr4(password)});

const tid = ref(null);
async function checkCertNum() {
    //  if (tryingCertNum.value == "" || countDownSec.value <= 0 || tryingCertNum.value != correctCertNo.value) {
    if (tryingCertNum.value == "") {
        alertModal.value.bodyHtml = "<span>인증코드를 입력해 주세요.</span>";
        alertModal.value.buttons = [{
            clickEvent: 'close',
            content: '확인',
            addClass: 'btn-1'
        }]
        popupIsActive.value = true;
        return false;
    } else if (countDownSec.value <= 0) {
        alertModal.value.bodyHtml = "<span>입력시간이 초과되었습니다. <br> 다시 이메일 인증을 진행해 주세요.</span>";
        alertModal.value.buttons = [{
            clickEvent: 'reload',
            content: '확인',
            addClass: 'btn-1'
        }]
        popupIsActive.value = true;
        return false;
        //  } else if (tryingCertNum.value != correctCertNo.value) {
    } else {
        var membercertDto = {};
        membercertDto.emlAddr = email.value;
        membercertDto.certId = certId.value;
        membercertDto.certNo = tryingCertNum.value;
        try {
            const response = await axios.post('/member/checkcert', membercertDto);
            return true;
        } catch (err) {
            if (err.response != null) {
                if (err.response.data != null) {
                    if (err.response.data.인증상태 != null || err.response.data.회원상태 != null) {
                        if (err.response.data.인증상태 == '인증번호오류') {
                            tryingCertNum.value = "";
                            alertModal.value.bodyHtml = "<span>인증코드가 일치하지 않습니다. <br> 다시 확인해 주세요.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }];
                            popupIsActive.value = true;
                            return false;
                        } else if (err.response.data.인증상태 == '5회오류') {
                            tryingCertNum.value = "";
                            alertModal.value.bodyHtml = "<span>인증코드 인증 실패 5회 초과로 계정이 잠겼습니다. <br> 관리자에게 문의 바랍니다. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'reload',
                                content: '확인',
                                addClass: 'btn-1'
                            }];
                            popupIsActive.value = true;
                            return false;
                        } else if (err.response.data.회원상태 == '사용중지') {
                            alertModal.value.bodyHtml = "<span>사용이 중지된 계정입니다. <br> 상태 변경 후 이용 가능하며, 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }];
                            popupIsActive.value = true;
                            return false;
                        }
                    }
                }
            }
        }
    }

}

function countDownTrigger() {
    window.clearInterval(tid.value);
    countDownSec.value = 300;
    certTime.value = "5:00";
    tid.value = setInterval(() => {
        if (countDownSec.value < 0) {
            window.clearInterval(tid.value);
            return;
        }
        var sec = countDownSec.value % 60;
        var secStr = sec.toString();
        if (sec < 10) {
            secStr = "0" + sec;
        }
        var t = Math.floor(countDownSec.value / 60) + ":" + secStr + "";
        certTime.value = t;
        countDownSec.value = countDownSec.value - 1;
    }, 1000);
}
watch(status, (newVal) => {
    if (newVal == '비밀번호 재설정') {
        head.value = newVal
        btnTxt.value = '이메일 인증'
    } else if (newVal == '인증코드 입력') {
        head.value = newVal
        btnTxt.value = '인증하기'
        countDownTrigger();
    } else if (newVal == '로그인') {
        head.value = newVal
        btnTxt.value = '인증하기'
    } else if (newVal == '인증하기') {
        head.value = '로그인'
        btnTxt.value = '로그인'
        countDownTrigger();
    } else if (newVal == '비밀번호 재설정 완료') {
        head.value = newVal
        btnTxt.value = '로그인 화면으로 이동'
    } else if (newVal == '인증코드 입력 완료') {
        head.value = '비밀번호 재설정'
        btnTxt.value = '변경하기'
    }
})
const sendPasswordCertEmail = async () => {
    var param = {};
    param.emlAddr = email.value;
    param.mbrNm = name.value;
    await axios.post("/member/passwordcert", param)
        .then((response) => {
            if (response.data != null) {
                if (response.data.memberCertDto != null) {
                    const memberCertDto = response.data.memberCertDto;
                    // correctCertNo.value = memberCertDto.certNo;
                    certId.value = memberCertDto.certId;
                    status.value = '인증코드 입력';

                alertModal.value.bodyHtml = "<span>입력하신 이메일 주소로 <br> 인증코드가 전송되었습니다.</span>";
                alertModal.value.buttons = [{
                    clickEvent: 'close',
                    content: '확인',
                    addClass: 'btn-1'
                }]
                popupIsActive.value = true;
                return;
                }
            }

        })
        .catch((error) => {
            if (error.response != null) {
                if (error.response.status != null) {
                    if (error.response.status == 404) {
                        alertModal.value.bodyHtml = "<span>가입하신 정보가 맞지 않습니다. <br>다시 확인해 주세요.</span>";
                    } else if (error.response.status == 500) {
                        alertModal.value.bodyHtml = "<span>메일 발송을 실패하였습니다.</span>";
                    }
                    alertModal.value.buttons = [{
                        clickEvent: 'close',
                        content: '확인',
                        addClass: 'btn-1'
                    }]
                    popupIsActive.value = true;
                    return;
                }
            }
        });
}
const reload = () => {
    location.reload();
    return;
}

async function sendLoginCertEmail() {
    var param = {};
    param.emlAddr = email.value;
    const payload = password.value;
    const hash = CryptoJS.SHA256(payload);
    param.pswd = hash.toString();
    await axios.post("/member/logincert", param)
        .then((response) => {
            const memberCertDto = response.data.memberCertDto;
            //  correctCertNo.value = memberCertDto.certNo;
            certId.value = memberCertDto.certId;
            status.value = '인증하기'
            toCert.value = true;

            alertModal.value.bodyHtml = "<span>입력하신 이메일 주소로 <br> 인증코드가 전송되었습니다.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        })
        .catch((error) => {
            if (error.response != null) {
                if (error.response.data != null) {
                    const msg = error.response.data
                    if (msg.회원여부 != null) {
                        if (msg.회원여부 == '비회원') {
                            alertModal.value.bodyHtml = "<span>이메일 또는 비밀번호를 잘못 입력했습니다. <br>다시 확인해 주세요.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        }
                    } else if (msg.회원상태 != null) {
                        if (msg.회원상태 == '패스워드오류') {
                            alertModal.value.bodyHtml = "<span>계정/비밀번호 정보가 맞지 않습니다. <br> 다시 확인해 주세요.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } else if (msg.회원상태 == '5회오류') {
                            alertModal.value.bodyHtml = "<span>로그인 실패 5회 초과로 계정이 잠겼습니다. <br> 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } else if (msg.회원상태 == '사용중지') {
                            alertModal.value.bodyHtml = "<span>사용이 중지된 계정입니다. <br> 상태 변경 후 이용 가능하며, 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } else if (msg.회원상태 == '반려') {
                            alertModal.value.bodyHtml = "<span>계정 승인이 거절되었습니다. <br> 자세한 사항은 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } else if (msg.회원상태 == '승인대기') {
                            alertModal.value.bodyHtml = "<span>가입 신청 승인 대기 상태입니다. <br> 승인 완료 후 이용 가능하며, 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        }
                    } else if (msg.message != null) {
                        if (msg.message.includes('발송')) {
                            alertModal.value.bodyHtml = "<span>인증코드 이메일 발송을 실패하였습니다.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        }
                    }
                    return;
                }
            }
            // email.value = "";
            // password.value = "";
        });
}

const clickBtn = async () => {
    if (status.value == '비밀번호 재설정') {
        if (email.value == "" || mailHelp.value) {
            alertModal.value.bodyHtml = "<span>이메일 주소를 올바르게 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        }
        if (name.value == "") {
            alertModal.value.bodyHtml = "<span>등록하신 이름을 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        }
        var param = {};
        param.emlAddr = email.value;
        param.mbrNm = name.value;
        await axios.post("/member/checkemail", param)
            .then((response) => {
                if (response.data != null) {
                    if (response.data.회원여부 != null) {
                        if (response.data.회원여부 == "비회원") {
                            email.value = "";
                            name.value = "";
                            alertModal.value.bodyHtml = "<span>가입하신 정보가 맞지 않습니다. <br>다시 확인해 주세요.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                            return;
                        } else if (response.data.회원여부 == "회원") {
                            sendPasswordCertEmail();
                        }
                    }
                }
            })
            .catch((err) => {
                if (err.repsonse != null) {
                    if (err.response.status != null) {}
                }
            });

    } else if (status.value == '인증코드 입력') {
        const checked = await checkCertNum();
        if (!checked) {
            return;
        } else {
            password.value = "";
            status.value = '인증코드 입력 완료';
        }
    } else if (status.value == '로그인') {
        if (email.value == "" || mailHelp.value || password.value == "") {
            alertModal.value.bodyHtml = "<span>이메일 또는 비밀번호를 잘못 입력했습니다. <br> 다시 확인해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        } else {
            sendLoginCertEmail();

        }
    } else if (status.value == '인증하기') {
        const checked = await checkCertNum();
        if (!checked) {
            return;
        }
        if (email.value == "" || mailHelp.value) {
            alertModal.value.bodyHtml = "<span>이메일 주소를 올바르게 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        } else if (password.value == "") {
            alertModal.value.bodyHtml = "<span>비밀번호를 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        } else {
            var param = {};
            param.emlAddr = email.value;
            const payload = password.value;
            const hash = CryptoJS.SHA256(payload);
            param.pswd = hash.toString();
            //       const publicKey = await getPublicKey();
            //        const key = new NodeRSA(publicKey);
            //        param.pswd = key.encrypt(payload, 'base64');
            await axios.post("/member/login", param)
                .then((response) => {
                    const headers = response.headers;
                    if (
                        headers["authorization"] != null &&
                        headers["logged-id"] != null &&
                        headers["logged-email-addr"] != null &&
                        headers["logged-name"] != null
                    ) {
                        const auth = headers["authorization"];
                        const loginid = headers["logged-id"];
                        const loginaddr = headers["logged-email-addr"];
                        //     const loginname = decodeURI(headers["logged-name"]);
                        const jsonInfo = JSON.stringify({
                            jwt: auth,
                            memberId: loginid,
                            emlAddr: loginaddr,
                            //     memberNm: loginname,
                            memberNm: headers["logged-name"],
                        });
                        document.cookie = `UserInfo = ${jsonInfo}; path=/`
                    }

                    var now = new Date();
                    let dateFormat = now.getFullYear() + '년 ' + (now.getMonth() + 1) + '월 ' +
                        now.getDate() + '일 ' + now.getHours() + '시 ' + now.getMinutes() + '분 ' +
                        now.getSeconds() + '초'
                    document.cookie = 'lastLoggedIn = ' + encodeURI(dateFormat) + '; path=/';
                    //localStorage.setItem("lastLoggedIn", dateFormat);
                    router.push("/");
                })
                .catch((error) => {
                    // debugger;
                    if (error.response.data != null) {
                        const msg = error.response.data;
                        if (msg.includes("권한")) {
                            alertModal.value.bodyHtml = "<span>권한 부여 대기 상태입니다. <br> 승인 완료 후 이용 가능하며, 관리자에게 문의해 주세요. <br> (service@oooa.com)</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } else if (msg.includes('세션')) {
                            alertModal.value.bodyHtml = "<span>인증 토큰 발급에 실패하였습니다.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        } /*else if (msg.includes('허용되지 않은 IP')) {
                            alertModal.value.bodyHtml = "<span>접속이 허용되지 않은 IP 입니다.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'close',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                        }*/
                    }
                    return;
                })
                .finally((response) => {});
        }
    } else if (status.value == '비밀번호 재설정 완료') {
        await axios.get("/member/logout").finally(() => {
            removeUserInfo();
            location.reload();
        });
    } else if (status.value == '인증코드 입력 완료') {
        if (email.value == "") {
            alertModal.value.bodyHtml = "<span>이메일 주소를 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'reload',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        } else if (password.value == "") {
            alertModal.value.bodyHtml = "<span>새로운 비밀번호를 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        } else if (confirmPassword.value == "") {
            alertModal.value.bodyHtml = "<span>비밀번호 확인을 입력해 주세요.</span>";
            alertModal.value.buttons = [{
                clickEvent: 'close',
                content: '확인',
                addClass: 'btn-1'
            }]
            popupIsActive.value = true;
            return;
        }
        const isValid = pwdRule1.value && pwdRule2.value && pwdRule3.value && pwdRule4.value && (password.value == confirmPassword.value);
        if (!isValid) {
            return;
        }
        param = {};
        param.emlAddr = email.value;
        const payload = password.value;
        const hash = CryptoJS.SHA256(payload);
        param.pswd = hash.toString();
        param.certId = certId.value
        await axios.post("/member/passwordreset", param)
            .then((response) => {
                status.value = '비밀번호 재설정 완료';
            })
            .catch((error) => {
                confirmPassword.value = "";
                password.value = "";
                if (error.response != null) {
                    if (error.response.status != null) {
                        if (error.response.status == 404) {
                            alertModal.value.bodyHtml = "<span>가입하신 정보가 맞지 않습니다. <br>다시 확인해 주세요.</span>";
                        } else if (error.response.status == 500) {
                            alertModal.value.bodyHtml = "<span>새로운 비밀번호를 입력해 주세요.</span>";
                        } else if (error.response.status == 406) {
                            alertModal.value.bodyHtml = "<span>기존 비밀번호와 다른 <br> 비밀번호를 입력해 주세요.</span>";
                        } else if (error.response.status == 304) {
                            alertModal.value.bodyHtml = "<span>비밀번호 재설정을 실패했습니다.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'reload',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                            return;
                        } else if (error.response.status == 403) {
                            alertModal.value.bodyHtml = "<span>장시간 이용이 없어 로그인 화면으로 이동합니다.</span>";
                            alertModal.value.buttons = [{
                                clickEvent: 'reload',
                                content: '확인',
                                addClass: 'btn-1'
                            }]
                            popupIsActive.value = true;
                            return;
                        }
                        alertModal.value.buttons = [{
                            clickEvent: 'close',
                            content: '확인',
                            addClass: 'btn-1'
                        }]
                        popupIsActive.value = true;
                        return;
                    }
                }
            })
            .finally((response) => {});

    }
}
</script>

<style scoped>
input[type="text"],
input[type="email"],
input[type="password"],
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    width: 100%;
}

p {
    margin-block: 0.5rem;
}

.line-100 {
    line-height: 100%;
}

.line-250 {
    line-height: 250%;
}

.div,
.div * {
    box-sizing: border-box;
}

.div {
    background: #ffffff;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
}

.div2 {
    position: absolute;
    inset: 0;
}

.input-help {
    font-size: 13px;
    line-height: 100%;
    letter-spacing: -0.35px;
    text-align: start;
    width: 100%;
    margin-left: 1.5rem;
    display: inline-flex;
}

.rectangle-10335 {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    left: 0px;
    top: 0px;
    object-fit: cover;
}

.div3 {
    opacity: 0.5;
    width: 1884.75px;
    height: 1355px;
    position: static;
}

.rectangle-10340 {
    background: #edf0f7;
    width: 1600px;
    height: 1355px;
    position: absolute;
    left: 0px;
    top: 0px;
}

.image-37 {
    width: 1884.75px;
    height: 1141.87px;
    position: absolute;
    left: -142.29px;
    top: 106.07px;
    object-fit: cover;
}

.frame-3465953 {
    background: #ffffff;
    border-radius: 20px;
    width: 440px;
    height: 640px;
    position: absolute;
    left: calc(50% - 220px);
    top: calc(50% - 319.5px);
    box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.4);
    margin: 0 auto;
    padding: 2rem;
}

.group-1263 {
    position: absolute;
    inset: 0;
}

.group-1207 {
    width: 320px;
    height: 188px;
    position: static;
}

.btn {
    width: 320px;
    height: 46px;
    position: static;
}

.rectangle-10317 {
    background: var(--blue, #4876ef);
    border-radius: 6px;
    width: 320px;
    height: 46px;
    position: absolute;
    left: 60px;
    top: 429px;
}

.div4 {
    color: #ffffff;
    text-align: center;
    font-family: 'SpoqaHanSansNeo-Medium', sans-serif;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    left: calc(50% - 59px);
    top: 442px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.div5 {
    color: #373f57;
    text-align: center;
    font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    position: absolute;
    left: calc(50% - 100px);
    top: 358px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tit {
    width: 250px;
    height: 50px;
    position: static;
}

.bg {
    background: #eff5ff;
    width: fit-content;
    height: 25px;
    margin: 0 auto;
}

.heading {
    all: unset;
    color: #373f57;
    text-align: center;
    font-family: SpoqaHanSansNeoBold;
    font-size: 36px;
    line-height: 0%;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.line-9 {
    border-style: solid;
    border-color: rgba(72, 118, 239, 0.3);
    border-width: 2px 0 0 0;
    width: 30px;
    height: 0px;
    position: absolute;
    left: calc(50% - 1px);
    top: 227px;
    transform-origin: 0 0;
    transform: rotate(90deg) scale(1, 1);
}

.div6 {
    width: 305px;
    height: 32px;
    position: absolute;
    left: 67px;
    top: 165px;
    overflow: visible;
}

.div7 {
    width: 280px;
    height: 120px;
    position: absolute;
    left: 60px;
    top: 60px;
    object-fit: cover;
}

.bg-back {
    background: #edf0f7;
    height: 100%;
    width: 100%;
}

.bg-img {
    height: 100vh;
    overflow: hidden;
    margin: 0;
    background-image: url("/images/background_login.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.loginbox {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    place-content: space-around;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5% 0;
}

.btn-login {
    width: 270px;
    height: 3rem;
    align-items: center;
    place-content: center;
    cursor: pointer;
    font-size: 16px;
}

.div-login::before {
    margin: 2rem 0;
}

.div-login {
    display: grid;
    width: 320px;
    height: 46px;
    border: 1.5px solid #e2e5eb;
    border-radius: 6px;
    grid-template-columns: 1fr 3fr 6fr;
    margin: 0 auto;
    line-height: 100%;
}

.div-login:focus {
    border-color: #4876ef;
}

.font-login {
    font-size: 14px;
    color: #C4C8CA;
    padding: 0 0.5rem;
    left: 0;
}

.th-login {
    position: absolute;
    height: 100%;
    align-content: center;
}

.separate {
    position: absolute;
    height: 100%;
    align-content: center;
    left: 70px;
}

.text-login,
.text-login:focus {
    margin-right: 0px;
    width: 209px;
    border: 0px;
  /*  transform: translateX(73px);*/
    font-size: 14px;
    font-weight: 500;
    color: #4876EF;
}

.timer {
    color: #C4C8CA;
    line-height: 100%;
}

.hover-blue:hover {
    color: #4876ef;
}
</style>
