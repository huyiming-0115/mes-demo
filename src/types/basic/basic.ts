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

//定义菜单权限
export const menuList = [
    {
        type:"",
        menu:[
            {
                id:"1",
                name:"index",
                title:"系统管理",
                icon:"systemIcon",
                desc:"",
                route:"/",
                parentId:"",
                child:[
                    {
                        id:"01",
                        name:"index",
                        title:"资源管理",
                        icon:"",
                        desc:"",
                        route:"/",
                        parentId:"1",
                        child:[
                            {
                                id:"001",
                                name:"index",
                                title:"用户管理",
                                icon:"",
                                desc:"",
                                route:"work-system-user",
                                parentId:"01",
                                child:[],
                            },
                            {
                                id:"002",
                                name:"index",
                                title:"权限管理",
                                icon:"",
                                desc:"",
                                route:"work-system-auth",
                                parentId:"01",
                                child:[],
                            },
                        ],
                    },
                ],
            },
            {
                id:"2",
                name:"index",
                title:"仓储管理",
                icon:"storageIcon",
                desc:"",
                route:"/",
                parentId:"",
                child:[
                    {
                        id:"02",
                        name:"index",
                        title:"库存管理",
                        icon:"",
                        desc:"",
                        route:"storage",
                        parentId:"2",
                        child:[],
                    },
                ],
            },
        ]
    },
]


