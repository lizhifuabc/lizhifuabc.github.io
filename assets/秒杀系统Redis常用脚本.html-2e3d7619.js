import{_ as e,o as i,c as l,e as d}from"./app-def54fd2.js";const s={},a=d(`<h1 id="秒杀系统redis常用脚本" tabindex="-1"><a class="header-anchor" href="#秒杀系统redis常用脚本" aria-hidden="true">#</a> 秒杀系统Redis常用脚本</h1><p>以下通过 Lua 语言实现原子性操作，并且能够提高系统的性能和稳定性。</p><ol><li>初始化商品库存（String）</li></ol><p>Redis SET 命令用于设置给定 key 的值。如果 key 已经存储其他值， SET 就覆写旧值，且无视类型。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- KEYS[1] 商品的 ID
-- KEYS[2] 商品的库存数量

redis.call(&quot;set&quot;, KEYS[1], ARGV[1])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>扣减商品库存</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if redis.call(&quot;decrby&quot;, KEYS[1], ARGV[1]) &gt;= 0 then
    return 1
else
    redis.call(&quot;incrby&quot;, KEYS[1], ARGV[1])
    return 0
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个脚本用于扣减某个商品的库存数量。KEYS[1] 表示商品的 ID，ARGV[1] 表示要扣减的库存数量。如果扣减后的库存数量仍然大于等于 0，则返回 1 表示扣减成功；否则，将库存数量恢复到扣减前的数量，并返回 0 表示扣减失败。</p><ol start="3"><li>查询商品库存</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return redis.call(&quot;get&quot;, KEYS[1])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个脚本用于查询某个商品的库存数量。KEYS[1] 表示商品的 ID。</p><ol start="4"><li>将用户加入秒杀队列</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis.call(&quot;lpush&quot;, KEYS[1], ARGV[1])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个脚本用于将用户加入秒杀队列。KEYS[1] 表示秒杀队列的名称，ARGV[1] 表示要加入队列的用户 ID。</p><ol start="5"><li>从秒杀队列中弹出用户</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return redis.call(&quot;rpop&quot;, KEYS[1])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个脚本用于从秒杀队列中弹出一个用户。KEYS[1] 表示秒杀队列的名称。</p>`,17),n=[a];function t(r,c){return i(),l("div",null,n)}const o=e(s,[["render",t],["__file","秒杀系统Redis常用脚本.html.vue"]]);export{o as default};
