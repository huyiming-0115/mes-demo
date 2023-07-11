// vite.config.ts
import { defineConfig } from "file:///D:/2023-project/mes-demo/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/2023-project/mes-demo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/2023-project/mes-demo/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import DefineOptions from "file:///D:/2023-project/mes-demo/node_modules/unplugin-vue-define-options/dist/vite.mjs";
import { themePreprocessorHmrPlugin, themePreprocessorPlugin } from "file:///D:/2023-project/mes-demo/node_modules/@zougt/vite-plugin-theme-preprocessor/dist/index.js";
import { createSvgIconsPlugin } from "file:///D:/2023-project/mes-demo/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import AutoImport from "file:///D:/2023-project/mes-demo/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/2023-project/mes-demo/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver, AntDesignVueResolver, VueUseComponentsResolver, NaiveUiResolver } from "file:///D:/2023-project/mes-demo/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { quasar, transformAssetUrls } from "file:///D:/2023-project/mes-demo/node_modules/@quasar/vite-plugin/src/index.js";
import Icons from "file:///D:/2023-project/mes-demo/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///D:/2023-project/mes-demo/node_modules/unplugin-icons/dist/resolver.mjs";
import Pages from "file:///D:/2023-project/mes-demo/node_modules/vite-plugin-pages/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\2023-project\\mes-demo";
var vite_config_default = defineConfig({
  // 用于cdn静态部署，
  base: "/",
  server: {
    open: false,
    //启动项目后自动打开浏览器
    port: 5120,
    //端口配置
    hmr: true,
    //开启热加载
    proxy: {}
  },
  resolve: {
    alias: {
      // 把 @ 指向到 src 目录去
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      // 把 @assets 指向到 src/assets 目录去
      "@assets": path.resolve(__vite_injected_original_dirname, "src/assets")
    }
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: "src/quasar-variables.sass"
    }),
    vueJsx(),
    DefineOptions(),
    Pages({
      dirs: [{ dir: "src/views", baseRoute: "/" }],
      //异步⽅式加载路由组件
      importMode: "async",
      //遍历路由信息，给默认路由加⼀个redirect
      extendRoute(route) {
        console.log("vite.config.ts == route ==>", route);
        console.log("\u5F53\u524D\u7684\u7EE7\u627F\u8DEF\u7531\u754C\u9762", route);
        if (route.path === "/")
          return { ...route, redirect: "/login" };
      }
    }),
    AutoImport({
      dts: "./src/auto-imports.d.ts",
      imports: [
        "vue",
        "pinia",
        "vue-router",
        "@vueuse/core",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
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
        enabled: true,
        // Default `false`
        filepath: "./.eslintrc-auto-import.json",
        // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true
        // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: "./src/components.d.ts",
      //在此列表中的组件也会按需自动导入和注册
      dirs: ["./src/components"],
      //extensions: ['vue', 'js'],
      // include: [/\.vue$/, /\.vue\?vue/],
      //此UI库的组件也会自动导入和注册（element-ui对应ElementUiResolver，Naive UI对应NaiveUiResolver，vant对应VantResolver，iview对应ViewUiResolver等等）
      //配置之后，无需在 main.js 引入了,想要使用哪个组件，可直接在 template 中引入
      // AntDesignVue 用less 开发指定加载less 便于主题修改
      resolvers: [AntDesignVueResolver({ importStyle: "less" }), VueUseComponentsResolver(), IconsResolver(), ElementPlusResolver(), NaiveUiResolver()]
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
        defaultScopeName: "theme-default"
        // 默认主题
      }
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
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    }),
    Icons({
      //加载icons 使用icones图标库icones.netlify.app
      autoInstall: true
    })
  ],
  optimizeDeps: {
    // 排除 browser-utils.js 在vite的缓存依赖，对应 import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils" 的路径
    exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/styles/variables.scss";`,
        javascriptEnabled: true
      },
      less: {
        // additionalData: [`@import "@/assets/styles/default.less";`],
        javascriptEnabled: true
      }
    }
  },
  json: {
    namedExports: true,
    // 是否支持从.json文件中进行按名导入
    stringify: false
    //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
  },
  build: {
    target: "esnext",
    minify: "terser",
    // 混淆器，terser构建后文件体积更小,esbulid速率二十到四十倍于terser
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2e3,
    reportCompressedSize: false,
    //启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    // 前提在于minify设置为terser,在生产环境移除console.log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwyMDIzLXByb2plY3RcXFxcbWVzLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDIwMjMtcHJvamVjdFxcXFxtZXMtZGVtb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMjAyMy1wcm9qZWN0L21lcy1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCBEZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJztcbmltcG9ydCB7IHRoZW1lUHJlcHJvY2Vzc29ySG1yUGx1Z2luLCB0aGVtZVByZXByb2Nlc3NvclBsdWdpbiB9IGZyb20gJ0B6b3VndC92aXRlLXBsdWdpbi10aGVtZS1wcmVwcm9jZXNzb3InO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyLCBBbnREZXNpZ25WdWVSZXNvbHZlciwgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyLE5haXZlVWlSZXNvbHZlciAgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiwgQW5kRGVzaWduVnVlUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5pbXBvcnQgeyBxdWFzYXIsIHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gJ0BxdWFzYXIvdml0ZS1wbHVnaW4nXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBcdTc1MjhcdTRFOEVjZG5cdTk3NTlcdTYwMDFcdTkwRThcdTdGNzJcdUZGMENcbiAgYmFzZTogJy8nLFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiBmYWxzZSwvL1x1NTQyRlx1NTJBOFx1OTg3OVx1NzZFRVx1NTQwRVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxuICAgIHBvcnQ6IDUxMjAsIC8vXHU3QUVGXHU1M0UzXHU5MTREXHU3RjZFXG4gICAgaG1yOiB0cnVlLCAvL1x1NUYwMFx1NTQyRlx1NzBFRFx1NTJBMFx1OEY3RFxuICAgIHByb3h5Ont9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIFx1NjI4QSBAIFx1NjMwN1x1NTQxMVx1NTIzMCBzcmMgXHU3NkVFXHU1RjU1XHU1M0JCXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgIC8vIFx1NjI4QSBAYXNzZXRzIFx1NjMwN1x1NTQxMVx1NTIzMCBzcmMvYXNzZXRzIFx1NzZFRVx1NUY1NVx1NTNCQlxuICAgICAgJ0Bhc3NldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoeyB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSB9KSxcbiAgICBxdWFzYXIoe1xuICAgICAgc2Fzc1ZhcmlhYmxlczogJ3NyYy9xdWFzYXItdmFyaWFibGVzLnNhc3MnXG4gICAgfSksXG4gICAgdnVlSnN4KCksXG4gICAgRGVmaW5lT3B0aW9ucygpLFxuICAgIFBhZ2VzKHtcbiAgICAgIGRpcnM6IFt7IGRpcjogJ3NyYy92aWV3cycsIGJhc2VSb3V0ZTogJy8nIH1dLFxuICAgICAgLy9cdTVGMDJcdTZCNjVcdTJGNDVcdTVGMEZcdTUyQTBcdThGN0RcdThERUZcdTc1MzFcdTdFQzRcdTRFRjZcbiAgICAgIGltcG9ydE1vZGU6ICdhc3luYycsXG4gICAgICAvL1x1OTA0RFx1NTM4Nlx1OERFRlx1NzUzMVx1NEZFMVx1NjA2Rlx1RkYwQ1x1N0VEOVx1OUVEOFx1OEJBNFx1OERFRlx1NzUzMVx1NTJBMFx1MkYwMFx1NEUyQXJlZGlyZWN0XG4gICAgICBleHRlbmRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInZpdGUuY29uZmlnLnRzID09IHJvdXRlID09PlwiLHJvdXRlKVxuICAgICAgICBjb25zb2xlLmxvZyhcIlx1NUY1M1x1NTI0RFx1NzY4NFx1N0VFN1x1NjI3Rlx1OERFRlx1NzUzMVx1NzU0Q1x1OTc2MlwiLHJvdXRlKVxuICAgICAgICBpZiAocm91dGUucGF0aCA9PT0gJy8nKSByZXR1cm4geyAuLi5yb3V0ZSwgcmVkaXJlY3Q6ICcvbG9naW4nIH07XG4gICAgICAgLy8gaWYgKHJvdXRlLnBhdGggPT09ICcvbG9naW4nKSByZXR1cm4geyAuLi5yb3V0ZSwgcmVkaXJlY3Q6ICcvbG9naW4nIH07XG4gICAgICB9LFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgZHRzOiAnLi9zcmMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAge1xuICAgICAgICAgICduYWl2ZS11aSc6IFtcbiAgICAgICAgICAgICd1c2VEaWFsb2cnLFxuICAgICAgICAgICAgJ3VzZU1lc3NhZ2UnLFxuICAgICAgICAgICAgJ3VzZU5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAndXNlTG9hZGluZ0JhcidcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NURFNVx1NTE3N1x1N0VDNFx1NEVGNlx1NTJBMFx1OEY3RFxuICAgICAgICAvKiAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICcvc3JjL3V0aWxzL2Zsb3dGb3Jtcyc6IFsnZmxvd0Zvcm1zJ10sXG4gICAgICAgICAgICAgICAgICAnL3NyYy91dGlscy9mbG93Tm9kZSc6IFsnZmxvd05vZGUnXSxcbiAgICAgICAgICAgICAgICAgICcvc3JjL3V0aWxzL2Zsb3dOb2RlSW50ZXJjZXB0JzogWydub2RlSW50ZXJjZXB0cyddLFxuICAgICAgICAgICAgICAgICAgJy9zcmMvdXRpbHMvdG9vbHMnOiBbXG4gICAgICAgICAgICAgICAgICAgICdnZXRQYWdpbmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xvYWRJbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xvYWRKU09OSW5mbycsXG4gICAgICAgICAgICAgICAgICAgICd0b1Jhd01ldGEnLFxuICAgICAgICAgICAgICAgICAgICAndG9Ob2RlTWV0YScsXG4gICAgICAgICAgICAgICAgICAgICdnZXRQcnZOb2RlcycsXG4gICAgICAgICAgICAgICAgICAgICd0cmVlRmluZFBhdGgnLFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LCAqL1xuICAgICAgXSxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLCAvLyBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxuICAgICAgfSxcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6ICcuL3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgLy9cdTU3MjhcdTZCNjRcdTUyMTdcdTg4NjhcdTRFMkRcdTc2ODRcdTdFQzRcdTRFRjZcdTRFNUZcdTRGMUFcdTYzMDlcdTk3MDBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU0OENcdTZDRThcdTUxOENcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cyddLFxuICAgICAgLy9leHRlbnNpb25zOiBbJ3Z1ZScsICdqcyddLFxuICAgICAgLy8gaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS9dLFxuICAgICAgLy9cdTZCNjRVSVx1NUU5M1x1NzY4NFx1N0VDNFx1NEVGNlx1NEU1Rlx1NEYxQVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTQ4Q1x1NkNFOFx1NTE4Q1x1RkYwOGVsZW1lbnQtdWlcdTVCRjlcdTVFOTRFbGVtZW50VWlSZXNvbHZlclx1RkYwQ05haXZlIFVJXHU1QkY5XHU1RTk0TmFpdmVVaVJlc29sdmVyXHVGRjBDdmFudFx1NUJGOVx1NUU5NFZhbnRSZXNvbHZlclx1RkYwQ2l2aWV3XHU1QkY5XHU1RTk0Vmlld1VpUmVzb2x2ZXJcdTdCNDlcdTdCNDlcdUZGMDlcbiAgICAgIC8vXHU5MTREXHU3RjZFXHU0RTRCXHU1NDBFXHVGRjBDXHU2NUUwXHU5NzAwXHU1NzI4IG1haW4uanMgXHU1RjE1XHU1MTY1XHU0RTg2LFx1NjBGM1x1ODk4MVx1NEY3Rlx1NzUyOFx1NTRFQVx1NEUyQVx1N0VDNFx1NEVGNlx1RkYwQ1x1NTNFRlx1NzZGNFx1NjNBNVx1NTcyOCB0ZW1wbGF0ZSBcdTRFMkRcdTVGMTVcdTUxNjVcbiAgICAgIC8vIEFudERlc2lnblZ1ZSBcdTc1MjhsZXNzIFx1NUYwMFx1NTNEMVx1NjMwN1x1NUI5QVx1NTJBMFx1OEY3RGxlc3MgXHU0RkJGXHU0RThFXHU0RTNCXHU5ODk4XHU0RkVFXHU2NTM5XG4gICAgICByZXNvbHZlcnM6IFtBbnREZXNpZ25WdWVSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnbGVzcycgfSksIFZ1ZVVzZUNvbXBvbmVudHNSZXNvbHZlcigpLCBJY29uc1Jlc29sdmVyKCksIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxOYWl2ZVVpUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgdGhlbWVQcmVwcm9jZXNzb3JQbHVnaW4oe1xuICAgICAgbGVzczoge1xuICAgICAgICBhcmJpdHJhcnlNb2RlOiBmYWxzZSxcbiAgICAgICAgZXh0cmFjdDogdHJ1ZSxcbiAgICAgICAgLy8gXHU1NDA0XHU0RTJBXHU0RTNCXHU5ODk4XHU2NTg3XHU0RUY2XHU3Njg0XHU0RjREXHU3RjZFXG4gICAgICAgIG11bHRpcGxlU2NvcGVWYXJzOiBbXG4vKiAgICAgICAgICAge1xuICAgICAgICAgICAgc2NvcGVOYW1lOiAndGhlbWUtZGVmYXVsdCcsIC8vIFx1NEUzQlx1OTg5OFx1NTQwRFx1NzlGMFxuICAgICAgICAgICBwYXRoOiBwYXRoLnJlc29sdmUoJ3NyYy9hc3NldHMvc3R5bGVzL3RoZW1lcy9kZWZhdWx0Lmxlc3MnKSwgLy8gXHU0RTNCXHU5ODk4XHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwXG4gICAgICAgICAgfSwgKi9cbiAgICAgICAgXSxcbiAgICAgICAgZGVmYXVsdFNjb3BlTmFtZTogJ3RoZW1lLWRlZmF1bHQnLCAvLyBcdTlFRDhcdThCQTRcdTRFM0JcdTk4OThcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdGhlbWVQcmVwcm9jZXNzb3JIbXJQbHVnaW4oKSxcbiAgICAvKiBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XG4gICAgICByZXNvbHZlczogW0FuZERlc2lnblZ1ZVJlc29sdmUoKV0sXG4gICAgICAvLyBsaWJzOiBbXG4gICAgICAvLyAgIC8vIFx1NTk4Mlx1Njc5Q1x1NkNBMVx1NjcwOVx1NEY2MFx1OTcwMFx1ODk4MVx1NzY4NHJlc29sdmVcdUZGMENcdTUzRUZcdTRFRTVcdTU3MjhsaWJcdTUxODVcdTc2RjRcdTYzQTVcdTUxOTlcdUZGMENcdTRFNUZcdTUzRUZcdTRFRTVcdTdFRDlcdTYyMTFcdTRFRUNcdTYzRDBcdTRGOUJQUlxuICAgICAgLy8gICB7XG4gICAgICAvLyAgICAgbGlicmFyeU5hbWU6ICdhbnQtZGVzaWduLXZ1ZScsXG4gICAgICAvLyAgICAgZXNNb2R1bGU6IHRydWUsXG4gICAgICAvLyAgICAgcmVzb2x2ZVN0eWxlOiBuYW1lID0+IHtcbiAgICAgIC8vICAgICAgIHJldHVybiBgYW50LWRlc2lnbi12dWUvZXMvJHtuYW1lfS9zdHlsZS9pbmRleGA7XG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIF0sXG4gICAgfSksICovXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICB9KSxcbiAgICBJY29ucyh7XG4gICAgICAvL1x1NTJBMFx1OEY3RGljb25zIFx1NEY3Rlx1NzUyOGljb25lc1x1NTZGRVx1NjgwN1x1NUU5M2ljb25lcy5uZXRsaWZ5LmFwcFxuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIC8vIFx1NjM5Mlx1OTY2NCBicm93c2VyLXV0aWxzLmpzIFx1NTcyOHZpdGVcdTc2ODRcdTdGMTNcdTVCNThcdTRGOURcdThENTZcdUZGMENcdTVCRjlcdTVFOTQgaW1wb3J0IHsgdG9nZ2xlVGhlbWUgfSBmcm9tIFwiQHpvdWd0L3ZpdGUtcGx1Z2luLXRoZW1lLXByZXByb2Nlc3Nvci9kaXN0L2Jyb3dzZXItdXRpbHNcIiBcdTc2ODRcdThERUZcdTVGODRcbiAgICBleGNsdWRlOiBbJ0B6b3VndC92aXRlLXBsdWdpbi10aGVtZS1wcmVwcm9jZXNzb3IvZGlzdC9icm93c2VyLXV0aWxzJ10sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgLFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBsZXNzOiB7XG4gICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBbYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvZGVmYXVsdC5sZXNzXCI7YF0sXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBqc29uOiB7XG4gICAgbmFtZWRFeHBvcnRzOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTY1MkZcdTYzMDFcdTRFQ0UuanNvblx1NjU4N1x1NEVGNlx1NEUyRFx1OEZEQlx1ODg0Q1x1NjMwOVx1NTQwRFx1NUJGQ1x1NTE2NVxuICAgIHN0cmluZ2lmeTogZmFsc2UsIC8vICBcdTVGMDBcdTU0MkZcdTZCNjRcdTk4NzlcdUZGMENcdTVCRkNcdTUxNjVcdTc2ODQgSlNPTiBcdTRGMUFcdTg4QUJcdThGNkNcdTYzNjJcdTRFM0EgZXhwb3J0IGRlZmF1bHQgSlNPTi5wYXJzZShcIi4uLlwiKSBcdTRGMUFcdTc5ODFcdTc1MjhcdTYzMDlcdTU0MERcdTVCRkNcdTUxNjVcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1NkRGN1x1NkRDNlx1NTY2OFx1RkYwQ3RlcnNlclx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRixlc2J1bGlkXHU5MDFGXHU3Mzg3XHU0RThDXHU1MzQxXHU1MjMwXHU1NkRCXHU1MzQxXHU1MDBEXHU0RThFdGVyc2VyXG4gICAgLy8gXHU2RDg4XHU5NjY0XHU2MjUzXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3NTAwa2JcdThCNjZcdTU0NEFcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6ZmFsc2UsLy9cdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHUzMDAyXHU1MzhCXHU3RjI5XHU1OTI3XHU1NzhCXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1M0VGXHU4MEZEXHU0RjFBXHU1Rjg4XHU2MTYyXHVGRjBDXHU1NkUwXHU2QjY0XHU3OTgxXHU3NTI4XHU4QkU1XHU1MjlGXHU4MEZEXHU1M0VGXHU4MEZEXHU0RjFBXHU2M0QwXHU5QUQ4XHU1OTI3XHU1NzhCXHU5ODc5XHU3NkVFXHU3Njg0XHU2Nzg0XHU1RUZBXHU2MDI3XHU4MEZEXHUzMDAyXG4gICAgLy8gXHU1MjREXHU2M0QwXHU1NzI4XHU0RThFbWluaWZ5XHU4QkJFXHU3RjZFXHU0RTNBdGVyc2VyLFx1NTcyOFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NzlGQlx1OTY2NGNvbnNvbGUubG9nXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NjI1M1x1NTMwNVx1NTIzMGRpc3RcdTRFMEJcdTc2ODRcdTRFMERcdTU0MENcdTc2RUVcdTVGNTVcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdRLFNBQVMsb0JBQW9CO0FBQzdSLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyw0QkFBNEIsK0JBQStCO0FBQ3BFLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMscUJBQXFCLHNCQUFzQiwwQkFBeUIsdUJBQXdCO0FBRXJHLFNBQVMsUUFBUSwwQkFBMEI7QUFDM0MsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFkakIsSUFBTSxtQ0FBbUM7QUFpQnpDLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUEsRUFFMUIsTUFB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
