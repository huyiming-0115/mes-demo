<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 220px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 权限组类型 -->
      <a-form-item class="form-item-require" label="项目名称" name="selectValue">
        <a-input v-model:value="formState.explain" placeholder="请选择供应商(下拉选择框)"/>
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

});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
@import "@/assets/styles/base/antdTable.less";
</style>
