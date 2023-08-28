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
          <div v-if="column.key === 'type'">
            <Filter :list="filterTypeList" @submit="(list) => filterTypeSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
          <div v-if="column.key === 'status'">
            <Filter :list="filterStatusList" @submit="(list) => filterStatusSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'type'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterTypeChecked ? 'filter-result' : ''" />
          </div>
          <div v-if="column.key === 'status'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterStatusChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="historyCheckFn(record)">历史质检</div>
            <div class="btn-link ml24" @click="">质检</div>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
  <MDialog :dialog="dialog">
    <HistoryCheck @close="dialog.show = false" :dialog="dialog" :pid="dialog.flag" :row="dialog.row" />
  </MDialog>
</template>

<script setup lang="ts">
//加载中标识
let spinning = ref<boolean>(false);

// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "历史质检",
  flag: "add",
  row: {},
  width: 1200,
});

const historyCheckFn = (item: any) => {
  dialog.row = item;
  dialog.show = true;
};

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
    title: "项目名称",
    dataIndex: "projectName",
    key: "projectName",
    width: 260,
    ellipsis: true,
  },
  {
    title: "订单类型",
    dataIndex: "type",
    key: "type",
    width: 120,
    customFilterDropdown: true,
  },
  {
    title: "质检原因",
    dataIndex: "result",
    key: "result",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 100,
    customFilterDropdown: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 280,
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

const filterStatusList: any = [
  {
    value: "CHECKPASS",
    text: "质检合格",
    checked: true,
  },
  {
    value: "WAITCHECK",
    text: "待质检",
    checked: true,
  },
  {
    value: "CHECKNOTPASS",
    text: "质检不合格",
    checked: true,
  },
];

let selectStatusFilter: any = ref([]);
let filterStatusChecked = ref<boolean>(false);
const filterStatusSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterStatusList.length && (filterStatusChecked.value = false);
  arr.length !== filterStatusList.length && (filterStatusChecked.value = true);
  // 关闭弹窗
  confirm();
  // 处理数据  如果全选传null  确定 0 取消 1
  arr.length === 2 && (selectStatusFilter.value = null);
  arr.length === 1 && (selectStatusFilter.value = Number(arr.map((x: any) => x.value).join()));
  getListFn();
};

const filterTypeList: any = [
  {
    value: "PRODUCT",
    text: "生产质检",
    checked: true,
  },
  {
    value: "PURCHASE",
    text: "采购质检",
    checked: true,
  },
];

let selectTypeFilter: any = ref([]);
let filterTypeChecked = ref<boolean>(false);
const filterTypeSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterTypeList.length && (filterTypeChecked.value = false);
  arr.length !== filterTypeList.length && (filterTypeChecked.value = true);
  // 关闭弹窗
  confirm();
  // 处理数据  如果全选传null  确定 0 取消 1
  arr.length === 2 && (selectTypeFilter.value = null);
  arr.length === 1 && (selectTypeFilter.value = Number(arr.map((x: any) => x.value).join()));
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
      projectName: "第一个项目",
      type: "PRODUCT",
      result: "是vSava但是vSava是v阿萨VS v阿萨",
      status: "WAITCHECK",
    },
  ];
};
onMounted(() => {
  getListFn();
});
defineExpose({ getListFn });
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdTable.less";

.filter-result {
  stroke: #1569ac;
}
</style>
