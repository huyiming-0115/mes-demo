<template>
  <div style="height: 350px; padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 282px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="产品编号" name="productNo">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productNo" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="产品名称" name="productName">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productName" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="规格型号" name="productModel">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productModel" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="单位" name="productUnit">
            <a-input :maxlength="20" style="width: 100%;" v-model:value="formState.productUnit" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="单价" name="productPrice">
            <a-input placeholder="请填写产品单价" :maxlength="20" style="width: 100%;" v-model:value="formState.productPrice" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
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
// 表单数据
const formState = reactive({
  productNo: "",
  productName: "",
  productModel: "",
  productUnit: "",
  productPrice: "",
});
const closeFn = () => {
  emit("close");
};
const submitFn = () => {
  emit("close");
};
onMounted(() => {
  formState.productNo = row.no;
  formState.productName = row.name;
  formState.productModel = row.model;
  formState.productUnit = row.unit;
  formState.productPrice = row.price;
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
