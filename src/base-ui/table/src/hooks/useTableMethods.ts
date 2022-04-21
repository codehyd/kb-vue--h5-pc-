import { VxeTableInstance } from "vxe-table";
export default function () {
  const vxeTableRef = ref({} as VxeTableInstance);

  // 删除某一行
  const remove = (rows?: any) => {
    const vxeTable = vxeTableRef.value;
    if (vxeTable) {
      vxeTable?.remove(rows);
    }
  };

  return {
    vxeTableRef,
    remove,
  };
}
