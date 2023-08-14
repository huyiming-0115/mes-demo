<template>
    <div class="search"><ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx></div>
  </template>
  
  <script setup lang="ts">
  const selectOptions: Array<ToolBarSelectionType> = [
    {
      label: "物料编号",
      value: 0,
    },
    {
      label: "物料名称",
      value: 1,
    },
    {
      label: "供应商名称",
      value: 2,
    },
  ];
  const listFn: FunctionType = inject("getListFn");
  
  
  
  </script>
  
  <style scoped lang="less">
  .search {
    min-height: 70px;
  
    .time {
      margin-left: 30px;
      font-size: 14px;
    }
  }
  </style>
  