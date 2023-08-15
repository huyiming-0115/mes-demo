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
            <Filter :list="filterList" @submit="(list) => filterSubmitFn(list, confirm)" @cancel="confirm()"></Filter>
          </div>
        </template>
        <!-- 图标插槽 -->
        <template #customFilterIcon="{ column }">
          <div v-if="column.key === 'state'" style="width: 16px; height: 16px;">
            <q-svg width="16" height="16" name="filter" :class="filterChecked ? 'filter-result' : ''" />
          </div>
        </template>
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index }">
          <!-- 状态 -->
          <div v-if="column.key === 'state'">
            <a-dropdown trigger="click">
              <div class="flex-between w90 pointer">
                <!-- 左侧 这里到时候改成v-show三个盒子 -->
                <div class="flex-start">
                  <div class="flex-center-col">
                    <q-svg width="8" height="8" name="round-green" />
                  </div>
                  <div class="font-green ml5">在职</div>
                </div>
                <!-- 下拉图标 -->
                <div class="flex-center-col">
                  <q-svg width="8" height="5" name="next" />
                </div>
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div class="flex-start" @click="developFn">
                      <div class="flex-center-col">
                        <q-svg width="8" height="8" name="round-green" />
                      </div>
                      <div class="font-green ml5">在职</div>
                    </div>
                  </a-menu-item>
                  <a-menu-item>
                    <div class="flex-start" @click="developFn">
                      <div class="flex-center-col">
                        <q-svg width="8" height="8" name="round-red" />
                      </div>
                      <div class="font-red ml5">离职</div>
                    </div>
                  </a-menu-item>
                  <a-menu-item>
                    <div class="flex-start" @click="developFn">
                      <div class="flex-center-col">
                        <q-svg width="8" height="8" name="round-grey" />
                      </div>
                      <div class="font-grey ml5">退休</div>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click="">修改</div>
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
const developFn = () => {
  ElMessage.warning("开发中");
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
    title: "人员账号",
    dataIndex: "account",
    key: "account",
    width: 90,
  },
  {
    title: "人员姓名",
    dataIndex: "name",
    key: "name",
    width: 120,
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "phone",
    width: 120,
    ellipsis: true,
  },
  {
    title: "所属部门",
    dataIndex: "depart",
    key: "depart",
    width: 150,
    ellipsis: true,
  },
  {
    title: "所属岗位",
    dataIndex: "role",
    key: "role",
    width: 150,
    ellipsis: true,
  },
  {
    title: "在职状态",
    dataIndex: "state",
    key: "state",
    width: 120,
    customFilterDropdown: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
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

/**
 * filterList 筛选列表
 * filterChecked 控制筛选的值
 * filterSubmitFn 筛选确定函数
 */
const filterList: any = [
  {
    value: 0,
    text: "在职",
    checked: true,
  },
  {
    value: 1,
    text: "离职",
    checked: true,
  },
  {
    value: 2,
    text: "退休",
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
      account: "hym",
      name: "胡一鸣",
      phone: 18879118804,
      depart: "FBI部门",
      role: "超级管理员",
      state: 1,
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
      account: "hym",
      name: "胡一鸣",
      phone: 18879118804,
      depart: "FBI部门",
      role: "超级管理员",
      state: 0,
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

:deep(.ant-table-thead .ant-table-cell) {
  background-color: rgba(245, 245, 247, 1);
  font-size: 14px;
  font-weight: 600;
}
</style>
