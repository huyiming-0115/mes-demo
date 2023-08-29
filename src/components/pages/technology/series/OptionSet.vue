<template>
    <!-- 新增人员弹窗 -->
    <div style="padding-left: 5px; padding-right: 5px;">
      <div style="height: 520px; overflow-x: hidden; overflow-y: auto;">
        <a-form :model="formState" ref="modelForm" name="basic" :label-col="labelCol" :wrapper-col="{ span: 24 }" autocomplete="off" :layout="'horizontal'">
          <h3>配置类型</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item class="form-item-require" label="配置类型" name="selectValue">
        <a-radio-group v-model:value="formState.type" @change="changeFn" name="radioGroup">
          <a-radio :value="0">客梯配置</a-radio>
          <a-radio :value="1">货梯配置</a-radio>
          <a-radio :value="2">别墅梯配置</a-radio>
          <a-radio :value="3">平台梯配置</a-radio>
          <a-radio :value="4">背包梯配置</a-radio>
        </a-radio-group>
      </a-form-item>
            </a-col>
          </a-row>
      <div class="floor-args"></div>
      <div style="height: 10px;"></div>
          <h3>控制系统</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="一体机" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶氛围灯 -->
              <a-form-item label="运行继电器" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="抱闸继电器" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="一键通5G" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="随行电缆" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶氛围灯 -->
              <a-form-item label="应急救援装置" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="平层开关" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="减速开关" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 轿顶装饰 -->
              <a-form-item label="操纵箱" name="name">
                <a-input placeholder="轿顶装饰" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 轿顶氛围灯 -->
              <a-form-item label="外呼" name="name">
                <a-input placeholder="轿顶氛围灯" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="floor-args"></div>
          <div style="height: 10px;"></div>
          <h3>曳引机</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="12">
              <!-- 操作箱型号 -->
              <a-form-item label="免维护型无齿轮曳引机" name="name">
                <a-input placeholder="操作箱型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="floor-args"></div>
          <div style="height: 10px;"></div>
          <h3>门机系统</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 操作箱型号 -->
              <a-form-item label="门机" name="name">
                <a-input placeholder="操作箱型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="floor-args"></div>
          <div style="height: 10px;"></div>
          <h3>主要控制与安全部件</h3>
          <div style="height: 16px;"></div>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 操作箱型号 -->
              <a-form-item label="限速器" name="name">
                <a-input placeholder="操作箱型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 操作箱显示 -->
              <a-form-item label="提拉结构" name="name">
                <a-input placeholder="操作箱显示" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 外呼显示 -->
              <a-form-item label="安全钳" name="name">
                <a-input placeholder="外呼显示" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 外呼显示 -->
              <a-form-item label="免维护型滑动导靴" name="name">
                <a-input placeholder="外呼显示" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="6">
              <!-- 外呼型号 -->
              <a-form-item label="光幕" name="name">
                <a-input placeholder="外呼型号" style="width: 100%;" v-model:value="formState.name" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <!-- 操作箱安装方式 -->
              <a-form-item label="缓冲器" name="name">
                <a-input placeholder="操作箱安装方式" style="width: 100%;" v-model:value="formState.name" />
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
    type:0
  });
  
  // 关闭弹窗
  const closeFn = () => {
    emit("close");
  };

  // 单选更改
const changeFn = () => {
  console.log(formState.type, "raido");
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
  