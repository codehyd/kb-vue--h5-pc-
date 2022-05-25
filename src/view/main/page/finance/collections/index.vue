<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      @query-click="handleQueryClick"
      isShowQuery
      :searchFormConfig="searchConfig"
    ></page-search>

    <div class="card">
      <div class="options">
        <el-button @click="handleNewClick">新增收款单</el-button>
      </div>
      <page-table
        @page-change="handlePageChange"
        :billtypeid="104"
        :tableConfig="pageTableConfig"
      ></page-table>
    </div>

    <kb-dialog v-model:show="isShowPanel" title="新增销售收款单">
      <page-search
        ref="pageSearchRef"
        :searchFormConfig="bildFormConfig"
        :defaultValue="defaultValue"
        @select-client="handleSelectClient"
        @change-data="handleChangeData"
      ></page-search>
      <template #footer>
        <el-button @click="handleNewPanelQueryClick">保存提交</el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import { searchConfig, requestData } from "./config/search-config";
import PageTable from "@/components/page-table";
import { tableConfig } from "./config/table-config";
import RequestTable from "@/hooks/request-table";
import KbDialog from "@/base-ui/dialog";

import plusPanelConfig from "./config/plus-panel-config";
import message from "@/utils/message";
import base64 from "@/utils/base64";
import {
  httpPostSave,
  httpGetReceiptPrice,
  httpGetReceiptList,
} from "@/service/http/home/commit";
import dayjs from "dayjs";

const route = useRoute();

const store = useStore();
const { bildFormConfig } = plusPanelConfig();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const { column, data, totalPage, requestBildInfo } = RequestTable(
  104,
  "financeCollections",
  requestData.value
);

const pageTableConfig = computed(() => {
  return {
    ...tableConfig,
    column: column.value ?? [],
    data: data.value ?? [],
    page: requestData.value.page,
    totalPage: totalPage.value ?? 1,
  };
});

const handleQueryClick = (formData: any) => {
  requestData.value.tj = formData.tj;
  requestData.value.page = 1;
  requestData.value.begdate = formData.date[0];
  requestData.value.enddate = formData.date[1];
  requestBildInfo();
};

const handlePageChange = (val: number) => {
  requestData.value.page = val;
  requestBildInfo();
};

const defaultValue = ref<any>({
  fdate: dayjs().format("YYYY-MM-DD"),
});

const isShowPanel = ref(false);
const handleNewClick = () => {
  isShowPanel.value = true;
  defaultValue.value = {
    fdate: dayjs().format("YYYY-MM-DD"),
  };
};

const handleNewPanelQueryClick = async () => {
  const formData = (await pageSearchRef.value?.getFormData()) ?? {};
  if (!formData.fcsname) return message.show("请选择客户");

  const fcsid =
    defaultValue.value?.fcsid ?? store.state.bild.currentInfo.fitemid;
  const content = base64.objToEncode({ ...formData, fcsid });

  const res = await httpPostSave({ billtypeid: 104, content });
  message.show(res.msg, res.type);
  if (res.code >= 1) {
    isShowPanel.value = false;
    data.value = [...res.data[0].data, ...data.value];
  }
};

let currentFbillno: string;

watchEffect(async () => {
  const { row } = route.params;
  if (row) {
    const bildInfo = JSON.parse(decodeURIComponent(row as string));
    currentFbillno = bildInfo.fbillno;
    const orginData: any = {
      fcsname: bildInfo.fkhname,
      fjingshou: bildInfo.fjingshou,
      fyewuyuan: bildInfo.fyewuyuan,
      foutstockno: bildInfo.fbillno,
      fmemo: bildInfo.fmemo,
      fcsid: bildInfo.fcsid,
      fdate: dayjs().format("YYYY-MM-DD"),
    };
    console.log(bildInfo);
    // const res = await httpGetReceiptPrice({
    //   csid: bildInfo.fcsid,
    //   billno: bildInfo.billno,
    // });
    // console.log(res);
    // getReceiptList(bildInfo.fcsid);
    const res = await getReceiptList(bildInfo.fcsid);

    orginData.famount =
      res?.data?.[0]?.data?.find(
        (item: any) => item?.fbillno === bildInfo.fbillno
      )?.fleftamount ?? 0;
    defaultValue.value = orginData;
    isShowPanel.value = true;
  }
});

const currentBildList = ref<any[]>([]);
const handleSelectClient = async (row: any) => {
  defaultValue.value.fcsid = undefined;
  pageSearchRef.value!.formData.foutstockno = "";
  pageSearchRef.value!.formData.famount = 0;
  getReceiptList(row.fitemid);
};

async function getReceiptList(csid: number) {
  const res = await httpGetReceiptList({
    csid,
    type: 1,
  });
  currentBildList.value = res?.data?.[0]?.data ?? [];
  const options = currentBildList.value.map((item) => item.fbillno) ?? [];
  bildFormConfig.formItems[4].options = options;
  return res;
}

const handleChangeData = (formData: any) => {
  const searchData = pageSearchRef.value!.formData ?? {};
  if (currentFbillno !== formData.foutstockno) {
    currentFbillno = formData.foutstockno;
    searchData.famount =
      currentBildList.value.find(
        (item) => item.fbillno === formData.foutstockno
      )?.fleftamount ?? 0;
  }
};
</script>

<style scoped>
.options {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
