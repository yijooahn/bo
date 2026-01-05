<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > 아바타 관리</p>
    <p class="heading">아바타 캐릭터 상세정보</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col width="90%" />
        </colgroup>
        <tbody>
          <tr>
            <th><span>No.</span></th>
            <td>
              <span>{{ avtrId }}</span>
            </td>
          </tr>
          <tr>
            <th><span>아바타이름</span></th>
            <td>
              <span>{{ avtrNm }}</span>
            </td>
          </tr>
          <tr>
            <th><span>대상</span></th>
            <td>
              <span>{{ avtrTrgt }}</span>
            </td>
          </tr>
          <tr>
            <th><span>성별</span></th>
            <td>
              <span>{{ avtrGndr }}</span>
            </td>
          </tr>
          <tr>
            <th><span>노출여부</span></th>
            <td>
              <span v-if="expsrYn === 'Y'">노출</span>
              <span v-if="expsrYn === 'N'">비노출</span>
            </td>
          </tr>
          <tr>
            <th><span>파일첨부</span></th>
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
              <div class="dp-f">
                <div>
                  <img style="width: 100px" :src="atchFile.atchFileLink" />
                </div>
                <span class="image-desc"> 이미지 설명 </span>
                <span>
                  {{ atchFile.altText }}
                </span>
              </div>
            </td>
            <td v-if="atchFile === null || atchFile === undefined">
              <span>첨부된 파일이 없습니다</span>
            </td>
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
        <button class="btn-1" @click="moveToModify(avtrId)">수정</button>
        <button class="btn-3" @click="router.push('/avtrChartrMng')">
          목록
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useFileStore();
const { downloadFile } = store;
const detailMaskingFlag = inject("detailMaskingFlag");

const avtrId = ref();
const avtrNm = ref();
const avtrTrgt = ref();
const avtrGndr = ref();
const expsrYn = ref("");
const rgtr = ref();
const rgtrId = ref();
const regDt = ref();
const chgr = ref(null);
const chgrId = ref(null);
const chgDt = ref(null);
const atchFile = ref();

const moveToModify = (avtrId) => {
  router.push({
    name: "avtrChartrMdfcnView",
    state: { id: avtrId },
  });
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("avtrChartrMng");
  } else {
    avtrId.value = history.state.id;
    let avatarDto = {
      avtrId: avtrId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/avatar/detail`, avatarDto)
      .then((response) => {
        if (response.data != null) {
          let dto = response.data.avatarDto;
          avtrNm.value = dto.avtrNm;
          if (dto.avtrTrgt.length > 0) {
            avtrTrgt.value = dto.avtrTrgt
              .join(" / ")
              .replace("T", "교사")
              .replace("E", "초등")
              .replace("M", "중등")
              .replace("H", "고등");
          }
          if (dto.avtrGndr.length > 0) {
            avtrGndr.value = dto.avtrGndr
              .join(" / ")
              .replace("M", "남성")
              .replace("W", "여성");
          }
          expsrYn.value = dto.expsrYn;
          rgtr.value = dto.rgtr;
          rgtrId.value = dto.rgtrId;
          regDt.value = dto.regDt;
          chgr.value = dto.chgr;
          chgrId.value = dto.chgrId;
          chgDt.value = dto.chgDt;
          if (response.data.atchFileDto != null) {
            atchFile.value = response.data.atchFileDto;
          }
        }
      })
      .catch((error) => {
        if (error.response != null) {
          if (error.response.status != null) {
            router.push("avtrChartrMng");
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