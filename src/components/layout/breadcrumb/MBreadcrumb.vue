<template>
  <a-breadcrumb class="cs-breadcrumb">
    <!-- <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">{{ item }}</a-breadcrumb-item> -->

    <a-breadcrumb-item @click="goHomeFn">首页</a-breadcrumb-item>
    <a-breadcrumb-item>{{ menuStore.breadParentName }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ menuStore.breadName }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/menu';
const router = useRouter();
const menuStore = useMenuStore();
const goHomeFn = () => {
  router.push({ path: "/work/home" });
  console.log('%c%s', 'color:green', 'goHome')
}
// const route = useRoute();
// const breadcrumbs = computed({
//   get: () => {
//     let name = route.name;
// /*     let txet = sessionStorage.getItem("menuList");
//     const menuList = JSON.parse(txet); */
//     /* return treeFindPath(menuList, (data) => data.name === name, "title"); */
//     treeFindPath()
//   },
//   set: (value) => {},
// });
</script>
<style lang="less" scoped>
.cs-breadcrumb {
  background: @breadcrumb-background;
  padding-top: 10px;
  padding-left: 10px;
  height: @breadcrumb-height;
  border-bottom: 1px solid @breadcrumb-bottom;
  user-select: none;
}
</style>
