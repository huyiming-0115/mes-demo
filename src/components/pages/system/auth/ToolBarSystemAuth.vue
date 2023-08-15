<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx>
      </div>
      <div class="toolbar-right">
        <AButton type="primary" class="w100 h35 button-position" @click="addFn">授权</AButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectOptions: Array<ToolBarSelectionType> = [
  {
    label: "部门名称",
    value: 0,
  },
  {
    label: "岗位名称",
    value: 1,
  },
  {
    label: "操作人",
    value: 2,
  },
];
const listFn: FunctionType = inject("getListFn");
// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  addTitle: "授权",
  flag: "add",
  row: {},
});
// 授权
const addFn = () => {
  dialog.addTitle = "授权";
  dialog.flag = "add";
  dialog.row = undefined;
  dialog.show = true;
};
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
