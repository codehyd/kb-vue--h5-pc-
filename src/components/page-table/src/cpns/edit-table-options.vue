<template>
  <div class="edit-table-option card">
    <!-- 添加商品 -->
    <el-button @click="handdleAddNewGoods">添加商品</el-button>

    <!-- 添加新行 -->
    <el-button>添加新行</el-button>

    <!-- 删除选中 -->
    <el-button>删除选中</el-button>

    <!-- 全选 -->
    <el-button>全部选中</el-button>

    <!-- 反选  -->
    <el-button>全部反选</el-button>

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

const emit = defineEmits(["add-new-goods"]);

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
  message.show(res.msg, res.type);
};

const handleSaveClick = (row: any) => {
  emit("add-new-goods", row);
};
</script>

<style lang="less" scoped>
.edit-table-option {
  padding: 10px;
  margin: 10px 0;
}

// 媒体查询低于700
.el-button {
  margin: 0 10px 10px 0;
  // margin-right: 10px;
}
</style>
