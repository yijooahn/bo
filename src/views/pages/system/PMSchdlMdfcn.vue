<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > PM 일정 관리</p>
    <p class="heading">PM 일정 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>
          <span>{{ pmSchdlId }}</span>
        </td>
      </tr>
      <tr>
        <th><span>제목</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="pmSchdlTtl"
            style="display: inline-block; width: 85.5%"
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
        <td v-if="pmSchdlStts == 'C' || pmSchdlStts == 'E'">
          <div>
            <input
              type="datetime-local"
              v-model="jobBgngDt"
              :max="maxDate"
              disabled
              @change="dateValidCheck('jobBgngDt')"
            />
            <span style="align-self: center; padding: 0 1rem">~</span>
            <input
              type="datetime-local"
              v-model="jobEndDt"
              :max="maxDate"
              disabled
              @change="dateValidCheck('jobEndDt')"
            />
          </div>
        </td>
        <td v-else>
          <div>
            <input
              type="datetime-local"
              v-model="jobBgngDt"
              :max="maxDate"
              disabled
              @change="dateValidCheck('jobBgngDt')"
            />
            <span style="align-self: center; padding: 0 1rem">~</span>
            <input
              type="datetime-local"
              v-model="jobEndDt"
              :max="maxDate"
              @change="dateValidCheck('jobEndDt')"
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
                disabled
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
        <td v-if="pmSchdlStts == 'C' || pmSchdlStts == 'E'">
          <input
            type="datetime-local"
            v-model="bfhdJobBgngDt"
            :max="maxDate"
            disabled
            @change="dateValidCheck('bfhdJobBgngDt')"
          />
          <span style="align-self: center; padding: 0 1rem">~</span>
          <input
            type="datetime-local"
            v-model="bfhdJobEndDt"
            :max="maxDate"
            disabled
            @change="dateValidCheck('bfhdJobEndDt')"
          />
        </td>
        <td v-else>
          <input
            type="datetime-local"
            v-model="bfhdJobBgngDt"
            :max="maxDate"
            disabled
            @change="dateValidCheck('bfhdJobBgngDt')"
          />
          <span style="align-self: center; padding: 0 1rem">~</span>
          <input
            type="datetime-local"
            v-model="bfhdJobEndDt"
            :max="maxDate"
            @change="dateValidCheck('bfhdJobEndDt')"
          />
        </td>
      </tr>
      <tr>
        <th><span>작업 영향 범위</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfhdJobChkAll"
              value="0"
              name="bfhdJobChk"
            />
            <label for="bfhdJobChkAll">전체</label>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfhdJobChkUser"
              value="1"
              name="bfhdJobChk"
            />
            <label for="bfhdJobChkUser">사용자</label>
            <input
              type="radio"
              v-model="bfhdJobInflRange"
              id="bfhdJobChkAdmin"
              value="2"
              name="bfhdJobChk"
            />
            <label for="bfhdJobChkAdmin">관리자</label>
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
      <button class="btn-1" @click="check()">적용</button>
      <button
        v-if="pmSchdlStts == 'P'"
        class="btn-2"
        @click="clickEnd()"
      >
        조기종료
      </button>
      <button v-if="pmSchdlStts == 'W'" class="btn-2" @click="clickCancel()">
        취소
      </button>
      <button class="btn-3" @click="router.push('/pmSchdlMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="alertPopupIsActive"
      :alertModal="alertModal"
      @onConfirmHandler="router.push(`/pmSchdlMng`)"
    ></reg-modal>
    <reg-modal
      v-model:isActive="modifyPopupIsActive"
      :alertModal="modifyModal"
      @onSubmitHandler="modifyTriggerSubmit()"
    ></reg-modal>
    <reg-modal
      v-model:isActive="cancelPopupIsActive"
      :alertModal="cancelModal"
      @onSubmitHandler="updateTriggerSubmit('C')"
    ></reg-modal>
    <reg-modal
      v-model:isActive="endPopupIsActive"
      :alertModal="endModal"
      @onSubmitHandler="updateTriggerSubmit('E')"
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
const modifyPopupIsActive = ref(false);
const cancelPopupIsActive = ref(false);
const endPopupIsActive = ref(false);
const maxDate = "2100-12-31T23:59";

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

const modifyModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>수정 사항을 적용하시겠습니까?</span>",
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

const endModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>종료 처리하시겠습니까?</span>",
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

const cancelModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>취소 처리하시겠습니까?</span>",
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

const pmSchdlId = ref();
const pmSchdlTtl = ref();
const pmSchdlStts = ref();
const pmSchdlCn = ref();
const jobBgngDt = ref();
const jobEndDt = ref();
const jobInflRange = ref();
const emct = ref();
const bfhdGdYn = ref();
const bfhdBgngDt = ref();
const bfhdEndDt = ref();
const bfhdTtl = ref();
const bfhdJobCn = ref();
const bfhdJobBgngDt = ref();
const bfhdJobEndDt = ref();
const bfhdJobInflRange = ref();
const bfhdEmct = ref();
const bfhdCn = ref();

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("pmSchdlMng");
  } else {
    pmSchdlId.value = history.state.id;
    let pmDto = {
      pmSchdlId: pmSchdlId.value,
      maskFlag: false,
    };

    await axios
      .post(`/pmSchedule/detail`, pmDto)
      .then((response) => {
        pmSchdlTtl.value = response.data.pmDto.pmSchdlTtl;
        pmSchdlStts.value = response.data.pmDto.pmSchdlStts;
        pmSchdlCn.value = response.data.pmDto.pmSchdlCn;
        jobBgngDt.value = response.data.pmDto.jobBgngDt.substr(0, 16);
        jobEndDt.value = response.data.pmDto.jobEndDt.substr(0, 16);
        jobInflRange.value = response.data.pmDto.jobInflRange;
        emct.value = response.data.pmDto.emct;
        bfhdGdYn.value =
          response.data.pmDto.bfhdGdYn == "Y" ? "진행" : "미진행";
        if (bfhdGdYn.value === "진행") {
          bfhdBgngDt.value = response.data.pmDto.bfhdBgngDt.substr(0, 16);
          bfhdEndDt.value = response.data.pmDto.bfhdEndDt.substr(0, 16);
          bfhdTtl.value = response.data.pmDto.bfhdTtl;
          bfhdJobCn.value = response.data.pmDto.bfhdJobCn;
          bfhdJobBgngDt.value = response.data.pmDto.bfhdJobBgngDt.substr(0, 16);
          bfhdJobEndDt.value = response.data.pmDto.bfhdJobEndDt.substr(0, 16);
          bfhdJobInflRange.value = response.data.pmDto.bfhdJobInflRange;
          bfhdEmct.value = response.data.pmDto.bfhdEmct;
          bfhdCn.value = response.data.pmDto.bfhdCn;
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("pmSchdlMng");
          }
        }
      });
  }
};
const check = () => {
  if (bfhdGdYn.value === "진행") {
    if (
      pmSchdlTtl.value === "" ||
      pmSchdlCn.value === "" ||
      jobBgngDt.value === undefined ||
      jobEndDt.value === undefined ||
      jobInflRange.value === "" ||
      emct.value === "" ||
      bfhdGdYn.value === undefined ||
      bfhdBgngDt.value === undefined ||
      bfhdEndDt.value === undefined ||
      bfhdTtl.value === "" ||
      bfhdJobCn.value === "" ||
      bfhdJobBgngDt.value === undefined ||
      bfhdJobEndDt.value === undefined ||
      bfhdJobInflRange.value === "" ||
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
      beforeModifyTriggerSubmit();
    }
  } else {
    if (
      pmSchdlTtl.value === "" ||
      pmSchdlCn.value === "" ||
      jobBgngDt.value === undefined ||
      jobEndDt.value === undefined ||
      jobInflRange.value === "" ||
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
      beforeModifyTriggerSubmit();
    }
  }
};

