import {
  httpGetShowTableColumn,
  httpGetGoodsList,
  IBillid,
  IGoodListType,
  httpGetClientList,
  httpStoreInquire,
} from "@/service/http/home/commit";

type IFlagType = "good" | "client" | "storeInquire";
export default function (
  showTableId: number,
  flag: IFlagType,
  requestData: any,
  billtypeid?: IBillid
) {
  const column = ref<any[]>([]);
  const data = ref<any[]>([]);
  const totalPage = ref<number>(1);

  httpGetShowTableColumn(showTableId).then((res) => {
    column.value = res?.data?.[0]?.data ?? [];
  });

  const requestFlag = {
    good: requestGoodList,
    client: requestClientList,
    storeInquire: requestStoreInquire,
  };
  requestFlag[flag]();

  // 请求商品列表
  function requestGoodList(reqData?: any) {
    httpGetGoodsList({
      ...(reqData ?? requestData),
    }).then((res) => {
      data.value = res?.data?.[0]?.data ?? [];
      totalPage.value = res?.allpages ?? 1;
    });
  }

  // 请求客户列表
  function requestClientList(reqData?: any) {
    httpGetClientList({
      ...(reqData ?? requestData),
    }).then((res) => {
      data.value = res?.data?.[0]?.data ?? [];
      totalPage.value = res?.allpages ?? 1;
    });
  }

  function requestStoreInquire(reqData?: any) {
    httpStoreInquire({
      ...(reqData ?? requestData),
    }).then((res) => {
      data.value = res?.data?.[0]?.data ?? [];
      totalPage.value = res?.allpages ?? 1;
    });
  }

  return {
    column,
    data,
    totalPage,
    requestGoodList,
    requestClientList,
  };
}
