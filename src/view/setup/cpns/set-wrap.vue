<template>
  <div class="set-wrap">
    <template v-for="item in 50" ::key="item">
      <h1>{{ item }}</h1>
    </template>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
