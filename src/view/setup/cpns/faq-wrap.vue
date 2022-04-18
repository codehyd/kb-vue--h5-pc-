<template>
  <div class="set-wrap">
    <template v-for="item in 50" ::key="item">
      <h2>{{ item }}</h2>
    </template>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
