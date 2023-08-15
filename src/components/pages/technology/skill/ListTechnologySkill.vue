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
          <!-- 生产指令表 -->
          <div v-if="column.key === 'bom'" class="flex-start">
            <div class="btn-link" @click="">配置BOM清单</div>
            <div class="btn-link ml24" @click="">上传生产附图</div>
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click="">项目详情</div>
            <div class="btn-link ml24" @click="">查看原因</div>
            <a-popconfirm title="确定提交该条数据进行审核?" @confirm="">
              <template #default>
                <div class="btn-link ml24">提交审核</div>
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
    dataIndex: "number",
    key: "number",
    customRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "项目名称",
    dataIndex: "projectName",
    key: "name",
    ellipsis: true,
  },
  {
    title: "商务负责人",
    dataIndex: "businessMan",
    key: "businessMan",
    width: 110,
    ellipsis: true,
  },
  {
    title: "电梯系列",
    dataIndex: "series",
    key: "series",
    width: 110,
    ellipsis: true,
  },
  {
    title: "生产指令表",
    dataIndex: "bom",
    key: "bom",
    width: 280,
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
    value: "DEAL",
    text: "待处理",
    checked: true,
  },
  {
    value: "REVIEW",
    text: "待审核",
    checked: true,
  },
  {
    value: "REVIEWFAIL",
    text: "审核未通过",
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
      businessMan: "胡一鸣",
      series: "GL3600",
      status: "DEAL",
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
