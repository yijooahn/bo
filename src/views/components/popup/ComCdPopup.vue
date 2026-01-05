<template>
  <Modal :alertModal="alertModal" v-if="isActive" v-model:isActive="isActive">
    <template #header>
      <div v-html="alertModal.headerHtml"></div>
    </template>
    <template #body>
      <!-- <div style="padding: 20px; width: 800px;" class="table-container">-->
      <div style="margin: 20px" class="table-container ">
        <table class="table-2 t-c">
          <!--<colgroup>
            <col width="10%">
            <col width="20%">
            <col width="30%">
            <col width="20%">
            <col width="10%">
          </colgroup>-->
          <thead>
            <tr>
              <th><span>코드ID</span></th>
              <th><span>코드명</span></th>
              <th><span>설명</span></th>
              <th><span>상위코드ID</span></th>
              <th><span>사용여부</span></th>
            </tr>
          </thead>
          <tbody v-if="searchResult.length > 0">
            <tr v-for="(sr, idx) in searchResult" :key="idx">
              <td>
                <span>{{ sr.subComCdId }}</span>
              </td>
              <td>
                <span>{{ sr.subComCdNm }}</span>
              </td>
              <td>
                <span
                  v-if="sr.subComCdExpln != null && sr.subComCdExpln != ''"
                  >{{ sr.subComCdExpln }}</span
                >
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="sr.subUptCdId != null && sr.subUptCdId != ''">{{
                  sr.subUptCdId
                }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <span>{{ sr.subUseYn }}</span>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="t-c">
              <td colspan="5">조회된 결과가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import axios from "axios";
import { defineModel, defineProps, ref, watch } from "vue";
import Modal from "../Pop.vue";
const isActive = defineModel("isActive", {
  type: Boolean,
  required: false,
  default: false,
});
const props = defineProps({
  alertModal: Object,
});

const groupCdId = ref();
const searchResult = ref([]);

watch(isActive, async (v) => {
  if (v) {
    groupCdId.value = props.alertModal.groupCdId;
    await inquiry();
  }
});

const inquiry = async () => {
  let param = {
    groupCdId: groupCdId.value,
  };

  try {
    const response = await axios.post(
      `/commoncode/menuinquiry/${groupCdId.value}`,
      param
    );
    if (response.data != null) {
      searchResult.value = response.data.content;
    } else {
      searchResult.value = [];
    }
  } catch (error) {
    if (error.response != null) {
      if (error.response.status != null) {
        if (error.response.status04) {
          searchResult.value = [];
        }
      }
    }
  }
};
</script>

<style scoped>
.div-container {
  margin-left: 10px;
  margin-bottom: 10px;
  text-align: left;
}

th,
td {
  font-weight: unset;
  font-style: unset;
  padding: 0.3rem !important;
}

input[type="text"],
input[type="password"],
input[type="number"],
input[type="email"] {
  width: 90% !important;
}

.table-container {
  width: 100%;
  height: 30rem !important;
  overflow: auto;
}

.table-2 {
  margin: 0 0 1rem 0;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
/*
.table-2 thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}
*/
</style>