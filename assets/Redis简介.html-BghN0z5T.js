import{_ as s,o as e,c as i,a as n}from"./app-oJgUVX7T.js";const a="/assets/image-20230910170237610-CwU2TJnE.png",r={},l=n(`<h1 id="redis简介" tabindex="-1"><a class="header-anchor" href="#redis简介"><span>Redis简介</span></a></h1><p>Redis 全称 Remote Dictionary Server，可以理解为<strong>远程数据服务</strong>或<strong>远程字典服务</strong>，它是一个基于内存实现的键值型（key-value）非关系（NoSQL）数据库，使用 C 语言编写。</p><p>Redis 是完全开源的，遵守 BSD 协议。</p><p>应用场景：</p><p>缓存，数据库，消息队列，分布式锁，点赞列表，排行榜等等</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 搜索
brew search redis
-- 安装/更新
brew <span class="token function">install</span> redis
-- 启动
redis-server
-- 另起窗口
redis-cli
-- 更新
brew upgrade redis

brew <span class="token function">link</span> <span class="token parameter variable">--overwrite</span> redis
redis-server <span class="token parameter variable">-v</span>     // 查看是否更新到最新版本
-- 安装目录/usr/local/Cellar/redis/6.2.6 /usr/local/opt/redis@6.2/bin
-- 配置文件目录 /usr/local/etc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h2><p><strong>五种基本数据类型:</strong></p><ul><li><strong>1.string</strong>:字符串类型，常被用来存储计数器，粉丝数等，简单的分布式锁也会用到该类型</li><li><strong>2.hashmap</strong>:key - value 形式的，value 是一个map</li><li><strong>3.list</strong>:基本的数据类型，列表。在 Redis 中可以把 list 用作栈、队列、阻塞队列。</li><li><strong>4.set</strong>:集合，不能有重复元素，可以做点赞，收藏等</li><li><strong>5.zset</strong>:有序集合，不能有重复元素，有序集合中的每个元素都需要指定一个分数，根据分数对元素进行升序排序。可以做排行榜</li></ul><p><strong>三种特殊数据类型:</strong></p><ul><li><strong>1.geospatial</strong>: Redis 在 3.2 推出 Geo 类型，该功能<strong>可以推算出地理位置信息，两地之间的距离</strong>。</li><li><strong>2.hyperloglog</strong>:基数：数学上集合的元素个数，是不能重复的。这个数据结构<strong>常用于统计网站的 UV</strong>。</li><li><strong>3.bitmap</strong>: bitmap 就是通过最小的单位 bit 来进行0或者1的设置，表示某个元素对应的值或者状态。一个 bit 的值，或者是0，或者是1；也就是说一个 bit 能存储的最多信息是2。bitmap <strong>常用于统计用户信息比如活跃粉丝和不活跃粉丝、登录和未登录、是否打卡等</strong>。</li></ul><p><img src="`+a+'" alt="image-20230910170237610"></p>',13),t=[l];function d(o,c){return e(),i("div",null,t)}const v=s(r,[["render",d],["__file","Redis简介.html.vue"]]),g=JSON.parse('{"path":"/database/nosql/Redis%E7%AE%80%E4%BB%8B.html","title":"Redis简介","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"数据类型","slug":"数据类型","link":"#数据类型","children":[]}],"git":{"updatedTime":1694337389000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/nosql/Redis简介.md"}');export{v as comp,g as data};
