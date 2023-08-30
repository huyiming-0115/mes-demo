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
        <template #customFilterDropdown="{ confirm, column }">
          <div v-if="column.key === 'status'">
            <Filter
              :list="filterList"
              @submit="(list) => filterSubmitFn(list, confirm)"
              @cancel="confirm()"
            ></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'status'" style="width: 16px; height: 16px">
            <q-svg
              width="16"
              height="16"
              name="filter"
              :class="filterChecked ? 'filter-result' : ''"
            />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link">查看详情</div>
            <a-popconfirm title="确定修改该订单?" @confirm="">
              <template #default>
                <div class="btn-link ml24" @click="">修改</div>
              </template>
            </a-popconfirm>
            <div class="btn-link ml24">提交订单</div>
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
    <SeriesInfo @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row" />
  </MDialog>
</template>

<script setup lang="ts">
//加载中标识
let spinning = ref<boolean>(false);

let dialog: any = reactive({
  show: false,
  title: "修改系列",
  flag: "add",
  row: {},
  width: 620,
});

const edifFn = (item: any) => {
  dialog.row = item;
  dialog.show = true;
};

const detailFn = (item: any) => {
  dialog.row = item;
  dialog.show = true;
};

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
    title: "订单编号",
    dataIndex: "no",
    key: "no",
    width: 100,
  },
  {
    title: "订单名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "createDate",
    key: "createDate",
    width: 120,
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
    width: 400,
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
    value: "DARFT",
    text: "待处理",
    checked: true,
  },
  {
    value: "ONLINE",
    text: "进行中",
    checked: true,
  },
  {
    value: "OUTLINE",
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
      no: "01",
      name: "项目销售订单",
      createDate: "2023-08-30",
      status: "DRAFT",
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
