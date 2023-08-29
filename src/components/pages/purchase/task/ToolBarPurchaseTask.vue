<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx>
      </div>
      <div class="toolbar-right">
        <AButton
          type="primary"
          class="w100 h35 button-position"
          @click="dialog.show = true"
          >新增订单</AButton
        >
      </div>
    </div>
  </div>
  <MDialog :dialog="dialog">
    <OrderInfo @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row" />
  </MDialog>
</template>

<script setup lang="ts">
const selectOptions: Array<ToolBarSelectionType> = [
  {
    label: "项目名称",
    value: 0,
  },
  {
    label: "物料编码",
    value: 1,
  },
  {
    label: "物料名称",
    value: 2,
  },
];
const listFn: FunctionType = inject("getListFn");
// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "新增订单",
  flag: "add",
  row: {},
  width: 1200,
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
