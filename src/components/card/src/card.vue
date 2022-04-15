<template>
  <el-card ref="elCardRef" class="box-card">
    <template #header>
      <div class="select" style="--selectBg: #0094ff">
        <!-- 如果props中没有title，则会使用slot中的内容 -->
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
    </template>
    <div class="body" :style="bodyStyle">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard } from "element-plus";
const props = withDefaults(
  defineProps<{
    title?: string;
    height?: "auto" | number;
  }>(),
  {
    title: "Title",
    height: "auto",
  }
);

const elCardRef = ref<InstanceType<typeof ElCard>>();
const headerHeight = ref(0);

onMounted(() => {
  // 获取el-card实例 并且拿到el-card的header的高度
  const elCard = elCardRef.value;
  nextTick(() => {
    headerHeight.value = elCard?.$el?.children[0].clientHeight;
  });
});

const bodyStyle = computed(() => {
  let height =
    props.height == "auto" ? "auto" : props.height - headerHeight.value;

  return { height: height + "px" };
});
</script>

<style lang="less" scoped>
.box-card {
  height: 100%;
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
  &:deep(.el-card__body) {
    padding: 0px !important;
  }
}

.card-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding-left: 13px;
  &::before {
    content: "";
    background-color: #3796ec;
    width: 4px;
    height: 14px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -8px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
}
.body {
  padding: 10px;
  box-sizing: border-box;
}
</style>
