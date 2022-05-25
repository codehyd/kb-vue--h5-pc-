<template>
  <div class="inquire">
    <inquire-search
      @query-click="handleQueryClick"
      :searchConfig="inquireSearchConfig"
    ></inquire-search>
    <inquire-table
      @tab-click="handleTabClick"
      :tableConfig="tableConfig"
      @page-change="handlePageChange"
    ></inquire-table>
  </div>
</template>

<script setup lang="ts">
import InquireSearch from "./cpns/inquire-search.vue";
import { inquireSearchConfig } from "./config/inquire-search-config";
import { IStoreinquireConfig } from "@/components/page-table";

import InquireTable from "./cpns/inquire-table.vue";

import requestTable from "@/hooks/request-table";

const tableConfig: IStoreinquireConfig = reactive({
  classid: 0,
  page: 1,
  keyString: "",
  showAction: false,
  isShowPage: true,
  totalPage: 1,
  loading: true,
});
const { column, data, totalPage, requestStoreInquire } = requestTable(
  1307,
  "storeInquire",
  tableConfig
);
watchEffect(() => {
  tableConfig.column = column.value ?? [];
  tableConfig.data = data.value ?? [];
  tableConfig.totalPage = totalPage.value ?? 1;
});

const handleQueryClick = (formData: any) => {
  tableConfig.tj = formData.tj;
  const data = {
    tj: formData.tj,
    classid: tableConfig.classid,
    page: formData.page ?? tableConfig.page,
  };

  requestStoreInquire(data);
};

const handleTabClick = (id: number) => {
  tableConfig.classid = id;
  requestStoreInquire({
    tj: tableConfig.tj,
    classid: tableConfig.classid,
    page: tableConfig.page,
  });
};

const handlePageChange = (val: number) => {
  tableConfig.page = val;
  requestStoreInquire({
    tj: tableConfig.tj,
    classid: tableConfig.classid,
    page: tableConfig.page,
  });
};
</script>

<style scoped></style>
