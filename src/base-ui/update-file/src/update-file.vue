<template>
  <div class="update-file">
    <label for="update">
      <input
        @change="handleChange"
        type="file"
        id="update"
        ref="updateFileRef"
      />
    </label>
    <div @click="handleClickFile">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    updateBefore?: (callback?: any) => void;
  }>(),
  {}
);
const emit = defineEmits(["update"]);
const updateFileRef = ref<HTMLInputElement>();

const handleClickFile = () => {
  if (props.updateBefore) {
    props.updateBefore && props.updateBefore(updateFile);
  } else {
    updateFile();
  }
};

const handleChange = (e: Event) => {
  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  const event: HTMLInputEvent = e as HTMLInputEvent;
  const files = event.target.files;
  emit("update", files);
};

function updateFile() {
  updateFileRef.value?.click();
}
</script>

<style scoped>
.update-file {
  display: inline-block;
}
#update {
  display: none;
}
</style>
