<template>
  <div class="home-back wb100 hb100">
    <!-- 个人信息区域-->
    <div class="person basic">
      <div class="pad-per">
        <div class="avatar"></div>
        <div class="user">
          <span style="font-size: 18px;">哦哈哟</span>
          <span style="font-size: 14px; color: rgba(170, 170, 170, 1);">不知道放啥</span>
        </div>
        <div class="task">
          <span style="font-size: 16px; color: rgba(170, 170, 170, 1);">待办</span>
          <span style="font-size: 24px;">4/16</span>
        </div>
      </div>
    </div>
    <!-- 公告区域 -->
    <div class="notice basic mt12"></div>
    <!-- 信息展示区域 -->
    <div class="info mt12 wb100">
      <!-- 左侧待办/信息区域 -->
      <div class="show hb100">
        <!-- 待办展示 -->
        <div class="wait content wb100"></div>
        <!-- 信息展示 -->
        <div class="message content mt12 wb100"></div>
      </div>
      <!-- 右侧企业文化展示 -->
      <div class="culture hb100 ml12">
        <!-- 文档说明 -->
        <div class="file wb100">
          <div class="inner">
            <img alt="" src="@/assets/img/home-book.png" height="64" width="64" />
            <span>使用说明</span>
          </div>
          <div class="inner ml12">
            <img alt="" src="@/assets/img/home-service.png" height="64" width="64" />
            <span>服务协议</span>
          </div>
          <div class="inner ml12">
            <img alt="" src="@/assets/img/home-policy.png" height="64" width="64" />
            <span>隐私政策</span>
          </div>
        </div>
        <!-- 地址说明 -->
        <div class="address wb100 mt12">
          <div class="infos">
            <div style="height: 16px;">
              <img alt="" src="@/assets/img/home-location.png" height="16" width="16" />
              <span style="margin-left: 8px;">关于云川</span>
            </div>
            <div class="mt12 ml24 btn-link" style="height: 16px;">云川官网</div>
            <div class="mt12" style="height: 16px;">
              <img alt="" src="@/assets/img/home-phone.png" height="16" width="16" />
              <span style="margin-left: 8px;">联系云川</span>
            </div>
            <div class="mt12 ml24">
              <div class="mt5">服务热线：19032016021</div>
              <div class="mt5">位置：浙江省杭州市钱塘区白杨街道2号大街501号一幢211</div>
              <div class="mt5">公众号：暂未添加</div>
            </div>
          </div>
        </div>
        <!-- 未来考虑 -->
        <div class="image wb100 mt12">
          <img alt="" src="@/assets/img/home-show.png" height="100%" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.home-back {
  background-color: #f5f5f5;
  min-height: 800px;
  overflow: hidden;
  padding-right: 5px;

  .basic {
    border-radius: 4px;
    background-color: white;
  }

  .person {
    height: 70px;

    .pad-per {
      padding: 10px 0 10px 30px;
      height: 50px;
    }
    .avatar {
      border-radius: 50%;
      background-color: rgba(242, 242, 242, 1);
      width: 50px;
      height: 50px;
      float: left;
    }

    .user {
      height: 50px;
      width: calc(100% - 224px);
      float: left;
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      align-items:start;
      justify-content: center;
    }

    .task {
      width: 150px;
      height: 50px;
      float: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .notice {
    height: 50px;
  }

  .info {
    height: calc(100% - 144px);

    .show {
      float: left;
      width: calc(100% - 552px);

      .content {
        height: calc((100% - 12px) / 2);
        background-color: white;
        border-radius: 4px;
      }
    }

    .culture {
      float: left;
      width: 540px;

      .file {
        height: 160px;

        .inner {
          height: 100%;
          float: left;
          border-radius: 4px;
          width: calc((100% - 24px) / 3);
          background-color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
        }
      }

      .address {
        height: calc((100% - 184px) / 2);
        background-color: white;
        border-radius: 4px;

        .infos {
          padding: 24px;
        }
      }

      .image {
        height: calc((100% - 184px) / 2);
      }
    }
  }
}
</style>
