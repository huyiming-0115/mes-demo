<template>
  <!-- hidden 用来控制是否隐藏 -->
  <div>
    <div v-for="o in computedList">
      <a-menu-item @click="clickFn(o)" :key="o.id" v-if="judgeMenuItemFn(o)">
        <template #icon>
          <q-svg width="17" height="17" :name="o?.svg" v-if="o?.svg" />
        </template>
        <div  style="display: inline-block;">{{ o.name }}</div>
      </a-menu-item>
      <a-sub-menu :key="o.id" v-if="judgeSubMenuFn(o)">
        <template #icon>
          <q-svg width="17" height="17" :name="o?.svg" color="white" />
        </template>
        <template #title>
          {{ o.name }}
        </template>

        <SubMenu :computedList="o.children" :key="o.id"></SubMenu>
      </a-sub-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMenuStore } from "@/store/menu";
const menuStore = useMenuStore();
const router = useRouter();
false && router;
const { computedList } = defineProps<{ computedList: any }>();
// 跳转
const clickFn = async (e: any) => {
  console.log(e, "item");
  menuStore.breadName = e.name;
  menuStore.breadParentName = e.parentName || "";
  const path = e?.route;
  !path && console.error("路径不存在");
  if (!path) return;
  console.log("%c%s", "color:green", path, "router.push");
  const fullPath = router.currentRoute.value.fullPath;
  // 同一页面点击
  fullPath === path && (await router.push(path)) && menuStore.routerKey++;
  // 不同页面跳转
  fullPath !== path && router.push(path);
};
// 判断menuItem的函数
const judgeMenuItemFn = (o: any): boolean => {
  if (!o.hidden) return false;
  if (!o.children?.length) return true;
  return false;
};
// 判断subMenu的函数
const judgeSubMenuFn = (o: any): boolean => {
  if (!o.hidden) return false;
  if (!o.children?.length) return false;
  if (o.children.filter((x: any) => x.hidden).length) return true; // filter有长度  true
  return false;
};
</script>

<style scoped lang="less">
::deep(.ant-menu-item, .ant-menu-submenu-title) {
  white-space: unset !important;
}
</style>
