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
            <div class="btn-link" @click.stop="detailInfoFn(record)">单据明细</div>
            <div class="btn-link ml24" @click.stop="confirmInFn(record)">入库</div>
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
    <InInfo :pid="dialog.flag" :row="dialog.row" @close="dialog.show = false" />
  </MDialog>
  <MDialog :dialog="dialogIn">
    <DetailDepotIn
      :pid="dialogIn.flag"
      :row="dialogIn.row"
      @close="dialogIn.show = false"
    />
  </MDialog>
</template>

<script setup lang="ts">
//加载中标识
let spinning = ref<boolean>(false);
let dialog: any = reactive({
  show: false,
  title: "单据明细",
  flag: "add",
  row: {},
  width: 1200,
});

let dialogIn: any = reactive({
  show: false,
  title: "出库",
  flag: "add",
  row: {},
  width: 1200,
});

const confirmInFn = (item: any) => {
  dialogIn.row = item;
  dialogIn.show = true;
};

const detailInfoFn = (item: any) => {
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
    title: "入库单号",
    dataIndex: "orderNo",
    key: "orderNo",
    width: 160,
  },
  {
    title: "关联项目名称",
    dataIndex: "projectName",
    key: "projectName",
    ellipsis: true,
  },
  {
    title: "入库单据类型",
    dataIndex: "type",
    key: "type",
    width: 120,
    customFilterDropdown: true,
    ellipsis: true,
  },
  {
    title: "入库日期",
    dataIndex: "inDate",
    key: "inDate",
    width: 150,
  },
  {
    title: "操作人",
    dataIndex: "person",
    key: "person",
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

const filterList: any = [
  {
    value: "WAITIN",
    text: "待入库",
    checked: true,
  },
  {
    value: "RETURN",
    text: "已退回",
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
      orderNo: "666",
      projectName: "第一个项目",
      type: "未知入库单据类型",
      inDate: "2023-08-16",
      person: "胡一鸣",
      status: "END",
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
