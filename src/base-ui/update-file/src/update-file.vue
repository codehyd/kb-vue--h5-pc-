<template>
  <div class="update-file">
    <label for="updateFile">
      <input
        @change="handlerChange"
        id="updateFile"
        ref="updateFileRef"
        type="file"
        style="display: none"
      />
      <div
        class="updateFileWrap"
        @click.prevent="handlerClick"
        @click.right.stop="handlerRightClick"
      >
        <slot></slot>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    index: number;
  }>(),
  {}
);
const emit = defineEmits(["right-click", "click"]);

const updateFileRef = ref<HTMLInputElement>();

// 右键点击事件 因为右键点击事件不能被阻止，所以需要在点击事件中触发
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
const handlerChange = (e: Event) => {
  const event: HTMLInputEvent = e as HTMLInputEvent;
  const files = event.target.files;
  emit("right-click", files, props.index);
};

const handlerClick = () => {
  emit("click");
};

const handlerRightClick = () => {
  window.event!.returnValue = false;
  updateFileRef.value?.click();
};
</script>

<style scoped>
.update-file {
  display: inline-block;
}
.updateFileWrap {
  margin: 0 10px 0 0;
}
</style>
