<template>
  <div>
    <p class="breadcrumb">로그인 > 회원가입</p>
    <p class="heading">회원가입</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <tbody>
          <tr>
            <th>
              <span>이메일 주소</span>
              <span class="text-red"> *</span>
            </th>
            <td>
              <div>
                <input
                  type="email"
                  v-model.trim="email"
                  :disabled="certNum.complete"
                  required
                />
                <div class="btn-4" @click="emailCertCheck">
                  <div class="div">이메일 인증</div>
                </div>
              </div>
              <div>
                <div v-if="mailHelp" class="text-red">
                  <span
                    ><label class="ic4"></label>이메일을 올바르게 입력해
                    주세요.</span
                  >
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th><span>이름</span><span class="text-red"> *</span></th>
            <td>
              <div>
                <input
                  type="text"
                  maxlength="100"
                  v-model.trim.lazy="memberName"
                  required
                />
              </div>
            </td>
          </tr>
          <tr v-if="certNum.isActive">
            <th><span>인증코드 확인</span><span class="text-red"> *</span></th>
            <td>
              <div>
                <input
                  type="text"
                  maxlength="6"
                  v-model.trim="tryValue"
                  :disabled="certNum.complete"
                  required
                />
                <span v-if="!certNum.complete" class="text-gray">
                  {{ certNum.restTime }}
                </span>
                <div class="btn-4" @click="verifyCertNum">
                  <div class="div">확인</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th><span>비밀번호</span><span class="text-red"> *</span></th>
            <td>
              <div>
                <input
                  type="password"
                  v-model.trim="password"
                  @focus="pwdShow = true"
                  placeholder="영어 대소문자, 숫자, 특수문자 세 가지 이상 조합(8~15글자)"
                  required
                />
              </div>
              <div
                v-show="pwdShow && password == ''"
                style="display: block"
                v-if="
                  pwdRule1 &&
                  pwdRule2 &&
                  pwdRule3 &&
                  pwdRule4 &&
                  password == confirmPassword
                    ? false
                    : true
                "
              >
                <div class="input-help text-gray">
                  <div class="icon27-gray"></div>
                  영어 대소문자, 숫자, 특수문자 세가지 이상 조합 (8~15글자)
                </div>
                <div class="input-help text-gray">
                  <div class="icon27-gray"></div>
                  이메일 주소와 4글자 이상 동일한 비밀번호 사용 불가
                </div>
                <div class="input-help text-gray">
                  <div class="icon27-gray"></div>
                  특수문자 ‘‘!, @, $, %, ^, &, *’ 외 사용 불가
                </div>
                <div class="input-help text-gray">
                  <div class="icon27-gray"></div>
                  3개 이상 연속 되거나 동일한 문자/숫자/특수문자 제외
                </div>
              </div>
              <div
                v-show="pwdShow && password != ''"
                style="display: block"
                v-if="
                  pwdRule1 && pwdRule2 && pwdRule3 && pwdRule4 ? false : true
                "
              >
                <div
                  class="input-help"
                  :class="!pwdRule1 ? 'text-red' : 'text-blue'"
                >
                  <div :class="!pwdRule1 ? 'icon27' : 'icon26-blue'"></div>
                  영어 대소문자, 숫자, 특수문자 세가지 이상 조합 (8~15글자)
                </div>
                <div
                  class="input-help"
                  :class="!pwdRule2 ? 'text-red' : 'text-blue'"
                >
                  <div :class="!pwdRule2 ? 'icon27' : 'icon26-blue'"></div>
                  이메일 주소와 4글자 이상 동일한 비밀번호 사용 불가
                </div>
                <div
                  class="input-help"
                  :class="!pwdRule3 ? 'text-red' : 'text-blue'"
                >
                  <div
                    class="icon26-blue"
                    :class="!pwdRule3 ? 'icon27' : 'icon26-blue'"
                  ></div>
                  특수문자 ‘‘!, @, $, %, ^, &, *’ 외 사용 불가
                </div>
                <div
                  class="input-help"
                  :class="!pwdRule4 ? 'text-red' : 'text-blue'"
                >
                  <div :class="!pwdRule4 ? 'icon27' : 'icon26-blue'"></div>
                  3개 이상 연속 되거나 동일한 문자/숫자/특수문자 제외
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span> 비밀번호 확인 </span>
              <span class="text-red"> *</span>
            </th>
            <td>
              <div>
                <input
                  type="password"
                  v-model.trim="confirmPassword"
                  required
                />
              </div>
              <div v-if="confirmPassword != password" class="text-red">
                <span
                  ><label class="ic4"></label>동일한 비밀번호를 입력해
                  주세요.</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tit"></div>
      <label>상세 정보</label>
      <table class="table-1">
        <tbody>
          <tr>
            <th>
              <span>소속기관</span>
              <span class="text-red"> *</span>
            </th>
            <td>
              <div>
                <component
                  :is="Select"
                  v-model:selected="gigwanType"
                  :options="['oooo', '협력사', '프리랜서', '기타']"
                ></component>
                <input type="text" v-model.trim="gigwanName" required />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>설명</span></th>
            <td>
              <div>
                <input type="text" v-model.trim="description" required />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ct-17">
        <button class="btn-1" @click="triggerSubmit">가입신청</button>
        <button class="btn-3" @click="router.push('/login')">취소</button>
      </div>
      <sign-up-modal
        v-model:isActive="popupIsActive"
        @onReloadHandler="reload()"
        @onRelocateHandler="router.push('/login')"
        :alertModal="alertModal"
      ></sign-up-modal>
    </div>
  </div>
