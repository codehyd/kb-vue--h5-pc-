import { httpGetEditTableColumn } from "@/service/http/home/commit";

export default function () {
  const handleScroll = (e: Event) => {
    console.log(e);
  };

  // 获取编辑表格的权限
  const getEditTableAuth = async (id: number) => {
    const res = await httpGetEditTableColumn(id);
    return res;
  };

  return {
    handleScroll,
    getEditTableAuth,
  };
}
