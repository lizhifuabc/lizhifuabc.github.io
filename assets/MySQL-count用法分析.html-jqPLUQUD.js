import{_ as n,o as a,c as s,a as t}from"./app-oJgUVX7T.js";const e={},o=t(`<h1 id="mysql-count用法分析" tabindex="-1"><a class="header-anchor" href="#mysql-count用法分析"><span>MySQL count用法分析</span></a></h1><ul><li>count(*)：所有列，相当于行数，不会忽略列值为 NULL。</li><li>count(1)：忽略所有列，用 1 代表代码行，每行固定值1，也是行数加1；不会忽略列值为 NULL</li><li>count(列名)：只包括列名那一列，忽略列值为空（NULL）的计数。</li></ul><p>执行速度：count(*) ≈ count(1) &gt; count(id) &gt; count(普通索引列) &gt; count(未加索引列)</p><ul><li>count(主键) &gt; count(1)</li><li>count(1) &gt; count(非主键)</li><li>如果表多个列并且没有主键， count(1) &gt; count(*)</li><li>如果有主键，则 select count（主键）的执行效率是最优的</li><li>如果表只有一个字段，则 select count 最优。</li></ul><p>总结：不要使用 count(列名) 或 count(常量) 来替代 count(*) 。是 SQL92 定义的标准统计行 数的语法，跟数据库无关，跟 NULL 和非 NULL 无关。</p><h2 id="延伸" tabindex="-1"><a class="header-anchor" href="#延伸"><span>延伸</span></a></h2><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token number">1</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">WHERE</span> a <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">AND</span> b <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">LIMIT</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Integer</span> exist <span class="token operator">=</span> xxDao<span class="token punctuation">.</span><span class="token function">existXxxxByXxx</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> exist <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 存在</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不存在</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[o];function l(p,i){return a(),s("div",null,c)}const r=n(e,[["render",l],["__file","MySQL-count用法分析.html.vue"]]),d=JSON.parse('{"path":"/database/mysql/MySQL-count%E7%94%A8%E6%B3%95%E5%88%86%E6%9E%90.html","title":"MySQL count用法分析","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"延伸","slug":"延伸","link":"#延伸","children":[]}],"git":{"updatedTime":1694763025000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/mysql/MySQL-count用法分析.md"}');export{r as comp,d as data};
