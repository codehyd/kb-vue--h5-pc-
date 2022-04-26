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
  const loadTableData = (tableData: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        vxeTableRef.value?.reloadData(tableData);
        resolve(null);
      }, 300);
    });
  };

  // 获取数据
  const getTableData = () => vxeTableRef.value?.getTableData();

  // 完整校验
  const fullValiTable = async () => {
    const { fullData } = getTableData();
    return vxeTableRef.value?.fullValidate(fullData);
  };

  return {
    vxeTableRef,
    remove,
    insert,
    loadTableData,
    fullValiTable,
    getTableData,
  };
}
