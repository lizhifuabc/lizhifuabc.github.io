import{_ as n,o as s,c as a,a as e}from"./app-oJgUVX7T.js";const i={},l=e(`<h1 id="docker基础" tabindex="-1"><a class="header-anchor" href="#docker基础"><span>Docker基础</span></a></h1><p>Docker 使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。</p><p><strong>Docker 客户端(Client)</strong> : Docker 客户端通过命令行或者其他工具使用 Docker SDK (https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。</p><p><strong>Docker 主机(Host)</strong> ：一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。</p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><p><strong>镜像（Image）</strong>：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。</p><p><strong>容器（Container）</strong>：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。</p><p><strong>仓库（Repository）</strong>：仓库可看着一个代码控制中心，用来保存镜像。</p><h2 id="常见命令" tabindex="-1"><a class="header-anchor" href="#常见命令"><span>常见命令</span></a></h2><p>镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查找镜像</span>
<span class="token function">docker</span> search mysql

<span class="token comment"># 拉取镜像</span>
<span class="token function">docker</span> pull mysql

<span class="token comment"># 删除镜像</span>
<span class="token function">docker</span> rmi hello-world

<span class="token comment"># 更新镜像</span>
<span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;update test&quot;</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;pdai&quot;</span> 0a1556ca3c27  pdai/ubuntu:v1.0.1

<span class="token comment"># 生成镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> pdai/ubuntu:v2.0.1 <span class="token builtin class-name">.</span>

<span class="token comment"># 镜像标签</span>
<span class="token function">docker</span> tag a733d5a264b5 pdai/ubuntu:v3.0.1

<span class="token comment"># 镜像导出</span>
<span class="token function">docker</span> save <span class="token operator">&gt;</span> pdai-ubuntu-v2.0.2.tar 57544a04cd1a

<span class="token comment"># 镜像导入</span>
<span class="token function">docker</span> load <span class="token operator">&lt;</span> pdai-ubuntu-v2.0.2.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>容器：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 容器查看</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 容器启动</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> pdai/ubuntu:v2.0.1 /bin/bash

<span class="token comment"># 容器停止</span>
<span class="token function">docker</span> stop f5332ebce695

<span class="token comment"># 容器再启动</span>
<span class="token function">docker</span> start f5332ebce695

<span class="token comment"># 容器重启</span>
<span class="token function">docker</span> restart f5332ebce695

<span class="token comment"># 容器导出</span>
<span class="token function">docker</span> <span class="token builtin class-name">export</span> f5332ebce695 <span class="token operator">&gt;</span> ubuntu-pdai-v2.tar

<span class="token comment"># 容器导入</span>
<span class="token function">docker</span> <span class="token function">import</span> ubuntu-pdai-v2.tar pdai/ubuntu:v2.0.2

<span class="token comment"># 容器强制停止并删除</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> f5332ebce695

<span class="token comment"># 容器清理</span>
<span class="token function">docker</span> container prune

<span class="token comment"># 容器别名操作</span>
<span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span> pdai-ubuntu-202 pdai/ubuntu:v2.0.2 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看日志：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#例：实时查看docker容器名为user-uat的最后10行日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--tail</span> <span class="token number">10</span> user-uat

<span class="token comment">#例：查看指定时间后的日志，只显示最后100行：</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2018-02-08&quot;</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">100</span> user-uat

<span class="token comment">#例：查看最近30分钟的日志:</span>
<span class="token function">docker</span> logs <span class="token parameter variable">--since</span> 30m user-uat

<span class="token comment">#例：查看某时间之后的日志：</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-t</span> <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2018-02-08T13:23:37&quot;</span> user-uat

<span class="token comment">#例：查看某时间段日志：</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-t</span> <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2018-02-08T13:23:37&quot;</span> <span class="token parameter variable">--until</span> <span class="token string">&quot;2018-02-09T12:23:37&quot;</span> user-uat

<span class="token comment">#例：将错误日志写入文件：</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2018-02-18&quot;</span> user-uat <span class="token operator">|</span> <span class="token function">grep</span> error <span class="token operator">&gt;&gt;</span> logs_error.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动容器：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> xxx/ubuntu:v2.0.1 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>-it</code> 可以连写的，表示 <code>-i -t</code></li><li><code>-t</code>: 在新容器内指定一个伪终端或终端。</li><li><code>-i</code>: 允许你对容器内的标准输入 (STDIN) 进行交互</li><li><code>-d</code>: 后台模式</li></ul><p>Docker后台模式：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 使用docker attach进入后，exit便容器也停止了</span>
<span class="token function">docker</span> attach xxxx
<span class="token comment"># docker exec 命令，退出容器终端，不会导致容器的停止(建议使用)</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> f5332ebce695 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DockerFile 文件执行：</p><ol><li><p>执行以下命令来构建 Docker 镜像：</p><p>docker build -t &lt;image_name&gt; .</p><p>其中，<code>&lt;image_name&gt;</code> 为镜像指定的名称，可以自定义。命令中的 <code>.</code> 表示 DockerFile 文件所在的当前目录。</p></li><li><p>查看已构建的镜像：docker images</p></li><li><p>运行该镜像</p><p>docker run -d &lt;image_name&gt;</p><p>其中，<code>&lt;image_name&gt;</code> 是您在构建镜像时指定的名称。选项 <code>-d</code> 表示在后台运行容器。</p></li></ol><blockquote><p>https://pdai.tech/md/interview/x-interview-2.html#_15-2-docker</p></blockquote>`,23),t=[l];function c(o,r){return s(),a("div",null,t)}const d=n(i,[["render",c],["__file","Docker基础.html.vue"]]),u=JSON.parse('{"path":"/tools/Docker/Docker%E5%9F%BA%E7%A1%80.html","title":"Docker基础","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":2,"title":"常见命令","slug":"常见命令","link":"#常见命令","children":[]}],"git":{"updatedTime":1698818603000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":2}]},"filePathRelative":"tools/Docker/Docker基础.md"}');export{d as comp,u as data};
