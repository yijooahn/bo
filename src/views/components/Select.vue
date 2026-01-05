<template>
  <div
    v-if="isString"
    class="custom-select"
    @click="boxHide = !boxHide"
    @mouseleave="boxHide = true"
    :class="{ disabled: disabled }"
  >
    <div :class="['select-selected', { 'select-arrow-active': !boxHide }]">
      {{ sval }}
    </div>
    <div
      :class="['select-items', { 'select-hide': boxHide }, '']"
    >
      <div
        v-for="(op, idx) in options"
        :key="idx"
        :value="op"
        @click="sval = op"
        :class="{ 'same-as-selected': sval == op }"
      >
        {{ op }}
      </div>
    </div>
  </div>
  <div
    v-else
    class="custom-select"
    @click="boxHide = !boxHide"
    @mouseleave="boxHide = true"
    :class="{ disabled: disabled }"
  >
    <div :class="['select-selected', { 'select-arrow-active': !boxHide }]">
      {{ oval.name }}
    </div>
    <div
      :class="['select-items', { 'select-hide': boxHide }, '']"
    >
      <div
        v-for="(op, idx) in options"
        :key="idx"
        :value="op"
        @click="oval = op"
        :class="{ 'same-as-selected': oval.name == op.name }"
      >
        {{ op.name }}
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { defineModel, defineProps, ref, watch } from "vue";

const boxHide = ref(true);
const props = defineProps({
  options: {
    type: Array,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  isString: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const sval = defineModel("selected", {
  type: String,
  required: false,
  default: "",
});

const oval = defineModel("selectedObj", {
  type: Object,
  required: false,
  default: new Object(),
});

if (sval.value == "") {
  sval.value = props.options[0];
}
watch([sval, oval], (n) => valChanged(n), { deep: true });

function valChanged(n) {
  boxHide.value = true;
}
</script>

<style scoped>
/*the container must be positioned relative:*/
.custom-select {
  align-self: center;
  position: relative;
  display: flex;
  min-width: 8vw;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #e4e1e1;
  color: var(--black, #373f57);
  height: 34px;
  line-height: 34px;
  word-wrap: nowrap;
  white-space: nowrap;
  cursor: pointer;
}

.custom-select.disabled {
  border-radius: 6px !important;
  border: 1px solid #e4e1e1 !important;
  background: #f8f8f8 !important;
  color: rgba(55, 63, 87, 0.3) !important;
  pointer-events: none !important;
  cursor: not-allowed !important;
}

.custom-select select {
  display: none;
  /*hide original SELECT element:*/
  appearance: none;
}

/*style the arrow inside the select element:*/
.select-selected:after {
  all: unset;
  flex-shrink: 0;
  content: url("/images/icon19.svg");
  position: absolute;
  right: 8px;
  top: 0;
  text-align: center;
}

/*point the arrow upwards when the select box is open (active):
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}
*/
/*style the items (options), including the selected item:*/
.select-items div,
.select-selected {
  cursor: pointer;
  user-select: none;
  height: 34px;
  line-height: 34px;
  padding: 0 0.4rem;
}
.select-selected{
  overflow-x: hidden;
  text-overflow: ellipsis;
}
/*style items (options):*/
.select-items {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  text-align: start;
  flex-shrink: 0;
  border: 1px solid #e4e1e1;
  border-radius: 6px;
  /*margin-top: 0.2rem;*/
  background: white;
  box-shadow: 2px 6px 16px rgba(0, 0, 0, 0.08);
  max-height: 250px;
  overflow-y: auto;
}

/*hide the items when the select box is closed:*/
.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background: #eff5ff;
}
</style>