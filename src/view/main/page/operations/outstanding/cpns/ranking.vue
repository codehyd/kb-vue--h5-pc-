<template>
  <div class="ranking">
    <header>业绩排行榜</header>
    <ul>
      <li v-for="(item, index) in list" :key="item.fid">
        <em>{{ index + 1 }}</em>
        <div class="info">
          <span>{{ item.fyewuyuan }}</span>
          <el-popover placement="top" :width="300" trigger="click">
            <div class="content">
              <h3>{{ item.fyewuyuan }}</h3>
              <div class="row">
                <span>金额:</span>
                <span>{{ item.ftotalamount }}</span>
              </div>
              <div class="row">
                <span>金额占比:</span>
                <span>{{ item.frateamount }}</span>
              </div>
              <div class="row">
                <span>数量:</span>
                <span>{{ item.ftotalqty }}</span>
              </div>
              <div class="row">
                <span>数量占比:</span>
                <span>{{ item.frateqty }}</span>
              </div>
            </div>
            <template #reference>
              <div class="priceInfo">
                <icon name="Histogram"></icon>
                <span>查看详情</span>
              </div>
            </template>
          </el-popover>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/base-ui/icon";
const props = withDefaults(
  defineProps<{
    list?: any[];
  }>(),
  {
    list: () => {
      return [];
    },
  }
);
</script>

<style scoped lang="less">
.ranking {
  width: 500px;
  height: 100%;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: blue;
  width: 100%;
  height: 50px;
  background: url("/src/assets/images/mainBg.jpg") no-repeat;
  background-size: cover;
}

ul {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: rgba(204, 204, 204, 0.2);
    }

    em {
      font-style: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin: 0 10px 0 0;
    }

    &:nth-child(1) em {
      border: 1px solid #ffca27;
      background: #ffd249;
      color: #fff;
    }

    &:nth-child(2) em {
      border: 1px solid #b5b5b5;
      background: #c6c6c6;
      color: #fff;
    }

    &:nth-child(3) em {
      border: 1px solid #d98e4c;
      background: #e1a671;
      color: #fff;
    }

    .info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      height: 40px;

      .priceInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
      }
    }
  }
}
.content {
  width: 100%;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 0 5px 0;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
