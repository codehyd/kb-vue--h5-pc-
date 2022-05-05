<template>
  <div class="page-search">
    <base-form
      ref="baseFormRef"
      @kehu-click="handleKehuClick"
      v-model="formData"
      v-bind="searchFormConfig"
    >
      <template #option>
        <slot name="option">
          <el-button
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

    <template v-if="isExistClient && isShowClientPanelShow">
      <kb-dialog title="选择客户/供应商" v-model:show="isShowClientPanelShow">
        <!-- input -->
        <el-input
          @keyup.enter.native="handleSearchClick"
          class="kehu-panel-input"
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
const emit = defineEmits(["query-click"]);

const store = useStore();

const baseFormRef = ref<InstanceType<typeof BaseForm>>();

const formItems = props.searchFormConfig?.formItems ?? [];
// console.log(12, formItems);
const formOriginData: any = {};
for (const item of formItems) {
  // 先判断是否有defaultValue 如果有则赋值 没有则根据type赋值
  if (props.defaultValue) {
    // console.log(props.defaultValue);
    formOriginData[item.field] =
      item.type === "number"
        ? Number(props.defaultValue[item.field])
        : props.defaultValue[item.field];
    continue;
    // formOriginData[item.name] = item.defaultValue;
  }
  if (item.defaultDateValue) {
    formOriginData[item.field] = item.defaultDateValue;
  } else {
    if (item.type == "number") {
      formOriginData[item.field] = 0;
    } else {
      formOriginData[item.field] = "";
    }
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

async function requestClientList() {
  const res = await httpGetClientList({
    flag: "select",
    parentid: clientTableConfig.parentid,
    page: clientTableConfig.page,
    tj: clientTableConfig.tj,
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
  formData.value.kehu = row.fcsname;
  message.success("选择客户成功");
};

const getFormData = async () => {
  const isValid = await baseFormRef.value?.validateForm();
  if (isValid) {
    return formData.value;
  } else {
    message.show("需要输入必填带星号的信息");
  }
};

const handleQueryClick = () => {
  // 获取数据
  emit("query-click", formData.value);
};

const handlePageChange = async (val: number) => {
  clientTableConfig.page = val as number;
  const { data, totalPage } = await requestClientList();
  clientTableConfig.data = data ?? [];
  clientTableConfig.totalPage = totalPage ?? 1;
};

defineExpose({
  getFormData,
});
</script>

<style lang="less" scoped>
.selectText {
  cursor: pointer;
}

.kehu-panel-input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin: 0 0 10px 0;
}
</style>
