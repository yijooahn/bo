<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 툴팁 관리</p>
    <p class="heading">툴팁 등록</p>
    <div class="tit-container" style="margin-top: 2rem">
      <div class="tit"></div>
      <label>기본 정보</label>
    </div>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th><span>학과목</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="subjectList.map((item) => item.comCdNm)"
                v-model:selected="selectedSubjectNm"
                class="select-comp"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>대상</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="['교사용', '학생용']"
                v-model:selected="tooltipTrgt"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>UI명</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="uiList.map((item) => item.uiTtl)"
                v-model:selected="selectedUiNm"
                style="width: 15rem"
              ></select-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>제목</span><span class="text-red">*</span></th>
          <td>
            <span>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                maxlength="100"
                v-model="tooltipTtl"
              />
            </span>
          </td>
        </tr>
        <tr>
          <th><span>게재 기간</span><span class="text-red">*</span></th>
          <td>
            <div>
              <select-comp
                :options="['기한없음', '기간설정']"
                v-model:selected="pblcnUseYn"
              ></select-comp>
              <calendar-comp
                v-if="pblcnUseYn == '기간설정'"
                v-model:startDate="pblcnBgngYmd"
                v-model:endDate="pblcnEndYmd"
                :selectBox="false"
              ></calendar-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>내용</span><span class="text-red">*</span></th>
          <td>
            <div>
              <textarea
                class=""
                rows="10"
                v-model="tooltipCn"
                maxlength="200"
              ></textarea>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="ct-17">
        <button class="btn-1" @click="save()">등록</button>
        <button class="btn-3" @click="router.push('/tooltipMng')">목록</button>
      </div>
    </div>
    <alert-modal-comp
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-submit-handler="(v) => triggerSubmit(v)"
      @on-confirm-handler="router.push('/tooltipMng')"
      :is="AlertModalComp"
    ></alert-modal-comp>
  </div>
</template>

<script setup lang="ts">
import { useTextbookStore } from "@/store/textbook";
import { useUiStore } from "@/store/ui";
import CalendarComp from "@/views/components/Calendar.vue";
import AlertModalComp from "@/views/components/popup/SignUpModal.vue";
import SelectComp from "@/views/components/Select.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const uiStore = useUiStore();
const { getUiCodeList } = uiStore;
const uiList = ref([]);
const selectedUiNm = ref();

const tooltipTrgt = ref("교사용");
const tooltipTtl = ref("");
const pblcnUseYn = ref("");
const pblcnBgngYmd = ref();
const pblcnEndYmd = ref();
const tooltipCn = ref("");
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

watch(tooltipTrgt, async () => {
  await getUiCodeList("/tooltip", tooltipTrgt, uiList, selectedUiNm);
});

function save() {
  if (
    tooltipTrgt.value == "" ||
    selectedUiNm.value == "" ||
    tooltipTtl.value == "" ||
    (pblcnUseYn.value == "Y" && pblcnBgngYmd.value == "") ||
    (pblcnUseYn.value == "Y" && pblcnEndYmd.value == "") ||
    tooltipCn.value == "" ||
    selectedSubjectNm.value == "선택" ||
    selectedSubjectNm.value == ""
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
    popupIsActive.value = true;
  } else {
    alertModal.value.bodyHtml = "<span>등록하시겠습니까?</span>";
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
  }
}

async function triggerSubmit() {
  const tooltipDto = {
    tooltipTrgt: tooltipTrgt.value == "교사용" ? "TCHR" : "STDNT",
    uiId: uiList.value.find((item) => item.uiTtl == selectedUiNm.value).uiId,
    tooltipTtl: tooltipTtl.value,
    pblcnUseYn: pblcnUseYn.value == "기간설정" ? "Y" : "N",
    //	'pblcnBgngYmd':pblcnUseYn.value=='기간설정'?pblcnBgngYmd.value:'',
    //	'pblcnEndYmd':pblcnUseYn.value=='기간설정'?pblcnEndYmd.value:'',
    tooltipCn: tooltipCn.value,
    tooltipUseYn: "Y",
    tooltipStts: "Y",
    tooltipSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };
  if (tooltipDto.pblcnUseYn == "Y") {
    tooltipDto.pblcnBgngYmd = pblcnBgngYmd.value;
    tooltipDto.pblcnEndYmd = pblcnEndYmd.value;
  }

  try {
    await axios.post("/tooltip/create", tooltipDto);
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (err) {
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
}

onMounted(async () => {
  await getTextbookCodeList(subjectList, selectedSubjectNm, "선택");
  await getUiCodeList("/tooltip", tooltipTrgt, uiList, selectedUiNm);
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 80%;
}
</style>
