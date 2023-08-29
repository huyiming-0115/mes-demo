<template>
  <div style="height: 680px; padding-left: 5px">
    <h3>基本信息</h3>
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 240px"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="下单日期" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
              placeholder="最好是下拉选择框"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="供应商" name="productName">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="交货日期" name="productName">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productName"
              placeholder="最好是下拉选择框"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="收货人姓名" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="收货人联系方式" name="productName">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productName"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="16">
          <a-form-item label="交货地址" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="16">
          <a-form-item label="备注" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
              placeholder="最好是下拉选择框"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <h3>物料信息</h3>
    <div style="height: 300px; overflow-y: auto; margin-top: 15px; width: 100%">
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
              <div class="btn-link">删除</div>
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
    title: "序号",
    dataIndex: "id",
    key: "id",
    ustomRender: ({ index }: any) => `${index + 1}`,
    width: 50,
  },
  {
    title: "产品编号",
    dataIndex: "no",
    key: "no",
    width: 180,
    ellipsis: true,
  },
  {
    title: "产品名称",
    dataIndex: "name",
    key: "name",
    width: 180,
    ellipsis: true,
  },
  {
    title: "规格型号",
    dataIndex: "model",
    key: "model",
    ellipsis: true,
  },
  {
    title: "库存数量",
    dataIndex: "unit",
    key: "unit",
    ellipsis: true,
  },
  {
    title: "实际数量",
    dataIndex: "remark",
    key: "remark",
    ellipsis: true,
  },
  {
    title: "备注",
    dataIndex: "num",
    key: "num",
    width: 180,
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 80,
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
      no: "1500",
      name: "1500",
      model: "1500",
      unit: "1500",
      remark: "1500",
      num: "15",
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
