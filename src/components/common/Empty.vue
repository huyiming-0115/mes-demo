<!-- 空表格图片显示 -->
<template>
    <div>
        <div style="height: 200px;">
            <img :src="url" alt="图片加载失败">
        </div>
    </div>
</template>

<script setup lang="ts">
import url from '@/assets/img/table/empty.png';
</script>
