<template>
  <div class="sales-data" v-if="isShowPanel">
    <kb-card>
      <template #title>
        <div class="title-content">
          <div class="title">{{ activeText }}销售数据</div>
          <div class="actions">
            <el-dropdown @command="handleItemClick">
              <span class="el-dropdown-link">
                {{ activeText }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="item in activeList" :key="item.flag">
                    <el-dropdown-item :command="item">
                      {{ item.text }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>

      <div class="content">
        <el-row class="elRow" :gutter="10">
          <el-col class="elCol" v-bind="colStyle">
            <div class="item">
              <i class="icon-xiaoshoujine fontIcon"></i>
              <div class="item-content">
                <div class="item-value price">¥{{ data1 }}</div>
                <div class="item-title">
                  销售金额(共{{ salesData.fsale_count }}份单)
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="elCol" v-bind="colStyle">
            <div class="item">
              <i class="icon-tuihuojine fontIcon"></i>
              <div class="item-content">
                <div class="item-value price">¥{{ data2 }}</div>
                <div class="item-title">
                  退货金额(共{{ salesData.ftuihuo_count }}份单)
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="elCol" v-bind="colStyle">
            <div class="item">
              <i class="icon-shoufeigongzuotai_jinrishishoujine fontIcon"></i>
              <div class="item-content">
                <div class="item-value price">¥{{ data3 }}</div>
                <div class="item-title">
                  实收金额(免收额{{ salesData.fmianshou_amount }})
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="elCol" v-bind="colStyle">
            <div class="item">
              <i class="icon-lirunshuai fontIcon"></i>
              <div class="item-content">
                <div class="item-value price">{{ data4 }}</div>
                <div class="item-title">
                  利润额(利润率{{ salesData.flirunlv }}%)
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </kb-card>
  </div>
</template>

<script setup lang="ts">
import KbCard from "@/components/card";
import { IActiveListType, activeList } from "../config/sales-data-config";
import { useStore } from "@/store";
import format from "@/utils/format";
const store = useStore();

const activeText = ref(activeList[0].text);

store.dispatch("home/getSalesData", activeList[0].flag);
const salesData = computed(
  () => store.state.home.salesData?.data?.[0]?.data?.[0]
);

const isShowPanel = computed(() =>
  store.state.home.salesData?.code >= 1 ? true : false
);

const handleItemClick = (item: IActiveListType) => {
  activeText.value = item.text;
  store.dispatch("home/getSalesData", item.flag);
};

const colStyle = { xs: 24, sm: 12, md: 12, lg: 6, xl: 6 };

const data1 = computed(() => {
  let val = salesData.value?.fsale_amount ?? 0;
  return format.formatMoney(val * 100);
});

const data2 = computed(() => {
  let val = salesData.value?.ftuihuo_amount ?? 0;
  return format.formatMoney(val * 100);
});

const data3 = computed(() => {
  let val = salesData.value?.fshoukuan_amount ?? 0;
  return format.formatMoney(val * 100);
});

const data4 = computed(() => {
  let val = salesData.value?.fsale_lirun ?? 0;
  return format.formatMoney(val * 100);
});

// const handleListClick = (item: any) => {
//   console.log(item);
// };
</script>

<style lang="less" scoped>
.sales-data {
  margin: 0 0 10px 0;
}
.title-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .el-dropdown-link {
    cursor: pointer;
  }
}

.content {
  .elRow {
    height: 100%;
    margin: 0 0 -10px 0;
    .elCol {
      margin: 0 0 10px 0;
      .item {
        display: flex;
        align-items: center;
        background-color: #d3dce6;
        border-radius: 6px;
        padding: 10px;
        height: 100%;

        .fontIcon {
          font-size: 40px;
        }
        .item-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 10px;
          height: 100%;
          .item-value {
            font-size: 18px;
            font-weight: 700;
          }
          .item-title {
            font-weight: 600;
          }
        }
      }
    }
  }
}

.price {
  color: red;
}
</style>
