import { VxeTableEvents } from "vxe-table";
import BaseTable from "@/base-ui/table";
import {
  httpAuditBild,
  httpPrintBild,
  httpGetDetailBild,
  httpDeleteBild,
} from "@/service/http/home/commit";
import { useStore } from "@/store";
import message from "@/utils/message";

type callback = (data?: any) => void;
export default function (
  auditCallback?: callback,
  printCallback?: callback,
  detailCallback?: callback,
  deleteCallback?: callback,
  payCallback?: callback
) {
  const store = useStore();
  const baseTableRef = ref<InstanceType<typeof BaseTable>>();

  const handleMenuClick: VxeTableEvents.MenuClick = (params) => {
    const { menu, row, column } = params;
    console.log(row);
    const menuAction = {
      audit: () => onAudit(row),
      print: () => onPrint(row),
      detail: () => onDetail(row),
      delete: () => onDelete(row),
      pay: onPay,
    };

    menuAction[menu.code!] && menuAction[menu.code!](row, column);
  };

  // 审核
  async function onAudit(row: any) {
    const res = await httpAuditBild({
      billid: row.finterid,
      billtypeid: row.ftype,
    });
    if (res.code >= 1) {
      row["fbillstatus"] = "已审核";
      row["fauditor"] = store.state.login.token.uname;
      auditCallback && auditCallback();
    }
    message.show(res.msg, res.type);
  }
  // 打印
  async function onPrint(row: any) {
    const res = await httpPrintBild({
      billid: row.finterid,
      billtypeid: row.ftype,
    });
    if (res.code >= 1) {
      printCallback && printCallback({ ...res });
    } else {
      message.show(res.msg, res.type);
    }
  }
  // 详情
  async function onDetail(row: any) {
    const res = await httpGetDetailBild({
      billid: row.finterid,
      billtypeid: row.ftype,
    });
    if (res.code >= 1) {
      detailCallback && detailCallback({ ...res });
    } else {
      message.show(res.msg, res.type);
    }
  }
  // 删除
  async function onDelete(row: any) {
    const res = await httpDeleteBild({
      billid: row.finterid,
      billtypeid: row.ftype,
    });
    if (res.code >= 1) {
      deleteCallback && deleteCallback({ row, res });
    }
    message.show(res.msg, res.type);
  }

  // 收款
  function onPay() {
    console.log(15);
  }

  return {
    handleMenuClick,
    onAudit,
    onPrint,
    onDetail,
    onDelete,
    onPay,
    baseTableRef,
  };
}
