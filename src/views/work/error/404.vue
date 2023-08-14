<template>
    <a-result status="404" title="404" sub-title="很抱歉，您前往的页面不存在，请返回首页或进入其他页面">
      <template #extra>
        <router-link to="/work/home" >
            <a-button type="primary" @click="()=>{}">回到首页</a-button>
        </router-link>
        
      </template>
    </a-result>
  </template>