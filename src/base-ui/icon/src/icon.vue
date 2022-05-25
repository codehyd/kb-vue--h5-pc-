<template>
  <span class="icon" @click="handleIconClick">
    <!-- ui图标库 -->
    <template v-if="flag == 'elIcon'">
      <!-- el-icon  图标 -->
      <el-icon v-if="type == 'icon'" :color="color" :size="size">
        <component :is="name"></component>
      </el-icon>
      <!-- el-button icon 图标 -->
      <el-button
        v-else-if="type == 'button'"
        circle
        :type="buttonType"
        :icon="name"
        style="margin: 0 5px 0 0"
      />
    </template>
    <!-- 字体图标 -->
    <template v-else>
      <i :class="name" :style="{ 'font-size': size + 'px', color: color }"></i>
    </template>
    <span :style="{ 'font-size': size + 'px', color: color }">
      <slot name="text">{{ text }}</slot>
    </span>
  </span>
</template>

<script name="KbIcon" setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    text?: string;
    size?: number;
    flag?: "elIcon" | "icon";
    type?: "icon" | "button";
    buttonType?: "primary" | "success" | "warning" | "danger" | "info" | "";
    color?: string;
  }>(),
  {
    size: 16,
    text: "",
    boolean: false,
    flag: "icon",
    type: "icon",
    buttonType: "",
    color: "inherit",
  }
);

const emit = defineEmits(["click"]);

const handleIconClick = (e: Event) => {
  emit("click");
};
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
