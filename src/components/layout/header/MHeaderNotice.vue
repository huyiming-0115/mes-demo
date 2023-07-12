<template>
  <a-dropdown :trigger="['click']" v-model="show">
    <template #overlay>
      <a-spin :spinning="loading">
        <a-tabs
          class="dropdown-tabs"
          @change="handleTabsClick"
          :tabBarStyle="{ textAlign: 'center' }"
          :style="{ width: '297px' }"
        >
          <a-tab-pane key="1" :style="{ maxHeight: '500px', overflowY: 'auto' }">
            <template #tab>
              <a-badge :count="newCount">
                <span> 消息通知 </span>
              </a-badge>
            </template>
            <a-list class="tab-pane" :data-source="newsSource">
              <template #renderItem="{ item }">
                <a-list-item>
                  <template #extra>
                    <a-tag v-if="item.isRead == 0" color="green">new</a-tag>
                  </template>
                  <a-list-item-meta :description="item.createTime">
                    <template #title>
                      <a @click="onToNews(item)">{{ item.newsName }} </a>
                    </template>
                    <template #avatar>
                      <a-avatar src="/node/start.svg" />
                    </template>
                  </a-list-item-meta>
                  {{ item.newsText }}
                </a-list-item>
              </template>
              <template #loadMore>
                <div
                  v-if="newsSource.length > 0 && params.total > newsSource.length"
                  :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                >
                  <a-button type="link" @click="onLoadMore(1)">加载更多</a-button>
                </div>
              </template>
            </a-list>
          </a-tab-pane>
          <a-tab-pane key="2" :style="{ maxHeight: '500px', overflowY: 'auto' }">
            <template #tab>
              <a-badge :count="barCount">
                <span> 待办 </span>
              </a-badge>
            </template>
            <a-list class="tab-pane" :data-source="dataSource">
              <template #renderItem="{ item }">
                <a-list-item>
                  <template #extra>
                    <a-tag v-if="item.isRead == 0" color="green">new</a-tag>
                  </template>
                  <a-list-item-meta :description="item.startTime">
                    <template #title>
                      <a @click="onTobar(item)">{{ item.flowName }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar src="/node/activity.svg" />
                    </template>
                  </a-list-item-meta>
                  {{ item.content }}
                </a-list-item>
              </template>
              <template #loadMore>
                <div
                  v-if="dataSource.length > 0 && params.total > dataSource.length"
                  :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                >
                  <a-button type="link" @click="onLoadMore(2)">加载更多</a-button>
                </div>
              </template>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <div class="cs-header-notices">
      <a-badge class="notice-badge" :count="totalCount">
        <q-svg width="30" height="30" name="news" />
      </a-badge>
      <div>
        <a-modal v-model:visible="detailsVisible" style="width: 60%" centered title="查看详情">
          <flows-details v-if="detailsVisible" :workflowState="workflowState" />
          <template #footer>
            <a-button @click="handleDetailsCancel">取消</a-button>
          </template>
        </a-modal>
      </div>
    </div>
  </a-dropdown>
</template>
<script setup>
const show = ref(false);
const loading = ref(false);
const dataSource = ref([]);
const detailsVisible = ref(false);
const newsSource = ref([]);
const newCount = ref(0);
const barCount = ref(0);
const workflowState = ref({});
const { proxy } = getCurrentInstance();
const router = useRouter();
const params = reactive({
  pageNum: 1,
  pageSize: 5,
  total: 0,
});
const totalCount = computed({
  get: () => {
    return newCount.value + barCount.value;
  },
});
/* const onLoadMore = key => {
  params.pageSize = params.pageSize + 5;
  if (params.pageSize > params.total) {
    params.pageSize = params.total;
  }
  if (key == '2') {
    onloadTaskbar();
  }
  if (key == '1') {
    onloadNews();
  }
}; */
const handleTabsClick = key => {
  if (key == '1') {
    params.pageSize = 5;
    onloadNews();
  }
  if (key == '2') {
    params.pageSize = 5;
    onloadTaskbar();
  }
};

const onloadNews = () => {
  proxy.api.news.query(params).then(res => {
    newsSource.value = res.data;
    params.total = res.total;
  });
  proxy.api.news.getUnread().then(res => {
    newCount.value = res.data;
  });
};
const onloadTaskbar = () => {
  proxy.api.taskbar.queryMyTaskbar(params).then(res => {
    dataSource.value = res.data;
    params.total = res.total;
  });
  proxy.api.taskbar.getUnread().then(res => {
    barCount.value = res.data;
  });
};

const onToNews = item => {
  proxy.api.news
    .updateStateRead({
      id: item.id,
    })
    .then(res => {
      const meta = JSON.parse(item.metaData);
      if (meta.flowId) {
        workflowState.value = {
          flowId: meta.flowId,
        };
        detailsVisible.value = true;
      }
      onloadNews();
    });
};

const onTobar = async item => {
  item.ts = new Date().getTime();
  proxy.api.taskbar
    .updateStateRead({
      id: item.id,
    })
    .then(res => {
      onloadTaskbar();
      router.push({
        name: 'workflow-taskbar',
        query: {
          flowName: item.flowName,
          receiverId: item.receiverId,
          flowId: item.flowId,
          stepId: item.stepId,
          title: item.title,
          type: item.type,
          id: item.id,
        },
      });
    });
};

const handleDetailsCancel = () => {
  detailsVisible.value = false;
};
onMounted(() => {
/*   onloadNews();
  onloadTaskbar(); */
});
</script>
<style lang="less">
.cs-header-notices {
  transition: all 0.3s;
  margin-right: 15px;
  span {
    vertical-align: initial;
  }
  .notice-badge {
    color: inherit;
    font-size: 25px;
    vertical-align: middle;
  }
}
.dropdown-tabs {
  background-color: white;
  box-shadow: 0 2px 8px white;
  border-radius: 4px;
  .tab-pane {
    padding: 0 24px 12px;
    min-height: 250px;
  }
}
</style>
