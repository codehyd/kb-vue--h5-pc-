<template>
  <div class="wx-scan-login">
    <iframe
      sandbox="allow-scripts allow-top-navigation"
      scrolling="no"
      width="300"
      height="400"
      frameBorder="0"
      allowTransparency="true"
      :src="setSrc"
    ></iframe>
  </div>
</template>

<script setup lang="ts" name="KbWxScanLogin">
const props = withDefaults(
  defineProps<{
    appid: string;
    scope?: string;
    redirect_uri?: string;
    state?: string;
    href?: string;
    self_redirect?: string;
    login_type?: string;
    theme?: string;
  }>(),
  {
    scope: "snsapi_login",
    redirect_uri: "",
    state: "",
    href: "",
    self_redirect: "default",
    login_type: "jssdk",
    theme: "black",
  }
);

const setSrc = computed(() => {
  let _url =
    "https://open.weixin.qq.com/connect/qrconnect?appid=" +
    props.appid +
    "&scope=" +
    props.scope +
    "&redirect_uri=" +
    props.redirect_uri +
    "&state=" +
    props.state +
    "&login_type=" +
    props.login_type +
    "&style=" +
    props.theme +
    "&self_redirect=" +
    props.self_redirect +
    "&href=" +
    props.href;
  return _url;
});
</script>

<style scoped>
.wx-scan-login {
  display: flex;
  justify-content: center;
}
</style>
