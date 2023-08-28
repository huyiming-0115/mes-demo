<template>
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 260px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 项目名称 -->
      <a-form-item label="工序名称" name="name">
        <a-input placeholder="请填写工序名称(下拉选择框最好)" style="width: 100%;" v-model:value="formState.name" />
      </a-form-item>
      <!-- 购买用户 -->
      <a-form-item label="标准尺寸" name="size">
        <a-input placeholder="请填写标准尺寸" style="width: 100%;" v-model:value="formState.size" />
      </a-form-item>
      <!-- 权限组类型 -->
      <a-form-item label="检测方法" name="method">
        <a-input placeholder="请填写检测方法" style="width: 100%;" v-model:value="formState.method" />
      </a-form-item>
      <a-form-item label="允许误差" name="error">
        <a-input placeholder="请填写允许误差" style="width: 100%;" v-model:value="formState.error" />
      </a-form-item>
    </a-form>
    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="submitFn">确定</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<{
  pid?: string;
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
  name: "", //资源标题
  size: "",
  method: "", //资源说明
  error: "", //选择的资源id
});
// 关闭弹窗
const closeFn = () => {
  emit("close");
};

const submitFn = () => {
  emit("close");
};

onMounted(() => {
  if (pid === "edit") {
    formState.name = row.name;
    formState.size = row.size;
    formState.method = row.method;
    formState.error = row.error;
  }
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