function dateValidCheck(target) {
  const now = new Date();
  const formateedNow = `${now.getFullYear()}${(
    "0" +
    (now.getMonth() + 1)
  ).slice(-2)}${("0" + now.getDate()).slice(-2)}${("0" + now.getHours()).slice(
    -2
  )}${("0" + now.getMinutes()).slice(-2)}`;

  if (
    target == "jobBgngDt" &&
    jobBgngDt.value != undefined &&
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
}

const beforeModifyTriggerSubmit = () => {
  modifyModal.value.bodyHtml = "<span>수정 사항을 적용하시겠습니까?</span>";
  modifyModal.value.buttons = [
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
  modifyPopupIsActive.value = true;
};

const modifyTriggerSubmit = () => {
  let param = {};
  if (bfhdGdYn.value === "진행") {
    param = {
      pmSchdlId: pmSchdlId.value,
      pmSchdlTtl: pmSchdlTtl.value,
      pmSchdlStts: "W",
      pmSchdlCn: pmSchdlCn.value,
      jobBgngDt: jobBgngDt.value.trim(),
      jobEndDt: jobEndDt.value.trim(),
      jobInflRange: jobInflRange.value,
      emct: emct.value,
      bfhdGdYn: bfhdGdYn.value == "진행" ? "Y" : "N",
      bfhdBgngDt: bfhdBgngDt.value.trim(),
      bfhdEndDt: bfhdEndDt.value.trim(),
      bfhdTtl: bfhdTtl.value,
      bfhdJobCn: bfhdJobCn.value,
      bfhdJobBgngDt: bfhdJobBgngDt.value.toString().trim(),
      bfhdJobEndDt: bfhdJobEndDt.value.toString().trim(),
      bfhdJobInflRange: bfhdJobInflRange.value,
      bfhdEmct: bfhdEmct.value,
      bfhdCn: bfhdCn.value,
    };
  } else {
    param = {
      pmSchdlId: pmSchdlId.value,
      pmSchdlTtl: pmSchdlTtl.value,
      pmSchdlStts: "W",
      pmSchdlCn: pmSchdlCn.value,
      jobBgngDt: jobBgngDt.value.trim(),
      jobEndDt: jobEndDt.value.trim(),
      jobInflRange: jobInflRange.value,
      emct: emct.value,
      bfhdGdYn: bfhdGdYn.value == "진행" ? "Y" : "N",
    };
  }

  axios
    .post("/pmSchedule/modify", param)
    .then(() => {
      alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
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
        if (error.response.status != null) {
          if (error.response.status == axios.HttpStatusCode.NotModified) {
            alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
            alertModal.value.buttons = [
              {
                clickEvent: "confirm",
                content: "확인",
                addClass: "btn-1",
              },
            ];
            alertPopupIsActive.value = true;
          } else {
            alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
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
      }
    });
};

const clickEnd = () => {
  endModal.value.bodyHtml = "<span>종료 처리하시겠습니까?</span>";
  endModal.value.buttons = [
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
  endPopupIsActive.value = true;
};

const clickCancel = () => {
  cancelModal.value.bodyHtml = "<span>취소 처리하시겠습니까?</span>";
  cancelModal.value.buttons = [
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
  cancelPopupIsActive.value = true;
};

const updateTriggerSubmit = (v) => {
  let param = {
    pmSchdlId: pmSchdlId.value,
    pmSchdlStts: pmSchdlStts.value,
    jobBgngDt: jobBgngDt.value.trim(),
    jobEndDt: jobEndDt.value.trim(),
  };

  axios
    .post("/pmSchedule/update", param)
    .then((response) => {
      if (response != null) {
        if (v == "E") {
          alertModal.value.bodyHtml = "<span>조기종료가 완료되었습니다.</span>";
        } else if (v == "C") {
          alertModal.value.bodyHtml = "<span>취소가 완료되었습니다.</span>";
        }
        alertModal.value.buttons = [
          {
            clickEvent: "confirm",
            content: "확인",
            addClass: "btn-1",
          },
        ];
        alertPopupIsActive.value = true;
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status != null) {
          alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
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

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
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
