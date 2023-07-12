<template>
  <a-breadcrumb class="cs-breadcrumb">
    <!-- <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">{{ item }}</a-breadcrumb-item> -->

    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">

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
}
</style>
