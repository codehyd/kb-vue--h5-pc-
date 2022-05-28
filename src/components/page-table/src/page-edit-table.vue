<template>
  <div class="page-edit-table">
    <!-- 页头 -->
    <el-page-header
      style="margin-bottom: 10px"
      :content="title"
      @back="handleGoBack"
    />
    <!-- 客户信息 -->
    <div class="current card">
      <!-- <div class="select">客户信息</div> -->
      <page-search
        ref="pageSearchRef"
        class="currentPageSearch"
        :searchFormConfig="newFormConfig"
        :defaultValue="defaultValue"
      ></page-search>
    </div>
    <!-- 表格编辑 -->
    <div class="good card">
      <edit-table-option
        @save-bild="handleSaveBildClick"
        @add-new-goods="handleAddNewGoods"
        @reloadData="handleReloadData"
        @save-local-data="handleSaveLocalData"
        @load-new-data="handleLoadNewData"
        @remove-select-data="handleRemoveSelectData"
        @remove-all-data="handleRemoveAllData"
      ></edit-table-option>
      <!-- <span class="select">商品信息</span> -->
      <page-table ref="pageTableRef" :tableConfig="newTableConfig"></page-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch, { IForm } from "@/components/page-search";
import PageTable from "@/components/page-table";
import EditTableOption from "./cpns/edit-table-options.vue";

import { ITableConfigType } from "@/base-ui/table";
import message from "@/utils/message";
import { httpPostSave } from "@/service/http/home/commit";
import { useStore } from "@/store";
import base64 from "@/utils/base64";
import useGetUserPrice from "@/hooks/useGetUserPrice";
import { getDay } from "@/utils/timer";
import useEditHooks from "./hooks/useEditHooks";

const props = withDefaults(
  defineProps<{
    title: string;
    tableConfig: ITableConfigType;
    formConfig: IForm;
    billtypeid: number;
  }>(),
  {}
);

const emit = defineEmits(["goBack"]);

const store = useStore();
const isAnother = computed(() => store.state.bild.isAnother);

const isRedo = computed(() => {
  const config = store.state.setup.config["pc-table"]?.setup ?? [];
  const redo = config.find((item: any) => item.id == "billingRedo");
  return redo?.value ?? true;
});

const { changeGoodPrice } = useGetUserPrice();
const { changeAmount } = useEditHooks();

const pageTableRef = ref<InstanceType<typeof PageTable>>();
const pageSearchRef = ref<InstanceType<typeof PageSearch>>();

const newFormConfig = computed(() => {
  return { ...props.formConfig, isHideErrorMargin: true };
});

const handleGoBack = () => {
  const fullData = pageTableRef.value?.getTableData()?.fullData ?? [];
  const isGoodId = fullData.some((item) => item.fmodelid);
  if (isGoodId) {
    return message.confirm(
      "当前还有商品信息还未保存提交 是否缓存当前数据",
      () => {
        store.commit("bild/changeBildData", fullData);
        message.show("缓存成功", "success");
        emit("goBack");
      },
      () => {
        emit("goBack");
      }
    );
  }
  emit("goBack");
};

const handleAddNewGoods = async (row: any) => {
  const { fullData } = pageTableRef.value?.getTableData() ?? {};
  const initColumn = pageTableRef.value?.getInitColumn() ?? {};
  const getPriceGoodRow = (await changeGoodPrice(row)) ?? {};
  // 获取当前时间戳
  const nowTime = +new Date();
  const refRowData = Object.assign(initColumn, getPriceGoodRow, {
    rowId: nowTime,
  });

  // 判断fullData数据的fmodelid是否存在 如果不存在则在不存在的行插入 如果存在则在下一行插入
  const fidx = fullData?.findIndex((item) => !item.fmodelid);
  console.log(fidx);
  if (fidx === -1) {
    fullData?.push(refRowData);
  } else {
    fullData?.splice(fidx!, 1, changeAmount(refRowData).newRow);
  }

  pageTableRef.value?.reloadData(fullData);

  // changeAmount(refRowData,refRowData);

  // 先判断是否有空行

  // 判断fullData的数组中是否有fmodelid字段 如果没有的话则拿到索引
  // const index = fullData?.findIndex((item: any) => !item.fmodelid);
  // 判断重复
  // const fidx = fullData?.findIndex(
  //   (item: any) => item.fmodelid == refRowData.fmodelid
  // );

  // const newRow = [...(fullData ?? [])];

  // if (index == -1) {
  //   console.log(index);
  //   if (fidx == -1) {
  //     console.log(1);
  //     pageTableRef.value?.insert(changeAmount(refRowData).newRow);
  //   } else {
  //     console.log(2);
  //     const fqty = newRow[fidx!].fqty + 1;
  //     refRowData.fqty = fqty;
  //     newRow.splice(fidx!, 1, changeAmount(refRowData).newRow);
  //     pageTableRef.value?.reloadData(newRow);
  //   }
  // } else {
  //   if (isRedo.value) {
  //     console.log(3);
  //     newRow.splice(index!, 1, changeAmount(refRowData).newRow);
  //     pageTableRef.value?.reloadData(newRow);
  //   } else {
  //     if (fidx == -1) {
  //       console.log(4);
  //       newRow.splice(index!, 1, changeAmount(refRowData).newRow);
  //       pageTableRef.value?.reloadData(newRow);
  //     } else {
  //       console.log(5);
  //       const fqty = newRow[fidx!].fqty + 1;
  //       refRowData.fqty = fqty;
  //       newRow.splice(fidx!, 1, changeAmount(refRowData).newRow);
  //       pageTableRef.value?.reloadData(newRow);
  //     }
  //   }
  // }

  message.success("添加成功");
};

