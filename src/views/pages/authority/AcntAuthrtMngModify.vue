<template>
  <div>
    <p class="breadcrumb">권한관리 > 계정별 권한관리</p>
    <p class="heading">권한변경</p>
    <div style="padding: 0.3rem">
      <div class="ct-21">
        <!--    <button class="btn-1" v-if="masking" @click="unmasking()">마스킹 해제</button>-->
        <button
          class="btn-1"
          v-if="currentId == 0"
          @click="selectMemberPopupIsActive = true"
        >
          검색
        </button>
      </div>
      <table class="table-2 t-c">
        <thead>
          <tr>
            <th v-if="currentId == 0">
              <span
                ><input
                  v-model="checkAll"
                  @click="checkAll = !checkAll"
                  :checked="selectMembers.length == searchResult.length"
                  type="checkbox"
              /></span>
            </th>
            <th><span>No.</span></th>
            <th><span>이메일</span></th>
            <th><span>관리자명</span></th>
            <th><span>소속명</span></th>
            <th><span>최종수정자명</span></th>
            <th><span>등록일시</span></th>
            <th><span>최종수정일시</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="searchResult.length > 0"
            v-for="(sr, idx) in searchResult"
            :key="idx"
          >
            <td v-if="currentId == 0">
              <span
                ><input
                  type="checkbox"
                  v-model="selectMembers"
                  :value="sr.mbrId"
              /></span>
            </td>
            <td>
              <span>{{ sr.mbrId }}</span>
            </td>
            <td>
              <span>{{ sr.emlAddr }}</span>
            </td>
            <td>
              <span>{{ sr.mbrNm }}</span>
            </td>
            <td>
              <span>{{ sr.ogdpInst }}</span>
            </td>
            <td>
              <span>{{ sr.chgr }}</span>
            </td>
            <td>
              <span>{{ sr.regDt }}</span>
            </td>
            <td>
              <span>{{ sr.chgDt }}</span>
            </td>
          </tr>
          <tr v-else>
            <td v-if="currentId == 0" colspan="8">추가된 관리자가 없습니다.</td>
          </tr>
        </tbody>
      </table>
      <div class="tit-container" style="margin-top: 2rem">
        <div class="tit"></div>
        <label>페이지별 접근권한</label>
      </div>
      <div style="margin: 1rem 0; grid-gap: 0.5rem; display: flex">
        <component
          :is="SelectComp"
          style="width: 100px; display: inline-flex"
          v-model:selected="systemType"
          :options="['ADMIN', 'LCMS', 'LRS']"
        ></component>
        <component
          :is="SelectComp"
          style="width: 100px; display: inline-flex"
          v-model:selected="selectDepth2"
          :options="splitDepth2List"
        ></component>
      </div>
      <div style="display: flex; width: 99%; max-height: 40vh; margin: 0 auto">
        <div class="table-container ">
          <table class="table-3">
            <tr
              v-if="mList.length > 0"
              v-for="(menu, idx) in mList"
              :key="idx"
              @click="() => selectClick('left', menu.menuId, menu.menuNm)"
            >
              <td style="padding: 0.5rem">{{ menu.menuNm }}</td>
            </tr>
            <tr v-else></tr>
          </table>
        </div>
        <div
          style="
            width: 20%;
            display: block;
            align-self: center;
            text-align-last: center;
          "
        >
          <div
            style="margin: 1rem; cursor: pointer"
            @click="selectAll()"
            v-if="menues.length > 0"
          >
            <img src="/images/arrowtoright.svg" />
          </div>
          <div class="ct-3" v-else>
            <img src="/images/arrowtorightdisable.svg" />
          </div>
          <div
            style="margin: 1rem; cursor: pointer"
            @click="selectList = []"
            v-if="selectList.length > 0"
          >
            <img src="/images/arrowtoleft.svg" />
          </div>
          <div class="ct-3" v-else>
            <img src="/images/arrowtoleftdisable.svg" />
          </div>
        </div>
        <div class=" table-container">
          <table class="table-3">
            <tr
              v-if="selectList.length > 0"
              v-for="(menu, idx) in selectList"
              @click="() => selectClick('right', menu.menuId, menu.menuNm)"
              :key="idx"
            >
              <td style="padding: 0.5rem">{{ menu.menuNm }}</td>
            </tr>
            <tr v-else></tr>
          </table>
        </div>
      </div>
      <div class="ct-17">
        <button class="btn-1" @click="submitTrigger()">변경</button>
        <button class="btn-3" @click="router.push('/acntAuthrtMng')">
          목록
        </button>
      </div>
    </div>
    <select-member-modal
      v-model:isActive="selectMemberPopupIsActive"
      @on-submit-handler="(selectedList) => applyList(selectedList)"
    ></select-member-modal>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="router.push('/acntAuthrtMng')"
      :is="AlertModalComp"
    ></component>
  </div>
