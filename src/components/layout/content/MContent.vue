<template>
  <a-layout-content>
    <a-spin :spinning="store.spinning" tip="加载中,请稍后..." size="large">
      <div class="layout-content">
        <router-view />
      </div>
    </a-spin>
  </a-layout-content>
</template>

<script setup lang="ts">
import loadSpin from "../../../store/loadSpin";
const store = loadSpin();
</script>

<style>
.-ayout-content {
  margin: 5px;
  height: calc(100vh - 120px);
  width: calc(100% - 5px);
  overflow: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
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
