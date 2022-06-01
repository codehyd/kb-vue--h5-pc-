<template>
  <div class="salestatement">
    <page-search
      class="card"
      isShowQuery
      :searchFormConfig="searchConfig"
      @query-click="handleQueryClick"
      ref="pageSearchRef"
    >
      <template #option>
        <div class="options">
          <!-- <el-button disabled @click="handleFlagClick('share')">
            分享
          </el-button> -->
          <el-button @click="handleQueryClick('printpng')">查询</el-button>
          <el-button type="primary" @click="handleFlagClick('printpng')">
            预览png
          </el-button>
          <el-button type="primary" @click="handleFlagClick('printpdf')">
            打印预览
          </el-button>
        </div>
      </template>
    </page-search>

    <check-info
      @update:page="handlePageChange"
      v-model:data="checkInfoData"
      v-model:page="page"
    ></check-info>

    <kb-dialog :top="2" v-model:show="show">
      <iframe
        :style="{ height: '85vh', width: '100%' }"
        :src="printUrl"
      ></iframe>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import { searchConfig } from "./config/search-config";
import message from "@/utils/message";
import { httpGetSalesStatementData } from "@/service/http/home/sales/tatement";
import CheckInfo from "./cpns/check-info.vue";
import KbDialog from "@/base-ui/dialog";

const store = useStore();
const currentInfo = computed(() => store.state.bild.currentInfo);
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const isShowCheckInfoPanel = ref(true);
const checkInfoData = ref<any>({});

const page = ref(1);
const flag = ref("");

const count = computed(() => {
  const config = store.state.setup.config["pc-table"]?.setup ?? [];
  const count = config?.find((item: any) => item.id == "count")?.value;
  return count;
});

const handleQueryClick = async (
  formData: any,
  editPageCallback?: () => void
) => {
  if (!formData.kehu) return message.show("请选择客户");

  const csid = currentInfo.value.fitemid;
  const begdate = formData.date[0];
  const enddate = formData.date[1];
  // const flag = flag.value;
  page.value = 1;
  flag.value = "";
  editPageCallback && editPageCallback();
  // let page = 1;

  const res = await httpGetSalesStatementData({
    csid,
    begdate,
    enddate,
    flag: flag.value,
    page: page.value,
    count: count.value,
  });

  if (flag.value == "") {
    isShowCheckInfoPanel.value = res.code >= 1 ? true : false;
    checkInfoData.value = res;
  } else if (flag.value == "share") {
  } else {
    show.value = res.code >= 1 ? true : false;
    printUrl.value = res?.url ?? "";
  }

  message.show(res.msg, res.type);
};

const handlePageChange = async (val: number) => {
  const formData = await pageSearchRef.value?.getFormData();
  handleQueryClick(formData, () => {
    page.value = val;
  });
};

const show = ref(false);
const printUrl = ref("");

const handleFlagClick = async (type: any) => {
  const formData = await pageSearchRef.value?.getFormData();
  handleQueryClick(formData, () => {
    flag.value = type;
  });
};
</script>

<style scoped>
.options {
  margin: 0 0 0 10px;
}
</style>
