<template>
  <!-- 新增品牌弹窗 -->
  <div style="height: 460px;">
    <a-form :model="formState" ref="modelForm" name="basic" v-bind="layout" style="height: 400px;" autocomplete="off" :layout="'horizontal'">
      <!--  品牌名称  -->
      <a-form-item class="form-item-require wb100" label="品牌名称" name="brandName" :rules="rules.brandName">
        <a-input placeholder="请填写品牌名称" :disabled="config.detail" v-model:value="formState.brandName" :maxlength="26" />
      </a-form-item>
      <!--  品牌性质  -->
      <a-form-item class="form-item-require" label="品牌性质" name="type" :rules="rules.type">
        <a-select
          v-model:value="formState.type"
          :disabled="config.detail"
          placeholder="请选择品牌性质"
          @change="changeTypeFn"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option :value="0">自由品牌</a-select-option>
          <a-select-option :value="1">OEM品牌</a-select-option>
        </a-select>
      </a-form-item>
      <!-- 经销商信息 -->
      <a-form-item v-if="changeTypeFn()" class="form-item-require" label="经销商信息" name="dealer" :rules="rules.dealer">
        <a-input placeholder="请填写经销商信息" :disabled="config.detail" style="width: 100%;" v-model:value="formState.dealer" :maxlength="26" />
      </a-form-item>
      <!-- 联系方式 -->
      <a-form-item label="联系方式" class="form-item-require" name="phone" :rules="rules.phone">
        <a-input-number
          id="inputNumber"
          :disabled="config.detail"
          placeholder="请输入手机号"
          :controls="false"
          style="width: 100%;"
          v-model:value="formState.phone"
          :min="1"
        />
      </a-form-item>
      <!-- 品牌logo -->
      <a-form-item class="form-item-require" label="品牌LOGO" name="fileList" :rules="rules.fileList">
        <el-upload
          accept=".jpg,.png"
          v-model:file-list="fileList"
          :disabled="config.detail"
          :class="fileList.length === 1 ? 'mes-el-upload' : ''"
          action="#"
          :http-request="uploadFn"
          :before-upload="beforeUploadFn"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
        >
          <!-- 加号的图标 -->
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <!-- 图片预览弹窗 -->
        <el-dialog v-model="dialogVisible" :append-to-body="true" width="500" draggable :close-on-click-modal="false" destroy-on-close title="图片预览">
          <img w-full :src="dialogImageUrl" alt="失败" class="wb100" />
        </el-dialog>
      </a-form-item>
    </a-form>
    <div>{{ formState.logoUrl }}</div>
    <div class="flex-center mt32">
      <a-button class="mr32 w100 h35" @click="closeFn">{{ config.detail ? "关闭" : "取消" }}</a-button>
      <a-button v-throttle class="w100 h35 primary-button" type="primary" v-if="!config.detail" @click="submitFn">确定</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
const { pid, row } = defineProps<{
  pid: string;
  row?: any;
}>();
const emit = defineEmits(["close"]);
const layout: any = {
  labelCol: {
    style: {
      width: "100px",
      textAlign: "left",
    },
  },
  wrapperCol: { span: 24 },
};
// 手机号校验规则
const checkPhoneFn = () => {
  let str = /^1[3456789]\d{9}$/;
  const res = str.test(formState.phone);
  if (!res) return Promise.reject("手机号格式不正确");
  if (res) return Promise.resolve();
};
// 上传logo的校验规则
const checkFileListFn = () => {
  if (!fileList.value.length) return Promise.reject("请上传Logo");
  return Promise.resolve();
};

