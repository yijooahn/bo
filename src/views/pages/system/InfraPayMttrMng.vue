<template>
  <div>
    <p class="breadcrumb">시스템 관리 > 인프라 과금 모니터링</p>
    <p class="heading">인프라 과금 모니터링</p>
    <div class="blue-box-container">
      <div class="blue-box">
        <div class="blue-box-inner">
          <h2>당월 청구 금액</h2>
          <h1 class="font-bold">
            {{ thisMonthDemandAmount }}<span class="font-small">원</span>
          </h1>
          <h3 class="positive" v-if="changeRate > 0 && changeRate !== Infinity">
            (전월 대비 ▲ {{ changeRate }} %)
          </h3>
          <h3 class="negative" v-if="changeRate < 0">
            (전월 대비 ▼ {{ changeRate }} %)
          </h3>
          <h3 v-if="changeRate == 0">(전월과 동일)</h3>
        </div>
      </div>
      <div class="blue-box">
        <div class="blue-box-inner">
          <h2>전월 청구 금액</h2>
          <h1 class="font-bold">
            {{ lastMonthDemandAmount }}<span class="font-small">원</span>
          </h1>
          <div style="height: 2rem"></div>
        </div>
      </div>
      <div class="blue-box">
        <div class="blue-box-inner">
          <h2>현재까지 이용 요금 합계</h2>
          <h3>({{ searchDate }} 기준)</h3>
          <h1 class="font-bold">
            {{ totalUseAmount }}<span class="font-small">원</span>
          </h1>
        </div>
      </div>
    </div>
    <div class="div-container2">
      <div class="box">
        <div class="chart-container" v-if="totalUseAmount != '0'">
          <GChart type="PieChart" :data="chartData" :options="chartOption" />
        </div>
        <div v-else>
          <span>조회된 결과가 없습니다.</span>
        </div>
      </div>
      <div class="box">
        <div class="input-container">
          <input
            type="month"
            v-model="searchDate"
            :max="thisMonth"
            @change="inquiry()"
          />
        </div>
        <div class="table-container">
          <table class="table-2 t-c">
            <colgroup>
              <col width="25%" />
              <col width="50%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th><span>서비스 코드명</span></th>
                <th><span>이용 중인 서비스</span></th>
                <th><span>현재까지 이용 요금</span></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="searchResult.length > 0">
                <tr v-for="(sr, idx) in searchResult" :key="idx">
                  <td>
                    <span>{{ sr.code }}</span>
                  </td>
                  <td>
                    <span>{{ sr.codeName }}</span>
                  </td>
                  <td style="text-align: right; padding-right: 1rem">
                    <span>{{ insertComma(sr.useAmount) }}원</span>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="3">조회된 결과가 없습니다.</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { GChart } from "vue-google-charts";

const thisMonth = ref(
  new Date().toLocaleDateString("en-CA", { year: "numeric", month: "2-digit" })
);
const searchDate = ref(
  new Date()
    .toLocaleDateString("en-CA", { year: "numeric", month: "2-digit" })
    .slice(0, 7)
);

