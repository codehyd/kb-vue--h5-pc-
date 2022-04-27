import type { ITableType } from "@/service/http/home/commit";

export default function () {
  // 网络请求数据
  const requestData: ITableType = reactive({
    page: 1,
    tj: "",
    begdate: "2022-04-01",
    enddate: "2022-04-30",
    billtypeid: 103,
  });

  return {};
}
