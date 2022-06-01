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

    <div class="card">
      <!-- <div class="options">
        <el-button disabled @click="handleBtnFlagClick('share')">
          分享
        </el-button>
        <el-button @click="handleBtnFlagClick('printpng')">预览png</el-button>
        <el-button @click="handleBtnFlagClick('printpdf')">打印预览</el-button>
      </div> -->

      <page-table
        @db-click="handleDbClick"
        @page-change="handlePageChange"
        :tableConfig="tableConfig"
      >
        <template #fsalestyle="{ row, column }">
          <span :style="{ color: row.fsalestyle == '退货' ? 'red' : '' }">
            {{ row.fsalestyle }}
          </span>
        </template>
      </page-table>
    </div>

    <page-bild-detail-table
      ref="pageBildDetailTableRef"
      :tableConfig="detailTableConfig"
      :billtypeid="billtype"
    ></page-bild-detail-table>
  </div>
</template>

<script setup lang="ts">
import format from "@/utils/format";
import KbIcon from "@/base-ui/icon";
import PageTable, { IDetailTableConfig } from "@/components/page-table";
import PageBildDetailTable from "@/components/bild-query-content/src/cpns/detail-panel.vue";

import {
  httpGetShowTableColumn,
  httpGetEditTableColumn,
  httpGetDetailTableData,
  // httpGetSaleCheckPrint,
} from "@/service/http/home/commit";

import { detailTableConfig as detailTable103 } from "@/view/main/page/sales/delivery/config/bild-query-content";
import { detailTableConfig as detailTable105 } from "@/view/main/page/sales/refund/config/bild-query-content";
// import message from "@/utils/message";

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

const emit = defineEmits(["update:page", "page-change", "flag-click"]);

const pageBildDetailTableRef = ref<InstanceType<typeof PageBildDetailTable>>();

const formatPrice = (price?: number) => {
  if (!price) return 0.0;
  return format.formatMoney(price * 100);
};

const column = ref<any[]>([]);
const tableConfig = computed(() => {
  const res = props.data;
  return {
    keyString: "",
    column: column.value ?? [],
    data: res?.data?.[0]?.data ?? [],
    loading: true,
    isShowPage: true,
    totalPage: res?.data?.[0]?.data?.[0]?.allpages ?? 1,
    page: props.page,
    showAction: false,
  };
});

const detailTableConfig: IDetailTableConfig = reactive({
  keyString: "",
  showAction: false,
});

const billtype = ref();

httpGetShowTableColumn(1001).then((res) => {
  column.value = res?.data?.[0]?.data ?? [];
});

const handlePageChange = (val: number) => {
  emit("update:page", val);
};

const handleDbClick = (params: any) => {
  const { row } = params;
  console.log(row);
  getDetailTableData(row);
  pageBildDetailTableRef.value!.isShowPanel = true;
};

const getDetailTableData = (row: any) => {
  billtype.value = row.ftype;
  httpGetEditTableColumn(row.ftype).then((res) => {
    detailTableConfig.column = res?.data?.[0]?.data ?? [];
  });
  httpGetDetailTableData(row.ftype, {
    billtypeid: row.ftype,
    billid: row.finterid,
  }).then((res) => {
    detailTableConfig.data = res?.data?.[0]?.data ?? [];
    detailTableConfig.images = res?.atturlarray ?? [];
    detailTableConfig.messages = res?.message?.[0]?.data ?? [];
    // 单据状态
    detailTableConfig.status =
      row.ftype == 103 ? detailTable103.status : detailTable105.status;
    // 单据客户信息
    detailTableConfig.clientConfig =
      row.ftype == 103
        ? detailTable103.clientConfig
        : detailTable105.clientConfig;
  });
};

const handleBtnFlagClick = (type: any) => {
  emit("flag-click", type);
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
.options {
  margin: 0 0 10px 0;
  display: flex;
  justify-content: flex-end;
}
/* 媒体查询 */
</style>
