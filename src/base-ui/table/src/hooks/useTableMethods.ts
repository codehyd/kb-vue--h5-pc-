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

  // mitter.on("add-table-rows", (row: any) => {
  //   const vxeTable = vxeTableRef.value;
  //   if (vxeTable) {
  //     vxeTable?.insertAt(row, -1);
  //   }
  // });

  return {
    vxeTableRef,
    remove,
    insert,
  };
}
