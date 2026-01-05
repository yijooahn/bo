<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">시스템 관리 > 공통코드관리</p>
    <p class="heading">공통코드 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tbody>
        <tr>
          <th><span>No.</span></th>
          <td>{{ idx }}</td>
        </tr>
        <tr>
          <th><span>코드그룹ID</span><span class="text-red"> *</span></th>
          <td>
            <input
              disabled
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
    <div class="ct-18">
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
      <tbody v-if="searchResult.length > 0">
        <tr v-for="(sr, idx) in searchResult" :key="idx">
          <td style="text-align: center">
            <input type="checkbox" v-model="selectedRows" :value="idx" />
          </td>
          <td>
            <div class="dp-b" v-if="sr.preVal && sr.comCdIdRowDupVal == null">
              <div>
                <input
                  disabled
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
                />
              </div>
            </div>
            <div
              class="dp-b"
              v-if="
                sr.preVal && sr.comCdIdRowDupVal != null && sr.comCdIdRowDupVal
              "
            >
              <div>
                <input
                  disabled
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
                />
              </div>
              <div><span class="text-red">사용 중인 코드ID입니다</span></div>
            </div>
            <div
              class="dp-b"
              v-if="
                sr.preVal && sr.comCdIdRowDupVal != null && !sr.comCdIdRowDupVal
              "
            >
              <div>
                <input
                  disabled
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
                />
              </div>
              <div>
                <span style="color: #4876ef">사용 가능한 코드ID입니다</span>
              </div>
            </div>
            <div class="dp-b" v-if="!sr.preVal && sr.comCdIdRowDupVal == null">
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
                />
              </div>
            </div>
            <div
              class="dp-b"
              v-if="
                !sr.preVal && sr.comCdIdRowDupVal != null && sr.comCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
                />
              </div>
              <div><span class="text-red">사용 중인 코드ID입니다</span></div>
            </div>
            <div
              class="dp-b"
              v-if="
                !sr.preVal &&
                sr.comCdIdRowDupVal != null &&
                !sr.comCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.comCdId"
                  style="width: 80%"
                  placeholder="코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'comCdId', idx)"
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
              style="width: 80%"
              placeholder="코드명을 입력하세요"
              maxlength="50"
              @change="changeValue($event, 'comCdNm', idx)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdExpln"
              style="width: 80%"
              placeholder="설명을 입력하세요"
              maxlength="50"
              @change="changeValue($event, 'comCdExpln', idx)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.sortSeq"
              @input="inputHandler($event, idx)"
              style="width: 80%"
              placeholder="순서를 입력하세요"
              @change="changeValue($event, 'sortSeq', idx)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdAtrb1"
              style="width: 80%"
              placeholder="속성을 입력하세요"
              @change="changeValue($event, 'comCdAtrb1', idx)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="sr.comCdAtrb2"
              style="width: 80%"
              placeholder="속성을 입력하세요"
              @change="changeValue($event, 'comCdAtrb2', idx)"
            />
          </td>
          <td>
            <div class="dp-b" v-if="sr.preVal && sr.uptCdIdRowDupVal == null">
              <input
                type="text"
                v-model="sr.uptCdId"
                style="width: 80%"
                placeholder="상위코드ID를 입력하세요"
                maxlength="20"
                @change="changeValue($event, 'uptCdId', idx)"
              />
            </div>
            <div
              class="dp-b"
              v-if="
                sr.preVal && sr.uptCdIdRowDupVal != null && sr.uptCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 80%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'uptCdId', idx)"
                />
              </div>
              <div>
                <span style="color: #4876ef">사용 가능한 코드ID입니다</span>
              </div>
            </div>
            <div
              class="dp-b"
              v-if="
                sr.preVal && sr.uptCdIdRowDupVal != null && !sr.uptCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 80%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'uptCdId', idx)"
                />
              </div>
              <div>
                <span class="text-red">등록되지 않은 코드ID입니다</span>
              </div>
            </div>
            <div class="dp-b" v-if="!sr.preVal && sr.uptCdIdRowDupVal == null">
              <input
                type="text"
                v-model="sr.uptCdId"
                style="width: 80%"
                placeholder="상위코드ID를 입력하세요"
                maxlength="20"
                @change="changeValue($event, 'uptCdId', idx)"
              />
            </div>
            <div
              class="dp-b"
              v-if="
                !sr.preVal && sr.uptCdIdRowDupVal != null && sr.uptCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 80%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'uptCdId', idx)"
                />
              </div>
              <div>
                <span style="color: #4876ef">사용 가능한 코드ID입니다</span>
              </div>
            </div>
            <div
              class="dp-b"
              v-if="
                !sr.preVal &&
                sr.uptCdIdRowDupVal != null &&
                !sr.uptCdIdRowDupVal
              "
            >
              <div>
                <input
                  type="text"
                  v-model="sr.uptCdId"
                  style="width: 80%"
                  placeholder="상위코드ID를 입력하세요"
                  maxlength="20"
                  @change="changeValue($event, 'uptCdId', idx)"
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
                @change="changeValue($event, 'useYn', idx)"
              /><label for="rdoY">Y</label>
              <input
                type="radio"
                id="rdoN"
                v-model="sr.useYn"
                value="N"
                @change="changeValue($event, 'useYn', idx)"
              /><label for="rdoN">N</label>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="t-c">
          <td colspan="10">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="check()">적용</button>
      <button class="btn-2" @click="clickDelete()">삭제</button>
      <button class="btn-3" @click="router.push('/ComCdMng')">목록</button>
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
    <reg-modal
      v-model:isActive="deletePopupIsActive"
      :alertModal="deleteModal"
      @onSubmitHandler="deleteSubmit()"
    ></reg-modal>
  </div>
