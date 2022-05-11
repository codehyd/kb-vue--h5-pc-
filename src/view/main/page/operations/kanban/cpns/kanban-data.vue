<template>
  <div class="sales-panel">
    <div class="statistics">
      <div>
        <em>销售金额</em>
        <span>
          <i class="iconfont icon-xiaoshoujine"></i>
          <statistic :value="data.fsale_amount"></statistic>
        </span>
      </div>
      <div>
        <em>销售笔数</em>
        <span>
          <i class="iconfont icon-xiaoshoubishu"></i>
          <statistic :value="data.fsale_count"></statistic>
        </span>
      </div>
      <div>
        <em>免收金额</em>
        <span>
          <i class="iconfont icon-bimianshoufei"></i>
          <statistic :value="data.fmianshou_amount"></statistic>
        </span>
      </div>
      <div>
        <em>退货金额</em>
        <span
          ><i class="iconfont icon-tuihuojine"></i>
          <statistic :value="data.ftuihuo_count"></statistic>
        </span>
      </div>
      <div>
        <em>退货笔数</em>
        <span>
          <i class="iconfont icon-tuihuobishu"></i>
          <statistic :value="data.ftuihuo_count"></statistic>
        </span>
      </div>
      <div>
        <em>收款金额</em>
        <span>
          <i class="iconfont icon-shoukuanjine"></i>
          <statistic :value="data.fshoukuan_amount"></statistic>
        </span>
      </div>
      <div>
        <em>销售利润</em>
        <span>
          <i class="iconfont icon-xiaoshoulirun"></i>
          <statistic :value="data.fsale_lirun"></statistic>%
        </span>
      </div>
      <div>
        <em>利润率</em>
        <span>
          <i class="iconfont icon-shoukuanjine"></i>
          <statistic :value="data.flirunlv"></statistic>%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";
import format from "@/utils/format";
import statistic from "@/base-ui/statistic";
const props = withDefaults(
  defineProps<{
    data?: any;
  }>(),
  {
    data: () => {
      return {};
    },
  }
);

const formatAmount = (amount: number) => {
  if (!amount) return "暂无数据";
  return " " + format.formatMoney(amount * 100) + "(元)";
};

const formatCount = (count: number) => {
  if (!count) return "暂无数据";
  return count;
};
</script>

<style scoped lang="less">
.statistics {
  display: flex;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    cursor: pointer;
    transition: all 0.6s;
    // box-shadow: none !important;
    border: 1px solid #e9e9e9;
    background-size: cover;
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    span {
      display: flex;
      align-items: center;
      font-size: 14px;
      .iconfont {
        margin: 0 10px 0 0;
      }
    }

    em {
      margin: 0 0 5px 0;
    }
  }
}
.iconfont {
  font-size: 18px;
}
</style>
