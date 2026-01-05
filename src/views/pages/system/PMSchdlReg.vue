<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > PM 일정 관리</p>
    <p class="heading">PM 일정 등록</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>제목</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="pmSchdlTtl"
            style="display: inline-block; width: 70%"
            placeholder="제목을 입력하세요"
            maxlength="100"
          />
        </td>
      </tr>
      <tr>
        <th><span>작업내용</span><span class="text-red"> *</span></th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="pmSchdlCn"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
      <tr>
        <th><span>작업기간</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="datetime-local"
            v-model="jobBgngDt"
            :max="maxDate"
            @change="dateValidCheck('jobBgngDt')"
          />
          <span style="align-self: center; padding: 0 1rem">~</span>
          <input
            type="datetime-local"
            v-model="jobEndDt"
            :max="maxDate"
            @change="dateValidCheck('jobEndDt')"
          />
        </td>
      </tr>
      <tr>
        <th><span>작업 영향 범위</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <input
              type="radio"
              v-model="jobInflRange"
              id="jobChkAll"
              value="0"
              name="jobChk"
            />
            <label for="jobChkAll">전체</label>
            <input
              type="radio"
              v-model="jobInflRange"
              id="jobChkUser"
              value="1"
              name="jobChk"
              checked
            />
            <label for="jobChkUser">사용자</label>
            <input
              type="radio"
              v-model="jobInflRange"
              id="jobChkAdmin"
              value="2"
              name="jobChk"
            />
            <label for="jobChkAdmin">관리자</label>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>긴급 연락처</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="emct"
            style="display: inline-block; width: 70%"
            placeholder="긴급 연락처 정보를 입력하세요"
            maxlength="100"
          />
        </td>
      </tr>
      <tr>
        <th><span>사전안내 유무</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="Select"
              v-model:selected="bfhdGdYn"
              :options="['진행', '미진행']"
            ></component>
            <div v-if="bfhdGdYn === '진행'" style="display: inline-flex">
              <input
                type="datetime-local"
                v-model="bfhdBgngDt"
                :max="maxDate"
                @change="dateValidCheck('bfhdBgngDt')"
              />
              <span style="align-self: center; padding: 0 1rem">~</span>
              <input
                type="datetime-local"
                v-model="bfhdEndDt"
                :max="maxDate"
                @change="dateValidCheck('bfhdEndDt')"
              />
            </div>
          </div>
        </td>
      </tr>
    </table>
    <br />
    <div v-if="bfhdGdYn === '진행'">
      <div class="tit"></div>
      <label>사전안내 등록</label>
    </div>
    <table v-if="bfhdGdYn === '진행'">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>제목</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="bfhdTtl"
            style="display: inline-block; width: 70%"
            placeholder="제목을 입력하세요"
            maxlength="100"
          />
        </td>
      </tr>
      <tr>
        <th><span>작업내용</span><span class="text-red"> *</span></th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="bfhdJobCn"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
      <tr>
        <th><span>작업기간</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <input
              type="datetime-local"
              v-model="bfhdJobBgngDt"
              :max="maxDate"
              @change="dateValidCheck('bfhdJobBgngDt')"
            />
            <span style="align-self: center; padding: 0 1rem">~</span>
            <input
              type="datetime-local"
              v-model="bfhdJobEndDt"
              :max="maxDate"
              @change="dateValidCheck('bfhdJobEndDt')"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th><span>작업 영향 범위</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfJobChkAll"
              value="0"
              name="bfJobChk"
            />
            <label for="bfJobChkAll">전체</label>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfJobChUser"
              value="1"
              name="bfJobChk"
              checked
            />
            <label for="bfJobChUser">사용자</label>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfJobChkAdmin"
              value="2"
              name="bfJobChk"
            />
            <label for="bfJobChkAdmin">관리자</label>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>긴급 연락처</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="bfhdEmct"
            style="display: inline-block; width: 70%"
            placeholder="긴급 연락처 정보를 입력하세요"
            maxlength="100"
          />
        </td>
      </tr>
      <tr>
        <th><span>사전안내 내용</span><span class="text-red"> *</span></th>
        <td>
          <textarea
            class=""
            rows="5"
            v-model="bfhdCn"
            maxlength="2000"
          ></textarea>
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">등록</button>
      <button class="btn-3" @click="router.push('/pmSchdlMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push('/pmSchdlMng')"
    ></reg-modal>
    <reg-modal
      v-model:isActive="regPopupIsActive"
      :alertModal="regModal"
      @onSubmitHandler="triggerSubmit()"
    ></reg-modal>
  </div>
