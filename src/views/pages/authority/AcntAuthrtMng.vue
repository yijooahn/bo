<template>
  <div>
    <p class="breadcrumb">회원 관리 > 권한관리</p>
    <p class="heading">계정별 권한관리</p>
    <table class="table-1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <span>권한유무</span>
          </th>
          <td>
            <div>
              <span>
                <input
                  type="radio"
                  name="rdAuthrtYn"
                  id="rdo0"
                  value="0"
                  v-model="authrtYn"
                  checked
                />
                <label for="rdo0">전체</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdAuthrtYn"
                  id="rdo1"
                  value="1"
                  v-model="authrtYn"
                />
                <label for="rdo1">권한있음</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="rdAuthrtYn"
                  id="rdo2"
                  value="2"
                  v-model="authrtYn"
                />
                <label for="rdo2" class="text-red">권한없음</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>최종 수정일</span>
          </th>
          <td>
            <div>
              <calendar-comp
                v-model:startDate="startDate"
                v-model:endDate="endDate"
                :selectBox="true"
              ></calendar-comp>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <span>키워드</span>
          </th>
          <td>
            <div>
              <select-comp
                :options="['이메일', '관리자명', '등록자', '소속명']"
                v-model:selected="searchType"
              ></select-comp>
              <input
                type="text"
                placeholder="키워드를 입력하세요"
                v-model.trim="searchWord"
                @keyup.enter="inquiry('bare')"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ct-18">
      <button @click="inquiry('bare')" class="btn-1">조회</button>
    </div>
    <div class="ct-19">
      <component
        :is="pagination"
        v-model:pageable="pageable"
        :isPageSize="true"
      ></component>
      <div class="ct-21">
        <button class="btn-1" v-if="masking" @click="unmasking()">
          마스킹 해제
        </button>
        <!--<button class="btn-1" @click="router.push('/acntAuthrtMngModify/0')">권한변경</button>-->
        <button
          class="btn-1"
          @click="
            router.push({ name: 'acntAuthrtMngModifyView', state: { id: 0 } })
          "
        >
          권한변경
        </button>
      </div>
    </div>
    <table class="table-2 t-c">
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="6%" />
        <col width="16%" />
        <col width="10%" />
        <col width="13%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th><span>No.</span></th>
          <th><span>소속그룹명</span></th>
          <th><span>권한유무</span></th>
          <th><span>이메일</span></th>
          <th><span>관리자명</span></th>
          <th><span>소속명</span></th>
          <th><span>등록자명</span></th>
          <th><span>최종수정자명</span></th>
          <th class="sort-column" @click="sort('B.REG_DT')">
            <span>등록일시</span>
            <span
              v-if="'B.REG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'B.REG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
          <th class="sort-column" @click="sort('B.CHG_DT')">
            <span>최종수정일시</span>
            <span
              v-if="'B.CHG_DT' == sortColumn && ascending"
              class="arrow-up"
            ></span>
            <span
              v-if="'B.CHG_DT' == sortColumn && !ascending"
              class="arrow-down"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!pageable.empty" v-for="(sr, idx) in searchResult" :key="idx">
          <td>
            <span>{{ sr.authrtId }}</span>
          </td>
          <td>
            <span v-if="sr.groupNm != ''">{{ sr.groupNm }}</span>
            <span v-else>-</span>
          </td>
          <td>
            <span
              v-if="sr.menuList > 0 && sr.groupAuthId != ''"
              style="text-decoration: underline; cursor: pointer"
              @click="groupClickPopup(sr.groupAuthId, sr.groupNm)"
              >{{ (sr.menuList * 1).toLocaleString() }}</span
            >
            <span
              v-else-if="sr.menuList > 0 && sr.groupAuthId == ''"
              style="text-decoration: underline; cursor: pointer"
              @click="clickPopup(sr.emlAddr, sr.mbrId, sr.mbrNm)"
              >{{ (sr.menuList * 1).toLocaleString() }}</span
            >
            <span v-else class="text-red">권한없음</span>
          </td>
          <!-- <td>
                        <span v-if="sr.menuList > 0" style="text-decoration: underline;cursor:pointer;" @click="clickPopup(sr.emlAddr,sr.mbrId,sr.mbrNm)">{{ (sr.menuList*1).toLocaleString() }}</span>
                        <span v-else class="text-red">권한없음</span>
                    </td> -->
          <!-- <td class="cs-p" @click="router.push({name:'acntAuthrtMngModifyView',state:{id:`${sr.mbrId}`}})"><span style="text-decoration: underline;">{{ sr.emlAddr }}</span></td> -->
          <td
            v-if="sr.groupAuthId != ''"
            class="cs-p"
            @click="
              router.push({
                name: 'groupAuthrtMngWriteView',
                state: { id: `${sr.groupAuthId}` },
              })
            "
          >
            <span style="text-decoration: underline">
              {{ sr.emlAddr }}
            </span>
          </td>
          <td
            v-else
            class="cs-p"
            @click="
              router.push({
                name: 'acntAuthrtMngModifyView',
                state: { id: `${sr.mbrId}` },
              })
            "
          >
            <span style="text-decoration: underline">
              {{ sr.emlAddr }}
            </span>
          </td>
          <td>
            <span>{{ sr.mbrNm }}</span>
          </td>
          <td>
            <span>{{ sr.ogdpInst }}</span>
          </td>
          <td>
            <span>{{ sr.rgtr }}</span>
          </td>
          <td>
            <span>{{ sr.chgr }}</span>
          </td>
          <td>
            <span>{{ sr.regDt }}</span>
          </td>
          <td>
            <span>{{ sr.chgDt }}</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="10">조회된 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
    <div class="ct-22">
      <component
        @on-change-handler="inquiry()"
        :is="pagination"
        v-model:pageable="pageable"
      ></component>
    </div>
    <component
      v-model:isActive="popupIsActive"
      :alertModal="alertModal"
      @on-reload-handler="inquiry('mask')"
      @on-masking-handler="(v) => submitMasking(v)"
      :is="ModalComp"
    ></component>
    <component
      v-model:isActive="detailPopupIsActive"
      :alertModal="detailModal"
      :is="AuthDetailModal"
    ></component>
    <component
      v-model:isActive="detailGroupPopupIsActive"
      :alertModal="detailModal"
      :is="GroupAuthDetailModal"
    ></component>
  </div>
