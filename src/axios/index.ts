import axios, { AxiosRequestConfig } from 'axios';
import Qs from 'qs';
import NProgress from 'nprogress';
import loadSpin from '../store/loadSpin';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API || "";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import { message,Modal } from 'ant-design-vue';
const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

let config = {
  Global: true,
  baseURL: BASE_PREFIX || '',
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  // },
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  transformRequest: [
    function (data:any, config:any) {
      // 对 data 进行任意转换处理
      // config.Content - Type;
      let contentType = config['Content-Type'];
      if (contentType?.indexOf('json')) {
        return JSON.stringify(data);
      }
      return Qs.stringify(data);
    },
  ],
};

const ofInstall = (app:any, { router }:any) => {
  const _axios = axios.create(config);
  // 请求拦截
  _axios.interceptors.request.use(
    (config:any) => {
      NProgress.done();
      if (config.Global) {
        NProgress.start();
        const store = loadSpin();
        store.setSpinning(true);
      }
      //*请求头添加token
      // const token = store.getters.token;
      let _token = sessionStorage.getItem('token') || '';
      _token && (config.headers.Authorization = _token);
      // token && (config.headers.Authorization = token);
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      NProgress.done();
      const store = loadSpin();
      store.setSpinning(false);
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  // 响应拦截
  _axios.interceptors.response.use(
    response => {
      // TODO 根据响应头更新token
      //store.dispatch("app/set_token", new Date().getTime());
      NProgress.done();
      const store = loadSpin();
      store.setSpinning(false);
      if (response.data.code !== 200) {
        message.destroy();
        message.error(response.data.message);
      }
      return response.data;
    },
    error => {
      // Do something with response error
      NProgress.done();
      const store = loadSpin();
      store.setSpinning(false);
      message.destroy();
      if (error.response.data) {
        message.error(error.response.data.message);
      } else {
        message.error('当前服务不可用！');
      }
      if (error.response.status === 401) {
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    },
  );
  // axios＃get（url [，config]）
  // axios＃delete（url [，config]）
  // axios＃head（url [，config]）
  // axios＃post（url [，data [，config]]）
  // axios＃put（url [，data [，config]]）
  // axios＃patch（url [，data [，config]]）
  const method:any = {
    post: (url: string, p: any, config: AxiosRequestConfig<any> | undefined) => _axios.post(url, p, config),
    put: (url: string, p: any, config: AxiosRequestConfig<any> | undefined) => _axios.post(url, p, config),
    patch: (url: string, p: any, config: AxiosRequestConfig<any> | undefined) => _axios.post(url, p, config),
    head: (url: string, p: any, config: any) => _axios.head(url, Object.assign(config, { params: p })),
    delete: (url: string, p: any, config:any) => _axios.delete(url, Object.assign(config, { params: p })),
    get: (url: string, p: any, config: any) => _axios.get(url, Object.assign(config, { params: p })),
  };

  const api:any = {};
  const apis:any = import.meta.globEager('../api/*.ts');
  Object.keys(apis).forEach(flieName => {
    let apiName:any = flieName.replace(/(\.\.\/|\.js|api\/)/g, '');
    let obj = apis[flieName].default;
    api[apiName] = {};
    Object.keys(obj).forEach((item:any) => {
      api[apiName][item] = (p:any, config:any = {}) => method[obj[item].type](obj[item].url, p, config);
    });
  });
  app.config.globalProperties.api = api;
  app.config.globalProperties.message = message;
  app.config.globalProperties.Modal = Modal;
};

export default {
  install: ofInstall,
};
