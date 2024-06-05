import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 压缩
    minify: 'esbuild',
    outDir: 'outPut',
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    lib: {
      entry: './src/main.ts',
      name: 'MusicVideoPlugins',
      fileName: 'MusicVideoPlugins'
    },
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     const arr = id.toString().split('node_modules/')[1].split('/')
        //     switch (arr[0]) {
        //       case 'axios':
        //       case 'cheerio':
        //       case 'crypto-js':
        //       case 'dayjs':
        //       case 'webdav':
        //         return arr[0]
        //       default:
        //         return '__vendor'
        //     }
        //   }
        // },
        // chunkFilename: `js/[name].${conf.version}.js`
        entryFileNames: 'js/[name].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[ext]'
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: 'Vue'
        // }
      }
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
    },
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, // 打包时删除console
        drop_debugger: true, // 打包时删除 debugger
        pure_funcs: ['console.log']
      },
      output: {
        // 去掉注释内容
        comments: true
      }
    }
  }
})
