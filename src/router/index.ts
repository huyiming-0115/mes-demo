import { createRouter, createWebHistory } from 'vue-router';
// 忽略ts的检测
// @ts-ignore
import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';


const router:any = createRouter({
  history: createWebHistory(),
  scrollBehavior: ():any => ({ y: 0 }),
  // @ts-ignore
  isAccessToken: false, // 是否已经添加动态(菜单)路由
  routes: routes,
});

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to:any,  next :any) => {
  let query = to.query;
  //如果在查询条件中带有token
  let _token = query.token;
  // 设置页面标题
  document.title = to.meta.title || import.meta.env.VITE_APP_TITLE;
  if (to.name !== 'login' && (!_token || !/\S/.test(_token))) {
    _token = sessionStorage.getItem('token') ?? '';
    if (!_token || !/\S/.test(_token)) {
      return next({ name: 'login' });
    } else {
      return checkToken(to, _token, next);
    }
  } else {
    if (router.hasRoute(to.name)) {
      if (to.name !== 'login' && to.name.indexOf('notFindPag') < 1) {
        //匹配到的时候检查跳转相应的路由
        return checkToken(to, _token, next);
      } else {
        return next();
      }
    } else {
      //未匹配到的时候跳转到404页面
      return next({ name: 'workflow-notFindPage-404' });
    }
  }
});

router.afterEach(() => {
  //console.log('全局路由后置守卫：to,from\n', to, from);
  NProgress.done();
});
const checkToken = async (to:any, token:any, next:any) => {
  // @ts-ignore
  let api = app.__vue_app__.config.globalProperties.api;
  let res = await api.login.check({ token: token, path: to.path });
  if (res.code === 200) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('users', JSON.stringify(res.data));
    router.options.isAccessToken = true;
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
    return next();
  } else {
    return next({ name: 'login' });
  }
};

export default router;
