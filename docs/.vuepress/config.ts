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
      { text: 'java',
        children: [
          {text: 'Java并发编程',link:'/java/concurrent/'},
          {text: 'JVM',link:'/java/jvm/'},
        ],
      },
      { text: '架构',
        children: [
          {text: '分布式系统设计',link:'/design/distributed/'},
          {text: '设计模式',link:'/design/designpatterns/'},
        ],
      },
      { text: '数据库',
        children: [
          {text: 'MYSQL',link:'/database/mysql/'},
          {text: 'Redis',link:'/database/redis/'},
          {text: 'PostgreSQL',link:'/database/postgresql/'},
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
    docsearchPlugin({
      // 配置项
    }),
  ],
}