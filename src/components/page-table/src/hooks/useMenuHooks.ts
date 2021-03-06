import { VxeTableEvents } from "vxe-table";
import BaseTable from "@/base-ui/table";
import {
  httpAuditBild,
  httpPrintBild,
  httpGetDetailTableData,
  httpDeleteBild,
  IBillid,
} from "@/service/http/home/commit";
import { useStore } from "@/store";
import message from "@/utils/message";

type callback = (data?: any) => void;
export default function (
  billtypeid: IBillid,
  auditCallback?: callback,
  printCallback?: callback,
  detailCallback?: callback,
  deleteCallback?: callback,
  payCallback?: callback
) {
  const router = useRouter();

  const store = useStore();
  const baseTableRef = ref<InstanceType<typeof BaseTable>>();

  const handleMenuClick: VxeTableEvents.MenuClick = (params) => {
    const { menu, row, column } = params;
    if (!row) return;
    const menuAction = {
      audit: () => onAudit(row),
      print: () => onPrint(row),
      detail: () => onDetail(row),
      delete: () => onDelete(row),
      editDelete: () => onEditDelete(row),
      pay: () => onPay(row),
      payment: () => onPayment(row),
    };

    menuAction[menu.code!] && menuAction[menu.code!](row, column);
  };

  // 审核
  function onAudit(row: any) {
    message.confirm(`确定审核${row.fbillno}吗？`, async () => {
      const res = await httpAuditBild({
        billid: row.finterid,
        billtypeid: billtypeid,
      });
      if (res.code >= 1) {
        row["fbillstatus"] = "已审核";
        row["fauditor"] = store.state.login.token.uname;
        auditCallback && auditCallback();
      }
      message.show(res.msg, res.type);
    });
  }
  // 打印
  async function onPrint(row: any) {
    const res = await httpPrintBild({
      billid: row.finterid,
      billtypeid: billtypeid,
    });
    if (res.code >= 1) {
      printCallback && printCallback({ ...res });
    } else {
      message.show(res.msg, res.type);
    }
  }

  // 详情
  async function onDetail(row: any) {
    const res = await httpGetDetailTableData(billtypeid, {
      billid: row.finterid,
      billtypeid: billtypeid,
    });
    if (res.code >= 1) {
      detailCallback && detailCallback({ ...res });
    } else {
      message.show(res.msg, res.type);
    }
  }
  // 删除
  function onDelete(row: any) {
    message.confirm(
      `确定删除${row.fbillno}单据吗? 当前单据状态:${row.fbillstatus}`,
      async () => {
        const res = await httpDeleteBild({
          billid: row.finterid,
          billtypeid: billtypeid,
        });
        if (res.code >= 1) {
          deleteCallback && deleteCallback({ row, res });
        }
        message.show(res.msg, res.type);
      }
    );
  }
  // 删除
  function onEditDelete(row: any) {
    baseTableRef.value?.remove(row);
    message.success("删除成功");
  }

  // 收款
  function onPay(row: any) {
    router.push({
      name: "financeCollections",
      params: {
        // url需要转化url格式
        row: encodeURIComponent(JSON.stringify(row)),
      },
    });
  }

  // 付款
  function onPayment(row: any) {
    router.push({
      name: "financePurchase",
      params: {
        // url需要转化url格式
        row: encodeURIComponent(JSON.stringify(row)),
      },
    });
  }

  // --------------------------------------

  // 因为组件ref在这里所以需要在这里定义

  // 获取表格数据
  const getTableData = () => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.getTableData();
    }
  };

  // 重载表格数据
  const reloadData = (row: any, isReload: boolean = false) => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.loadTableData(row, isReload);
    }
  };

  // 重载表格数据
  const getInitColumn = () => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.getInitColumn();
    }
  };

  const loadingNewColumn = () => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.loadingNewColumn();
    }
  };

  const removeSelectData = (rows?: any) => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.removeSelectData(rows);
    }
  };

  const removeAllData = () => {
    const baseTable = baseTableRef.value;
    if (baseTable) {
      return baseTable.removeAllData();
    }
  };

  return {
    handleMenuClick,
    onAudit,
    onPrint,
    onDetail,
    onDelete,
    onPay,
    onPayment,
    baseTableRef,
    getTableData,
    reloadData,
    getInitColumn,
    loadingNewColumn,
    removeSelectData,
    removeAllData,
  };
}
