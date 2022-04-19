<template>
  <div class="set-wrap">
    <template v-for="item in list" ::key="item">
      <h1>{{ item }}</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
const list = ref<number[]>([]);

// 两秒内list是一个数组 1-50
setTimeout(() => {
  list.value = [...Array(50).keys()].map((item) => item + 1);
  console.log(121);
}, 2000);
</script>

<style scoped></style>
