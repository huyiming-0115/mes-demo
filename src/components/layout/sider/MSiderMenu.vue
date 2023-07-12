<template>
  <a-layout-sider class="cs-sider" v-model:collapsed="collapsed" defaultCollapsed collapsible mode="inline">
   <!--  <a-menu mode="inline" :openKeys="openKeys" :selectedKeys="selectedKeys" class="cs-sider-menu" @select="menuclick">
      <i-aside-menu v-for="(child, index) in menuList" :menu="child" />
    </a-menu> -->
    <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
    @click="handleClick"
  >
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
  </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import type { MenuProps } from 'ant-design-vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
const collapsed = ref(false);
const router = useRouter();
const route = useRoute();
const menuList = ref([]);
const { proxy }:any = getCurrentInstance();
const selectedKeys = ref([]);
const openKeys = ref([]);
const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const handleClick: MenuProps['onClick'] = menuInfo => {
      console.log('click ', menuInfo);
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
const menuclick = (e:any) => {
  selectedKeys.value = e.selectedKeys;
  if (router.hasRoute(e.item.name)) {
    router.push({ name: e.item.name });
  } else {
    router.push({ name: "workflow-notFindPage-404" });
  }
};

onMounted(() => {
  /* loadTenantMenus(); */
});
</script>
<style lang="less">
.cs-sider {
  background: @light-color;
  .cs-sider-menu {
    height: calc(100vh - 70px);
    overflow: auto;
    overflow-x: hidden;
  }
}

.cs-sider .ant-menu:not(.ant-menu-item-active) .ant-menu-item-selected {
  color: @menu-item-selected-color;
}

.cs-sider .ant-menu:not(.ant-menu-item-selected) .ant-menu-item-active {
  background-color: @menu-item-active-background;
  border-left: 2px solid @menu-item-active-bg;
}
.cs-sider .ant-menu-submenu-title:hover {
  background-color: @menu-item-active-background;
  border-left: 2px solid @menu-item-active-bg;
}

.cs-sider .ant-menu-item.ant-menu-item-active.ant-menu-item-selected {
  background-color: @menu-item-active-bg;
}
</style>
