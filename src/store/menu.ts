import { defineStore } from "pinia";
export const useMenuStore = defineStore("menu", {
    state: () => {
        return {
            uname: '开发菜单列表',
            menuKey: 1,
            routerKey: 1,
            breadName: '/',
            breadParentName: '系统管理',
            menuList: [
                // 首页
                {
                    path: '/work/home',
                    //route: '/work/home',
                    name: '首页',
                    hidden: true,
                    id: '0',
                    svg: 'home',
                    children: [
                        {
                            path: '/work/home/workplace',
                            name: '工作台',
                            parentName: '首页',
                            route: '/work/home/workplace',
                            hidden: true,
                            id: '0-1',
                        },
                        {
                            path: '/work/home/deal',
                            name: '我的待办',
                            parentName: '首页',
                            route: '/work/home/deal',
                            hidden: true,
                            id: '0-2',
                        },
                        {
                            path: '/work/home/task',
                            name: '待接任务',
                            parentName: '首页',
                            route: '/work/home/task',
                            hidden: true,
                            id: '0-3',
                        },
                    ]
                },
                // 系统管理
                {
                    path: '/work/system',
                    name: '系统管理',
                    hidden: true,
                    id: '1',
                    svg: 'system',
                    children: [
                        {
                            path: '/work/system/company',
                            name: '公司管理',
                            parentName: '系统管理',
                            route: '/work/system/company',
                            hidden: true,
                            id: '1-1',
                        },
                        {
                            path: '/work/system/depart',
                            name: '部门管理',
                            parentName: '系统管理',
                            route: '/work/system/depart',
                            hidden: true,
                            id: '1-2',
                        },
                        {
                            path: '/work/system/post',
                            name: '岗位管理',
                            parentName: '系统管理',
                            route: '/work/system/post',
                            hidden: true,
                            id: '1-3',
                        },
                        {
                            path: '/work/system/person',
                            name: '人员管理',
                            parentName: '系统管理',
                            route: '/work/system/person',
                            hidden: true,
                            id: '1-4',
                        },
                        {
                            path: '/work/system/brand',
                            name: '品牌管理',
                            parentName: '系统管理',
                            route: '/work/system/brand',
                            hidden: true,
                            id: '1-5',
                        },
                        {
                            path: '/work/system/power',
                            name: '权限组管理',
                            parentName: '系统管理',
                            route: '/work/system/power',
                            hidden: true,
                            id: '1-6',
                        },
                        {
                            path: '/work/system/auth',
                            name: '授权管理',
                            parentName: '系统管理',
                            route: '/work/system/auth',
                            hidden: true,
                            id: '1-7',
                        },
                        {
                            path: '/work/system/resource',
                            name: '资源管理',
                            parentName: '系统管理',
                            route: '/work/system/resource',
                            hidden: true,
                            id: '1-8',
                        },
                        {
                            path: '/work/system/log',
                            name: '操作日志',
                            parentName: '系统管理',
                            route: '/work/system/log',
                            hidden: true,
                            id: '1-9',
                        },

                    ]
                },
                // 销售管理
                {
                    path: '/work/sell',
                    name: '销售管理',
                    hidden: true,
                    id: '2',
                    svg: 'sell',
                    children: [
                        {
                            path: '/work/sell/order',
                            name: '销售订单',
                            parentName: '销售管理',
                            route: '/work/sell/order',
                            hidden: true,
                            id: '2-1',
                        },
                        {
                            path: '/work/sell/sale',
                            name: '销售查询',
                            parentName: '销售管理',
                            route: '/work/sell/sale',
                            hidden: true,
                            id: '2-2',
                        },
                    ]
                },
                //商务管理
                {
                    path: '/work/sell',
                    name: '商务管理',
                    hidden: true,
                    id: '9',
                    svg: 'sell',
                    children: [
                        {
                            path: '/work/sell/buorder',
                            name: '商务订单',
                            parentName: '销售管理',
                            route: '/work/sell/buorder',
                            hidden: true,
                            id: '9-1',
                        },
                        {
                            path: '/work/sell/dress',
                            name: '装潢管理',
                            parentName: '销售管理',
                            route: '/work/sell/dress',
                            hidden: true,
                            id: '9-2',
                        },
                        {
                            path: '/work/sell/business',
                            name: '商务查询',
                            parentName: '销售管理',
                            route: '/work/sell/business',
                            hidden: true,
                            id: '9-3',
                        },
                        {
                            path: '/work/sell/plan',
                            name: '计划查询',
                            parentName: '销售管理',
                            route: '/work/sell/plan',
                            hidden: true,
                            id: '9-4',
                        },
                    ]
                },
                // 技术管理
                {
                    path: '/work/technology',
                    name: '技术管理',
                    hidden: true,
                    id: '3',
                    svg: 'technology',
                    children: [
                        {
                            path: '/work/technology/order',
                            name: '技术订单',
                            parentName: '技术管理',
                            route: '/work/technology/order',
                            hidden: true,
                            id: '3-4',
                        },
                        {
                            path: '/work/technology/skill',
                            name: '技术查询',
                            parentName: '技术管理',
                            route: '/work/technology/skill',
                            hidden: true,
                            id: '3-1',
                        },
                        {
                            path: '/work/technology/series',
                            name: '系列管理',
                            parentName: '技术管理',
                            route: '/work/technology/series',
                            hidden: true,
                            id: '3-2',
                        },
                        {
                            path: '/work/technology/civil',
                            name: '土建管理',
                            parentName: '技术管理',
                            route: '/work/technology/civil',
                            hidden: true,
                            id: '3-3',
                        }
                    ]
                },
                // 生产管理
                {
                    path: '/work/produce',
                    name: '生产管理',
                    hidden: true,
                    id: '4',
                    svg: 'produce',
                    children: [
                        {
                            path: '/work/produce/product',
                            name: '生产订单',
                            parentName: '生产管理',
                            route: '/work/produce/product',
                            hidden: true,
                            id: '4-1',
                        },
                        {
                            path: '/work/produce/task',
                            name: '生产任务',
                            parentName: '生产管理',
                            route: '/work/produce/task',
                            hidden: true,
                            id: '4-2',
                        },
                        {
                            path: '/work/produce/package',
                            name: '装箱管理',
                            parentName: '生产管理',
                            route: '/work/produce/package',
                            hidden: true,
                            id: '4-3',
                        },
                    ]
                },
                // 采购管理
                {
                    path: '/work/purchase',
                    name: '采购管理',
                    hidden: true,
                    id: '5',
                    svg: 'purchase',
                    children: [
                        {
                            path: '/work/purchase/deal',
                            name: '采购待办',
                            parentName: '采购管理',
                            route: '/work/purchase/deal',
                            hidden: true,
                            id: '5-1',
                        },
                        {
                            path: '/work/purchase/task',
                            name: '采购任务',
                            parentName: '采购管理',
                            route: '/work/purchase/task',
                            hidden: true,
                            id: '5-2',
                        },
                        {
                            path: '/work/purchase/order',
                            name: '采购订单',
                            parentName: '采购管理',
                            route: '/work/purchase/order',
                            hidden: true,
                            id: '5-3',
                        },
                        {
                            path: '/work/purchase/supplier',
                            name: '供应商管理',
                            parentName: '采购管理',
                            route: '/work/purchase/supplier',
                            hidden: true,
                            id: '5-4',
                        },
                    ]
                },
                // 质检管理
                {
                    path: '/work/check',
                    name: '质检管理',
                    hidden: true,
                    id: '6',
                    svg: 'check',
                    children: [
                        {
                            path: '/work/check/task',
                            name: '质检订单',
                            parentName: '质检管理',
                            route: '/work/check/task',
                            hidden: true,
                            id: '6-1',
                        },
                        {
                            path: '/work/check/process',
                            name: '质检工序',
                            parentName: '质检管理',
                            route: '/work/check/process',
                            hidden: true,
                            id: '6-2',
                        },
                    ]
                },
                // 仓库管理
                {
                    path: '/work/depot',
                    name: '仓库管理',
                    hidden: true,
                    id: '7',
                    svg: 'depot',
                    children: [
                        {
                            path: '/work/depot/inorder',
                            name: '入库单',
                            parentName: '仓库管理',
                            route: '/work/depot/inorder',
                            hidden: true,
                            id: '7-9',
                        },
                        {
                            path: '/work/depot/outorder',
                            name: '出库单',
                            parentName: '仓库管理',
                            route: '/work/depot/outorder',
                            hidden: true,
                            id: '7-10',
                        },
                        {
                            path: '/work/depot/product',
                            name: '产品管理',
                            parentName: '仓库管理',
                            route: '/work/depot/product',
                            hidden: true,
                            id: '7-1',
                        },
                        {
                            path: '/work/depot/out',
                            name: '出库管理',
                            parentName: '仓库管理',
                            route: '/work/depot/out',
                            hidden: true,
                            id: '7-2',
                        },
                        {
                            path: '/work/depot/in',
                            name: '入库管理',
                            parentName: '仓库管理',
                            route: '/work/depot/in',
                            hidden: true,
                            id: '7-3',
                        },
                        {
                            path: '/work/depot/stock',
                            name: '库存管理',
                            parentName: '仓库管理',
                            route: '/work/depot/stock',
                            hidden: true,
                            id: '7-4',
                        },
                        {
                            path: '/work/depot/box',
                            name: '箱子管理',
                            parentName: '仓库管理',
                            route: '/work/depot/box',
                            hidden: true,
                            id: '7-5',
                        },
                    ]
                },
                // 财务管理
                {
                    path: '/work/finance',
                    name: '财务管理',
                    hidden: true,
                    id: '8',
                    svg: 'finance',
                    children: [
                        {
                            path: '/work/finance/order',
                            name: '财务订单',
                            parentName: '财务管理',
                            route: '/work/finance/order',
                            hidden: true,
                            id: '8-1',
                        },
                        {
                            path: '/work/finance/price',
                            name: '价格管理',
                            parentName: '财务管理',
                            route: '/work/finance/price',
                            hidden: true,
                            id: '8-1',
                        },
                    ]
                },
                // 发货管理
                {
                    path: '/work/delivery',
                    name: '发货管理',
                    hidden: true,
                    id: '9',
                    svg: 'delivery',
                    children: [
                        {
                            path: '/work/delivery/query',
                            name: '发货查询',
                            parentName: '发货管理',
                            route: '/work/delivery/query',
                            hidden: true,
                            id: '9-1',
                        },
                    ]
                },
                // 安装管理
                {
                    path: '/work/install',
                    name: '安装管理',
                    hidden: true,
                    id: '10',
                    svg: 'install',
                    children: [
                        {
                            path: '/work/install/query',
                            name: '安装查询',
                            parentName: '安装管理',
                            route: '/work/install/query',
                            hidden: true,
                            id: '10-1',
                        },
                    ]
                },
                // 售后管理
                {
                    path: '/work/service',
                    name: '售后管理',
                    hidden: true,
                    id: '11',
                    svg: 'service',
                    children: [
                        {
                            path: '/work/service/after',
                            name: '售后查询',
                            parentName: '售后管理',
                            route: '/work/service/after',
                            hidden: true,
                            id: '11-1',
                        },
                    ]
                },
            ],
        };
    },
    getters: {
        getterAge: (state) => { },
        getterAll: (state) => { },
    },
    actions: {
        changeUname(e: any) {
            this.uname = e;
        },
        async loginFn() {
        },
    },
});
