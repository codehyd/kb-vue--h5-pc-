<template>
  <div class="edit-table-option">
    <div class="select">表格基本操作</div>
    <!-- 添加新行 -->
    <el-button @click="handleAddNewRows">添加新行</el-button>
    <!-- 删除选中 -->
    <el-button @click="handleRemoveSelect">删除选中</el-button>
    <!-- 删除全部 -->
    <el-button @click="handleRemoveAll">删除全部</el-button>
    <!-- 缓存操作 -->
    <el-button @click="handleSaveData">缓存当前数据</el-button>
    <el-button @click="handleLoadData">加载缓存数据</el-button>

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
import { useStore } from "@/store";

const emit = defineEmits([
  "add-new-goods",
  "save-bild",
  "reloadData",
  "save-local-data",
]);

const store = useStore();

const pageGoodTableRef = ref<InstanceType<typeof PageGoodTable>>();

const barcode = ref("");

// 新增
const handdleAddNewGoods = () => {
  const pageGoodTable = pageGoodTableRef.value;
  if (pageGoodTable) {
    pageGoodTable.show = true;
  }
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
const handleLoadData = () => {
  const data = store.state.bild.bildData;
  if (data.length == 0) {
    return message.show("没有缓存数据");
  }
  emit("reloadData", data);

  // emit('add-new-goods', data);
};

const handleSaveData = () => {
  emit("save-local-data");
};
</script>

<style lang="less" scoped>
// 媒体查询低于700
.el-button {
  margin: 0 10px 10px 0;
  // margin-right: 10px;
}
</style>
