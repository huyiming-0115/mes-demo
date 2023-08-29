<template>
    <!-- 新增人员弹窗 -->
    <div style="padding-left: 5px; padding-right: 5px;">
      <div style="height: 520px; overflow-x: hidden; overflow-y: auto;">
        <a-form :model="formState" ref="modelForm" name="basic" :label-col="labelCol" :wrapper-col="{ span: 24 }" autocomplete="off" :layout="'horizontal'">
          <h3>轿厢装潢</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="8">
              <!-- 轿顶装饰 -->
              <a-form-item label="轿顶装饰" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 轿顶氛围灯 -->
              <a-form-item label="轿顶氛围灯" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 轿顶装饰 -->
              <a-form-item label="轿顶装饰" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <!-- 轿顶装饰 -->
              <a-form-item label="轿顶装饰" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 轿顶氛围灯 -->
              <a-form-item label="轿顶氛围灯" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 轿顶装饰 -->
              <a-form-item label="扶手" name="name">
                <a-radio-group :value="0"  name="radioGroup">
                  <a-radio :value="0">有</a-radio>
                  <a-radio :value="1">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <!-- 轿门装饰 -->
              <a-form-item label="轿门装饰" name="name">
                <a-textarea
                  style="width: 63%;"
                  v-model:value="formState.name"
                  placeholder="请输入轿门装饰"
                  :maxlength="200"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <!-- 轿壁描述 -->
              <a-form-item label="轿壁描述" name="name">
                <a-textarea
                  style="width: 63%;"
                  v-model:value="formState.name"
                  placeholder="请输入轿壁描述"
                  :maxlength="200"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <!-- 前壁描述 -->
              <a-form-item label="前壁描述" name="name">
                <a-textarea
                  style="width: 63%;"
                  v-model:value="formState.name"
                  placeholder="请输入前壁描述"
                  :maxlength="200"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <!-- 吊顶描述 -->
              <a-form-item label="吊顶描述" name="name">
                <a-textarea
                  style="width: 63%;"
                  v-model:value="formState.name"
                  placeholder="请输入吊顶描述"
                  :maxlength="200"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="floor-args"></div>
          <div style="height: 10px;"></div>
          <h3>人机交互系统</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="8">
              <!-- 操作箱型号 -->
              <a-form-item label="操作箱型号" name="name">
                <a-input placeholder="操作箱型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 操作箱显示 -->
              <a-form-item label="操作箱显示" name="name">
                <a-input placeholder="操作箱显示" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 外呼显示 -->
              <a-form-item label="外呼显示" name="name">
                <a-input placeholder="外呼显示" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <!-- 外呼型号 -->
              <a-form-item label="外呼型号" name="name">
                <a-input placeholder="外呼型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 操作箱安装方式 -->
              <a-form-item label="操作箱安装方式" name="name">
                <a-input placeholder="操作箱安装方式" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 外呼安装方式 -->
              <a-form-item label="外呼安装方式" name="name">
                <a-input placeholder="外呼安装方式" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <!-- 外呼面板材质 -->
              <a-form-item label="外呼面板材质" name="name">
                <a-input placeholder="外呼面板材质" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <!-- 操作箱面板材质 -->
              <a-form-item label="操作箱面板材质" name="name">
                <a-input placeholder="操作箱面板材质" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <!-- 其他说明 -->
              <a-form-item label="其他说明" name="name">
                <a-textarea
                  style="width: 63%;"
                  v-model:value="formState.name"
                  placeholder="请输入其他说明"
                  :maxlength="200"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
  
      <div class="flex-center mt60">
        <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
        <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="">确定</a-button>
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
      width: "120px",
      textAlign: "left",
    },
  };
  
  // 表单数据
  const formState = reactive({
    name: "", //装潢名称
    decoration: {}, //装饰
  });
  
  // 关闭弹窗
  const closeFn = () => {
    emit("close");
  };
  
  onMounted(() => {});
  </script>
  
  <style scoped lang="less">
  @import "@/assets/styles/base/antdForm.less";
  
  ::deep(.ant-form :where(.css-dev-only-do-not-override-eq3tly).ant-row) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .floor-args {
    background-image: linear-gradient(to right, #999999 45%, rgba(255, 255, 255, 0) 0%);
    background-position: top;
    background-size: 14px 2px;
    height: 2px;
    background-repeat: repeat-x;
  }
  </style>
  