<template>
  <div class="page-goods-table">
    <kb-dialog :top="2" appendToBody v-model:show="show" title="商品信息">
      <el-input v-model="goodTableConfig.tj">
        <template #append>
          <span class="searchInput">搜索</span>
        </template>
      </el-input>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <template
          v-for="item in goodTableConfig.classList"
          :key="item.fclassid"
        >
          <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
        </template>
      </el-tabs>
      <span class="tip">
        <kb-icon name="InfoFilled" flag="elIcon"></kb-icon>
        商品图片将在双击时显示
      </span>
      <page-table
        @db-click="handleDbClick"
        :table-config="goodTableConfig"
      ></page-table>

      <kb-dialog
        v-model:show="goodPanelShow"
        :width="70"
        title="添加商品信息"
        :top="4"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="currentGoodInfo.furl"
          :preview-src-list="[currentGoodInfo.furl]"
          fit="cover"
        />
        <div class="content">
          <div class="select">
            {{ currentGoodInfo.fcpxinghao }} {{ currentGoodInfo.fcpname }}
          </div>
          <div class="bianma">
            编码:
            <span> {{ currentGoodInfo.fbianma }} </span>
            <span class="notInfo" v-if="!currentGoodInfo.fbianma">
              暂无编码
            </span>
          </div>
          <div class="tiaoma">
            <div>
              条码:
              <span>{{ currentGoodInfo.ftiaoma }}</span>
              <span class="notInfo" v-if="!currentGoodInfo.ftiaoma">
                暂无条码
              </span>
            </div>
            <div v-if="currentGoodInfo.ftiaoma">
              <base-barcode
                :height="40"
                :barcode="currentGoodInfo.ftiaoma"
              ></base-barcode>
            </div>
          </div>
          <div class="size">
            规格:
            <span>{{ currentGoodInfo.fguige }}</span>
            <span class="notInfo" v-if="!currentGoodInfo.fguige">暂无规格</span>
          </div>
          <div class="store">
            <span style="margin: 0 10px 0 0">
              库存:{{ currentGoodInfo.fstockqty }}
            </span>
            <el-tag>{{ currentGoodInfo.funit }}</el-tag>
          </div>
          <div class="price">
            面价:
            <span class="priceText">¥{{ currentGoodInfo.fprice }}</span>
          </div>

          <div class="memo">
            备注:
            <span>{{ currentGoodInfo.fmemo }}</span>
            <span class="notInfo" v-if="!currentGoodInfo.fmemo">暂无备注</span>
          </div>

          <!-- 编辑区 -->
          <el-divider class="elDivider" content-position="left">
            编辑
          </el-divider>

          <div class="select">数量</div>
          <el-input-number v-model="currentGoodInfo.fqty" :min="1" />
        </div>
        <template #footer>
          <el-button @click="handleSaveClick">保存</el-button>
        </template>
      </kb-dialog>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import BaseBarcode from "@/base-ui/barcode";
import KbIcon from "@/base-ui/icon";
import {
  httpGetShowTableColumn,
  httpGetGoodsClassList,
  httpGetGoodsList,
} from "@/service/http/home/commit";
import KbDialog from "@/base-ui/dialog";
import PageTable, { IGoodTableConfig } from "@/components/page-table";

import mitter from "@/mitt";

// import type { ITableConfigType } from "@/base-ui/table";

// const emit = defineEmits(["save-click"]);

const goodTableConfig: IGoodTableConfig = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  Classid: 0,
  classList: [],
  page: 1,
  showAction: false,
  tj: "",
});

const show = ref(false);
const goodPanelShow = ref(false);

const activeName = ref("");

const currentGoodInfo = ref<any>({});

const handleClick = (payload: any) => {
  console.log(payload);
};

httpGetShowTableColumn(1000).then((res) => {
  goodTableConfig.column = res?.data?.[0]?.data ?? [];
});

httpGetGoodsClassList().then((res) => {
  const data = res?.data?.[0]?.data;
  goodTableConfig.classList = data ?? [];
  goodTableConfig.Classid = data?.[0]?.fclassid ?? 0;
  activeName.value = data?.[0]?.name ?? "";
});

httpGetGoodsList({
  flag: "select",
  page: goodTableConfig.page,
  Classid: goodTableConfig.Classid,
  tj: goodTableConfig.tj,
}).then((res) => {
  goodTableConfig.data = res?.data?.[0]?.data ?? [];
});

// 双击表格
const handleDbClick = (params: any) => {
  const { row } = params;
  goodPanelShow.value = true;
  currentGoodInfo.value = { ...row, fqty: 1 };
};

const handleSaveClick = () => {
  goodPanelShow.value = false;
  mitter.emit("add-table-rows", currentGoodInfo.value);
  console.log("mitter.emit触发");
};

defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.searchInput {
  cursor: pointer;
}
.tip {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.content {
  & > div {
    margin: 5px 0;
  }
  .notInfo {
    color: #cccccc;
  }
  .priceText {
    color: #ff0000;
  }
}

.elDivider {
  margin: 20px 0 !important;
}
</style>