</template>

<script setup lang="ts">
import RegModal from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const alertModal = ref({
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

const deleteModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>삭제하시겠습니까?</span>",
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

const router = useRouter();
const deleteCheckedPopupIsActive = ref(false);
const deletePopupIsActive = ref(false);
const popupIsActive = ref(false);

const groupCdId = ref();
const idx = ref();
const originalGroupCdId = ref(null);
const originalGroupCdNm = ref(null);
const cdDupVal = ref(false);
const nmDupVal = ref(false);

const groupCdNm = ref();
const groupCdExpln = ref();
const groupCdUseYn = ref();

const checkAll = ref(false);
const selectedRows = ref([]);
const deletedRows = ref([]);
const searchResult = ref([]);

watch(selectedRows, () => {
  checkAll.value =
    selectedRows.value.length > 0 &&
    selectedRows.value.length === searchResult.value.length;
});

const toggleCheckAll = () => {
  if (checkAll.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = searchResult.value.map((_, index) => index);
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
  searchResult.value[index].sortSeq = numberInput;
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
        } else if (
          response.data == 1 &&
          groupCdId.value == originalGroupCdId.value
        ) {
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
        } else if (
          response.data == 1 &&
          groupCdNm.value == originalGroupCdNm.value
        ) {
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
    if (!regex.test(groupCdId.value.toString())) {
      groupCdId.value = groupCdId.value
        .toString()
        .replace(/[^a-zA-Z0-9_]/g, "");
    }
  } else if (type === "groupCdNm") {
    // if (!regex.test(groupCdNm.value)) {
    //   groupCdNm.value = groupCdNm.value.replace(/[^a-zA-Z0-9_]/g, "");
    // }
  }
};

const changeValue = (e, type, idx) => {
  rowDupCheck(e, type, idx);
  if (
    searchResult.value[idx].rowType == "N" &&
    searchResult.value[idx].preVal
  ) {
    searchResult.value[idx].rowType = "U";
  }
};

const rowDupCheck = async (e, type, idx) => {
  if (type === "comCdId") {
    if (
      searchResult.value[idx].comCdId == null ||
      searchResult.value[idx].comCdId == ""
    ) {
      searchResult.value[idx].comCdIdRowDupVal = null;
      e.target.focus();
      return;
    }
    const dupCount = searchResult.value.filter(
      (item) => item.comCdId == searchResult.value[idx].comCdId
    ).length;
    if (dupCount > 1) {
      searchResult.value[idx].comCdIdRowDupVal = true;
      e.target.focus();
    } else {
      searchResult.value[idx].comCdIdRowDupVal = false;
      e.target.focus();
    }
  } else if (type === "uptCdId") {
    if (
      searchResult.value[idx].uptCdId == null ||
      searchResult.value[idx].uptCdId == ""
    ) {
      searchResult.value[idx].uptCdIdRowDupVal = null;
      e.target.focus();
      return;
    }
    try {
      let param = {
        groupcdId: groupCdId.value,
        subUptCdId: searchResult.value[idx].uptCdId,
      };

      const response = await axios.post("/commoncode/chkUptId", param);
      if (response.data == 0) {
        searchResult.value[idx].uptCdIdRowDupVal = false;
        e.target.focus();
      } else {
        searchResult.value[idx].uptCdIdRowDupVal = true;
        e.target.focus();
      }
    } catch (error) {
      if (error.response != null) {
        searchResult.value[idx].uptCdIdRowDupVal = true;
        e.target.focus();
      }
    }
  }
};

const addRow = () => {
  searchResult.value.push({
    comCdId: "",
    comCdNm: "",
    comCdExpln: "",
    sortSeq: "",
    comCdAtrb1: "",
    comCdAtrb2: "",
    uptCdId: "",
    useYn: "Y",
    preVal: false,
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
    if (idx >= 0 && idx < searchResult.value.length) {
      const deletedItem = searchResult.value.splice(idx, 1);
      if (deletedItem[0].preVal) {
        deletedItem[0].rowType = "D";
        deletedRows.value.push(deletedItem[0]);
      }
    }
  }
  selectedRows.value = [];
  checkAll.value = false;
};

const clickDelete = () => {
  deletePopupIsActive.value = true;
};

const deleteSubmit = async () => {
  try {
    const response = await axios.delete(
      `/commoncode/delete/${groupCdId.value}`
    );
    alertModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    alertModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
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
  } else if (searchResult.value.length == 0) {
    invalidPopup();
    return;
  } else if (searchResult.value.length > 0) {
    let nullCheckCnt = 0;
    const dupCheckSet = new Set();
    for (let i = 0; i < searchResult.value.length; i++) {
      if (
        searchResult.value[i].comCdId === "" ||
        searchResult.value[i].comCdNm === "" ||
        searchResult.value[i].sortSeq === "" ||
        searchResult.value[i].useYn === "" ||
        searchResult.value[i].comCdId === null ||
        searchResult.value[i].comCdNm === null ||
        searchResult.value[i].sortSeq === null ||
        searchResult.value[i].useYn === null
      ) {
        nullCheckCnt++;
      }
      if (searchResult.value[i].comCdIdRowDupVal) {
        alertModal.value.bodyHtml = "<span>사용 중인 코드ID입니다.</span>";
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

      const value = searchResult.value[i].comCdId;
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
  alertModal.value.bodyHtml = "<span>수정 사항을 적용하시겠습니까?</span>";
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
    comCdData: [...deletedRows.value, ...searchResult.value],
  };

  try {
    const response = await axios.post(`/commoncode/modify`, param);
    alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
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
        popupIsActive.value = true;
      } else {
        alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
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
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("comCdMng");
  } else {
    groupCdId.value = history.state.id;
    idx.value = history.state.idx;

    await axios
      .get(`/commoncode/detail/${groupCdId.value}`)
      .then((response) => {
        if (response.data != null) {
          groupCdNm.value = response.data.commonCode.groupCdNm;
          groupCdExpln.value = response.data.commonCode.groupCdExpln;
          groupCdUseYn.value = response.data.commonCode.useYn;
          if (response.data.commonCodeList != null) {
            searchResult.value = response.data.commonCodeList.map((obj) => ({
              ...obj,
              preVal: true,
              rowType: "N",
              comCdIdRowDupVal: false,
              uptCdIdRowDupVal: obj.uptCdId == "" ? null : false,
            }));
          } else {
            searchResult.value = [];
          }
        } else {
          searchResult.value = [];
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            if (error.response.status == 404) {
              searchResult.value = [];
            }
          }
        }
      })
      .finally(() => {
        originalGroupCdId.value = groupCdId.value;
        originalGroupCdNm.value = groupCdNm.value;
      });
  }
};

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
th,
td {
  font-weight: unset;
  font-style: unset;
  padding: 0.3rem !important;
}

input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>