</template>

<script setup lang="ts">
import Select from "@/views/components/Select.vue";
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const alertPopupIsActive = ref(false);
const regPopupIsActive = ref(false);

const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml:
    "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>",
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

const regModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "submit",
      content: "예",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "아니오",
      addClass: "btn-2",
    },
  ],
});

const pmSchdlTtl = ref();
const pmSchdlCn = ref();
const jobBgngDt = ref();
const jobEndDt = ref();
const emct = ref();
const bfhdGdYn = ref("진행");
const bfhdBgngDt = ref();
const bfhdEndDt = ref();
const jobInflRange = ref(1);
const bfhdTtl = ref();
const bfhdJobCn = ref();
const bfhdJobBgngDt = ref();
const bfhdJobEndDt = ref();
const bfhdJobInflRange = ref(1);
const bfhdEmct = ref();
const bfhdCn = ref();
const maxDate = "2100-12-31T23:59";

function dateValidCheck(target) {
  const now = new Date();
  const formateedNow = `${now.getFullYear()}${(
    "0" +
    (now.getMonth() + 1)
  ).slice(-2)}${("0" + now.getDate()).slice(-2)}${("0" + now.getHours()).slice(
    -2
  )}${("0" + now.getMinutes()).slice(-2)}`;

  // 기간 설정과 현재시간과의 비교
  if (
    target == "jobBgngDt" &&
    jobBgngDt.value != undefined &&
    jobBgngDt.value != null &&
    jobBgngDt.value != "" &&
    formateedNow >
      jobBgngDt.value
        .replaceAll("-", "")
        .replaceAll("T", "")
        .replaceAll(":", "")
  ) {
    jobBgngDt.value = undefined;
    alertModal.value.bodyHtml =
      "<span>작업 시작 일시는 현재보다 빠를 수 없습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    return;
  } else if (
    target == "bfhdBgngDt" &&
    bfhdBgngDt.value != undefined &&
    bfhdBgngDt.value != null &&
    bfhdBgngDt.value != "" &&
    formateedNow >
      bfhdBgngDt.value
        .replaceAll("-", "")
        .replaceAll("T", "")
        .replaceAll(":", "")
  ) {
    bfhdBgngDt.value = undefined;
    alertModal.value.bodyHtml =
      "<span>사전안내 시작 일시는 현재보다 빠를 수 없습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    return;
  } else if (
    target == "bfhdJobBgngDt" &&
    bfhdJobBgngDt.value != undefined &&
    bfhdJobBgngDt.value != null &&
    bfhdJobBgngDt.value != "" &&
    formateedNow >
      bfhdJobBgngDt.value
        .replaceAll("-", "")
        .replaceAll("T", "")
        .replaceAll(":", "")
  ) {
    bfhdJobBgngDt.value = undefined;
    alertModal.value.bodyHtml =
      "<span>작업 시작 일시는 현재보다 빠를 수 없습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    alertPopupIsActive.value = true;
    return;
  }

  // 각각의 시작일시와 종료일시의 비교
  if (
    (target == "jobBgngDt" || target == "jobEndDt") &&
    jobBgngDt.value != undefined &&
    jobEndDt.value != undefined
  ) {
    let numJobBgngDt = jobBgngDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    let numJobEndDt = jobEndDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    if (numJobBgngDt > numJobEndDt) {
      jobEndDt.value = undefined;
      alertModal.value.bodyHtml =
        "<span>작업 시작 일시보다 작업 종료 일시가 빠를 수 없습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    }
  } else if (
    (target == "bfhdBgngDt" || target == "bfhdEndDt") &&
    bfhdBgngDt.value != undefined &&
    bfhdEndDt.value != undefined
  ) {
    let numBfhdBgngDt = bfhdBgngDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    let numBfhdEndDt = bfhdEndDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    if (numBfhdBgngDt > numBfhdEndDt) {
      bfhdEndDt.value = undefined;
      alertModal.value.bodyHtml =
        "<span>사전안내 시작 일시보다 사전안내 종료 일시가 빠를 수 없습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    }
  } else if (
    (target == "bfhdJobBgngDt" || target == "bfhdJobEndDt") &&
    bfhdJobBgngDt.value != undefined &&
    bfhdJobEndDt.value != undefined
  ) {
    let numBfhdJobBgngDt = bfhdJobBgngDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    let numBfhdJobEndDt = bfhdJobEndDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    if (numBfhdJobBgngDt > numBfhdJobEndDt) {
      bfhdJobEndDt.value = undefined;
      alertModal.value.bodyHtml =
        "<span>작업 시작 일시보다 작업 종료 일시가 빠를 수 없습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    }
  }

  // 사전안내기간과 작업기간의 비교
  if ((target == "jobBgngDt" || target == "bfhdBgngDt") &&
      jobBgngDt.value != undefined &&
      bfhdBgngDt.value != undefined) {
    let numJobBgngDt = jobBgngDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    let numBfhdBgngDt = bfhdBgngDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    if (numJobBgngDt < numBfhdBgngDt) {
      bfhdBgngDt.value = undefined;
      alertModal.value.bodyHtml =
        "<span>작업 시작 일시가 사전안내 시작 일시보다 빠를 수 없습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    }
  } else if ((target == "jobEndDt" || target == "bfhdEndDt") &&
      jobEndDt.value != undefined &&
      bfhdEndDt.value != undefined) {
    let numJobEndDt = jobEndDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    let numBfhdEndDt = bfhdEndDt.value
      .toString()
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "");
    if (numJobEndDt < numBfhdEndDt) {
      bfhdEndDt.value = undefined;
      alertModal.value.bodyHtml =
        "<span>작업 종료 일시가 사전안내 종료 일시보다 빠를 수 없습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    }
  }
}

const check = () => {
  if (bfhdGdYn.value === "진행") {
    if (
      pmSchdlTtl.value === "" ||
      pmSchdlCn.value === "" ||
      jobBgngDt.value === undefined ||
      jobEndDt.value === undefined ||
      emct.value === "" ||
      bfhdGdYn.value === undefined ||
      bfhdBgngDt.value === undefined ||
      bfhdEndDt.value === undefined ||
      bfhdTtl.value === "" ||
      bfhdJobCn.value === "" ||
      bfhdJobBgngDt.value === undefined ||
      bfhdJobEndDt.value === undefined ||
      bfhdEmct.value === "" ||
      bfhdCn.value === ""
    ) {
      alertModal.value.bodyHtml =
        "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    } else {
      beforeTriggerSubmit();
    }
  } else {
    if (
      pmSchdlTtl.value === "" ||
      pmSchdlCn.value === "" ||
      jobBgngDt.value === undefined ||
      jobEndDt.value === undefined ||
      emct.value === "" ||
      bfhdGdYn.value === undefined
    ) {
      alertModal.value.bodyHtml =
        "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
      return;
    } else {
      beforeTriggerSubmit();
    }
  }
};

const beforeTriggerSubmit = () => {
  regModal.value.bodyHtml = "<span>등록하시겠습니까?</span>";
  regModal.value.buttons = [
    {
      clickEvent: "submit",
      content: "예",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "아니오",
      addClass: "btn-2",
    },
  ];
  regPopupIsActive.value = true;
};

const triggerSubmit = () => {
  let param = {};
  if (bfhdGdYn.value === "진행") {
    param = {
      pmSchdlTtl: pmSchdlTtl.value,
      pmSchdlStts: "W",
      pmSchdlCn: pmSchdlCn.value,
      jobBgngDt: jobBgngDt.value,
      jobEndDt: jobEndDt.value,
      jobInflRange: jobInflRange.value,
      emct: emct.value,
      bfhdGdYn: bfhdGdYn.value == "진행" ? "Y" : "N",
      bfhdBgngDt: bfhdBgngDt.value,
      bfhdEndDt: bfhdEndDt.value,
      bfhdTtl: bfhdTtl.value,
      bfhdJobCn: bfhdJobCn.value,
      bfhdJobBgngDt: bfhdJobBgngDt.value,
      bfhdJobEndDt: bfhdJobEndDt.value,
      bfhdJobInflRange: bfhdJobInflRange.value,
      bfhdEmct: bfhdEmct.value,
      bfhdCn: bfhdCn.value,
    };
  } else {
    param = {
      pmSchdlTtl: pmSchdlTtl.value,
      pmSchdlStts: "W",
      pmSchdlCn: pmSchdlCn.value,
      jobBgngDt: jobBgngDt.value,
      jobEndDt: jobEndDt.value,
      jobInflRange: jobInflRange.value,
      emct: emct.value,
      bfhdGdYn: bfhdGdYn.value == "진행" ? "Y" : "N",
    };
  }

  axios
    .post("/pmSchedule/create", param)
    .then(() => {
      alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "confirm",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      alertPopupIsActive.value = true;
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status == 500) {
          alertModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          alertPopupIsActive.value = true;
        }
      }
    });
};

onMounted(() => {});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}

input[type="datetime-local"] {
  min-width: 8vw;
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
</style>