<template>
  <div class="pl5">
    <div style="height: 500px; overflow-y: auto;">
      <template v-for="(item, index) in basicData">
        <div class="basic-detail" :class="index == 0 ? '' : 'mt16'">
          <div class="detail-top">
            <div style="display: inline-block; height: 24px; line-height: 24px; float: left;">
              <img src="@/assets/icons/flowstart.svg" alt="" width="24" height="24" v-if="item.type === 0" />
              <img src="@/assets/icons/flowapprove.svg" alt="" width="24" height="24" v-else />
            </div>
            <div style="display: inline-block; height: 24px; line-height: 24px; float: left;" class="ml5">
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="detail-content mt10">
            <div class="content-top">
              <div class="box-float box-base bgc">开始时间</div>
              <div class="box-float box-base">{{ item.beginTime }}</div>
              <div class="box-float box-base bgc">结束时间</div>
              <div class="box-float box-base">{{ item.endTime }}</div>
            </div>
            <template v-if="item.process?.length" v-for="process in item.process">
              <div class="content-inner">
                <div class="box-float box-base bgc">
                  <img src="@/assets/icons/flowperson.svg" alt="" width="16" height="16" />

                  {{ process.name }}
                </div>
                <div class="box-float box-base">{{ process.beginTime }}</div>
                <div class="box-float box-base bgc">处理时间</div>
                <div class="box-float box-base">{{ process.dealTime }}</div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

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
const closeFn = () => {
  emit("close");
};

const basicData = [
  //流程开始数组
  {
    id: 1,
    //0 开始，1流程中
    type: 0,
    name: "流程开始",
    beginTime: "2023-08-17 11:05:00",
    endTime: "2023-08-17 12:05:00",
  },
  //财务审批数组
  {
    id: 2,
    type: 1,
    name: "财务第一次审批",
    beginTime: "2023-08-17 11:05:00",
    endTime: "2023-08-17 11:05:00",
    process: [
      { name: "第一人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第二人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第三人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第四人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
    ],
  },
  //财务处理数组
  {
    id: 3,
    type: 1,
    name: "财务第二次审批",
    beginTime: "2023-08-17 11:05:00",
    endTime: "2023-08-17 11:05:00",
    process: [
      { name: "第五人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第六人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第七人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
      { name: "第八人", beginTime: "2023-08-17 11:05:00", dealTime: "2023-08-17 11:05:00" },
    ],
  },
];
</script>

<style scoped lang="less">
.basic-detail {
  .detail-top {
    height: 24px;
    width: 100%;
    line-height: 20px;
    vertical-align: baseline;
  }

  .detail-content {
    width: 100%;

    .content-top {
      height: 45px;
    }

    .content-inner {
      width: 100%;
      height: 45px;
    }

    .box-float {
      float: left;
    }

    .box-base {
      width: 392px;
      height: 45px;
      font-size: 14px;
      text-align: left;
      padding-left: 15px;
      line-height: 45px;
      border: 1px solid rgba(235, 235, 235, 1);
    }

    .bgc {
      width: 184px;
      background-color: rgba(245, 245, 247, 1);
      color: black;
    }
  }
}
</style>
