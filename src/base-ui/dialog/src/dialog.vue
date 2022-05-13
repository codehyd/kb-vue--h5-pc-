<template>
  <div>
    <el-dialog
      @close="handleClose"
      :before-close="handleBeforeClose"
      custom-class="elDialog"
      :append-to-body="appendToBody"
      :draggable="draggable"
      v-model="isShowPanel"
      :destroy-on-close="destroyOnClose"
      :width="width + 'vw'"
      :top="top + 'vh'"
      :fullscreen="fullscreen"
      :show-close="false"
      @opened="openedFn"
    >
      <template #title>
        <div class="title">
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
          <span class="icons">
            <kb-icon
              v-if="isFullscreenIcon"
              @click="handleFullscreenClick"
              style="margin-right: 5px"
              :name="fullscreen ? 'icon-tuichuquanping' : 'icon-quanping'"
              :size="14"
            ></kb-icon>
            <kb-icon
              @click="handleCloseClick"
              name="close"
              flag="elIcon"
            ></kb-icon>
          </span>
        </div>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script name="KbDialog" setup lang="ts">
import KbIcon from "@/base-ui/icon";
const props = withDefaults(
  defineProps<{
    show: boolean;
    title?: string;
    width?: number;
    top?: number;
    appendToBody?: boolean;
    draggable?: boolean;
    destroyOnClose?: boolean;
    isBeforeClose?: boolean;
    isFullscreenIcon?: boolean;
    openedFn?: () => void;
  }>(),
  {
    title: "",
    width: 80,
    top: 15,
    appendToBody: false,
    draggable: false,
    destroyOnClose: true,
    isBeforeClose: false,
    isFullscreenIcon: true,
    openedFn: undefined,
  }
);

const emit = defineEmits(["update:show", "close", "beforeClose"]);

const isShowPanel = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

const handleClose = () => {
  emit("close");
};

const handleBeforeClose = (done: any) => {
  if (props.isBeforeClose) {
    return emit("beforeClose", done);
  }
  done && done();
};

const fullscreen = ref(false);
// 全屏
const handleFullscreenClick = () => {
  fullscreen.value = !fullscreen.value;
};
const handleCloseClick = () => {
  emit("update:show", false);
};

const openedFn = () => {
  props.openedFn && props.openedFn();
};
</script>

<style lang="less" scoped>
&:deep(.el-dialog .el-dialog__body) {
  padding: 10px 20px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icons {
    display: flex;
    align-items: center;
  }
}
</style>
