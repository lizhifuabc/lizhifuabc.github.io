import { defaultTheme } from '@vuepress/theme-default'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
  lang: 'zh-CN',
  title: '拔土豆的程序员',
  description: '没进过大厂|技术一般|创业被坑|普普通通程序员',
  // markdown设置
  markdown:{
    lineNumbers: true, // 代码块行号
  },
  bundler: viteBundler(),
  theme : defaultTheme({
    logo: '/images/logo.png',
    // 添加导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: 'java',
        children: [
          {text: 'Java基础',link:'/java/base/'},
          {text: 'Java并发编程',link:'/java/concurrent/'},
          {text: 'JVM',link:'/java/jvm/'},
          {text: '开源框架',link:'/java/opensource/'},
        ],
      },
      { text: '消息队列',
        children: [
          {text: 'RabbitMQ',link:'/mq/rabbitmq/'},
        ],
      },
      { text: '架构',
        children: [
          {text: 'OAuth',link:'/design/OAuth/'},
          {text: '分布式系统设计',link:'/design/distributed/'},
          {text: '设计模式',link:'/design/designpatterns/'},
          {text: '代码设计',link:'/design/codedesign/'},
          {text: '业务功能设计',link:'/design/business/'},
        ],
      },
      { text: '数据库|ORM框架',
        children: [
          {text: 'Mybatis',link:'/database/mybatis/'},
          {text: 'MySQL',link:'/database/mysql/'},
          {text: 'NoSQL',link:'/database/nosql/'},
          {text: 'PostgreSQL',link:'/database/postgresql/'},
        ],
      },
      { text: 'Spring',
        children: [
          {text: 'Spring',link:'/spring/spring/'},
          {text: 'SpringBoot',link:'/spring/springBoot/'},
          {text: 'SpringCloud',link:'/spring/springCloud/'},
        ],
      },
      { text: '支付系统', link: '/pay/' },
      { text: '工具集',
        children: [
          {text: 'Docker',link:'/tools/Docker/'},
          {text: 'Arthas',link:'/tools/arthas/'},
          {text: 'Mac软件',link:'/tools/mac/'},
          {text: 'Maven',link:'/tools/maven/'},
          {text: 'Git',link:'/tools/git/'},
          {text: 'IntelliJ IDEA',link:'/tools/idea/'},
          {text: '效率工具',link:'/tools/help/'},
        ],
      },
      { text: 'GitHub', link: 'https://github.com/lizhifuabc' },
    ],
  }),
  plugins: [
    backToTopPlugin(),
    docsearchPlugin({
      // 配置项
      apiKey: '6a798fcaf001bf89e511282c3e3ae7db',
      indexName: 'lizhifuabcio',
      appId: '78IVUHUF7Z',
    }),
  ],
})