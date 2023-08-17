<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 460px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 资源类型 -->
<!--       <a-form-item label="资源类型" name="selectValue">
        <a-radio-group v-model:value="formState.type" @change="changeFn" name="radioGroup">
          <a-radio :value="0">菜单</a-radio>
          <a-radio :value="1">资源</a-radio>
          <a-radio :value="2">白名单</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <!-- 资源路由 -->
      <a-form-item class="form-item-require" label="资源路由" name="route" :rules="rules.route">
        <a-select v-model:value="formState.route" placeholder="请选择资源路由" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="/work/storage">/work/storage</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 资源名称 -->
      <a-form-item class="form-item-require" label="资源名称" name="name" :rules="rules.name">
        <a-input placeholder="请填写资源名称" style="width: 100%;" v-model:value="formState.name" />
      </a-form-item>
      <!-- 资源标题 -->
      <a-form-item class="form-item-require" label="资源标题" name="title" :rules="rules.title">
        <a-input placeholder="请填写资源标题" style="width: 100%;" v-model:value="formState.title" />
      </a-form-item>
      <!-- 做校验用v-if  -->
      <!-- 顺序 -->
      <a-form-item class="form-item-require" v-if="formState.type === 0" label="顺序" name="serialNo" :rules="rules.serialNo">
        <a-input-number id="inputNumber" placeholder="请输入" :controls="false" v-model:value="formState.serialNo" :min="1" :max="99" />
      </a-form-item>
      <!-- 上级菜单 -->
      <a-form-item v-if="formState.type === 0" label="上级菜单" name="parentId">
        <a-select v-model:value="formState.parentId" allowClear placeholder="请选择上级菜单" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 关联菜单 -->
      <a-form-item class="form-item-require" v-if="formState.type === 1" label="关联菜单" name="method" :rules="rules.method">
        <a-select v-model:value="formState.method" placeholder="请选择关联菜单" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 资源图标 -->
      <a-form-item class="form-item-require" v-if="formState.type === 0" label="资源图标" name="icon" :rules="rules.icon">
        <a-input placeholder="请填写资源图标" style="width: 100%;" v-model:value="formState.icon" />
      </a-form-item>
      <!-- 资源说明 -->
      <a-form-item class="form-item-require" label="资源说明" name="desc" :rules="rules.desc">
        <a-textarea v-model:value="formState.desc" placeholder="请填写资源说明" :auto-size="{ minRows: 2, maxRows: 5 }" />
      </a-form-item>
    </a-form>
    <div class="flex-center mt32">
      <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="submitFn">确定</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { judgeNullRule, requiredRuleFn } from "@/utils/base";
import { arrToObjFn } from "@/utils/tools";
const { proxy }: any = getCurrentInstance();
const request = proxy.api.resource;
const { pid, row } = defineProps<{
  pid?: "add" | "edit";
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
  route: "", //资源路由
  name: "", //路由名称
  title: "", //资源标题
  serialNo: "", //顺序
  parentId: "", //上级菜单
  method: "", //关联菜单
  icon: "", //资源图标
  desc: "", //资源说明
});
// 校验规则
const rules = {
  route: [requiredRuleFn("请填写资源路由"), judgeNullRule],
  name: [requiredRuleFn("请填写公司名称"), judgeNullRule],
  title: [requiredRuleFn("请填写资源标题"), judgeNullRule],
  serialNo: [requiredRuleFn("请填写资源标题"), judgeNullRule],
  method: [requiredRuleFn("请选择关联菜单")],
  icon: [requiredRuleFn("请填写资源图标"), judgeNullRule],
  desc: [requiredRuleFn("请填写资源说明"), judgeNullRule],
};
// 关闭弹窗
const closeFn = () => {
  emit("close");
};
// 单选更改
const changeFn = () => {
  console.log(formState.type, "raido");
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
  console.log(res, "校验结果");
  if (res === "error") return;
  formState.type === 0 && menuSubmitFn();
  formState.type === 1 && resourceSubmitFn();
  formState.type === 2 && whiteSubmitFn();
  // ElMessage.success('校验通过');
};
// 菜单提交函数
const menuSubmitFn = async () => {
  const arr: any = ["type", "route", "name", "title", "serialNo", "parentId", "icon", "desc"];
  const data: any = arrToObjFn(formState, arr);
  data.serialNo = Number(data.serialNo);
  data.type = Number(data.type);
  // 这里需要区分一下是新增还是修改
  let res: any = null;
  pid === "add" && (res = await request.addResourceApi(data));
  pid === "edit" && (res = await request.editResourceApi(data));
  console.log(res, "res");
  res.code === 200 && ElMessage.success("保存成功");
  if (res.code !== 200) return ElMessage.warning(res.message || "保存失败");
  emit("close");
  getListFn();
};
// 资源提交函数
const resourceSubmitFn = async () => {
  const arr: any = ["type", "route", "name", "title", "method", "desc"];
  const data: any = arrToObjFn(formState, arr);
  let res: any = null;
  pid === "add" && (res = await request.addResourceApi(data));
  pid === "edit" && (res = await request.editResourceApi(data));
  console.log(res, "res");
  res.code === 200 && ElMessage.success("保存成功");
  if (res.code !== 200) return ElMessage.warning(res.message || "保存失败");
  emit("close");
  getListFn();
};
// 白名单提交函数
const whiteSubmitFn = async () => {
  const arr: any = ["route", "name", "title", "desc"];
  const data: any = arrToObjFn(formState, arr);
  let res: any = null;
  pid === "add" && (res = await request.addResourceApi(data));
  pid === "edit" && (res = await request.editResourceApi(data));
  console.log(res, "res");
  res.code === 200 && ElMessage.success("保存成功");
  if (res.code !== 200) return ElMessage.warning(res.message || "保存失败");
  emit("close");
  getListFn();
};
// 回显
const echoFn = async () => {
  console.log(row, "row");
  Object.assign(formState, { type: 0 }); //暂时回显个2
  // 调接口回显
  const id = row.id;
  const res = await request.queryResourceApi({ id });
  console.log(res, "查询回显的res");
};
// 初始化
const createdFn = () => {
  pid === "add" && console.log("%c%s", "color:green", "add");
  pid === "edit" && echoFn();
};
createdFn();
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
