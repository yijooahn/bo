<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > PM 일정 관리</p>
    <p class="heading">PM 일정 상세정보</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
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
          <th><span>제목</span></th>
          <td>
            <span>{{ pmSchdlTtl }}</span>
          </td>
        </tr>
        <tr>
          <th><span>작업내용</span></th>
          <td v-html="setTextForm(pmSchdlCn)"></td>
        </tr>
        <tr>
          <th><span>작업기간</span></th>
          <td>
            <span>{{ jobBgngDt }} ~ {{ jobEndDt }}</span>
          </td>
        </tr>
        <tr>
          <th><span>작업 영향 범위</span></th>
          <td>
            <span v-if="jobInflRange === 0">전체</span>
            <span v-if="jobInflRange === 1">사용자</span>
            <span v-if="jobInflRange === 2">관리자</span>
          </td>
        </tr>
        <tr>
          <th><span>긴급 연락처</span></th>
          <td>
            <span>{{ emct }}</span>
          </td>
        </tr>
        <tr>
          <th><span>사전안내 유무</span></th>
          <td>
            <span v-if="bfhdGdYn === 'Y'"
              >진행 / {{ bfhdBgngDt }} ~ {{ bfhdEndDt }}</span
            >
            <span v-if="bfhdGdYn === 'N'">미진행</span>
          </td>
        </tr>
      </table>
      <br />
      <div v-if="bfhdGdYn === 'Y'">
        <div class="tit"></div>
        <label>사전안내 등록</label>
      </div>
      <table class="table-1" v-if="bfhdGdYn === 'Y'">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tr>
          <th><span>제목</span></th>
          <td>
            <span>{{ bfhdTtl }}</span>
          </td>
        </tr>
        <tr>
          <th><span>작업내용</span></th>
          <td v-html="setTextForm(bfhdJobCn)"></td>
        </tr>
        <tr>
          <th><span>작업기간</span></th>
          <td>
            <span>{{ bfhdBgngDt }} ~ {{ bfhdEndDt }}</span>
          </td>
        </tr>
        <tr>
          <th><span>작업 영향 범위</span></th>
          <td>
            <span v-if="bfhdJobInflRange === 0">전체</span>
            <span v-if="bfhdJobInflRange === 1">사용자</span>
            <span v-if="bfhdJobInflRange === 2">관리자</span>
          </td>
        </tr>
        <tr>
          <th><span>긴급 연락처</span></th>
          <td>
            <span>{{ bfhdEmct }}</span>
          </td>
        </tr>
        <tr>
          <th><span>사전안내 내용</span></th>
          <td v-html="setTextForm(bfhdCn)"></td>
        </tr>
      </table>
      <br />
      <div class="tit"></div>
      <label>등록/수정 정보</label>
      <table>
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="10%" />
          <col width="40%" />
        </colgroup>
        <tr>
          <th><span>등록자</span></th>
          <td>
            <span>{{ rgtr }} / {{ rgtrId }}</span>
          </td>
          <th><span>등록일</span></th>
          <td>
            <span>{{ regDt }}</span>
          </td>
        </tr>
        <tr>
          <th><span>최종수정자</span></th>
          <td>
            <span v-if="chgr == null && chgrId == null">-</span>
            <span v-else>{{ chgr }} / {{ chgrId }}</span>
          </td>
          <th><span>최종수정일</span></th>
          <td>
            <span v-if="chgDt == null">-</span>
            <span v-else>{{ chgDt }}</span>
          </td>
        </tr>
      </table>
      <div class="ct-17">
        <button class="btn-1" @click="moveToModify(pmSchdlId)">수정</button>
        <button class="btn-3" @click="router.push('/pmSchdlMng')">목록</button>
      </div>
      <component
        v-model:isActive="popupIsActive"
        :alertModal="alertModal"
        :is="ModalComp"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const detailMaskingFlag = inject("detailMaskingFlag");
const popupIsActive = ref(false);

const pmSchdlId = ref();
const pmSchdlTtl = ref();
const pmSchdlStts = ref();
const pmSchdlCn = ref();
const jobBgngDt = ref();
const jobEndDt = ref();
const jobInflRange = ref();
const emct = ref();
const bfhdTtl = ref();
const bfhdJobCn = ref();
const bfhdGdYn = ref();
const bfhdBgngDt = ref();
const bfhdEndDt = ref();
const bfhdJobInflRange = ref();
const bfhdCn = ref();
const bfhdEmct = ref();
const rgtr = ref();
const rgtrId = ref();
const regDt = ref();
const chgr = ref(null);
const chgrId = ref(null);
const chgDt = ref(null);

const alertModal = ref({
  contentAlign: "start",
  overflow: "hidden",
  display: "block",
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

function setTextForm(text) {
  if (text != null && text != undefined) {
    if (text.includes("\n")) {
      return text.replaceAll("\n", "<br>");
    } else {
      return text;
    }
  }
}

const moveToModify = (pmSchdlId) => {
  if (pmSchdlStts.value == "C" || pmSchdlStts.value == "E") {
    alertModal.value.headerHtml = "<h4>알림</h4>";
    alertModal.value.bodyHtml =
      "<span>조기 종료 및 취소 처리된 PM 일정은<br>수정하실 수 없습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  } else {
    router.push({
      name: "pmSchdlMdfcnView",
      state: { id: pmSchdlId },
    });
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/pmSchdlMng");
  } else {
    pmSchdlId.value = history.state.id;
    let pmDto = {
      pmSchdlId: pmSchdlId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/pmSchedule/detail`, pmDto)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.pmDto;
          pmSchdlTtl.value = dto.pmSchdlTtl;
          pmSchdlStts.value = dto.pmSchdlStts;
          pmSchdlCn.value = dto.pmSchdlCn;
          jobBgngDt.value = dto.jobBgngDt;
          jobEndDt.value = dto.jobEndDt;
          jobInflRange.value = dto.jobInflRange;
          emct.value = dto.emct;
          bfhdTtl.value = dto.bfhdTtl;
          bfhdJobCn.value = dto.bfhdJobCn;
          bfhdGdYn.value = dto.bfhdGdYn;
          bfhdBgngDt.value = dto.bfhdBgngDt;
          bfhdEndDt.value = dto.bfhdEndDt;
          bfhdJobInflRange.value = dto.bfhdJobInflRange;
          bfhdCn.value = dto.bfhdCn;
          bfhdEmct.value = dto.bfhdEmct;
          rgtr.value = dto.rgtr;
          rgtrId.value = dto.rgtrId;
          regDt.value = dto.regDt;
          chgr.value = dto.chgr;
          chgrId.value = dto.chgrId;
          chgDt.value = dto.chgDt;
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("/pmSchdlMng");
          }
        }
      })
      .finally(() => {
        detailMaskingFlag.value = true;
      });
  }
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
</style>