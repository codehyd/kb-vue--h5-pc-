<template>
  <div class="page-descriptions">
    <el-row>
      <el-col v-for="item in config" :key="item.field" v-bind="colLayStyle">
        <div class="dataList">
          <div class="label">{{ item.label }}</div>
          <div class="content">
            <template v-if="!edit">
              {{ formatContent(data[item.field], item.custormKeys) }}
              <template
                v-if="
                  formatContent(data[item.field], item.custormKeys) == '' ||
                  formatContent(data[item.field], item.custormKeys) == ' '
                "
              >
                <span style="color: #d3d4d6">暂无{{ item.label }}信息</span>
              </template>
            </template>

            <!-- 修改模式 -->
            <template v-else>
              <form-item
                v-bind="item"
                v-model="currentData[item.field]"
              ></form-item>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { IPageDesciptionType } from "../type";
import FormItem from "./cpns/form-item.vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    extra?: string;
    data?: object;
    config?: IPageDesciptionType[];
    edit?: boolean;
  }>(),
  {
    edit: false,
    title: "",
    extra: "",
    data: () => {
      return {};
    },
    config: () => {
      return [] as IPageDesciptionType[];
    },
  }
);

const emit = defineEmits(["update:data"]);

const size = "small";

const currentData = ref<any>({});
const oraginData: any = {};
const currentConfig = props.config ?? [];
currentConfig.forEach((item) => {
  oraginData[item.field] = "";
});
currentData.value = { ...oraginData };

const colLayStyle = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
};

const formatContent = (value: string | number, keys?: string[]) => {
  if (keys) {
    return keys.map((item) => props.data[item]).join(" ");
  } else if (value == 0) {
    return "";
  }
  return value ?? "";
};

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<style lang="less" scoped>
.page-descriptions {
  margin: 0 0 10px;
}

.dataList {
  display: flex;

  height: 100%;
  .label {
    display: flex;
    align-items: center;
    width: 100px;
    padding: 8px 11px;
    background-color: #f5f7fa;
    // border-right: 1px solid #ebeef5;
    border: 1px solid #ebeef5;
    // margin-left: -1px;
    // margin-top: -1px;
  }
  .content {
    position: relative;
    border: 1px solid #ebeef5;
    margin-left: -1px;
    margin-top: -1px;
    padding: 8px 11px;

    flex: 1;
  }
}

&:deep(.no-border .el-input__inner) {
  box-shadow: none;
}
</style>
