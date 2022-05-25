<template>
  <div class="avartar-wrap">
    <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar class="avatar" icon="UserFilled" :size="30" />
      </template>
      <template #default>
        <div class="content">
          <!-- 头像 -->
          <div>
            <el-avatar
              :size="30"
              icon="UserFilled"
              style="margin-bottom: 8px"
            />
            <span>{{ userInfo.uname }}</span>
          </div>
          <div class="select">软件信息</div>
          <div style="margin-left: 15px">
            <el-tag effect="light" style="margin-right: 8px">
              {{ userInfo.chinesename }}
            </el-tag>
            <el-tag effect="light"> {{ userInfo.csmininame }}</el-tag>
            <el-tag style="margin: 10px 0 0 0" effect="light">
              {{ userInfo.softname }}</el-tag
            >
          </div>
          <div class="select">公司信息</div>
          <div style="margin-left: 15px">
            <el-tag effect="dark"> {{ userInfo.csname }}</el-tag>
          </div>
          <div class="select">
            <span>
              当前版本: <el-tag effect="plain" size="small"> v2.0</el-tag>
            </span>
          </div>
          <div class="quit" @click="handleSetting">
            <kb-icon flag="elIcon" name="Setting"></kb-icon>
            进入设置
          </div>
          <div class="quit" @click="handleQuitClick">
            <kb-icon flag="elIcon" name="Right"></kb-icon>
            退出
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import KbIcon from "@/base-ui/icon";
import message from "@/utils/message";
const store = useStore();
const userInfo = computed(() => store.state.login.token);

const router = useRouter();

// 退出到首页
const handleQuitClick = () => {
  router.replace("/login");
  message.show("退出成功", "success");
};

const handleSetting = () => {
  router.replace("/setup");
};
</script>

<style scoped lang="less">
.avatar {
  cursor: pointer;
}
.content {
  & > div {
    margin-bottom: 8px;
  }
  .quit {
    cursor: pointer;
    // border-top: 1px solid #e3e5e7;
    padding: 10px;
    display: flex;

    &:hover {
      // 动画
      transition: background-color 0.5s;
      background-color: #e3e5e7;
      border-radius: 8px;
    }
  }
}
</style>
