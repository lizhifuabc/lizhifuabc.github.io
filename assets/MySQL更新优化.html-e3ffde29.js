import{_ as s,o as n,c as a,e}from"./app-def54fd2.js";const p="/assets/image-20230915123507175-a860323d.png",o={},t=e(`<h1 id="mysql更新优化" tabindex="-1"><a class="header-anchor" href="#mysql更新优化" aria-hidden="true">#</a> MySQL更新优化</h1><p>以库存更新为例：</p><p>流程1：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 开始事务</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程2：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 开始事务</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><ol><li>查询都是在事务内：重试机制，version 等等原因，一般放在事务内进行。</li><li>先插入再更新</li><li>先更新再插入</li></ol><p>结论：先插入再更新，TPS 比第二种高得多。</p><h3 id="锁的角度" tabindex="-1"><a class="header-anchor" href="#锁的角度" aria-hidden="true">#</a> 锁的角度</h3><ol><li>update 命令会施加一个 X 型记录锁，X 型记录锁是写互斥的。如果 A 事务对 goods 表中 id = 1 的记录行加了记录锁，B 事务想要对这行记录加记录锁就会被阻塞。</li><li>insert 命令会施加一个插入意向锁，但插入意向锁是互相兼容的。如果 A 事务向 order 表 insert 一条记录，不会影响 B 事务 insert 一条记录。</li><li><strong>记录锁要等到事务提交之后才会释放</strong></li></ol><p><img src="`+p+'" alt="image-20230915123507175"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>在编写一个事务的时候，加行锁的操作应在不影响业务的情况下，尽可能地靠近 commit 语句，因为这样有助于最小化行锁的持有时间，从而提高事务的吞吐量（通常以TPS（每秒事务数）衡量）。</p><p>这是因为行锁在被获取后，会阻止其他事务访问被锁定的行，因此锁的持有时间越短，允许更多的并发操作。</p>',15),l=[t];function c(i,r){return n(),a("div",null,l)}const k=s(o,[["render",c],["__file","MySQL更新优化.html.vue"]]);export{k as default};
