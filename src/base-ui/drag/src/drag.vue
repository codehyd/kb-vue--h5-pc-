<template>
  <div
    class="drag"
    :style="{ top: top + 'px', left: left + 'px' }"
    ref="dragRef"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import usemove from "./hooks/usemove";

const props = withDefaults(
  defineProps<{
    absolute?: boolean;
    top?: number;
    left?: number;
    zIndex?: number;
    x?: boolean;
    y?: boolean;
    clickFn?: (() => void) | null;
  }>(),
  {
    absolute: true,
    top: 0,
    left: 0,
    zIndex: 10,
    x: false,
    y: false,
    clickFn: null,
  }
);

const dragRef = ref<HTMLElement>();
onMounted(() => {
  const elDrag = dragRef.value;
  if (elDrag) {
    elDragBeforeCallback && elDragBeforeCallback(elDrag);
    const { x, y } = props;
    const clickFn = props.clickFn;
    usemove(elDrag, x, y, clickFn);
  }
});

function elDragBeforeCallback(el: HTMLElement) {
  const absolute = props.absolute;
  if (absolute) {
    const parent = el.parentElement as HTMLElement;
    parent.style.position = "relative";
    el.style.position = "absolute";
    // el.style.top = props.top + "px";
    // el.style.left = props.left + "px";
    el.style.zIndex = props.zIndex + "";
    // el.style.transition = "all 0.1s";
  }
}
</script>

<style scoped>
/* .drag {
  transform: all 0.3s;
} */
</style>
