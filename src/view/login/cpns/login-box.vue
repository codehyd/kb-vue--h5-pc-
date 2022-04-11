<template>
  <div class="login-box">
    <div class="account">
      <div class="title" :style="{ 'padding-left': labelWidth }">
        <h2>Welcome</h2>
        <h2>欢迎使用 开博生意管家</h2>
      </div>
      <el-form :rules="rules" :model="accountData" :label-width="labelWidth">
        <el-form-item label="公司名称">
          <el-input v-model="accountData.cnstr" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="accountData.uname" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="accountData.upwd" />
        </el-form-item>
        <el-form-item label="软件系统">
          <el-input v-model="accountData.sns" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="accountData.authCode" />
        </el-form-item>
      </el-form>
    </div>
    <div class="operation" :style="{ 'padding-left': labelWidth }">
      <el-divider>第三方登录</el-divider>
      <div class="third-icons">
        <kb-icon name="icon-weixin" :size="28"></kb-icon>
      </div>
      <el-button type="primary" class="loginBtn" round>登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { accountData, selectSoftList, rules } from "../config";

const labelWidth = "120px";
</script>

<style lang="less" scoped>
@import "../css/login-box.less";
</style>
