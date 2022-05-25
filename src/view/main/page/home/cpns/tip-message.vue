<template>
  <div class="tip-message">
    <kb-card :height="470">
      <template #title>
        <div class="title-content">
          <div class="title">单据操作日志</div>
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
        <template v-if="billList.length == 0">
          <div class="empty">
            <el-empty description="暂无数据" />
          </div>
        </template>
        <vxe-list v-else height="400" :data="newBillList">
          <template #default="{ items }">
            <div
              class="listItem"
              v-for="(item, index) in items"
              :key="index + ' ' + item.finterid"
              @click="handleListClick(item)"
            >
              <template v-if="item.show">
                <div class="mask">
                  <div class="mask-content">
                    <div class="item">
                      <div class="item-content" @click.stop="hanlePrint(item)">
                        <kb-icon name="Printer" flag="elIcon"></kb-icon>
                        <span>打印预览</span>
                      </div>
                    </div>
                    <div
                      class="item"
                      v-if="
                        item.ftype !== 104 &&
                        item.ftype !== 113 &&
                        item.ftype !== 150 &&
                        item.ftype !== 151
                      "
                    >
                      <div class="item-content" @click.stop="detailClick(item)">
                        <kb-icon name="list" flag="elIcon"></kb-icon>
                        <span>单据详情</span>
                      </div>
                    </div>
                  </div>
                  <div class="mask-bg"></div>
                </div>
              </template>
              <div class="title">
                <b class="select">{{ item.fbillname }}</b>
                <span>{{ item.fbillstatus }}</span>
              </div>
              <div class="info">
                <div>{{ item.fkhname }}</div>
                <div>{{ item.fbillno }}</div>
                <div>{{ item.fdate }}</div>
              </div>
            </div>
          </template>
        </vxe-list>
      </div>
    </kb-card>
    <page-print ref="pagePrintRef" :url="url"></page-print>

    <detail-panel
      @active-click="handleActiveClick"
      :tableConfig="detailTableConfig"
      :billtypeid="billtypeid"
      ref="detailPanelRef"
    ></detail-panel>
  </div>
</template>

<script setup lang="ts">
import KbIcon from "@/base-ui/icon";
import KbCard from "@/components/card";
import PagePrint from "@/components/page-print";
import { activeList, IActiveListType } from "../config/billlist-config";
import { useStore } from "@/store";
import { httpPrintBild } from "@/service/http/home/commit";
import message from "@/utils/message";
import useDetail from "@/hooks/useDetail";
import DetailPanel from "@/components/bild-query-content/src/cpns/detail-panel.vue";

const store = useStore();

const activeText = ref(activeList[0].text);

store.dispatch("home/getUserBillList", activeList[0].flag);
const billList = computed(() => store.state.home.billList);
const newBillList = ref<any[]>([]);

watchEffect(() => {
  newBillList.value = billList.value.map((item: any) => {
    const newItem = Object.assign({}, item);
    newItem.show = false;
    return newItem;
  });
});

const handleItemClick = (item: IActiveListType) => {
  activeText.value = item.text;
  store.dispatch("home/getUserBillList", item.flag);
};

const handleListClick = (item: any) => {
  // 获取当前点击的索引
  item.show = !item.show;
};
const {
  detailClick,
  billtypeid,
  detailTableConfig,
  detailPanelRef,
  handleActiveClick,
  pagePrintRef,
  url,
} = useDetail();

const hanlePrint = async (item: any) => {
  const res = await httpPrintBild({
    billid: item.finterid,
    billtypeid: item.ftype,
  });
  if (res.code >= 1) {
    url.value = res.url;
    pagePrintRef.value!.show = true;
  } else {
    message.show(res.msg, res.type);
  }
};

// const url = ref("");
</script>

<style lang="less" scoped>
.tip-message {
  // height: 450px;
  margin: 10px 0 0 0;
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
  // background: pink;
  height: 100%;
  overflow-y: auto;
  .listItem {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 10px;
    padding-left: 20px;
    box-sizing: border-box;
    height: 100%;
    cursor: pointer;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mask,
    .mask-bg,
    .mask-content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-sizing: border-box;
      .mask-bg {
        background: #00000080;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      .mask-content {
        // 恢复cursor默认值
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: white;
        z-index: 1;
        .item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          .item-content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;
            span {
              margin: 5px 0 0 0;
            }
          }
        }
      }
    }
  }
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
