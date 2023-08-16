<template>
  <a-layout-sider class="cs-sider" v-model:collapsed="collapsed" defaultCollapsed collapsible mode="inline">
    <!--  <a-menu mode="inline" :openKeys="openKeys" :selectedKeys="selectedKeys" class="cs-sider-menu" @select="menuclick">
      <i-aside-menu v-for="(child, index) in menuList" :menu="child" />
    </a-menu> -->
    <!-- dark -->
    <a-menu
      :open-keys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
      :subMenuCloseDelay="1"
      @openChange="onOpenChange"
      :theme="menuConfig.theme"
      class="cs-sider-menu"
    >
      <template v-if="false">
        <a-menu-item key="1">
          <template #icon>
            <MailOutlined />
          </template>
          Navigation One
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <CalendarOutlined />
          </template>
          Navigation Two
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>Navigation Three</template>
          <a-menu-item key="3">Option 3</a-menu-item>
          <a-menu-item key="4">Option 4</a-menu-item>
          <a-sub-menu key="sub1-2" title="Submenu">
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>Navigation Four</template>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="系统管理">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>系统管理</template>
          <a-menu-item key="公司管理" @click="router.push('/work/system/company')">公司管理</a-menu-item>
          <a-menu-item key="部门管理" @click="router.push('/work/system/department')">部门管理</a-menu-item>
          <a-menu-item key="岗位管理" @click="router.push('/work/system/post')">岗位管理</a-menu-item>
          <a-menu-item key="人员管理" @click="router.push('/work/system/person')">人员管理</a-menu-item>
          <a-menu-item key="品牌管理" @click="router.push('/work/system/brand')">品牌管理</a-menu-item>
          <!-- <a-menu-item key="权限管理" @click="router.push('/work/system/auth')">权限管理</a-menu-item> -->
          <a-menu-item key="操作日志" @click="router.push('/work/system/operation')">操作日志</a-menu-item>
          <a-menu-item key="资源管理" @click="router.push('/work/system/resource')">资源管理</a-menu-item>
          <a-menu-item key="查看路由" @click="lookFn">查看路由</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="订单管理">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>订单管理</template>
          <a-menu-item key="采购订单" @click="router.push('/work/order/buy')">采购订单</a-menu-item>
          <a-menu-item key="销售订单" @click="router.push('/work/order/sell')">销售订单</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="仓库管理">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>仓库管理</template>
          <a-menu-item key="物料管理" @click="router.push('/work/storage/material')">物料管理</a-menu-item>
          <a-menu-item key="入库管理" @click="router.push('/work/storage/inmanage')">入库管理</a-menu-item>
          <a-menu-item key="出库管理" @click="router.push('/work/storage/outmanage')">出库管理</a-menu-item>
          <a-menu-item key="入库单" @click="router.push('/work/storage/inorder')">入库单</a-menu-item>
          <a-menu-item key="出库单" @click="router.push('/work/storage/outorder')">出库单</a-menu-item>
          <a-menu-item key="库存管理" @click="router.push('/work/storage/stockmanage')">库存管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="资源管理">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>资源管理</template>
          <a-menu-item key="供应商管理" @click="router.push('/work/resource/supplier')">供应商管理</a-menu-item>
          <a-menu-item key="客户管理" @click="router.push('/work/resource/client')">客户管理</a-menu-item>
        </a-sub-menu>
      </template>
      <SubMenu :computedList="store.menuList" />
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { findTreeAtoIdFn, findTreeAtoObjFn } from "@/utils/tools";
import type { MenuProps } from "ant-design-vue";
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useMenuStore } from "@/store/menu";
// menu配置项
const menuConfig: any = reactive({
  theme: "dark", // dark | light
});
const store = useMenuStore();
const collapsed = ref(false);
const router = useRouter();
// const route = useRoute();
// const menuList = ref([]);
// const { proxy }: any = getCurrentInstance();
const selectedKeys: any = ref([]);
// 菜单展开的key
const openKeys: any = ref([]);
const handleClick: MenuProps["onClick"] = (menuInfo) => {
  console.log("click ", menuInfo);
};
/* const loadTenantMenus = () => {
  proxy.api.grant.tenantMenus().then((res) => {
    menuList.value = res.data;
    const dourt = treeFindPath(menuList.value, (data) => data.name === route.name, "id");
    const leng = dourt.pop();
    openKeys.value = dourt;
    selectedKeys.value = [leng];
    sessionStorage.setItem("menuList", JSON.stringify(res.data));
  });
}; */
// const menuclick = (e: any) => {
//   selectedKeys.value = e.selectedKeys;
//   if (router.hasRoute(e.item.name)) {
//     router.push({ name: e.item.name });
//   } else {
//     router.push({ name: "workflow-notFindPage-404" });
//   }
// };

