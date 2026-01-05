<template>
  <div>
    <p class="breadcrumb">계정권한 > 시스템관리자 계정관리</p>
    <p class="heading">시스템관리자 계정 수정</p>
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
                <input type="email" :value="email" disabled />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>이름</span><span class="text-red"> *</span></th>
            <td>
              <div>
                <input type="text" disabled :value="memberName" />
              </div>
            </td>
          </tr>
          <tr>
            <!-- <th><span>새로운 비밀번호</span><span class="text-red"> *</span></th> -->
            <th>
              <span>새로운 비밀번호</span
              ><span v-if="isChangePassword" class="text-red"> *</span>
            </th>
            <td>
              <div>
                <!-- <input type="password" v-model.trim="password" @focus="pwdShow = true" placeholder="영어 대소문자, 숫자, 특수문자 세 가지 이상 조합(8~15글자)" required /> -->
                <input
                  type="password"
                  :disabled="!isChangePassword"
                  v-model.trim="password"
                  @focus="pwdShow = true"
                  placeholder="영어 대소문자, 숫자, 특수문자 세 가지 이상 조합(8~15글자)"
                  required
                />
                <button class="btn-1" @click="isChangePassword = true">
                  비밀번호 재설정
                </button>
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
              <!-- <span class="text-red"> *</span> -->
              <span v-if="isChangePassword" class="text-red"> *</span>
            </th>
            <td>
              <div>
                <!-- <input type="password" v-model.trim="confirmPassword" required /> -->
                <input
                  type="password"
                  :disabled="!isChangePassword"
                  v-model.trim="confirmPassword"
                  required
                />
              </div>
              <div v-if="confirmPassword != password" class="text-red">
                <!--  <span><label class="ic4"></label>동일한 비밀번호를 입력해 주세요.</span>-->
                <span
                  ><label class="ic4"></label>입력하신 비밀번호와
                  다릅니다.</span
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
                <span>
                  <input
                    type="radio"
                    name="mbrStts"
                    id="mbrStts1"
                    v-model="mbrStts"
                    value="1"
                    checked
                  />
                  <label for="mbrStts1">승인(사용)</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="mbrStts"
                    id="mbrStts2"
                    v-model="mbrStts"
                    value="2"
                  />
                  <label for="mbrStts2">승인대기</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="mbrStts"
                    id="mbrStts3"
                    v-model="mbrStts"
                    value="3"
                  />
                  <label for="mbrStts3">반려</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="mbrStts"
                    id="mbrStts4"
                    v-model="mbrStts"
                    value="4"
                  />
                  <label for="mbrStts4">사용 중지</label>
                </span>
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
                  :is="SelectComp"
                  :disabled="true"
                  v-model:selected="gigwanType"
                  :options="['oooo', '협력사', '프리랜서', '기타']"
                ></component>
                <input type="text" v-model.trim="gigwanName" disabled />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>설명</span></th>
            <td>
              <div>
                <input type="text" v-model.trim="description" disabled />
              </div>
            </td>
          </tr>
          <tr>
            <th><span>마지막접속일</span></th>
            <td>
              <div>
                <span>{{ latestBefore(lastLoginDt) }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th><span>접근 IP</span><span class="text-red"> *</span></th>
            <td>
              <div>
                <input
                  type="text"
                  maxlength="200"
                  v-model.trim="acsIp"
                  @input="validateAllowedIp"
                  @keydown="handleKeydown($event)"
                  required
                />
              </div>
              <div class="text-red">
                <span
                  ><label class="ic4"></label>여러 IP 등록 시 쉼표(,)를 사용하여
                  등록해 주세요.</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ct-17">
        <button class="btn-1" @click="triggerSubmit">
          <span v-if="currentId == 0">저장</span>
          <span v-else>수정</span>
        </button>
        <button class="btn-3" @click="router.push('/accountMng')">
          <span v-if="currentId == 0">취소</span>
          <span v-else>목록</span>
        </button>
      </div>
      <account-mod-modal
        v-model:isActive="popupIsActive"
        @on-reload-handler="() => goList()"
        :alertModal="alertModal"
      ></account-mod-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { useMemberStore } from "@/store/member.js";
import SelectComp from "@/views/components/Select.vue";
import AccountModModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import { computed, inject, onMounted, ref } from "vue";
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
const router = useRouter();
const email = ref("");
const mbrId = ref("");
const memberName = ref("");
const currentPwd = ref("");
const password = ref("");
const pwdShow = ref(false);
const confirmPassword = ref("");
const gigwanType = ref("oooo");
const gigwanName = ref("");
const description = ref("");
const lastLoginDt = ref("");
const acsIp = ref("");
const mbrStts = ref("1");
const currentId = ref(null);
const detailMaskingFlag = inject("detailMaskingFlag");
const isChangePassword = ref(false);

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
const latestBefore = (value) => {
  if (value == "") {
    return;
  }
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  return `${betweenTimeDay}일 전`;
};
onMounted(async () => {
  if (history.state.id == null) {
    router.push("/accountMng");
  } else {
    currentId.value = history.state.id;
    var mDto = {};
    mDto.mbrId = currentId.value;
    mDto.maskFlag = detailMaskingFlag.value;
    await axios.post(`/member/detail`, mDto).then((res) => {
      var mDto = res.data.memberDto;
      email.value = mDto.emlAddr;
      currentPwd.value = mDto.pswd;
      memberName.value = mDto.mbrNm;
      gigwanType.value = mDto.ogdpInst;
      mbrStts.value = mDto.mbrStts;
      acsIp.value = mDto.acsIp;
      mbrId.value = currentId.value;
      if (mDto.ogdpDep != "") {
        gigwanName.value = mDto.ogdpDep;
      }
      if (mDto.expln != "") {
        description.value = mDto.expln;
      }
      if (mDto.lastLoginDt != "") {
        lastLoginDt.value = mDto.lastLoginDt;
      }
    });
  }
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

const goList = () => {
  router.push("/accountMng");
};
async function triggerSubmit() {
  /*
    if (
        email.value == "" ||
        password.value == "" ||
        confirmPassword.value == "" ||
        gigwanType.value == "" ||
        memberName.value == ""
    ) {
        alertModal.value.bodyHtml = "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>";
        popupIsActive.value = true;
    } else if (password.value != confirmPassword.value) {
        alertModal.value.bodyHtml = "<span>동일한 비밀번호를 입력해 주세요.</span>";
        popupIsActive.value = true;
    } else if (currentPwd.value == password.value) {
        alertModal.value.bodyHtml = "<span>새로운 비밀번호가 현재 비밀번호와 동일합니다.</span>";
        popupIsActive.value = true;
    } else if (pwdRule1.value && pwdRule2.value && pwdRule3.value && pwdRule4.value) {
        var param = {};
        param.emlAddr = email.value;
        const payload = password.value;
        const hash = CryptoJS.SHA256(payload);
        param.pswd = hash.toString();
        param.mbrNm = memberName.value;
        param.mbrStts = mbrStts.value;
        param.ogdpInst = gigwanType.value;
        param.mbrId = mbrId.value;
        if (description.value != "") {
            param.expln = description.value;
        }
        if (gigwanName.value != "") {
            param.ogdpDep = gigwanName.value;
        }
        await axios.post("/member/modify", param)
            .then((response) => {
                    if (response.data != null) {
                        if(currentId.value == 0){
                            alertModal.value.bodyHtml = "<span>관리자 계정이 생성되었습니다.</span>";
                        }else{
                            alertModal.value.bodyHtml = "<span>관리자 계정 정보가 변경되었습니다.</span>";
                        }
                        alertModal.value.buttons = [{
                            clickEvent: 'reload',
                            content: '확인',
                            addClass: 'btn-1',
                        }];
                        popupIsActive.value = true;
                        return;
                    }
                })
                .catch((err) => {
                    if (err.repsonse != null) {
                        if (err.response.status != null) {
                            if (err.response.status == 304) {
                                alertModal.value.bodyHtml = "<span>수정 실패했습니다.</span>";
                                popupIsActive.value = true;
                                return;
                            }
                        }
                    }
                });
            }
        else {
            alertModal.value.bodyHtml = "<span>비밀번호를 확인해 주세요.</span>";
            popupIsActive.value = true;
        }
        */
  if (isChangePassword.value) {
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
    } else if (password.value != confirmPassword.value) {
      alertModal.value.bodyHtml =
        "<span>동일한 비밀번호를 입력해 주세요.</span>";
      popupIsActive.value = true;
    } else if (currentPwd.value == password.value) {
      alertModal.value.bodyHtml =
        "<span>새로운 비밀번호가 현재 비밀번호와 동일합니다.</span>";
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
      param.mbrNm = memberName.value;
      param.mbrStts = mbrStts.value;
      param.ogdpInst = gigwanType.value;
      param.mbrId = mbrId.value;
      param.acsIp = acsIp.value;
      if (description.value != "") {
        param.expln = description.value;
      }
      if (gigwanName.value != "") {
        param.ogdpDep = gigwanName.value;
      }

      await axios
        .post("/member/modify", param)
        .then((response) => {
          if (response.data != null) {
            if (currentId.value == 0) {
              alertModal.value.bodyHtml =
                "<span>관리자 계정이 생성되었습니다.</span>";
            } else {
              alertModal.value.bodyHtml =
                "<span>관리자 계정 정보가 변경되었습니다.</span>";
            }

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
        })
        .catch((err) => {
          if (err.repsonse != null) {
            if (err.response.status != null) {
              if (err.response.status == 304) {
                alertModal.value.bodyHtml = "<span>수정 실패했습니다.</span>";
                popupIsActive.value = true;
                return;
              }
            }
          }
        });
    } else {
      alertModal.value.bodyHtml = "<span>비밀번호를 확인해 주세요.</span>";
      popupIsActive.value = true;
    }
  } else {
    if (
      email.value == "" ||
      // password.value == "" ||
      // confirmPassword.value == "" ||
      gigwanType.value == "" ||
      memberName.value == "" ||
      acsIp.value == ""
    ) {
      alertModal.value.bodyHtml =
        "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>";
      popupIsActive.value = true;
    } else {
      var param = {};
      param.emlAddr = email.value;
      // const payload = password.value;
      // const hash = CryptoJS.SHA256(payload);
      // param.pswd = hash.toString();
      param.pswd = "";
      param.mbrNm = memberName.value;
      param.mbrStts = mbrStts.value;
      param.ogdpInst = gigwanType.value;
      param.mbrId = mbrId.value;
      param.acsIp = acsIp.value;
      if (description.value != "") {
        param.expln = description.value;
      }
      if (gigwanName.value != "") {
        param.ogdpDep = gigwanName.value;
      }

      await axios
        .post("/member/modify", param)
        .then((response) => {
          if (response.data != null) {
            if (currentId.value == 0) {
              alertModal.value.bodyHtml =
                "<span>관리자 계정이 생성되었습니다.</span>";
            } else {
              alertModal.value.bodyHtml =
                "<span>관리자 계정 정보가 변경되었습니다.</span>";
            }

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
        })
        .catch((err) => {
          if (err.repsonse != null) {
            if (err.response.status != null) {
              if (err.response.status == 304) {
                alertModal.value.bodyHtml = "<span>수정 실패했습니다.</span>";
                popupIsActive.value = true;
                return;
              }
            }
          }
        });
    }
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
.text-red {
  margin: 0.3rem 0;
}
.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>
