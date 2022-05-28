<template>
  <div>
    <page-search
      class="card"
      style="margin: 0 0 10px 0"
      @query-click="handleQueryClick"
      isShowQuery
      :searchFormConfig="searchConfig"
      ref="HeaderpageSearchRef"
    >
      <template #option>
        <div class="options">
          <el-button
            @click="handleQueryClick"
            class="queryBtn"
            style="margin: 0 0 0 20px"
            icon="search"
          >
            查询
          </el-button>
          <el-button
            class="queryBtn"
            @click="handleNewClick"
            icon="plus"
            type="primary"
          >
            新增
          </el-button>
        </div>
      </template>
    </page-search>

    <div class="card">
      <!-- <div class="options">
        <el-button @click="handleNewClick">新增采购付款单</el-button>
      </div> -->
      <page-table
        @page-change="handlePageChange"
        :billtypeid="113"
        :tableConfig="pageTableConfig"
      ></page-table>
    </div>

    <kb-dialog v-model:show="isShowPanel" title="新增采购付款单">
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
  httpGetReceiptList,
  httpPostSave,
  httpGetPurchasePrice,
} from "@/service/http/home/commit";
import dayjs from "dayjs";

const route = useRoute();

const store = useStore();
const { bildFormConfig } = plusPanelConfig();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();
const HeaderpageSearchRef = ref<InstanceType<typeof PageSearch>>();

const { column, data, totalPage, requestBildInfo } = RequestTable(
  113,
  "financePurchase",
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

const handleQueryClick = async () => {
  const formData = await HeaderpageSearchRef.value!.getFormData();
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

const defaultValue = ref<any>({});
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
  const res = await httpPostSave({ billtypeid: 113, content });
  message.show(res.msg, res.type);
  if (res.code >= 1) {
    isShowPanel.value = false;
    data.value = [...res.data[0].data, ...data.value];
  }
};

let currentFbillno: string;
const currentBildList = ref<any[]>([]);

watchEffect(async () => {
  const { row } = route.params;
  if (row) {
    const bildInfo = JSON.parse(decodeURIComponent(row as string));
    currentFbillno = bildInfo.fbillno;
    const orginData: any = {
      fcsname: bildInfo.fkhname,
      fjingshou: bildInfo.fjingshou,
      fyewuyuan: bildInfo.fyewuyuan,
      finstockno: bildInfo.fbillno,
      fmemo: bildInfo.fmemo,
      fcsid: bildInfo.fcsid,
      fdate: dayjs().format("YYYY-MM-DD"),
    };
    console.log(bildInfo);
    // const res = await httpGetPurchasePrice({
    //   csid: bildInfo.fcsid,
    //   billno: bildInfo.billno,
    // });
    const res = await getReceiptList(bildInfo.fcsid);

    orginData.famount =
      res?.data?.[0]?.data?.find(
        (item: any) => item?.fbillno === bildInfo.fbillno
      )?.fleftamount ?? 0;
    defaultValue.value = orginData;
    isShowPanel.value = true;

    // getReceiptList(bildInfo.fcsid);
  }
});

async function getReceiptList(csid: number) {
  const res = await httpGetReceiptList({
    csid,
    type: 2,
  });
  currentBildList.value = res?.data?.[0]?.data ?? [];
  const options = currentBildList.value.map((item) => item.fbillno) ?? [];
  bildFormConfig.formItems[4].options = options;
  console.log(res);
  return res;
}
const handleSelectClient = async (row: any) => {
  defaultValue.value.fcsid = undefined;
  pageSearchRef.value!.formData.finstockno = "";
  pageSearchRef.value!.formData.famount = 0;
  getReceiptList(row.fitemid);
};

const handleChangeData = (formData: any) => {
  const searchData = pageSearchRef.value!.formData ?? {};
  if (currentFbillno !== formData.finstockno) {
    currentFbillno = formData.finstockno;
    searchData.famount =
      currentBildList.value.find((item) => item.fbillno === formData.finstockno)
        ?.fleftamount ?? 0;
  }
};
</script>

<style scoped>
.options {
  display: inline-flex;
}
@media screen and (max-width: 1200px) {
  .options {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .queryBtn {
    flex: 1;
  }
}
</style>
