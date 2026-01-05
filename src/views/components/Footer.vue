<template>
  <div class="footer">
    <div class="footer-inner">
      <div class="f1">
        <div class="f1-1">oooo(주) 서울시 영등포구 은행로 30(여의도동)</div>
        <div class="f1-2">대표이사 ㅇㅇㅇ</div>
      </div>
      <div class="descript"></div>
      <div class="f2">
        <div class="f2-1">사업자등록번호 123-45-56799</div>
        <div class="f2-2">통신판매업신고 2015-서울영등포-0000호</div>
      </div>
      <div class="descript"></div>
      <div class="f3">
        <div class="f3-1">대표번호</div>
        <div class="f3-2">1644-0000</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.f1 {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #909090;
}

.f1-1 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.f1-2 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.descript {
  width: 1px;
  height: 14px;
  background: #ddd;
}

.f2 {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.f2-1 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.f2-2 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.f3 {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.f3-1 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.f3-2 {
  color: #909090;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  /* 166.667% */
  letter-spacing: -0.5px;
}

.footer {
  text-align: center;
  height: 5%;
  width: 100%;
}

.footer-inner {
  display: flex;
  height: calc(100% - 2px);
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  background: #fff;
  gap: 15px;
}
</style>
