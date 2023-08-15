<template>
  <div class="search">
    <div class="toolbar-position">
      <div class="toolbar-left">
        <div style="float: left;"><ToolBarEx :selectOptions="selectOptions" :function-name="listFn"></ToolBarEx></div>
        <div style="float: left;">
          <div class="time-text">筛选：</div>
          <n-config-provider style="float: left;" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
            <n-date-picker @confirm="timeConfirmFn" @clear="clearFn" v-model:value="range" :is-date-disabled="disablePreviousDate" type="daterange" clearable />
          </n-config-provider>
        </div>
      </div>
      <div class="toolbar-right">
        <AButton type="primary" class="w100 h35 button-position" @click="exportFn(0)">导出数据</AButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import themeOverrides from "@/assets/styles/base/naiveTheme";
const disablePreviousDate = (ts: number) => {
  return ts > Date.now();
};
const selectOptions: Array<ToolBarSelectionType> = [
  {
    label: "操作用户",
    value: 0,
  },
  {
    label: "ip地址",
    value: 1,
  },
];
const formState: any = reactive({
  range: undefined,
  flag: false, // 区分有没有选择时间  true选择了 false没有选择
});
// 日期的值
let range: any = ref(undefined);
// 确定选择日期
const timeConfirmFn = (value: any, formattedValue: any) => {
  console.log("%c%s", "color:green", "confirm");
  // naive的v-model慢了一步 直接使用了值会出现undefined的情况 可以从新赋值一次
  // 这里处理一下数据
  formState.range = formattedValue;
  formState.flag = true;
  if (listFn) {
    listFn(formState);
  }
};
const clearFn = () => {
  formState.range = undefined;
  formState.flag = false;
  if (listFn) {
    listFn(formState);
  }
};
// 导出事件
const exportFn: any = inject("exportFn");
const listFn: FunctionType = inject("getListFn");
// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  addTitle: "新增公司",
  flag: "add",
  row: {},
});
// 新增公司
const addFn = () => {
  dialog.addTitle = "新增公司";
  dialog.flag = "add";
  dialog.row = undefined;
  dialog.show = true;
};
</script>

<style scoped lang="less">
.search {
  min-height: 70px;

  .time-text {
    float: left;
    vertical-align: center;
    height: 34px;
    line-height: 34px;
    margin-left: 20px;
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
