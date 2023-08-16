<template>
    <div style="height:360px;">
        <div style="height: 270px;padding-left: 5px;">
            <AForm :model="formState" ref="modelForm" name="basic" :label-col="labelCol" :wrapper-col="{ span: 24 }"
                autocomplete="off" :layout="'horizontal'">
                <a-form-item class="form-item-require" label="公司名称" name="organizeName" :rules="rules.organizeName">
                    <a-input placeholder="请填写公司名称" :maxlength="20" style="width: 100%;"
                        v-model:value="formState.organizeName" />
                </a-form-item>
                <!-- 公司简介 -->
                <a-form-item class="form-item-require" label="公司简介" name="explan" :rules="rules.explan">
                    <a-textarea v-model:value="formState.explan" showCount :maxlength="240" placeholder="请填写公司简介"
                        :auto-size="{ minRows: 3, maxRows: 6 }" />
                </a-form-item>
            </AForm>
        </div>
        <div class="flex-center mt60">
            <AButton class="mr32 w100 h35" @click="closeFn">取消</AButton>
            <AButton v-throttle class="w100 h35 primary-button" type="primary" @click="submitFn">确定</AButton>
        </div>
    </div>
</template>

<script setup lang="ts">
const { pid, row } = defineProps<
    {
        pid: string,
        row?: any
    }
>();
const emit = defineEmits<{
    (e: 'close'): void
}>()
const labelCol: any = {
    style: {
        width: "90px",
        textAlign: "left"
    },
};
const rules = {
    organizeName: [{ required: true, message: '请填写公司名称' },
        { pattern: /^[^\s]*$/, message: '禁止输入空格' }],
    explan: [{ required: true, message: '请填写公司简介' },
        { pattern: /^[^\s]*$/, message: '禁止输入空格' }],
};
// 表单数据
const formState = reactive({
    organizeName: "",
    explan: "",
});
const closeFn = () => {
    emit('close');
};
// ref
const modelForm = ref();
const getListFn: any = inject('getListFn')
// 表单校验
const submitFn = async () => {
    const res = await modelForm.value.validateFields().then((res: any) => res).catch((_err: any) => 'error');
    if (res === 'error') return
    getListFn()
};
// 回显处理函数
const echoFn = () => {
    formState.organizeName = row.organizeName
    formState.explan = row.explan
}
const createdFn = () => {
    pid === 'add' && console.log('%c%s', 'color:green', 'add');
    pid === 'edit' && echoFn();
    console.log(row, 'row');
};
createdFn();
</script>

<style scoped lang="less">
@import '@/assets/styles/base/antdForm.less';
</style>