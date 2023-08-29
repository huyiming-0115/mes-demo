<template>
  <!-- 关联部门弹窗 -->
  <div style="height: 500px; overflow-y: auto">
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
          <!-- 操作 -->
          <div v-if="column.key === 'operate'" class="flex-start">
            <div class="btn-link" @click.stop="detailFn(record)">查看详情</div>
            <div class="btn-link ml24" @click.stop="editFn(record)">修改</div>                      
            <a-popconfirm
              title="确定移除工序吗?"
              :getPopupContainer="(triggerNode): any => triggerNode.parentNode"
              @confirm="removeFn(record)"
            >
              <template #default>
                <div class="btn-link ml24">移除</div>
              </template>
            </a-popconfirm>
          </div>
          <div v-else class="ovhidden" :title="text">{{ text }}</div>
        </template>
        <!-- 空表格时候的插槽 -->
        <template #emptyText>
          <Empty></Empty>
        </template>
        <!-- footer -->
        <template #footer>
          <div class="flex-center-col">
            <div class="btn-link" @click="addFn">新增步骤</div>
          </div>
        </template>
      </a-table>
    </a-spin>
    <!-- 添加部门弹窗 -->
    <MDialog :dialog="dialog">
      <ProductProcessSet
        @close="dialog.show = false"
        :pid="dialog.flag"
        :row="dialog.row"
      />
    </MDialog>
  </div>
</template>

<script setup lang="ts">
const { row } = defineProps<{
  row: any;
}>();
let spinning = ref<boolean>(false);
// 弹窗所有变量
let dialog: any = reactive({
  row: {},
  show: false,
  flag: "add",
  title: "添加部门",
  width: 700,
});
// 添加部门
const addFn = () => {
  dialog.flag = "add";
  dialog.show = true;
};

const detailFn = (item:any) => {
  dialog.row = item;
  dialog.show = true;
}

const editFn = (item:any) => {
  dialog.row = item;
  dialog.show = true;
}

// 关闭部门
const closeFn = () => {
  getListFn();
  dialog.show = false;
};
// 表头
const columns = [
  {
    title: "步骤名称",
    dataIndex: "name",
    key: "name",
    width: 180,
    ellipsis: true,
  },
  {
    title: "工序流程",
    dataIndex: "exp",
    key: "exp",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width:180
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

// 移除操作
const removeFn = async (record: any) => {
  dataSource.data.splice(record.id - 1, 1);
  ElMessage.success(`模拟移除第${record.id}个工序成功`);
};


const getListFn = async () => {
  spinning.value = true;
  let arr: any = [];
  for (let i = 0; i < 30; i++) {
    let obj = {
      id: i + 1,
      name: `第${i + 1}个步骤`,
      exp: `第${i + 1}个步骤的工序流程`,
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};
onMounted(() => {
  getListFn();
});
</script>

<style scoped lang="less">
// 底部的边框
:deep(.ant-table-footer) {
  border: 1px dashed #ebebeb;
}
</style>