// 保存提交
const handleSaveBildClick = async () => {
  // 先校验表单
  const formData = await pageSearchRef.value?.getFormData();
  if (formData) {
    // 获取表格数据
    const tableData = pageTableRef.value?.getTableData()?.fullData ?? [];
    // 获取勾选的数据且需要有商品id
    const findCheckOrId = tableData?.filter(
      (item: any) => item.fmodelid && item.checked
    );
    if (findCheckOrId.length == 0) return message.error("请选择商品");

    const validateTable: any = await pageTableRef.value?.validate(
      false,
      findCheckOrId
    );
    // console.log(validateTable?.valitable);
    if (validateTable?.valitable) {
      submitContent(formData, findCheckOrId);
    }

    // if (validateTable?.valitable) {
    //   pageTableRef.value?.reloadData(
    //     tableData
    //       ?.filter((item: any) => !item.fmodelid && !item.checked)
    //       .map((item) => {
    //         const newItem = Object.assign({}, item);
    //         newItem.checked = false;
    //         return newItem;
    //       })
    //   );
    // 获取表格数据后提交 post
    // submitContent(formData, findCheckOrId);
    // }
  }
};

async function submitContent(currentInfo: any, tableData: any) {
  // console.log(currentInfo, tableData, store.state.bild.currentInfo.fitemid);
  const content = base64.objToEncode({
    ...currentInfo,
    fcsid: store.state.bild.currentInfo.fitemid,
    data: tableData,
  });
  const res = await httpPostSave({
    billtypeid: props.billtypeid,
    content,
  });
  if (res.code >= 1) {
    // handleRemoveSelectData();
    pageTableRef.value?.removeSelectData(tableData);
    message.confirm(
      "保存成功，是否继续开新单？",
      () => {
        console.log(1312);
      },
      () => {
        handleGoBack();
      }
    );

    // 删除打钩的数据
    // mitter.emit("base-table-remove-select-rows");
  }

  message.show(
    res.code >= 1 ? `提交成功 单号为${res.billno}` : res.msg,
    res.type
  );
}

const handleLoadNewData = () => {
  pageTableRef.value?.loadingNewColumn();
};

const handleRemoveSelectData = () => {
  pageTableRef.value?.removeSelectData();
};

const handleRemoveAllData = () => {
  pageTableRef.value?.removeAllData();
};

const handleReloadData = (data: any) => {
  pageTableRef.value?.reloadData(data);
  message.show("加载成功", "success");
};
const handleSaveLocalData = () => {
  const fullData = pageTableRef.value?.getTableData()?.fullData ?? [];
  if (fullData.length == 0) return message.show("暂无数据缓存");
  store.commit("bild/changeBildData", fullData);
  message.show("缓存成功", "success");
};

const storeDefaultValue = computed(() => {
  const stock =
    store.state.setup.config["pc-table"].setup?.find(
      (item: any) => item.id == "defaultStore"
    )?.value ?? "";
  return stock;
});

const defaultValue = {
  fstock: storeDefaultValue.value,
  fdate: getDay(),
};

const newTableConfig = computed(() => {
  const tableConfig: ITableConfigType = {
    ...props.tableConfig,
    menuConfig: {
      body: {
        options: [
          [
            {
              code: "editDelete",
              name: "删除当前行",
              visible: true,
              disabled: false,
            },
          ],
        ],
      },
    },
    showSelect: false,
  };
  return tableConfig;
});

watchEffect(() => {
  if (isAnother.value) {
    message.confirm("是否加载刚刚缓存再来一单的数据", () => {
      store.commit("bild/changeIsAnother", false);
      const data = store.state.bild.bildData;
      handleReloadData(data);
    });
  }
});
</script>

<style lang="less" scoped>
.current {
  padding: 10px;
  margin: 0 0 10px 0;
  .currentPageSearch {
    &:deep(.el-form-item__content) {
      border: 1px solid #ebeef5;
      margin: 0px -1px;
    }
    &:deep(.el-form-item__label) {
      background-color: #f5f7fa;
      border: 1px solid #ebeef5;
    }
    &:deep(.el-input__inner) {
      border: none;
      box-shadow: none;
    }
  }
}

.good {
  padding: 10px;
}

:deep(.el-page-header__left) {
  color: #0094ff;
}
</style>
