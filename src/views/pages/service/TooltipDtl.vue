<template>
  <div>
    <p class="breadcrumb">서비스 관리 > 툴팁관리</p>
    <p class="heading">툴팁 상세정보</p>
    <div style="padding: 0.3rem">
      <div class="tit"></div>
      <label>기본 정보</label>
      <table class="table-1">
        <colgroup>
          <col width="10%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th><span>No.</span></th>
            <td>
              <span>{{ currentId }}</span>
            </td>
          </tr>
          <tr>
            <th><span>학과목</span></th>
            <td>
              <span>{{ searchResult.comCdNm }}</span>
            </td>
          </tr>
          <tr>
            <th><span>대상</span></th>
            <td>
              <span v-if="searchResult.tooltipTrgt == 'TCHR'">교사용</span>
              <span v-else-if="searchResult.tooltipTrgt == 'STDNT'"
                >학생용</span
              >
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <th><span>UI명</span></th>
            <td>
              <span>{{ searchResult.uiTtl }}</span>
            </td>
          </tr>
          <tr>
            <th><span>제목</span></th>
            <td>{{ searchResult.tooltipTtl }}</td>
          </tr>
          <tr>
            <th><span>게재 기간</span></th>
            <td>
              <span v-if="searchResult.pblcnUseYn == 'Y'">
                {{ searchResult.pblcnBgngYmd }}
                ~
                {{ searchResult.pblcnEndYmd }}
              </span>
              <span v-else>기한없음</span>
            </td>
          </tr>
          <tr>
            <th><span>현황</span></th>
            <td>
              <span v-if="searchResult.tooltipStts == 'Y'" class="text-red"
                >현재버전</span
              >
              <span v-else>종료</span>
            </td>
          </tr>
          <tr>
            <th><span>내용</span></th>
            <td>
              <span>{{ searchResult.tooltipCn }}</span>
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
            <span>{{ searchResult.rgtr }}/{{ searchResult.rgtrId }}</span>
          </td>
          <th><span>등록일</span></th>
          <td>
            <span>{{ searchResult.regDt }}</span>
          </td>
        </tr>
        <tr>
          <th><span>최종수정자</span></th>
          <td>
            <span>{{ searchResult.chgr }}/{{ searchResult.chgrId }}</span>
          </td>
          <th><span>최종수정일</span></th>
          <td>
            <span>{{ searchResult.chgDt }}</span>
          </td>
        </tr>
      </table>
      <div class="ct-17">
        <button
          class="btn-1"
          @click="
            router.push({
              name: 'tooltipMdfcnView',
              state: { id: `${currentId}` },
            })
          "
        >
          수정
        </button>
        <button class="btn-3" @click="router.push('/tooltipMng')">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const searchResult = ref({});
const router = useRouter();
const currentId = ref(0);
const detailMaskingFlag = inject("detailMaskingFlag");

onMounted(async () => {
  if (history.state.id == null) {
    router.push("/tooltipMng");
  } else {
    currentId.value = history.state.id;
    var tDto = {};
    tDto.tooltipId = currentId.value;
    tDto.maskFlag = detailMaskingFlag.value;
    await axios.post(`/tooltip/detail`, tDto).then((res) => {
      searchResult.value = res.data.tooltipDto;
    });
  }
});
</script>

<style scoped>
input[type="text"],
input[type="text"]:focus {
  width: 100%;
}
</style>

