<template>
  <!-- <div> -->
  <kb-dialog title="商品资料" v-model:show="show">
    <page-search
      :defaultValue="defaultData"
      ref="pageSearchRef"
      :searchFormConfig="plusFormConfig"
    ></page-search>
    <template v-if="images.length > 0">
      <el-divider content-position="left">商品图片</el-divider>
      <div class="imageWrap">
        <BaseImage @update-file="handleUpdateFile" :urls="images"></BaseImage>
      </div>
    </template>
    <template #footer>
      <el-button @click="handleSaveClick">保存提交</el-button>
    </template>
  </kb-dialog>
  <!-- </div> -->
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
import PageSearch from "@/components/page-search";
import editPanel from "../config/edit-panel";
import { httpAddGoods, httpUploadImage } from "@/service/http/home/data";
import message from "@/utils/message";
import BaseImage from "@/base-ui/image";
const { plusFormConfig } = editPanel();

const props = withDefaults(
  defineProps<{
    images: string[];
  }>(),
  {}
);

const emit = defineEmits(["save-success", "update:images"]);
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const show = ref(false);

let id = ref(0);
const handleSaveClick = async () => {
  const formData = await pageSearchRef.value!.getFormData();
  httpAddGoods({ id: id.value, content: formData }).then((res) => {
    message.show(res.msg, res.type);
    if (res.code >= 1) {
      if (id.value == 0) {
        emit("save-success", res);
      }
      show.value = false;
    }
  });
};

// const images = ref([]);

const defaultData = ref({});

const handleUpdateFile = (file: any, index: number) => {
  // 添加formdata
  const formData = new FormData();
  formData.append("file", file[0]);
  httpUploadImage(formData, { id: id.value, fileindex: index + 1 }).then(
    (res) => {
      if (res.code >= 1) {
        emit("update:images", res.atturlarray);
      }
      message.show(res.msg, res.type);
    }
  );
};

defineExpose({
  id,
  show,
  defaultData,
  // images,
});
</script>

<style scoped></style>
