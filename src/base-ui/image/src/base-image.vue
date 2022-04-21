<template>
  <div class="base-image">
    <div class="image-wrap">
      <template v-for="(item, index) in urls" :key="index">
        <div class="image-item" :style="imageStyle">
          <div class="mask">
            <!-- 预览 -->
            <kb-icon
              @click="handlePreImage(item, index)"
              name="search"
              flag="elIcon"
              color="white"
            ></kb-icon>
            <!-- 编辑 -->
            <label for="updateFile">
              <input
                @change="handlerChange"
                id="updateFile"
                ref="updateFileRef"
                type="file"
                style="display: none"
              />
              <kb-icon
                @click="handleEditImage(index)"
                name="edit"
                flag="elIcon"
                color="white"
              ></kb-icon>
            </label>
          </div>

          <img class="image" :src="item" />
        </div>
      </template>
    </div>

    <div v-if="isShowPrePanel" @click="isShowPrePanel = false" class="pre-wrap">
      <div class="markIcon close">
        <kb-icon
          @click="handleClose"
          name="close"
          flag="elIcon"
          color="white"
          :size="25"
        ></kb-icon>
      </div>
      <div class="markIcon left">
        <kb-icon
          @click="handleTogglePreImage(-1)"
          name="ArrowLeft"
          flag="elIcon"
          color="white"
          :size="25"
        ></kb-icon>
      </div>
      <div class="markIcon right">
        <kb-icon
          @click="handleTogglePreImage(+1)"
          name="ArrowRight"
          flag="elIcon"
          color="white"
          :size="25"
        ></kb-icon>
      </div>
      <div class="pre-image-wrap">
        <img class="pre-image" :src="currentPreImage" :style="preImageStyle" />
      </div>

      <div class="actionBar">
        <kb-icon
          @click="handleBlowUp"
          name="icon-fangda"
          color="white"
          :size="25"
        ></kb-icon>
        <kb-icon
          @click="handleBlowDown"
          name="icon-suoxiao"
          color="white"
          :size="25"
        ></kb-icon>
        <kb-icon
          @click="handleRestore"
          name="icon-huanyuanhuabu"
          color="white"
          :size="25"
        ></kb-icon>
        <kb-icon
          @click="handleRotate(-90)"
          name="icon-nishizhenxuanzhuan"
          color="white"
          :size="25"
        ></kb-icon>
        <kb-icon
          @click="handleRotate(90)"
          name="icon-shunshizhenxuanzhuan"
          color="white"
          :size="25"
        ></kb-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KbIcon from "@/base-ui/icon";
const props = withDefaults(
  defineProps<{
    urls: string[];
    width?: number;
    height?: number;
  }>(),
  {
    width: 100,
    height: 100,
  }
);

const emit = defineEmits(["update-file"]);

const imageStyle = computed(() => {
  return {
    width: props.width + "px",
    height: props.height + "px",
  };
});

const isShowPrePanel = ref(false);
const currentPreImage = ref<string>("");
const currentImageIndex = ref<number>(0);

const handlePreImage = (image: string, index: number) => {
  currentPreImage.value = image;
  currentImageIndex.value = index;
  isShowPrePanel.value = true;
};

const handleClose = () => {
  isShowPrePanel.value = false;
};

const handleTogglePreImage = (number: number) => {
  const totalUrls = [...props.urls];
  // 预览图片的下标
  const index = currentImageIndex.value + number;
  if (index < 0) {
    currentImageIndex.value = totalUrls.length - 1;
  } else if (index >= totalUrls.length) {
    currentImageIndex.value = 0;
  } else {
    currentImageIndex.value = index;
  }
  currentPreImage.value = totalUrls[currentImageIndex.value];
};

const scale = ref(1);
const rotate = ref(0);
const preImageStyle = computed(() => {
  return {
    transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
    "transform-origin": "50% 50%",
  };
});

const handleBlowUp = () => {
  scale.value += 0.4;
};
const handleBlowDown = () => {
  scale.value -= 0.4;
};
const handleRestore = () => {
  scale.value = 1;
  rotate.value = 0;
};
const handleRotate = (deg: number) => {
  rotate.value += deg;
};

const updateFileRef = ref<HTMLInputElement>();

// 右键点击事件 因为右键点击事件不能被阻止，所以需要在点击事件中触发
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const currentEditImageIndex = ref(0);
const handleEditImage = (index: number) => {
  currentEditImageIndex.value = index;
};
const handlerChange = (e: Event) => {
  const event: HTMLInputEvent = e as HTMLInputEvent;
  const files = event.target.files;
  emit("update-file", files, currentEditImageIndex.value);
};

// const handleMaskClick = (index: number) => {
//   console.log(index);
// };
</script>

<style lang="less" scoped>
.base-image {
  .image-wrap {
    display: flex;
    .image-item {
      position: relative;
      cursor: pointer;
      margin: 0 10px 0 0;

      &:hover {
        .mask {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          background-color: #00000070;
        }
      }

      .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .image {
        border: 1px dashed #d3d4d6;
        width: 100%;
        height: 100%;
      }
    }
  }

  .pre-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 999;

    .markIcon {
      position: absolute;
      background-color: #67686c;
      display: flex;
      padding: 10px;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &.close {
        top: 30px;
        right: 30px;
      }
      &.left {
        top: 50%;
        left: 30px;
        transform: translateY(-50);
      }
      &.right {
        top: 50%;
        transform: translateY(-50);
        right: 30px;
      }
    }
    .pre-image-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .pre-image {
      transition: all 0.3s ease 0s;
    }

    .actionBar {
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      background-color: #67686c;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-radius: 30px;
      width: 300px;
    }
  }
}

.update-file {
  display: inline-block;
}
</style>
