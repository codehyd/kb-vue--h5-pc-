<template>
  <div class="page-search">
    <base-form
      ref="baseFormRef"
      @kehu-click="handleKehuClick"
      @search-click="handleQueryClick"
      v-model="formData"
      v-bind="searchFormConfig"
      @update:modelValue="handleModelValue"
    >
      <template #option>
        <slot name="option">
          <el-button
            class="queryBtn"
            v-if="isShowQuery"
            @click="handleQueryClick"
            style="margin: 0 0 0 20px"
            icon="search"
          >
            查询
          </el-button>
        </slot>
      </template>
    </base-form>

    <!-- 选择客户 -->
    <template v-if="isExistClient && isShowClientPanelShow">
      <kb-dialog
        :top="2"
        :openedFn="handleOpenedFn"
        title="选择客户/供应商"
        v-model:show="isShowClientPanelShow"
      >
        <!-- input -->
        <el-input
          @keyup.enter.native="handleSearchClick"
          class="kehu-panel-input"
          ref="elInputRef"
          v-model="clientTableConfig.tj"
        >
          <template #append>
            <el-button @click="handleSearchClick" icon="Search" />
          </template>
        </el-input>
        <!-- tabs -->
        <el-tabs v-model="clientTableConfig.parentid" @tab-click="handleClick">
          <template
            v-for="item in clientTableConfig.classList"
            :key="item.fclassid"
          >
            <el-tab-pane :label="item.name" :name="item.fclassid"></el-tab-pane>
          </template>
        </el-tabs>
        <!-- table -->
        <page-table
          @page-change="handlePageChange"
          @db-click="handleDbClick"
          :table-config="clientTableConfig"
        >
          <template #checked="{ row }">
            <span @click="handleSelectClient(row)" class="selectText">
              选择
            </span>
          </template>
        </page-table>
      </kb-dialog>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseForm, { IForm } from "@/base-ui/base-form";
import KbDialog from "@/base-ui/dialog";
import PageTable, { IClientTableConfig } from "@/components/page-table";
import { useStore } from "@/store";
import { ElInput } from "element-plus";
import dayjs from "dayjs";

import {
  httpGetClientClassList,
  httpGetShowTableColumn,
  httpGetClientList,
} from "@/service/http/home/commit";
import message from "@/utils/message";

const props = withDefaults(
  defineProps<{
    searchFormConfig: IForm;
    isShowQuery?: boolean;
    defaultValue?: any;
  }>(),
  {
    isShowQuery: false,
  }
);
const emit = defineEmits(["query-click", "select-client", "change-data"]);

const elInputRef = ref<InstanceType<typeof ElInput>>();

const store = useStore();

const baseFormRef = ref<InstanceType<typeof BaseForm>>();

const formItems = props.searchFormConfig?.formItems ?? [];
const formOriginData: any = {};
for (const item of formItems) {
  // console.log(item);

  // 先判断是否有defaultValue 如果有则赋值 没有则根据type赋值
  if (props.defaultValue) {
    // console.log(props.defaultValue);
    formOriginData[item.field] =
      item.type === "number"
        ? Number(props.defaultValue[item.field] ?? 0)
        : props.defaultValue[item.field] ?? "";
    continue;
  }
  if (item.defaultDateValue) {
    formOriginData[item.field] = item.defaultDateValue;
  }

  if (item.type == "date") {
    formOriginData[item.field] = dayjs().format("YYYY-MM-DD");
  }
}
const formData = ref(formOriginData);

// 点击选择客户
const isExistClient = computed(() => {
  // 判断kehu字段是否出现在formItems中
  const isExist = formItems.some(
    (item) => item.field === "kehu" || item.type === "kehu"
  );
  return isExist;
});
const isShowClientPanelShow = ref(false);
// const activeName = ref<string | number>("");
const clientTableConfig: IClientTableConfig = reactive({
  tj: "",
  page: 1,
  keyString: "fitemid",
  column: [],
  data: [],
  classList: [],
  showAction: false,
  showSelect: true,
  parentid: 0,
  isShowPage: true,
  totalPage: 1,
  loading: true,
});

const handleKehuClick = () => {
  isShowClientPanelShow.value = !isShowClientPanelShow.value;
};

