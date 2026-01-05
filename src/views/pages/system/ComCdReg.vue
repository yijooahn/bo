<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">시스템 관리 > 공통코드관리</p>
    <p class="heading">공통코드 등록</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>코드그룹ID</span><span class="text-red"> *</span></th>
          <td>
            <input
              type="text"
              v-model="groupCdId"
              @change="cdDupCheck($event)"
              @input="inputValidCheck('groupCdId')"
              style="display: inline-block; width: 50%"
              placeholder="코드그룹ID를 입력하세요"
              maxlength="20"
            />
            <div
              v-if="cdDupVal == false"
              class="input-help"
              style="color: #4876ef; display: inline; margin-left: 1rem"
            >
              사용 가능한 코드그룹ID입니다
            </div>
            <div
              v-if="cdDupVal == true"
              class="input-help"
              style="color: #f05050; display: inline; margin-left: 1rem"
            >
              사용 중인 코드그룹ID입니다
            </div>
          </td>
        </tr>
        <tr>
          <th><span>코드그룹명</span><span class="text-red"> *</span></th>
          <td>
            <input
              type="text"
              v-model="groupCdNm"
              @change="nmDupCheck($event)"
              @input="inputValidCheck('groupCdNm')"
              style="display: inline-block; width: 50%"
              placeholder="코드그룹명을 입력하세요"
              maxlength="40"
            />
            <div
              v-if="nmDupVal == false"
              class="input-help"
              style="color: #4876ef; display: inline; margin-left: 1rem"
            >
              사용 가능한 코드그룹명입니다
            </div>
            <div
              v-if="nmDupVal == true"
              class="input-help"
              style="color: #f05050; display: inline; margin-left: 1rem"
            >
              사용 중인 코드그룹명입니다
            </div>
          </td>
        </tr>
        <tr>
          <th><span>코드그룹설명</span></th>
          <td>
            <input
              type="text"
              v-model="groupCdExpln"
              style="display: inline-block; width: 50%"
              placeholder="코드그룹설명을 입력하세요"
              maxlength="100"
            />
          </td>
        </tr>
        <tr>
          <th><span>사용 여부</span><span class="text-red"> *</span></th>
          <td>
            <div>
              <input
                type="radio"
                name="rdUseYn"
                id="rdoY"
                value="Y"
                v-model="groupCdUseYn"
              />
              <label for="rdoY">Y</label>
              <input
                type="radio"
                name="rdUseYn"
                id="rdoN"
                value="N"
                v-model="groupCdUseYn"
              />
              <label for="rdoN">N</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div
      style="
        width: 100%;
        text-align: right;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        margin-bottom: 1.3rem;
      "
    >
      <button class="btn-1" style="float: right" @click="addRow()">추가</button>
      <button class="btn-2" style="float: right" @click="removeRows()">
        선택삭제
      </button>
    </div>
    <div class="tit"></div>
    <label>코드</label>
    <table class="table-2">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="checkAll"
              @click="toggleCheckAll()"
            />
          </th>
          <th><span>코드ID</span><span class="text-red"> *</span></th>
          <th><span>코드명</span><span class="text-red"> *</span></th>
          <th><span>설명</span></th>
          <th><span>순서</span><span class="text-red"> *</span></th>
          <th><span>속성1</span></th>
          <th><span>속성2</span></th>
          <th><span>상위코드ID</span></th>
          <th><span>사용 여부</span><span class="text-red"> *</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sr, idx) in tableData" :key="idx">
          <td style="text-align: center">
            <input type="checkbox" v-model="selectedRows" :value="idx" />
          </td>
          <td>
            <div style="display: block" v-if="sr.comCdIdRowDupVal == null">
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 85%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="rowDupCheck($event, 'comCdId', idx)"
                />
              </div>
            </div>
            <div
              style="display: block"
              v-if="sr.comCdIdRowDupVal != null && sr.comCdIdRowDupVal"
            >
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 85%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="rowDupCheck($event, 'comCdId', idx)"
                />
              </div>
              <div><span class="text-red">사용 중인 코드ID입니다</span></div>
            </div>
            <div
              style="display: block"
              v-if="sr.comCdIdRowDupVal != null && !sr.comCdIdRowDupVal"
            >
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 85%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="rowDupCheck($event, 'comCdId', idx)"
                />
              </div>
              <div>
                <span style="color: #4876ef">사용 가능한 코드ID입니다</span>
              </div>
            </div>
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdNm"
              style="width: 85%"
              placeholder="코드명을 입력하세요"
              maxlength="50"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdExpln"
              style="width: 85%"
              placeholder="설명을 입력하세요"
              maxlength="50"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.sortSeq"
              @input="inputHandler($event, idx)"
              style="width: 85%"
              placeholder="순서를 입력하세요"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdAtrb1"
              style="width: 85%"
              placeholder="속성을 입력하세요"
              maxlength="50"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdAtrb2"
              style="width: 85%"
              placeholder="속성을 입력하세요"
              maxlength="50"
            />
          </td>
          <td>
            <div style="display: block" v-if="sr.uptCdIdRowDupVal == null">
              <input
                type="text"
                v-model="sr.uptCdId"
                style="width: 85%"
                placeholder="상위코드ID를 입력하세요"
                maxlength="20"
                @change="rowDupCheck($event, 'uptCdId', idx)"
              />
            </div>
            <div
              style="display: block"
              v-if="sr.uptCdIdRowDupVal != null && sr.uptCdIdRowDupVal"
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 85%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="rowDupCheck($event, 'uptCdId', idx)"
                />
              </div>
              <div>
                <span style="color: #4876ef">사용 가능한 코드ID입니다</span>
              </div>
            </div>
            <div
              style="display: block"
              v-if="sr.uptCdIdRowDupVal != null && !sr.uptCdIdRowDupVal"
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 85%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="rowDupCheck($event, 'uptCdId', idx)"
                />
              </div>
              <div>
                <span class="text-red">등록되지 않은 코드ID입니다</span>
              </div>
            </div>
          </td>
          <td>
            <div>
              <input
                type="radio"
                id="rdoY"
                v-model="sr.useYn"
                value="Y"
              /><label for="rdoY">Y</label>
              <input
                type="radio"
                id="rdoN"
                v-model="sr.useYn"
                value="N"
              /><label for="rdoN">N</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">등록</button>
      <button class="btn-3" @click="router.push('/comCdMng')">목록</button>
    </div>
    <reg-modal
      v-model:isActive="deleteCheckedPopupIsActive"
      :alertModal="deleteCheckedModal"
      @onSubmitHandler="deleteCheckedSubmit()"
    ></reg-modal>
    <reg-modal
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @onSubmitHandler="triggerSubmit()"
      @onConfirmHandler="router.push('/comCdMng')"
    ></reg-modal>
  </div>
