<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'virtual:svg-icons-register';
</script>

<template>

  <a-config-provider :locale="zhCN">
    <!-- <div class="app-main"> -->
    <router-view />
<!--   </div> -->
  </a-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
body{
  margin: 0;
  font-size: 64.5%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
div{
  box-sizing: border-box;
}
.app-main {
  padding: 0 !important;
  margin: 0 !important;
  height: 100% !important;
  width: 100% !important;
  position: absolute !important;
}
</style>
