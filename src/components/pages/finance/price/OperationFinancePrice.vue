<template>
  <div style="padding-left: 5px;">
    <div style="height: 480px; overflow-y: auto;">
      <!-- 表格 -->
      <a-spin :spinning="spinning">
        <a-table
          :dataSource="dataSource.data"
          :columns="columns"
          :pagination="false"
          rowKey="id"
          size="small"
          :row-class-name="(_record: any, index: number): any => (index % 2 === 1 ? 'table-striped' : null)"
          bordered 
          sticky
        >
          <!-- 表体插槽 -->
          <template #bodyCell="{ record, column, index, text }"></template>
          <!-- 空表格时候的插槽 -->
          <template #emptyText>
            <Empty></Empty>
          </template>
        </a-table>
      </a-spin>
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
let spinning = ref<boolean>(false);

// 表头
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    ustomRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "变更前价格",
    dataIndex: "beforePrice",
    key: "beforePrice",
    width: 250,
    ellipsis: true,
  },
  {
    title: "变更后价格",
    dataIndex: "afterPrice",
    key: "afterPrice",
    width: 250,
    ellipsis: true,
  },
  {
    title: "操作时间",
    dataIndex: "operateTime",
    key: "operateTime",
    width: 250,
    ellipsis: true,
  },
  {
    title: "操作人员",
    dataIndex: "operate",
    key: "operate",
    width: 250,
    ellipsis: true,
  },
];

/**
 * 列表数据x
 */
const dataSource: {
  total: number;
  currentPage: number;
  pageSize: number;
  data: any[];
} = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 15,
  data: [],
});

const getListFn = async () => {
  spinning.value = true;
  let arr: any = [];
  for (let i = 0; i < 30; i++) {
    let obj = {
      id: i + 1,
      beforePrice:'1500',
      afterPrice:'15000',
      operateTime:'2023-08-28',
      operate:'刘伟',
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};

const emit = defineEmits(["close"]);

// 关闭弹窗
const closeFn = () => {
  emit("close");
};

onMounted(() => {
  getListFn();
});
</script>

<style scoped lang="less"></style>
