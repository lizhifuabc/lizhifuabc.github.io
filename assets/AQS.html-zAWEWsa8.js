import{_ as n,o as s,c as a,a as e}from"./app-oJgUVX7T.js";const i={},c=e(`<h1 id="aqs" tabindex="-1"><a class="header-anchor" href="#aqs"><span>AQS</span></a></h1><p>AQS 是整个Java JUC的核心。</p><h2 id="lock锁接口" tabindex="-1"><a class="header-anchor" href="#lock锁接口"><span>Lock锁接口</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 获取锁：
 *     如果当前锁资源空闲可用则获取锁资源返回，
 *     如果不可用则阻塞等待，不断竞争锁资源，直至获取到锁返回。
 */</span>
<span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 释放锁：
 *     当前线程执行完成业务后将锁资源的状态由占用改为可用并通知阻塞线程。
 */</span>
<span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 获取锁：(与lock方法不同的在于可响应中断操作，即在获取锁过程中可中断)
 *     如果当前锁资源可用则获取锁返回。
 *     如果当前锁资源不可用则阻塞直至出现如下两种情况：
 *        1.当前线程获取到锁资源。
 *        2.接收到中断命令，当前线程中断获取锁操作。
 */</span>
<span class="token keyword">void</span> <span class="token function">lockInterruptibly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 非阻塞式获取锁：
 *    尝试非阻塞式获取锁，调用该方法获取锁立即返回获取结果。
 *    如果获取到了锁则返回true，反之返回flase。
 */</span>
<span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 非阻塞式获取锁：
 *   根据传入的时间获取锁，如果线程在该时间段内未获取到锁返回flase。
 *   如果当前线程在该时间段内获取到了锁并未被中断则返回true。
 */</span>
<span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
 * 获取等待通知组件（该组件与当前锁资源绑定）：
 *    当前线程只有获取到了锁资源之后才能调用该组件的wait()方法，
 *    当前线程调用await()方法后，当前线程将会释放锁。
 */</span>
<span class="token class-name">Condition</span> <span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比synchronized：</p><ul><li>获取锁中断操作(synchronized关键字是不支持获取锁中断的)；</li><li>非阻塞式获取锁机制；</li><li>超时中断获取锁机制；</li><li>多条件等待唤醒机制Condition等。</li></ul>`,6),l=[c];function t(o,d){return s(),a("div",null,l)}const u=n(i,[["render",t],["__file","AQS.html.vue"]]),v=JSON.parse('{"path":"/java/concurrent/AQS.html","title":"AQS","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Lock锁接口","slug":"lock锁接口","link":"#lock锁接口","children":[]}],"git":{"updatedTime":1694156727000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"java/concurrent/AQS.md"}');export{u as comp,v as data};
