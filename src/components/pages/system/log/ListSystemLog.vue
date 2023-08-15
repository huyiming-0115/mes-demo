<template>
  <div>
    <a-spin :spinning="spinning">
      <a-table
        :dataSource="tableList"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :rowSelection="{
          selectedRowKeys: ListConfig.selectedRowKeys,
          onChange: onSelectChangeFn,
        }"
        :customRow="onCustomRowFn"
        @change="tableChangeFn"
        size="small"
        :row-class-name="(_record:any, index:number): any => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
      >
        <!-- 图标内容插槽 -->
        <template
          #customFilterDropdown="{
                          confirm,
                          column,
                      }"
        >
          <div v-if="column.key === 'result'">
            <Filter :list="filterList" @submit="(list) => filterSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <!-- 有时间加上动态类名  筛选后加上类名 -->
          <div v-if="column.title === '操作时间'" @click="timeSortFn" style="width: 17px; height: 17px;">
            <a-tooltip>
              <template #title>
                {{ sequence ? "点击降序" : "恢复默认" }}
              </template>
              <div>
                <q-svg width="17" height="17" name="order" :class="!sequence ? 'filter-result' : ''" />
              </div>
            </a-tooltip>
          </div>
          <div v-if="column.key === 'result'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'result'">
            <div v-if="record.result === 1">成功</div>
            <div v-else style="color: red;">失败</div>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
  <!-- 弹窗 -->
  <el-dialog
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    :append-to-body="true"
    :title="'提示'"
    v-model="dialogShow"
    width="300"
    class="mes-el-dialog"
  >
    <template #default>
      <div class="mb11">确定导出已选数据吗？</div>
      <div class="flex-center">
        <a-button @click="dialogShow = false">取消</a-button>
        <a-button v-throttle type="primary" class="ml24" @click="exportFn(1)">确定</a-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { transFormListFn, exportExcelFn, handleTableFn } from "@/utils/tools.ts";
//加载中标识
let spinning = ref<boolean>(false);
let dialogShow = ref(false);
let sequence = ref(false)
// 表头
const columns = [
  {
    title: "序号",
    dataIndex: "number",
    key: "number",
    customRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "操作用户",
    dataIndex: "operName",
    key: "operName",
    width: 120,
  },
  {
    title: "操作内容",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
  {
    title: "IP地址",
    dataIndex: "operIp",
    key: "operIp",
    width: 150,
  },
  {
    title: "操作时间",
    dataIndex: "operTime",
    key: "operTime",
    width: 200,
    customFilterDropdown: true,
  },
  {
    title: "操作结果",
    dataIndex: "result",
    key: "result",
    customFilterDropdown: true,
  },
];
// 表体数据
const tableList: any = ref([]);
const pagination = getPagination();
// 表格配置项
const ListConfig: any = reactive({
  selectedRowKeys: [], //表格选中数组
});
// 选中表格checked
const onSelectChangeFn = (selectedRowKeys: any) => {
  ListConfig.selectedRowKeys = selectedRowKeys;
};
// 选中表格当前行
const onCustomRowFn = (record: any) => {
  return {
    // 单击表格
    onClick: () => {
      const index = ListConfig.selectedRowKeys.indexOf(record.id);
      index >= 0 && ListConfig.selectedRowKeys.splice(index, 1);
      index < 0 && ListConfig.selectedRowKeys.push(record.id);
    },
    // 双击表格
    ondblclick: () => {
      // // 双击情况选择项目，只选择当前行
      ListConfig.selectedRowKeys = [record.id];
      //如果有查看详情的列表页，双击打开详情
    },
  };
};
// 表格改变时 应用于分页
const tableChangeFn = (pagination: any) => {
  if (pagination.current != undefined && pagination.pageSize != undefined) {
    /* dataSource.currentPage = pagination.current;
          dataSource.pageSize = pagination.pageSize; */
  }
  getListFn();
};

const filterList: any = [
  {
    value: 1,
    text: "成功",
    checked: true,
  },
  {
    value: 0,
    text: "失败",
    checked: true,
  },
];
let filterChecked = ref<boolean>(false);
const filterSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterList.length && (filterChecked.value = false);
  arr.length !== filterList.length && (filterChecked.value = true);
  // 关闭弹窗
  confirm();
};

// 导出按钮
const exportFn = (pid?: number) => {
  if (!ListConfig.selectedRowKeys.length) return ElMessage.warning("未选择任何数据");
  // 此处可以加一个确定提示
  pid === 0 && (dialogShow.value = true);
  if (pid === 0) return;
  dialogShow.value = false;
  const exportFromData: any = {
    操作用户: "operName",
    操作内容: "title",
    IP地址: "operIp",
    操作时间: "operTime",
    操作结果: "result",
  };
  let header: any = Object.keys(exportFromData);
  let enKeys: any = Object.values(exportFromData);
  const tableListArr = transFormListFn(ListConfig.selectedRowKeys, tableList.value);
  const data: any = handleTableFn(tableListArr, enKeys);
  exportExcelFn(header, data, "操作管理表格");
};
// 排序按钮
const timeSortFn = () => {
  sequence.value = !sequence.value;
  getListFn();
};

// 获取列表数据
const getListFn = async (params?: any) => {
  console.log("列表组件内部传入数据==>", params);
  // 在这里处理数据
  spinning.value = true;
  spinning.value = false;
  tableList.value = [
    {
      id: 1,
      operName: "胡一鸣",
      title: "增加资源",
      operIp: "0.0.0.0",
      operTime: "2023-08-15 14:03",
      result: 1,
    },
  ];
};
onMounted(() => {
  getListFn();
});
defineExpose({ getListFn, exportFn });
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdTable.less";
</style>
