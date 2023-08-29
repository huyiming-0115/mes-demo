<template>
  <!-- 关联部门弹窗 -->
  <div style="height: 550px; overflow-y: auto">
    <!-- 表格 -->
    <a-spin :spinning="spinning">
      <a-table
        :dataSource="dataSource.data"
        :columns="columns"
        :pagination="false"
        rowKey="id"
        size="small"
        :row-class-name="(_record: any, index: number): any => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        sticky
      >
        <!-- 表体插槽 -->
        <template #bodyCell="{ record, column, index, text }"></template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
      </a-table>
    </a-spin>
  </div>
  <div class="flex-center mt48">
    <a-button class="mr32 w100 h35" @click="closeFn">质检不合格</a-button>
    <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="closeFn"
      >质检合格</a-button
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const { row } = defineProps<{
  row: any;
}>();
let spinning = ref<boolean>(false);
const closeFn = () => {
  emit("close");
};
// 表头
const columns = [
  {
    title: "工序名称",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
  },
  {
    title: "标准尺寸",
    dataIndex: "normal",
    key: "normal",
    ellipsis: true,
  },
  {
    title: "检测方法",
    dataIndex: "check",
    key: "check",
  },
  {
    title: "允许误差",
    dataIndex: "error",
    key: "error",
  },
  {
    title: "实际尺寸",
    dataIndex: "actu",
    key: "actu",
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

const getListFn = async () => {
  spinning.value = true;
  let arr: any = [];
  for (let i = 0; i < 30; i++) {
    let obj = {
      id: i + 1,
      name: "下拉选择工序(下拉选择框加搜索功能)",
      normal: "41mm",
      check: "标尺",
      error: "1mm",
      actu: "14mm",
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
