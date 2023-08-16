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
          <div v-if="column.key === 'state'">
            <Filter :list="filterStateList" @submit="(list) => filterStateSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>

          <div v-if="column.key === 'type'">
            <Filter :list="filterTypeList" @submit="(list) => filterTypeSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'state'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterStateChecked ? 'filter-result' : ''" />
          </div>
          <div v-if="column.key === 'type'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterTypeChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 品牌性质 -->
          <div v-if="column.key === 'type'">
            {{ brandTypeCn(record.type) }}
          </div>
          <!-- 状态 -->
          <div v-if="column.key === 'state'">
            <div class="flex-start box-status">
              <div>
                <a-switch class="scale8" v-show="record.state === 1" v-model:checked="statusTrue" />
                <a-switch class="scale8" v-show="record.state !== 1" v-model:checked="statusFalse" />
              </div>
              <div class="ml10 font-blue" v-show="record.state === 1">{{ "启用" }}</div>
              <div class="ml10 font-grey" v-show="record.state !== 1">{{ "禁用" }}</div>
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
            <div class="btn-link" @click.stop="queryFn(record)">查看详情</div>
            <div class="btn-link ml24" @click.stop="editFn(record)">修改</div>
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

  <MDialog :dialog="dialog">
    <DetailSystemBrand @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row"></DetailSystemBrand>
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
    title: "品牌名称",
    dataIndex: "brandName",
    key: "brandName",
    ellipsis: true,
  },
  {
    title: "品牌性质",
    dataIndex: "type",
    key: "type",
    customFilterDropdown: true,
  },
  {
    title: "经销商信息",
    dataIndex: "dealer",
    key: "dealer",
    ellipsis: true,
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    key: "phone",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
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

// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "修改岗位",
  flag: "edit",
  row: {},
  width: 550,
});

// 新增部门
const editFn = (item: any) => {
  dialog.flag = "edit";
  dialog.row = item;
  dialog.show = true;
  dialog.title = "修改品牌"
};

// 新增部门
const queryFn = (item: any) => {
  dialog.flag = "detail";
  dialog.row = item;
  dialog.show = true;
  dialog.title = "查看品牌"
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

const filterStateList: any = [
  {
    value: 1,
    text: "启用",
    checked: true,
  },
  {
    value: 0,
    text: "禁用",
    checked: true,
  },
];

const filterTypeList: any = [
  {
    value: 1,
    text: "OEM",
    checked: true,
  },
  {
    value: 0,
    text: "自有品牌",
    checked: true,
  },
  {
    value: 2,
    text: "经销商",
    checked: true,
  },
];

const brandTypeCn = computed(() => (x: number) => {
  return x == 0 ? "自有品牌" : x == 1 ? "OEM" : "经销商";
});

let selectStateFilter: any = ref([]);
let selectTypeFilter: any = ref([]);
let filterStateChecked = ref<boolean>(false);
let filterTypeChecked = ref<boolean>(false);
const filterStateSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterStateList.length && (filterStateChecked.value = false);
  arr.length !== filterStateList.length && (filterStateChecked.value = true);
  // 关闭弹窗
  confirm();
  // 处理数据  如果全选传null  确定 0 取消 1
  arr.length === 2 && (selectStateFilter.value = null);
  arr.length === 1 && (selectStateFilter.value = Number(arr.map((x: any) => x.value).join()));
  getListFn();
};

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

// 更改状态
let statusTrue: boolean = true;
let statusFalse: boolean = false;
const changeStatusFn = async (record: any) => {
  tableList.value = [
    {
      id: 1,
      brandName: "一鸣真鲜奶吧",
      type: Math.round(Math.random() * (2 - 0) + 0),
      dealer: "胡一鸣",
      phone: "18879118804",
      state: record.state == 0 ? 1 : 0,
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
      brandName: "一鸣真鲜奶吧",
      type: 0,
      dealer: "胡一鸣",
      phone: "18879118804",
      state: 1,
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
