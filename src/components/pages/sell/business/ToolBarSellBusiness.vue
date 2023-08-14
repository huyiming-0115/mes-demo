<template>
    <div class="search"><ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx></div>
  </template>
  
  <script setup lang="ts">
  const selectOptions: Array<ToolBarSelectionType> = [
    {
      label: "项目名称",
      value: 0,
    },
    {
      label: "商务负责人",
      value: 1,
    },
    {
      label: "购买用户",
      value: 2,
    },
    {
      label: "销售人",
      value: 3,
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
  