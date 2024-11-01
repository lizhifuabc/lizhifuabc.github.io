import{_ as a,o as s,c as n,a as e}from"./app-oJgUVX7T.js";const t="/assets/image-20230909104454690-BwWe20nw.png",p={},o=e(`<h1 id="hashmap的hash值计算" tabindex="-1"><a class="header-anchor" href="#hashmap的hash值计算"><span>HashMap的hash值计算</span></a></h1><ol><li>原 hash 右移 16 位</li><li>和原哈希值做异或运算，混合了原哈希值中的高位和低位，增大了<strong>随机性</strong></li><li>和数组长度做 &amp; 与运算获取数组下标</li></ol><p>HashMap 中的 hash()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> h<span class="token punctuation">;</span>
    <span class="token comment">// 如果key为null，返回0</span>
    <span class="token comment">// hashCode的高16位异或低16位得到哈希值</span>
    <span class="token comment">// 主要从性能、哈希碰撞角度考虑，减少系统开销，不会造成因为高位没有参与下标计算从而引起的碰撞。</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>h <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Object 中的 hashCode()，取值范围为 -2^31——2^31-1,即-2147483648——2147483647</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>HashMap 中使用 key 的 hash 值作为数组下标，所以不能直接使用原生的 hashCode()，需要与数组长度进行<strong>取模运算</strong>得到一个数组下标。</p><p><img src="`+t+'" alt="image-20230909104454690"></p><h2 id="扰动函数" tabindex="-1"><a class="header-anchor" href="#扰动函数"><span>扰动函数</span></a></h2><p>HashMap 中的扰动函数主要起到“扰动哈希”的作用,通过简单的位运算,增强 hash 的随机性,提高Hash表的性能。</p><p><code>hashCode</code>是一个int类型值，可以直接作为数组下标，并且不会出现碰撞，但是 int 的取值范围是[-2147483648, 2147483647]，无法直接作为数组的下标。</p><p>所以此时使用扰动函数增加随机性，让数据元素更加均衡的散列，减少碰撞。</p>',12),c=[o];function l(i,h){return s(),n("div",null,c)}const d=a(p,[["render",l],["__file","HashMap的hash值计算.html.vue"]]),u=JSON.parse('{"path":"/java/base/HashMap%E7%9A%84hash%E5%80%BC%E8%AE%A1%E7%AE%97.html","title":"HashMap的hash值计算","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"扰动函数","slug":"扰动函数","link":"#扰动函数","children":[]}],"git":{"updatedTime":1694847225000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":2}]},"filePathRelative":"java/base/HashMap的hash值计算.md"}');export{d as comp,u as data};
