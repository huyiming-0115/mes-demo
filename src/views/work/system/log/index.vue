<template>
  <div style="padding: 0 20px;">
    <ToolBarSystemLog />
    <div class="page-line"></div>
    <ListSystemLog ref="listRef" />
  </div>
</template>

<script setup lang="ts">
const listRef: any = ref(null);
const getListFn = (params: any) => {
  listRef.value.getListFn(params);
};
const exportFn = (pid: any) => {
    listRef.value.exportFn(pid)
}
provide("getListFn", getListFn);
provide('exportFn', exportFn)
</script>

<style scoped lang="less">
.page-line {
  border-top: 1px solid grey;
  height: 20px;
}
</style>
