<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx>
      </div>
      <div class="toolbar-right">
        <AButton type="primary" class="w100 h35 button-position" @click="addFn">新增公司</AButton>
      </div>
    </div>
  </div>
  <!-- 新增弹窗 -->
<!--   <el-dialog
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    :append-to-body="true"
    :title="dialog.addTitle"
    v-model="dialog.show"
    width="600"
    class="mes-el-dialog"
  >
    <template #default>
      <DetailSystemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></DetailSystemCompany>
    </template>
  </el-dialog> -->

  <MDialog :dialog="dialog">
    <DetailSystemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></DetailSystemCompany>
  </MDialog>
</template>

<script setup lang="ts">
const selectOptions: Array<ToolBarSelectionType> = [
  {
    label: "公司名称",
    value: 0,
  },
];
const listFn: FunctionType = inject("getListFn");
// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "新增公司",
  flag: "add",
  row: {},
  width:550
});
// 新增公司
const addFn = () => {
  dialog.title = "新增公司";
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
