import 'nprogress/nprogress.css';
import "animate.css";
import '../src/assets/styles/base/index.less'; //全局样式
import '../src/assets/styles/base/element.css'; //element全局样式
import Directives from './directives';
import pinia from './store';
import router from './router';
import axios from './axios';
import App from './App.vue'

createApp(App).use(pinia).use(axios, { router }).use(router).use(Directives).mount('#app');
