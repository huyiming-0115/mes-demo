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
            <Filter :list="filterList" @submit="(list) => filterSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'status'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <a-popconfirm title="确定接收该任务?" @confirm="">
              <template #default>
                <div class="btn-link">接收任务</div>
              </template>
            </a-popconfirm>
            <a-popconfirm title="确定完成选中任务?" @confirm="">
              <template #default>
                <div class="btn-link ml24">完成任务</div>
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
    dataIndex: "name",
    key: "number",
    customRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "项目名称",
    dataIndex: "projectName",
    key: "projectName",
    width: 200,
    ellipsis: true,
  },
  {
    title: "待办内容",
    dataIndex: "content",
    key: "content",
    width: 200,
    ellipsis: true,
  },
  {
    title: "待办类型",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "发起人",
    dataIndex: "person",
    key: "person",
    width: 100,
  },
  {
    title: "开始时间",
    dataIndex: "beginTime",
    key: "beginTime",
    width: 120,
  },
  {
    title: "完成时间",
    dataIndex: "endTime",
    key: "endTime",
    width: 120,
  },
  {
    title: "意见",
    dataIndex: "remark",
    key: "remark",
    ellipsis: true,
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
    width: 160,
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
    value: "WAITRECIEVE",
    text: "待接收",
    checked: true,
  },
  {
    value: "DEAL",
    text: "处理中",
    checked: true,
  },
  {
    value: "END",
    text: "已完成",
    checked: true,
  },
];

let selectFilter: any = ref([]);
let filterChecked = ref<boolean>(false);
const filterSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterList.length && (filterChecked.value = false);
  arr.length !== filterList.length && (filterChecked.value = true);
  // 关闭弹窗
  confirm();
  // 处理数据  如果全选传null  确定 0 取消 1
  arr.length === 2 && (selectFilter.value = null);
  arr.length === 1 && (selectFilter.value = Number(arr.map((x: any) => x.value).join()));
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
      content: "1212121212",
      type: "12",
      person: "1212",
      beginTime: "2023-08-15",
      endTime: "2023-08-15",
      remark: "12121",
      status: "WAITREVIEVE",
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
