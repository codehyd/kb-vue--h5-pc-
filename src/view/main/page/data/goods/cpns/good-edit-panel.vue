<template>
  <div>
    <kb-dialog title="商品资料" v-model:show="show">
      <page-search
        :defaultValue="defaultData"
        ref="pageSearchRef"
        :searchFormConfig="plusFormConfig"
      ></page-search>
      <template #footer>
        <el-button @click="handleSaveClick">保存提交</el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
import PageSearch from "@/components/page-search";
import editPanel from "../config/edit-panel";
import { httpAddGoods } from "@/service/http/home/data";
import message from "@/utils/message";
const { plusFormConfig } = editPanel();

const emit = defineEmits(["save-success"]);
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const show = ref(false);

let id = ref(0);
const handleSaveClick = async () => {
  const formData = await pageSearchRef.value!.getFormData();
  console.log(id);
  httpAddGoods({ id: id.value, content: formData }).then((res) => {
    message.show(res.msg, res.type);
    if (res.code >= 1) {
      emit("save-success", res);
      show.value = false;
    }
  });
};
const defaultData = ref({});

defineExpose({
  id,
  show,
  defaultData,
});
</script>

<style scoped></style>
