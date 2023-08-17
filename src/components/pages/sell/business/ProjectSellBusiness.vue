<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 400px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 项目名称 -->
      <a-form-item class="form-item-require" label="项目名称" name="projectName" :rules="rules.title">
        <a-input placeholder="请填写项目名称" style="width: 100%;" v-model:value="formState.projectName" />
      </a-form-item>
      <!-- 购买用户 -->
      <a-form-item class="form-item-require" label="购买用户" name="title" :rules="rules.title">
        <a-input placeholder="请填写购买用户" style="width: 100%;" v-model:value="formState.title" />
      </a-form-item>
      <!-- 权限组类型 -->
      <a-form-item class="form-item-require" label="销售类型" name="selectValue">
        <a-radio-group v-model:value="formState.type" @change="changeFn" name="radioGroup">
          <a-radio :value="0">直销</a-radio>
          <a-radio :value="1">OEM</a-radio>
          <a-radio :value="2">代理商</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item class="form-item-require" label="交货日期" name="title" :rules="rules.title">
        <a-input placeholder="请选择交货日期(日期选择框)" style="width: 100%;" v-model:value="formState.title" />
      </a-form-item>
      <!-- 权限组说明 -->
      <a-form-item label="备注" name="explain">
        <a-textarea v-model:value="formState.explain" placeholder="请输入项目相关备注" :maxlength="1000" showCount :auto-size="{ minRows: 4, maxRows: 4 }" />
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
  type: 0,
  title: "", //资源标题
  projectName: "",
  explain: "", //资源说明
  resourceId: [], //选择的资源id
});
// 校验规则
const rules = {
  title: [
    { required: true, message: "请填写权限组名称" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
};
// 关闭弹窗
const closeFn = () => {
  emit("close");
};

const submitFn = () => {
  emit("close");
};
// 单选更改
const changeFn = () => {
  console.log(formState.type, "raido");
};

onMounted(() => {
  if (pid === "edit") {
    formState.projectName = row.projectName;
  }
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
@import "@/assets/styles/base/antdTable.less";
</style>
