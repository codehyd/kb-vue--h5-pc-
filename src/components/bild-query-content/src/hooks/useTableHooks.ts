import { ITableConfigType } from "@/base-ui/table";
import type {
  ITableType,
  IBaseTableConfigType,
} from "@/service/http/home/commit";
import {
  httpGetShowTableColumn,
  httpGetEditTableColumn,
  httpGetTableData,
  httpGetDetailTableData,
} from "@/service/http/home/commit";

import { IDetailTableConfig } from "@/components/page-table";

import mitter from "@/mitt";

type callback = () => void;

export default function (
  reqData: ITableType,
  showBilltypeid: number,
  detailCallback?: callback
) {
  // 查询表格的配置
  const tableConfig: ITableConfigType = reactive({
    keyString: "fitemid",
    column: [],
    showAction: true,
    page: 1,
    totalPage: 1,
    data: [],
    isShowPage: true,
    loading: true,
    state: "query",
  });

  // 详情表格的配置
  const detailTableConfig: IDetailTableConfig = reactive({
    keyString: "fitemid",
    column: [],
    data: [],
    messages: [],
    images: [],
    showAction: false,
    state: "detail",
  });

  // const isShowDetailPanel = ref(false);

  // 获取表格的头部数据
  const getShowTableColumn = () => {
    httpGetShowTableColumn(showBilltypeid).then((res) => {
      tableConfig.column = res?.data?.[0]?.data ?? [];
      console.log(res);
    });
  };

  // 获取查询表格的数据
  const getTableData = () => {
    httpGetTableData(reqData.billtypeid, reqData).then((res) => {
      tableConfig.totalPage = res?.allpages ?? 1;
      tableConfig.data = res?.data?.[0]?.data ?? [];
    });
  };

  // 监听双击表格的行 点击详情
  const handleDbClick = async (params: any) => {
    detailTableConfig.column = await requestDetailHeader();
    const { data, images, message } = await requestDetailData({
      billid: params.row.finterid,
      billtypeid: reqData.billtypeid,
    });

    detailTableConfig.data = data;
    detailTableConfig.images = images;
    detailTableConfig.messages = message;

    detailCallback && detailCallback();
  };

  // 请求详情表格的头部数据
  async function requestDetailHeader() {
    const res = await httpGetEditTableColumn(reqData.billtypeid);
    return res?.data?.[0]?.data ?? [];
  }

  // 请求详情表格的数据
  async function requestDetailData(params: IBaseTableConfigType) {
    const res = await httpGetDetailTableData(reqData.billtypeid, params);
    return {
      data: res?.data?.[0]?.data ?? [],
      images: res?.atturlarray ?? [],
      message: res?.message?.[0]?.data ?? [],
    };
  }

  // 改变image
  mitter.on("update-image", (images: any) => {
    detailTableConfig.images = images;
  });

  // 改变message
  mitter.on("update-message", (messages: any) => {
    detailTableConfig.messages = messages;
  });

  getShowTableColumn();
  getTableData();

  return {
    tableConfig,
    getTableData,
    detailTableConfig,
    handleDbClick,
  };
}
