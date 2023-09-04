<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px">
    <div style="height: 460px; width: 100%">
      <div id="main"></div>
    </div>

    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">关闭</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const { pid, row } = defineProps<{
  pid?: string;
  row?: any;
}>();
const emit = defineEmits(["close"]);

// 关闭弹窗
const closeFn = () => {
  emit("close");
};

const creatEchart = () => {
  let chartDom = document.getElementById("main");
  let myChart = echarts.init(chartDom);

  let option: any = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      /*       feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      }, */
    },
    /*     legend: {
      data: ["Evaporation", "Temperature"],
    }, */
    grid: {
      bottom: 90,
    },
    dataZoom: [
      {
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 30,
        handleIcon:
          "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
        handleSize: "100%",
        handleStyle: {
          color: "#ddd",
        },
        textStyle: {
          color: "#fff",
        },
        borderColor: "#eee",
      },
      {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35,
      },
    ],
    xAxis: [
      {
        type: "category",
        silent: false,
        axisLine: {
          lineStyle: {
            color: "#90979c",
          },
        },
        data: [
          "2023-01",
          "2023-02",
          "2023-03",
          "2023-04",
          "2023-05",
          "2023-06",
          "2023-07",
          "2023-08",
          "2023-09",
          "2023-10",
          "2023-11",
          "2023-12",
        ],
        axisPointer: {
          type: "shadow",
        },
        splitLine: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
        },
      },
    ],
    yAxis: [
      {
        show: true,
        type: "value",
        //name: "Temperature",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          color: "black",
          lineStyle: {
            color: "black",
          },
        },
        axisTick: {
          show: false,
          color: "black",
        },
        axisLabel: {
          interval: 0,
        },
        splitArea: {
          show: false,
        },
        nameTextStyle: {
          color: "black",
        },
        min: 0,
        max: 8000,
        interval: 1000,
      },
    ],
    series: [
      {
        name: "最高价",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: any) {
            return value + " ml";
          },
        },
        data: [1000, 3000, 2500, 800, 6000, 4200, 3500, 2700, 2655, 3656, 3269, 7069],
      },
      {
        name: "历史最低价",
        type: "line",
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          },
        },
        data: [500, 1600, 1900, 300, 5600, 6800, 5200, 2500, 1655, 2365, 2418, 6500],
      },
      {
        name: "历史最高价",
        type: "line",
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          },
        },
        data: [1500, 3524, 3105, 1200, 6589, 4236, 4652, 2956, 3000, 4000, 3600, 7500],
      },
    ],
  };
  myChart.setOption(option);
};

onMounted(() => {
  creatEchart();
});
</script>

<style scoped lang="less">
#main {
  width: 840px;
  height: 480px;
}
</style>
