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
            <Filter :list="filterList" @submit="(list) => filterSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'type'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <div v-if="column.key === 'type'">
              {{ powerTypeCn(record.type) }}
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click="">查看详情</div>
            <div class="btn-link ml24" @click="">修改</div>
            <a-popconfirm title="确定删除这条数据吗?" @confirm="">
              <template #default>
                <div class="btn-link ml24">删除</div>
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
    width: 70,
  },
  {
    title: "权限组名称",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "权限组简介",
    dataIndex: "explain",
    key: "explain",
    ellipsis: true,
    width: 300,
  },
  {
    title: "资源类型",
    dataIndex: "type",
    key: "type",
    width: 140,
    customFilterDropdown: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 250,
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
    value: 0,
    text: "权限",
    checked: true,
  },
  {
    value: 1,
    text: "白名单",
    checked: true,
  },
  {
    value: 2,
    text: "数据权限",
    checked: true,
  },
  {
    value: 3,
    text: "菜单",
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

// 更改状态
let statusTrue: boolean = true;
let statusFalse: boolean = false;
const changeStatusFn = async (record: any) => {
  tableList.value = [
    {
      id: 1,
      organizeName: "一鸣有限公司",
      explan: "这是胡一鸣先生和夏子未小姐的第一家公司",
      status: record.status == 0 ? 1 : 0,
    },
  ];
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
      title: "全部资源",
      explain: "高级管理员才能够拥有的全部资源",
      type: 1,
    },
  ];
};

const powerTypeCn = computed(() => (x: number) => {
  return x == 0 ? "权限" : x == 1 ? "白名单" : x == 2 ? "数据权限" : "菜单";
});
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
