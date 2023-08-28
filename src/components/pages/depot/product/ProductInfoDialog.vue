<template>
  <div style="height: 550px; padding-left: 5px;">
    <h3>基本信息</h3>
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 120px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="产品编号" name="productNo">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productNo" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="产品名称" name="productName">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productName" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="规格型号" name="productModel">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productModel" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="单位" name="productUnit">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productUnit" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <h3>关联供应商</h3>
    <div style="height: 300px; overflow-y: auto; margin-top: 15px;">
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
          :scroll="{ x: 1500 }"
        >
          <!-- 表体插槽 -->
          <template #bodyCell="{ record, column, index, text }">
            <div v-if="column.key == 'operate'" class="flex-start">
              <div class="btn-link">查看详情</div>
              <a-popconfirm title="确定移除部门吗?" :getPopupContainer="(triggerNode): any => triggerNode.parentNode" @confirm="removeFn(record.id)">
                <template #default>
                  <div class="btn-link ml24">移除</div>
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
    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="submitFn">确定</a-button>
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
    width: "90px",
    textAlign: "left",
  },
};

const removeFn = (index: any) => {
  dataSource.data.splice(index - 1, 1);
  ElMessage.success(`模拟移除第${index}个关联部门成功`);
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
    fixed: "left",
  },
  {
    title: "供应商名称",
    dataIndex: "name",
    key: "name",
    width: 250,
    ellipsis: true,
  },
  {
    title: "联系人",
    dataIndex: "linkman",
    key: "linkman",
    width: 250,
    ellipsis: true,
  },
  {
    title: "联系电话",
    dataIndex: "linkphone",
    key: "linkphone",
    width: 250,
    ellipsis: true,
  },
  {
    title: "税号",
    dataIndex: "tax",
    key: "tax",
    width: 250,
    ellipsis: true,
  },
  {
    title: "开户银行",
    dataIndex: "bank",
    key: "bank",
    width: 250,
    ellipsis: true,
  },
  {
    title: "公司账号",
    dataIndex: "account",
    key: "account",
    width: 250,
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 250,
    fixed: "right",
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
      linkman: "1500",
      linkphone: "1500",
      tax: "1500",
      bank: "1500",
      account: "1500",
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
  if(pid === 'edit'){
    formState.productNo = row.no
    formState.productName = row.name
    formState.productModel = row.model
    formState.productUnit = row.unit
  }
  getListFn();
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
