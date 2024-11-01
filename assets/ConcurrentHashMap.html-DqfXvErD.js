import{_ as a,o as n,c as s,a as e}from"./app-oJgUVX7T.js";const t={},c=e(`<h1 id="concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap"><span>ConcurrentHashMap</span></a></h1><h2 id="复合操作的原子性" tabindex="-1"><a class="header-anchor" href="#复合操作的原子性"><span>复合操作的原子性</span></a></h2><p>推荐使用<code>putIfAbsent</code>、<code>compute</code>、<code>computeIfAbsent</code> 、<code>computeIfPresent</code>、<code>merge</code>等原子操作，保证复合操作。</p><p>基本操作(如<code>put</code>、<code>get</code>、<code>remove</code>、<code>containsKey</code>等)组成的操作，例如先判断某个键是否存在<code>containsKey(key)</code>，然后根据结果进行插入或更新<code>put(key, value)</code>。这种操作在执行过程中可能会被其他线程打断，导致结果不符合预期。</p><h2 id="key-和-value-不能为-null" tabindex="-1"><a class="header-anchor" href="#key-和-value-不能为-null"><span>key 和 value 不能为 null</span></a></h2><p>避免歧义，如果可以为 null：</p><ul><li>键或值本身就是 null</li><li>不存在对应的键而返回 null</li></ul><p>同理,containsKey() 也无法判断是键不存在还是键就是 null。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 此时可以通过使用一个特殊的静态空对象来代替 null</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token constant">NULL</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对比-hashmap" tabindex="-1"><a class="header-anchor" href="#对比-hashmap"><span>对比 HashMap</span></a></h3><p><code>HashMap</code> 可以存储 null 的 key 和 value，但 null 作为键只能有一个，null 作为值可以有多个。如果传入 null 作为参数，就会返回 hash 值为 0 的位置的值。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// HashMap 源码</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">int</span> h<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>h <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单线程环境下，可以通过 <code>contains(key)</code>来做判断是否存在这个键值对，不会存在歧义。多线程下无法正确判定键值对是否存在（存在其他线程修改的情况）。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p><code>ConcurrentHashMap</code> 是线程安全的，可以保证多个线程同时对它进行读写操作时，不会出现数据不一致的情况，此时如果key 和 value 为 null 的情况下无法容忍歧义。</p><blockquote><p>https://juejin.cn/post/7272199653340659752?utm_source=gold_browser_extension#comment</p></blockquote>`,16),o=[c];function p(l,u){return n(),s("div",null,o)}const r=a(t,[["render",p],["__file","ConcurrentHashMap.html.vue"]]),d=JSON.parse('{"path":"/java/concurrent/ConcurrentHashMap.html","title":"ConcurrentHashMap","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"复合操作的原子性","slug":"复合操作的原子性","link":"#复合操作的原子性","children":[]},{"level":2,"title":"key 和 value 不能为 null","slug":"key-和-value-不能为-null","link":"#key-和-value-不能为-null","children":[{"level":3,"title":"对比 HashMap","slug":"对比-hashmap","link":"#对比-hashmap","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]}],"git":{"updatedTime":1694156727000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":2}]},"filePathRelative":"java/concurrent/ConcurrentHashMap.md"}');export{r as comp,d as data};
