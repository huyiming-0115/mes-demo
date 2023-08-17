<template>
  <!-- 新增人员弹窗 -->
  <div style="padding-left: 5px;">
    <a-form
      :model="formState"
      ref="modelForm"
      name="basic"
      :label-col="labelCol"
      style="height: 160px;"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :layout="'horizontal'"
    >
      <!-- 部门 -->
      <a-form-item class="form-item-require" label="部门" name="title" :rules="rules.title">
        <a-input placeholder="请填写权限组名称" style="width: 100%;" v-model:value="formState.title" />
      </a-form-item>
      <!-- 岗位 -->
      <a-form-item class="form-item-require" label="岗位" name="title" :rules="rules.title">
        <a-input placeholder="请填写权限组名称" style="width: 100%;" v-model:value="formState.title" />
      </a-form-item>
      <!-- 资源类型 -->
      <a-form-item class="form-item-require" label="资源类型" name="selectValue">
        <a-radio-group v-model:value="formState.type" @change="changeFn" name="radioGroup">
          <a-radio :value="0">菜单</a-radio>
          <a-radio :value="1">权限</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <!-- 表格 -->
    <div style="height: 300px; overflow-y: auto;">
      <a-spin :spinning="false">
        <a-table
          :dataSource="dataSource.data"
          :columns="columns"
          :pagination="false"
          rowKey="id"
          :customRow="onCustomRowFn"
          :rowSelection="{
            selectedRowKeys: ListConfig.selectedRowKeys,
            onChange: onSelectChangeFn,
          }"
          size="small"
          :row-class-name="(_record: any, index: number): any => (index % 2 === 1 ? 'table-striped' : null)"
          bordered
          sticky
        >
          <!-- 表体插槽 -->
          <template #bodyCell="{ record, column, index, text }">
            <div class="ovhidden" :title="text">{{ text }}</div>
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
      <a-button v-throttle class="w100 h35 primary-button" type="primary" @click="submitFn">确定</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<{
  pid?: string;
  row?: any;
}>();
const emit = defineEmits(["close"]);

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
    title: "资源名称",
    dataIndex: "name",
    key: "name",
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
// 表格配置项
const ListConfig: any = reactive({
  selectedRowKeys: [], //表格选中数组
});
// 选中表格checked
const onSelectChangeFn: any = (selectedRowKeys: any) => {
  ListConfig.selectedRowKeys = selectedRowKeys;
};
// 选中表格当前行
const onCustomRowFn = (record: any) => {
  return {
    // 单击表格
    onClick: () => {
      const index = ListConfig.selectedRowKeys.indexOf(record.id);
      index >= 0 && ListConfig.selectedRowKeys.splice(index, 1);
      index < 0 && ListConfig.selectedRowKeys.push(record.id);
    },
    // 双击表格
    ondblclick: () => {
      // // 双击情况选择项目，只选择当前行
      ListConfig.selectedRowKeys = [record.id];
      //如果有查看详情的列表页，双击打开详情
    },
  };
};

const labelCol: any = {
  style: {
    width: "90px",
    textAlign: "left",
  },
};
// 表单数据
const formState = reactive({
  type: 0,
  title: "", //资源标题
  explain: "", //资源说明
  resourceId: [], //选择的资源id
});
// 校验规则
const rules = {
  title: [
    { required: true, message: "请填写权限组名称" },
    { pattern: /^[^\s]*$/, message: "禁止输入空格" },
  ],
};
// 关闭弹窗
const closeFn = () => {
  emit("close");
};
// 单选更改
const changeFn = () => {
  console.log(formState.type, "raido");
};
const getListFn: any = inject("getListFn");
// ref
const modelForm = ref();
// 表单验证
const submitFn = async () => {
  const res = await modelForm.value
    .validateFields()
    .then((res: any) => res)
    .catch((_err: any) => "error");
  if (res === "error") return;
  whiteSubmitFn();
};
// 菜单提交函数
const menuSubmitFn = async () => {
  /*   const arr: any = ["type", "route", "name", "title", "serialNo", "parentId", "icon", "desc"];
      const data: any = arrToObjFn(formState, arr);
      data.serialNo = Number(data.serialNo);
      data.type = Number(data.type);
      // 这里需要区分一下是新增还是修改
      let res: any = null;
      pid === "add" && (res = await request.addResourceApi(data));
      pid === "edit" && (res = await request.editResourceApi(data));
      console.log(res, "res");
      res.code === 200 && ElMessage.success("保存成功");
      if (res.code !== 200) return ElMessage.warning(res.message || "保存失败");
      emit("close");
      getListFn(); */
};
// 资源提交函数
const resourceSubmitFn = async () => {
  /*   const arr: any = ["type", "route", "name", "title", "method", "desc"];
      const data: any = arrToObjFn(formState, arr);
      let res: any = null;
      pid === "add" && (res = await request.addResourceApi(data));
      pid === "edit" && (res = await request.editResourceApi(data));
      console.log(res, "res");
      res.code === 200 && ElMessage.success("保存成功");
      if (res.code !== 200) return ElMessage.warning(res.message || "保存失败");
      emit("close");
      getListFn(); */
};
// 白名单提交函数
const whiteSubmitFn = async () => {
  /*   const arr: any = ["route", "name", "title", "desc"];
      const data: any = arrToObjFn(formState, arr);
      let res: any = null;
      pid === "add" && (res = await request.addResourceApi(data));
      pid === "edit" && (res = await request.editResourceApi(data));
      console.log(res, "res");
      res.code === 200 && ElMessage.success("保存成功");
      if (res.code !== 200) return ElMessage.warning(res.message || "保存失败"); */
  emit("close");
  /* getListFn(); */
};
// 回显
const echoFn = async () => {
  console.log(row, "row");
  /*   Object.assign(formState, { type: 1 }); //暂时回显个2
      // 调接口回显
      const id = row.id;
      const res = await request.queryResourceApi({ id }); */
  /*  console.log(res, "查询回显的res"); */
};
// 初始化
const createdFn = () => {
  /* pid === "add" && console.log("%c%s", "color:green", "add");
      pid === "edit" && echoFn(); */
};
createdFn();

const generateResourceList = () => {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let obj = {
      id: i + 1,
      name: `这是模拟的第${i + 1}个资源选项`,
    };
    arr.push(obj);
  }
  dataSource.data = arr;
};

onMounted(() => {
  generateResourceList();
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdForm.less";
@import "@/assets/styles/base/antdTable.less";
</style>
