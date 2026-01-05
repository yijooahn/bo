<template>
  <component
    v-if="!popupIsActive"
    :is="ModalComp"
    :alertModal="alertModal"
    v-model:isActive="isActive"
    @on-submit-click="onSubmit"
    @on-relocate-click="onGoBack"
  >
    <template #header>
      <div>내 정보 변경</div>
    </template>
    <template #body>
      <div style="padding: 1rem 1rem 5rem 1rem">
        <div style="padding: 0.3rem; text-align: left">
          <div class="tit"></div>
          <label>기본 정보</label>
          <table class="table-1">
            <tbody>
              <tr>
                <th>
                  <span>이메일 주소</span>
                </th>
                <td>
                  <div>
                    <input type="email" v-model.trim="email" :disabled="true" />
                  </div>
                </td>
              </tr>
              <tr>
                <th><span>이름</span></th>
                <td>
                  <div>
                    <input
                      type="text"
                      maxlength="100"
                      disabled
                      v-model.trim="memberName"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <span>현재 비밀번호</span><span class="text-red"> *</span>
                </th>
                <td>
                  <div>
                    <input type="password" v-model.trim="currentPassword" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <span>새로운 비밀번호</span><span class="text-red"> *</span>
                </th>
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
                      pwdRule1 && pwdRule2 && pwdRule3 && pwdRule4
                        ? false
                        : true
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
          <div class="tit-container">
            <div class="tit"></div>
            <label>상세 정보</label>
          </div>

          <table class="table-1">
            <tbody>
              <tr>
                <th>
                  <span>소속기관</span>
                </th>
                <td>
                  <div>
                    <component
                      :is="SelectComp"
                      v-model:selected="gigwanType"
                      :disabled="true"
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
            </tbody>
          </table>
          <!--   <div class="ct-17">
                    <button class="btn-1" @click="triggerSubmit">수정</button>
                    <button class="btn-3" @click="router.push('/accountMng')">취소</button>
                </div>
            -->
        </div>
      </div>
    </template>
  </component>
  <component
    v-if="popupIsActive"
    v-model:isActive="popupIsActive"
    :alertModal="popModal"
    :is="ModalPop"
    @on-relocate-handler="onRelocate"
  ></component>
</template>

<script setup lang="ts">
import { useMemberStore } from "@/store/member.js";
import ModalComp from "@/views/components/Pop.vue";
import ModalPop from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import CryptoJS from "crypto-js";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const mbrId = ref(0);
const email = ref("");
const memberName = ref("");
const password = ref("");
const pwdShow = ref(false);
const confirmPassword = ref("");
const gigwanType = ref("oooo");
const gigwanName = ref("");
const description = ref("");
const currentPassword = ref("");

const alertModal = ref({
  contentAlign: "start",
  // headerHtml: '<h4>알림</h4>',
  // bodyHtml: "<span>입력하신 이메일 주소로 <br> 인증코드를 보냈습니다.</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "submit",
      content: "수정",
      addClass: "btn-1",
    },
    {
      clickEvent: "relocate",
      content: "취소",
      addClass: "btn-2",
    },
  ],
});

const popModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span></span>",
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

const popupIsActive = ref(false);
const isActive = ref(true);
watch(isActive, (v) => {
  if (!v) {
    onGoBack();
  }
});
watch(memberName, (v) => {
  memberName.value = v.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim,
    ""
  );
});

const store = useMemberStore();
const { pr1, pr2, pr3, pr4, removeUserInfo } = store;
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

function onGoBack() {
  router.go(-1);
}

function onRelocate() {
  removeUserInfo();
  router.push("/");
}

async function onSubmit() {
  if (
    password.value == "" ||
    confirmPassword.value == "" ||
    currentPassword.value == ""
  ) {
    popModal.value.bodyHtml =
      "<span>필수 입력 사항을 <br> 모두 입력해 주세요.</span>";
    popupIsActive.value = true;
  } else if (password.value != confirmPassword.value) {
    popModal.value.bodyHtml = "<span>동일한 비밀번호를 입력해 주세요.</span>";
    popupIsActive.value = true;
  } else if (
    pwdRule1.value &&
    pwdRule2.value &&
    pwdRule3.value &&
    pwdRule4.value
  ) {
    var param = {};
    param.mbrId = mbrId.value;
    var payload = password.value;
    var hash = CryptoJS.SHA256(payload);
    param.pswd = hash.toString();
    payload = currentPassword.value;
    hash = CryptoJS.SHA256(payload);
    param.currentPswd = hash.toString();
    param.emlAddr = email.value;

    await axios
      .post("/member/modify", param)
      .then(async (response) => {
        if (response.data != null) {
          await axios.get("/member/logout").finally(() => {});
          popModal.value.bodyHtml =
            "<span>비밀번호가 변경되었습니다. 다시 로그인해 주세요.</span>";
          popModal.value.buttons = [
            {
              clickEvent: "relocate",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          return;
        }
        popModal.value.bodyHtml = "<span>수정 실패했습니다.</span>";
        popModal.value.buttons = [
          {
            clickEvent: "close",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        popupIsActive.value = true;
        return;
      })
      .catch((error) => {
        if (error.response.data.패스워드 != null) {
          if (error.response.data.패스워드 == "비정상") {
            popModal.value.bodyHtml =
              "<span>현재 비밀번호를 다시 확인해 주세요.</span>";
            popModal.value.buttons = [
              {
                clickEvent: "close",
                content: "확인",
                addClass: "btn-1",
              },
            ];
            popupIsActive.value = true;
            return;
          }
        } else {
          popModal.value.bodyHtml = "<span>수정 실패했습니다.</span>";
          popModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          return;
        }
      });
  } else {
    popModal.value.bodyHtml = "<span>비밀번호를 확인해 주세요.</span>";
    popModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
}

const fetchDatas = async (url, param) => {
  try {
    const response = await axios.post(url, param);
    if (response.data != null) {
      var mdto = response.data.memberDto;
      email.value = mdto.emlAddr;
      memberName.value = mdto.mbrNm;
      gigwanType.value = mdto.ogdpInst;
      description.value = mdto.expln;
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
        if (err.response.status == 404) {
          return false;
        }
      }
    }
    return false;
  }
};

onMounted(async () => {
  const userInfo = JSON.parse(
    document.cookie
      .split("; ")
      .filter((el) => el.startsWith("UserInfo="))[0]
      .replace("UserInfo=", "")
  );
  //const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
  mbrId.value = userInfo.memberId;
  var mDto = {};
  mDto.mbrId = mbrId.value;
  mDto.maskFlag = false;
  const response = await fetchDatas(`/member/detail`, mDto);
});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 100% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>
