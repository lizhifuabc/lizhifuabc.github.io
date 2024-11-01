import{_ as s,o as t,c as e,a as n}from"./app-oJgUVX7T.js";const o={},a=n('<h1 id="redisson看门狗" tabindex="-1"><a class="header-anchor" href="#redisson看门狗"><span>Redisson看门狗</span></a></h1><p><strong>1、互斥性；</strong></p><p>防止多个进程及线程并发访问共享资源，使得资源串行访问操作。</p><p><strong>2、设置锁过期时间；</strong></p><p>为了防止锁悬挂，因为服务宕机，锁不释放问题，其它请求就无法获取锁。</p><p><strong>3、自动续锁超时时间；</strong></p><p>防止业务超时，超过锁过期时间自动释放，打破互斥性。</p><p><strong>4、多条指令需要原子性；</strong></p><p>lua脚本实现多个指令的加锁、解锁及续锁的原子性。</p><p><strong>5、可重入性；</strong></p><p>使用线程ID信息来保证同一线程请求锁的可重入性。</p><p><strong>6、锁误删：自己把别人持有的锁删了；</strong></p><p>多个客户端释放锁，如何防止自己删别人的或者别人删自己申请的锁。</p><p>获取锁之前，生成全局唯一id，判断是否是自己的id来避免。</p><p><strong>7、锁等待：发布订阅机制通知等待锁的线程；</strong></p><h2 id="看门狗" tabindex="-1"><a class="header-anchor" href="#看门狗"><span>看门狗</span></a></h2><p>Redisson加锁的核心代码，本质也是通过redis的lua脚本；</p><p><strong>waitTime：等待时间</strong>；在锁状态变为可持有之前，等待的时间，如果在这个时间内，锁一直被其他客户端线程持有，则放弃等待，返回失败；</p><p><strong>leaseTime：持有时间</strong>；客户端获取到锁之后的最长持有时间，如果设置此参数为10秒，则10秒后，如果此客户端不释放锁，则有redis自行释放，以免造成死锁。</p><p><strong>lockWatchdogTimeout：看门狗时间</strong>；如果客户端不设定持有时间，则持有时间会被设置为看门狗时间，默认为30秒。</p>',20),r=[a];function p(i,d){return t(),e("div",null,r)}const l=s(o,[["render",p],["__file","Redisson看门狗.html.vue"]]),g=JSON.parse('{"path":"/database/nosql/Redisson%E7%9C%8B%E9%97%A8%E7%8B%97.html","title":"Redisson看门狗","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"看门狗","slug":"看门狗","link":"#看门狗","children":[]}],"git":{"updatedTime":1698818603000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/nosql/Redisson看门狗.md"}');export{l as comp,g as data};
