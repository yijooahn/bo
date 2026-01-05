<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 코치마크 관리</p>
    <p class="heading">코치마크 상세정보</p>
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
            <span>{{ coachMarkId }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>학과목</span></th>
          <td>
            <span>{{ coachMarkSbjctNm }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>대상</span></th>
          <td v-if="coachMarkTrgt === 'TCHR'"><span>교사용</span></td>
          <td v-if="coachMarkTrgt === 'STDNT'"><span>학생용</span></td>
        </tr>
        <tr>
          <th class="align-left"><span>화면명</span></th>
          <td>
            <span>{{ scrnTtl }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>제목</span></th>
          <td>
            <span>{{ coachMarkTtl }}</span>
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
          <td v-if="coachMarkStts === 'Y'">
            <span class="text-red">현재버전</span>
          </td>
          <td v-if="coachMarkStts === 'N'"><span>종료</span></td>
        </tr>
        <tr>
          <th class="align-left"><span>파일첨부</span></th>
          <td v-if="atchFile != null && atchFile != undefined">
            <div v-for="(row, index) in atchFile" :key="index" class="dp-b">
              <div class="dp-f">
                <img
                  src="/images/icon06.svg"
                  style="width: 15px; height: 20px"
                />
                <span
                  class="cs-p"
                  @click="downloadFile(row.atchFileLink, row.atchFileNm)"
                >
                  {{ row.atchFileNm }}
                </span>
              </div>
              <div class="dp-f">
                <div>
                  <img style="width: 100px" :src="row.atchFileLink" />
                </div>
                <span class="image-desc"> 이미지 설명 </span>
                <span>
                  {{ row.altText }}
                </span>
              </div>
            </div>
          </td>
          <td v-if="atchFile === null || atchFile === undefined">
            <span>첨부된 파일이 없습니다</span>
          </td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td>{{ coachMarkCn }}</td>
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
      <br />
      <div class="ct-17">
        <!--  <button class="btn-1" @click="router.push(`/coachMarkMngModify/${coachMarkId}`)">수정</button>-->
        <button
          class="btn-1"
          @click="
            router.push({
              name: 'coachMarkMdfcnView',
              state: { id: `${coachMarkId}` },
            })
          "
        >
          수정
        </button>
        <button class="btn-3" @click="router.push('/coachMarkMng')">
          목록
        </button>
      </div>
    </div>
  </div>
</template>

    
<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import axios from "axios";
import { inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const store = useFileStore();
const { downloadFile } = store;
const router = useRouter();
const coachMarkId = ref();
const coachMarkSbjctNm = ref();
const coachMarkTrgt = ref("");
const scrnId = ref();
const scrnTtl = ref();
const coachMarkTtl = ref("");
const pblcnUseYn = ref("");
const pblcnBgngYmd = ref("");
const pblcnEndYmd = ref("");
const coachMarkStts = ref("");
const atchFile = ref([]);
const coachMarkCn = ref("");
const rgtr = ref("");
const chgr = ref("");
const regDt = ref("");
const chgDt = ref("");
const rgtrId = ref("");
const chgrId = ref("");
const detailMaskingFlag = inject("detailMaskingFlag");
watch(
  atchFile,
  (list) => {
    list.sort(function (a, b) {
      return a.coachMarkSeq - b.coachMarkSeq;
    });
  },
  {
    deep: true,
  }
);
onMounted(async () => {
  // if (router.currentRoute.value.params.id == null) {
  if (history.state.id == null) {
    router.push("/coachMarkMng");
  } else {
    //  coachMarkId.value = router.currentRoute.value.params.id;
    coachMarkId.value = history.state.id;
    //axios.get('/coachmark/detail/' + coachMarkId.value)
    var cDto = {};
    cDto.coachMarkId = coachMarkId.value;
    cDto.maskFlag = detailMaskingFlag.value;
    await axios
      .post("/coachmark/detail", cDto)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.coachmarkDto;
          coachMarkTrgt.value = dto.coachMarkTrgt;
          scrnId.value = dto.scrnId;
          scrnTtl.value = dto.scrnTtl;
          coachMarkSbjctNm.value = dto.comCdNm;
          coachMarkTtl.value = dto.coachMarkTtl;
          pblcnUseYn.value = dto.pblcnUseYn;
          pblcnBgngYmd.value = dto.pblcnBgngYmd;
          pblcnEndYmd.value = dto.pblcnEndYmd;
          coachMarkStts.value = dto.coachMarkStts;
          coachMarkCn.value = dto.coachMarkCn;
          rgtr.value = dto.rgtr;
          chgr.value = dto.chgr;
          regDt.value = dto.regDt;
          chgDt.value = dto.chgDt;
          rgtrId.value = dto.rgtrId;
          chgrId.value = dto.chgrId;
          if (response.data.atchFileDtoList.length > 0) {
            atchFile.value = response.data.atchFileDtoList;
          }
        }
      })
      .catch((err) => {
        router.push("/coachMarkMng");
      });
  }
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
