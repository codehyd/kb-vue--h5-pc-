<template>
  <div class="good-detail">
    <kb-dialog :width="70" title="添加商品信息" :top="4" v-model:show="show">
      <el-image
        style="width: 100px; height: 100px"
        :src="modelValue.furl"
        :preview-src-list="[modelValue.furl]"
        fit="cover"
      />
      <div class="content">
        <div class="select">
          {{ modelValue.fcpxinghao }} {{ modelValue.fcpname }}
        </div>
        <div class="bianma">
          编码:
          <span> {{ modelValue.fbianma }} </span>
          <span class="notInfo" v-if="!modelValue.fbianma"> 暂无编码 </span>
        </div>
        <div class="tiaoma">
          <div>
            条码:
            <span>{{ modelValue.ftiaoma }}</span>
            <span class="notInfo" v-if="!modelValue.ftiaoma"> 暂无条码 </span>
          </div>
          <div v-if="modelValue.ftiaoma">
            <base-barcode :barcode="modelValue.ftiaoma"></base-barcode>
          </div>
        </div>
        <div class="size">
          规格:
          <span>{{ modelValue.fguige }}</span>
          <span class="notInfo" v-if="!modelValue.fguige">暂无规格</span>
        </div>
        <div class="store">
          <span style="margin: 0 10px 0 0">
            库存:{{ modelValue.fstockqty }}
          </span>
          <el-tag>{{ modelValue.funit }}</el-tag>
        </div>
        <div class="price">
          面价:
          <span class="priceText">¥{{ modelValue.fprice }}</span>
        </div>

        <div class="memo">
          备注:
          <span>{{ modelValue.fmemo }}</span>
          <span class="notInfo" v-if="!modelValue.fmemo">暂无备注</span>
        </div>

        <!-- 编辑区 -->
        <el-divider class="elDivider" content-position="left">
          编辑
        </el-divider>

        <div class="select">数量</div>
        <el-input-number
          @update:modelValue="handleValueChange($event, 'fqty')"
          v-model="modelValue.fqty"
          :min="1"
        />

        <div class="select">是否选择</div>
        <el-switch
          @update:modelValue="handleValueChange($event, 'checked')"
          v-model="modelValue.checked"
        />
      </div>
      <template #footer>
        <el-button @click="handleSaveClick">保存</el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
import BaseBarcode from "@/base-ui/barcode";

const props = withDefaults(
  defineProps<{
    modelValue: any;
  }>(),
  {}
);

const emit = defineEmits(["update:modelValue", "save-click"]);

const show = ref(false);

const handleValueChange = (val: any, key: string) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: val,
  });
};

const handleSaveClick = () => {
  emit("save-click", props.modelValue);
};

defineExpose({
  show,
});
</script>

<style scoped></style>
