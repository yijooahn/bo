<template>
  <button
    v-for="(m, idx) in menues"
    :disabled="m.disabled"
    :key="idx"
    @click="collapseListener(m, idx)"
    v-show="m.show"
    v-html="m.value"
    :class="[
      `menu-depth${m.depth}`,
      m.icon ? 'icon' : '',
      m.current ? 'current' : '',
    ]"
  ></button>
</template>
  
      
  <script setup lang="ts">
import { defineModel, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const menues = defineModel("menuList", {
  type: Array,
});
const current = ref(0);

menues.value[current.value].current = true;

function collapseListener(m, idx) {
  menues.value[current.value].current = false;
  current.value = idx;
  menues.value[current.value].current = true;

  var l = idx;
  for (var i = idx + 1; i < menues.value.length; i++) {
    if (menues.value[i].depth <= m.depth || i == menues.value.length - 1) {
      l = i;
      break;
    }
  }
  for (var i = idx + 1; i <= l; i++) {
    if (menues.value[i].show) {
      if (menues.value[i].depth >= m.depth + 1) {
        menues.value[i].show = !menues.value[i].show;
      }
    } else {
      if (menues.value[i].depth == m.depth + 1) {
        menues.value[i].show = !menues.value[i].show;
      }
    }
  }
  if (m.path) {
    router.push(m.path);
  }
}
</script>
  
      
  <style scoped>
.menu-depth1,
.menu-depth2,
.menu-depth3 {
  all: unset;
  cursor: pointer;
  min-width: 8.5vw;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  background: #fff;
  color: var(--black, #373f57);
  font-size: 15px;
  font-family: SpoqaHanSansNeoBold;
  letter-spacing: -1px;
  vertical-align: middle;
  padding: 10px;
  height: 100%;
  text-wrap: nowrap;
}

.menu-depth2 {
  border: none;
  background: #fff;
  color: var(--black, #373f57);
  font-family: SpoqaHanSansNeo;
}

.menu-depth3 {
  border: none;
  color: var(--black, #373f57);
  background: #fff;
  font-family: SpoqaHanSansNeo;
}
.menu-depth3::before {
  content: url("/images/icon31.svg");
  float: left;
  vertical-align: middle;
  padding: 0 0.5rem 0 0.5rem;
  filter: invert(1) saturate(0) hue-rotate(45deg);
  transform: scale(1.5);
  line-height: 100%;
}

.menu-depth1.icon::after {
  content: url("/images/icon19.svg");
  float: right;
  vertical-align: middle;
  line-height: 100%;
}

.menu-depth1:active,
.menu-depth1.current {
  border-radius: 6px !important;
  color: #4876ef !important;
  border: 2px solid var(--blue, #4876ef) !important;
  background: #fff !important;
}

.menu-depth2:active,
.menu-depth2.current {
  border: none;
  font-family: SpoqaHanSansNeoBold !important;
  flex-shrink: 0;
  color: #4876ef !important;
  background: #eff5ff !important;
}

.menu-depth3:active,
.menu-depth3.current {
  background: #eff5ff;
  border: none;
  font-family: SpoqaHanSansNeoBold;
  color: #4876ef;
}

.menu-depth2.icon::after {
  content: url("/images/icon19.svg");
  float: right;
  vertical-align: middle;
  line-height: 100%;
}

.menu-depth1:disabled,
.menu-depth2:disabled,
.menu-depth3:disabled {
  border-radius: 6px !important;
  border: 1px solid #e4e1e1 !important;
  background: #f8f8f8 !important;
  color: rgba(55, 63, 87, 0.3) !important;
  pointer-events: none !important;
  cursor: not-allowed !important;
}
.menu-depth2:disabled,
.menu-depth3:disabled {
  border: none;
}
.menu-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0.5rem;
}

.menu-depth1:hover {
  color: var(--blue, #4876ef);
  background: #fff;
  border-radius: 6px;
  border: 1px solid #eaeaea;
}

.menu-depth2:hover {
  color: #373f57;
  background: #fff;
  border: none;
  background: #f8f8f8;
}

.menu-depth1.icon:disabled::after {
  content: url("/images/icon19.svg");
  filter: invert(70%);
  float: right;
  vertical-align: middle;
  line-height: 100%;
}

.menu-depth2.icon:disabled::after {
  content: url("/images/icon19.svg");
  filter: invert(70%);
  float: right;
  vertical-align: middle;
  line-height: 100%;
}

.menu-depth3:hover {
  background: #f8f8f8;
  border: none;
}
</style>
  
  