<template>
  <div class="good-list-item">
    <kb-loading v-if="loading"></kb-loading>
    <el-row :gutter="20">
      <template
        v-for="(item, index) in newGoodList"
        :key="'good' + item.fmodelid"
      >
        <el-col v-bind="colLayout">
          <el-card class="goodItem" shadow="hover">
            <template #header>
              <div class="header">
                <top-tip-content
                  style="font-weight: 600"
                  :title="mapCardTitle(item)"
                ></top-tip-content>
                <el-button type="text" @click="handlerBtnClick(item, index)">
                  {{ cardText }}
                </el-button>
              </div>
            </template>
            <div class="info">
              <div class="image">
                <el-image
                  :src="item.furl"
                  :fit="'fill'"
                  :preview-src-list="[item.furl]"
                  :style="{ width: '75px', height: '75px' }"
                ></el-image>
              </div>
              <div class="content">
                <div>
                  <span class="label">产品名称: </span>
                  <span :class="{ noInfo: !item.fxinghao }">
                    {{ item.fxinghao || "暂无产品名称信息" }}</span
                  >
                </div>
                <div>
                  <span class="label">品牌: </span>
                  <span :class="{ noInfo: !item.fname }">
                    {{ item.fname || "暂无品牌信息" }}
                  </span>
                </div>
                <div>
                  <span class="label">规格: </span>
                  <span :class="{ noInfo: !item.fguige }">
                    {{ item.fguige || "暂无规格信息" }}
                  </span>
                </div>
                <div>
                  <span class="label">编码: </span>
                  <span :class="{ noInfo: !item.fbianma }">
                    {{ item.fbianma || "暂无编码信息" }}
                  </span>
                </div>
                <div>
                  <span class="label">条码: </span>
                  <kb-barcode
                    v-if="!loading"
                    :barcode="item.ftiaoma"
                    card
                  ></kb-barcode>
                  <!-- <span :class="{ noInfo: !item.ftiaoma }">
                    {{ item.ftiaoma || "暂无条码信息" }}
                  </span> -->
                </div>
                <div class="row">
                  <div>
                    <span class="label">面价: </span>
                    <span style="color: red; font-weight: 600">
                      ¥{{ item.ffactoryprice }}
                    </span>
                  </div>
                  <div>
                    <span class="label">存货: </span>{{ item.fstockqty }}
                    <el-tag effect="dark" size="small">
                      {{ item.funit }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <template v-if="data.length == 0 && !loading">
      <el-empty description="暂无内容">
        <el-button v-if="datPanel" @click="handleBtnClick" type="primary">
          添加商品
        </el-button>
      </el-empty>
    </template>
  </div>
</template>

<script setup lang="ts">
import mitter from "@/mitt";
import TopTipContent from "@/components/top-tip-content";
import KbLoading from "@/base-ui/loading";
import KbBarcode from "@/base-ui/barcode";
const props = withDefaults(
  defineProps<{
    data: any;
    cardText?: string;
    datPanel?: boolean;
  }>(),
  {
    cardText: "查看详情",
    datPanel: false,
  }
);

const emit = defineEmits(["edit-good"]);
const colLayout = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
};

const mapCardTitle = (item: any) => {
  return !item.fname
    ? item.fname + item.fxinghao
    : item.fname + " / " + item.fxinghao;
};

const handlerBtnClick = (item: any, index: number) => {
  // mitter.emit("edit-good", { item, index });
  emit("edit-good", { item, index });
};

const newGoodList = ref<any[]>([]);
const loading = ref(true);

watchEffect(() => {
  loading.value = true;
  const newData = [...(props.data ?? [])];
  // 1秒后渲染数据
  setTimeout(() => {
    nextTick(() => {
      newGoodList.value = newData;
      loading.value = false;
    });
  }, 1500);

  // newGoodList.value = newData;
});

const handleBtnClick = () => {
  mitter.emit("add-good");
};
</script>

<style scoped lang="less">
.good-list-item {
  font-size: 12px;
  padding: 20px 0;
}
.goodItem {
  width: 100%;
  margin: 0 0 20px 0;
  &:deep(.el-card__header) {
    padding: 10px;
  }
  .header {
    display: flex;
    align-items: center;
    .title {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 700;
    }
  }

  .info {
    display: flex;
    .content {
      flex: 1;
      overflow: hidden;
      margin: 0 0 0 10px;
      .label {
        font-weight: 600;
      }
      .noInfo {
        color: #dadbdc;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > div {
          flex: 1;
        }
      }
      & > div {
        margin: 0 0 10px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