</template>
    
<script setup lang="ts">
import { useMaskingStore } from "@/store/masking";
import { useSortStore } from "@/store/sort.js";
import CalendarComp from "@/views/components/Calendar.vue";
import pagination from "@/views/components/Pagination.vue";
import SelectComp from "@/views/components/Select.vue";
import AuthDetailModal from "@/views/components/popup/AuthDetailModal.vue";
import GroupAuthDetailModal from "@/views/components/popup/GroupAuthDetailModal.vue";
import ModalComp from "@/views/components/popup/SignUpModal.vue";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const alertModal = ref({
  contentAlign: "start",
  loginUser: document.cookie
    .split("; ")
    .filter((el) => el.startsWith("maskedId="))[0]
    .replace("maskedId=", ""),
  overflow: "hidden",
  masking: false,
  display: "block",
  headerHtml: "<h4>알림</h4>",
  bodyHtml: "<span>승인 하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "confirm",
      content: "확인",
      addClass: "btn-1",
    },
    {
      clickEvent: "close",
      content: "취소",
      addClass: "btn-2",
    },
  ],
});
const detailModal = ref({
  contentAlign: "start",
  // loginUser : document.cookie.split('; ').filter(el=>el.startsWith('maskedId='))[0].replace('maskedId=',''),
  overflow: "hidden",
  masking: false,
  display: "block",
  //headerHtml: '<h4>알림</h4>',
  //bodyHtml: "<span>승인 하시겠습니까?</span>",
  width: "fit-content",
  height: "fit-content",
  buttons: [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ],
});
const detailPopupIsActive = ref(false);
const detailGroupPopupIsActive = ref(false);
const router = useRouter();
const popupIsActive = ref(false);
const pageable = ref({});

const masking = ref(true);
const startDate = ref();
const endDate = ref();
const authrtYn = ref(0);
const searchType = ref("이메일");
const searchWord = ref("");
const searchResult = ref([]);
const ascending = ref(false);
const sortColumn = ref("B.REG_DT");
const store = useSortStore();
const maskingStore = useMaskingStore();
const { sortTable } = store;
function sort(col) {
  sortTable(sortColumn, col, ascending);
}

