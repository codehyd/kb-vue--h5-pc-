<template>
  <div class="goods">
    <client-search
      v-model:tj="clientListConfig.tj"
      @update:tj="handleUpdateTj"
      :formConfig="clientSearchConfig"
    >
      <template #options>
        <el-button type="info" @click="handleToggleClick">切换样式</el-button>
        <el-button icon="CirclePlus" @click="handleNewClient">
          新增客户
        </el-button>
      </template>
    </client-search>

    <client-list
      @change-tabs="handleChangeTabs"
      @change-page="handleChangePage"
      @edit-client="handleEditClient"
      :clientListConfig="clientListConfig"
      ref="clientListRef"
    ></client-list>

    <client-edit-panel
      ref="clientEditPanelRef"
      :data="clientListConfig.data"
    ></client-edit-panel>
  </div>
</template>

<script setup lang="ts">
import mitter from "@/mitt";
import ClientSearch from "./cpns/client-search.vue";
import { clientSearchConfig } from "./config/client-search-config";
import ClientList from "./cpns/client-list.vue";
import { IClientTableConfig } from "@/components/page-table";
import requestTable from "@/hooks/request-table";
import { httpGetClientClassList } from "@/service/http/home/commit";
import ClientEditPanel from "./cpns/client-edit-panel.vue";

const clientEditPanelRef = ref<InstanceType<typeof ClientEditPanel>>();
const clientListRef = ref<InstanceType<typeof ClientList>>();

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

const handleUpdateTj = () => {
  handleChangePage(1);
};

const handleNewClient = () => {
  clientEditPanelRef.value!.show = true;
  clientEditPanelRef.value!.defaultData = {};
  clientEditPanelRef.value!.id = 0;
};

const handleEditClient = (res: any) => {
  const data = res.data[0].data[0];
  clientEditPanelRef.value!.show = true;
  clientEditPanelRef.value!.defaultData = data;
  clientEditPanelRef.value!.id = data.fitemid;
};

const handleToggleClick = () => {
  clientListRef.value?.handleToggleClick();
  // currentIcon.value == "Tickets" ? "Menu" : "Tickets";
};

mitter.on("add-client", () => {
  handleNewClient();
});
</script>

<style scoped></style>
