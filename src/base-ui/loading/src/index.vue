<template>
  <div v-elLoading class="loading">
    <div class="mask-bg"></div>
    <div v-if="name == 'line-scale'" class="loader-inner line-scale">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else-if="name == 'pacman'" class="loader-inner pacman">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: "line-scale" | "pacman";
  }>(),
  {
    name: "line-scale",
  }
);
</script>

<style scoped>
.loading,
.mask-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loading {
  z-index: 999;
}
.mask-bg {
  background-color: #cccccc;
  opacity: 0.5;
}

.loader-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

@-webkit-keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }
  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}
@keyframes line-scale {
  0% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  50% {
    -webkit-transform: scaley(0.4);
    transform: scaley(0.4);
  }
  100% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
}

.line-scale > div:nth-child(1) {
  -webkit-animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(2) {
  -webkit-animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(3) {
  -webkit-animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(4) {
  -webkit-animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div:nth-child(5) {
  -webkit-animation: line-scale 1s 0s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation: line-scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
}

.line-scale > div {
  background-color: #56a5f7;
  width: 4px;
  height: 28px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
</style>
