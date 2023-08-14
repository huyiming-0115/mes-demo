<template>
  <div>
    <div class="flex-between" style="margin-bottom: 10px;">
      <div style="width: 400px;">
        <el-upload v-model="configUpload.file" class="upload-demo" action="#" :http-request="uploadFn" multiple
          accept=".jpg,.png" :show-file-list="false">
          <a-button type="primary">
            <div class="flex-start">
              <div class="flex-center-col">
                <q-svg width="15" height="15" name="upload" />
              </div>
              <div class="ml5">
                {{ configUpload.btnTitle }}
              </div>
            </div>
          </a-button>
          <template #tip>
            <div class="el-upload__tip">只能上传***格式得文件</div>
          </template>
        </el-upload>
      </div>
      <div class="box-right" style="width: 200px;text-align: center;">预览</div>
    </div>
    <!-- center -->
    <div class="flex-between">
      <!-- left -->
      <div style="width: 400px; height: 400px">
        <VueCropper ref="cropperRef" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType"
          :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"
          :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove"
          :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox"
          :infoTrue="option.infoTrue" :full="option.full" :enlarge="option.enlarge" :mode="option.mode"
          @realTime="realTime">
        </VueCropper>
      </div>
      <!-- right -->
      <div class="box-right pl20" style="width: 200px">
        <!-- 原始图片 -->
        <div class="flex-center-col">
          <p>原始图片</p>
          <div style="border: 1px solid grey;">
            <img :src="option.img" style="max-width: 150px" />
          </div>
        </div>
        <!-- 大头像 -->
        <div class="flex-center-col mt10">
          <p>大头像80*80</p>
          <div :style="previewStyle1" style="border-radius: 50%;border: 1px solid grey;">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
        <!-- 小头像 -->
        <div class="flex-center-col mt10">
          <p>小头像40*40</p>
          <div :style="previewStyle2" style="border-radius: 50%;border: 1px solid grey;">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="false">
      <el-button @click="lookFn">按钮</el-button>
      <el-button @click="rotateFn('left')">左旋转</el-button>
      <el-button @click="rotateFn('right')">右旋转</el-button>
      <el-button @click="submitFn">确定</el-button>
      <el-button @click="changeFn">更换图片</el-button>
    </div>
    <div class="flex-center mt32">
      <a-button class="mr32 w100" @click="closeFn">取消</a-button>
      <a-button class="w100" type="primary" @click="submitFn">确定</a-button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import axios from "axios";
import { uploadHeader } from '@/utils/base'
// 需要引入的库
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";
import svg from "../../../assets/img/look.png";
import img from "../../../assets/img/look.png";
const { imgUrl } = defineProps<{
  imgUrl: string;
}>();
const emit = defineEmits<{
  (e: "message", val: any): void;
  (e: "close"): void;
}>();
const option: any = reactive({
  img: img, // 裁剪图片的地址 url 地址, base64, blob
  outputSize: 1, // 裁剪生成图片的质量
  outputType: "png", // 裁剪生成图片的格式 jpeg, png, webp
  info: true, // 裁剪框的大小信息
  canScale: true, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 100, // 默认生成截图框宽度
  autoCropHeight: 100, // 默认生成截图框高度
  fixedBox: false, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例
  fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: true, // 上传图片是否可以移动
  canMoveBox: true, // 截图框能否拖动
  original: true, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: false, // 是否输出原图比例的截图
  enlarge: "1", // 图片根据截图框输出比例倍数
  mode: "contain", // 图片默认渲染方式 contain , cover, 100px, 100% auto
});
const configUpload: any = reactive({
  file: undefined, //
  btnTitle: '选择图片'
})
// 预览信息
let previews: any = reactive({
  url: "",
  img: "",
});
// 样式
let previewStyle1: any = reactive({});
let previewStyle2: any = reactive({});
const lookFn = () => {
  console.log(previews, "previews");
};

// 拖动事件
const realTime = (data: any) => {
  Object.assign(previews, data);
  Object.assign(previewStyle1, {
    width: data.w + "px",
    height: data.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: 100 / data.w,
  });
  Object.assign(previewStyle2, {
    width: data.w + "px",
    height: data.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: 40 / data.w,
  });
};
const cropperRef = ref<any>(null);
// 旋转事件
const rotateFn = (direction: string) => {
  direction === "left" && cropperRef.value.rotateLeft();
  direction === "right" && cropperRef.value.rotateRight();
};
// 关闭弹窗
const closeFn = () => {
  emit('close')
}
// 提交事件
const submitFn = () => {
  ElMessage.warning('开发中');
  // return
  cropperRef.value.getCropData((data: any) => {
    // console.log(data, "data");
    const res = changeBase64(data, "zs");
    // console.log(res, "res"); //file类型文件
    // 然后调取文件上传的接口 拿到url可以直接赋值了
    submitUploadFn(res)
    // 保存到个人信息里
  });
};
// 更换图片
const uploadFn: any = async (data: any) => {
  console.log(data, 'data')
  const url = URL.createObjectURL(data.file)
  option.img = url;
  console.log(url, 'url')
};
// 提交时的上传
const submitUploadFn = async (file: any) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("type", '1');
  let url = `http://emes.hzcloudstream.com/emes/api/file/upload`;
  const { data: res } = await axios.post(url, formData, uploadHeader)
  console.log(res, 'res');
  let baseUrl = 'http://emes.hzcloudstream.com';
  let targetUrl = baseUrl + res.data.fileUrl;//把这个url传到后端，然后关闭弹窗刷新即可
  console.log(targetUrl)
}
/**
 * base64转化为file类型
 */
const changeBase64 = (data: any, name: any) => {
  let arr = data.split(",");
  let type = arr[0].match(/:(.*?);/)[1];
  let fileExt = type.split("/")[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${name}.` + fileExt, {
    type: type,
  });
};
//图片url转化为base64编码的方式
const getBase64 = (imgUrl: any) => {
  let base64 = "";
  false && base64
  window.URL = window.URL || window.webkitURL;
  let xhr = new XMLHttpRequest();
  xhr.open("get", imgUrl, true);
  // 至关重要
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (this.status == 200) {
      //得到一个blob对象
      let blob = this.response;
      // 至关重要
      let oFileReader = new FileReader();
      oFileReader.onloadend = function (e: any) {
        // 此处拿到的已经是 base64的图片了
        if (e) {
          base64 = e.target.result;
        }
        // this.option.img = base64;  执行其他代码逻辑
      };
      oFileReader.readAsDataURL(blob);
    }
  };
  xhr.send();
};
false && getBase64
// 更换图片
const changeFn = () => {
  // 思路:调上传文件接口
  // emit("message", 666);
  // ElMessage.warning("开发中，本地效果");
  option.img = svg;
};
const createdFn = () => {
  option.img = imgUrl;
  // console.log(imgUrl, "imgUrl");
  console.log("created");
};
createdFn();
</script>
  
<style scoped lang="less">
.show-preview {
  border: 1px solid black;
}

.box-right {
  border-left: 1px solid grey;
}
</style>
  