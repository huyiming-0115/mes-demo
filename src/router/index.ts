import { createRouter, createWebHistory } from 'vue-router';
import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';


const router: any = createRouter({
  history: createWebHistory(),
  scrollBehavior: (): any => ({ y: 0 }),
  routes: routes,
  // @ts-ignore
  isAccessToken: false, // 是否已经添加动态(菜单)路由

});

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to: any, from: any, next: any) => {
  console.log("当前的一些路由界面信息==>",routes)
  let query = to.query;
  //如果在查询条件中带有token
  let token = query.token;
  /*   console.log("当前正在进入路由前置校验",to,next)
    console.log("当前界面预期展环境变量数据",import.meta.env)
    console.log("当前界面预期展示标题",import.meta.env.VITE_APP_TITLE)
    console.log("检测当前路由",router,to,router.hasRoute(to.name))
    console.log("打印当前路由全部信息",router.routes) */
  // 设置页面标题
  document.title = to.meta.title || import.meta.env.VITE_APP_TITLE;
  if (to.name !== 'login') {
    //token = sessionStorage.getItem('token') ?? '';
    let auth = sessionStorage.getItem('auth') ?? '';
    if (auth) {
      return next();
    } else {
      return next({ name: 'login' });
    }
    console.log(auth)
    /*     if (!token || !/\S/.test(token)) {
          console.log("cascacacasacas==!token")
          return next({ path: '/login' });
        } else {
          console.log("cascacacasacas")
          return checkToken(to, token, next);
        } */
    /* console.log("cascacacasacas==!login") */
    /* return next({name:'login'}); */

  } else {
    if (router.hasRoute(to.name)) {
      console.log("检测当前路由", router, to, router.hasRoute(to.name))
      /*       if (to.name !== 'login' && to.name.indexOf('notFindPag') < 1) {
      
              console.log("sssss")
              console.log("sssss")
              //匹配到的时候检查跳转相应的路由
              return checkToken(to, token, next);
            } else {
              console.log("sssss")
              return next();
            } */
      /* console.log("scsacascascasikoooooo") */
      return next();
    } else {
      //未匹配到的时候跳转到404页面
      //return next({ name: 'workflow-notFindPage-404' });
      /* console.log("sssafascvasc") */
      return next({ name: 'login' });
    }
  }
});

router.afterEach(() => {
  //console.log('全局路由后置守卫：to,from\n', to, from);
  NProgress.done();
});
const checkToken = async (to: any, token: any, next: any) => {
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
