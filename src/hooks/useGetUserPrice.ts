import { httpGetUserPrice } from "@/service/http/home/commit";

import { useStore } from "@/store";

export default function () {
  const store = useStore();

  const changeGoodPrice = async (row: any) => {
    // 判断row是否有fmodelid 如果没有则跳过
    if (!row.fmodelid) {
      return row;
    }
    const res = await httpGetUserPrice({
      modelids: row.fmodelid,
      csid: store.state.bild.currentInfo.fitemid ?? 0,
      color: row?.fcolor ?? "",
      pack: row?.fpack ?? "",
      billtypeid: store.state.bild.billtypeid,
    });
    if (res.code >= 1) {
      const zhekou = res.data[0].fzhekou == 0 ? 1 : res.data[0].fzhekou / 10;
      row.fprice = res.data[0].fprice * zhekou;
      row.fzhekou = zhekou == 1 ? 0 : zhekou;
      row.fcurrentstockqty = res.data[0].fcurrentstockqty;
    }
    return row;
  };

  return {
    changeGoodPrice,
  };
}