// 品牌性质change事件
const changeTypeFn: any = () => {
  // <!-- 选择自由品牌时需要增加经销商信息 选择OEM时不需要增加经销商信息 -->
  let flag = false;
  formState.type === 0 && (flag = true);
  formState.type !== 0 && (flag = false);
  return flag;
};
// 表单数据
const formState: any = reactive({
  brandName: undefined, //品牌名称
  type: undefined, //品牌性质
  dealer: undefined, //经销商信息
  phone: undefined, //联系方式
  logo: undefined, // 品牌logo
});
// 所有校验规则
const rules: any = {
  brandName: [
    { required: true, message: "请填写品牌名称" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
  type: [{ required: true, message: "请选择品牌性质" }],
  dealer: [{ required: true, message: "请选择经销商信息" }],
  phone: [{ validator: checkPhoneFn, trigger: "change" }],
  logoUrl: [{ required: true, message: "请上传logo" }],
  fileList: [{ validator: checkFileListFn, trigger: ["change", "blur"] }],
};
// ref
const modelForm = ref();
// 提交按钮
const submitFn = async () => {
  const res = await modelForm.value
    .validateFields()
    .then((res: any) => res)
    .catch((_err: any) => "error");
  console.log(res, "校验结果");
  if (res === "error") return ElMessage.error("校验未通过");
  // 经销商默认给一个--
  formState.type === 1 && (formState.dealer = "--");
  addSubmitFn();
};
const getListFn: any = inject("getListFn");
// 新增品牌提交函数
const addSubmitFn = async () => {
  /*   const logoArr = fileList.value.map((x: any) => {
    return {
      name: x.name,
      url: x.url,
    };
  });
  let logo = logoArr.at().name + ",,," + logoArr.at().url;
  const data = {
    ...formState,
    logo,
  };
  const res = await brandRequest.addBrandApi(data);
  if (res.code !== 200) return ElMessage.warning(res.message || "新增失败");
  res.code === 200 && ElMessage.success("新增品牌成功");
  getListFn(); // 最外层刷新列表 建议调用 */
  closeFn();
};
// 修改品牌提交函数
const editSubmitFn = async () => {
  /*   const logoArr = fileList.value.map((x: any) => {
    return {
      name: x.name,
      url: x.url,
    };
  });
  let logo = logoArr.at().name + ",,," + logoArr.at().url;
  const data = {
    ...formState,
    logo,
    id: row.id,
  };
  const res = await brandRequest.editBrandApi(data);
  if (res.code !== 200) return ElMessage.warning(res.message || "修改失败");
  res.code === 200 && ElMessage.success("修改品牌成功");
  getListFn(); // 最外层刷新列表 建议调用
  closeFn(); */
};
// 关闭按钮
const closeFn = () => {
  emit("close");
};
// 文件列表
const fileList: any = ref([]);
// 临时图片路径
const dialogImageUrl = ref("");
// 弹窗开关
const dialogVisible = ref(false);
// 预览的函数
const handlePictureCardPreview: any = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 上传前的校验
const beforeUploadFn = (rawFile: any) => {
  // 可以在这里校验 也可以直接accept校验
  // if (rawFile.type !== "image/svg+xml") {
  //     ElMessage.error("不是一个图片");
  //     return false;
  // } else
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("只能上传2M以内的文件");
    return false;
  }
  // ElMessage.success("校验成功");
  return true;
};
// 上传函数
const uploadFn = async (data: any) => {
  // 封装FormData对象
  let formData = new FormData();
  formData.append("file", data.file);
  formData.append("type", "1");
  // 调用后端接口
  let url = `http://emes.hzcloudstream.com/emes/api/file/upload`;
  // let url = `http://192.168.22.108:8087/file/upload`;
  /*   const { data: res } = await axios.post(url, formData, uploadHeader); */
  /*   console.log(res, "res");
  if (res.code === 200) {
    ElMessage.success("上传成功");
    // 上传成功需要把url强制放进去
    data.onSuccess(res); //显示绿色对钩
    let baseUrl = "http://emes.hzcloudstream.com";
    fileList.value.at(-1)!.url = baseUrl + res.data.fileUrl;
    // 从新调一下表单验证
    modelForm.value.validateFields("fileList");
  } */
  /*   if (res.code !== 200) {
    ElMessage.warning("上传失败");
    data.onError(); //不会向列表里面push了
  } */
  // 最后提交数据的时候需要注意,map一下，只留name跟url  ******
};
// 回显函数
const echoFn = () => {
  formState.brandName = row.brandName;
  formState.type = row.type;
  formState.dealer = row.dealer;
  formState.phone = row.phone;
  // 回显logo
  //const logoArr = row.logo.split(",,,");
  /*   console.log(logoArr, "logoArr");
  const data = {
    name: logoArr.at(0),
    url: logoArr.at(1),
  };
  fileList.value.push(data); */
};
// 弹窗配置项
const config: any = reactive({
  detail: false,
});
// 查看详情
const detailFn = () => {
  echoFn();
  config.detail = true;
};
const createdFn = () => {
  pid === "add" && console.log("%c%s", "color:blue", "add");
  pid === "edit" && echoFn();
  pid === "detail" && detailFn();
  console.log(row, "row");
};
createdFn();
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";

// element的上传组件样式问题
:deep(.ant-form input[type="file"]) {
  display: none;
}

// 上传组件的大小
:deep(.el-upload) {
  width: 100px !important;
  height: 100px !important;
}

// 上传后卡片图片的大小
:deep(.el-upload-list--picture-card) {
  width: 100px;
  height: 100px;
}

// 卡片里面撑出来的大小
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  height: 100%;
}

// 上传组件里图片的大小
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

// 依靠动态类名控制盒子是否显示
.mes-el-upload :deep(.el-upload--picture-card) {
  display: none;
}

// 默认的上传边框样式
:deep(.el-upload--picture-card) {
  border: 1px solid #d9d9d9 !important;
}

// 鼠标经过的样式
:deep(.el-upload--picture-card:hover) {
  border: 1px solid #3381b8 !important;
}
</style>