</template>

<script setup lang="ts">
import SelectComp from "@/views/components/Select.vue";
import SelectMemberModal from "@/views/components/popup/AcntAuthrtMngModal.vue";
import AlertModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const checkAll = ref(false);
const currentId = ref(0);
const router = useRouter();
const systemType = ref("");
const systemId = ref(1);
const mList = ref([]);
const depth2List = ref(["대메뉴명"]);
const selectDepth2 = ref("대메뉴명");
const selectList = ref([]);
const menues = ref([]);
const searchResult = ref([]);
const selectMemberPopupIsActive = ref(false);
const selectMembers = ref([]);
const popupIsActive = ref(false);
const alertModal = ref({
  contentAlign: "start",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  display: "block",
  headerHtml: "<h4>알림</h4>",
  masking: true,
  //bodyHtml: "<span>승인 하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "취소",
      addClass: "btn-2",
    },
  ],
});
const splitDepth2List = computed(() => {
  var list = depth2List.value;
  const newList = [];
  for (var i = 0; i < list.length; i++) {
    newList.push(list[i].split("▷")[1]);
  }
  return newList;
});

const applyList = (memberList) => {
  if (memberList != undefined) {
    if (memberList.length > 0) {
      for (var i = memberList.length - 1; i > -1; i--) {
        searchResult.value.push(memberList[i]);
      }
      checkAll.value = true;
    }
  }
};
watch(
  searchResult,
  (newVal) => {
    const ids = newVal.map((item) => item.mbrId);
    var dupList = ids.filter(function (item, index) {
      return ids.indexOf(item) !== index;
    });
    if (dupList.length > 0) {
      for (var j = 0; j < dupList.length; j++) {
        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].mbrId == dupList[j]) {
            newVal.splice(i, 1);
            break;
          }
        }
      }
    }
    newVal.sort(function (a, b) {
      return a.mbrId - b.mbrId;
    });
  },
  {
    deep: true,
  }
);

const modifyAuth = async (param) => {
  try {
    const response = await axios.post("/authority/modify", param);
    return true;
  } catch (err) {
    return false;
  }
};

watch(
  depth2List,
  (newVal) => {
    selectDepth2.value = splitDepth2List.value[0];
  },
  {
    deep: true,
  }
);

watch(checkAll, (newVal) => {
  if (newVal) {
    selectMembers.value = searchResult.value.map((sr) => sr.mbrId);
  } else {
    selectMembers.value = [];
  }
});

watch(
  selectList,
  (newVal) => {
    if (newVal.length > 0) {
      const ids = newVal.map((item) => item.menuId);
      var dupList = ids.filter(function (item, index) {
        return ids.indexOf(item) !== index;
      });
      for (var j = 0; j < dupList.length; j++) {
        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].menuId == dupList[j]) {
            newVal.splice(i, 1);
            break;
          }
        }
      }
      newVal.sort(function (a, b) {
        return a.menuId - b.menuId;
      });
    }
  },
  {
    deep: true,
  }
);

watch(systemType, (newVal, oldVal) => {
  if (newVal == "ADMIN") {
    systemId.value = 1;
  } else if (newVal == "LCMS") {
    systemId.value = 2;
  } else if (newVal == "LRS") {
    systemId.value = 3;
  }
});

watch(selectDepth2, (newVal, oldVal) => {
  if (newVal != oldVal) {
    mList.value = [];
    if (menues.value.length > 0) {
      for (var i = 0; i < menues.value.length; i++) {
        if (menues.value[i].menuNm.includes(newVal)) {
          mList.value.push(menues.value[i]);
        }
      }
    }
  }
});

watch(systemId, async (newVal, oldVal) => {
  if (newVal != oldVal) {
    menues.value = [];
    depth2List.value = [];
    selectDepth2.value = "대메뉴명";
    await menuListLoad();
  }
});

