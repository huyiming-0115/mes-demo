<template>
  <div style="padding: 0 20px;">
    <ToolBarSystemAuth />
    <div class="page-line"></div>
    <ListSystemAuth ref="listRef" />
  </div>
</template>

<script setup lang="ts">
const listRef: any = ref(null);
const getListFn = (params: any) => {
  listRef.value.getListFn(params);
};
provide("getListFn", getListFn);
</script>

<style scoped lang="less">
.page-line {
  border-top: 1px solid grey;
  height: 20px;
}
</style>
