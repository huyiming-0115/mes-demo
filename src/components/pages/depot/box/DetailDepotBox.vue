<template>
  <div style="padding-left: 5px">
    <div style="height: 480px; overflow-y: auto">
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
          <template #bodyCell="{ record, column, index, text }">
            <div v-if="column.key === 'operate'">
              <div class="btn-link" @click.stop="detailInfoFn(record)">查看明细</div>
            </div>
          </template>
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

  <MDialog :dialog="dialog">
    <BoxDetailInfo :pid="dialog.flag" :row="dialog.row" @close="dialog.show = false" />
  </MDialog>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<{
  pid?: string;
  row?: any;
}>();
let spinning = ref<boolean>(false);

let dialog: any = reactive({
  show: false,
  title: "查看明细",
  flag: "add",
  row: {},
  width: 1200,
});

const detailInfoFn = (item: any) => {
  dialog.row = item;
  dialog.show = true;
};

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
    title: "箱子编号",
    dataIndex: "no",
    key: "no",
    ellipsis: true,
  },
  {
    title: "箱子名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "装箱员",
    dataIndex: "pack",
    key: "pack",
    ellipsis: true,
  },
  {
    title: "检验员",
    dataIndex: "check",
    key: "check",
    ellipsis: true,
  },
  {
    title: "入库时间",
    dataIndex: "in",
    key: "in",
    ellipsis: true,
  },
  {
    title: "出库时间",
    dataIndex: "out",
    key: "out",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 180,
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
      no: "1500",
      name: "15000",
      pack: "刘伟",
      check: "刘伟",
      in: "2023-08-29",
      out: "2023-08-29",
      operate: "刘伟",
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

<style scoped lang="less">
@import "@/assets/styles/base/antdTable.less";
</style>
