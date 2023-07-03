import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { themePreprocessorHmrPlugin, themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, AntDesignVueResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Pages from 'vite-plugin-pages';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 用于cdn静态部署，
  base: '/',
  server: {},
  resolve: {
    alias: {
      // 把 @ 指向到 src 目录去
      '@': path.resolve(__dirname, 'src'),
      // 把 @assets 指向到 src/assets 目录去
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    vueJsx(),
    DefineOptions(),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '/' }],
      //异步⽅式加载路由组件
      importMode: 'async',
      //遍历路由信息，给默认路由加⼀个redirect
      extendRoute(route) {
        if (route.path === '/') return { ...route, redirect: '/login/login' };
        if (route.path === '/auth') return { ...route, redirect: '/login/login' };
      },
    }),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: [
        'vue',
        'pinia',
        'vue-router',
        '@vueuse/core',
        // 自定义工具组件加载
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: './src/components.d.ts',
      //在此列表中的组件也会按需自动导入和注册
      dirs: ['./src/components'],
      //extensions: ['vue', 'js'],
      // include: [/\.vue$/, /\.vue\?vue/],
      //此UI库的组件也会自动导入和注册（element-ui对应ElementUiResolver，Naive UI对应NaiveUiResolver，vant对应VantResolver，iview对应ViewUiResolver等等）
      //配置之后，无需在 main.js 引入了,想要使用哪个组件，可直接在 template 中引入
      // AntDesignVue 用less 开发指定加载less 便于主题修改
      resolvers: [AntDesignVueResolver({ importStyle: 'less' }), VueUseComponentsResolver(), IconsResolver(), ElementPlusResolver()],
    }),

  ],

})
