<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx>
      </div>
      <div class="toolbar-right">
        <AButton type="primary" class="w100 h35 button-position" @click="dialog.show = true">新增项目</AButton>
      </div>
    </div>
  </div>

  <MDialog :dialog="dialog">
    <ProjectSellBusiness @close="dialog.show = false" :dialog="dialog" :pid="dialog.flag"></ProjectSellBusiness>
  </MDialog>
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
// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "新增项目",
  flag: "add",
  row: {},
  width: 700,
});
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
