<template>
  <div class="goods">
    <good-search
      v-model:tj="goodListConfig.tj"
      @update:tj="handleQueryClick"
      :formConfig="goodSearchConfig"
    ></good-search>

    <good-list
      @change-tabs="handleChangeTabs"
      @change-page="handleChangePage"
      @new-goods="handleNewGoods"
      @edit-good="handleEditGood"
      :goodListConfig="goodListConfig"
      ref="goodListRef"
    ></good-list>

    <good-edit-panel
      v-model:images="images"
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
const goodListRef = ref<InstanceType<typeof GoodList>>();

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

const images = ref([]);

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
  goodEditPanel.value!.defaultData = {};
  goodEditPanel.value!.id = 0;
  images.value = [];
  goodEditPanel.value!.show = true;
};

const handleEditGood = async (res: any) => {
  const data = res.data[0].data[0];
  goodEditPanel.value!.defaultData = data;
  goodEditPanel.value!.id = data.fmodelid;
  images.value = res.atturlarray;
  goodEditPanel.value!.show = true;
};

const handleQueryClick = (formData: any) => {
  // goodListConfig.tj = formData.tj;
  goodListConfig.page = 1;
  requestGoodList({
    Classid: goodListConfig.Classid,
    page: goodListConfig.page,
    tj: goodListConfig.tj,
  });
};
// console.log(data);

const handleSaveSuccess = (res: any) => {
  const data = res.data[0].data[0];
  goodListConfig.data?.push(data);
  goodListRef.value?.addGoods(data);
  // console.log(res);
};
</script>

<style scoped></style>
