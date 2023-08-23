<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <div style="height: 480px;">历史趋势echarts图表</div>

    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">关闭</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<{
  pid?: string;
  row?: any;
}>();
const emit = defineEmits(["close"]);

// 关闭弹窗
const closeFn = () => {
  emit("close");
};

onMounted(() => {});
</script>

<style scoped lang="less"></style>
