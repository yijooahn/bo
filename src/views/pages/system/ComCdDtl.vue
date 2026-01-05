<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 공통코드관리</p>
    <p class="heading">공통코드 상세정보</p>
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
            <span>{{ idx }}</span>
          </td>
        </tr>
        <tr>
          <th><span>코드그룹ID</span></th>
          <td>
            <span>{{ groupCdId }}</span>
          </td>
        </tr>
        <tr>
          <th><span>코드그룹명</span></th>
          <td>
            <span>{{ groupCdNm }}</span>
          </td>
        </tr>
        <tr>
          <th><span>사용 여부</span></th>
          <td>
            <span>{{ groupCdUseYn }}</span>
          </td>
        </tr>
      </table>
      <br />
      <div class="tit"></div>
      <label>코드</label>
      <table class="table-2 t-c">
        <colgroup>
          <col width="15%" />
          <col width="15%" />
          <col width="25%" />
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="15%" />
          <col width="5%" />
        </colgroup>
        <thead>
          <tr>
            <th><span>코드ID</span></th>
            <th><span>코드명</span></th>
            <th><span>설명</span></th>
            <th><span>순서</span></th>
            <th><span>속성1</span></th>
            <th><span>속성2</span></th>
            <th><span>상위코드ID</span></th>
            <th><span>사용여부</span></th>
          </tr>
        </thead>
        <tbody v-if="searchResult.length > 0">
          <tr v-for="(sr, idx) in searchResult" :key="idx">
            <td>
              <span>{{ sr.comCdId }}</span>
            </td>
            <td>
              <span>{{ sr.comCdNm }}</span>
            </td>
            <td class="td-title">
              <span>{{ sr.comCdExpln }}</span>
            </td>
            <td>
              <span>{{ sr.sortSeq }}</span>
            </td>
            <td>
              <span>{{ sr.comCdAtrb1 }}</span>
            </td>
            <td>
              <span>{{ sr.comCdAtrb2 }}</span>
            </td>
            <td>
              <span v-if="sr.uptCdId != null">{{ sr.uptCdId }}</span>
              <span v-else>-</span>
            </td>
            <td>
              <span>{{ sr.useYn }}</span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="t-c">
            <td colspan="10">조회된 결과가 없습니다.</td>
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
        <button class="btn-1" @click="moveToModify(`${groupCdId}`, `${idx}`)">
          수정
        </button>
        <button class="btn-3" @click="router.push('/comCdMng')">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const groupCdId = ref();
const idx = ref();
const searchResult = ref([]);
const groupCdNm = ref();
const groupCdExpln = ref();
const groupCdUseYn = ref();
const rgtrId = ref();
const rgtr = ref();
const regDt = ref();
const chgrId = ref(null);
const chgr = ref(null);
const chgDt = ref(null);

const moveToModify = (groupCdId, index) => {
  router.push({
    name: "comCdMdfcnView",
    state: {
      id: groupCdId,
      idx: index,
    },
  });
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("/comCdMng");
  } else {
    groupCdId.value = history.state.id;
    idx.value = history.state.idx;

    await axios
      .get(`/commoncode/detail/${groupCdId.value}`)
      .then((response) => {
        if (response.data != null) {
          groupCdNm.value = response.data.commonCode.groupCdNm;
          groupCdExpln.value = response.data.commonCode.groupCdExpln;
          groupCdUseYn.value = response.data.commonCode.useYn;
          rgtrId.value = response.data.commonCode.rgtrId;
          rgtr.value = response.data.commonCode.rgtr;
          regDt.value = response.data.commonCode.regDt;
          chgrId.value = response.data.commonCode.chgrId;
          chgr.value = response.data.commonCode.chgr;
          chgDt.value = response.data.commonCode.chgDt;
          if (response.data.commonCodeList != null) {
            searchResult.value = response.data.commonCodeList;
          }
        } else {
          searchResult.value = [];
        }
      })
      .catch((error) => {
        if (error.respose != null) {
          if (error.response.status != null) {
            if (error.response.status == 404) {
              searchResult.value = [];
            }
          }
        }
      })
      .finally(() => {});
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

.td-title {
  text-align: left;
  padding-left: 1rem;
}
</style>