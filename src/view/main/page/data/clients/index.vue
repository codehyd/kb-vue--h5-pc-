<template>
  <div class="goods">
    <client-search :formConfig="clientSearchConfig"></client-search>
    <client-list
      @change-tabs="handleChangeTabs"
      @change-page="handleChangePage"
      :clientListConfig="clientListConfig"
    ></client-list>
  </div>
</template>

<script setup lang="ts">
import ClientSearch from "./cpns/client-search.vue";
import { clientSearchConfig } from "./config/client-search-config";
import ClientList from "./cpns/client-list.vue";
import { IClientTableConfig } from "@/components/page-table";
import requestTable from "@/hooks/request-table";
import { httpGetClientClassList } from "@/service/http/home/commit";

const clientListConfig: IClientTableConfig = reactive({
  keyString: "",
  page: 1,
  tj: "",
  parentid: 0,
  showAction: false,
  isShowPage: true,
  totalPage: 1,
  loading: true,
  // flag: "select",
});
httpGetClientClassList().then((res: any) => {
  clientListConfig.classList = res?.data?.[0]?.data ?? [];
});
const { column, data, totalPage, requestClientList } = requestTable(
  1003,
  "client",
  clientListConfig
);
watchEffect(() => {
  clientListConfig.column = column.value ?? [];
  clientListConfig.data = data.value ?? [];
  clientListConfig.totalPage = totalPage.value ?? 1;
});

const handleChangeTabs = (params: any) => {
  clientListConfig.parentid = params.id;
  clientListConfig.page = 1;
  requestClientList({
    parentid: clientListConfig.parentid,
    page: clientListConfig.page,
    tj: clientListConfig.tj,
  });
};
const handleChangePage = (val: number) => {
  clientListConfig.page = val;
  requestClientList({
    parentid: clientListConfig.parentid,
    page: clientListConfig.page,
    tj: clientListConfig.tj,
  });
};
</script>

<style scoped></style>
