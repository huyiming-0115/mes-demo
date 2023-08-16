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
            <Filter :list="filterList" @submit="(list:any) => filterSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
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
          <!-- 状态 -->
          <div v-if="column.key === 'status'">
            <div class="flex-start box-status">
              <div>
                <a-switch class="scale8" v-show="record.status === 1" v-model:checked="statusTrue" />
                <a-switch class="scale8" v-show="record.status !== 1" v-model:checked="statusFalse" />
              </div>
              <div class="ml10 font-blue" v-show="record.status === 1">{{ "启用" }}</div>
              <div class="ml10 font-grey" v-show="record.status !== 1">{{ "停用" }}</div>
              <!-- 这里得字段变化一下 -->
              <a-popconfirm title="确定调整该公司的状态嘛?" @confirm="changeStatusFn(record)">
                <template #default>
                  <div class="box-fill pointer"></div>
                </template>
              </a-popconfirm>
            </div>
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="linkFn(record)">关联部门</div>
            <div class="btn-link ml24" @click.stop="editFn(record)">修改</div>
            <a-popconfirm title="确定删除该公司信息?" @confirm.stop="">
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
  <MDialog :dialog="dialog">
    <DetailSystemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></DetailSystemCompany>
  </MDialog>
  <MDialog :dialog="dialogDepart">
    <LinkDepartSystemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></LinkDepartSystemCompany>
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
    title: "公司名称",
    dataIndex: "organizeName",
    key: "organizeName",
    width: 300,
    ellipsis: true,
  },
  {
    title: "公司简介",
    dataIndex: "explan",
    key: "explan",
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

// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  addTitle: "修改公司",
  flag: "edit",
  row: {},
  width:550
});

const editFn = (item:any) => {
  dialog.title = "修改公司";
  dialog.flag = "edit";
  dialog.row = item;
  dialog.show = true;
};


// 弹窗所有变量
let dialogDepart: any = reactive({
  show: false,
  title: "修改公司",
  flag: "edit",
  row: {},
  width:822
});
const linkFn = (item:any) => {
  dialogDepart.title = "关联部门";
  dialogDepart.flag = "edit";
  dialogDepart.row = item;
  dialogDepart.show = true;
}

/**
 * filterList 筛选列表
 * filterChecked 控制筛选的值
 * filterSubmitFn 筛选确定函数
 */
const filterList: any = [
  {
    value: 1,
    text: "启用",
    checked: true,
  },
  {
    value: 0,
    text: "停用",
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
      organizeName: "一鸣有限公司",
      explan: "这是胡一鸣先生和夏子未小姐的第一家公司",
      status: 1,
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

.box-status {
  position: relative;

  .box-fill {
    position: absolute;
    left: 0;
    top: 0;
    background-color: aquamarine;
    width: 90px;
    height: 25px;
    opacity: 0;
  }
}
</style>
