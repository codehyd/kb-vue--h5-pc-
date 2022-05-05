<template>
  <div class="client-list-item">
    <el-row :gutter="20">
      <template v-for="(item, index) in data" :key="'client' + item.fmodelid">
        <el-col v-bind="colLayout">
          <el-card class="clientItem" shadow="hover">
            <template #header>
              <div class="header">
                <top-tip-content
                  style="font-weight: 600"
                  :title="item.fcsname"
                ></top-tip-content>
                <el-button type="text" @click="handlerBtnClick(item, index)"
                  >查看详情</el-button
                >
              </div>
            </template>
            <div class="info">
              <div class="image">
                <el-avatar shape="square"> {{ item.fcsname[0] }} </el-avatar>
              </div>
              <div class="content">
                <div>
                  <span class="label">客户类型:</span>
                  <span :class="{ noInfo: !item.fcstype }">{{
                    item.fcstype || "暂无客户分类信息"
                  }}</span>
                </div>
                <div>
                  <span class="label">客户编码: </span>
                  <span :class="{ noInfo: !item.fbianma }">
                    {{ item.fbianma || "暂无客户编码信息" }}</span
                  >
                </div>
                <div>
                  <span class="label">联系方式: </span>
                  <span
                    :class="{
                      noInfo:
                        item.flinker + ' ' + item.flinkerphone == ' '
                          ? true
                          : false,
                    }"
                  >
                    {{
                      item.flinker + " " + item.flinkerphone == " "
                        ? "暂无联系方式信息"
                        : item.flinker + " " + item.flinkerphone
                    }}
                  </span>
                </div>
                <div>
                  <span class="label">手机号码:</span>
                  <span :class="{ noInfo: !item.fphone }">{{
                    item.fphone || "暂无手机号码信息"
                  }}</span>
                </div>
                <div>
                  <span class="label">业务员:</span>
                  <span :class="{ noInfo: !item.fyewuyuan }">{{
                    item.fyewuyuan || "暂无业务员信息"
                  }}</span>
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
const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {}
);
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
  // emit("btnClick", item, index);
};
</script>

<style scoped lang="less">
.clientItem {
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
