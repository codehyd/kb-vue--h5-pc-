<template>
  <div class="edit-table-option">
    <div class="select">表格基本操作</div>
    <!-- 添加新行 -->
    <el-button @click="handleAddNewRows">添加新行</el-button>
    <!-- 删除选中 -->
    <el-button @click="handleRemoveSelect">删除选中</el-button>
    <!-- 删除全部 -->
    <el-button @click="handleRemoveAll">删除全部</el-button>

    <div class="select">单据操作</div>
    <!-- 添加商品 -->
    <el-button @click="handdleAddNewGoods">选择商品</el-button>
    <!-- 高级选项 -->
    <el-popover placement="bottom" :width="500" trigger="click">
      <template #reference>
        <el-button>
          高级选项<kb-icon flag="elIcon" name="SetUp"></kb-icon>
        </el-button>
      </template>
      <div>
        <span class="select">条码搜索</span>
        <el-input
          @keyup.enter.native="handlerEnter"
          placeholder="请输入条码"
          v-model="barcode"
        >
          <template #append>
            <kb-icon
              @click="handlerEnter"
              text="搜索"
              :size="14"
              flag="elIcon"
              name="search"
            ></kb-icon>
          </template>
        </el-input>
      </div>
    </el-popover>
    <el-button type="primary" @click="handleSaveBildClick">保存提交</el-button>

    <page-good-table
      v-model:show="showGoodPanel"
      @save-click="handleSaveClick"
      ref="pageGoodTableRef"
    ></page-good-table>
  </div>
</template>

<script setup lang="ts">
import { PageGoodTable } from "@/components/page-table";
import { httpGetGoodsInfoByBarcode } from "@/service/http/home/commit";
import KbIcon from "@/base-ui/icon";
import message from "@/utils/message";
import mitter from "@/mitt";

const emit = defineEmits(["add-new-goods", "save-bild"]);

const pageGoodTableRef = ref<InstanceType<typeof PageGoodTable>>();

const barcode = ref("");

// 新增
const showGoodPanel = ref(false);
const handdleAddNewGoods = () => {
  showGoodPanel.value = true;
};

const handlerEnter = async () => {
  // 先判断是否为空
  if (!barcode.value) {
    return message.show("请输入条码");
  }
  const res = await httpGetGoodsInfoByBarcode(barcode.value);
  if (res?.data?.[0]?.data?.length) {
    emit("add-new-goods", { ...res.data[0].data[0], fqty: 1, checked: true });
  }
  barcode.value = "";
  message.show(res.msg, res.type);
};

const handleSaveClick = (row: any) => {
  emit("add-new-goods", row);
};

const handleAddNewRows = () => {
  mitter.emit("base-table-add-new-rows");
};

const handleRemoveSelect = () => {
  mitter.emit("base-table-remove-select-rows");
};

const handleRemoveAll = () => {
  mitter.emit("base-table-remove-all-rows");
};
const handleSaveBildClick = () => {
  emit("save-bild");
};
</script>

<style lang="less" scoped>
// 媒体查询低于700
.el-button {
  margin: 0 10px 10px 0;
  // margin-right: 10px;
}
</style>
