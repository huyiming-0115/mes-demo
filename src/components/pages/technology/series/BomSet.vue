<template>
  <div style="padding-left: 5px">
    <div style="width: 100%; height: 35px; margin-bottom: 20px">
      <a-button
        style="float: right"
        v-throttle
        class="w100 h35 primary-button"
        type="primary"
        @click="closeFn"
        >新增产品</a-button
      >
      <a-button
        style="float: right; margin-right: 20px"
        v-throttle
        class="w100 h35 primary-button"
        type="primary"
        @click="closeFn"
        >导入</a-button
      >
    </div>
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
            <div v-if="column.key == 'civil'">
              <div class="btn-link" @click.stop="showCivilFn(record)">上传查看</div>
            </div>
            <!-- 操作 -->
            <div v-if="column.key === 'operate'" class="flex-start">
              <a-popconfirm
                title="确定删除该行产品嘛?"
                :getPopupContainer="(triggerNode): any => triggerNode.parentNode"
                @confirm="removeFn(record)"
              >
                <template #default>
                  <div class="btn-link">删除</div>
                </template>
              </a-popconfirm>
            </div>
            <div v-else class="ovhidden" :title="text">{{ text }}</div>
          </template>
          <!-- 空表格时候的插槽 -->
          <template #emptyText>
            <Empty></Empty>
          </template>
        </a-table>
      </a-spin>
    </div>
    <div class="flex-center mt48">
      <a-button class="mr32 w100 h35" @click="closeFn">取消</a-button>
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="closeFn"
        >确定</a-button
      >
    </div>
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
  width: 550,
});

let dialogCivil: any = reactive({
  row: {},
  show: false,
  flag: "add",
  title: "土建配置",
  width: 700,
});
// 添加部门
const addFn = () => {
  /*   dialog.flag = "add";
      dialog.show = true; */
};
// 关闭部门
const closeFn = () => {
  getListFn();
  dialog.show = false;
};

const showCivilFn = (item: any) => {
  dialogCivil.row = item;
  dialogCivil.show = true;
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
    title: "产品编号",
    dataIndex: "no",
    key: "no",
    width: 200,
    ellipsis: true,
  },
  {
    title: "产品名称",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
  },
  {
    title: "规格型号",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "来源",
    dataIndex: "resource",
    key: "resource",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 160,
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
      no: "001",
      name: "002",
      model: "003",
      unit: "005",
      num: 5,
      resource: "自制",
    };
    arr.push(obj);
  }
  dataSource.data = arr;
  spinning.value = false;
};
// 移除操作
const removeFn = async (record: any) => {
  dataSource.data.splice(record.id - 1, 1);
  ElMessage.success(`模拟移除第${record.id}个电梯成功`);
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