// 이용 서비스 목록 구분 하드코딩
const serverType = ref([
  "Server",
  "SSD Server",
  "GPU Server",
  "Bare Metal Server",
  "Cloud Functions",
]);
const storageType = ref([
  "Archive Storage",
  "Block Storage",
  "NAS",
  "Object Storage",
]);
const networkType = ref([
  "Load Balancer",
  "Global DNS",
  "Public IP",
  "Network",
  "SSL VPN",
  "IPsec VPN (VPC)",
  "NAT Gateway",
  "Private Subnet",
  "Secure Zone",
  "Secure Zone Firewall",
  "Global Traffic Manager",
  "VPC",
]);
const softwareType = ref([
  "Cloud Log Analytics",
  "Cloud DB for MySQL",
  "Tmax",
  "Web service Monitoring System",
  "File Safer",
  "Web Security Checker",
  "App Security Checker",
  "System Security Checker",
  "API Gateway",
  "CLOVA Speech Recognition(CSR)",
  "GeoLocation",
  "Cloud Hadoop",
  "Cloud Search",
  "SourceCommit",
  "SourceBuild",
  "SourcePipeline",
  "CLOVA OCR",
  "Key Management Service",
  "CLOVA Chatbot",
  "CLOVA Voice",
  "Cloud Insight",
  "Ncloud Kubernetes Service",
  "Search Engine Service",
  "Cloud DB for Redis",
  "Cloud Data Streaming Service",
  "LENA",
  "Blockchain Service",
  "Private CA",
  "Hardware Security Module (HSM)",
  "Papago Image Translation",
  "Cloud DB for PostgreSQL",
  "eXperDB",
  "Ncloud Simple RabbitMQ",
  "Cloud DB for MSSQL",
  "Ncloud Single Sign-On",
  "Classic Path",
  "Security Monitoring",
  "Cloud Desktop",
  "NAVER WORKS",
  "Cloud Security Watcher",
  "Secure Access",
  "Cloud DB for MongoDB",
]);
const cdnType = ref(["CDN+", "Global CDN"]);

const chartWidth = ref(window.innerWidth * 0.6);
const chartHeight = ref(window.innerHeight * 0.6);
const thisMonthDemandAmount = ref("");
const changeRate = ref();
const lastMonthDemandAmount = ref("");
const totalDemandAmount = ref("");
const totalUseAmount = ref("");
const searchResult = ref([]);
const chartData = ref([]);
const chartOption = reactive({
  title: "서비스 이용 현황",
  width: chartWidth.value,
  height: chartHeight.value,
  sliceVisibilityThreshold: 0,
  titleTextStyle: {
    fontSize: 16,
    bold: true,
    alignment: "start",
  },
  legend: {
    position: "bottom",
    maxLines: 10,
    textStyle: {
      fontSize: 12,
    },
    paging: false,
    scrollArrows: false,
    pagingTextStyle: {
      color: "black",
    },
  },
});

const resizeHandler = (event) => {
  chartWidth.value = window.innerWidth * 0.5;
  chartHeight.value = window.innerHeight * 0.6;
  chartOption.width = chartWidth.value;
  chartOption.height = chartHeight.value;
};

