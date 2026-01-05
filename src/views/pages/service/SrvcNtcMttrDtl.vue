<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 서비스 공지사항 관리</p>
    <p class="heading">서비스 공지사항 상세정보</p>
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
            <span>{{ srvcNtcId }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>학과목</span></th>
          <td>
            <span>{{ srvcNtcSbjctNm }}</span>
          </td>
        </tr>
        <tr>
          <th><span>대상</span></th>
          <td>
            <span v-if="srvcNtcTrgt === 'COM'">공통</span>
            <span v-if="srvcNtcTrgt === 'TCHR'">교사용</span>
            <span v-if="srvcNtcTrgt === 'STDNT'">학생용</span>
          </td>
        </tr>
        <tr>
          <th><span>제목</span></th>
          <td>
            <span>{{ srvcNtcTtl }}</span>
          </td>
        </tr>
        <tr>
          <th><span>노출여부</span></th>
          <td>
            <div style="display: inline-flex; margin-right: 10px">
              <span v-if="expsrMthd === 'Y'">노출</span>
              <span v-if="expsrMthd === 'P'">기간노출</span>
              <span v-if="expsrMthd === 'N'">비노출</span>
            </div>
            <div v-if="expsrMthd === 'P'" style="display: inline-flex">
              <span> / </span>
              <span>{{ expsrBgngYmd }}</span>
              <span style="align-self: center; padding: 0 0.5rem">~</span>
              <span>{{ expsrEndYmd }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>상단고정 여부</span></th>
          <td>
            <span v-if="uptFixYn === 'Y'">고정</span>
            <span v-if="uptFixYn === 'N'">고정아님</span>
          </td>
        </tr>
        <tr>
          <th><span>파일첨부</span></th>
          <td v-if="atchFile != null">
            <div>
              <img src="/images/icon06.svg" />
              <span
                style="cursor: pointer; line-height: 100%"
                @click="
                  downloadFile(atchFile.atchFileLink, atchFile.atchFileNm)
                "
              >
                {{ atchFile.atchFileNm }}
              </span>
            </div>
          </td>
          <td v-if="atchFile === null"><span>첨부된 파일이 없습니다</span></td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td v-html="setTextForm(srvcNtcCn)"></td>
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
        <button class="btn-1" @click="moveToModify(srvcNtcId)">수정</button>
        <button class="btn-3" @click="router.push('/srvcNtcMttrMng')">
          목록
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const store = useFileStore();
const { downloadFile } = store;
const router = useRouter();
const detailMaskingFlag = inject("detailMaskingFlag");

const srvcNtcId = ref();
const srvcNtcSbjctNm = ref();
const srvcNtcTrgt = ref();
const srvcNtcTtl = ref();
const expsrMthd = ref();
const expsrBgngYmd = ref();
const expsrEndYmd = ref();
const uptFixYn = ref();
const srvcNtcCn = ref();
const rgtr = ref();
const rgtrId = ref();
const regDt = ref();
const chgr = ref(null);
const chgrId = ref(null);
const chgDt = ref(null);
const atchFile = ref(null);

function setTextForm(text) {
  if (text != null && text != undefined) {
    if (text.includes("\n")) {
      return text.replaceAll("\n", "<br>");
    } else {
      return text;
    }
  }
}

const moveToModify = (srvcNtcId) => {
  router.push({
    name: "srvcNtcMttrMdfcnView",
    state: { id: srvcNtcId },
  });
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/srvcNtcMttrMng");
  } else {
    srvcNtcId.value = history.state.id;
    let serviceNoticeDto = {
      srvcNtcId: srvcNtcId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/servicenotice/detail`, serviceNoticeDto)
      .then((response) => {
        srvcNtcTrgt.value = response.data.servicenoticeDto.srvcNtcTrgt;
        srvcNtcSbjctNm.value = response.data.servicenoticeDto.comCdNm;
        srvcNtcTtl.value = response.data.servicenoticeDto.srvcNtcTtl;
        expsrMthd.value = response.data.servicenoticeDto.expsrMthd;
        expsrBgngYmd.value = response.data.servicenoticeDto.expsrBgngYmd;
        expsrEndYmd.value = response.data.servicenoticeDto.expsrEndYmd;
        uptFixYn.value = response.data.servicenoticeDto.uptFixYn;
        srvcNtcCn.value = response.data.servicenoticeDto.srvcNtcCn;
        rgtr.value = response.data.servicenoticeDto.rgtr;
        rgtrId.value = response.data.servicenoticeDto.rgtrId;
        chgr.value = response.data.servicenoticeDto.chgr;
        chgrId.value = response.data.servicenoticeDto.chgrId;
        regDt.value = response.data.servicenoticeDto.regDt;
        chgDt.value = response.data.servicenoticeDto.chgDt;
        if (response.data.atchFileDtoList.length > 0) {
          atchFile.value = response.data.atchFileDtoList[0];
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("/srvcNtcMttrMng");
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