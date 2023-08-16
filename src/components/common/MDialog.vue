<template>
  <el-dialog
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    :append-to-body="true"
    :title="dialog.title"
    v-model="dialog.show"
    :width="dialog.width"
    class="mes-el-dialog"
  >
    <template #default>
      <slot></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps<{
  dialog: {
    title: string;
    show: boolean;
    flag: string;
    row: string;
    width:string
  };
}>();
</script>
