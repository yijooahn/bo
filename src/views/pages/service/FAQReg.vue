<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > FAQ 관리</p>
    <p class="heading">FAQ 등록</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>학과목</span><span class="text-red">*</span></th>
        <td>
          <div>
            <component
              :is="SelectComp"
              :options="subjectList.map((item) => item.comCdNm)"
              v-model:selected="selectedSubjectNm"
              class="select-comp"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>대상</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="SelectComp"
              v-model:selected="faqTrgt"
              :options="['공통', '교사용', '학생용']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>구분</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="SelectComp"
              v-model:selected="faqSe"
              :options="faqCodes"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>제목</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="faqTtl"
            style="display: inline-block; width: 70%"
            maxlength="100"
            placeholder="제목을 입력하세요"
          />
        </td>
      </tr>
      <tr>
        <th><span>노출순서</span><span class="text-red"> *</span></th>
        <td>
          <input
            type="text"
            v-model="faqSeq"
            style="display: inline-block; width: 70%"
            placeholder="노출순서를 입력하세요"
          />
        </td>
      </tr>
      <tr>
        <th><span>노출여부</span><span class="text-red"> *</span></th>
        <td>
          <div>
            <component
              :is="SelectComp"
              v-model:selected="expsrYn"
              :options="['노출', '비노출']"
            ></component>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>파일첨부</span></th>
        <td>
          <div style="display: flex">
            <div v-if="atchFile == null" style="align-content: center">
              <span>첨부된 파일이 없습니다</span>
            </div>
            <div v-else style="display: flex; flex-direction: column">
              <span
                >{{ atchFile.name }}&nbsp;<img
                  src="/images/icon07red.svg"
                  class="clickable"
                  @click="rmvFile()"
              /></span>
              <img
                width="160px"
                height="auto"
                :src="atchFile.url"
                :alt="atchFile.name"
              />
            </div>
            <div style="width: 1000px; align-content: center">
              <input
                type="file"
                id="upload-image"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                hidden
              />
              <label for="upload-image">
                <img src="/images/btnSelectFile.svg" class="clickable" />
              </label>
              <span class="text-red" style="margin-left: 10px"
                >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
              >
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th><span>내용</span></th>
        <td>
          <QuillEditor
            style="height: 400px"
            :is="QuillEditor"
            v-model:content.lazy="faqCn"
            contentType="html"
            :modules="modules"
            :toolbar="toolbars"
          />
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="handleClick()">등록</button>
      <button class="btn-3" @click="router.push(`/faqMng`)">목록</button>
    </div>
    <reg-modal
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @onSubmitHandler="triggerSubmit()"
      @onConfirmHandler="router.push('/faqMng')"
    ></reg-modal>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/store/attachFile";
import { useTextbookStore } from "@/store/textbook";
import SelectComp from "@/views/components/Select.vue";
import RegModal from "@/views/components/popup/SignUpModal.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import { inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const toast = inject('toast');
const alertModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>등록하시겠습니까?</span>",
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

const faqCodes = ref([]);

const router = useRouter();
const popupIsActive = ref(false);
const store = useFileStore();
const { fileCheck } = store;

const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const faqTrgt = ref("공통");
const faqSe = ref("구분명");
const faqTtl = ref();
const faqSeq = ref();
const expsrYn = ref("노출");
const faqCn = ref();
const fileInput = ref();
const atchFile = ref(null);
const modules = ref([
  {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      /* options */
    },
  },
]);

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

watch(faqSeq, (v) => {
  faqSeq.value = v.replace(/[^0-9]/g, "");
});

const handleFileChange = (e) => {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
  const MAX_SIZE = 30;
  fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile);
};

const rmvFile = () => {
  fileInput.value.value = "";
  atchFile.value = null;
};

const handleClick = async () => {
  if (faqCn.value?.length > 2000) {
    toast.notify("HTML 태그를 포함하여 내용은 2000자를 초과할 수 없습니다.");
    return;
  }
  if (
    faqTrgt.value === undefined ||
    faqSe.value === undefined ||
    faqTtl.value === undefined ||
    faqSeq.value === undefined ||
    expsrYn.value === undefined ||
    faqTrgt.value === null ||
    faqSe.value === null ||
    faqTtl.value === null ||
    faqSeq.value === null ||
    faqCn.value === null ||
    expsrYn.value === null ||
    faqTrgt.value === "" ||
    faqSe.value === "" ||
    faqTtl.value === "" ||
    faqSeq.value === "" ||
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
    return;
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
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let faqDto = {
    faqTrgt: "",
    faqSe: "",
    faqTtl: faqTtl.value,
    faqCn: faqCn.value,
    faqSeq: faqSeq.value,
    expsrYn: expsrYn.value == "노출" ? "Y" : "N",
    faqSbjctCd: subjectList.value.find(
      (item) => item.comCdNm == selectedSubjectNm.value
    ).comCdId,
  };

  if (faqTrgt.value == "공통") {
    faqDto.faqTrgt = "COM";
  } else if (faqTrgt.value == "교사용") {
    faqDto.faqTrgt = "TCHR";
  } else if (faqTrgt.value == "학생용") {
    faqDto.faqTrgt = "STDNT";
  }

  if (faqSe.value == "회원가입") {
    faqDto.faqSe = "JOIN";
  } else if (faqSe.value == "과제부여") {
    faqDto.faqSe = "WORK";
  } else if (faqSe.value == "툴팁") {
    faqDto.faqSe = "TOOL";
  } else if (faqSe.value == "AI보조교사") {
    faqDto.faqSe = "AI01";
  } else if (faqSe.value == "AI튜터") {
    faqDto.faqSe = "AI02";
  }

  formData.append(
    "faqDto",
    new Blob([JSON.stringify(faqDto)], {
      type: "application/json",
    })
  );

  try {
    await axios.post("/faq/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alertModal.value.bodyHtml = "<span>등록이 완료되었습니다.</span>";
    alertModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
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
};

async function getFaqCodeList(){
  try {
   const response = await axios.get("/faq/faqcodes");
   faqCodes.value = response.data;
  } catch (error) {}
}

onMounted(async () => {
  await getFaqCodeList();
  await getTextbookCodeList(subjectList, selectedSubjectNm, "선택");
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