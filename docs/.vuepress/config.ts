import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  lang: 'zh-CN',
  title: '拔土豆的程序员',
  description: '不知道咋说，随便写写吧。',
  // markdown设置
  markdown:{
    lineNumbers: true, // 代码块行号
  },
  theme : defaultTheme( {
    logo: '/images/logo.png',
    // 添加导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],
  }),
  plugins: [
    docsearchPlugin({
      // 配置项
    }),
  ],
}