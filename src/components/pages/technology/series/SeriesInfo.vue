<template>
  <div style="height: 330px; padding-left: 5px">
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
        <a-col :span="24">
          <a-form-item label="系列名称" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
              placeholder="最好是下拉选择框"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="电梯类型" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开门方式" name="productName">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productName"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="机房" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="对重位置" name="productName">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productName"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="井道结构" name="productNo">
            <a-input
              :maxlength="20"
              style="width: 100%"
              v-model:value="formState.productNo"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
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
});
const closeFn = () => {
  emit("close");
};
const submitFn = () => {
  emit("close");
};
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
