<template>
  <div v-if="isActive && current && props.first" class="div current">
    <svg
      class="polygon-3"
      width="20"
      height="56"
      viewBox="0 0 20 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 28L-5.40489e-07 56L1.90735e-06 -8.74228e-07L20 28Z"
        fill="#4876EF"
      />
    </svg>
    <div class="group-1257">
      <div class="rectangle-10347"></div>
      <div class="div2">{{ props.title }}</div>
    </div>
  </div>
  <div v-if="isActive && !current && props.first" class="div">
    <svg
      class="polygon-3"
      width="20"
      height="56"
      viewBox="0 0 20 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 28L-5.40489e-07 56L1.90735e-06 -8.74228e-07L20 28Z"
        fill="#EFF5FF"
      />
    </svg>
    <div class="group-1257">
      <div class="rectangle-10347"></div>
      <div class="div2">{{ props.title }}</div>
    </div>
  </div>
  <div v-if="isActive && current && !props.first" class="div3 current">
    <div class="div4">
      <svg
        class="polygon-3"
        width="20"
        height="56"
        viewBox="0 0 20 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 28L-5.40489e-07 56L1.90735e-06 -8.74228e-07L20 28Z"
          fill="#4876ef"
        />
      </svg>
      <svg
        class="subtract"
        width="20"
        height="56"
        viewBox="0 0 20 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 0H0L20 28L0 56H20L20 28L20 0Z"
          fill="#4876ef"
        />
      </svg>
      <div class="group-1255">
        <div class="rectangle-10347-2"></div>
        <div class="div4">{{ props.title }}</div>
      </div>
    </div>
  </div>
  <div v-if="isActive && !current && !props.first" class="div3">
    <div class="div4">
      <svg
        class="polygon-3"
        width="20"
        height="56"
        viewBox="0 0 20 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 28L-5.40489e-07 56L1.90735e-06 -8.74228e-07L20 28Z"
          fill="#EFF5FF"
        />
      </svg>
      <svg
        class="subtract"
        width="20"
        height="56"
        viewBox="0 0 20 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 0H0L20 28L0 56H20L20 28L20 0Z"
          fill="#EFF5FF"
        />
      </svg>
      <div class="group-1255">
        <div class="rectangle-10347-2"></div>
        <div class="div4">{{ props.title }}</div>
      </div>
    </div>
  </div>
</template>

    
<script setup lang="ts">
import { defineModel, defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
  },
  first: {
    type: Boolean,
  },
});
const current = defineModel("current", {
  type: Boolean,
  default: false,
  required: false,
});
const isActive = defineModel("isActive", {
  type: Boolean,
  default: false,
  required: false,
});
</script>

    
<style scoped>
.div,
.div * {
  box-sizing: border-box;
}

.div.current {
  flex-shrink: 0;
  width: 140px;
  height: 56px;
  position: relative;
  color: #ffffff;
}
.div {
  flex-shrink: 0;
  width: 140px;
  height: 56px;
  position: relative;
  color: rgba(55, 63, 87, 0.5);
}
.polygon-3 {
  width: 20px;
  height: 56px;
  position: absolute;
  left: 140px;
  top: 0px;
  transform: translate(-20px, 0px);
  overflow: visible;
}

.group-1257 {
  width: 120px;
  height: 56px;
  position: static;
}

.div.current .rectangle-10347 {
  background: var(--blue, #4876ef);
  width: 120px;
  height: 56px;
  position: absolute;
  left: 0px;
  top: 0px;
}

.rectangle-10347 {
  background: #eff5ff;
  width: 120px;
  height: 56px;
  position: absolute;
  left: 0px;
  top: 0px;
}

.div.current .div2 {
  color: #ffffff;
  text-align: center;
  font-family: SpoqaHanSansNeoBold;
  position: absolute;
  left: 30%;
  top: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.div .div2 {
  color: rgba(55, 63, 87, 0.5);
  text-align: center;
  font-family: SpoqaHanSansNeoBold;
  position: absolute;
  left: 30%;
  top: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.div3,
.div3 * {
  box-sizing: border-box;
}

.div3 {
  margin: 0 0 0 -10px;
  flex-shrink: 0;
  width: 140px;
  height: 56px;
  position: relative;
}

.subtract {
  width: 20px;
  height: 56px;
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: visible;
}

.group-1255 {
  width: 100px;
  height: 56px;
  position: static;
}
.div3.current .rectangle-10347-2 {
  background: var(--blue, #4876ef);
  width: 100px;
  height: 56px;
  position: absolute;
  left: 20px;
  top: 0px;
}
.div3 .rectangle-10347-2 {
  background: #eff5ff;
  width: 100px;
  height: 56px;
  position: absolute;
  left: 20px;
  top: 0px;
}
.div3.current .div4 {
  color: #ffffff;
  text-align: center;
  font-family: SpoqaHanSansNeoBold;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
}
.div3 .div4 {
  color: rgba(55, 63, 87, 0.5);
  text-align: center;
  font-family: SpoqaHanSansNeoBold;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
}
</style>
