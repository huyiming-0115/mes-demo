//定义基础岗位
export const basicRole = [
    { label: "管理员", value: "ADMINISTRATORS" },
    { label: "商务主管", value: "PURCHASE" },
    { label: "总经理", value: "MANAGER" },
    { label: "游客", value: "VISITOR" },
]

//定义基础角色
const mingAdmin: UserInfoType = {
    id: '1',
    name: 'ming',
    password: '123',
    currentRole: { id: '1', type: 'ADMINISTRATORS', name: '管理员', },
    role: [
        { id: '1', type: 'ADMINISTRATORS', name: '管理员', },
        { id: '2', type: 'PURCHASE', name: '商务主管', },
        { id: '3', type: 'MANAGER', name: '总经理', },
    ]
}

const mingPurchase: UserInfoType = {
    id: '2',
    name: 'ming',
    password: '123',
    currentRole: { id: '2', type: 'PURCHASE', name: '商务主管', },
    role: [
        { id: '2', type: 'PURCHASE', name: '商务主管', },
    ]
}

const mingManager: UserInfoType = {
    id: '3',
    name: 'ming',
    password: '123',
    currentRole: { id: '3', type: 'MANAGER', name: '总经理', },
    role: [
        { id: '3', type: 'MANAGER', name: '总经理', },
    ]
}

const mingVisitor: UserInfoType = {
    id: '4',
    name: 'ming',
    password: '123',
    currentRole: { id: '4', type: 'VISITOR', name: '游客', },
    role: []
}

export const basicMember = [
    mingAdmin, mingPurchase, mingManager, mingVisitor
]



