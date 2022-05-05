<template>
  <div class="top-tip-content" ref="contentRef">
    <el-tooltip
      :disabled="!isShowTip"
      class="box-item"
      effect="dark"
      :content="title"
      placement="top"
    >
      <span>{{ title }}</span>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const contentRef: any = ref("");

    const isShowTip = ref(false);
    onMounted(() => {
      const content = contentRef.value;

      // 监听窗口大小
      window.addEventListener("resize", () => {
        const contentWidth = content?.clientWidth ?? 0;
        const textWidth = content.children[0].offsetWidth;
        isShowTip.value = textWidth > contentWidth ? true : false;
      });
    });
    return {
      contentRef,
      isShowTip,
    };
  },
});
</script>

<style scoped lang="less">
.top-tip-content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
