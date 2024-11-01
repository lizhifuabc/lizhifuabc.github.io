import{_ as n,o as a,c as s,a as e}from"./app-oJgUVX7T.js";const i={},l=e(`<h1 id="服务器手动部署maven项目" tabindex="-1"><a class="header-anchor" href="#服务器手动部署maven项目"><span>服务器手动部署Maven项目</span></a></h1><h2 id="maven-安装" tabindex="-1"><a class="header-anchor" href="#maven-安装"><span>maven 安装</span></a></h2><ul><li>yum install maven -y</li><li>wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.5/binaries/apache-maven-3.8.5-bin.tar.gz</li></ul><h2 id="jdk-安装" tabindex="-1"><a class="header-anchor" href="#jdk-安装"><span>jdk 安装</span></a></h2><ol><li><p>查找jdk：yum -y list java*</p></li><li><p>安装jdk：yum -y install java-17-openjdk.x86_64</p></li><li><p>检查版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZ2zehgqgys50t73mum5zyZ lib<span class="token punctuation">]</span><span class="token comment"># java -version</span>
openjdk version <span class="token string">&quot;17.0.1&quot;</span> <span class="token number">2021</span>-10-19 LTS
OpenJDK Runtime Environment <span class="token number">21.9</span> <span class="token punctuation">(</span>build <span class="token number">17.0</span>.1+12-LTS<span class="token punctuation">)</span>
OpenJDK <span class="token number">64</span>-Bit Server VM <span class="token number">21.9</span> <span class="token punctuation">(</span>build <span class="token number">17.0</span>.1+12-LTS, mixed mode, sharing<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@iZ2zehgqgys50t73mum5zyZ lib<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>jdk默认安装在 /usr/lib/jvm 目录下</p></li><li><p>卸载：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>rpm -qa | grep java
 
或者使用
yum  list installed | grep java

rpm -e   java-1.7.0-openjdk.x86_64
rpm -e   java-1.7.0-openjdk-headless.x86_64
 
或者使用
yum remove *openjdk* 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="git" tabindex="-1"><a class="header-anchor" href="#git"><span>git</span></a></h2><p>首先安装安装 Git：yum install -y git</p><p>Git 全局设置:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>git config --global user.name &quot;XXX&quot;
git config --global user.email &quot;XX&quot;
git config --global user.password “密码”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 git 仓库:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> demo
<span class="token builtin class-name">cd</span> demo
<span class="token function">git</span> init 
<span class="token function">touch</span> README.md
<span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;first commit&quot;</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://gitee.com/lizhifu/demo.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin <span class="token string">&quot;master&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>已有仓库</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_git_repo
<span class="token function">git</span> remote <span class="token function">add</span> origin https://gitee.com/lizhifu/demo.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin <span class="token string">&quot;master&quot;</span>

<span class="token function">git</span> pull origin master:master

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 在使用https git拉取代码时，每次git pull的时候都会让输入用户名和密码</span>

<span class="token comment"># 进入项目目录</span>

<span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper store

<span class="token comment"># 如果要清除用户名和密码</span>
<span class="token comment"># 运行一下命令缓存输入的用户名和密码</span>

<span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper wincred

<span class="token comment"># 清除掉缓存在git中的用户名和密码</span>

<span class="token function">git</span> credential-manager uninstall

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),t=[l];function d(c,r){return a(),s("div",null,t)}const p=n(i,[["render",d],["__file","服务器手动部署Maven项目.html.vue"]]),u=JSON.parse('{"path":"/tools/maven/%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2Maven%E9%A1%B9%E7%9B%AE.html","title":"服务器手动部署Maven项目","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"maven 安装","slug":"maven-安装","link":"#maven-安装","children":[]},{"level":2,"title":"jdk 安装","slug":"jdk-安装","link":"#jdk-安装","children":[]},{"level":2,"title":"git","slug":"git","link":"#git","children":[]}],"git":{"updatedTime":1693835822000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"tools/maven/服务器手动部署Maven项目.md"}');export{p as comp,u as data};
