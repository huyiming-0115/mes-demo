<template>
  <div class="home-back wb100 hb100">
    <!-- 个人信息区域-->
    <div class="person basic">
      <div class="pad-per">
        <div class="avatar"></div>
        <div class="user">
          <span style="font-size: 18px">哦哈哟</span>
          <span style="font-size: 14px; color: rgba(170, 170, 170, 1)">不知道放啥</span>
        </div>
        <div class="task">
          <span style="font-size: 16px; color: rgba(170, 170, 170, 1)">待办</span>
          <span style="font-size: 24px">4/16</span>
        </div>
      </div>
    </div>
    <!-- 公告区域 -->
    <div class="notice basic mt12">
      <div class="notice-info">
        <img alt="" src="@/assets/img/home-notice.png" height="20" width="20" />
        <h3 style="margin-left: 15px">公告：</h3>
        <span>未来展示相关公告信息</span>
      </div>
    </div>
    <!-- 信息展示区域 -->
    <div class="info mt12 wb100">
      <!-- 左侧待办/信息区域 -->
      <div class="show hb100">
        <!-- 待办展示 -->
        <div class="wait content wb100">
          <div class="actu-info">
            <div class="wait-bar">
              <div class="bar-base">
                <img alt="" src="@/assets/img/home-deal.png" height="20" width="20" />
                <h3 style="margin-left: 15px">我的待办：</h3>
              </div>

              <div style="height: 35px; float: right; width: 300px; margin-top: 8px">
                <a-input :maxlength="16" :default-value="''" class="input">
                  <!-- 放大镜 -->
                  <template #addonAfter>
                    <div class="flex-center pointer">
                      <q-svg width="15" height="15" name="amplifier" />
                    </div>
                  </template>
                </a-input>
              </div>
            </div>
            <div class="wait-content">
              <a-spin :spinning="spinning">
                <a-table
                  :dataSource="tableList"
                  :columns="columns"
                  :pagination="false"
                  rowKey="id"
                  sticky
                  size="small"
                  :row-class-name="(_record:any, index:number): any => (index % 2 === 1 ? 'table-striped' : null)"
                  bordered
                >
                  <!-- 表体插槽 -->
                  <template #bodyCell="{ record, column, index }">
                    <!-- 操作 -->
                    <div v-if="column.key === 'operate'" class="flex-start">
                      <div class="btn-link" @click.stop="">查看详情</div>
                    </div>
                  </template>
                  <!-- 空表格时候的插槽 -->
                  <template #emptyText>
                    <Empty></Empty>
                  </template>
                </a-table>
              </a-spin>
            </div>
          </div>
        </div>
        <!-- 信息展示 -->
        <div class="message content mt12 wb100">
          <div class="actu-info">
            <div class="wait-bar">
              <div class="bar-base">
                <img alt="" src="@/assets/img/home-message.png" height="20" width="20" />
                <h3 style="margin-left: 15px">消息：</h3>
              </div>
              <a-button
                type="primary"
                class="primary-button"
                style="height: 35px; float: right; margin-top: 8px"
                >全部已读</a-button
              >
            </div>
            <div>未来展示消息界面</div>
          </div>
        </div>
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
            <div style="height: 16px">
              <img alt="" src="@/assets/img/home-location.png" height="16" width="16" />
              <span style="margin-left: 8px">关于云川</span>
            </div>
            <div class="mt12 ml24 btn-link" style="height: 16px">云川官网</div>
            <div class="mt12" style="height: 16px">
              <img alt="" src="@/assets/img/home-phone.png" height="16" width="16" />
              <span style="margin-left: 8px">联系云川</span>
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

<script setup lang="ts">
let spinning = ref<boolean>(false);

const columns = [
  {
    title: "序号",
    dataIndex: "number",
    key: "number",
    customRender: ({ index }: any) => `${index + 1}`,
    width: 60,
  },
  {
    title: "待办名称",
    dataIndex: "name",
    key: "name",
    width: 120,
    ellipsis: true,
  },
  {
    title: "待办事项",
    dataIndex: "item",
    key: "item",
    width: 120,
    ellipsis: true,
  },
  {
    title: "待办内容",
    dataIndex: "content",
    key: "content",
    ellipsis: true,
  },
  {
    title: "发起人",
    dataIndex: "person",
    key: "person",
    width: 150,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
  {
    title: "结论",
    dataIndex: "conclusion",
    key: "conclusion",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 120,
  },
];
// 表体数据
const tableList: any = ref([]);

const getListFn = async (params?: any) => {
  console.log("列表组件内部传入数据==>", params);
  // 在这里处理数据
  spinning.value = true;
  spinning.value = false;
  let arr: any = [];
  for (let i = 0; i < 30; i++) {
    let obj: any = {
      id: i + 1,
      name: "666",
      item: "第一等物料",
      content: "666",
      preson: "个",
      status: "6666",
      conclusion: "666",
    };
    arr.push(obj);
  }
  tableList.value = arr;
};
onMounted(() => {
  getListFn();
});
</script>

<style scoped lang="less">
@import "@/assets/styles/base/antdTable.less";
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
      align-items: start;
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

    .notice-info {
      padding: 10px 10px 10px 30px;
      display: flex;
      flex-direction: inherit;
      height: 50px;
      align-items: center;
      justify-content: start;
    }
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

        .actu-info {
          padding: 15px 24px;
          height: 100%;
          width: 100%;

          .wait-bar {
            height: 35px;
            width: 100%;

            .bar-base {
              width: calc(100% - 350px);
              display: flex;
              float: left;
              flex-direction: inherit;
              height: 35px;
              align-items: center;
              justify-content: start;
            }
          }

          .wait-content {
            height: calc(100% - 55px);
            margin-top: 15px;
            width: 100%;
            overflow: auto;
          }
        }
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
