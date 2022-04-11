<template>
  <span class="icon" @click="handleIconClick">
    <i :class="name" :style="{ 'font-size': size + 'px' }"></i>
  </span>
</template>

<script name="KbIcon" setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 16,
    boolean: false,
  }
);

const emit = defineEmits(["click"]);

const handleIconClick = () => {
  emit("click");
};
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
}
</style>
