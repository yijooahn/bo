<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 안내 동영상 관리</p>
    <p class="heading">안내 동영상 상세정보</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tr>
          <th class="align-left"><span>No.</span></th>
          <td>
            <span>{{ gdVdoId }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>학과목</span></th>
          <td>
            <span>{{ gdvdoSbjctNm }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>대상</span></th>
          <td v-if="gdVdoTrgt === 'TCHR'"><span>교사용</span></td>
          <td v-if="gdVdoTrgt === 'STDNT'"><span>학생용</span></td>
        </tr>
        <tr>
          <th class="align-left"><span>UI명</span></th>
          <td>
            <span>{{ uiTtl }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>제목</span></th>
          <td>
            <span>{{ gdVdoTtl }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>게재 기간</span></th>
          <td v-if="pblcnUseYn === 'Y'">
            <span>{{ pblcnBgngYmd }} ~ {{ pblcnEndYmd }}</span>
          </td>
          <td v-if="pblcnUseYn === 'N'"><span>기한없음</span></td>
        </tr>
        <tr>
          <th class="align-left"><span>현황</span></th>
          <td v-if="gdVdoStts === 'Y'">
            <span class="text-red">현재버전</span>
          </td>
          <td v-if="gdVdoStts === 'N'"><span>종료</span></td>
        </tr>
        <tr>
          <th class="align-left">
            <span>파일첨부</span>
          </th>
          <td v-if="atchFile != null && atchFile != undefined">
            <div>
              <img src="/images/icon06.svg" />
              <span
                class="cs-p"
                @click="
                  downloadFile(atchFile.atchFileLink, atchFile.atchFileNm)
                "
              >
                {{ atchFile.atchFileNm }}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td>{{ gdVdoCn }}</td>
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
            <span>{{ rgtr }}/{{ rgtrId }}</span>
          </td>
          <th><span>등록일</span></th>
          <td>
            <span>{{ regDt }}</span>
          </td>
        </tr>
        <tr>
          <th><span>최종수정자</span></th>
          <td>
            <span>{{ chgr }}/{{ chgrId }}</span>
          </td>
          <th><span>최종수정일</span></th>
          <td>
            <span>{{ chgDt }}</span>
          </td>
        </tr>
      </table>
      <div class="ct-17">
        <!--<button class="btn-1" @click="router.push(`/gdVdoMngModify/${gdVdoId}`)">수정</button>-->
        <button
          class="btn-1"
          @click="
            router.push({ name: 'gdVdoMdfcnView', state: { id: `${gdVdoId}` } })
          "
        >
          수정
        </button>
        <button class="btn-3" @click="router.push('/gdVdoMng')">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

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

const router = useRouter();
const popupIsActive = ref(false);
const store = useFileStore();
const { downloadFile } = store;
const detailMaskingFlag = inject("detailMaskingFlag");

const gdVdoId = ref(0);
const gdvdoSbjctNm = ref();
const gdVdoTrgt = ref("");
const uiId = ref();
const uiTtl = ref();
const gdVdoTtl = ref("");
const pblcnUseYn = ref("");
const pblcnBgngYmd = ref("");
const pblcnEndYmd = ref("");
const gdVdoStts = ref("");
const atchFile = ref();
const gdVdoCn = ref("");
const rgtr = ref("");
const chgr = ref("");
const regDt = ref("");
const chgDt = ref("");
const rgtrId = ref("");
const chgrId = ref("");

const inquiry = async () => {
  let gvDto = {
    gdVdoId: gdVdoId.value,
    maskFlag: detailMaskingFlag.value ?? true,
  };

  await axios
    .post(`/guidevideo/detail`, gvDto)
    .then((response) => {
      if (response.data != null) {
        let dto = response.data.guidevideoDto;
        gdVdoTrgt.value = dto.gdVdoTrgt;
        gdvdoSbjctNm.value = dto.comCdNm;
        uiId.value = dto.uiId;
        uiTtl.value = dto.uiTtl;
        gdVdoTtl.value = dto.gdVdoTtl;
        pblcnUseYn.value = dto.pblcnUseYn;
        pblcnBgngYmd.value = dto.pblcnBgngYmd;
        pblcnEndYmd.value = dto.pblcnEndYmd;
        gdVdoStts.value = dto.gdVdoStts;
        gdVdoCn.value = dto.gdVdoCn;
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
    .catch((err) => {
      if (err.repsonse != null) {
        if (err.response.status != null) {
        }
      }
    });
};

onMounted(async () => {
  if (history.state.id != null && history.state.id * 1 > 0) {
    gdVdoId.value = history.state.id;
  } else {
    router.push("/gdVdoMng");
  }
  await inquiry();
});
</script>

<style scoped>
input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 70% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}
</style>