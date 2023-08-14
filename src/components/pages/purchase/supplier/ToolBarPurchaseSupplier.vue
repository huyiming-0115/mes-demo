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
      label: "售后责任人",
      value: 1,
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
  