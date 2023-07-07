import 'nprogress/nprogress.css';
import pinia from './store';
import router from './router';
import axios from './axios';
import App from './App.vue'

createApp(App).use(pinia).use(axios, { router }).use(router).mount('#app');
