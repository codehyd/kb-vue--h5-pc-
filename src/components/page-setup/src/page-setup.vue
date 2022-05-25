<template>
  <div class="page-setup" @click="visible = !visible">
    <el-popover
      v-model:visible="visible"
      placement="top"
      :width="100"
      trigger="hover"
    >
      <template #reference>
        <el-icon ref="iconRef">
          <SetUp></SetUp>
        </el-icon>
      </template>
      <div class="content">
        <div class="item" @click="handlePackUp">
          <el-icon>
            <component :is="isFold ? 'Fold' : 'Expand'"></component>
          </el-icon>
          <span>{{ isFold ? "折叠" : "展开" }}</span>
        </div>
        <div class="item" @click="handleSetupClick">
          <el-icon>
            <component is="Setting"></component>
          </el-icon>
          <span>设置</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";

const props = withDefaults(
  defineProps<{
    isFold: boolean;
  }>(),
  {}
);
const emit = defineEmits(["update:isFold"]);

const iconRef = ref<InstanceType<typeof ElIcon>>();

const visible = ref(false);
const packUp = ref(false);
const handlePackUp = () => {
  emit("update:isFold", !props.isFold);
};

const router = useRouter();
const handleSetupClick = () => {
  router.push("/setup");
};
</script>

<style lang="less" scoped>
.page-setup {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 50px;
  right: 00px;
  width: 35px;
  height: 40px;
  background-color: white;
  border-radius: 50% 0 0 50%;

  box-shadow: 2px 0 8px #00000026;
  z-index: 100;
  cursor: pointer;
}

.content {
  display: flex;
  // justify-content: space-between;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 0 5px;
}
</style>
