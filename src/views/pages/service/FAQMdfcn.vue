<template>
  <div class="wrap" ref="wrap">
    <p class="breadcrumb">서비스 관리 > FAQ 관리</p>
    <p class="heading">FAQ 수정</p>
    <table class="table-1">
      <colgroup>
        <col width="10%" />
        <col width="90%" />
      </colgroup>
      <tr>
        <th><span>No.</span></th>
        <td>{{ faqId }}</td>
      </tr>
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
            @input="validateNumber"
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
        <th><span>파일첨부</span><span class="text-red"> *</span></th>
        <td>
          <div v-if="atchFile == null" class="dp-if">
            <span>첨부된 파일이 없습니다</span>&emsp;
          </div>
          <div v-else class="dp-if">
            <span
              >{{ atchFile.name
              }}<img
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
          <div style="display: inline">
            <input
              type="file"
              id="upload-image"
              ref="fileInput"
              @change="handleFileChange"
              accept=".png, .jpg, .jpeg, .gif, .bmp"
              hidden
            />
            <label for="upload-image" style="line-height: 100%">
              <img src="/images/btnSelectFile.svg" class="clickable" />
            </label>
            <span class="text-red" style="margin-left: 10px"
              >* png, jpg, jpeg, gif, bmp 파일첨부 가능합니다</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th><span>내용</span><span class="text-red"> *</span></th>
        <td>
          <QuillEditor
            :is="QuillEditor"
            v-model:content="faqCn"
            :contentType="'html'"
            :modules="modules"
            :theme="'snow'"
            :toolbar="toolbars"
            style="height: 400px"
          />
        </td>
      </tr>
    </table>
    <div class="ct-17">
      <button class="btn-1" @click="handleClick()">적용</button>
      <button class="btn-2" @click="clickDelete()">삭제</button>
      <button class="btn-3" @click="$router.push('/faqMng')">목록</button>
    </div>
    <div>
      <reg-modal
        v-model:isActive="popupIsActive"
        :alertModal="regModal"
        @onSubmitHandler="beforeTriggerSubmit()"
        @onConfirmHandler="router.push('/faqMng')"
      ></reg-modal>
      <reg-modal
        v-model:isActive="deletePopupIsActive"
        :alertModal="deleteModal"
        @onSubmitHandler="deleteSubmit()"
      ></reg-modal>
    </div>
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
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const toast = inject('toast')
const regModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>수정 사항을 적용하시겠습니까?</span>",
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

