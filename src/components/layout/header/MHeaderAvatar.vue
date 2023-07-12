<template>
  <a-dropdown>
    <div class="header-avatar header-item" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="user.portrait" />
      <span class="name">{{ user.name }}</span>
    </div>
    <template #overlay>
      <a-menu class="avatar-menu" @click="handleMenuClick">
        <a-menu-item key="1">
          <!-- <a-icon type="user" /> -->
          <div :style="{ margin: '0 auto' }">
            <a-avatar shape="circle" :src="user.portrait" />
          </div>
        </a-menu-item>
        <a-menu-item key="2">
          <div>
            <span :style="{ float: 'left' }">账号: </span>
            <span :style="{ float: 'right' }"> {{ user.account }}</span>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <!-- <a-icon style="margin-right: 8px" type="poweroff" /> -->
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
const users = sessionStorage.getItem('users');
const user = JSON.parse(users);
const router = useRouter();
const { proxy } = getCurrentInstance();
/* const handleMenuClick = item => {
  if (item.key == '3') {
    proxy.api.login
      .logout()
      .then(res => {
        if (res.code === 200) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('users');
          sessionStorage.removeItem('menuList');
          router.push({ path: '/login' });
        } else {
          proxy.message.destroy();
          proxy.message.error(res.message);
        }
      })
      .catch(error => {
        proxy.message.destroy();
      });
  }
}; */
</script>
<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 20px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
