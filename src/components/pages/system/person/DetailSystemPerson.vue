<template>
  <!-- 新增人员弹窗 -->
  <div>
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
      <a-form-item label="人员账号" name="account" :rules="rules.account">
        <a-input placeholder="请填写人员账号" style="width: 100%;" v-model:value="formState.account" />
      </a-form-item>
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item label="人员姓名" name="username" :rules="rules.username">
            <a-input placeholder="请填写人员姓名" style="width: 100%;" v-model:value="formState.username" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系电话" name="phone" :rules="rules.phone">
            <a-input-number id="inputNumber" placeholder="请填写联系电话" :controls="false" style="width: 100%;" v-model:value="formState.phone" :min="1" />
          </a-form-item>
        </a-col>
      </a-row>
      <!--       <a-form-item label="所属公司" name="organizeId" :rules="rules.organizeId">
        <a-select
          @change="organizeIdChangeFn"
          v-model:value="formState.organizeId"
          placeholder="请选择所属公司"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option v-for="(item, index) in optionsConfig.organizeIdOptions" :key="index" :value="item.id">
            {{ item.organizeName }}
          </a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item label="所属部门" name="branchId" :rules="rules.branchId">
        <a-select
          @change="branchIdChangeFn"
          v-model:value="formState.branchId"
          placeholder="请选择所属部门"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option v-for="(item, index) in optionsConfig.branchIdOptions" :key="index" :value="item.id">
            {{ item.branchName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="所属岗位" name="roleId" :rules="rules.roleId">
        <a-select v-model:value="formState.roleId" placeholder="请选择所属岗位" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
          <a-select-option v-for="(item, index) in optionsConfig.roleIdOptions" :key="index" :value="item.id">
            {{ item.roleName }}
          </a-select-option>
        </a-select>
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
  pid: "add" | "edit";
  row?: any;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
const labelCol: any = {
  style: {
    width: "90px",
    textAlign: "left",
  },
};

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
  console.log(res, "校验结果");
  if (res === "error") return ElMessage.error("校验未通过");
  addSubmitFn();
  console.log("%c%s", "color:blue", pid);
};
// 新增提交函数
const addSubmitFn = async () => {
  const data = {
    ...formState,
    branchId: String(formState.branchId),
    organizeId: String(formState.organizeId),
    roleId: String(formState.roleId),
    phone: String(formState.phone),
    companies: [],
    branches: [],
    roles: [],
  };
  /*   const res = await userRequest.addUserApi(data);
  if (res.code !== 200) return ElMessage.warning(res.message || "新增失败");
  res.code === 200 && ElMessage.success("新增人员成功"); */
  // getListFn()    // 最外层刷新列表 建议调用
  closeFn();
};
// 下拉框
const optionsConfig: any = reactive({
  organizeIdOptions: [], //所属公司options
  branchIdOptions: [
    { id: 1, branchName: "FBI部门" },
    { id: 2, branchName: "国情局" },
    { id: 3, branchName: "卡塞尔学院" },
  ], //所属部门options
  roleIdOptions: [
    { id: 1, roleName: "超级管理员" },
    { id: 2, roleName: "管理员" },
    { id: 3, roleName: "路明非" },
  ], //所属岗位options
});
// 表单数据
const formState: any = reactive({
  account: undefined, //人员账号
  username: undefined, //人员姓名
  phone: undefined, //联系电话
  organizeId: undefined, //所属公司
  branchId: undefined, //所属部门
  roleId: undefined, //所属岗位
});
const checkPhoneFn: any = async () => {
  let str = /^1[3456789]\d{9}$/;
  const res = str.test(formState.phone);
  if (!res) return Promise.reject("请输入正确得手机号");
  if (res) return Promise.resolve("正确");
};
// 校验规则
const rules: any = {
  account: [
    { required: true, message: "请填写人员账号" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
  username: [
    { required: true, message: "请填写人员姓名" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
  phone: [{ validator: checkPhoneFn, trigger: "change" }],
  //organizeId: [{ required: true, message: "请选择所属公司" }],
  branchId: [{ required: true, message: "请选择所属部门" }],
  roleId: [{ required: true, message: "请选择所属岗位" }],
};

// 查询所有公司
const getAllCompanyListFn = async () => {
  /*   const res = await departRequest.getAllCompanyApi();
  if (res.code !== 200) return ElMessage.error(res.message || "查询公司失败");
  optionsConfig.organizeIdOptions = res.data; */
};
// 公司改变时候的函数
const organizeIdChangeFn = () => {
  /*   formState.branchId = undefined;
  getAllDepartListFn(formState.organizeId); */
};
// 查询公司下面的部门
const getAllDepartListFn = async (id?: any) => {
  /*   const res = await postRequest.getAllDepartApi({ id });
  if (res.code !== 200) return ElMessage.error(res.message || "查询部门失败");
  res.data.length === 0 && ElMessage.warning("该公司下暂无部门");
  optionsConfig.branchIdOptions = res.data; */
};
// 部门改变时候的函数
const branchIdChangeFn = () => {
  //formState.roleId = undefined;
  // 调取根据部分获取岗位optipons的函数
  //getAllRoleListFn(formState.branchId);
};
// 根据部门查询岗位
const getAllRoleListFn = async (id?: any) => {
  /*   const res = await postRequest.getAllRoleListApi({ id });
  if (res.code !== 200) return ElMessage.error(res.message || "查询岗位失败");
  res.data.length === 0 && ElMessage.warning("该部门下暂无岗位");
  optionsConfig.roleIdOptions = res.data; */
};
const createdFn = async () => {
  /*   await getAllCompanyListFn();
  // 获取三个下拉框
  pid === "add" && console.log("%c%s", "color:green", "add");
  pid === "edit" && console.log("%c%s", "color:green", "edit");
  console.log(row, "row"); */
};
createdFn();
onMounted(() => {
  if (pid === "edit") {
    formState.account = row.account;
    formState.username = row.username;
    formState.phone = row.phone;
    formState.branchId = row.branchId;
    formState.roleId = row.roleId;
  }
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
</style>
