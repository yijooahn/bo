<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 약관 이력 관리</p>
    <p class="heading">약관 상세정보</p>
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
            <span>{{ trmsId }}</span>
          </td>
        </tr>
        <tr>
          <th><span>약관구분</span></th>
          <td>
            <span v-if="trmsSeId == 'TOS'">이용약관</span>
            <span v-if="trmsSeId == 'PRH'">개인정보처리</span>
           <!-- <span v-if="trmsSeId == 'ORP'">운영정책</span>-->
          </td>
        </tr>
        <tr>
          <th><span>필수여부</span></th>
          <td>
            <span v-if="esntlSeId == 'EST'">필수</span>
            <span v-if="esntlSeId == 'CHC'">선택</span>
            <span v-if="esntlSeId == 'NTC'">고지</span>
          </td>
        </tr>
        <tr>
          <th><span>약관 게시일</span></th>
          <td>
            <span>{{ trmsPstgYmd }}</span>
          </td>
        </tr>
        <tr>
          <th><span>파일첨부</span></th>
          <td v-if="atchFile != null">
            <div>
              <img src="/images/icon06.svg" />
              <span
                class="cs-p"
                @click="
                  downloadFile(atchFile.atchFileLink, atchFile.atchFileNm)
                "
                >{{ atchFile.atchFileNm }}</span
              >
            </div>
          </td>
          <td v-if="atchFile === null"><span>첨부된 파일이 없습니다</span></td>
        </tr>
        <tr>
          <th><span>현황</span></th>
          <td>
            <span v-if="trmsUseYn == 'Y'" class="text-red">현재버전</span>
            <span v-else>종료</span>
          </td>
        </tr>
        <tr>
          <th><span>약관 변경 내용</span></th>
          <td v-html="setTextForm(trmsCn)"></td>
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
        <button class="btn-1" @click="moveToModify(trmsId)">수정</button>
        <button class="btn-3" @click="router.push('/trmsHstryMng')">
          목록
        </button>
      </div>
      <file-info-popup
        v-model:isActive="popupIsActive"
        :alertModal="fileInfoModal"
      ></file-info-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import FileInfoPopup from "@/views/components/popup/FileInfoPopup.vue";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useFileStore();
const { downloadFile } = store;
const popupIsActive = ref(false);
const detailMaskingFlag = inject("detailMaskingFlag");

const trmsId = ref();
const trmsSeId = ref();
const esntlSeId = ref();
const trmsPstgYmd = ref();
const trmsUseYn = ref();
const trmsStts = ref();
const trmsCn = ref();
const rgtr = ref();
const rgtrId = ref();
const regDt = ref();
const chgr = ref(null);
const chgrId = ref(null);
const chgDt = ref(null);
const atchFile = ref(null);

const fileInfoModal = ref({
  contentAlign: "center",
  msgWidth: "100%",
  msgHeight: "100%",
  headerHtml: "파일정보",
  width: "fit-content",
  height: "fit-content",
  bodyHtml: "",
  atchFile: null,
  buttons: [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ],
});

// const openFileInfoPopup = () => {
// 	fileInfoModal.value.atchFile = atchFile.value;
//   popupIsActive.value = true;
// }

function setTextForm(text) {
  if (text != null && text != undefined) {
    if (text.includes("\n")) {
      return text.replaceAll("\n", "<br>");
    } else {
      return text;
    }
  }
}

const moveToModify = (trmsId) => {
  router.push({
    name: "trmsHstryMdfcnView",
    state: { id: trmsId },
  });
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/trmsHstryMng");
  } else {
    trmsId.value = history.state.id;
    let trmsDto = {
      trmsId: trmsId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/terms/detail`, trmsDto)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.termsDto;
          trmsSeId.value = dto.trmsSeId;
          esntlSeId.value = dto.esntlSeId;
          trmsPstgYmd.value = dto.trmsPstgYmd;
          trmsUseYn.value = dto.trmsUseYn;
          trmsStts.value = dto.trmsStts;
          trmsCn.value = dto.trmsCn;
          rgtr.value = dto.rgtr;
          chgr.value = dto.chgr;
          regDt.value = dto.regDt;
          chgDt.value = dto.chgDt;
          rgtrId.value = dto.rgtrId;
          chgrId.value = dto.chgrId;
          if (response.data.atchFileDtoList.length > 0) {
            atchFile.value = response.data.atchFileDtoList[0];
          }
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("/trmsHstryMng");
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