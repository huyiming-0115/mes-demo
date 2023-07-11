<template>
  <div class="login-main">
    <div class="login-content">
      <div class="login-background">
        <img class="background-img" src="@assets/img/login/login.png" alt="login backgound image" />
        <div class="login-form-container">
          <img src="@assets/img/login/logo.png" style="height: 90px; margin-bottom: 65px; margin-left: 42px;" alt="" />
          <div class="input">
            <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="23px" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1 0 0 1 -1269 -426 )">
                <path
                  d="M 13.3026315789474 12.6752816133721  C 15.2799821820175 11.5111434108527  16.6162280701754 9.34190437257752  16.6162280701754 6.85765503875969  C 16.6162280701754 3.15062530281008  13.6476493969298 0.133720930232557  10 0.133720930232557  C 6.35235060307018 0.133720930232557  3.38377192982456 3.14985919331395  3.38377192982456 6.85765503875969  C 3.38377192982456 9.34190437257752  4.72001781798246 11.5111434108527  6.69808799342105 12.6752467902132  C 2.81578947368421 14.0652131782946  0.0219298245614035 17.8190452398256  0.0219298245614035 22.2333333333333  C 0.0219298245614035 22.6463708212209  0.349403782894737 22.9777131782946  0.75366639254386 22.9777131782946  C 1.15789473684211 22.9777131782946  1.48536869517544 22.6463708212209  1.48536869517544 22.2333333333333  C 1.48536869517544 17.4624560925388  5.30554413377193 13.5815891472868  10 13.5815891472868  C 14.6944558662281 13.5815891472868  18.5131578947368 17.4632222020349  18.5131578947368 22.2333333333333  C 18.5131561493934 22.2339958587476  18.5131552767206 22.2346583862379  18.5131552767206 22.2353209140266  C 18.5131552767206 22.6453343094024  18.8402126169877 22.9777158389297  19.2436582920714 22.9777158389297  C 19.2443102072871 22.9777158389297  19.2449621222084 22.9777149520506  19.2456140350877 22.9777131782946  C 19.6520353618421 22.9777131782946  19.9780701754386 22.6463708212209  19.9795435855263 22.2333333333333  C 19.9795435855263 17.8190452398256  17.1842105263158 14.0644818919574  13.3026315789474 12.6752467902132  Z M 10 12.0927946342054  C 7.15936814692983 12.0927946342054  4.8479646381579 9.74376362645349  4.84796463815789 6.85688892926357  C 4.84796463815789 3.96997940891473  7.15936814692983 1.62094840116279  10 1.62094840116279  C 12.8413856907895 1.62094840116279  15.1520353618421 3.96997940891473  15.1520353618421 6.85688892926357  C 15.1520353618421 9.74376362645349  12.8413856907895 12.0927946342054  10 12.0927946342054  Z "
                  fill-rule="nonzero"
                  fill="#555555"
                  stroke="none"
                  transform="matrix(1 0 0 1 1269 426 )"
                />
              </g>
            </svg>
            <input type="text" v-model="userName" autocomplete="off" placeholder="请输入账号" />
          </div>
          <div class="input">
            <svg t="1659677413177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="28" height="32">
              <path
                d="M259.64544 457.44128l504.7296 0c20.35712 0 38.44096 8.2944 51.99872 21.83168 13.57824 13.57824 21.83168 31.66208 21.83168 52.0192l0 342.75328c0 19.5584-8.25344 38.42048-21.83168 51.97824l0 0c-13.55776 12.8-31.6416 21.07392-51.99872 21.07392L259.64544 947.0976c-20.33664 0-39.19872-8.27392-51.99872-21.07392-13.57824-13.55776-21.83168-31.66208-21.83168-51.97824L185.81504 531.29216c0-20.35712 8.27392-38.44096 21.83168-52.0192l0 0 0 0C221.20448 465.75616 239.3088 457.44128 259.64544 457.44128L259.64544 457.44128zM764.35456 497.39776 259.64544 497.39776c-9.80992 0-18.08384 3.72736-24.12544 9.76896l0 0c-6.02112 6.0416-9.78944 15.09376-9.78944 24.14592l0 342.75328c0 9.0112 3.76832 17.32608 9.78944 23.36768 6.0416 6.02112 15.07328 9.78944 24.12544 9.78944l504.7296 0c9.05216 0 17.36704-3.76832 24.12544-9.78944l0 0c6.06208-6.0416 9.80992-14.336 9.80992-23.36768L798.3104 531.29216c0-9.03168-3.76832-18.10432-9.80992-24.14592C781.7216 501.12512 773.4272 497.39776 764.35456 497.39776L764.35456 497.39776z"
                p-id="4701"
              ></path>
              <path
                d="M753.07008 351.21152c0 10.5472-9.05216 19.59936-20.35712 19.59936-11.28448 0-19.53792-9.05216-19.53792-19.59936 0-55.74656-22.60992-106.20928-58.75712-142.37696-36.94592-36.1472-86.67136-58.75712-142.39744-58.75712-55.76704 0-106.22976 22.60992-142.39744 58.75712-36.16768 36.16768-58.75712 86.6304-58.75712 142.37696l0 118.272c0 10.5472-9.05216 19.59936-19.59936 19.59936-11.28448 0-20.33664-9.03168-20.33664-19.59936l0-118.272c0-66.29376 27.11552-126.5664 70.79936-170.25024 43.7248-43.68384 103.97696-70.81984 170.2912-70.81984 66.29376 0 126.5664 27.11552 170.27072 70.81984C725.95456 224.6656 753.07008 284.93824 753.07008 351.21152L753.07008 351.21152z"
                p-id="4702"
              ></path>
            </svg>
            <input type="password" v-model="password" autocomplete="off" placeholder="请输入密码" @keyup.enter="login" />
          </div>
          <span style="color: white;font-size: 16px;">角色选择</span><br/>
          <a-radio-group v-model:value="value1" :options="plainOptions" />
          <div class="button">
            <input @click="login" type="submit" :value="buttonText" onclick="return false" class="form-btn" />
          </div>
        </div>
      </div>
      <div class="login-footer">
        <div class="footer-content">
          <img src="@assets/img/login/logo-white.png" alt="logo" />
          <div class="split"></div>
          <div class="copyright">
            <div class="text">
              版权所有：杭州云川控制系统有限公司
              <br />
              为了更好的用户体验，推荐您使用谷歌浏览器
              <img
                class="chorme-image"
                alt="chrome"
                src="@assets/img/login/google.png"
                title="点击前往下载谷歌浏览器"
                @click="toChorme"
              />
              。
            </div>
          </div>
        </div>
        <div class="allCopy">
          版权信息:Copyright@2023 All rights reserved 备案信息：
          <a class="ip" href="https://beian.miit.gov.cn/#/Integrated/index" target="#">浙ICP备2022014696号-1</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { proxy }: any = getCurrentInstance();