const unmasking = () => {
  alertModal.value.masking = true;
  popupIsActive.value = true;
};

const clickPopup = (addr, id, name) => {
  detailModal.value.id = id;
  detailModal.value.headerHtml = `<h4>${name}(${addr})님의 권한보기<h4>`;
  //alertModal.value.bodyHtml = `<span>권한보기</span><br><span>${menuList}</span>`;
  detailModal.value.buttons = [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ];
  detailPopupIsActive.value = true;
};

const groupClickPopup = (id, name) => {
  detailModal.value.id = id;
  detailModal.value.headerHtml = `<h4>${name}님의 권한보기<h4>`;
  //alertModal.value.bodyHtml = `<span>권한보기</span><br><span>${menuList}</span>`;
  detailModal.value.buttons = [
    {
      clickEvent: "close",
      content: "확인",
      addClass: "btn-1",
    },
  ];
  detailGroupPopupIsActive.value = true;
};

async function inquiry(bare) {
  let endp = "inquiry";
  if (!masking.value) {
    endp += "bare";
  }
  if (bare == "bare") {
    masking.value = true;
    endp = "inquiry";
    pageable.value.size = 10;
    pageable.value.number = 0;
  } else if (bare == "mask") {
    searchWord.value = "";
  }
  searchResult.value = [];
  let param = {};
  //if(startDate.value != null && endDate.value != null){
  param.chgBgngYmd = startDate.value;
  param.chgEndYmd = endDate.value;
  //}else{

  //}
  param.authrtYn = Number(authrtYn.value);

  if (searchType.value == "이메일") {
    if (searchWord.value != "") {
      param.emlAddr = searchWord.value;
    }
  } else if (searchType.value == "관리자명") {
    if (searchWord.value != "") {
      param.mbrNm = searchWord.value;
    }
  } else if (searchType.value == "등록자") {
    if (searchWord.value != "") {
      param.rgtr = searchWord.value;
    }
  } else if (searchType.value == "소속명") {
    if (searchWord.value != "") {
      param.ogdpInst = searchWord.value;
    }
  }
  if (pageable.value.number == undefined) pageable.value.number = 0;
  if (pageable.value.size == undefined) pageable.value.size = 10;
  if (pageable.value.sort == undefined || pageable.value.sort == "REG_DT")
    pageable.value.sort = "B.REG_DT";
  if (pageable.value.direction == undefined) pageable.value.direction = "DESC";
  await axios
    .post(
      `/authority/${endp}?page=${pageable.value.number}&size=${pageable.value.size}&sort=${pageable.value.sort},${pageable.value.direction}`,
      param
    )
    .then((response) => {
      if (response.data != null) {
        pageable.value.empty = response.data.empty;
        pageable.value.first = response.data.first;
        pageable.value.last = response.data.last;
        pageable.value.number = response.data.number;
        pageable.value.totalElements = response.data.totalElements;
        pageable.value.totalPages = response.data.totalPages;
        pageable.value.offset = response.data.pageable.offset;

        if (response.data.content != null) {
          if (response.data.content.length > 0) {
            searchResult.value = response.data.content;
          } else {
            searchResult.value = [];
          }
        }
      } else {
        //console.log(response);
      }
    })
    .catch((error) => {
      if (error.response != null) {
        if (error.response.status != null) {
          if (error.response.status == 404) {
            pageable.value.empty = true;
            pageable.value.totalPages = 0;
            searchResult.value = [];
          }
        }
      }
    })
    .finally(() => {
      masking.value = true;
      //startDate.value=param.chgBgngYmd;
      //endDate.value=param.chgEndYmd;
    });
}
const submitMasking = async (msg) => {
  await maskingStore.triggerSubmitMasking(
    "/authority/inquirybare",
    msg,
    searchResult,
    masking,
    inquiry
  );
};
watch(ascending, async (n, o) => {
  if (n != o) {
    if (n) {
      pageable.value.direction = "ASC";
    } else {
      pageable.value.direction = "DESC";
    }
    await inquiry();
  }
});
watch(sortColumn, async (n, o) => {
  if (n != o) {
    pageable.value.sort = n;
    await inquiry();
  }
});
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