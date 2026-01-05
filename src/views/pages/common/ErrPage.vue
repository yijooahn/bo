<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: -1;
      display: flex;
      padding: 0 !important;
    "
  >
    <div
      style="
        width: 100%;
        height: 100%;
        vertical-align: middle;
        align-content: center;
        margin: 0 auto;
        position: absolute;
        left: 0;
        top: 0;
      "
    >
      <!--
			   <div style="width:100%;height:100%;margin:0 auto;">
				<div style="z-Index:0;position:absolute;" class="err-back">
				</div>
				<div style="z-Index:1;position:absolute;" class="err-pattern">
				</div>
				<div style="z-Index:2;position:absolute;top:3%;left:3%;">
					<div class="err-3"></div>
				</div>
				<div style="z-Index:3;position:absolute;top:50%;right:15%;">
					<div class="err-4"></div>
				</div>
				  <div style="z-Index:4;position:absolute;align-content: center;top:25%;left:30%;">
					<div class="err-5"></div>
				</div> 
			</div>
			-->
      <div
        style="
          align-content: center;
          top: 30%;
          left: 40%;
          width: fit-content;
          height: fit-content;
          position: sticky;
          text-align: -webkit-center;
        "
      >
        <div class="err-5"></div>
        <div class="err-text">
          일시적인 오류로 인해 접속하지 못했습니다
          <br />
          다시 접속해 주세요
        </div>
        <div calss="err-text-inner">
          계속해서 현재 화면이 표시되는 경우,
          <br />관리자에게 문의해 주세요
          <br />
          service@oooa.com
        </div>
      </div>
    </div>
  </div>
</template>
	
	<script setup lang="ts">
</script>
	
	<style scoped>
.err-text {
  width: 469px;
  height: 80px;

  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  /* or 143% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  /* black */
  color: #373f57;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 1rem;
}

.err-text-inner {
  width: 325px;
  height: 44px;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-top: 1rem;
  line-height: 100%;
  /* or 157% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  /* black */
  color: #373f57;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
	