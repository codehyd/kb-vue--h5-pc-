<template>
  <div class="salestatement">
    <page-search
      class="card"
      isShowQuery
      :searchFormConfig="searchConfig"
      @query-click="handleQueryClick"
      ref="pageSearchRef"
    ></page-search>

    <check-info
      @update:page="handlePageChange"
      v-model:data="checkInfoData"
      v-model:page="page"
    ></check-info>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import message from "@/utils/message";
import { httpGetSalesStatementData } from "@/service/http/home/sales/tatement";
import CheckInfo from "./cpns/check-info.vue";

const store = useStore();
const currentInfo = computed(() => store.state.bild.currentInfo);
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const isShowCheckInfoPanel = ref(true);
const checkInfoData = ref<any>({});

const page = ref(1);

const handleQueryClick = async (
  formData: any,
  editPageCallback?: () => void
) => {
  if (!formData.kehu) return message.show("请选择客户");

  const csid = currentInfo.value.fitemid;
  const begdate = formData.date[0];
  const enddate = formData.date[1];
  const flag = "";
  page.value = 1;
  editPageCallback && editPageCallback();
  // let page = 1;

  const res = await httpGetSalesStatementData({
    csid,
    begdate,
    enddate,
    flag,
    page: page.value,
  });
  isShowCheckInfoPanel.value = res.code >= 1 ? true : false;
  checkInfoData.value = res;
  message.show(res.msg, res.type);
};

const handlePageChange = async (val: number) => {
  const formData = await pageSearchRef.value?.getFormData();
  handleQueryClick(formData, () => {
    page.value = val;
  });
};
</script>

<style scoped></style>
