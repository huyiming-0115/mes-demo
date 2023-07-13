<template>
  <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.id">
    <template #icon>
      <q-svg width="25" :name="menu.icon"></q-svg>
    </template>
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
    <i-aside-menu v-for="(child, index) in menu.children" :menu="child" />
  </a-sub-menu>
  <a-menu-item v-else :key="menu.id" :name="menu.name">
    <span>{{ menu.title }}</span>
  </a-menu-item>
</template>
<script setup lang="ts">
defineProps({ menu: Object });
</script>
