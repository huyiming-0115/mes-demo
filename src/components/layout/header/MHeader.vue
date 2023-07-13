<template>
  <a-layout-header class="admin-header">
    <div class="admin-header-wide">
      <router-link to="/" :class="['logo', 'pc']">
        <img width="160" src="/logo/elevLogo.png" alt=""/>
      </router-link>
      <div class="admin-header-right">
       <!--  <m-header-notice class="header-item" /> -->
        <a-divider class="header-divider" type="vertical" />
        <!-- <m-header-avatar class="header-item" /> -->
        <div class="header-item" style="padding: 0 20px; margin-right: 40px;">
          <!-- <a-tag color="processing">{{ role.postName || "角色" }}</a-tag> -->
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
//const router = useRouter();

/* const users = sessionStorage.getItem("users");
const user = JSON.parse(users);
const role = JSON.parse(user.role) || {}; */
/* onMounted(() => {
  if (!role.postName) {
    router.push({ name: "login" });
  }
}); */
</script>

<style lang="less" scoped>
@import "header";
.header-divider {
  vertical-align: middle;
  margin-top: 2px;
  height: 30px;
  width: 2px;
  margin-right: 20px;
  cursor: pointer;
  align-self: center;
  background-color: #f7f8f4;
}
.ant-layout-header {
  height: 60px;
  line-height: 60px;
}
</style>
