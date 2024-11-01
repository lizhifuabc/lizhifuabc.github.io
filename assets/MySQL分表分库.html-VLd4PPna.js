import{_ as a,o as e,c as l,a as i}from"./app-oJgUVX7T.js";const s="/assets/image-20230905164333020-BSDAIsZ4.png",t="/assets/image-20230905164413270-B2UoSw01.png",n={},h=i('<h1 id="mysql分表分库" tabindex="-1"><a class="header-anchor" href="#mysql分表分库"><span>MySQL分表分库</span></a></h1><h2 id="水平切分" tabindex="-1"><a class="header-anchor" href="#水平切分"><span>水平切分</span></a></h2><p>水平切分又称为 Sharding，它是将同一个表中的记录拆分到多个结构相同的表中。</p><p>当一个表的数据不断增多时，Sharding 是必然的选择，它可以将数据分布到集群的不同节点上，从而缓存单个数据库的压力。</p><p><img src="'+s+'" alt="image-20230905164333020"></p><h2 id="垂直切分" tabindex="-1"><a class="header-anchor" href="#垂直切分"><span>垂直切分</span></a></h2><p>垂直切分是将一张表按列切分成多个表，通常是按照列的关系密集程度进行切分，也可以利用垂直切分将经常被使用的列和不经常被使用的列切分到不同的表中。</p><p><img src="'+t+'" alt="image-20230905164413270"></p><h2 id="拆分策略" tabindex="-1"><a class="header-anchor" href="#拆分策略"><span>拆分策略</span></a></h2><ul><li>哈希取模: hash(key) % NUM_DB</li><li>范围: 可以是 ID 范围也可以是时间范围</li><li>映射表: 使用单独的一个数据库来存储映射关系</li></ul><h2 id="问题及解决方案" tabindex="-1"><a class="header-anchor" href="#问题及解决方案"><span>问题及解决方案</span></a></h2><ol><li>事务问题</li></ol><p>使用分布式事务来解决，比如 XA 接口。</p><ol start="2"><li><p>join 可以将原来的 JOIN 分解成多个单表查询，然后在用户程序中进行 JOIN。</p></li><li><p>ID 唯一性</p></li></ol><ul><li>使用全局唯一 ID: GUID</li><li>为每个分片指定一个 ID 范围</li><li>分布式 ID 生成器 (如 Twitter 的 Snowflake 算法)</li></ul><blockquote><p>参考材料：</p><p>https://pdai.tech/md/db/sql-mysql/sql-mysql-devide.html</p></blockquote>',16),r=[h];function c(p,o){return e(),l("div",null,r)}const m=a(n,[["render",c],["__file","MySQL分表分库.html.vue"]]),_=JSON.parse('{"path":"/database/mysql/MySQL%E5%88%86%E8%A1%A8%E5%88%86%E5%BA%93.html","title":"MySQL分表分库","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"水平切分","slug":"水平切分","link":"#水平切分","children":[]},{"level":2,"title":"垂直切分","slug":"垂直切分","link":"#垂直切分","children":[]},{"level":2,"title":"拆分策略","slug":"拆分策略","link":"#拆分策略","children":[]},{"level":2,"title":"问题及解决方案","slug":"问题及解决方案","link":"#问题及解决方案","children":[]}],"git":{"updatedTime":1693904827000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/mysql/MySQL分表分库.md"}');export{m as comp,_ as data};