const plainOptions = ['Apple', 'Pear', 'Orange'];
const value1 = ref<string>('Apple');
let userName: string = "";
let password: string = "";

let buttonText: string = "立 即 登 录";

const login = async () => {
  if (userName == null || userName == "" || userName == undefined) {
    proxy.message.error("请输入您的账号信息！");
    return;
  }
  if (password == "" || password == null || password == undefined) {
    proxy.message.error("请输入您的密码！");
    return;
  }
};

const toChorme = () => {
  window.open("https://www.google.cn/intl/zh-CN/chrome/");
};
</script>

<style lang="less" scoped>
@transition: 1s; //动画响应时间
@focusColor: rgba(21, 105, 172, 1); //聚焦颜色

.login-main {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;

  .login-content {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .login-background {
    width: 100%;
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 100%;

    .background-img {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: auto;
      -webkit-background-size: auto;
      -o-background-size: auto;
    }
  }

  .login-footer {
    height: 80px;
    width: 100%;
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    line-height: 80px;
    bottom: 12%;
    font-size: 14px;
    
    user-select: none;
    .allCopy {
      position: absolute;
      margin-top: 50px;
      color: white;
      .ip {
        color: white;
      }
    }
    .footer-content {
      display: flex;
      margin: 0 auto;
      user-select: none;

      img {
        height: 50px;
        width: 168px;
        margin: 0 auto;
      }

      .split {
        height: 50px;
        width: 2px;
        background-color: #333333;
        margin: 0 20px;
      }

      .copyright {
        height: 50px;
        position: relative;
        display: flex;
        align-items: flex-end;

        img {
          width: 20px;
          height: 20px;
        }
        .chorme-image {
          margin-top: -5px !important;
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
      }

      .text {
        height: 50px;
        line-height: 25px;
        color: white;
      }
    }
  }

  .login-form-container {
    position: relative;
    height: 600px;
    width: 490px;
    padding: 50px;
    transition: @transition;
    background-color: rgba(133, 133, 133, 0.4);
    border-radius: 5%;
    margin: 0 auto;

    .logo {
      margin: 0 auto;
      width: 300px;
      height: 90px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      font-weight: 700;
      font-style: normal;
      font-size: 26px;
      height: 70px;
      line-height: 70px;
      text-align: left;
      text-align: center;
      margin-bottom: 20px;
      color: #ffffff;
    }

    .input {
      border-width: 0px;
      position: relative;
      width: 100%;
      height: 50px;
      margin-bottom: 40px;
      background-color: #ffffff;
      border-radius: 42px;

      svg {
        position: absolute;
        height: 24px;
        top: 13px;
        left: 25px;
      }

      input {
        width: 80%;
        height: 50px;
        line-height: 50px;
        padding-left: 60px;
        padding-right: 10px;
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        letter-spacing: 1px;
        color: #333333;
        vertical-align: none;
        text-align: left;
        border: 0px;
        border-radius: 25px;
        outline: none;
      }
    }

    .button {
      height: 50px;
      width: 100%;
margin-top: 50px;
      input {
        width: 100%;
        font-size: 16px;
        height: 50px;
        line-height: 100%;
        background: @focusColor;
        transition: @transition - 0.5s;
        font-weight: bold;
        border: none;
        border-radius: 25px;
        color: white;
        cursor: pointer;
       

        &:hover {
          background: rgba(15, 81, 142, 1);
        }
      }
    }
  }
}
</style>
