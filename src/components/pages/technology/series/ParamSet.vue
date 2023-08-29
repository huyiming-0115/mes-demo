<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px; padding-right: 5px">
    <div style="height: 520px; overflow-x: hidden; overflow-y: auto">
      <a-form
        :model="formState"
        ref="modelForm"
        name="basic"
        :label-col="labelCol"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        :layout="'horizontal'"
      >
        <h3>电梯基本参数</h3>
        <div style="height: 16px"></div>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 轿顶装饰 -->
            <a-form-item label="载重" name="name">
              <a-input
                placeholder="载重"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 轿顶氛围灯 -->
            <a-form-item label="额定速度" name="name">
              <a-input
                placeholder="额定速度"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 轿顶装饰 -->
            <a-form-item label="动力电源" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 轿顶装饰 -->
            <a-form-item label="控制柜位置" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 轿门装饰 -->
            <a-form-item label="楼层层数" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 轿门装饰 -->
            <a-form-item label="楼层站数" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 轿门装饰 -->
            <a-form-item label="楼层门数" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 轿壁描述 -->
            <a-form-item label="起始楼层" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 轿壁描述 -->
            <a-form-item label="服务楼层" name="name">
              <a-input
                placeholder="轿顶装饰"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div class="floor-args"></div>
        <div style="height: 10px"></div>
        <h3>土建图参数</h3>
        <div style="height: 16px"></div>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 操作箱型号 -->
            <a-form-item label="井道结构" name="name">
              <a-input
                placeholder="井道结构"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱显示 -->
            <a-form-item label="井道型号" name="name">
              <a-input
                placeholder="操作箱显示"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 外呼显示 -->
            <a-form-item label="机房" name="name">
              <a-input
                placeholder="外呼显示"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼型号 -->
            <a-form-item label="对重位置" name="name">
              <a-input
                placeholder="外呼型号"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼面板材质 -->
            <a-form-item label="井道玻璃" name="name">
              <a-input
                placeholder="外呼面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="井道框架颜色" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="井道部件颜色" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼型号 -->
            <a-form-item label="井道线槽" name="name">
              <a-input
                placeholder="外呼型号"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼面板材质 -->
            <a-form-item label="井道尺寸" name="name">
              <a-input
                placeholder="外呼面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="井道宽度" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="井道深度" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼面板材质 -->
            <a-form-item label="轿厢宽度" name="name">
              <a-input
                placeholder="外呼面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="轿厢深度" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="轿厢高度" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div class="floor-args"></div>
        <div style="height: 10px"></div>
        <h3>厅门系统</h3>
        <div style="height: 16px"></div>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 操作箱型号 -->
            <a-form-item label="A面开门方式" name="name">
              <a-input
                placeholder="操作箱型号"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱显示 -->
            <a-form-item label="A面门高度" name="name">
              <a-input
                placeholder="操作箱显示"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 外呼显示 -->
            <a-form-item label="A面门宽度" name="name">
              <a-input
                placeholder="外呼显示"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼型号 -->
            <a-form-item label="A面厅门材质" name="name">
              <a-input
                placeholder="外呼型号"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱安装方式 -->
            <a-form-item label="A面厅门数量" name="name">
              <a-input
                placeholder="操作箱安装方式"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <!-- 外呼面板材质 -->
            <a-form-item label="门套类型" name="name">
              <a-input
                placeholder="外呼面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- 操作箱面板材质 -->
            <a-form-item label="门套材质" name="name">
              <a-input
                placeholder="操作箱面板材质"
                style="width: 100%"
                v-model:value="formState.name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <!-- 其他说明 -->
            <a-form-item label="其他说明" name="name">
              <a-textarea
                style="width: 63%"
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
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click=""
        >确定</a-button
      >
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
