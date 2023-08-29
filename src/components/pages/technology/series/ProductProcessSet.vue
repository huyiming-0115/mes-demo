<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 160px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 部门 -->
      <a-form-item class="form-item-require" label="工序名称" name="name" :rules="rules.name">
        <a-input placeholder="工序名称" style="width: 100%;" v-model:value="formState.name" />
      </a-form-item>
      <!-- 岗位 -->
      <a-form-item class="form-item-require" label="工序流程" name="title">
        <span class="btn-link">此处未来增加工序流程的增加操作</span>
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

// 弹窗所有变量
let dialogs: any = reactive({
  show: false,
  title: "装潢设置",
  flag: "add",
  row: {},
  width: 1200,
});

// 表单数据
const formState = reactive({
  name: "", //装潢名称
  decoration: {}, //装饰
});
// 校验规则
const rules = {
  name: [
    { required: true, message: "请填写装潢名称" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
};
// 关闭弹窗
const closeFn = () => {
  emit("close");
};

const setDressFn = () => {
  dialogs.show = true;
};

const getListFn: any = inject("getListFn");
// ref
const modelForm = ref();
// 表单验证
const submitFn = async () => {
  const res = await modelForm.value
    .validateFields()
    .then((res: any) => res)
    .catch((_err: any) => "error");
  if (res === "error") return;
};

onMounted(() => {
  if (pid === "edit" || pid === "detail") {
    console.log("传入的相关数据==>",row)
    formState.name = row.name;
  }
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
