<template>
  <div v-if="first && active" class="first-tab active">
    <svg
      class="rectangle-10330"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 14C0 6.26801 6.26801 0 14 0H131C138.732 0 145 6.26801 145 14L150 50H0V14Z"
        fill="white"
      />
    </svg>
    <svg
      class="rectangle-10327-stroke"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 50H1V14C1 6.8203 6.8203 1 14 1H131C138.18 1 144 6.8203 144 14L149 50H150L145 14C145 6.26801 138.732 0 131 0H14C6.26801 0 0 6.26801 0 14V50Z"
        fill="#EAEAEA"
      />
    </svg>
    <div class="div" v-html="title"></div>
  </div>

  <div v-else-if="first && !active" class="first-tab">
    <svg
      class="rectangle-10330"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 14C0 6.26801 6.26801 0 14 0H131C138.732 0 145 6.26801 145 14L150 50H0V14Z"
        fill="#F8F8F8"
      />
    </svg>
    <svg
      class="rectangle-10327-stroke"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 50H1V14C1 6.8203 6.8203 1 14 1H131C138.18 1 144 6.8203 144 14L149 50H150L145 14C145 6.26801 138.732 0 131 0H14C6.26801 0 0 6.26801 0 14V50Z"
        fill="#EAEAEA"
      />
    </svg>
    <div class="div" v-html="title"></div>
  </div>

  <div v-else-if="!first && active" class="tab active">
    <svg
      class="rectangle-10330"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 14C5 6.26801 11.268 0 19 0H131C138.732 0 145 6.26801 145 14L150 50H0L5 14Z"
        fill="white"
      />
    </svg>
    <svg
      class="rectangle-10327-stroke"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 50H1L6 14C6 6.8203 11.8203 1 19 1H131C138.18 1 144 6.8203 144 14L149 50H150L145 14C145 6.26801 138.732 0 131 0H19C11.268 0 5 6.26801 5 14L0 50Z"
        fill="#EAEAEA"
      />
    </svg>
    <div class="div" v-html="title"></div>
  </div>

  <div v-else-if="!first && !active" class="tab">
    <svg
      class="rectangle-10330"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 14C5 6.26801 11.268 0 19 0H131C138.732 0 145 6.26801 145 14L150 50H0L5 14Z"
        fill="#F8F8F8"
      />
    </svg>
    <svg
      class="rectangle-10327-stroke"
      width="150"
      height="50"
      viewBox="0 0 150 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 50H1L6 14C6 6.8203 11.8203 1 19 1H131C138.18 1 144 6.8203 144 14L149 50H150L145 14C145 6.26801 138.732 0 131 0H19C11.268 0 5 6.26801 5 14L0 50Z"
        fill="#EAEAEA"
      />
    </svg>
    <div class="div" v-html="title"></div>
  </div>
</template>
  
  <script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(["first", "active", "title"]);
</script>
  
  <style scoped>
.first-tab,
.first-tab *,
.tab,
.tab * {
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
}

.first-tab {
  width: 150px;
  height: 50px;
  position: relative;
}

.first-tab .rectangle-10330 {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}

.first-tab .rectangle-10327-stroke {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}

.first-tab .div {
  color: var(--black, #373f57);
  text-align: center;
  font-weight: 500;
  position: absolute;
  right: 33.33%;
  left: 32.67%;
  width: 34%;
  bottom: 32%;
  top: 32%;
  height: 36%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.first-tab,
.tab {
  z-index: var(--index);
}
.first-tab.active,
.tab.active {
  z-index: 4;
}
.first-tab.active .div {
  color: var(--blue, #4876ef);
  font-family: SpoqaHanSansNeoBold;
}
:root,
*:nth-child(1) {
  --index: 4;
}
*:nth-child(2) {
  --index: 3;
}
*:nth-child(3) {
  --index: 2;
}
*:nth-child(4) {
  --index: 1;
}
*:nth-child(5) {
  --index: 0;
}
.tab {
  left: calc(-15px * calc(4 - var(--index)));
}

.tab.active .div {
  font-family: SpoqaHanSansNeoBold;
}

.tab.active .rectangle-10330 {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}

.tab.active .rectangle-10327-stroke {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}

.tab .div {
  color: var(--black, #373f57);
  text-align: center;
  font-weight: 500;
  position: absolute;
  right: 33.33%;
  left: 32.67%;
  width: 34%;
  bottom: 32%;
  top: 32%;
  height: 36%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.tab.active .div {
  color: var(--blue, #4876ef);
}

.tab {
  width: 150px;
  height: 50px;
  position: relative;
}

.tab .rectangle-10330 {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}

.tab .rectangle-10327-stroke {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
  overflow: visible;
}
.tab:hover svg path,
.first-tab:hover svg path {
  fill: #e1f1ff91;
}
</style>
  