async function submitTrigger() {
  if (currentId.value > 0) {
    selectMembers.value = [];
    selectMembers.value.push(searchResult.value[0].mbrId);
  }
  if (selectMembers.value.length > 0) {
    var param = {};
    param.mbrIdList = selectMembers.value;
    const menues = selectList.value.map((item) => item.menuId);
    var menu = "";
    for (var i = 0; i < menues.length; i++) {
      if (menu != "") {
        menu += ",";
      }
      menu += menues[i].toString();
    }
    param.menu = menu;
    var result = await modifyAuth(param);
    if (result) {
      alertModal.value.masking = false;
      alertModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "reload",
          content: "확인",
          addClass: "btn-1",
        },
      ];
    } else {
      alertModal.value.masking = false;
      alertModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
      alertModal.value.buttons = [
        {
          clickEvent: "close",
          content: "확인",
          addClass: "btn-1",
        },
      ];
    }
    popupIsActive.value = true;
  } else {
    alertModal.value.masking = false;
    alertModal.value.bodyHtml = "<span>수정할 관리자를 지정해 주세요.</span>";
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

function selectAll() {
  for (var i = 0; i < mList.value.length; i++) {
    selectList.value.push(mList.value[i]);
  }
}

const menuListLoad = async () => {
  try {
    var param = {};
    param.systemId = systemId.value;
    const response = await axios.post("/authority/pageinquiry", param);
    if (response.data != null) {
      var responseList = response.data;
      for (var i = 0; i < responseList.length; i++) {
        var menu = {};
        menu.menuId = responseList[i].menuId;
        menu.menuNm = responseList[i].menuNm;
        menues.value.push(menu);
      }
      depth2List.value = [];
      for (var i = 0; i < menues.value.length; i++) {
        var firstIdx = menues.value[i].menuNm.toString().indexOf("▷");
        if (firstIdx > -1) {
          var secondIdx = menues.value[i].menuNm
            .toString()
            .indexOf("▷", firstIdx + 1);
          if (secondIdx > -1) {
            var depth2menu = menues.value[i].menuNm
              .toString()
              .substring(firstIdx + 1, secondIdx);
            var m = "▷" + depth2menu;
            if (!depth2List.value.includes(m)) {
              depth2List.value.push(m);
            }
          } else {
            var depth2menu = menues.value[i].menuNm
              .toString()
              .substring(firstIdx + 1);
            var m = "▷" + depth2menu;
            if (!depth2List.value.includes(m)) {
              depth2List.value.push(m);
            }
          }
        }
      }
      //  if (depth2List.value.length > 0) {
      //     selectDepth2.value = splitDepth2List.value[0]
      //  }
    }
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
      }
    }
  }
};

const selectClick = (type, id, name) => {
  if (selectList.value.length > 0) {
    if (type == "right") {
      var lastNum = parseInt(id.substring(id.length - 1, id.length));
      var list = [];
      if (lastNum < 6) {
        for (var i = 5; i >= lastNum; i--) {
          var searchId = id.substring(0, id.length - 1);
          searchId += i;
          list.push(searchId);
        }
      } else {
        list.push(id);
      }
      for (var k = 0; k < list.length; k++) {
        for (var j = selectList.value.length - 1; j > -1; j--) {
          if (list[k] == selectList.value[j].menuId) {
            selectList.value.splice(j, 1);
            break;
          }
        }
      }
    }
    for (var i = 0; i < selectList.value.length; i++) {
      if (selectList.value[i].menuId == id) {
        selectList.value.splice(i, 1);
        return;
      }
    }
  }
  if (type == "right") {
    return;
  }
  var menu = {};
  menu.menuId = id;
  menu.menuNm = name;
  selectList.value.push(menu);

  var lastNum = parseInt(id.substring(id.length - 1, id.length));
  var list = [];
  if (lastNum > 0 && lastNum < 6) {
    for (var i = 0; i < lastNum; i++) {
      var searchId = id.substring(0, id.length - 1);
      searchId += i;
      list.push(searchId);
    }
    if (list.length > 0) {
      for (var j = 0; j < mList.value.length; j++) {
        for (var k = 0; k < list.length; k++) {
          if (list[k] == mList.value[j].menuId) {
            var menu = {};
            menu.menuId = mList.value[j].menuId;
            menu.menuNm = mList.value[j].menuNm;
            selectList.value.push(menu);
          }
        }
      }
    }
  }
};

onMounted(async () => {
  await menuListLoad();
  systemType.value = "ADMIN";

  if (history.state.id != null && history.state.id * 1 > 0) {
    currentId.value = history.state.id;
    await axios
      .get(`/authority/detailmember/${currentId.value}`)
      .then((res) => {
        searchResult.value.push(res.data.authorityDto);
        axios.get(`authority/detail/${currentId.value}`).then((response) => {
          if (response.data.menuList != null) {
            selectList.value = [];
            for (var i = 0; i < response.data.menuList.length; i++) {
              var menu = {};
              menu.menuId = response.data.menuList[i].menuId;
              menu.menuNm = response.data.menuList[i].menuNm;
              selectList.value.push(menu);
            }
          }
        });
      });
  }
});
</script>

<style scoped>
img:hover {
  filter: brightness(0.6);
}
.table-container {
  width: 40%;
  overflow: auto;
  border: solid 0.5px #dbe0ef;
  box-shadow: 2px 6px 6px 0px rgb(55 93 225 / 8%);
}
</style>
