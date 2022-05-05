<template>
  <div class="good-list-item">
    <el-row :gutter="20">
      <template v-for="(item, index) in data" :key="'good' + item.fmodelid">
        <el-col v-bind="colLayout">
          <el-card class="goodItem" shadow="hover">
            <template #header>
              <div class="header">
                <top-tip-content
                  style="font-weight: 600"
                  :title="mapCardTitle(item)"
                ></top-tip-content>
                <el-button type="text" @click="handlerBtnClick(item, index)">
                  查看详情
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
                  <span class="label">产品名称:</span>
                  <span :class="{ noInfo: !item.fxinghao }">
                    {{ item.fxinghao || "暂无产品名称信息" }}</span
                  >
                </div>
                <div>
                  <span class="label">品牌: </span>
                  <span :class="{ noInfo: !item.fname }">{{
                    item.fname || "暂无品牌信息"
                  }}</span>
                </div>
                <div>
                  <span class="label">规格: </span>
                  <span :class="{ noInfo: !item.fguige }">{{
                    item.fguige || "暂无规格信息"
                  }}</span>
                </div>
                <div>
                  <span class="label">编码:</span>
                  <span :class="{ noInfo: !item.fbianma }">
                    {{ item.fbianma || "暂无规格信息" }}</span
                  >
                </div>
                <div class="row">
                  <div>
                    <span class="label">面价: </span>
                    <span style="color: red; font-weight: 600"
                      >¥{{ item.ffactoryprice }}</span
                    >
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
  </div>
</template>

<script setup lang="ts">
import TopTipContent from "@/components/top-tip-content";
import mitter from "@/mitt";
const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
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
</script>

<style scoped lang="less">
.good-list-item {
  font-size: 12px;
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
