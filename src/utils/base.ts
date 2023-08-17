
// 上传文件的请求头
export const uploadHeader = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
}

export const judgeNullRule: any = { pattern: /^[^\s]*$/, message: '禁止输入空格' }
export const requiredRuleFn: any = (msg: string) => {
    return { required: true, message: msg }
}
// 状态需要的属性
const statusMap = new Map()
// 起草
statusMap.set('draft', [
    {
        bgColor: '#e8f6f4',
        textColor: '#38b39d',
        name: 'draft',
        text: '起草',
    }
])
// 采购中
statusMap.set('buy', [
    {
        bgColor: '#e7f0f6',
        textColor: '#176aac',
        name: 'buy',
        text: '采购中',
    }
])
// 采购完成
statusMap.set('buy-z', [
    {
        bgColor: '#f2f2f2',
        textColor: '#818181',
        name: 'buy-z',
        text: '采购完成',
    }
])
// 入库退回
statusMap.set('in-return', [
    {
        bgColor: '#fee9e9',
        textColor: '#f63030',
        name: 'in-return',
        text: '入库退回',
    }
])
// 待发货
statusMap.set('status-pending', [
    {
        bgColor: '#e4edf3',
        textColor: '#186bad',
        name: 'status-pending',
        text: '待发货',
    }
])
// 待客户确认
statusMap.set('status-confirm', [
    {
        bgColor: '#e4edf3',
        textColor: '#186bad',
        name: 'status-confirm',
        text: '待客户确认',
    }
])
// 已完成
statusMap.set('status-end', [
    {
        bgColor: '#f2f2f2',
        textColor: '#818181',
        name: 'status-end',
        text: '已完成',
    }
])
// 待入库
statusMap.set('status-pending-in', [
    {
        bgColor: '#e7f0f6',
        textColor: '#1569ac',
        name: 'status-pending-in',
        text: '待入库',
    }
])
// 已入库
statusMap.set('status-over-in', [
    {
        bgColor: '#efefef',
        textColor: '#7f7f7f',
        name: 'status-over-in',
        text: '已入库',
    }
])
// 已退回
statusMap.set('status-in-return', [
    {
        bgColor: '#fbe6e6',
        textColor: '#f62b2b',
        name: 'status-in-return',
        text: '已退回',
    }
])
// 待出库
statusMap.set('status-pending-out', [
    {
        bgColor: '#e7f0f6',
        textColor: '#1569ac',
        name: 'status-pending-out',
        text: '待出库',
    }
])
export const showStatusFn: any = (str: string) => {
    typeof statusMap.get(str) === 'undefined' && console.error('状态未找到')
    return statusMap.get(str)
}
