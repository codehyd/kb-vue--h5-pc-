<template>
  <div v-if="show" class="page-goods-table">
    <kb-dialog :top="2" appendToBody v-model:show="show" title="商品信息">
      <!-- 输入框 -->
      <el-input
        @keyup.enter.native="handleSearchClick"
        v-model="goodTableConfig.tj"
      >
        <template #append>
          <el-button @click="handleSearchClick" icon="Search" />
        </template>
      </el-input>

      <div class="tip">
        <div class="tipText">
          <kb-icon name="InfoFilled" flag="elIcon"></kb-icon>
          商品图片将在宫格样式中显示
        </div>
        <el-button @click="handleToggleStyle">切换显示样式</el-button>
      </div>
      <!-- tabs -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <template
          v-for="item in goodTableConfig.classList"
          :key="item.fclassid"
        >
          <el-tab-pane :label="item.name" :name="item.name"></el-tab-pane>
        </template>
      </el-tabs>

      <!-- 表格信息 -->
      <page-table
        cardPanel
        @page-change="handlePageChange"
        @db-click="handleDbClick"
        :table-config="goodTableConfig"
        ref="pageTableRef"
      >
        <template #checked="{ row }">
          <span @click="handleSelectClick(row)" class="selectText">添加</span>
        </template>

        <template #list="{ data }">
          <good-list-item
            @edit-good="handleAddGoodItem"
            card-text="添加"
            :data="data"
          ></good-list-item>
        </template>
      </page-table>
    </kb-dialog>
    <!-- <good-detail
      ref="goodDetailRef"
      v-model="currentGood"
      @save-click="handleSaveClick"
    ></good-detail> -->
  </div>
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
import GoodDetail from "./cpns/good-detail.vue";
import KbIcon from "@/base-ui/icon";
import GoodListItem from "@/view/main/page/data/goods/cpns/good-list-item.vue";
import {
  httpGetGoodsClassList,
  httpGetGoodsList,
  httpGetShowTableColumn,
} from "@/service/http/home/commit";
import PageTable, { IGoodTableConfig } from "..";

const emit = defineEmits(["save-click"]);

const goodDetailRef = ref<InstanceType<typeof GoodDetail>>();
const pageTableRef = ref<InstanceType<typeof PageTable>>();

const show = ref(false);

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
  loading: true,
});

const activeName = ref("");
const handleClick = async (payload: any) => {
  const name = payload.props.name;
  goodTableConfig.Classid = goodTableConfig.classList.find(
    (item: any) => item.name == name
  ).fclassid;
  handlePageChange(1);
};

const currentGood = ref<any>({});

const handleDbClick = ({ row }: any) => {
  handleSelectClick(row);
  // currentGood.value = { ...row, fqty: 1, checked: true };
  // const goodDetail = goodDetailRef.value;
  // if (goodDetail) {
  //   goodDetail.show = true;
  // }
};

const handleSelectClick = (row: any) => {
  emit("save-click", { ...row, fqty: 1, checked: true });
};

// 请求相关goods的数据
const requestBeRelatedToGoods = () => {
  httpGetShowTableColumn(1000).then((res) => {
    goodTableConfig.column = res?.data?.[0]?.data ?? [];
  });

  httpGetGoodsClassList().then((res) => {
    const data = res?.data?.[0]?.data;
    goodTableConfig.classList = data ?? [];
    goodTableConfig.Classid = data?.[0]?.fclassid ?? 0;
    activeName.value = data?.[0]?.name ?? "";
  });

  getGoodList().then((res) => {
    const { data, allPage } = res;
    goodTableConfig.data = data ?? [];
    goodTableConfig.totalPage = allPage ?? 1;
  });
};

async function getGoodList() {
  const res = await httpGetGoodsList({
    page: goodTableConfig.page,
    Classid: goodTableConfig.Classid,
    tj: goodTableConfig.tj,
  });
  return { data: res?.data?.[0]?.data ?? [], allPage: res.allpages ?? 1 };
}

const handlePageChange = async (val: number) => {
  goodTableConfig.page = val;
  const res = await getGoodList();
  const { data, allPage } = res;
  goodTableConfig.data = data ?? [];
  goodTableConfig.totalPage = allPage ?? 1;
};

const handleSaveClick = (row: any) => {
  emit("save-click", row);
};

const handleSearchClick = async () => {
  goodTableConfig.page = 1;
  const { data, allPage } = await getGoodList();
  goodTableConfig.data = data ?? [];
  goodTableConfig.totalPage = allPage ?? 1;
};

const handleAddGoodItem = (params: any) => {
  const { item } = params;
  handleSelectClick(item);
};

const handleToggleStyle = () => {
  pageTableRef.value!.currentFlag =
    pageTableRef.value?.currentFlag === "table" ? "list" : "table";
};

requestBeRelatedToGoods();

defineExpose({
  show,
});
</script>

<style scoped>
.selectText {
  cursor: pointer;
  color: #0094ff;
  text-decoration: underline;
}
.tip {
  display: flex;
  align-items: center;
  margin: 10px 0;
  justify-content: space-between;
}
.tipText {
  display: flex;
  align-items: center;
}
</style>
