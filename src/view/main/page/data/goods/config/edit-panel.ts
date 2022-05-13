import { IForm } from "@/base-ui/base-form";
import { useStore } from "@/store";
import { watchEffect, computed, ref } from "vue";
export default function () {
  const store = useStore();
  const dropList = computed(() => store.state.selectOptions);
  const unit = ref([]);
  const classList = ref([]);

  watchEffect(() => {
    unit.value = dropList.value?.arrunit ?? [];
    classList.value = dropList.value?.arrcpfirstclass ?? [];
  });

  const plusFormConfig: IForm = {
    colLayout: {
      xl: 6, // >1920px 4个
      lg: 12,
      md: 24,
      sm: 24,
      xs: 24,
    },
    formItems: [
      {
        type: "input",
        field: "fxinghao",
        label: "商品名称",
        placeholder: "请输入商品名称",
        rules: [
          {
            required: true,
            message: "商品名称不能为空",
          },
        ],
      },
      {
        type: "select",
        field: "funit",
        label: "计量单位",
        placeholder: "请选择计量单位",
        rules: [
          {
            required: true,
            message: "计量单位不能为空",
          },
        ],
        options: dropList.value?.arrunit ?? [],
      },
      {
        type: "select",
        field: "ffirstclassname",
        label: "商品分类",
        placeholder: "请选择商品分类",
        options: dropList.value?.arrcpfirstclass ?? [],

        rules: [
          {
            required: true,
            message: "商品分类不能为空",
          },
        ],
      },
      {
        type: "input",
        field: "fname",
        label: "品牌描述",
        placeholder: "请输入品牌描述",
      },
      {
        type: "input",
        field: "fguige",
        label: "型号规格",
        placeholder: "请输入型号规格",
      },

      {
        type: "input",
        field: "fbianma",
        label: "货号/编号",
        placeholder: "请输入编号",
      },
      {
        type: "input",
        field: "ftiaoma",
        label: "商品条码",
        placeholder: "请输入商品条码",
      },

      {
        type: "number",
        field: "ffactoryprice",
        label: "面价",
        placeholder: "请输入面价",
      },
      {
        type: "number",
        field: "fcbprice",
        label: "成本价",
        placeholder: "请输入成本价",
      },
      {
        type: "number",
        field: "findex",
        label: "排序顺序",
        placeholder: "请输入排序顺序 越小越靠前",
        rules: [
          {
            required: false,
            pattern: /^-?[1-9]\d*$/,
            message: "排序顺序不能为0",
          },
        ],
      },
      {
        type: "textarea",
        field: "fmemo",
        label: "备注",
        placeholder: "请输入备注",
        col: {
          xl: 24, // >1920px 4个
          lg: 24,
          md: 24,
          sm: 24,
          xs: 24,
        },
      },
    ],
  };
  return {
    plusFormConfig,
  };
}
