import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { themePreprocessorHmrPlugin, themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, AntDesignVueResolver, VueUseComponentsResolver,NaiveUiResolver  } from 'unplugin-vue-components/resolvers'
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
  server: {
    open: false,//启动项目后自动打开浏览器
    port: 5120, //端口配置
    hmr: true, //开启热加载
    proxy:{},
  },
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
        console.log("当前的继承路由界面",route)
        if (route.path === '/') return { ...route, redirect: '/login' };
        if (route.path === '/login') return { ...route, redirect: '/login' };
      },
    }),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: [
        'vue',
        'pinia',
        'vue-router',
        '@vueuse/core',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        },
        // 自定义工具组件加载
        /*         {
                  '/src/utils/flowForms': ['flowForms'],
                  '/src/utils/flowNode': ['flowNode'],
                  '/src/utils/flowNodeIntercept': ['nodeIntercepts'],
                  '/src/utils/tools': [
                    'getPagination',
                    'loadInfo',
                    'loadJSONInfo',
                    'toRawMeta',
                    'toNodeMeta',
                    'getPrvNodes',
                    'treeFindPath',
                  ],
                }, */
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
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
      resolvers: [AntDesignVueResolver({ importStyle: 'less' }), VueUseComponentsResolver(), IconsResolver(), ElementPlusResolver(),NaiveUiResolver()],
    }),
    themePreprocessorPlugin({
      less: {
        arbitraryMode: false,
        extract: true,
        // 各个主题文件的位置
        multipleScopeVars: [
/*           {
            scopeName: 'theme-default', // 主题名称
           path: path.resolve('src/assets/styles/themes/default.less'), // 主题文件地址
          }, */
        ],
        defaultScopeName: 'theme-default', // 默认主题
      },
    }),
    themePreprocessorHmrPlugin(),
    /* createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      // libs: [
      //   // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
      //   {
      //     libraryName: 'ant-design-vue',
      //     esModule: true,
      //     resolveStyle: name => {
      //       return `ant-design-vue/es/${name}/style/index`;
      //     },
      //   },
      // ],
    }), */
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    Icons({
      //加载icons 使用icones图标库icones.netlify.app
      autoInstall: true,
    }),
  ],
  optimizeDeps: {
    // 排除 browser-utils.js 在vite的缓存依赖，对应 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils" 的路径
    exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
  },
  css: {
    preprocessorOptions: {
      scss: {
       // additionalData: `@import "@/assets/styles/variables.scss";`,
        javascriptEnabled: true,
      },
      less: {
        // additionalData: [`@import "@/assets/styles/default.less";`],
        javascriptEnabled: true,
      },
    },
  },
  json: {
    namedExports: true, // 是否支持从.json文件中进行按名导入
    stringify: false, //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
  },
  build: {
    target: 'esnext',
    minify: 'terser', // 混淆器，terser构建后文件体积更小,esbulid速率二十到四十倍于terser
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    reportCompressedSize:false,//启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    // 前提在于minify设置为terser,在生产环境移除console.log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
