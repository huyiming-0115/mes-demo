<template>
  <!-- 关联部门弹窗 -->
  <div style="height: 550px; overflow-y: auto;">
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
            <div class="btn-link">查看详情</div>
          </div>
          <div v-else class="ovhidden" :title="text">{{ text }}</div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
  <div class="flex-center mt48">
    <a-button class="mr32 w100 h35" @click="closeFn">关闭</a-button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
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
  emit("close");
};

const showCivilFn = (item: any) => {
  dialogCivil.row = item;
  dialogCivil.show = true;
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
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
  },
  {
    title: "电梯装潢",
    dataIndex: "type",
    key: "type",
    ellipsis: true,
  },
  {
    title: "质检时间",
    dataIndex: "checkTime",
    key: "checkTime",
  },
  {
    title: "质检人员",
    dataIndex: "person",
    key: "person",
  },
  {
    title: "不合格原因",
    dataIndex: "result",
    key: "result",
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
  for (let i = 0; i < 30; i++) {
    let obj = {
      id: i + 1,
      name: "项目名称",
      type: "生产质检",
      checkTime: "2023-08-28",
      person: "伽椰子",
      result: "没啥理由，就是感觉不合格",
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
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
