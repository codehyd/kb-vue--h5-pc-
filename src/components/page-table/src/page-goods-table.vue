<template>
  <div class="page-goods-table">
    <kb-dialog :top="2" appendToBody v-model:show="autoShow" title="商品信息">
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
      <page-table @db-click="handleDbClick" :table-config="goodTableConfig">
        <template #checked="{ row }">
          <span @click="handleSelectClick(row)" class="selectText">添加</span>
        </template>
      </page-table>

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

<script setup name="page-goods-table" lang="ts">
import BaseBarcode from "@/base-ui/barcode";
import KbIcon from "@/base-ui/icon";
import message from "@/utils/message";

import {
  httpGetShowTableColumn,
  httpGetGoodsClassList,
  httpGetGoodsList,
} from "@/service/http/home/commit";
import KbDialog from "@/base-ui/dialog";
import PageTable, { IGoodTableConfig } from "@/components/page-table";

// import type { ITableConfigType } from "@/base-ui/table";

const props = withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {}
);

const emit = defineEmits(["save-click", "update:show"]);

console.log(123212, props.show);
const autoShow = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

const goodTableConfig: IGoodTableConfig = reactive({
  keyString: "fitemid",
  column: [],
  data: [],
  Classid: 0,
  classList: [],
  page: 1,
  showAction: false,
  tj: "",
  showSelect: true,
  isShowPage: true,
  totalPage: 1,
});

// const show = ref(false);
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

async function getGoodList() {
  const res = await httpGetGoodsList({
    flag: "select",
    page: goodTableConfig.page,
    Classid: goodTableConfig.Classid,
    tj: goodTableConfig.tj,
  });
  return { data: res?.data?.[0]?.data ?? [], allPage: res.allpages ?? 1 };
}

const { data, allPage } = await getGoodList();
goodTableConfig.data = data ?? [];
goodTableConfig.totalPage = allPage ?? 1;

// 双击表格
const handleDbClick = (params: any) => {
  const { row } = params;
  goodPanelShow.value = true;
  currentGoodInfo.value = { ...row, fqty: 1, checked: true };
};

const handleSaveClick = () => {
  goodPanelShow.value = false;
  emit("save-click", currentGoodInfo.value);
};

const handleSelectClick = (row: any) => {
  emit("save-click", { ...row, fqty: 1, checked: true });
};
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

.selectText {
  cursor: pointer;
}
</style>
