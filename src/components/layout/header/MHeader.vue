<template>
  <a-layout-header class="admin-header">
    <div class="admin-header-wide">
      <!-- 左侧logo -->
      <div class="flex-start">
        <router-link to="/" :class="['logo', 'pc']">
          <img width="160" src="/logo/elevLogo.png" alt="" />
        </router-link>
      </div>
      <!-- 右侧 -->
      <div class="admin-header-right">
        <!-- 帮助中心 -->
        <div class="flex-center mr10 pointer" style="margin-right: 10px;" @click="helpFn">
          <q-svg  width="27" height="27" name="help" color="white"/>
        </div>
        <!-- 通知消息 -->
        <div class="flex-center mr5 pointer" style="position: relative;margin-right: 10px;" @click="showFn">
          <q-svg width="24" height="24" name="news" />
          <div class="red-dot">{{ '65' || '需动态加载' }}</div>
        </div>
        <!-- 竖线 -->
        <a-divider class="header-divider" type="vertical" />
        <!-- 下拉框 -->
        <a-dropdown trigger="click" destroyPopupOnHide>
          <div class="item pointer">
            <!-- 头像 -->
            <div style="height: 30px;width:30px;float: left;margin-top: 15px;">
              <img class="header-item-img" :src="imgUrl" alt="加崽失败">
            </div>
            <!-- 姓名 -->
            <div class="header-item-name">
              {{ '张雪薇' || '需动态加载' }}
            </div>
            <!-- 职位 -->
            <div class="header-item" style="margin-right: 20px;">
              <div class="header-item-post">{{ '系统管理员' || '需动态加载' }}</div>
            </div>
          </div>
          <!-- 弹出的下拉框 -->
          <template #overlay>
            <div class="dropdown">
              <!-- 头像与姓名 -->
              <div class="dropdown-top">
                <!-- 头像 -->
                <div class="flex-center dropdown-top-img">
                  <div class="dropdown-top-img-box" @click="imgChangeFn">
                    <img :src="imgUrl" alt="">
                  </div>
                </div>
                <!-- 姓名 -->
                <div class="dropdown-top-text-box">{{ '张雪薇' || '需动态加载' }}</div>
                <!-- 账号 -->
                <div class="dropdown-top-acc-box flex-between">
                  <div style="margin-left: 15px;">账号</div>
                  <div style="margin-right: 15px;">zxw</div>
                </div>
                <div class="flex-center">
                  <div class="line" />
                </div>
              </div>
              <a-menu mode="vertical">
                <a-sub-menu key="切换岗位">
                  <template #title>
                    <div>
                      切换岗位
                    </div>
                  </template>
                  <a-menu-item key="岗位1">岗位1</a-menu-item>
                  <a-menu-item key="岗位2">岗位2</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                  <template #title>
                    <div>
                      设置默认
                    </div>
                  </template>
                  <a-menu-item key="岗位7">岗位7</a-menu-item>
                  <a-menu-item key="岗位8">岗位8</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="更改密码">
                  <div>更改密码</div>
                </a-menu-item>
                <div class="flex-center">
                  <div style="border-bottom: 1px solid grey; width: 90%;" class="line"></div>
                </div>
                <a-menu-item key="退出登录" @click="logout">
                  <div  >退出登录</div>
                </a-menu-item>
              </a-menu>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>
    <el-dialog destroy-on-close :close-on-click-modal="false" draggable :append-to-body="true" title="修改头像"
      v-model="dialogImg" width="700" class="mes-el-dialog">
      <template #default>
        <!-- 后续这个imgUrl换成个人信息的 -->
        <Photo :imgUrl="imgUrl" @close="dialogImg = false" />
      </template>
    </el-dialog>
  </a-layout-header>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/img/logo.png';
import { message } from 'ant-design-vue';
import imgUrl from '../../../assets/img/look.png';
const router = useRouter();
import Photo from './photo.vue';
const showFn = () => {
  message.warning('开发中');
}
// 点开帮助中心
const helpFn = () => {
  let url =
    "http://emes.hzcloudstream.com/group3/M00/00/1C/wKgW-mQuOTmAGLqQAGtaxk4X2QE756.pdf";
  let fileName = "预览图纸";
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.target = "_blank"
  a.click();
}

const logout = () => {
  localStorage.removeItem("auth");
  router.push({ path: "/login" });
}
// 图片弹窗
let dialogImg = ref<boolean>(false);
// 修改头像函数
const imgChangeFn = () => {
  // message.success('开发中');
  dialogImg.value = !dialogImg.value;
}

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

.logo-box {

  height: 100%;

  .logo-box-line {
    border-left: 1px solid black;
    height: 32px;
    margin-right: 10px;
  }

  .logo-box-title {
    font-size: 22px;
    font-weight: 550;
  }

}

.header-divider {
  vertical-align: middle;
  margin-top: 6px;
  height: 30px;
  width: 2px;
  margin-right: 13px;
  cursor: pointer;
  align-self: center;
  background-color: #999090;
}

.ant-layout-header {
  height: 60px;
  line-height: 60px;
}

// 小红点的动画
@keyframes breathe {
  0% {
    transform: scale(1);
    /* 注意rgba中的a的设置 */
    // box-shadow: 0 0 0 0 rgba(204, 73, 152, 60%);
  }

  60% {
    transform: scale(1.15);
    // box-shadow: 0 0 0 36px rgba(204, 73, 152, 0%);
  }

  100% {
    transform: scale(1);
    // box-shadow: 0 0 0 0 rgba(204, 73, 152, 0%);
  }
}

// 小红点
.red-dot {
  display: block;
  width: 26px;
  height: 18px;
  background-color: #ff0000;
  position: absolute;
  top: 13px;
  right: -10px;
  border-radius: 50%;
  animation: breathe 2.4s infinite;
  color: white;
  font-size: 10px;
  text-align: center;
  line-height: 18px;
}

// 弹出的下拉框
.dropdown {
  width: 190px;
  box-shadow: 0 3px 3px -4px rgba(0, 0, 0, .12), 0 3px 3px 0 rgba(0, 0, 0, .08), 0 8px 8px 8px rgba(0, 0, 0, .05);
  border-radius: 10px;

  //  上半部分
  .dropdown-top {
    background-color: white;

    //  头像的盒子
    .dropdown-top-img {
      padding-top: 30px;
      width: 100%;
      height: 50px;

      // 头像的小盒子
      .dropdown-top-img-box {
        position: relative;
        width: 50px;
        height: 50px;
        border: 1px solid rgba(0, 0, 0, .3);
        overflow: hidden;
        border-radius: 50%;

        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }

      // 鼠标经过的伪元素
      .dropdown-top-img-box:hover:after {
        content: "更换头像";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        color: #eee;
        background: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        cursor: pointer;
        text-align: center;
        line-height: 48px;
        // border-radius: 50%;
      }
    }

    // 姓名
    .dropdown-top-text-box {
      height: 30px;
      text-align: center;
      margin-top: 25px;
    }

    // 账号
    .dropdown-top-acc-box {
      height: 35px;
    }

    // 一根灰色的线
    .line {
      border-bottom: 1px solid grey;
      width: 90%;
    }
  }
}

// 样式穿透不过去，暂时添加类名
.mes-el-dialog {
  :deep(.el-dialog__body) {
    background-color: red;
  }
}

// 插槽的样式  
.dialog-header {
  font-size: 16px;
  font-weight: 500;

  .blue-box {
    width: 4px;
    height: 18px;
    opacity: 1;
    background: rgba(21, 105, 172, 1);
    margin-top: 4px;
    margin-right: 5px;
  }
}
</style>

