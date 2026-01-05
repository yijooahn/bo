<template>
  <div>
    <p class="breadcrumb">계정권한 > 계정관리</p>
    <p class="heading">시스템관리자 계정 생성</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <span>관리자 이메일</span>
              <span class="text-red"> *</span>
            </th>
            <td>
              <div>
                <input
                  type="email"
                  v-model.trim.lazy="email"
                  :disabled="dupCheck"
                  required
                />
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
                <input type="text" v-model.trim.lazy="memberName" required />
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
          <tr>
            <th>
              <span>상태</span>
              <span class="text-red"> *</span>
            </th>
            <td>
              <div>
                <input
                  type="radio"
                  name="mbrStts"
                  v-model="mbrStts"
                  value="1"
                  checked
                />
                <label>승인(사용)</label>
                <input
                  type="radio"
                  name="mbrStts"
                  v-model="mbrStts"
                  value="4"
                />
                <label>사용 중지</label>
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
                <input type="text" v-model.trim="gigwanName" />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>설명</span></th>
            <td>
              <div>
                <input type="text" v-model.trim="description" />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>접근 IP</span><span class="text-red"> *</span></th>
            <td>
              <div class="dp-b">
                <input
                  type="text"
                  maxlength="200"
                  v-model.trim="acsIp"
                  @input="validateAllowedIp"
                  @keydown="handleKeydown($event)"
                  required
                />
                <div class="text-red">
                  <span
                    ><label class="ic4"></label>여러 IP 등록 시 쉼표(,)를
                    사용하여 등록해 주세요.</span
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ct-17">
        <button class="btn-1" @click="triggerSubmit">저장</button>
        <button class="btn-3" @click="router.push('/accountMng')">취소</button>
      </div>
      <account-reg-modal
        v-model:isActive="popupIsActive"
        @on-reload-handler="() => goList()"
        :alertModal="alertModal"
      ></account-reg-modal>
    </div>
  </div>
</template>

    
<script setup lang="ts">
import { useMemberStore } from "@/store/member.js";
import Select from "@/views/components/Select.vue";
import AccountRegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
const goList = () => {
  router.push("/accountMng");
};
const router = useRouter();
const email = ref("");
const memberName = ref("");
const password = ref("");
const pwdShow = ref(false);
const confirmPassword = ref("");
const gigwanType = ref("oooo");
const gigwanName = ref("");
const description = ref("");
const acsIp = ref("");
const popupIsActive = ref(false);
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
const dupCheck = ref(false);
const mbrStts = ref("1");
const mailHelp = computed(() => {
  const reg = /[@][a-zA-Z0-9-]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*$/;
  return !reg.test(email.value);
});
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

const validateAllowedIp = () => {
  let formattedValue = acsIp.value
    .replace(/\s+/g, "") // 모든 공백 제거
    .replace(/[^0-9.,]/g, ""); // 숫자, 점, 쉼표 외의 문자 제거

  if (formattedValue.startsWith(".") || formattedValue.startsWith(",")) {
    formattedValue = formattedValue.slice(1); // 처음이 점(.)이나 쉼표(,)로 시작하지 않도록 처리
  }

  acsIp.value = formattedValue
    .replace(/(\.\,|\,\.)/g, ".") // 연속된 점과 쉼표를 하나의 점으로 변환
    .replace(/(\.\.)+/g, ".") // 연속된 점을 하나로 변환
    .replace(/(,,)+/g, ","); // 연속된 쉼표를 하나로 변환
};
const handleKeydown = (event) => {
  if (event.code === "Space") {
    event.preventDefault();
  }
};

async function emailCertCheck() {
  var param = {};
  if (email.value == "") {
    alertModal.value.bodyHtml =
      "<span>이메일 주소를 <br> 입력해 주세요.</span>";
    popupIsActive.value = true;
    return;
  } else if (mailHelp.value) {
    alertModal.value.bodyHtml =
      "<span>올바른 이메일 주소를 <br> 입력해 주세요.</span>";
    popupIsActive.value = true;
    return;
  }
  param.emlAddr = email.value;

  await axios.post("/member/checkemail", param).then((response) => {
    if (response.data != null) {
      if (response.data.회원여부 != null) {
        if (response.data.회원여부 == "비회원") {
          dupCheck.value = true;
          return;
        } else if (response.data.회원여부 == "회원") {
          alertModal.value.bodyHtml =
            "<span>입력하신 이메일 주소는 <br> 이미 가입하신 이메일 주소입니다.</span>";
          popupIsActive.value = true;
          dupCheck.value = false;
          return;
        }
      }
    }
  });
}
watch(email, async (v) => {
  await emailCertCheck();
});
watch(memberName, (v) => {
  memberName.value = v.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim,
    ""
  );
});
async function triggerSubmit() {
  if (
    email.value == "" ||
    password.value == "" ||
    confirmPassword.value == "" ||
    gigwanType.value == "" ||
    memberName.value == "" ||
    acsIp.value == ""
  ) {
    alertModal.value.bodyHtml =
      "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>";
    popupIsActive.value = true;
  } else if (dupCheck.value == false) {
    alertModal.value.bodyHtml =
      "<span>입력하신 이메일 주소는 <br> 이미 가입하신 이메일 주소입니다.</span>";
    popupIsActive.value = true;
  } else if (password.value != confirmPassword.value) {
    alertModal.value.bodyHtml = "<span>동일한 비밀번호를 입력해 주세요.</span>";
    popupIsActive.value = true;
  } else if (
    pwdRule1.value &&
    pwdRule2.value &&
    pwdRule3.value &&
    pwdRule4.value
  ) {
    var param = {};
    param.emlAddr = email.value;
    const payload = password.value;
    const hash = CryptoJS.SHA256(payload);
    param.pswd = hash.toString();
    param.acsIp = acsIp.value;
    param.mbrNm = memberName.value;
    param.mbrStts = mbrStts.value;
    param.ogdpInst = gigwanType.value;
    if (description.value != "") {
      param.expln = description.value;
    }
    if (gigwanName.value != "") {
      param.ogdpDep = gigwanName.value;
    }
    param.autoYn = "Y";
    await axios
      .post("/member/join", param)
      .then((response) => {
        if (response.data != null) {
          if (response.data.id != null) {
            if (response.data.id != 0) {
              alertModal.value.bodyHtml =
                "<span>관리자 생성이 완료되었습니다.</span>";
              alertModal.value.buttons = [
                {
                  clickEvent: "reload",
                  content: "확인",
                  addClass: "btn-1",
                },
              ];
              popupIsActive.value = true;
              return;
            }
          }
        }
        alertModal.value.bodyHtml = "<span>관리자 생성을 실패했습니다.</span>";
        popupIsActive.value = true;
        return;
      })
      .catch((error) => {
        const msg = error.response.data;
        if (msg.includes("중복아이디")) {
          alertModal.value.bodyHtml =
            "<span>입력하신 이메일 주소는 <br> 이미 가입하신 이메일 주소입니다.</span>";
          popupIsActive.value = true;
        } else if (msg.includes("INVALID")) {
          alertModal.value.bodyHtml =
            "<span>입력하신 정보를 확인해 주세요.</span>";
          popupIsActive.value = true;
        } else {
          alertModal.value.bodyHtml =
            "<span>관리자 생성을 실패했습니다.</span>";
          popupIsActive.value = true;
        }
        return;
      });
  } else {
    alertModal.value.bodyHtml = "<span>비밀번호를 확인해 주세요.</span>";
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
.dp-b {
  display: block;
}
</style>
