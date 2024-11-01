import{_ as s,o as n,c as a,a as e}from"./app-oJgUVX7T.js";const t="/assets/image-20230915123507175-CFpDxruh.png",p={},o=e(`<h1 id="mysql更新优化" tabindex="-1"><a class="header-anchor" href="#mysql更新优化"><span>MySQL更新优化</span></a></h1><p>以库存更新为例：</p><p>流程1：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token comment"># 开始事务</span>
<span class="token keyword">begin</span><span class="token punctuation">;</span>
<span class="token comment"># 先从数据库查询</span>
<span class="token keyword">select</span> stock <span class="token keyword">from</span> goods <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment"># 判断库存数量</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>stock <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> {
	  <span class="token comment"># 插入订单表</span>
    <span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">order</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token comment"># 更新库存</span>
    <span class="token keyword">update</span> goods <span class="token keyword">set</span> stock <span class="token operator">=</span> stock <span class="token operator">-</span> <span class="token number">1</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> stock <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
}

<span class="token keyword">if</span> <span class="token punctuation">(</span>updateCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> {
		<span class="token comment"># 提交事务</span>
    <span class="token keyword">commit</span><span class="token punctuation">;</span>
} <span class="token keyword">else</span> {
   <span class="token comment"># 回滚事务</span>
    <span class="token keyword">rollback</span><span class="token punctuation">;</span>
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程2：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token comment"># 开始事务</span>
<span class="token keyword">begin</span><span class="token punctuation">;</span>
<span class="token comment"># 先从数据库查询</span>
<span class="token keyword">select</span> stock <span class="token keyword">from</span> goods <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment"># 判断库存数量</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>stock <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> {
    <span class="token comment"># 更新库存</span>
    <span class="token keyword">update</span> goods <span class="token keyword">set</span> stock <span class="token operator">=</span> stock <span class="token operator">-</span> <span class="token number">1</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">and</span> stock <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment"># 插入订单表</span>
    <span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">order</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
}

<span class="token keyword">if</span> <span class="token punctuation">(</span>updateCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> {
	  <span class="token comment"># 提交事务</span>
    <span class="token keyword">commit</span><span class="token punctuation">;</span>
} <span class="token keyword">else</span> {
		<span class="token comment"># 回滚事务</span>
    <span class="token keyword">rollback</span><span class="token punctuation">;</span>
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析"><span>分析</span></a></h2><ol><li>查询都是在事务内：重试机制，version 等等原因，一般放在事务内进行。</li><li>先插入再更新</li><li>先更新再插入</li></ol><p>结论：先插入再更新，TPS 比第二种高得多。</p><h3 id="锁的角度" tabindex="-1"><a class="header-anchor" href="#锁的角度"><span>锁的角度</span></a></h3><ol><li>update 命令会施加一个 X 型记录锁，X 型记录锁是写互斥的。如果 A 事务对 goods 表中 id = 1 的记录行加了记录锁，B 事务想要对这行记录加记录锁就会被阻塞。</li><li>insert 命令会施加一个插入意向锁，但插入意向锁是互相兼容的。如果 A 事务向 order 表 insert 一条记录，不会影响 B 事务 insert 一条记录。</li><li><strong>记录锁要等到事务提交之后才会释放</strong></li></ol><p><img src="`+t+'" alt="image-20230915123507175"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>在编写一个事务的时候，加行锁的操作应在不影响业务的情况下，尽可能地靠近 commit 语句，因为这样有助于最小化行锁的持有时间，从而提高事务的吞吐量（通常以TPS（每秒事务数）衡量）。</p><p>这是因为行锁在被获取后，会阻止其他事务访问被锁定的行，因此锁的持有时间越短，允许更多的并发操作。</p>',15),l=[o];function c(i,r){return n(),a("div",null,l)}const k=s(p,[["render",c],["__file","MySQL更新优化.html.vue"]]),u=JSON.parse('{"path":"/database/mysql/MySQL%E6%9B%B4%E6%96%B0%E4%BC%98%E5%8C%96.html","title":"MySQL更新优化","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"锁的角度","slug":"锁的角度","link":"#锁的角度","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1694763025000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/mysql/MySQL更新优化.md"}');export{k as comp,u as data};
