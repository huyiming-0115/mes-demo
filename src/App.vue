<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
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
  box-sizing: border-box;
}
div{
  box-sizing: border-box;
}
</style>
