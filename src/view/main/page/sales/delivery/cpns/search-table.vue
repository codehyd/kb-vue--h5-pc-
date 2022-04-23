<template>
  <div class="search-table">
    <page-bild-table
      :tableConfig="tableConfig"
      :tableActiveConfig="tableActiveConfig"
      :bildType="requestData.billtypeid"
      @on-active-detail="handleActiveDetail"
      @on-menu-detail="handleMenuDetail"
    ></page-bild-table>

    <page-bild-detail-table
      title="销售送货单详情"
      :tableConfig="detailTableConfig"
      :detailOption="detailTableActiveConfig"
      :clientConfig="clientConfig"
      @update-file-success="updateFileSuccess"
      @update-message-success="updateMessageSuccess"
      ref="pageBildDetailTableRef"
    >
      <template #right="{ data }">
        <el-tag :type="currentStatus(data.fbillstatus)">
          {{ data.fbillstatus }}
        </el-tag>
        <el-divider direction="vertical" />
        <el-tag :type="currentFlag(data.fshflag)">
          {{ data.fshflag }}
        </el-tag>
      </template>
    </page-bild-detail-table>

    <!-- <page-edit-table
      ref="pageEditTableRef"
      title="销售送货单新增编辑"
      :tableConfig="editTableConfig"
    ></page-edit-table> -->
  </div>
</template>

<script setup lang="ts">
import {
  PageBildTable,
  PageBildDetailTable,
  // PageEditTable,
} from "@/components/page-table";
import type {
  IDetailTableConfig,
  IEditTableConfig,
} from "@/components/page-table";
import { ITableConfigType } from "@/base-ui/table";

import {
  tableActiveConfig,
  detailTableActiveConfig,
  clientConfig,
  tableMenusConfig,
} from "../config/page-table-config";

// 网络请求
import type { ITableType } from "@/service/http/home/sales/delivery";
import {
  httpGetSalesDeliveryHeaderList,
  httpGetSalesDeliveryTableList,
  httpGetSalesDeliveryDetailHeaderList,
} from "@/service/http/home/sales/delivery";
import {
  httpGetDetailBild,
  httpGetEditTableColumn,
} from "@/service/http/home/commit";

const props = withDefaults(
  defineProps<{
    requestData: ITableType;
  }>(),
  {}
);

const pageBildDetailTableRef = ref<InstanceType<typeof PageBildDetailTable>>();
// const pageEditTableRef = ref<InstanceType<typeof PageEditTable>>();

const tableConfig: ITableConfigType = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  menuConfig: tableMenusConfig,
});

const detailTableConfig: IDetailTableConfig = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  messages: [],
  images: [],
  showAction: false,
  state: "detail",
});

const editTableConfig: IEditTableConfig = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  messages: [],
  images: [],
  showAction: false,
  state: "edit",
});

// 请求表格头部数据
const requestHeader = async () => {
  const tableHeaderData = await httpGetSalesDeliveryHeaderList();
  tableConfig.column = tableHeaderData?.data?.[0]?.data ?? [];
  requestTable();
};

const requestDetailHeader = async () => {
  const res = await httpGetSalesDeliveryDetailHeaderList();
  return res?.data?.[0]?.data ?? [];
};

// 请求表格数据
const requestTable = async () => {
  const tableData = await httpGetSalesDeliveryTableList(props.requestData);
  console.log(tableData);
  tableConfig.data = tableData?.data?.[0]?.data ?? [];
};

// 点击操作面板详情
const handleActiveDetail = async (params: any) => {
  const { row } = params;
  const res = await httpGetDetailBild({
    billid: row.finterid,
    billtypeid: row.ftype,
  });
  if (res.code >= 1) {
    openBildDetailPanel(res);
  }
};

// 点击菜单面板详情
const handleMenuDetail = async (params: any) => {
  openBildDetailPanel(params);
};

async function openBildDetailPanel(params: any) {
  const pageBildDetailTable = pageBildDetailTableRef.value;
  if (pageBildDetailTable) {
    detailTableConfig.column = await requestDetailHeader();
    detailTableConfig.data = params?.data?.[0]?.data ?? [];
    detailTableConfig.messages = params.message?.[0]?.data ?? [];
    detailTableConfig.images = params.atturlarray ?? [];
    pageBildDetailTable.show = true;
  }
}

// 更新附件
const updateFileSuccess = (images: string[]) => {
  detailTableConfig.images = images;
};
const updateMessageSuccess = (message: any) => {
  detailTableConfig.messages = message;
};

const currentStatus = (str: string) => {
  // 如果是未审核，则显示红色 | 否则绿色
  return str === "未审核" ? "danger" : "success";
};

const currentFlag = (str: string) => {
  // 如果是未打印，则显示灰色 | 否则蓝色
  return str === "未打印" ? "info" : "";
};

// const handleShowEditPanel = async () => {
//   // 1. 获取表格列表的头部数据
//   const res = await httpGetEditTableColumn(103);
//   editTableConfig.column = res.code >= 1 ? res.data?.[0]?.data ?? [] : [];
//   const pageEditTable = pageEditTableRef.value;
//   if (pageEditTable) {
//     pageEditTable.show = true;
//   }
// };

requestHeader();
</script>

<style lang="less" scoped>
.tableHeader {
  display: flex;
  justify-content: flex-end;
}
.active {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
