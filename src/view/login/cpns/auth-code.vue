<template>
  <div
    class="ValidCode disabled-select"
    :style="`width:${width}; height:${height}`"
    @click="refreshCode"
  >
    <span
      v-for="(item, index) in verifyCodeList.code"
      :key="index"
      :style="getStyle(item)"
      >{{ item.code }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { defineComponent, reactive } from "vue";

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    length?: number;
  }>(),
  {
    width: "70px",
    height: "30px",
    length: 4,
  }
);

const store = useStore();

const verifyCodeList: any = reactive({
  code: [],
});

const getStyle = (data: any) => {
  return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
};

const createdCode = () => {
  const len = props.length;
  const codeList = [];
  const chars = "0123456789";
  const charsLen = chars.length;
  // 生成
  for (let i = 0; i < len; i++) {
    const rgb = [
      Math.round(Math.random() * 220),
      Math.round(Math.random() * 240),
      Math.round(Math.random() * 200),
    ];
    codeList.push({
      code: chars.charAt(Math.floor(Math.random() * charsLen)),
      color: `rgb(${rgb})`,
      fontSize: `${10 + (+[Math.floor(Math.random() * 10)] + 6)}px`,
      padding: `${[Math.floor(Math.random() * 10)]}px`,
      transform: `rotate(${
        Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
      }deg)`,
    });
  }
  // 指向
  verifyCodeList.code = codeList;
  // 将当前数据派发出去
  let code = codeList.map((item) => item.code).join("");
  store.commit("changeAuthCode", code);
  // this.$emit("input", codeList.map((item) => item.code).join(""))
};
createdCode();

// 点击刷新验证码
const refreshCode = () => createdCode();

defineExpose({
  refreshCode,
});
</script>

<style lang="less" scoped>
.ValidCode {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    display: inline-block;
  }
}
</style>
