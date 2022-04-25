// 关于自定义表格的属性
import { useStore } from "@/store";

import { ImodeType } from "../../type";

export default function (mode: ImodeType) {
  const store = useStore();

  // 表格最大的高度
  const maxHeight = computed(() => {
    const tableConfig = store.state.setup.config?.["pc-table"]?.setup;
    // console.log(1221, tableConfig);
    let maxHeight;
    // 查询模式
    if (mode == "query") {
      maxHeight =
        tableConfig?.find((item: any) => item.id == "queryTableMaxHeight")
          ?.value ?? 700;
    } else if (mode == "detail") {
      maxHeight =
        tableConfig?.find((item: any) => item.id == "detailTableMaxHeight")
          ?.value ?? 700;
    }
    return maxHeight ?? 700;
  });

  // 是否根据内容自动调整列宽
  const isAutoColumnWidth = computed(
    () =>
      store.state.setup.config?.["pc-table"]?.setup?.find(
        (item: any) => item.id == "isAutoWidth"
      )?.value ?? false
  );
  // 是否显示省略号
  const isShowOverFlow = computed(
    () =>
      store.state.setup.config?.["pc-table"]?.setup?.find(
        (item: any) => item.id == "isShowOverFlow"
      )?.value ?? false
  );

  // 表格编辑配置项
  const editConfig = () => {
    if (mode !== "edit") return { enabled: false };
    return {
      trigger: "click",
      mode: "cell",
      activeMethod: (params: any) => isCellEdit(params),
    };
  };
  function isCellEdit(params: any) {
    const { row, column } = params;
    // return true
    return column.params.freadonly == 0 ? false : true;
  }
  const handlerEditActived = (params: any) => {
    const isNumber = params.column.params.fdatatype == "decimal";
    const key = params.column.params.ffieldname;
    if (isNumber) {
      params.row[key] = Number(params.row[key]);
    }
  };

  // 可编辑渲染器配置项
  const columnEditRender = (item: any) => {
    if (mode !== "edit") return { enabled: false };
    // return { enabled: true }
    if (item.freadonly == 0) {
      return { enabled: false };
    } else {
      return {
        autofocus: ".el-input__inner",
        immediate: true,
        autoselect: true,
        placeholder: "",
      };
    }
  };

  const cellClassName = (params: any) => {
    if (mode !== "edit") return null;
    const isReadonly = params.column.params?.freadonly == 0 ? true : false;
    if (isReadonly) return "isReadonly";
    return null;
  };

  return {
    maxHeight,
    isAutoColumnWidth,
    isShowOverFlow,
    editConfig,
    handlerEditActived,
    columnEditRender,
    cellClassName,
  };
}