const deleteModal = ref({
  contentAlign: "start",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>삭제하시겠습니까?</span>",
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
const deletePopupIsActive = ref(false);
const store = useFileStore();
const { fileCheck } = store;

const faqCodes = ref([])
const textStore = useTextbookStore();
const { getTextbookCodeList } = textStore;
const subjectList = ref([]);
const selectedSubjectNm = ref();

const faqId = ref();
const faqTrgt = ref();
const faqSe = ref();
const faqSeq = ref();
const faqTtl = ref();
const expsrYn = ref();
const faqCn = ref();
const atchFile = ref(null);
const originalAtchFile = ref();
const fileInput = ref();
let rmvFileList = [];

const modules = {
  name: "blotFormatter",
  module: BlotFormatter,
  options: {
    /* options */
  },
};

const validateNumber = (v) => {
  // 숫자 정규 표현식
  const numberPattern = /^[0-9]*$/;
  // 현재 입력값
  const value = v.target.value;

  // 입력값이 숫자인지 검사하고 숫자가 아닌 경우 빈 문자열로 대체
  if (!numberPattern.test(value)) {
    v.target.value = faqSeq.value;
  } else {
    faqSeq.value = value;
  }
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

const handleFileChange = (e) => {
  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp"];
  const MAX_SIZE = 30;
  if (fileCheck(e, fileInput, allowedExtensions, MAX_SIZE, atchFile)) {
    if (rmvFileList.length === 0 && originalAtchFile.value != null) {
      rmvFileList.push(originalAtchFile.value);
    }
  }
};

const rmvFile = () => {
  rmvFileList.push(atchFile.value);
  fileInput.value.value = "";
  atchFile.value = null;
};

const beforeTriggerSubmit = async () => {
  if (rmvFileList.length > 0) {
    for (let i = 0; i < rmvFileList.length; i++) {
      if (
        rmvFileList[i].atchFileId != undefined &&
        rmvFileList[i].atchFileId != null
      ) {
        try {
          await axios.get("/atchFile/removeFile/" + rmvFileList[i].atchFileId);
        } catch (error) {
          regModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
          regModal.value.buttons = [
            {
              clickEvent: "close",
              content: "확인",
              addClass: "btn-1",
            },
          ];
          popupIsActive.value = true;
          return;
        }
      }
    }
    triggerSubmit();
  } else {
    triggerSubmit();
  }
};

const handleClick = async () => {
  if (faqCn.value.length > 2000) {
    toast.notify("HTML 태그를 포함하여 내용은 2000자를 초과할 수 없습니다.");
    return;
  }
  if (
    faqTrgt.value === undefined ||
    faqSe.value === undefined ||
    faqTtl.value === undefined ||
    faqSeq.value === undefined ||
    faqCn.value === undefined ||
    expsrYn.value === undefined ||
    selectedSubjectNm.value == undefined ||
    faqTrgt.value === null ||
    faqSe.value === null ||
    faqTtl.value === null ||
    faqSeq.value === null ||
    faqCn.value === null ||
    expsrYn.value === null ||
    selectedSubjectNm.value == null ||
    faqTrgt.value === "" ||
    faqSe.value === "" ||
    faqTtl.value === "" ||
    faqSeq.value === "" ||
    faqCn.value === "" ||
    expsrYn.value === "" ||
    selectedSubjectNm.value == ""
  ) {
    regModal.value.bodyHtml =
      "<span>입력되지 않은 항목이 있습니다.<br>확인 후 다시 시도해 주십시오.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  } else {
    regModal.value.bodyHtml = "<span>수정 사항을 적용하시겠습니까?</span>";
    regModal.value.buttons = [
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

const clickDelete = async () => {
  deletePopupIsActive.value = true;
};

const deleteSubmit = async () => {
  try {
    await axios.delete(`faq/delete/${faqId.value}`);
    regModal.value.bodyHtml = "<span>삭제가 완료되었습니다.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    regModal.value.bodyHtml = "<span>삭제에 실패했습니다.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
    return;
  }
};

const triggerSubmit = async () => {
  let formData = new FormData();
  formData.append("atchFiles", atchFile.value);

  let faqDto = {
    faqId: faqId.value,
    faqTrgt: "",
    faqSe: "",
    faqTtl: faqTtl.value,
    faqSeq: faqSeq.value,
    faqCn: faqCn.value,
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
    await axios.post("/faq/modify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    regModal.value.bodyHtml = "<span>수정이 완료되었습니다.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "confirm",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  } catch (error) {
    regModal.value.bodyHtml = "<span>수정에 실패했습니다.</span>";
    regModal.value.buttons = [
      {
        clickEvent: "close",
        content: "확인",
        addClass: "btn-1",
      },
    ];
    popupIsActive.value = true;
  }
};

const inquiry = async () => {
  if (history.state.id == undefined || history.state.id == null) {
    router.push("faqMng");
  } else {
    faqId.value = history.state.id;
    let faqDto = {
      faqId: faqId.value,
      maskFlag: false,
    };

    await axios
      .post(`/faq/detail`, faqDto)
      .then((response) => {
        if (response.data.faqDto != null) {
          let dto = response.data.faqDto;
          if (dto.faqTrgt == "COM") {
            faqTrgt.value = "공통";
          } else if (dto.faqTrgt == "TCHR") {
            faqTrgt.value = "교사용";
          } else if (dto.faqTrgt == "STDNT") {
            faqTrgt.value = "학생용";
          }
          if (dto.faqSe == "JOIN") {
            faqSe.value = "회원가입";
          } else if (dto.faqSe == "WORK") {
            faqSe.value = "과제부여";
          } else if (dto.faqSe == "TOOL") {
            faqSe.value = "툴팁";
          } else if (dto.faqSe == "AI01") {
            faqSe.value = "AI보조교사";
          } else if (dto.faqSe == "AI02") {
            faqSe.value = "AI튜터";
          }
          selectedSubjectNm.value = response.data.faqDto.comCdNm;
          faqTtl.value = response.data.faqDto.faqTtl;
          faqSeq.value = response.data.faqDto.faqSeq;
          expsrYn.value =
            response.data.faqDto.expsrYn == "Y" ? "노출" : "비노출";
          faqCn.value = response.data.faqDto.faqCn;
          if (response.data.atchFileDtoList.length > 0) {
            originalAtchFile.value = response.data.atchFileDtoList[0];
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
async function getFaqCodeList(){
  try {
   const response = await axios.get("/faq/faqcodes");
   faqCodes.value = response.data;
  } catch (error) {}
}
onMounted(async () => {
  await getFaqCodeList();
  await getTextbookCodeList(subjectList, selectedSubjectNm);
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

input[type="checkbox"] {
  margin: 0px 10px 0px 10px;
}

textarea,
textarea:hover,
textarea:focus {
  width: 80% !important;
}

.input-help {
  display: flex;
  align-self: center;
  height: 100%;
  align-items: center;
  line-height: 100%;
}

.select-box {
  width: 30%;
}
</style>