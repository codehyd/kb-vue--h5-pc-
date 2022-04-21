// 关于自定义表格的属性
import { useStore } from "@/store";

export default function (mode: "query" | "detail") {
  const store = useStore();

  // 表格最大的高度
  const maxHeight = computed(() => {
    let maxHeight;
    // 查询模式
    if (mode == "query") {
      maxHeight =
        store.state.setup.config?.["pc-table"]?.setup?.find(
          (item: any) => item.id == "queryTableMaxHeight"
        )?.value ?? 700;
    } else if (mode == "detail") {
      maxHeight =
        store.state.setup.config?.["pc-table"]?.setup?.find(
          (item: any) => item.id == "detailTableMaxHeight"
        )?.value ?? 700;
    }
    return maxHeight ?? 700;
  });

  // 是否根据内容自动调整列宽
  const isAutoColumnWidth = computed(
    () =>
      store.state.setup.config?.["pc-table"]?.setup?.find(
        (item: any) => item.id == "isAutoWidth"
      )?.value ?? false
  );
  // 是否显示省略号
  const isShowOverFlow = computed(
    () =>
      store.state.setup.config?.["pc-table"]?.setup?.find(
        (item: any) => item.id == "isShowOverFlow"
      )?.value ?? false
  );

  return {
    maxHeight,
    isAutoColumnWidth,
    isShowOverFlow,
  };
}
