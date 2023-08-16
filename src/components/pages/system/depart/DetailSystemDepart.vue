<template>
  <!--公司管理=>关联部门=> 新增部门弹窗 -->
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
      <a-form-item class="form-item-require" label="部门名称" name="branchName" :rules="rules.branchName">
        <a-input placeholder="请填写部门名称" :maxlength="20" style="width: 100%;" v-model:value="formState.branchName" />
      </a-form-item>

      <a-form-item class="form-item-require" label="部门简介" name="explan" :rules="rules.explan">
        <a-textarea v-model:value="formState.explan" showCount :maxlength="200" placeholder="请填写部门简介" :auto-size="{ minRows: 3, maxRows: 6 }" />
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
  pid: string;
  row?: any;
}>();
const emit = defineEmits(["close"]);
const labelCol: any = {
  style: {
    width: "90px",
    textAlign: "left",
  },
};
const optionsConfig: any = reactive({
  organizeIdOptions: [],
});
const rules = {
  branchName: [
    { required: true, message: "请填写部门名称" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
  explan: [
    { required: true, message: "请填写部门简介" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
};
// 表单数据
const formState = reactive({
  branchName: "",
  explan: "",
  organizeId: undefined, //公司id
});
const closeFn = () => {
  emit("close");
};
// ref
const modelForm = ref();
const submitFn = async () => {
  const res = await modelForm.value
    .validateFields()
    .then((res: any) => res)
    .catch((_err: any) => "error");
  if (res === "error") return;
  addSubmitFn();
};
const getListFn: any = inject("getListFn");
// 新增提交函数
const addSubmitFn = async () => {
  closeFn();
};

// 回显处理函数
const echoFn = () => {
  formState.branchName = row.branchName;
  formState.explan = row.explan;
};

onMounted(() => {
  if (pid === "edit") {
    echoFn();
  }
});
// 接收行数据
const getCompanyRowFn: any = inject("getCompanyRowFn");
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