const insertComma = (num) => {
  if (num == null) {
    return "0";
  } else if (num.toString().length > 3) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

const inquiry = async () => {
  searchResult.value = [];
  chartData.value = [];
  let param = {
    staYm: searchDate.value.replaceAll("-", ""),
  };
  try {
    await axios.post(`/ncloud/inquiry`, param).then((response) => {
      if (response.data != null) {
        if (response.data.demandCost != null) {
          thisMonthDemandAmount.value = insertComma(
            response.data.demandCost.useAmount
          );
          changeRate.value = response.data.changeRate;
          lastMonthDemandAmount.value = insertComma(
            response.data.lastDemandCost.useAmount
          );
          totalDemandAmount.value = insertComma(
            response.data.demandCost.useAmount
          );
        }

        if (response.data.productDemandCost != null) {
          // 코드 구분 특정 항목 병합 하드코딩
          const productDemandCost = response.data.productDemandCost;
          const exception = ["VMGDB", "OBJST", "VSVR"];

          const mergeMappings = [
            {
              codes: productDemandCost.code.filter((item) =>
                item.includes(exception[0])
              ),
              newCode: exception[0],
              newCodeName: "Cloud DB for MongoDB (VPC)",
            },
            {
              codes: productDemandCost.code.filter((item) =>
                item.includes(exception[1])
              ),
              newCode: exception[1],
              newCodeName: "Object Storage",
            },
            {
              codes: productDemandCost.code.filter((item) =>
                item.includes(exception[2])
              ),
              newCode: exception[2],
              newCodeName: "Server (VPC)",
            },
          ];
          const beforeSetArray = productDemandCost.code.map((item, index) => ({
            code: item,
            codeName: productDemandCost.codeName[index],
            useAmount: productDemandCost.useAmount[index],
          }));

          const beforeSetMap = new Map();
          beforeSetArray.forEach((item) => {
            beforeSetMap.set(item.code, {
              ...item,
              useAmount: Number(item.useAmount),
            });
          });

          mergeMappings.forEach(({ codes, newCode, newCodeName }) => {
            const mergedUseAmount = codes.reduce((total, code) => {
              const item = beforeSetMap.get(code);
              if (item) {
                total += item.useAmount;
                beforeSetMap.delete(code);
              }
              return total;
            }, 0);

            beforeSetMap.set(newCode, {
              code: newCode,
              codeName: newCodeName,
              useAmount: mergedUseAmount,
            });
          });
          searchResult.value = Array.from(beforeSetMap.values());

          chartData.value.push(["codeName", "useAmount"]);
          let totalUseAmountNumber = 0;

          searchResult.value.forEach((item) => {
            let codeName = "";
            let useAmount = 0;
            if (serverType.value.some((type) => item.codeName.includes(type))) {
              codeName = "서버";
            } else if (
              storageType.value.some((type) => item.codeName.includes(type))
            ) {
              codeName = "스토리지";
            } else if (
              networkType.value.some((type) => item.codeName.includes(type))
            ) {
              codeName = "네트워크";
            } else if (
              softwareType.value.some((type) => item.codeName.includes(type))
            ) {
              codeName = "소프트웨어";
            } else if (
              cdnType.value.some((type) => item.codeName.includes(type))
            ) {
              codeName = "CDN";
            } else {
              codeName = "기타";
            }
            useAmount = item.useAmount == "" ? 0 : parseInt(item.useAmount);
            totalUseAmountNumber += useAmount;
            let existingData = chartData.value.find(
              (data) => data[0] === codeName
            );
            if (existingData) {
              existingData[1] += useAmount;
            } else {
              chartData.value.push([codeName, useAmount]);
            }
          });
          totalUseAmount.value = insertComma(totalUseAmountNumber);
          if (chartData.value != null && chartData.value != undefined) {
            chartData.value.sort((a, b) => b[1] - a[1]);
          }
        }
      }
    });
  } catch (err) {
    if (err.repsonse != null) {
      if (err.response.status != null) {
      }
    }
  }
};

onBeforeMount(() => {
  window.addEventListener("resize", resizeHandler);
});

onMounted(async () => {
  await inquiry();
});
</script>

<style scoped>
input[type="month"] {
  min-width: 8vw;
  height: 34px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #e4e1e1;
  background: #fff;
  color: var(--black, #373f57);
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-style: normal;
  line-height: 100%;
  text-align: center;
}

input[type="month"]::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url("/images/icon22.svg") center/50% no-repeat #e4e1e1;
  width: 37px;
  height: 30px;
  cursor: pointer;
  border-radius: 0px 6px 6px 0px;
  border: 1px solid #e4e1e1;
}

.div-container1 {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 40vh;
}

.div-container2 {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 80vh;
}

.box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-top: 0 auto;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inner-content {
  display: flex;
  align-items: baseline;
  height: 5rem;
}

.span-bold1 {
  font-size: 1.6rem;
}

.span-bold2 {
  font-size: 2.4rem;
  font-weight: bold !important;
}

h3.positive {
  color: red;
}

h3.negative {
  color: blue;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  margin-right: 5%;
}

.table-container {
  width: 100%;
  overflow: auto;
}

.table-2 {
  margin: 0 0 1rem 0;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table-2 thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}

.table-2 th,
.table-2 td {
  padding: 8px;
}

.blue-box-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  place-items: center;
  justify-items: center;
  margin: 2rem 0;
}

.blue-box {
  background: #eff5ff;
  border-radius: 16px;
  color: #373f57;
  box-shadow: 1px 9px 12px #00000014;
  width: 24vw;
  height: 18vw;
}

.blue-box-inner {
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  align-content: center;
}

.blue-box-inner * {
  line-height: 100%;
  vertical-align: middle;
}

.font-bold {
  font-family: SpoqaHanSansNeoBold;
  font-size: 250%;
}

.font-small {
  font-size: 55%;
  margin-left: 0.3rem;
}
</style>