<template>
    <div class="search"><ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx></div>
  </template>
  
  <script setup lang="ts">
  const selectOptions: Array<ToolBarSelectionType> = [
    {
      label: "人员账号",
      value: 0,
    },
    {
      label: "人员姓名",
      value: 1,
    },
    {
      label: "部门名称",
      value: 2,
    },
    {
      label: "岗位名称",
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
  