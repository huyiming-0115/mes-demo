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
          <div v-if="column.key === 'status'">
            <Filter :list="filterStatusList" @submit="(list) => filterStatusSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
          <div v-if="column.key === 'orderType'">
            <Filter :list="filterTypeList" @submit="(list) => filterTypeSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'status'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterStatusChecked ? 'filter-result' : ''" />
          </div>
          <div v-if="column.key === 'orderType'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterTypeChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click="">查看详情</div>
            <a-popconfirm title="是否需要指派员工?" @confirm="">
              <template #default>
                <div class="btn-link ml24">指派员工</div>
              </template>
            </a-popconfirm>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
//加载中标识
let spinning = ref<boolean>(false);
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
    width:350,
    ellipsis: true,
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
    key: "orderType",
    width: 120,
    customFilterDropdown: true,
  },
  {
    title: "排产日期",
    dataIndex: "scheDate",
    key: "scheDate",
  },
  {
    title: "发货日期",
    dataIndex: "sendDate",
    key: "sendDate",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 120,
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
    value: "WAITPOINT",
    text: "待指派",
    checked: true,
  },
  {
    value: "PRODUCING",
    text: "生产中",
    checked: true,
  },
  {
    value: "PRODUCEEXCEPT",
    text: "生产异常",
    checked: true,
  },
  {
    value: "PACKING",
    text: "装箱中",
    checked: true,
  },
  {
    value: "CHECKING",
    text: "质检中",
    checked: true,
  },
  {
    value: "END",
    text: "已完成",
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
    value: "PROJECT",
    text: "项目订单",
    checked: true,
  },
  {
    value: "APPEND",
    text: "加工订单",
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
      orderType: "PROJECT",
      scheDate: "2023-08-15",
      sendDate: "2023-08-15",
      status: "WAITPOINT",
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
