<template>
  <div class="edit-table-option">
    <!-- <div class="select">表格基本操作</div> -->
    <!-- 添加新行 -->
    <el-tooltip effect="dark" content="添加新行" placement="top">
      <el-button icon="CirclePlus" @click="handleAddNewRows">新行</el-button>
    </el-tooltip>

    <!-- 删除选中 -->
    <!-- <el-tooltip effect="dark" content="删除选中的表格行" placement="top">
      <el-button icon="CloseBold" @click="handleRemoveSelect">删选</el-button>
    </el-tooltip> -->

    <!-- 删除全部 -->
    <el-tooltip effect="dark" content="删除全部数据" placement="top">
      <el-button icon="Failed" @click="handleRemoveAll">全删</el-button>
    </el-tooltip>
    <!-- 缓存操作 -->
    <el-tooltip
      effect="dark"
      content="缓存当前的数据 以便下次开单"
      placement="top"
    >
      <el-button icon="UploadFilled" @click="handleSaveData">缓存</el-button>
    </el-tooltip>

    <el-tooltip effect="dark" content="加载上次缓存的数据" placement="top">
      <el-button icon="List" @click="handleLoadData">加载</el-button>
    </el-tooltip>

    <!-- <div class="select">单据操作</div> -->
    <!-- 添加商品 -->
    <el-button type="primary" @click="handdleAddNewGoods">选择商品</el-button>
    <!-- 高级选项 -->
    <el-popover placement="top" :width="500" trigger="hover">
      <template #reference>
        <el-button type="primary"> 条码搜索 </el-button>
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
  "load-new-data",
  "remove-select-data",
  "remove-all-data",
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
  if (res.code < 1) {
    message.show(res.msg, res.type);
  }
};

const handleSaveClick = (row: any) => {
  // 删除row._X_ROW_KEY字段
  delete row._X_ROW_KEY;
  emit("add-new-goods", { ...row, fqty: 1, checked: true });
};

const handleAddNewRows = () => {
  emit("load-new-data");
  // mitter.emit("base-table-add-new-rows");
};

const handleRemoveSelect = () => {
  emit("remove-select-data");
  // mitter.emit("base-table-remove-select-rows");
};

const handleRemoveAll = () => {
  message.confirm("是否全部删除所有数据", () => {
    emit("remove-all-data");
  });
  //
  // mitter.emit("base-table-remove-all-rows");
};
const handleSaveBildClick = () => {
  emit("save-bild");
};
const handleLoadData = () => {
  const data = store.state.bild.bildData;
  if (data.length == 0) {
    return message.show("没有缓存数据");
  }
  message.confirm("是否加载上一次缓存的数据", () => {
    emit("reloadData", data);
  });

  // emit('add-new-goods', data);
};

const handleSaveData = () => {
  message.confirm("是否缓存当前所有数据,以便下一次开单使用", () => {
    emit("save-local-data");
  });
};

defineExpose({
  handleLoadData,
});
</script>

<style lang="less" scoped>
// 媒体查询低于700
.el-button {
  margin: 0 10px 10px 0;
  // margin-right: 10px;
}
</style>
