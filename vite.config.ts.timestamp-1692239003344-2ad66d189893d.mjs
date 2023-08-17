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
import { createStyleImportPlugin, AndDesignVueResolve } from "file:///D:/2023-project/mes-demo/node_modules/vite-plugin-style-import/dist/index.mjs";
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
        },
        // 自定义工具组件加载
        {
          "/src/utils/tools": [
            "getPagination",
            "loadInfo",
            "loadJSONInfo",
            "toRawMeta",
            "toNodeMeta",
            "getPrvNodes",
            "treeFindPath",
            "checkCharEmpty"
          ]
        }
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
          {
            scopeName: "theme-default",
            // 主题名称
            path: path.resolve("src/assets/styles/themes/default.less")
            // 主题文件地址
          }
        ],
        defaultScopeName: "theme-default"
        // 默认主题
      }
    }),
    themePreprocessorHmrPlugin(),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
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
    }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwyMDIzLXByb2plY3RcXFxcbWVzLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDIwMjMtcHJvamVjdFxcXFxtZXMtZGVtb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMjAyMy1wcm9qZWN0L21lcy1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCBEZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJztcbmltcG9ydCB7IHRoZW1lUHJlcHJvY2Vzc29ySG1yUGx1Z2luLCB0aGVtZVByZXByb2Nlc3NvclBsdWdpbiB9IGZyb20gJ0B6b3VndC92aXRlLXBsdWdpbi10aGVtZS1wcmVwcm9jZXNzb3InO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyLCBBbnREZXNpZ25WdWVSZXNvbHZlciwgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyLCBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiwgQW5kRGVzaWduVnVlUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5pbXBvcnQgeyBxdWFzYXIsIHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gJ0BxdWFzYXIvdml0ZS1wbHVnaW4nXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBcdTc1MjhcdTRFOEVjZG5cdTk3NTlcdTYwMDFcdTkwRThcdTdGNzJcdUZGMENcbiAgYmFzZTogJy8nLFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiBmYWxzZSwvL1x1NTQyRlx1NTJBOFx1OTg3OVx1NzZFRVx1NTQwRVx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxuICAgIHBvcnQ6IDUxMjAsIC8vXHU3QUVGXHU1M0UzXHU5MTREXHU3RjZFXG4gICAgaG1yOiB0cnVlLCAvL1x1NUYwMFx1NTQyRlx1NzBFRFx1NTJBMFx1OEY3RFxuICAgIHByb3h5OiB7fSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBcdTYyOEEgQCBcdTYzMDdcdTU0MTFcdTUyMzAgc3JjIFx1NzZFRVx1NUY1NVx1NTNCQlxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAvLyBcdTYyOEEgQGFzc2V0cyBcdTYzMDdcdTU0MTFcdTUyMzAgc3JjL2Fzc2V0cyBcdTc2RUVcdTVGNTVcdTUzQkJcbiAgICAgICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMnKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKHsgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0gfSksXG4gICAgcXVhc2FyKHtcbiAgICAgIHNhc3NWYXJpYWJsZXM6ICdzcmMvcXVhc2FyLXZhcmlhYmxlcy5zYXNzJ1xuICAgIH0pLFxuICAgIHZ1ZUpzeCgpLFxuICAgIERlZmluZU9wdGlvbnMoKSxcbiAgICBQYWdlcyh7XG4gICAgICBkaXJzOiBbeyBkaXI6ICdzcmMvdmlld3MnLCBiYXNlUm91dGU6ICcvJyB9XSxcbiAgICAgIC8vXHU1RjAyXHU2QjY1XHUyRjQ1XHU1RjBGXHU1MkEwXHU4RjdEXHU4REVGXHU3NTMxXHU3RUM0XHU0RUY2XG4gICAgICBpbXBvcnRNb2RlOiAnYXN5bmMnLFxuICAgICAgLy9cdTkwNERcdTUzODZcdThERUZcdTc1MzFcdTRGRTFcdTYwNkZcdUZGMENcdTdFRDlcdTlFRDhcdThCQTRcdThERUZcdTc1MzFcdTUyQTBcdTJGMDBcdTRFMkFyZWRpcmVjdFxuICAgICAgZXh0ZW5kUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHJvdXRlLnBhdGggPT09ICcvJykgcmV0dXJuIHsgLi4ucm91dGUsIHJlZGlyZWN0OiAnL2xvZ2luJyB9O1xuICAgICAgICAvLyBpZiAocm91dGUucGF0aCA9PT0gJy9sb2dpbicpIHJldHVybiB7IC4uLnJvdXRlLCByZWRpcmVjdDogJy9sb2dpbicgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBkdHM6ICcuL3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICB7XG4gICAgICAgICAgJ25haXZlLXVpJzogW1xuICAgICAgICAgICAgJ3VzZURpYWxvZycsXG4gICAgICAgICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgICAndXNlTm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd1c2VMb2FkaW5nQmFyJ1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU1REU1XHU1MTc3XHU3RUM0XHU0RUY2XHU1MkEwXHU4RjdEXG4gICAgICAgIHtcbiAgICAgICAgICAnL3NyYy91dGlscy90b29scyc6IFtcbiAgICAgICAgICAgICdnZXRQYWdpbmF0aW9uJyxcbiAgICAgICAgICAgICdsb2FkSW5mbycsXG4gICAgICAgICAgICAnbG9hZEpTT05JbmZvJyxcbiAgICAgICAgICAgICd0b1Jhd01ldGEnLFxuICAgICAgICAgICAgJ3RvTm9kZU1ldGEnLFxuICAgICAgICAgICAgJ2dldFBydk5vZGVzJyxcbiAgICAgICAgICAgICd0cmVlRmluZFBhdGgnLFxuICAgICAgICAgICAgJ2NoZWNrQ2hhckVtcHR5JyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIERlZmF1bHQgYGZhbHNlYFxuICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLCAvLyBEZWZhdWx0IGAuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uYFxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxuICAgICAgfSxcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6ICcuL3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgLy9cdTU3MjhcdTZCNjRcdTUyMTdcdTg4NjhcdTRFMkRcdTc2ODRcdTdFQzRcdTRFRjZcdTRFNUZcdTRGMUFcdTYzMDlcdTk3MDBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU0OENcdTZDRThcdTUxOENcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cyddLFxuICAgICAgLy9leHRlbnNpb25zOiBbJ3Z1ZScsICdqcyddLFxuICAgICAgLy8gaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS9dLFxuICAgICAgLy9cdTZCNjRVSVx1NUU5M1x1NzY4NFx1N0VDNFx1NEVGNlx1NEU1Rlx1NEYxQVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTQ4Q1x1NkNFOFx1NTE4Q1x1RkYwOGVsZW1lbnQtdWlcdTVCRjlcdTVFOTRFbGVtZW50VWlSZXNvbHZlclx1RkYwQ05haXZlIFVJXHU1QkY5XHU1RTk0TmFpdmVVaVJlc29sdmVyXHVGRjBDdmFudFx1NUJGOVx1NUU5NFZhbnRSZXNvbHZlclx1RkYwQ2l2aWV3XHU1QkY5XHU1RTk0Vmlld1VpUmVzb2x2ZXJcdTdCNDlcdTdCNDlcdUZGMDlcbiAgICAgIC8vXHU5MTREXHU3RjZFXHU0RTRCXHU1NDBFXHVGRjBDXHU2NUUwXHU5NzAwXHU1NzI4IG1haW4uanMgXHU1RjE1XHU1MTY1XHU0RTg2LFx1NjBGM1x1ODk4MVx1NEY3Rlx1NzUyOFx1NTRFQVx1NEUyQVx1N0VDNFx1NEVGNlx1RkYwQ1x1NTNFRlx1NzZGNFx1NjNBNVx1NTcyOCB0ZW1wbGF0ZSBcdTRFMkRcdTVGMTVcdTUxNjVcbiAgICAgIC8vIEFudERlc2lnblZ1ZSBcdTc1MjhsZXNzIFx1NUYwMFx1NTNEMVx1NjMwN1x1NUI5QVx1NTJBMFx1OEY3RGxlc3MgXHU0RkJGXHU0RThFXHU0RTNCXHU5ODk4XHU0RkVFXHU2NTM5XG4gICAgICByZXNvbHZlcnM6IFtBbnREZXNpZ25WdWVSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnbGVzcycgfSksIFZ1ZVVzZUNvbXBvbmVudHNSZXNvbHZlcigpLCBJY29uc1Jlc29sdmVyKCksIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSwgTmFpdmVVaVJlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIHRoZW1lUHJlcHJvY2Vzc29yUGx1Z2luKHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgYXJiaXRyYXJ5TW9kZTogZmFsc2UsXG4gICAgICAgIGV4dHJhY3Q6IHRydWUsXG4gICAgICAgIC8vIFx1NTQwNFx1NEUyQVx1NEUzQlx1OTg5OFx1NjU4N1x1NEVGNlx1NzY4NFx1NEY0RFx1N0Y2RVxuICAgICAgICBtdWx0aXBsZVNjb3BlVmFyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjb3BlTmFtZTogJ3RoZW1lLWRlZmF1bHQnLCAvLyBcdTRFM0JcdTk4OThcdTU0MERcdTc5RjBcbiAgICAgICAgICAgIHBhdGg6IHBhdGgucmVzb2x2ZSgnc3JjL2Fzc2V0cy9zdHlsZXMvdGhlbWVzL2RlZmF1bHQubGVzcycpLCAvLyBcdTRFM0JcdTk4OThcdTY1ODdcdTRFRjZcdTU3MzBcdTU3NDBcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBkZWZhdWx0U2NvcGVOYW1lOiAndGhlbWUtZGVmYXVsdCcsIC8vIFx1OUVEOFx1OEJBNFx1NEUzQlx1OTg5OFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0aGVtZVByZXByb2Nlc3NvckhtclBsdWdpbigpLFxuICAgIGNyZWF0ZVN0eWxlSW1wb3J0UGx1Z2luKHtcbiAgICAgIHJlc29sdmVzOiBbQW5kRGVzaWduVnVlUmVzb2x2ZSgpXSxcbiAgICAgIC8vIGxpYnM6IFtcbiAgICAgIC8vICAgLy8gXHU1OTgyXHU2NzlDXHU2Q0ExXHU2NzA5XHU0RjYwXHU5NzAwXHU4OTgxXHU3Njg0cmVzb2x2ZVx1RkYwQ1x1NTNFRlx1NEVFNVx1NTcyOGxpYlx1NTE4NVx1NzZGNFx1NjNBNVx1NTE5OVx1RkYwQ1x1NEU1Rlx1NTNFRlx1NEVFNVx1N0VEOVx1NjIxMVx1NEVFQ1x1NjNEMFx1NEY5QlBSXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBsaWJyYXJ5TmFtZTogJ2FudC1kZXNpZ24tdnVlJyxcbiAgICAgIC8vICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgICAgIC8vICAgICByZXNvbHZlU3R5bGU6IG5hbWUgPT4ge1xuICAgICAgLy8gICAgICAgcmV0dXJuIGBhbnQtZGVzaWduLXZ1ZS9lcy8ke25hbWV9L3N0eWxlL2luZGV4YDtcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gXSxcbiAgICB9KSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICAgIEljb25zKHtcbiAgICAgIC8vXHU1MkEwXHU4RjdEaWNvbnMgXHU0RjdGXHU3NTI4aWNvbmVzXHU1NkZFXHU2ODA3XHU1RTkzaWNvbmVzLm5ldGxpZnkuYXBwXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgLy8gXHU2MzkyXHU5NjY0IGJyb3dzZXItdXRpbHMuanMgXHU1NzI4dml0ZVx1NzY4NFx1N0YxM1x1NUI1OFx1NEY5RFx1OEQ1Nlx1RkYwQ1x1NUJGOVx1NUU5NCBpbXBvcnQgeyB0b2dnbGVUaGVtZSB9IGZyb20gXCJAem91Z3Qvdml0ZS1wbHVnaW4tdGhlbWUtcHJlcHJvY2Vzc29yL2Rpc3QvYnJvd3Nlci11dGlsc1wiIFx1NzY4NFx1OERFRlx1NUY4NFxuICAgIGV4Y2x1ZGU6IFsnQHpvdWd0L3ZpdGUtcGx1Z2luLXRoZW1lLXByZXByb2Nlc3Nvci9kaXN0L2Jyb3dzZXItdXRpbHMnXSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgLFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBsZXNzOiB7XG4gICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBbYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvZGVmYXVsdC5sZXNzXCI7YF0sXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBqc29uOiB7XG4gICAgbmFtZWRFeHBvcnRzOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTY1MkZcdTYzMDFcdTRFQ0UuanNvblx1NjU4N1x1NEVGNlx1NEUyRFx1OEZEQlx1ODg0Q1x1NjMwOVx1NTQwRFx1NUJGQ1x1NTE2NVxuICAgIHN0cmluZ2lmeTogZmFsc2UsIC8vICBcdTVGMDBcdTU0MkZcdTZCNjRcdTk4NzlcdUZGMENcdTVCRkNcdTUxNjVcdTc2ODQgSlNPTiBcdTRGMUFcdTg4QUJcdThGNkNcdTYzNjJcdTRFM0EgZXhwb3J0IGRlZmF1bHQgSlNPTi5wYXJzZShcIi4uLlwiKSBcdTRGMUFcdTc5ODFcdTc1MjhcdTYzMDlcdTU0MERcdTVCRkNcdTUxNjVcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1NkRGN1x1NkRDNlx1NTY2OFx1RkYwQ3RlcnNlclx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRixlc2J1bGlkXHU5MDFGXHU3Mzg3XHU0RThDXHU1MzQxXHU1MjMwXHU1NkRCXHU1MzQxXHU1MDBEXHU0RThFdGVyc2VyXG4gICAgLy8gXHU2RDg4XHU5NjY0XHU2MjUzXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3NTAwa2JcdThCNjZcdTU0NEFcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLC8vXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1MzAwMlx1NTM4Qlx1N0YyOVx1NTkyN1x1NTc4Qlx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTNFRlx1ODBGRFx1NEYxQVx1NUY4OFx1NjE2Mlx1RkYwQ1x1NTZFMFx1NkI2NFx1Nzk4MVx1NzUyOFx1OEJFNVx1NTI5Rlx1ODBGRFx1NTNFRlx1ODBGRFx1NEYxQVx1NjNEMFx1OUFEOFx1NTkyN1x1NTc4Qlx1OTg3OVx1NzZFRVx1NzY4NFx1Njc4NFx1NUVGQVx1NjAyN1x1ODBGRFx1MzAwMlxuICAgIC8vIFx1NTI0RFx1NjNEMFx1NTcyOFx1NEU4RW1pbmlmeVx1OEJCRVx1N0Y2RVx1NEUzQXRlcnNlcixcdTU3MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTc5RkJcdTk2NjRjb25zb2xlLmxvZ1xuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTYyNTNcdTUzMDVcdTUyMzBkaXN0XHU0RTBCXHU3Njg0XHU0RTBEXHU1NDBDXHU3NkVFXHU1RjU1XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUSxTQUFTLG9CQUFvQjtBQUM3UixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsNEJBQTRCLCtCQUErQjtBQUNwRSxTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHFCQUFxQixzQkFBc0IsMEJBQTBCLHVCQUF1QjtBQUNyRyxTQUFTLHlCQUF5QiwyQkFBMkI7QUFDN0QsU0FBUyxRQUFRLDBCQUEwQjtBQUMzQyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQWRqQixJQUFNLG1DQUFtQztBQWlCekMsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sS0FBSztBQUFBO0FBQUEsSUFDTCxPQUFPLENBQUM7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQTtBQUFBLE1BRWxDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUksRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUFBLElBQ3hDLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsTUFDSixNQUFNLENBQUMsRUFBRSxLQUFLLGFBQWEsV0FBVyxJQUFJLENBQUM7QUFBQTtBQUFBLE1BRTNDLFlBQVk7QUFBQTtBQUFBLE1BRVosWUFBWSxPQUFPO0FBQ2pCLFlBQUksTUFBTSxTQUFTO0FBQUssaUJBQU8sRUFBRSxHQUFHLE9BQU8sVUFBVSxTQUFTO0FBQUEsTUFFaEU7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0UsWUFBWTtBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBO0FBQUEsUUFFQTtBQUFBLFVBQ0Usb0JBQW9CO0FBQUEsWUFDbEI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUE7QUFBQSxRQUNULFVBQVU7QUFBQTtBQUFBLFFBQ1Ysa0JBQWtCO0FBQUE7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBO0FBQUEsTUFFTCxNQUFNLENBQUMsa0JBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTXpCLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLE9BQU8sQ0FBQyxHQUFHLHlCQUF5QixHQUFHLGNBQWMsR0FBRyxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLElBQ2xKLENBQUM7QUFBQSxJQUNELHdCQUF3QjtBQUFBLE1BQ3RCLE1BQU07QUFBQSxRQUNKLGVBQWU7QUFBQSxRQUNmLFNBQVM7QUFBQTtBQUFBLFFBRVQsbUJBQW1CO0FBQUEsVUFDakI7QUFBQSxZQUNFLFdBQVc7QUFBQTtBQUFBLFlBQ1gsTUFBTSxLQUFLLFFBQVEsdUNBQXVDO0FBQUE7QUFBQSxVQUM1RDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGtCQUFrQjtBQUFBO0FBQUEsTUFDcEI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELDJCQUEyQjtBQUFBLElBQzNCLHdCQUF3QjtBQUFBLE1BQ3RCLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFXbEMsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUE7QUFBQSxNQUVKLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUE7QUFBQSxJQUVaLFNBQVMsQ0FBQywwREFBMEQ7QUFBQSxFQUN0RTtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBO0FBQUEsUUFFSixtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsTUFBTTtBQUFBO0FBQUEsUUFFSixtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixjQUFjO0FBQUE7QUFBQSxJQUNkLFdBQVc7QUFBQTtBQUFBLEVBQ2I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQTtBQUFBO0FBQUEsSUFFUix1QkFBdUI7QUFBQSxJQUN2QixzQkFBc0I7QUFBQTtBQUFBO0FBQUEsSUFFdEIsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
