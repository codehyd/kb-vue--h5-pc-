<template>
  <div class="goods">
    <good-search :formConfig="goodSearchConfig"></good-search>

    <good-list
      @change-tabs="handleChangeTabs"
      @change-page="handleChangePage"
      @new-goods="handleNewGoods"
      @edit-good="handleEditGood"
      :goodListConfig="goodListConfig"
    ></good-list>

    <good-edit-panel
      @save-success="handleSaveSuccess"
      ref="goodEditPanel"
    ></good-edit-panel>
  </div>
</template>

<script setup lang="ts">
import GoodSearch from "./cpns/good-search.vue";
import { goodSearchConfig } from "./config/good-search-config";
import GoodList from "./cpns/good-list.vue";
import { IGoodTableConfig } from "@/components/page-table";
import requestTable from "@/hooks/request-table";
import { httpGetGoodsClassList } from "@/service/http/home/commit";

import GoodEditPanel from "./cpns/good-edit-panel.vue";

const goodEditPanel = ref<InstanceType<typeof GoodEditPanel>>();

const goodListConfig: IGoodTableConfig = reactive({
  keyString: "",
  page: 1,
  tj: "",
  Classid: 0,
  showAction: false,
  isShowPage: true,
  totalPage: 1,
  loading: true,
  flag: "select",
});
httpGetGoodsClassList().then((res: any) => {
  goodListConfig.classList = res?.data?.[0]?.data ?? [];
});
const { column, data, totalPage, requestGoodList } = requestTable(
  1000,
  "good",
  goodListConfig
);
watchEffect(() => {
  goodListConfig.column = column.value ?? [];
  goodListConfig.data = data.value ?? [];
  goodListConfig.totalPage = totalPage.value ?? 1;
});

const handleChangeTabs = (params: any) => {
  goodListConfig.Classid = params.id;
  goodListConfig.page = 1;
  requestGoodList({
    Classid: goodListConfig.Classid,
    page: goodListConfig.page,
    tj: goodListConfig.tj,
  });
};
const handleChangePage = (val: number) => {
  goodListConfig.page = val;
  requestGoodList({
    Classid: goodListConfig.Classid,
    page: goodListConfig.page,
    tj: goodListConfig.tj,
  });
};

const handleNewGoods = () => {
  goodEditPanel.value!.show = true;
  goodEditPanel.value!.defaultData = {};
  goodEditPanel.value!.id = 0;
};

const handleEditGood = async (res: any) => {
  goodEditPanel.value!.show = true;
  goodEditPanel.value!.defaultData = res;
  goodEditPanel.value!.id = res.fmodelid;
};

// console.log(data);

const handleSaveSuccess = (res: any) => {
  console.log(res);
};
</script>

<style scoped></style>
