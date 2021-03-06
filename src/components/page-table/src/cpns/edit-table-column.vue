<template>
  <!-- 自定义 -->
  <template v-if="formType() == 'frowid'">
    <!-- <el-checkbox v-model="row.checked"></el-checkbox> -->
  </template>
  <!-- 普通文本 -->
  <template v-else-if="formType() == 'input'">
    <el-input
      v-model.trim="value"
      @change="handlerEnterInput($event, row, column, column.field)"
      :disabled="isDisabled(column)"
    ></el-input>
  </template>
  <!-- 数字文本 -->
  <template v-else-if="formType() == 'number'">
    <el-input-number
      class="numberInput"
      :controls="false"
      controls-position="right"
      v-model.number="value"
      size="small"
    />
  </template>
  <!-- 选择文本固定  | 单位  -->
  <template v-else-if="formType() == 'funit'">
    <el-select v-model="value" size="small" :disabled="isDisabled(column)">
      <el-option
        v-for="(item, index) in funitList"
        :key="item + ' ' + index"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </template>
  <!-- 选择文本 | 非固定 -->
  <template
    v-else-if="formType() == 'moreDropDown'"
    :disabled="isDisabled(column)"
  >
    <el-select v-model="value" size="small">
      <el-option
        v-for="(item, index) in handlerMoreList(row, column)"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </template>
  <!-- 日期 -->
  <template v-else-if="formType() == 'date'" :disabled="isDisabled(column)">
    <el-date-picker
      v-model="value"
      type="date"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
      placeholder="选择日期"
    >
    </el-date-picker>
  </template>
</template>

<script setup lang="ts">
import { httpGetGoodsInfoByCode } from "@/service/http/home/commit";
import useGetUserPrice from "@/hooks/useGetUserPrice";
import message from "@/utils/message";
import { useStore } from "@/store";
const props = withDefaults(
  defineProps<{
    modelValue: any;
    row: any;
    column: any;
    index: number;
    editFooterMethod: () => void;
    addBianmaMethod: (row: any, isRedo: boolean, index: number) => void;
  }>(),
  {}
);

const emit = defineEmits(["update:modelValue"]);

const store = useStore();
const isRedo = computed(() => {
  const config = store.state.setup.config["pc-table"]?.setup ?? [];
  const redo = config.find((item: any) => item.id == "billingRedo");
  return redo?.value ?? true;
});

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    // console.log(val);
    emit("update:modelValue", val);
  },
});

const { changeGoodPrice } = useGetUserPrice();

const funitList = computed(() => store.state.selectOptions?.arrunit ?? []);

// 判断类型
const formType = () => {
  const { column } = props;
  /**
   * 下拉菜单暂时分两种 一种是默认固定的
   * 另一种为可变的
   */
  let type = "";
  // 默认固定下拉
  if (column.property == "funit") {
    type = "funit";
  }
  // 可变下拉
  else if (column.property == "fpack" || column.property == "fcolor") {
    type = "moreDropDown";
  }

  // 日期
  else if (column.property == "fjhdate") {
    type = "date";
  }
  // 数字文本
  else if (column.params.fdatatype == "decimal") {
    type = "number";
  }
  // frowid
  else if (column.params.ffieldname == "frowid") {
    type = "frowid";
  }
  // 普通文本
  else {
    type = "input";
  }
  return type;
};

// 禁用
const isDisabled = (column: any) => {
  return column.params.freadonly == 0 ? true : false;
};

// 处理数据改变
const handleValueChange = (val: any, row: any, key: string) => {
  emit("update:modelValue", val, key, row);
};

// 处理输入框回车事件
const handlerEnterInput = async (
  val: string,
  row: any,
  column: any,
  field: string
) => {
  if (field == "fcpbianma") {
    const res = await httpGetGoodsInfoByCode(val);

    if (res.code >= 1) {
      let newRow = await changeGoodPrice(res.data[0].data[0]);
      if (isRedo.value) {
        newRow.fqty = 1;
        row = Object.assign(row, changeAmount(newRow).newRow);
      } else {
        props.addBianmaMethod &&
          props.addBianmaMethod(newRow, isRedo.value, props.index);
      }

      props.editFooterMethod && props.editFooterMethod();
    } else {
      message
        .messageBox(res.msg, "是否重置该行", res.type, false, true, false)
        .then(() => {
          // 将row所有的数据清空
          Object.keys(row).forEach((item) => {
            if (item == "_X_ROW_KEY") return;
            row[item] = "";
          });
          props.editFooterMethod && props.editFooterMethod();
        })
        .catch(() => {
          row["fcpbianma"] = "";
          row["fmodelid"] = "";
          props.editFooterMethod && props.editFooterMethod();
        });
    }
  }
};

// 改变金额
const changeAmount = (row: any) => {
  let amount = 0;
  let totalDiscount = 1;
  let totalTjAmount = 0;
  for (const key in row) {
    if (!key.indexOf("fzhekou")) {
      if (key == "fzhekouamount") continue;
      totalDiscount *= row[key] / 10 || 1;
    } else if (!key.indexOf("ftjamount")) {
      totalTjAmount += row[key];
    }
  }
  amount = row.fprice * row.fqty * totalDiscount + totalTjAmount;
  row.fweight = row.fqty * row.funitweight;
  row.famount = Math.floor(amount * 100) / 100;
  row.famountbefore = row.fprice * row.fqty + totalTjAmount;
  row.fzhekouamount = row.famountbefore - row.famount;
  const newRow = { ...row };
  return { newRow, totalDiscount, totalTjAmount };
};

// 根据类型获取数据
const handlerMoreList = (row: any, column: any) => {
  // format
  function formatList(value: string) {
    if (!value) return;
    return value
      .slice(1, value.length - 1)
      .replace(/'/g, "")
      .split(",");
  }

  const currentKey = column.params.ffieldname;
  const keys = [
    { key: "fcolor", rowKey: "fysarray", downListKey: "arrcolor" },
    { key: "fpack", rowKey: "fggarray", downListKey: "arrpack" },
  ];
  const find = keys.find((item) => item.key == currentKey);
  if (!find) return [];
  const token = store.state.login.token;

  if (token.multi_specifications == "1") {
    return (
      formatList(row[find.rowKey]) ??
      store.state.selectOptions?.[find.downListKey] ??
      []
    );
  } else {
    return store.state.selectOptions?.[find.downListKey] ?? [];
  }
};
</script>

<style scoped>
.numberInput {
  width: 100%;
}
</style>
