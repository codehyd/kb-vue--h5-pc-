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

  mitter.on("add-table-rows", (row: any) => {
    console.log("mitter.on接收");

    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      vxeTable?.insertAt(row, -1);
      message.success("添加成功");
    }
  });
  return {
    vxeTableRef,
    remove,
  };
}
