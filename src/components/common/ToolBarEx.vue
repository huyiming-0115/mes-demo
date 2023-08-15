<template>
  <div class="">
    <!-- 输入框 -->
    <div style="height: 32px;">
      <a-input v-model:value="formState.value" :maxlength="16" :default-value="''" :placeholder="placeholderText" @pressEnter="submitFn" class="input">
        <!-- 下拉 -->
        <template #addonBefore>
          <a-select v-if="selectOptions.length > 1" class="select w90" v-model:value="formState.selectType" @change="changePlaceholderText()">
            <a-select-option v-for="item in selectOptions" :value="item.value" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <!-- 如果只有一个不需要下拉 -->
          <div class="w90" v-else>{{ selectOptions[0].label }}</div>
        </template>
        <!-- 放大镜 -->
        <template #addonAfter>
          <div class="flex-center pointer" @click="submitFn">
            <q-svg width="15" height="15" name="amplifier" />
          </div>
        </template>
      </a-input>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectOptions: Array<ToolBarSelectionType>;
  functionName: FunctionType;
}>();
const formState: any = ref({
  value: "",
  selectType: 0,
});
let placeholderText: Ref<string> = ref("请输入");

const changePlaceholderText = () => {
  for (const element of props.selectOptions) {
    if (element.value == formState.value.selectType) {
      placeholderText.value = "请输入" + element.label;
    }
  }
};

onMounted(() => {
  changePlaceholderText();
});

// 下拉列表选项
const selectOptions: Array<ToolBarSelectionType> = props.selectOptions;
//provide传过来的方法
const getListFn: any = props.functionName;
const submitFn = () => {
  console.log("公共toolbar");
  getListFn(formState);
};
</script>

<style scoped lang="less">
.input {
  width: 383px;

  // 左面
  :deep(.ant-input-group-addon:first-child) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    padding-right: 5px;
    padding-left: 5px;
  }

  // 右面
  :deep(.ant-input-group-addon:last-child) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: white;
  }

  :deep(.ant-select) {
    width: 120px !important;
  }

  :deep(.ant-select-open:first-child) {
    border-top-left-radius: 20px;
  }

  .select {
    border-top-left-radius: 20px;
  }

  :deep(.ant-select-selector) {
    border: 0;
  }
}
</style>
