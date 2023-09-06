import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

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
      { text: 'java',
        children: [
          {text: 'Java并发编程',link:'/java/concurrent/'},
          {text: 'JVM',link:'/java/jvm/'},
          {text: '开源框架',link:'/java/opensource/'},
        ],
      },
      { text: '架构',
        children: [
          {text: '分布式系统设计',link:'/design/distributed/'},
          {text: '设计模式',link:'/design/designpatterns/'},
          {text: '业务功能设计',link:'/design/business/'},
        ],
      },
      { text: '数据库',
        children: [
          {text: 'MYSQL',link:'/database/mysql/'},
          {text: 'Redis',link:'/database/redis/'},
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
          {text: 'Maven',link:'/tools/maven/'},
          {text: 'Git',link:'/tools/git/'},
          {text: 'IntelliJ IDEA',link:'/tools/idea/'},
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
}