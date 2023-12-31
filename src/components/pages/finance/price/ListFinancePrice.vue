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
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="operateFn(record)">操作历史</div>
            <div class="btn-link ml24" @click.stop="historyFn(record)">历史趋势</div>
            <div class="btn-link ml24" @click.stop="priceFn(record)">定价</div>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>

  <MDialog :dialog="dialogAll.get('history')!">
    <HistoryFinancePrice
      @close="dialogAll.get('history')!.show = false"
      :pid="dialogAll.get('history')!.flag"
      :row="dialogAll.get('history')!.row"
    ></HistoryFinancePrice>
  </MDialog>

  <MDialog :dialog="dialogAll.get('operation')!">
    <OperationFinancePrice
      @close="dialogAll.get('operation')!.show = false"
      :pid="dialogAll.get('operation')!.flag"
      :row="dialogAll.get('operation')!.row"
    ></OperationFinancePrice>
  </MDialog>

  <MDialog :dialog="dialogAll.get('price')!">
    <SetPriceFinancePrice
      @close="dialogAll.get('price')!.show = false"
      :pid="dialogAll.get('price')!.flag"
      :row="dialogAll.get('price')!.row"
    ></SetPriceFinancePrice>
  </MDialog>
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
    title: "产品编号",
    dataIndex: "no",
    key: "no",
    ellipsis: true,
  },
  {
    title: "产品名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "规格型号",
    dataIndex: "model",
    key: "model",
    ellipsis: true,
  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "unit",
    ellipsis: true,
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 280,
  },
];

let dialogAll = reactive(
  new Map([
    [
      "history",
      {
        show: false,
        title: "历史趋势",
        flag: "history",
        row: {},
        width: 900,
      },
    ],
    [
      "operation",
      {
        show: false,
        title: "操作记录",
        flag: "operation",
        row: {},
        width: 1200,
      },
    ],
    [
      "price",
      {
        show: false,
        title: "定价",
        flag: "price",
        row: {},
        width: 620,
      },
    ],
  ])
);

const operateFn = (item: any) => {
  dialogAll.get("operation")!.show = true;
  dialogAll.get("operation")!.row = item;
};
const historyFn = (item: any) => {
  dialogAll.get("history")!.show = true;
  dialogAll.get("history")!.row = item;
};
const priceFn = (item: any) => {
  dialogAll.get("price")!.show = true;
  dialogAll.get("price")!.row = item;
};

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

// 获取列表数据
const getListFn = async (params?: any) => {
  console.log("列表组件内部传入数据==>", params);
  // 在这里处理数据
  spinning.value = true;
  spinning.value = false;
  tableList.value = [
    {
      id: 1,
      no: "12",
      name: "物料1号",
      model: "四时速",
      unit: "个",
      price: "66666",
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
</style>