</template>

<script setup lang="ts">
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const groupCdId = ref();
const groupCdNm = ref();
const groupCdExpln = ref();
const groupCdUseYn = ref("Y");
const cdDupVal = ref(null);
const nmDupVal = ref(null);

const tableData = ref([
  {
    comCdId: "",
    comCdNm: "",
    comCdExpln: "",
    sortSeq: "",
    comCdAtrb1: "",
    comCdAtrb2: "",
    uptCdId: "",
    useYn: "Y",
    rowType: "I",
    comCdIdRowDupVal: null,
    uptCdIdRowDupVal: null,
  },
]);
const checkAll = ref(false);
const selectedRows = ref([]);

const router = useRouter();
const deleteCheckedPopupIsActive = ref(false);
const popupIsActive = ref(false);
const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록 하시겠습니까?</span>",
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

const deleteCheckedModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>선택한 항목을 삭제하시겠습니까?</span>",
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

watch(selectedRows, () => {
  checkAll.value =
    selectedRows.value.length > 0 &&
    selectedRows.value.length === tableData.value.length;
});

const toggleCheckAll = () => {
  if (checkAll.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = tableData.value.map((_, index) => index);
  }
};

function invalidPopup() {
  alertModal.value.bodyHtml =
    "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
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

const inputHandler = (e, index) => {
  const input = e.target.value;
  const numberInput = input.replace(/[^0-9]/g, "");
  tableData.value[index].sortSeq = numberInput;
  e.target.focus();
};

const cdDupCheck = (e) => {
  if (
    groupCdId.value == undefined ||
    groupCdId.value == null ||
    groupCdId.value == ""
  ) {
    cdDupVal.value = null;
    e.target.focus();
    return;
  }
  cdDupVal.value = null;
  axios
    .post(`/commoncode/inquiry/${groupCdId.value}`)
    .then((response) => {
      if (response.data != null) {
        if (response.data == 0) {
          cdDupVal.value = false;
          e.target.focus();
        } else {
          groupCdId.value = null;
          cdDupVal.value = true;
          alertModal.value.bodyHtml =
            "<span>사용 중인 코드그룹ID입니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          e.target.focus();
          return;
        }
      }
    })
    .catch((error) => {
      groupCdId.value = null;
      cdDupVal.value = true;
      alertModal.value.bodyHtml = "<span>사용 중인 코드그룹ID입니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      e.target.focus();
      return;
    });
};

const nmDupCheck = (e) => {
  if (
    groupCdNm.value == undefined ||
    groupCdNm.value == null ||
    groupCdNm.value == ""
  ) {
    nmDupVal.value = null;
    e.target.focus();
    return;
  }
  nmDupVal.value = null;
  axios
    .get(`/commoncode/inquiry/` + groupCdNm.value)
    .then((response) => {
      if (response.data != null) {
        if (response.data == 0) {
          nmDupVal.value = false;
          e.target.focus();
        } else {
          groupCdNm.value = null;
          nmDupVal.value = true;
          alertModal.value.bodyHtml =
            "<span>사용 중인 코드그룹명입니다.</span>";
          alertModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          e.target.focus();
          return;
        }
      }
    })
    .catch((error) => {
      groupCdNm.value = null;
      nmDupVal.value = true;
      alertModal.value.bodyHtml = "<span>사용 중인 코드그룹명입니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
      popupIsActive.value = true;
      e.target.focus();
      return;
    });
};

const inputValidCheck = (type) => {
  const regex = /^[a-zA-Z0-9_]*$/;
  if (type === "groupCdId") {
    if (!regex.test(groupCdId.value)) {
      groupCdId.value = groupCdId.value.replace(/[^a-zA-Z0-9_]/g, "");
    }
  } else if (type === "groupCdNm") {
    // if (!regex.test(groupCdNm.value)) {
    //   groupCdNm.value = groupCdNm.value.replace(/[^a-zA-Z0-9_]/g, "");
    // }
  }
};

const addRow = () => {
  tableData.value.push({
    comCdId: "",
    comCdNm: "",
    comCdExpln: "",
    sortSeq: "",
    comCdAtrb1: "",
    comCdAtrb2: "",
    uptCdId: "",
    useYn: "Y",
    rowType: "I",
    comCdIdRowDupVal: null,
    uptCdIdRowDupVal: null,
  });
};

const removeRows = () => {
  if (selectedRows.value.length < 1) {
    alertModal.value.bodyHtml = "<span>삭제할 코드를 선택해 주세요.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } else {
    deleteCheckedPopupIsActive.value = true;
  }
};

const deleteCheckedSubmit = () => {
  for (let i = selectedRows.value.length - 1; i >= 0; i--) {
    const idx = selectedRows.value[i];
    if (idx >= 0 && idx < tableData.value.length) {
      tableData.value.splice(idx, 1);
    }
  }
  selectedRows.value = [];
  checkAll.value = false;
};

const rowDupCheck = async (e, type, idx) => {
  if (type === "comCdId") {
    if (
      tableData.value[idx].comCdId == null ||
      tableData.value[idx].comCdId == ""
    ) {
      tableData.value[idx].comCdIdRowDupVal = null;
      e.target.focus();
      return;
    }
    const dupCount = tableData.value.filter(
      (item) => item.comCdId == tableData.value[idx].comCdId
    ).length;
    if (dupCount > 1) {
      tableData.value[idx].comCdIdRowDupVal = true;
      e.target.focus();
    } else {
      tableData.value[idx].comCdIdRowDupVal = false;
      e.target.focus();
    }
  } else if (type === "uptCdId") {
    if (
      tableData.value[idx].uptCdId == null ||
      tableData.value[idx].uptCdId == ""
    ) {
      tableData.value[idx].uptCdIdRowDupVal = null;
      e.target.focus();
      return;
    }
    try {
      let param = {
        groupCdId: groupCdId.value,
        subUptCdId: tableData.value[idx].uptCdId,
      };

      const response = await axios.post("/commoncode/chkUptId", param);
      if (response.data == 0) {
        tableData.value[idx].uptCdIdRowDupVal = false;
        e.target.focus();
      } else {
        tableData.value[idx].uptCdIdRowDupVal = true;
        e.target.focus();
      }
    } catch (error) {
      if (error.response != null) {
        tableData.value[idx].uptCdIdRowDupVal = true;
        e.target.focus();
      }
    }
  }
};

const check = () => {
  if (
    cdDupVal.value == null ||
    cdDupVal.value == undefined ||
    nmDupVal.value == null ||
    nmDupVal.value == undefined
  ) {
    invalidPopup();
    return;
  } else if (cdDupVal.value) {
    alertModal.value.bodyHtml = "<span>사용 중인 코드그룹ID입니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  } else if (nmDupVal.value) {
    alertModal.value.bodyHtml = "<span>사용 중인 코드그룹명입니다.</span>";
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

  if (
    groupCdId.value == undefined ||
    groupCdNm.value == undefined ||
    groupCdUseYn.value == undefined ||
    groupCdId.value == "" ||
    groupCdNm.value == "" ||
    groupCdUseYn.value == "" ||
    groupCdId.value == null ||
    groupCdNm.value == null ||
    groupCdUseYn.value == null
  ) {
    invalidPopup();
    return;
  } else if (tableData.value.length == 0) {
    invalidPopup();
    return;
  } else if (tableData.value.length > 0) {
    let nullCheckCnt = 0;
    const dupCheckSet = new Set();
    for (let i = 0; i < tableData.value.length; i++) {
      if (
        tableData.value[i].comCdId == "" ||
        tableData.value[i].comCdNm == "" ||
        tableData.value[i].sortSeq == "" ||
        tableData.value[i].useYn == "" ||
        tableData.value[i].comCdId == null ||
        tableData.value[i].comCdNm == null ||
        tableData.value[i].sortSeq == null ||
        tableData.value[i].useYn == null
      ) {
        nullCheckCnt++;
      }
      const value = tableData.value[i].comCdId;
      if (dupCheckSet.has(value)) {
        alertModal.value.bodyHtml = "<span>중복된 코드ID입니다.</span>";
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
      dupCheckSet.add(value);
    }
    if (nullCheckCnt > 0) {
      invalidPopup();
      return;
    }
  }
  alertModal.value.bodyHtml = "<span>등록 하시겠습니까?</span>";
  alertModal.value.buttons = [
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
  popupIsActive.value = true;
};

const triggerSubmit = async () => {
  let param = {
    groupCdId: groupCdId.value,
    groupCdNm: groupCdNm.value,
    groupCdExpln: groupCdExpln.value,
    useYn: groupCdUseYn.value,
    comCdData: tableData.value,
  };

  try {
    const response = await axios.post(`/commoncode/create`, param);
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>등록에 실패했습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
};

onMounted(() => {});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>