if (isExistClient.value) {
  requestClientConfig();
}

async function requestClientConfig() {
  const res = await httpGetClientClassList();
  clientTableConfig.classList = res?.data?.[0]?.data ?? [];
  clientTableConfig.parentid = clientTableConfig.classList?.[0]?.fclassid ?? 0;
  // activeName.value = clientTableConfig.parentid;

  const tableRes = await httpGetShowTableColumn(1003);
  clientTableConfig.column = tableRes?.data?.[0]?.data ?? [];

  const { data, totalPage } = await requestClientList();
  clientTableConfig.data = data ?? [];
  clientTableConfig.totalPage = totalPage ?? 1;
}

const count = computed(() => {
  const config = store.state.setup.config["pc-table"]?.setup ?? [];
  const count = config?.find((item: any) => item.id == "count")?.value;
  return count;
});

async function requestClientList() {
  const res = await httpGetClientList({
    flag: "select",
    parentid: clientTableConfig.parentid,
    page: clientTableConfig.page,
    tj: clientTableConfig.tj,
    count: count.value,
  });
  // console.log(res);
  return {
    data: res?.data?.[0]?.data ?? [],
    totalPage: res?.allpages ?? 1,
  };
}

const handleSearchClick = async () => {
  clientTableConfig.page = 1;
  const { data, totalPage } = await requestClientList();
  clientTableConfig.data = data ?? [];
  clientTableConfig.totalPage = totalPage ?? 1;
};

const handleClick = (payload: any) => {
  const { props } = payload;
  // activeName.value = props.label;
  clientTableConfig.parentid = props.name;
  handleSearchClick();
};

const handleSelectClient = (row: any) => {
  store.commit("bild/changeCurrentInfo", row);
  formData.value.faddress = row.faddress;
  formData.value.fphone = row.fphone;
  formData.value.flinker = row.flinker;
  formData.value.fyewuyuan = row.fyewuyuan;
  formData.value.fmemo = row.fmemo;
  // type类型为kehu的值赋值
  for (const item of formItems) {
    if (item.type === "kehu") {
      formData.value[item.field] = row.fcsname;
    }
  }
  message.success("选择客户成功");
  isShowClientPanelShow.value = false;
  emit("select-client", row);
};

const handleDbClick = (params: any) => {
  handleSelectClient(params.row);
};

const formatFormData = () => {
  const formItem = props.searchFormConfig?.formItems ?? [];
  const oraginData: any = {};
  for (const item of formItem) {
    oraginData[item.field] = "";
  }
  return oraginData;
};

const getFormData = async () => {
  const isValid = await baseFormRef.value?.validateForm();
  if (isValid) {
    return Object.assign(formatFormData(), formData.value);
  } else {
    message.show("带星号*项目必须录入或选择");
  }
};

const handleQueryClick = () => {
  // 获取数据
  emit("query-click", Object.assign(formatFormData(), formData.value));
};

const handlePageChange = async (val: number) => {
  clientTableConfig.page = val as number;
  const { data, totalPage } = await requestClientList();
  clientTableConfig.data = data ?? [];
  clientTableConfig.totalPage = totalPage ?? 1;
};

const handleOpenedFn = () => {
  elInputRef.value?.focus();
};

const handleModelValue = (formData: any) => {
  emit("change-data", formData);
  // console.log(formData);
};

const refData = () => {
  const formItem = props.searchFormConfig?.formItems ?? [];
  const oraginData: any = {};
  for (const item of formItem) {
    if (item.type == "kehu") {
      store.commit("bild/changeCurrentInfo", {});
    }
    oraginData[item.field] = item.type == "number" ? 0 : "";
  }
  formData.value = Object.assign(oraginData, props.defaultValue ?? {});
};

defineExpose({
  getFormData,
  formData,
  refData,
});
</script>

<style lang="less" scoped>
.selectText {
  cursor: pointer;
  text-decoration: underline;
  color: #00a0e9;
}

.kehu-panel-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin: 0 0 10px 0;
}

// 媒体查询 1200px以下
@media screen and (max-width: 1200px) {
  .queryBtn {
    display: flex;
    width: 100%;
  }
}
</style>
