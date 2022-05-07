<template>
  <div class="check-info">
    <el-row class="elRow" :gutter="20">
      <el-col v-bind="colLayout">
        <div class="card item">
          <kb-icon name="icon-qichuqiankuanguanli" :size="50"></kb-icon>
          <div class="content">
            <span class="price">¥{{ formatPrice(data.qichuamount) }}</span>
            <span>期初欠款</span>
          </div>
        </div>
      </el-col>
      <el-col v-bind="colLayout">
        <div class="card item">
          <kb-icon name="icon-shoukuan" :size="50"></kb-icon>
          <div class="content">
            <span class="price">¥{{ formatPrice(data.qijianshoukuan) }}</span>
            <span>期间收款</span>
          </div>
        </div>
      </el-col>
      <el-col v-bind="colLayout">
        <div class="card item">
          <kb-icon name="icon-huokuan_" :size="50"></kb-icon>
          <div class="content">
            <span class="price">¥{{ formatPrice(data.qijianhuokuan) }}</span>
            <span>期间货款</span>
          </div>
        </div>
      </el-col>
      <el-col v-bind="colLayout">
        <div class="card item">
          <kb-icon name="icon-wanglaidanweiqiankuanbiao" :size="50"></kb-icon>
          <div class="content">
            <span class="price">¥{{ formatPrice(data.qimoamount) }}</span>
            <span>期末欠款</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <page-table
      @page-change="handlePageChange"
      :tableConfig="tableConfig"
    ></page-table>

    <page-bild-detail-table
      ref="pageBildDetailTableRef"
      :tableConfig="detailTableConfig"
      :clientConfig="clientConfig"
    ></page-bild-detail-table>
  </div>
</template>

<script setup lang="ts">
import format from "@/utils/format";
import KbIcon from "@/base-ui/icon";
import PageTable, { PageBildDetailTable } from "@/components/page-table";

import {
  httpGetSaleCheckData,
  httpGetShowTableColumn,
} from "@/service/http/home/commit";

const props = withDefaults(
  defineProps<{
    data?: any;
    page: number;
  }>(),
  {
    data: () => {
      return {};
    },
  }
);

const colLayout = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
};

const emit = defineEmits(["update:page", "page-change"]);

const formatPrice = (price?: number) => {
  if (!price) return 0.0;
  return format.formatMoney(price * 100);
};

const column = ref([]);
const tableConfig = computed(() => {
  const res = props.data;
  return {
    keyString: "",
    column: column.value ?? [],
    data: res?.data?.[0]?.data ?? [],
    loading: true,
    isShowPage: true,
    totalPage: res?.data?.[0]?.data?.[0].allpages ?? 1,
    page: props.page,
  };
});

const detailTableConfig = computed(() => {
  return {
    keyString: "",
  };
});

const clientConfig = computed(() => {
  return [];
});

httpGetShowTableColumn(1001).then((res) => {
  column.value = res?.data?.[0]?.data ?? [];
});

const handlePageChange = (val: number) => {
  emit("update:page", val);
};
</script>

<style scoped>
.check-info {
  margin: 20px 0;
}
.elRow {
  margin: 20px 0;
}
.icon {
  display: flex;
  align-items: center;
}
.item {
  display: flex;
}
.price {
  color: red;
  font-size: 20px;
}
.content {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 600;
}
/* 媒体查询 */
</style>
