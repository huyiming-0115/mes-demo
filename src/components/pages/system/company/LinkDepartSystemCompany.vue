<template>
  <!-- 关联部门弹窗 -->
  <div style="height: 500px; overflow-y: auto;">
    <!-- 表格 -->
    <a-spin :spinning="spinning">
      <a-table
        :dataSource="dataSource.data"
        :columns="columns"
        :pagination="false"
        rowKey="id"
        :customRow="onCustomRowFn"
        size="small"
        :row-class-name="(_record: any, index: number): any => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        sticky
      >
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index, text }">
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <a-popconfirm title="确定移除部门吗?" :getPopupContainer="(triggerNode): any => triggerNode.parentNode" @confirm="removeFn(record)">
              <template #default>
                <div class="btn-link">移除</div>
              </template>
            </a-popconfirm>
          </div>
          <div v-else class="ovhidden" :title="text">{{ text }}</div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
        <!-- footer -->
        <template #footer>
          <div class="flex-center-col">
            <div class="btn-link" @click="addFn">添加部门</div>
          </div>
        </template>
      </a-table>
    </a-spin>
    <!-- 添加部门弹窗 -->
    <MDialog :dialog="dialog">
      <DepartAddSyetemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row" />
    </MDialog>
  </div>
</template>

<script setup lang="ts">
const { row } = defineProps<{
  row: any;
}>();
let spinning = ref<boolean>(false);
// 弹窗所有变量
let dialog: any = reactive({
  row: {},
  show: false,
  flag: "add",
  title: "添加部门",
  width: 550,
});
// 添加部门
const addFn = () => {
  dialog.flag = "add";
  dialog.show = true;
};
// 关闭部门
const closeFn = () => {
  getListFn();
  dialog.show = false;
};
// 表头
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    ustomRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "部门名称",
    dataIndex: "branchName",
    key: "branchName",
    width: 250,
    ellipsis: true,
  },
  {
    title: "部门简介",
    dataIndex: "explan",
    key: "explan",
    width: 250,
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
  },
];

/**
 * 列表数据x
 */
const dataSource: {
  total: number;
  currentPage: number;
  pageSize: number;
  data: any[];
} = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 15,
  data: [],
});
// 表格配置项
const ListConfig: any = reactive({
  selectedRowKeys: [], //表格选中数组
});
// 选中表格checked
// const onSelectChangeFn: any = (selectedRowKeys: any) => {
//     ListConfig.selectedRowKeys = selectedRowKeys;
// };
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

const getListFn = async () => {
  spinning.value = true;
  let arr: any = [];
  for (let i = 0; i < 30; i++) {
    let obj = {
      id: i + 1,
      branchName: `第${i + 1}个部门`,
      explan: `第${i + 1}个部门的相关部门简介，原神启动，move，move`,
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};
// 移除操作
const removeFn = async (record: any) => {
  dataSource.data.splice(record.id - 1, 1);
  ElMessage.success(`模拟移除第${record.id}个关联部门成功`);
};
onMounted(() => {
  getListFn();
});
</script>

<style scoped lang="less">
// 底部的边框
:deep(.ant-table-footer) {
  border: 1px dashed #ebebeb;
}
</style>
