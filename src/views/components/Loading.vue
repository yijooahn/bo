<template>
  <div v-if="isActive" class="modal-container">
    <div class="pop">
      <div class="pop-content">
        <div class="spinner-container">
          <div class="item">
            <div class="loader01"></div>
          </div>
          <div class="item2">
            <span>잠시만 기다려주세요...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    
    
<script setup lang="ts">
import { defineModel } from "vue";

const isActive = defineModel("isActive", {
  type: Boolean,
  default: false,
  required: false,
});
</script>
    
    
<style scoped>
span {
  font-family: SpoqaHanSansNeoBold;
  font-size: 100% !important;
}
.modal-container {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
}

.pop {
  max-width: 15vmax;
  max-height: 15vmin;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: absolute;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 10px 16px 0px rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline;
}

.pop-content {
  display: block;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--black, #373f57);
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
.spinner-container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 2fr 1fr;
  flex-flow: row wrap;
  justify-content: space-around;
}
.item {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  position: relative;
}
.item2 {
  width: 100%;
  height: 100%;
  font-size: 0.8vw;
}
.loader01 {
  width: 1.8vw;
  height: 1.8vw;
  border: 5px solid #1357d5;
  border-right-color: transparent;
  border-radius: 50%;
  position: relative;
  animation: loader-rotate 1.2s linear infinite;
  top: 50%;
  margin: -15px auto 0;
}
@keyframes loader-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
