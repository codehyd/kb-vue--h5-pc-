import { VxeTableInstance } from "vxe-table";
import mitter from "@/mitt";
import message from "@/utils/message";

export default function () {
  const vxeTableRef = ref({} as VxeTableInstance);

  // 删除某一行
  const remove = (rows?: any) => {
    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      vxeTable?.remove(rows);
    }
  };
  // 添加行到指定位置 -1位最后
  const insert = (rows: any, index: number = -1) => {
    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      vxeTable?.insertAt(rows, index);
    }
  };

  // 加载表格数据
  const loadTableData = (tableData: any, isReload: boolean = false) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        vxeTableRef.value?.[isReload ? "reloadData" : "loadData"](tableData);
        resolve(null);
      }, 300);
    });
  };

  // 获取数据
  const getTableData = () => vxeTableRef.value?.getTableData();

  // 完整校验
  const fullValiTable = async (isSelect: boolean = false, rows?: any) => {
    // console.log(rows);
    const { fullData } = getTableData();
    if (isSelect) {
      const newData = isSelect
        ? fullData.filter((item) => item.checked)
        : fullData;
      return vxeTableRef.value?.fullValidate(newData);
    }
    return vxeTableRef.value?.fullValidate(rows);
  };

  const updateFooter = () => vxeTableRef.value?.updateFooter();

  const removeSelectData = (rows?: any) => {
    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      const selectRows = vxeTable.getCheckboxRecords();
      if (rows.length > 0) return vxeTable?.remove(rows);
      if (selectRows.length == 0) return message.show("暂无选中行");
    }
  };

  const removeAllData = () => {
    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      const allRowData = vxeTableRef.value?.getTableData().fullData;
      if (allRowData.length == 0) return message.show("暂无删除行");
      vxeTable?.remove(allRowData);
    }
  };
  return {
    vxeTableRef,
    remove,
    insert,
    loadTableData,
    fullValiTable,
    getTableData,
    updateFooter,
    removeSelectData,
    removeAllData,
  };
}
