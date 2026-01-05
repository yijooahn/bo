<template>
  <div class="ToggleSwitch ts">
    <div class="Rectangle56 rec-56"></div>
    <div class="MaskGroup msk-grp">
      <div class="Rectangle60 rec-60"></div>
      <div class="Rectangle57 rec-57" :style="{ left: left }"></div>
    </div>
    <div
      id="admin"
      @click="triggerToggle($event.target.id)"
      :style="{ color: color1 }"
    >
      ADMIN
    </div>
    <div
      id="lcms"
      @click="triggerToggle($event.target.id)"
      :style="{ color: color2 }"
    >
      LCMS
    </div>
    <!-- <div id="lrs" @click="triggerToggle($event.target.id)" :style="{color:color3}">LRS</div> -->
  </div>
</template>

    
<script setup lang="ts">
import { defineModel, ref, watch } from "vue";

const left = ref("0px");
const color1 = ref("white");
const color2 = ref("#4876EF");
const color3 = ref("#4876EF");

const current = defineModel("activeUser", {
  type: String,
  default: "admin",
  required: false,
});

function triggerToggle(v) {
  current.value = v;
  if (v == "lcms") {
    location.href = import.meta.env.VITE_LCMS_WEB_URL;
  } else if (v == "admin") {
    location.href = import.meta.env.VITE_BO_WEB_URL;
  }
  //  else {
  //     location.href =
  //         import.meta.env.VITE_LRS_WEB_URL
  // }
}

watch(current, (newVal) => {
  if (newVal == "admin") {
    left.value = "0px";
    color1.value = "white";
    color2.value = "#4876EF";
    color3.value = "#4876EF";
  } else if (newVal == "lcms") {
    left.value = "46px";
    color1.value = "#4876EF";
    color2.value = "white";
    color3.value = "#4876EF";
  } else {
    left.value = "92px";
    color1.value = "#4876EF";
    color2.value = "#4876EF";
    color3.value = "white";
  }
});

if (current.value == "admin") {
  left.value = "0px";
  color1.value = "white";
  color2.value = "#4876EF";
  color3.value = "#4876EF";
} else if (current.value == "lcms") {
  left.value = "46px";
  color1.value = "#4876EF";
  color2.value = "white";
  color3.value = "#4876EF";
} else {
  left.value = "92px";
  color1.value = "#4876EF";
  color2.value = "#4876EF";
  color3.value = "white";
}
</script>

    
<style scoped>
.ts {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}
/*
.rec-56{
    width: 136px; height: 28px; left: 0px; top: 0px; position: absolute; background: white; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06) inset; border-radius: 80px; border: 1px #4876EF solid;
}
.msk-grp{
    width: 136px; height: 28px; left: 0px; top: 0px; position: absolute;
}
.rec-60{
    width: 138px; height: 28px; left: 0px; top: 0px; position: absolute; background: white; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06) inset; border-radius: 80px; border: 1px #4876EF solid;
}
*/
.rec-56 {
  width: 90px;
  height: 28px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06) inset;
  border-radius: 80px;
  border: 1px #4876ef solid;
}
.msk-grp {
  width: 90px;
  height: 28px;
  left: 0px;
  top: 0px;
  position: absolute;
}
.rec-60 {
  width: 92px;
  height: 28px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06) inset;
  border-radius: 80px;
  border: 1px #4876ef solid;
}
.rec-57 {
  transition: 0.3s;
  width: 47.5px;
  height: 29px;
  top: 0px;
  position: absolute;
  background: linear-gradient(9deg, #4876ef 0%, #2156e1 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 80px;
}
#admin {
  left: 8px;
  top: 7px;
  position: absolute;
  text-align: center;
  font-size: 10.5px;
  font-weight: 500;
  word-wrap: break-word;
}
#lcms {
  left: 56px;
  top: 6px;
  position: absolute;
  text-align: center;
  font-size: 10.5px;
  font-weight: 500;
  word-wrap: break-word;
}
#lrs {
  left: 106px;
  top: 6px;
  position: absolute;
  text-align: center;
  font-size: 10.5px;
  font-weight: 500;
  word-wrap: break-word;
}
</style>
