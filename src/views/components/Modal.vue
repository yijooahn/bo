<template>
  <teleport to="body">
    <div class="backdrop" v-if="isVisible">
      <div class="modal-container">
        <div class="header">
          <slot name="header">&emsp;마스킹 해제</slot>
        </div>
        <div class="contents">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Modal",
  setup() {
    const isVisible = ref(false);

    // 부모 컴포넌트에서 접근하기 위한 함수를 선언합니다.
    const open = () => {
      isVisible.value = true;
    };

    const close = () => {
      isVisible.value = false;
    };

    // setup 함수에서 리턴해주어야, 부모 컴포넌트에서 접근이 가능합니다.
    return {
      isVisible,
      open,
      close,
    };
  },
};
</script>

<style scoped>
.backdrop {
  z-index: 999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
}
.modal-container {
  max-width: 95%;
  max-height: 95%;
  width: 400px;
  height: 250px;
  flex-shrink: 0;
  position: absolute;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 10px 16px 0px rgba(0, 0, 0, 0.08);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline;
}
.header {
  width: 100%;
  height: 100%;
  max-height: 50px;
  flex-shrink: 0;
  background: var(--black, #373f57);
  color: #fff;
  font-family: SpoqaHanSansNeo;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
}
.close-btn {
  cursor: pointer;
}
.contents {
  display: grid;
  justify-content: center;
  align-items: center;
  max-height: 80%;
  height: 100%;
  color: var(--black, #373f57);
  overflow: auto;
  text-align: center;
  font-size: small;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.4px;
  margin: 0 auto;
  vertical-align: middle;
  width: 100%;
}
.pop-title {
  padding: 1rem;
}
</style>