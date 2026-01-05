<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > FAQ 관리</p>
    <p class="heading">FAQ 상세정보</p>
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
            <span>{{ faqId }}</span>
          </td>
        </tr>
        <tr>
          <th class="align-left"><span>학과목</span></th>
          <td>
            <span>{{ faqSbjctNm }}</span>
          </td>
        </tr>
        <tr>
          <th><span>대상</span></th>
          <td>
            <span v-if="faqTrgt === 'COM'">공통</span>
            <span v-if="faqTrgt === 'TCHR'">교사용</span>
            <span v-if="faqTrgt === 'STDNT'">학생용</span>
          </td>
        </tr>
        <tr>
          <th><span>구분</span></th>
          <td>
            <span>{{ faqSeNm }}</span>
          </td>
        </tr>
        <tr>
          <th><span>제목</span></th>
          <td>
            <span>{{ faqTtl }}</span>
          </td>
        </tr>
        <tr>
          <th><span>노출순서</span></th>
          <td>
            <span>{{ faqSeq }}</span>
          </td>
        </tr>
        <tr>
          <th><span>노출여부</span></th>
          <td>
            <span v-if="expsrYn === 'Y'">노출</span>
            <span v-if="expsrYn === 'N'" class="text-red">비노출</span>
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
            <div class="dp-f">
              <img
                :src="atchFile.atchFileLink"
                style="width: 200px; height: 200px"
              />
            </div>
          </td>
          <td v-if="atchFile == null"><span>첨부된 파일이 없습니다</span></td>
        </tr>
        <tr>
          <th><span>내용</span></th>
          <td>
            <QuillEditor
              :is="QuillEditor"
              :readOnly="true"
              v-model:content="faqCn"
              :contentType="'html'"
              :modules="modules"
              :theme="'snow'"
              :toolbar="[]"
              style="min-height: 50vh;border:none !important;"
            />
          </td>
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
        <button class="btn-1" @click="moveToModify(`${faqId}`)">수정</button>
        <button class="btn-3" @click="router.push('/faqMng')">목록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile.js";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const store = useFileStore();
const { downloadFile } = store;
const modules = {
  name: "blotFormatter",
  module: BlotFormatter,
  options: {
    /* options */
  },
};
const toolbars = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  // ['link', 'image', 'video', 'formula'],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];
const router = useRouter();
const detailMaskingFlag = inject("detailMaskingFlag");

const faqId = ref();
const faqTrgt = ref();
const faqSbjctNm = ref();
const faqSe = ref();
const faqSeNm = ref();
const faqTtl = ref();
const faqSeq = ref();
const expsrYn = ref();
const faqCn = ref();
const rgtrId = ref("");
const chgrId = ref("");
const rgtr = ref();
const chgr = ref();
const regDt = ref();
const chgDt = ref();
const atchFile = ref();

const moveToModify = (faqId) => {
  router.push({
    name: "faqMdfcnView",
    state: { id: faqId },
  });
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("faqMng");
  } else {
    faqId.value = history.state.id;
    let faqDto = {
      faqId: faqId.value,
      maskFlag: detailMaskingFlag.value ?? true,
    };

    await axios
      .post(`/faq/detail`, faqDto)
      .then((response) => {
        if (response.data != null) {
          faqTrgt.value = response.data.faqDto.faqTrgt;
          faqSbjctNm.value = response.data.faqDto.comCdNm;
          faqSe.value = response.data.faqDto.faqSe;
          faqSeNm.value = response.data.faqDto.faqSeNm;
          faqTtl.value = response.data.faqDto.faqTtl;
          faqSeq.value = response.data.faqDto.faqSeq;
          expsrYn.value = response.data.faqDto.expsrYn;
          faqCn.value = response.data.faqDto.faqCn;
          rgtr.value = response.data.faqDto.rgtr;
          chgr.value = response.data.faqDto.chgr;
          regDt.value = response.data.faqDto.regDt;
          chgDt.value = response.data.faqDto.chgDt;
          rgtrId.value = response.data.faqDto.rgtrId;
          chgrId.value = response.data.faqDto.chgrId;
          if (response.data.atchFileDtoList.length > 0) {
            atchFile.value = Object.assign(
              {},
              response.data.atchFileDtoList[0],
              {
                name: response.data.atchFileDtoList[0].atchFileNm,
                url: response.data.atchFileDtoList[0].atchFileLink,
              }
            );
          }
        }
      })
      .catch((error) => {
        router.push("faqMng");
      });
  }
};

onMounted(async () => {
  await inquiry();
  document.getElementsByClassName('ql-toolbar ql-snow')[0].classList.add('border-none');
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
<style>
.border-none{
  border:none !important;
}
</style>