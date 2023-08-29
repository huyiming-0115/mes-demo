<template>
  <div style="height: 680px; padding-left: 5px">
    <h3>图纸管理</h3>
    <a-button type="primary" class="primary-button" style="margin: 10px 0"
      >上传图纸</a-button
    >
    <h3>物料信息</h3>
    <div style="height: 500px; overflow-y: auto; margin-top: 15px; width: 100%">
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
          <template #bodyCell="{ record, column, index, text }">
            <div v-if="column.key === 'operate'" class="flex-start">
              <div class="btn-link">查看详情</div>
              <div class="btn-link ml24">编辑</div>
            </div>
          </template>
          <!-- 空表格时候的插槽 -->
          <template #emptyText>
            <Empty></Empty>
          </template>
        </a-table>
      </a-spin>
    </div>
    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
      <a-button
        v-throttle
        class="w100 h35 primary-button"
        type="primary"
        @click="submitFn"
        >确定</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<{
  pid: any;
  row?: any;
}>();
const emit = defineEmits(["close"]);
const labelCol: any = {
  style: {
    width: "110px",
    textAlign: "left",
  },
};

let spinning = ref<boolean>(false);

// 表头
const columns = [
  {
    title: "参数代号",
    dataIndex: "id",
    key: "id",
    ustomRender: ({ index }: any) => `${index + 1}`,
    width: 100,
  },
  {
    title: "参数名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "参数类型",
    dataIndex: "type",
    key: "type",
    ellipsis: true,
  },
  {
    title: "计算公式",
    dataIndex: "exp",
    key: "exp",
    ellipsis: true,
  },
  {
    title: "限制条件",
    dataIndex: "set",
    key: "set",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 180,
    ellipsis: true,
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
      name: "1500",
      type: "1500",
      exp: "1500",
      set: "1500",
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};

// 表单数据
const formState = reactive({
  productNo: "",
  productName: "",
  productModel: "",
  productUnit: "",
});
const closeFn = () => {
  emit("close");
};
const submitFn = () => {
  emit("close");
};
onMounted(() => {
  if (pid === "edit") {
    formState.productNo = row.no;
    formState.productName = row.name;
    formState.productModel = row.model;
    formState.productUnit = row.unit;
  }
  getListFn();
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
@import "@/assets/styles/base/antdTable.less";
</style>
