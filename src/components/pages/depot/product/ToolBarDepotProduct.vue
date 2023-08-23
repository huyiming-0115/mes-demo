<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx>
      </div>
      <div class="toolbar-right">
        <AButton type="primary" class="w100 h35 button-position" @click="">新增产品</AButton>
        <AButton type="primary" class="w100 h35 mr24 button-position" @click="">导出</AButton>
        <AButton type="primary" class="w100 h35 mr24 button-position" @click="">导入</AButton>
        <AButton type="primary" class="w100 h35 mr24 button-position" @click="">下载模板</AButton>
        <AButton type="primary" class="w100 h35 mr24 button-position" @click="">采购申请</AButton>
      </div>
    </div>
  </div>
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

  .toolbar-position {
    height: 36px;
    padding-top: 17px;
  }

  .toolbar-left {
    float: left;
  }

  .toolbar-right {
    float: right;
  }

  .button-position {
    float: right;
    background-color: rgba(21, 105, 172, 1);
  }
}
</style>
