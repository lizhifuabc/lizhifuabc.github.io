import{_ as i,r,o as t,c as l,a as e,b as a,d as s,e as b}from"./app-def54fd2.js";const d="/assets/image-20220321094943631-5d065b2f.png",c="/assets/image-20220321095303551-765159a4.png",o="/assets/image-20220321095916526-b466a1b3.png",m="/assets/image-20220321100130790-42800402.png",u="/assets/image-20220321100412645-83dce859.png",p={},v=e("h1",{id:"rabbitmq",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#rabbitmq","aria-hidden":"true"},"#"),a(" RabbitMQ")],-1),g=e("p",null,"官网：",-1),h={href:"https://www.rabbitmq.com/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.rabbitmq.com/install-homebrew.html",target:"_blank",rel:"noopener noreferrer"},q=b(`<p>安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> rabbitmq

<span class="token operator">==</span><span class="token operator">&gt;</span> Pouring rabbitmq--3.9.13.all.bottle.tar.gz
<span class="token operator">==</span><span class="token operator">&gt;</span> Caveats
Management Plugin enabled by default at http://localhost:15672

To restart rabbitmq after an upgrade:
  brew services restart rabbitmq
Or, <span class="token keyword">if</span> you don<span class="token string">&#39;t want/need a background service you can just run:
  CONF_ENV_FILE=&quot;/usr/local/etc/rabbitmq/rabbitmq-env.conf&quot; /usr/local/opt/rabbitmq/sbin/rabbitmq-server
==&gt; Summary
🍺  /usr/local/Cellar/rabbitmq/3.9.13: 1,390 files, 30.1MB
==&gt; Running \`brew cleanup rabbitmq\`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see \`man brew\`).
Removing: /usr/local/Cellar/rabbitmq/3.8.9_1... (117 files, 26.5MB)
==&gt; Caveats
==&gt; rabbitmq
Management Plugin enabled by default at http://localhost:15672

To restart rabbitmq after an upgrade:
  brew services restart rabbitmq
Or, if you don&#39;</span>t want/need a background <span class="token function">service</span> you can just run:
  <span class="token assign-left variable">CONF_ENV_FILE</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/etc/rabbitmq/rabbitmq-env.conf&quot;</span> /usr/local/opt/rabbitmq/sbin/rabbitmq-server
➜  ~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动：http://localhost:15672/ guest/guesg</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/usr/local/Cellar/rabbitmq/3.11.5
./sbin/rabbitmq-server

-- 后台运行
brew services start rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitmqweb管理界面及授权操作" tabindex="-1"><a class="header-anchor" href="#rabbitmqweb管理界面及授权操作" aria-hidden="true">#</a> RabbitMQWeb管理界面及授权操作</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="延迟队列插件" tabindex="-1"><a class="header-anchor" href="#延迟队列插件" aria-hidden="true">#</a> 延迟队列插件</h2><p>地址：https://github.com/rabbitmq/rabbitmq-delayed-message-exchange</p><p>下载rabbitmq_delayed_message_exchange 插件，然后解压放置到 RabbitMQ 的插件目录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/local/Cellar/rabbitmq/3.9.13/plugins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入 RabbitMQ 的安装目录下的 plgins 目录，执行下面命令让该插件生效，然后重启 RabbitMQ</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./rabbitmq-plugins enable rabbitmq_delayed_message_exchange
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="工作模式" tabindex="-1"><a class="header-anchor" href="#工作模式" aria-hidden="true">#</a> 工作模式</h2><ol><li><p>简单模式：一个生产者、一个队列和一个消费者，生产者发送消息至队列，消费者监听队列并消费消息</p><p><img src="`+d+'" alt="image-20220321094943631"></p></li><li><p>worker 模式(工作队列模式)：一个生产者、一个队列和多个消费者，生产者发送消息至队列，多个消费者监听同一队列消费消息</p><p><img src="'+c+'" alt="image-20220321095303551"></p></li><li><p>发布/订阅模式 (Fanout 广播)：</p><p>publish/subscribe 模式包含一个生产者、一个交换机、多个队列及多个消费者，交换机（Exchange）和队列直接绑定，生产者通过交换机（Exchange）将消息存储在与交换机绑定的队列中，消费者监听队列并进行消费。</p><p><img src="'+o+'" alt="image-20220321095916526"></p></li><li><p>路由模式：</p><p>routing 模式可以根据 routing key 将消息发送给指定队列，交换机（Exchange）和队列通过routing key 进行绑定，生产者通过交换机（Exchange）和 routing key 将消息精准发送至队列，消费者监听队列并消费消息。</p><p><img src="'+m+'" alt="image-20220321100130790"></p></li><li><p>主题模式：Topics 模式在路由模式的基础上支持通配符操作，交换机会根据通配符将消息存储在匹配成功的队列中，消费者监听队列并进行消费</p><p><img src="'+u+'" alt="image-20220321100412645"></p></li><li><p>Header模式：</p><p>header模式与routing不同的地方在于，header模式取消routingkey，使用header中的 key/value（键值对）匹配队列。</p></li><li><p>RPC 模式：</p><p>RPC 模式主要针对需要获取消费者处理结果的情况，通常是生产者将消息发送给了消费者，消费者接收到消息并进行消费后返回给生产者处理结果</p></li></ol>',14);function f(k,x){const n=r("ExternalLinkIcon");return t(),l("div",null,[v,g,e("p",null,[e("a",h,[a("Messaging that just works — RabbitMQ"),s(n)])]),e("p",null,[e("a",_,[a("The Homebrew RabbitMQ Formula — RabbitMQ"),s(n)])]),q])}const y=i(p,[["render",f],["__file","RabbitMQ.html.vue"]]);export{y as default};
