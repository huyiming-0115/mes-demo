<template>
  <div style="height: 600px; overflow-y: auto;">
    <h4>项目基础信息</h4>
    <div class="floor-args"></div>
    <h4>电梯明细</h4>
    <ElevDetailCommon />
    <div class="floor-args"></div>
    <h4>合同评审表</h4>
    <div class="floor-args"></div>
    <h4>排产表</h4>
  </div>

  <div class="flex-center mt48">
    <a-button class="mr32 w100 h35" @click="closeFn">关闭</a-button>
  </div>
</template>

<style scoped lang="less">
.floor-args {
  background-image: linear-gradient(to right, #999999 45%, rgba(255, 255, 255, 0) 0%);
  background-position: top;
  background-size: 14px 2px;
  height: 2px;
  background-repeat: repeat-x;
  margin: 24px 0;
}
</style>
