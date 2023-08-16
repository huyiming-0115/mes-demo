<template>
  <a-layout-content class="box-content">
    <a-spin :spinning="store.spinning" tip="加载中,请稍后..." size="large">
      <div class="m-layout-content">
        <router-view class="router-position" :key="menuStore.routerKey"></router-view>
      </div>
    </a-spin>
  </a-layout-content>
</template>

<script setup lang="ts">
import loadSpin from "@/store/loadSpin";
import { useMenuStore } from "@/store/menu";
const store = loadSpin();
const menuStore = useMenuStore();
</script>

<style lang="less" scoped>
.box-content {
  //padding-left: 10px;
 // padding-right: 5px;
  //margin-top: 10px;
 
}
</style>
<style>
.m-layout-content {
  margin: 5px;
  height: calc(100vh - 120px);
  width: calc(100% - 5px);
  overflow: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: absolute;

}

.router-position{
  position: relative;
  min-width: 1400px;
}
.cs-stream-content {
  min-width: 1000px;
}
.ant-spin-nested-loading {
  height: 100%;
}
.ant-spin-container {
  height: 100%;
}
</style>
