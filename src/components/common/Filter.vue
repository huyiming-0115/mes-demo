<template>
    <div>
        <div class="box">
            <!-- 标题 -->
            <div class="flex-center box-title">
                <div>按条件筛选</div>
            </div>
            <!-- 线 -->
            <div class="box-line" />
            <!-- 内容 -->
            <div class="box-content">
                <div class="box-content-center">
                    <div class="item-label">
                        <label class="pointer">
                            <input type="checkbox" class="box-checkbox" v-model="config.allChecked"
                                @change="changeAllCheckFn" ref="allRef" />
                            <span class="text">全选</span>
                        </label>
                    </div>
                    <template v-for="item in config.list">
                        <div class="item-label">
                            <label class="pointer">
                                <input type="checkbox" v-model="item.checked" @change="itemChangeFn" />
                                <span class="text">
                                    {{ item.text }}
                                </span>
                            </label>
                        </div>
                    </template>
                </div>
            </div>
            <!-- 线 -->
            <div class="box-line" />
            <!-- 三个按钮 -->
            <div class="flex-start box-btns">
                <div class="pointer box-btns-reset" @click="resetFn">重置</div>
                <div class="flex-center fz12 pointer box-btns-cancel" @click="cancelFn">取消</div>
                <div class="flex-center fz12 pointer box-btns-submit" @click="submitFn">确定</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { list = [] } = defineProps<{
    list?: any
}>();
const emit = defineEmits<{
    (e: 'submit', list: any): any,
    (e: 'cancel'): any
}>();
// 所有变量
const config: any = reactive({
    allChecked: true,
    list: []
})
// 回显所有值
config.list = list.map((x: any) => {
    x.checked = true
    return x
});
// 重置
const resetFn = () => {
    config.allChecked = true;
    changeAllCheckFn();
    submitFn();
}
// 取消
const cancelFn = () => {
    // 关闭弹窗
    emit('cancel');
};
// 确定
const submitFn = () => {
    if (config.list.every((x: any) => !x.checked)) return ElMessage.warning('至少选择一个条件')
    // 把数据带过去，然后关闭弹窗
    emit('submit', config.list);
};
// 全选
const changeAllCheckFn = () => {
    config.list.forEach((x: any) => x.checked = config.allChecked);
};
// 单选每一个item
const itemChangeFn = () => {
    const flag = config.list.every((x: any) => x.checked);
    flag && (config.allChecked = true);
    !flag && (config.allChecked = false);
};
</script>

<style scoped lang="less">
.box {
    width: 200px;
    height: 290px;

    // 标题
    .box-title {
        font-size: 14px;
        height: 45px;
    }

    // 横线
    .box-line {
        border-bottom: 1px solid grey;
        width: 90%;
        margin: 0 auto;
    }

    .box-content {
        height: 197px;
        overflow: auto;
        width: 90%;
        margin: 0 auto;

        .box-content-center {
            padding-left: 5px;
            padding-top: 5px;

            // label定位，input可能跟文字不一致高度
            .item-label {
                height: 30px;

                label {
                    position: relative;

                    input {
                        position: absolute;
                        left: 0;
                        top: 4px;
                    }

                    .text {
                        margin-left: 20px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

    // 三个按钮
    .box-btns {
        width: 90%;
        margin: 0 auto;
        margin-top: 12px;

        .box-btns-reset {
            margin-right: 30%;
            border-radius: 5px;
        }

        .box-btns-cancel {
            margin-right: 8%;
            border-radius: 5px;
            border: 1px solid grey;
            padding: 0 7px;
            color: grey;
        }

        .box-btns-submit {
            border: 1px solid grey;
            border-radius: 5px;
            padding: 0 7px;
            background-color: #1569ac;
            color: white;
        }
    }
}

input[type="checkbox"] {
    cursor: pointer;
}

input[type=checkbox]:checked:before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border: 1px solid #1569ac;
    background-color: #1569ac;
    box-sizing: border-box;
    position: absolute;
}

input[type=checkbox]:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border-left: 2px solid #fff;
    border-top: 2px solid #fff;
    box-sizing: border-box;
    position: absolute;
    transform: rotate(-135deg) translate(-70%, 25%);
}
</style>