</template>
    
    <script setup lang="ts">
import { useRouter } from "vue-router";

import { useMemberStore } from "@/store/member.js";
import Select from "@/views/components/Select.vue";
import SignUpModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import { computed, ref, watch } from "vue";
const tryValue = ref("");
const router = useRouter();
const email = ref("");
const certNum = ref({
  tryValue: "",
  //correctValue: "",
  isActive: false,
  countDownSec: 300,
  restTime: "5:00",
  complete: false,
});
const memberName = ref("");
const password = ref("");
const pwdShow = ref(false);
const confirmPassword = ref("");
const gigwanType = ref("oooo");
const gigwanName = ref("");
const description = ref("");
const memberCertDto = ref(null);
const popupIsActive = ref(false);
const certId = ref(null);
const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>입력하신 이메일 주소로 <br> 인증코드를 보냈습니다.</span>",
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
const tid = ref(null);
const store = useMemberStore();
const { pr1, pr2, pr3, pr4 } = store;
const pwdRule1 = computed(() => {
  return pr1(password);
});
const pwdRule2 = computed(() => {
  return pr2(password, email);
});
const pwdRule3 = computed(() => {
  return pr3(password);
});
const pwdRule4 = computed(() => {
  return pr4(password);
});

watch(memberName, (v) => {
  memberName.value = v.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim,
    ""
  );
});
watch(tryValue, (v) => {
  var no = v.replace(/[^0-9+$]/g, "");
  tryValue.value = no + "";
  certNum.value.tryValue = tryValue.value;
});
// const checkMaxLength = (v) =>{
//     // 숫자만 허용하고 6자리로 제한합니다.
//     if (v.target.value.length > 6) {
//         certNum.value.tryValue = v.target.value.replace(/\D/g, '').slice(0, 6);
//     }
// }
// const checkMaxLength = (v) => {
//     var a = Math.round(v.target.value).toString().replace(/[^0-9]/g,'');
//     if(a.length>6){
//         a = a.slice(0,6);
//     }
//     certNum.value.tryValue=a;
//     //certNum.value.tryValue = Math.round(v.target.value).replace(/[0-9]/g,'').splice(0,6);
// }
const mailHelp = computed(() => {
  const reg = /[@][a-zA-Z0-9-]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*$/;
  return !reg.test(email.value);
});
async function emailCertCheck() {
  certNum.value.complete = false;
  var param = {};
  if (email.value == "") {
    alertModal.value.bodyHtml =
      "<span>이메일 주소를 <br> 입력해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  } else if (mailHelp.value) {
    alertModal.value.bodyHtml =
      "<span>올바른 이메일 주소를 <br> 입력해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  }
  param.emlAddr = email.value;
  await axios
    .post("/member/emailcert", param)
    .then((response) => {
      //console.log(response.data);
      memberCertDto.value = response.data.memberCertDto;
      certId.value = memberCertDto.value.certId;
      //   certNum.value.correctValue = memberCertDto.value.certNo;
      alertModal.value.bodyHtml =
        "<span>입력하신 이메일 주소로 <br> 인증코드를 보냈습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;

      certNum.value.isActive = true;
      certNum.value.countDownSec = 300;
      certNum.value.restTime = "";
      window.clearInterval(tid.value);
      tid.value = setInterval(() => {
        if (certNum.value.countDownSec < 0) {
          window.clearInterval(tid.value);
          return;
        }
        var sec = certNum.value.countDownSec % 60;
        var secStr = sec.toString();
        if (sec < 10) {
          secStr = "0" + sec;
        }
        var t = Math.floor(certNum.value.countDownSec / 60) + ":" + secStr + "";
        certNum.value.restTime = t;
        certNum.value.countDownSec--;
      }, 1000);
    })
    .catch((error) => {
      email.value = "";
      const msg = error.response.data.message;
      if (msg.includes("중복")) {
        alertModal.value.bodyHtml =
          "<span>입력하신 이메일 주소는 <br> 이미 가입하신 이메일 주소입니다.</span>";
        alertModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
      } else {
        alertModal.value.bodyHtml =
          "<span>인증코드 메일 발송을 <br> 실패했습니다. </span>";
        alertModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
      }
      popupIsActive.value = true;
      return;
    })
    .finally((response) => {});
}

async function verifyCertNum() {
  if (certNum.value.countDownSec <= 0) {
    alertModal.value.bodyHtml =
      "<span>입력시간이 초과되었습니다. <br> 다시 이메일 인증을 진행해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "reload",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } else if (certNum.value.tryValue != "") {
    var membercertDto = {};
    membercertDto.emlAddr = email.value;
    membercertDto.certId = certId.value;
    membercertDto.certNo = certNum.value.tryValue;
    try {
      const response = await axios.post("/member/checkcert", membercertDto);
      certNum.value.complete = true;
      alertModal.value.bodyHtml =
        "<span>이메일이 인증되었습니다. <br> 회원가입을 진행해 주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
    } catch (err) {
      if (err.response != null) {
        if (err.response.data != null) {
          if (err.response.data.인증상태 != null) {
            if (err.response.data.인증상태 == "인증번호오류") {
              certNum.value.tryValue = "";
              alertModal.value.bodyHtml =
                "<span>인증코드가 일치하지 않습니다. <br> 다시 확인해 주세요.</span>";
              alertModal.value.buttons = [
                {
                  clickEvent: "close",
                  content: "확인",
                  addClass: "btn-1",
                },
              ];
              popupIsActive.value = true;
            } else if (err.response.data.인증상태 == "재인증") {
              certNum.value.tryValue = "";
              alertModal.value.bodyHtml =
                "<span>인증코드 인증 실패 5회 초과로 계정이 잠겼습니다. <br> 관리자에게 문의 바랍니다. <br> (service@oooa.com)</span>";
              alertModal.value.buttons = [
                {
                  clickEvent: "reload",
                  content: "확인",
                  addClass: "btn-1",
                },
              ];
              popupIsActive.value = true;
            }
          }
        }
      }
    }
    /*
                } else {
                    alertModal.value.bodyHtml =
                        "<span>인증코드가 맞지 않습니다. <br> 다시 이메일 인증을 진행해 주세요.</span>";
                    alertModal.value.buttons = [{
                        clickEvent: 'reload',
                        content: '확인',
                        addClass: 'btn-1'
                    }]
                    popupIsActive.value = true;
                    */
  }
}

async function triggerSubmit() {
  //필수항목검사
  if (
    email.value == "" ||
    password.value == "" ||
    confirmPassword.value == "" ||
    gigwanType.value == "" ||
    certId.value == null ||
    memberCertDto.value == null ||
    memberName.value == ""
  ) {
    alertModal.value.bodyHtml =
      "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } else if (password.value != confirmPassword.value) {
    alertModal.value.bodyHtml = "<span>비밀번호를 다시 확인해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } else if (
    pwdRule1.value &&
    pwdRule2.value &&
    pwdRule3.value &&
    pwdRule4.value
  ) {
    if (!certNum.value.complete) {
      alertModal.value.bodyHtml = "<span>인증코드 입력을 확인해 주세요.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
    } else {
      var param = {};
      param.emlAddr = email.value;
      const payload = password.value;
      const hash = CryptoJS.SHA256(payload);
      param.pswd = hash.toString();
      param.mbrNm = memberName.value;
      param.ogdpInst = gigwanType.value;
      if (description.value != "") {
        param.expln = description.value;
      }
      param.certId = certId.value;
      if (gigwanName.value != "") {
        param.ogdpDep = gigwanName.value;
      }

      await axios
        .post("/member/join", param)
        .then((response) => {
          //console.log(response.data);
          router.push("/afterSignUp");
        })
        .catch((error) => {
          const msg = error.response.data.message;
          if (msg.includes("중복아이디")) {
            alertModal.value.bodyHtml =
              "<span>입력하신 이메일 주소는 <br> 이미 가입하신 이메일 주소입니다.</span>";
            alertModal.value.buttons = [
              {
                clickEvent: "close",
                content: "확인",
                addClass: "btn-1",
              },
            ];
            popupIsActive.value = true;
          } else if (msg.includes("INVALID")) {
            alertModal.value.bodyHtml =
              "<span>입력하신 정보를 확인해 주세요.</span>";
            alertModal.value.buttons = [
              {
                clickEvent: "close",
                content: "확인",
                addClass: "btn-1",
              },
            ];
            popupIsActive.value = true;
          } else if (msg.includes("인증확인시간만료")) {
            alertModal.value.bodyHtml =
              "<span>장시간 이용이 없어 로그인 화면으로 이동합니다.</span>";
            alertModal.value.buttons = [
              {
                clickEvent: "relocate",
                content: "확인",
                addClass: "btn-1",
              },
            ];
            popupIsActive.value = true;
          }
          return;
        });
    }
  } else {
    alertModal.value.bodyHtml = "<span>비밀번호를 확인해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
}
</script>
    
    <style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>
    