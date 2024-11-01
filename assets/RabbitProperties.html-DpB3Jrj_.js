import{_ as n,o as s,c as a,a as e}from"./app-oJgUVX7T.js";const t={},c=e(`<h1 id="rabbitproperties" tabindex="-1"><a class="header-anchor" href="#rabbitproperties"><span>RabbitProperties</span></a></h1><p>spring RabbitMQ 配置类说明</p><h2 id="rabbitproperties-java" tabindex="-1"><a class="header-anchor" href="#rabbitproperties-java"><span>RabbitProperties.java</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * RabbitMQ 配置属性
 */</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;spring.rabbitmq&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitProperties</span> <span class="token punctuation">{</span>
    <span class="token comment">// RabbitMQ 地址列表</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> addresses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 连接 RabbitMQ 的用户名</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token comment">// 连接 RabbitMQ 的密码</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token comment">// 连接 RabbitMQ 的虚拟主机</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> virtualHost <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 请求心跳检测间隔</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> requestedHeartbeat<span class="token punctuation">;</span>

    <span class="token comment">// 连接超时时间</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> connectionTimeout<span class="token punctuation">;</span>

    <span class="token comment">// SSL 相关配置</span>
    <span class="token keyword">private</span> <span class="token class-name">Ssl</span> ssl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Ssl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 配置 AMQP 协议的参数</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Amqp</span> amqp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Amqp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 连接池相关参数</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Pool</span> pool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认 Exchange</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> exchange<span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认 Routing Key</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> routingKey<span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认队列名称</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> defaultRequeueRejected<span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认处理方式</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> publisherReturns<span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认处理方式</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> publisherConfirmType<span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ 消息的默认处理方式</span>
    <span class="token keyword">private</span> <span class="token class-name">Template</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Template</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 配置 RabbitMQ Channel 相关参数</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Channel</span> channel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取地址列表</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getAddresses</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>addresses<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置地址列表</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAddresses</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> addresses<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>addresses <span class="token operator">=</span> addresses<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取用户名</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>username<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置用户名</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取密码</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置密码</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token class-name">String</span> password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token operator">=</span> password<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取虚拟主机名称</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getVirtualHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>virtualHost<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置虚拟主机名称</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setVirtualHost</span><span class="token punctuation">(</span><span class="token class-name">String</span> virtualHost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>virtualHost <span class="token operator">=</span> virtualHost<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取请求心跳检测间隔</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getRequestedHeartbeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>requestedHeartbeat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置请求心跳检测间隔</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setRequestedHeartbeat</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> requestedHeartbeat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>requestedHeartbeat <span class="token operator">=</span> requestedHeartbeat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取连接超时时间</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getConnectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>connectionTimeout<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置连接超时时间</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setConnectionTimeout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> connectionTimeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>connectionTimeout <span class="token operator">=</span> connectionTimeout<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取 SSL 相关配置</span>
    <span class="token keyword">public</span> <span class="token class-name">Ssl</span> <span class="token function">getSsl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ssl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置 SSL 相关配置</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSsl</span><span class="token punctuation">(</span><span class="token class-name">Ssl</span> ssl<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ssl <span class="token operator">=</span> ssl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取 AMQP 相关配置</span>
    <span class="token keyword">public</span> <span class="token class-name">Amqp</span> <span class="token function">getAmqp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><p><code>RabbitProperties</code> 类是 Spring Boot 中用于配置 RabbitMQ 连接和消息传递的属性类。该类包含了 RabbitMQ 相关的所有属性，并提供了默认值和类型转换等功能。</p><p>下面是 <code>RabbitProperties</code> 类的主要属性及其中文解释：</p><ul><li><code>addresses</code>：RabbitMQ 服务器地址列表。</li><li><code>host</code>：RabbitMQ 服务器主机名，默认为 <code>localhost</code>。</li><li><code>port</code>：RabbitMQ 服务器端口号，默认为 <code>5672</code>。</li><li><code>username</code>：RabbitMQ 服务器用户名。</li><li><code>password</code>：RabbitMQ 服务器密码。</li><li><code>virtual-host</code>：RabbitMQ 虚拟主机名称，默认为 <code>/</code>。</li><li><code>ssl.enabled</code>：是否启用 SSL 安全连接。</li><li><code>ssl.key-store</code>：SSL 密钥库文件路径。</li><li><code>ssl.key-store-password</code>：SSL 密钥库密码。</li><li><code>ssl.key-store-type</code>：SSL 密钥库类型，默认为 <code>PKCS12</code>。</li><li><code>ssl.trust-store</code>：SSL 信任库文件路径。</li><li><code>ssl.trust-store-password</code>：SSL 信任库密码。</li><li><code>ssl.trust-store-type</code>：SSL 信任库类型，默认为 <code>PKCS12</code>。</li><li><code>ssl.algorithm</code>：SSL 加密算法，默认为 <code>TLSv1.2</code>。</li><li><code>connection-timeout</code>：连接 RabbitMQ 的超时时间（毫秒），默认为 <code>60000</code>。</li><li><code>requested-heartbeat</code>：客户端希望 RabbitMQ 服务器发送心跳消息的时间间隔（秒），默认为 <code>60</code>。</li><li><code>cache.channel.size</code>：缓存的 Channel 数量，默认为 <code>25</code>。</li><li><code>cache.channel.checkout-timeout</code>：从缓存中检出 Channel 的超时时间（毫秒），默认为 <code>0</code>。</li><li><code>cache.connection.mode</code>：缓存连接模式，支持 <code>CHANNEL</code> 和 <code>CONNECTION</code>，默认为 <code>CHANNEL</code>。</li><li><code>cache.connection.size</code>：缓存连接数量，默认为 <code>1</code>。</li><li><code>cache.connection.checkout-timeout</code>：从缓存中检出 Connection 的超时时间（毫秒），默认为 <code>0</code>。</li><li><code>cache.channel.checkout-timeout</code>：从缓存中检出 Channel 的超时时间（毫秒），默认为 <code>0</code>。</li><li><code>publisher-confirms</code>：是否启用 Publisher Confirms 模式，默认为 <code>false</code>。</li><li><code>publisher-returns</code>：是否启用 Publisher Returns 模式，默认为 <code>false</code>。</li><li><code>template.retry.enabled</code>：是否启用 RabbitMQ 消息重试机制，默认为 <code>false</code>。</li><li><code>template.retry.max-attempts</code>：最大重试次数，默认为 <code>3</code>。</li><li><code>template.retry.initial-interval</code>：第一次重试的间隔时间（毫秒），默认为 <code>1000</code>。</li><li><code>template.retry.multiplier</code>：重试间隔时间的倍增因子，默认为 <code>1.0</code>。</li><li><code>template.retry.max-interval</code>：最大重试间隔时间（毫秒），默认为 <code>10000</code>。</li><li><code>listener.direct.acknowledge-mode</code>：Direct Message Listener Container 的 Acknowledge Mode，支持 <code>AUTO</code>、<code>MANUAL</code> 和 <code>NONE</code>，默认为 <code>AUTO</code>。</li><li>\`listener</li><li><code>listener.direct.prefetch</code>：Direct Message Listener Container 的预取值，默认为 <code>250</code>。</li><li><code>listener.simple.acknowledge-mode</code>：Simple Message Listener Container 的 Acknowledge Mode，支持 <code>AUTO</code>、<code>MANUAL</code> 和 <code>NONE</code>，默认为 <code>AUTO</code>。</li><li><code>listener.simple.concurrency</code>：Simple Message Listener Container 的并发消费者数量，默认为 <code>1</code>。</li><li><code>listener.simple.max-concurrency</code>：Simple Message Listener Container 的最大并发消费者数量。</li><li><code>listener.simple.prefetch</code>：Simple Message Listener Container 的预取值，默认为 <code>250</code>。</li><li><code>listener.simple.default-requeue-rejected</code>：Simple Message Listener Container 在消费者拒绝消息时是否重新加入队列，默认为 <code>true</code>。</li><li><code>listener.simple.retry.enabled</code>：是否启用 Simple Message Listener Container 的消息重试机制，默认为 <code>false</code>。</li><li><code>listener.simple.retry.max-attempts</code>：Simple Message Listener Container 最大重试次数，默认为 <code>3</code>。</li><li><code>listener.simple.retry.initial-interval</code>：Simple Message Listener Container 第一次重试的间隔时间（毫秒），默认为 <code>1000</code>。</li><li><code>listener.simple.retry.multiplier</code>：Simple Message Listener Container 重试间隔时间的倍增因子，默认为 <code>1.0</code>。</li><li><code>listener.simple.retry.max-interval</code>：Simple Message Listener Container 最大重试间隔时间（毫秒），默认为 <code>10000</code>。</li><li><code>listener.simple.missing-queues-fatal</code>：Simple Message Listener Container 在遇到不存在的队列时是否抛出异常，默认为 <code>true</code>。</li><li><code>listener.simple.default-requeue-rejected</code>：Simple Message Listener Container 在消费者拒绝消息时是否重新加入队列，默认为 <code>true</code>。</li></ul><p>以上就是 <code>RabbitProperties</code> 类的主要属性及中文解释。这些属性可以在 Spring Boot 应用程序的配置文件中配置，或者在代码中使用 <code>RabbitTemplate</code>、<code>RabbitListener</code> 等类来动态设置。</p>`,9),o=[c];function i(p,l){return s(),a("div",null,o)}const r=n(t,[["render",i],["__file","RabbitProperties.html.vue"]]),u=JSON.parse('{"path":"/mq/rabbitmq/RabbitProperties.html","title":"RabbitProperties","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"RabbitProperties.java","slug":"rabbitproperties-java","link":"#rabbitproperties-java","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]}],"git":{"updatedTime":1694266906000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"mq/rabbitmq/RabbitProperties.md"}');export{r as comp,u as data};
