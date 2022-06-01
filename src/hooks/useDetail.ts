import { IDetailTableConfig } from "@/components/page-table";
import {
  httpAuditBild,
  httpGetDetailTableData,
  httpGetEditTableColumn,
  httpPrintBild,
} from "@/service/http/home/commit";

//导入全部配置
import { detailTableConfig as detail103 } from "@/view/main/page/sales/delivery/config/bild-query-content";
import { detailTableConfig as detail102 } from "@/view/main/page/sales/order/config/bild-query-content";
import { detailTableConfig as detail101 } from "@/view/main/page/sales/quote/config/bild-query-content";
import { detailTableConfig as detail105 } from "@/view/main/page/sales/refund/config/bild-query-content";
import { detailTableConfig as detail4000 } from "@/view/main/page/sales/productionplanner/config/bild-query-content";
import { detailTableConfig as detail111 } from "@/view/main/page/procurement/order/config/bild-query-content";
import { detailTableConfig as detail112 } from "@/view/main/page/procurement/storage/config/bild-query-content";
import { detailTableConfig as detail114 } from "@/view/main/page/procurement/refund/config/bild-query-content";
import { detailTableConfig as detail1 } from "@/view/main/page/store/warehousing/config/bild-query-content";
import { detailTableConfig as detail2 } from "@/view/main/page/store/exits/config/bild-query-content";

import mitter from "@/mitt";

import DetailPanel from "@/components/bild-query-content/src/cpns/detail-panel.vue";
import message from "@/utils/message";

import { useStore } from "@/store";
import PagePrint from "@/components/page-print";

export default function () {
  const store = useStore();

  const billtypeid = ref<any>("");
  const detailPanelRef = ref<InstanceType<typeof DetailPanel>>();
  const pagePrintRef = ref<InstanceType<typeof PagePrint>>();

  const isShowPrice = ref(false);
  const url = ref("");

  const detailTableConfig: IDetailTableConfig = reactive({
    keyString: "",
    showAction: false,
    title: "",
    state: "detail",
  });

  const handleActiveClick = (...params: any) => {
    const type = params[0];
    const rows = params[1];
    console.log(type, rows);

    const active = {
      audit: () => onAudit(rows),
      print: () => onPrint(rows),
      anotherList: () => onAnotherList(params, rows),
    };

    active[type] && active[type]();
  };

  const detailClick = async (item: any) => {
    console.log(item);
    const config = formatClientData(item);
    billtypeid.value = item.ftype;
    const res = await httpGetDetailTableData(item.ftype, {
      billid: item.finterid,
      billtypeid: item.ftype,
    });
    if (res.code >= 1) {
      const column = await httpGetEditTableColumn(item.ftype);
      detailTableConfig.column = column?.data?.[0]?.data ?? [];
      detailTableConfig.data = res?.data?.[0]?.data ?? [];
      detailTableConfig.title = item.fbillname;
      detailTableConfig.images = res?.atturlarray ?? [];
      detailTableConfig.messages = res?.message?.[0]?.data ?? [];
      detailTableConfig.clientConfig = config?.clientConfig;
      detailTableConfig.active =
        config?.active?.filter((item) => item.type != "anotherList") ?? [];
      detailTableConfig.status = config?.status;
      detailPanelRef.value.isShowPanel = true;
    }
  };

  mitter.on("page-update-image", (image) => {
    detailTableConfig.images = image;
  });

  mitter.on("page-update-message", (message) => {
    detailTableConfig.messages = message;
  });

  function formatClientData(item: any) {
    const config = [
      { id: 103, config: detail103 },
      { id: 102, config: detail102 },
      { id: 101, config: detail101 },
      { id: 105, config: detail105 },
      { id: 4000, config: detail4000 },
      { id: 111, config: detail111 },
      { id: 112, config: detail112 },
      { id: 114, config: detail114 },
      { id: 1, config: detail1 },
      { id: 2, config: detail2 },
    ];

    console.log(config);
    return config.find((configItem: any) => configItem.id == item.ftype)
      ?.config;
  }

  function onAudit(rows: any) {
    message.confirm(`确定审核${rows[0].fbillno}吗？`, async () => {
      const res = await httpAuditBild({
        billid: rows[0].finterid,
        billtypeid: billtypeid.value,
      });
      if (res.code >= 1) {
        rows[0]["fbillstatus"] = "已审核";
        rows[0]["fauditor"] = store.state.login.token.uname;
      }
      message.show(res.msg, res.type);
    });
  }

  async function onPrint(rows: any) {
    const res = await httpPrintBild({
      billid: rows[0].finterid,
      billtypeid: billtypeid.value,
    });
    if (res.code >= 1) {
      pagePrintRef.value!.show = true;
      url.value = res.url;
    } else {
      message.show(res.msg, res.type);
    }
  }

  const router = useRouter();
  function onAnotherList(params: any, rows: any) {
    console.log(params, rows);
  }

  return {
    detailClick,
    billtypeid,
    detailTableConfig,
    detailPanelRef,
    handleActiveClick,
    isShowPrice,
    url,
    pagePrintRef,
  };
}
