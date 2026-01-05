<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 장애대응체계 관리</p>
    <p class="heading">장애대응체계 상세정보</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th><span>No.</span></th>
            <td>
              <span>{{ obstlId }}</span>
            </td>
          </tr>
          <tr>
            <th><span>구분</span></th>
            <td>
              <span v-if="obstlSe == 1">긴급대응체계</span>
              <span v-if="obstlSe == 2">장애모의훈련</span>
              <span v-if="obstlSe == 3">모의해킹</span>
              <span v-if="obstlSe == 4">보안취약점진단</span>
              <span v-if="obstlSe == 5">기타</span>
            </td>
          </tr>
          <tr>
            <th><span>제목</span></th>
            <td>
              <span>{{ obstlTtl }}</span>
            </td>
          </tr>
          <tr>
            <th><span>파일첨부</span></th>
            <td v-if="atchFile != null">
              <div style="display: inline-block">
                <img src="/images/icon06.svg" />
                <span
                  class="cs-p"
                  @click="
                    downloadFile(atchFile.atchFileLink, atchFile.atchFileNm)
                  "
                  >{{ atchFile.atchFileNm }}</span
                >
              </div>
              <div style="display: inline-block; float: right">
                <button
                  class="btn-1"
                  @click="
                    downloadFile(atchFile.atchFileLink, atchFile.atchFileNm)
                  "
                >
                  다운로드
                </button>
              </div>
            </td>
            <td v-else><span>첨부된 파일이 없습니다</span></td>
          </tr>
          <tr>
            <th><span>현황</span></th>
            <td>
              <span v-if="obstlStts == 'Y'" class="text-red">현재버전</span>
              <span v-else>종료</span>
            </td>
          </tr>
          <tr>
            <th><span>내용</span></th>
            <td v-html="setTextForm(obstlCn)"></td>
          </tr>
        </tbody>
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
        <tbody>
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
        </tbody>
      </table>
      <div class="ct-17">
        <button class="btn-1" @click="moveToModify(obstlId)">수정</button>
        <button class="btn-3" @click="router.push('/obstlRspdSysMng')">
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

const obstlId = ref();
const obstlSe = ref();
const obstlTtl = ref("");
const obstlStts = ref("");
const obstlUseYn = ref("");
const obstlCn = ref("");
const rgtrId = ref();
const rgtr = ref("");
const regDt = ref("");
const chgrId = ref(null);
const chgr = ref(null);
const chgDt = ref(null);
const atchFile = ref();
const isImageModalActive = ref(false);
const currentImage = ref(null);
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

const moveToModify = (obstlId) => {
  router.push({
    name: "obstlRspdSysMdfcnView",
    state: { id: obstlId },
  });
};

function setTextForm(text) {
  if (text != null && text != undefined) {
    if (text.includes("\n")) {
      return text.replaceAll("\n", "<br>");
    } else {
      return text;
    }
  }
}

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/obstlRspdSysMng");
  } else {
    obstlId.value = history.state.id;
    let param = {
      obstlId: obstlId.value,
      maskFlag: detailMaskingFlag.true ?? true,
    };

    await axios
      .post(`/obstacle/detail`, param)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.obstlRspdSysPopDto;
          obstlSe.value = dto.obstlSe;
          obstlTtl.value = dto.obstlTtl;
          obstlStts.value = dto.obstlStts;
          obstlUseYn.value = dto.obstlUseYn;
          obstlCn.value = dto.obstlCn;
          rgtrId.value = dto.rgtrId;
          rgtr.value = dto.rgtr;
          regDt.value = dto.regDt;
          chgrId.value = dto.chgrId;
          chgr.value = dto.chgr;
          chgDt.value = dto.chgDt;
          if (response.data.atchFileDtoList[0] != null) {
            atchFile.value = response.data.atchFileDtoList[0];
          }
        }
      })
      .catch((err) => {
        if (err.repsonse != null) {
          if (err.response.status != null) {
            router.push("/obstlRspdSysMng");
          }
        }
      })
      .finally(() => {
        detailMaskingFlag.value = false;
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