// 内置所有的key
const rootSubmenuKeys: any = store.menuList.map((x: any) => x.id);
// key更改得函数
const onOpenChange = (e: any) => {
  // 拿最新的key
  const latestOpenKey = e.at(-1);
  // 系统参数里是否包含
  const res = rootSubmenuKeys.includes(latestOpenKey);
  // 如果包含就展开这个key
  res && (openKeys.value = [latestOpenKey]);
};
onMounted(() => {
  /* loadTenantMenus(); */
});
const lookFn = () => {
  console.log(store.menuList, "store");
};
// 刷新函数
const createdFn = () => {
  const path = router.currentRoute.value.path;
  const row = findTreeAtoObjFn(store.menuList, path);
  store.breadName = row.name;
  store.breadParentName = row.parentName;
  selectedKeys.value = [row.id];
  // 二级目录
  if (path.split("/").length === 4) {
    const strArr = path.split("/");
    const str = "/" + strArr.at(1) + "/" + strArr.at(2);
    const id = findTreeAtoIdFn(store.menuList, str);
    openKeys.value = [id];
  }
};
createdFn();
</script>
<!-- 这里不能加scoped  加了就不生效 现在是全局样式-->
<style lang="less">
.cs-sider {
  background: @light-color;

  .cs-sider-menu {
    height: calc(100vh - 108px);
    overflow: auto;
    overflow-x: hidden;
  }
}

.cs-sider .ant-menu:not(.ant-menu-item-active) .ant-menu-item-selected {
  color: @menu-item-selected-color; //选中时的文字颜色
}

.cs-sider .ant-menu:not(.ant-menu-item-selected) .ant-menu-item-active {
 // background-color: #cacaca; //经过时得颜色
  border-left: 2px solid @menu-item-active-bg;
}

.cs-sider .ant-menu-submenu-title:hover {
  //background-color: #cacaca; //经过二级时得颜色
  border-left: 2px solid @menu-item-active-bg;
}

.cs-sider .ant-menu-submenu-title {
  height: 56px;
}

.cs-sider .ant-menu-item.ant-menu-item-active.ant-menu-item-selected {
  background-color: @menu-item-active-bg; //点击时得瞬间颜色
}

.cs-sider .ant-menu-item {
  height: 56px;
 // background-color: #001529;
}

aside.ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-has-trigger.cs-sider {
  padding-bottom: 0;
}

.cs-sider-menu .ant-menu-title-content {
  white-space: unset !important;
  user-select: none;
}

.ant-layout-sider-trigger {
  background-color: #001529; //伸缩栏颜色
}

.ant-menu-item-selected {
  color: white; //伸缩后小title颜色
}
</style>
<style scoped lang="less">
::-webkit-scrollbar {
  //竖向滑动条
  width: 0.5px;
  //横向滑动条
  height: 18px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10;
  background: #d7d7d7;
}

::-webkit-scrollbar-track {
  background-color: #d7d7d7;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #d7d7d7;
  transition: 0.7s;
}
</style>
