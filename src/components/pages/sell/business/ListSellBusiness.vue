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
            <Filter :list="filterStatusList" @submit="(list) => filterStatusSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
          <div v-if="column.key === 'sellType'">
            <Filter :list="filterTypeList" @submit="(list) => filterTypeSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'status'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterStatusChecked ? 'filter-result' : ''" />
          </div>
          <div v-if="column.key === 'sellType'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterTypeChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 序号 -->
          <div v-if="column.title === '序号'">
            <div>{{ index + 1 }}</div>
          </div>
          <!-- 操作 -->
          <div v-if="column.title === '操作'" class="flex-start">
            <template v-if="record.status === 'DRAFT'">
              <div class="btn-link" @click="">项目详情</div>
              <div class="btn-link ml24" @click.stop="editProjectFn(record)">修改</div>
              <div class="btn-link ml24" @click.stop="elevatorDetailFn(record)">电梯明细</div>
              <div class="btn-link ml24" @click="">提交评审</div>
              <div class="btn-link ml24" @click="">打印</div>
              <a-popconfirm title="确定删除这条数据吗?" @confirm="">
                <template #default>
                  <div class="btn-link ml24">删除</div>
                </template>
              </a-popconfirm>
            </template>
            <template v-else-if="record.status === 'DEAL'">
              <div class="btn-link" @click="">项目详情</div>
              <div class="btn-link ml24" @click="">排产评审</div>
              <div class="btn-link ml24" @click="">打印</div>
            </template>
            <template v-else>
              <div class="btn-link" @click="">项目详情</div>
              <div class="btn-link ml24" @click="">打印</div>
            </template>
          </div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>

  <MDialog :dialog="dialogPro">
    <ProjectSellBusiness @close="dialogPro.show = false" :dialog="dialogPro" :pid="dialogPro.flag" :row="dialogPro.row"></ProjectSellBusiness>
  </MDialog>

  <MDialog :dialog="dialogElevatorDetail">
    <ElevatorDetailBusiness @close="dialogElevatorDetail.show = false" :dialog="dialogElevatorDetail" :pid="dialogElevatorDetail.flag" :row="dialogElevatorDetail.row"></ElevatorDetailBusiness>
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
    width: 180,
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
    title: "销售类型",
    dataIndex: "sellType",
    key: "sellType",
    width: 110,
    ellipsis: true,
    customFilterDropdown: true,
  },
  {
    title: "交货日期",
    dataIndex: "sendDate",
    key: "sendDate",
    width: 160,
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
    ellipsis: true,
    customFilterDropdown: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 440,
  },
];

let dialogPro: any = reactive({
  show: false,
  title: "新增项目",
  flag: "edit",
  row: {},
  width: 700,
});

let dialogElevatorDetail: any = reactive({
  show: false,
  title: "电梯明细",
  flag: "edit",
  row: {},
  width: 1200,
});

const editProjectFn = (item: any) => {
  dialogPro.show = true;
  dialogPro.row = item;
};


const elevatorDetailFn = (item:any) => {
  dialogElevatorDetail.row = item
  dialogElevatorDetail.show = true
}

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
const filterStatusList: any = [
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

const filterTypeList: any = [
  {
    value: "OEM",
    text: "OEM",
    checked: true,
  },
  {
    value: "AGENT",
    text: "代理商",
    checked: true,
  },
  {
    value: "SELL",
    text: "直销",
    checked: true,
  },
];

let selectStatusFilter: any = ref([]);
let filterStatusChecked = ref<boolean>(false);
const filterStatusSubmitFn = (list: any, confirm: any) => {
  // console.log(list, 'list');
  // 判断图标带不带颜色
  const arr = list.filter((x: any) => x.checked);
  arr.length === filterStatusList.length && (filterStatusChecked.value = false);
  arr.length !== filterStatusList.length && (filterStatusChecked.value = true);
  // 关闭弹窗
  confirm();
  // 处理数据  如果全选传null  确定 0 取消 1
  arr.length === 2 && (selectStatusFilter.value = null);
  arr.length === 1 && (selectStatusFilter.value = Number(arr.map((x: any) => x.value).join()));
  getListFn();
};
let selectTypeFilter: any = ref([]);
let filterTypeChecked = ref<boolean>(false);
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

// 获取列表数据
const getListFn = async (params?: any) => {
  console.log("列表组件内部传入数据==>", params);
  // 在这里处理数据
  spinning.value = true;
  spinning.value = false;

  let arr: any = [];
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i + 1,
      projectName: `第${i + 1}个项目`,
      user: "胡一鸣",
      businessMan: "胡一鸣",
      sellPerson: "胡一鸣",
      sellType: "OEM",
      sendDate: "2023-08-15 14:58",
      remark: "胡一鸣备注",
      status: getStatusEnum(i + 1),
    };
    arr.push(obj);
  }
  tableList.value = arr;
};

const getStatusEnum = (key: number) => {
  switch (key) {
    case 1:
      return "DRAFT";
    case 2:
      return "DEAL";
    case 3:
      return "REVIEWING";
    case 4:
      return "SCHEDULEREVIEW";
    case 5:
      return "REVIEWFAIL";
    case 6:
      return "TECHNOLOGYREVIEW";
    case 7:
      return "PRODUCT";
    case 8:
      return "PRODUCTEND";
    case 9:
      return "INSTALL";
    case 10:
      return "END";
    default:
      break;
  }
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
