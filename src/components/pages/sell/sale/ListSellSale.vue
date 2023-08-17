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
          <div v-if="column.key === 'status'" style="width: 84px; height: 26px;">
            <q-svg width="84" height="26" name="draft-sell" />
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="queryFn(record)">查看详情</div>
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
    <DetailSellSale @close="dialog.show = false" :dialog="dialog" :pid="dialog.flag" :row="dialog.row"></DetailSellSale>
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
    title: "项目名称",
    dataIndex: "projectName",
    key: "projectName",
    width: 200,
    ellipsis: true,
  },
  {
    title: "购买用户",
    dataIndex: "user",
    key: "user",
    width: 100,
    ellipsis: true,
  },
  {
    title: "商务负责人",
    dataIndex: "businessMan",
    key: "businessMan",
    width: 100,
    ellipsis: true,
  },
  {
    title: "销售人",
    dataIndex: "sellPerson",
    key: "sellPerson",
    width: 100,
    ellipsis: true,
  },
  {
    title: "交货日期",
    dataIndex: "sendDate",
    key: "sendDate",
    width: 180,
    ellipsis: true,
  },
  {
    title: "备注",
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
    width: 280,
  },
];

// 弹窗所有变量
let dialog: any = reactive({
  show: false,
  title: "查看详情",
  flag: "detail",
  row: {},
  width: 1200,
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

/**
 * filterList 筛选列表
 * filterChecked 控制筛选的值
 * filterSubmitFn 筛选确定函数
 */
const filterList: any = [
  {
    value: "DRAFT",
    text: "起草",
    checked: true,
  },
  {
    value: "DEAL",
    text: "待处理",
    checked: true,
  },
  {
    value: "REVIEWING",
    text: "评审中",
    checked: true,
  },
  {
    value: "SCHEDULEREVIEW",
    text: "排产评审中",
    checked: true,
  },
  {
    value: "REVIEWFAIL",
    text: "审核未通过",
    checked: true,
  },
  {
    value: "TECHNOLOGYREVIEW",
    text: "技术审核中",
    checked: true,
  },
  {
    value: "PRODUCT",
    text: "生产中",
    checked: true,
  },
  {
    value: "PRODUCTEND",
    text: "生产完成",
    checked: true,
  },
  {
    value: "INSTALL",
    text: "安装中",
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
  let arr: any = [];
  for (let i = 0; i < 20; i++) {
    let obj = {
      id: i + 1,
      projectName: `第${i + 1}个项目`,
      user: "胡一鸣",
      businessMan: "胡一鸣",
      sellPerson: "胡一鸣",
      sendDate: "2023-08-15 14:25",
      remark: "胡一鸣备注",
      status: "DRAFT",
    };
    arr.push(obj);
  }
  tableList.value = arr;
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
