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
          <div v-if="column.key == 'civil'">
            <div class="btn-link" @click.stop="showCivilFn(record)">上传查看</div>
          </div>
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link">查看详情</div>
            <div class="btn-link ml24">修改</div>
            <div class="btn-link ml24">打印</div>
            <a-popconfirm title="确定移除部门吗?" :getPopupContainer="(triggerNode): any => triggerNode.parentNode" @confirm="removeFn(record)">
              <template #default>
                <div class="btn-link ml24">移除</div>
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
            <div class="btn-link" @click="addFn">新增明细</div>
          </div>
        </template>
      </a-table>
    </a-spin>
    <!-- 添加部门弹窗 -->
    <!--     <MDialog :dialog="dialog">
      <DepartAddSyetemCompany @close="dialog.show = false" :pid="dialog.flag" :row="dialog.row" />
    </MDialog> -->

    <MDialog :dialog="dialogCivil">
      <CivilDialog @close="dialogCivil.show = false" :pid="dialogCivil.flag" :row="dialogCivil.row" />
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

let dialogCivil: any = reactive({
  row: {},
  show: false,
  flag: "add",
  title: "土建配置",
  width: 700,
});
// 添加部门
const addFn = () => {
  /*   dialog.flag = "add";
  dialog.show = true; */
};
// 关闭部门
const closeFn = () => {
  getListFn();
  dialog.show = false;
};

const showCivilFn = (item: any) => {
  dialogCivil.row = item;
  dialogCivil.show = true;
};
// 表头
const columns = [
  /*   {
    title: "序号",
    dataIndex: "id",
    key: "id",
    ustomRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  }, */
  {
    title: "电梯系列",
    dataIndex: "serize",
    key: "serize",
    width: 200,
    ellipsis: true,
  },
  {
    title: "电梯装潢",
    dataIndex: "dress",
    key: "dress",
    width: 200,
    ellipsis: true,
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "非标备注",
    dataIndex: "remark",
    key: "remark",
  },
  {
    title: "土建配置",
    dataIndex: "civil",
    key: "civil",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 280,
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
  for (let i = 0; i < 1; i++) {
    let obj = {
      id: i + 1,
      serize: "电梯系列",
      dress: "电梯装潢",
      num: 5,
      remark: "电梯相关非标备注",
      civil: "",
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};
// 移除操作
const removeFn = async (record: any) => {
  dataSource.data.splice(record.id - 1, 1);
  ElMessage.success(`模拟移除第${record.id}个电梯成功`);
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
