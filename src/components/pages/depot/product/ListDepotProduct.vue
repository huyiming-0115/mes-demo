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
            <div class="btn-link" @click.stop="editFn(record)">修改</div>
            <div class="btn-link ml24" @click.stop="showRecord(record)">库存记录</div>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
  <MDialog :dialog="addProductDialog">
    <ProductInfoDialog :pid="addProductDialog.flag" :row="addProductDialog.row" @close="addProductDialog.show = false" />
  </MDialog>
  <MDialog :dialog="recordDialog">
    <ProductRecordDialog :pid="recordDialog.flag" :row="recordDialog.row" @close="recordDialog.show = false"></ProductRecordDialog>
  </MDialog>
</template>

<script setup lang="ts">
//加载中标识
let spinning = ref<boolean>(false);

let recordDialog: any = reactive({
  show: false,
  title: "库存记录",
  flag: "add",
  row: {},
  width: 1200,
});

// 弹窗所有变量
let addProductDialog: any = reactive({
  show: false,
  title: "修改产品",
  flag: "edit",
  row: {},
  width: 1200,
});

const editFn = (item: any) => {
  addProductDialog.row = item;
  addProductDialog.show = true;
};

const showRecord = (item: any) => {
  recordDialog.row = item;
  recordDialog.show = true;
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
    title: "物料编号",
    dataIndex: "no",
    key: "no",
    width: 180,
  },
  {
    title: "物料名称",
    dataIndex: "name",
    key: "name",
    width: 180,
    ellipsis: true,
  },
  {
    title: "规格型号",
    dataIndex: "model",
    key: "model",
    width: 150,
  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "unit",
    width: 150,
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
  {
    title: "库存数量",
    dataIndex: "stockNum",
    key: "stockNum",
    width: 150,
  },
  {
    title: "供应商",
    dataIndex: "supplier",
    key: "supplier",
    width: 150,
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 240,
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

// 获取列表数据
const getListFn = async (params?: any) => {
  console.log("列表组件内部传入数据==>", params);
  // 在这里处理数据
  spinning.value = true;
  spinning.value = false;
  tableList.value = [
    {
      id: "1",
      no: "666",
      name: "第一等物料",
      model: "666",
      unit: "个",
      price: "6666",
      stockNum: "666",
      supplier: "第一等供应商",
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
