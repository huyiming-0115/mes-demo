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
        <template #bodyCell="{ record, column, index }">
          <!-- 序号 -->
          <div v-if="column.title === '序号'">
            <div>{{ index + 1 }}</div>
          </div>
          <!-- 操作 -->
        <!--   <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="queryFn(record)">查看详情</div>
          </div> -->
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>

  <MDialog :dialog="dialog">
    <DetailSystemAuth @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></DetailSystemAuth>
  </MDialog>
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
    title: "授权部门",
    dataIndex: "depart",
    key: "depart",
    ellipsis: true,
  },
  {
    title: "授权岗位",
    dataIndex: "role",
    key: "role",
    ellipsis: true,
  },
  {
    title: "授权时间",
    dataIndex: "authDate",
    key: "authDate",
    ellipsis: true,
  },
  {
    title: "操作人",
    dataIndex: "person",
    key: "person",
    ellipsis: true,
  },
/*   {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 280,
  }, */
];

// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "查看详情",
  flag: "detail",
  row: {},
  width: 620,
});

const queryFn = (item: any) => {
  dialog.show = true;
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
      depart: "FBI部门 ",
      role: "超级管理员",
      authDate: "2023-08-15",
      person: "胡一鸣",
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
