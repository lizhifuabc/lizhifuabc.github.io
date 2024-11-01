import{_ as e,o as s,c as a,a as n}from"./app-oJgUVX7T.js";const d="/assets/image-20230910164043469-CW2R9Stj.png",i={},l=n('<h1 id="redis-数据持久化" tabindex="-1"><a class="header-anchor" href="#redis-数据持久化"><span>Redis 数据持久化</span></a></h1><p>Redis数据是存储在内存中的，为了保证Redis数据不丢失，那就要把数据从内存存储到磁盘上，以便在服务器重启后还能够从磁盘中恢复原有数据，这就是Redis的数据持久化。</p><p>三种方式：</p><ul><li>AOF 日志（Append Only File，文件追加方式）：记录所有的操作命令，并以文本的形式追加到文件中。</li><li>RDB 快照（Redis DataBase）：将某一个时刻的内存数据，以二进制的方式写入磁盘。</li><li>混合持久化方式：Redis 4.0 新增了混合持久化的方式，集成了 RDB 和 AOF 的优点。</li></ul><p><img src="'+d+`" alt="image-20230910164043469"></p><h2 id="aof-append-only-file-文件追加方式" tabindex="-1"><a class="header-anchor" href="#aof-append-only-file-文件追加方式"><span>AOF（Append Only File，文件追加方式）</span></a></h2><p>AOF采用的是写后日志的方式，Redis先执行命令把数据写入内存，然后再记录日志到文件中。AOF日志记录的是操作命令，不是实际的数据，如果采用AOF方法做故障恢复时需要将全量日志都执行一遍。</p><p>Redis在写入日志之前，不对命令进行语法检查，所以只记录执行成功的命令，避免出现记录错误命令的情况，而且在命令执行后再写日志不会阻塞当前的写操作。</p><p>问题：</p><ul><li>数据可能会丢失：如果 Redis 刚执行完命令，此时发生故障宕机，会导致这条命令存在丢失的风险。</li><li>可能阻塞其他操作：AOF 日志其实也是在主线程中执行，所以当 Redis 把日志文件写入磁盘的时候，还是会阻塞后续的操作无法执行。</li></ul><p>配置（Redis 6.0 之后已经默认是开启了）：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>appendonly <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>持久化方式：</p><ol><li><code>appendfsync always</code>：主线程调用 <code>write</code> 执行写操作后，后台线程（ <code>aof_fsync</code> 线程）立即会调用 <code>fsync</code> 函数同步 AOF 文件（刷盘），<code>fsync</code> 完成后线程返回，这样会严重降低 Redis 的性能（<code>write</code> + <code>fsync</code>）。</li><li><code>appendfsync everysec</code>：主线程调用 <code>write</code> 执行写操作后立即返回，由后台线程（ <code>aof_fsync</code> 线程）每秒钟调用 <code>fsync</code> 函数（系统调用）同步一次 AOF 文件（<code>write</code>+<code>fsync</code>，<code>fsync</code>间隔为 1 秒）</li><li><code>appendfsync no</code>：主线程调用 <code>write</code> 执行写操作后立即返回，让操作系统决定何时进行同步，Linux 下一般为 30 秒一次（<code>write</code>但不<code>fsync</code>，<code>fsync</code> 的时机由操作系统决定）。</li><li>Redis 7.0.0 开始，Redis 使用了 <strong>Multi Part AOF</strong> 机制。将原来的单个 AOF 文件拆分成多个 AOF 文件。</li></ol><h2 id="rdb-redis-database" tabindex="-1"><a class="header-anchor" href="#rdb-redis-database"><span>RDB（Redis DataBase）</span></a></h2><p>RDB采用的是内存快照的方式，它记录的是某一时刻的数据，而不是操作，所以采用RDB方法做故障恢复时只需要直接把RDB文件读入内存即可，实现快速恢复。Redis 对 RDB 的执行频率非常重要，因为这会影响快照数据的完整性以及 Redis 的稳定性</p><ul><li><code>save</code> 命令在主线程中执行，会导致阻塞，<strong>所以快照的时候不能修改数据</strong></li><li><code>bgsave</code> 命令则会创建一个子进程，用于写入 RDB 文件的操作，避免了对主线程的阻塞，这也是 Redis RDB 的默认配置。</li></ul><p>redis.conf 配置文件：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>save <span class="token number">900</span> <span class="token number">1</span>           <span class="token comment">#在900秒(15分钟)之后，如果至少有1个key发生变化，Redis就会自动触发bgsave命令创建快照。</span>

save <span class="token number">300</span> <span class="token number">10</span>          <span class="token comment">#在300秒(5分钟)之后，如果至少有10个key发生变化，Redis就会自动触发bgsave命令创建快照。</span>

save <span class="token number">60</span> <span class="token number">10000</span>        <span class="token comment">#在60秒(1分钟)之后，如果至少有10000个key发生变化，Redis就会自动触发bgsave命令创建快照。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="混合" tabindex="-1"><a class="header-anchor" href="#混合"><span><strong>混合</strong></span></a></h2><ol><li>把数据以 RDB 的方式写入文件</li><li>将后续的操作命令以 AOF 的格式存入文件</li><li>用AOF做数据的保存,用RDB用来冷备数据</li></ol>`,21),c=[l];function o(t,p){return s(),a("div",null,c)}const h=e(i,[["render",o],["__file","Redis 数据持久化.html.vue"]]),m=JSON.parse('{"path":"/database/nosql/Redis%20%E6%95%B0%E6%8D%AE%E6%8C%81%E4%B9%85%E5%8C%96.html","title":"Redis 数据持久化","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"AOF（Append Only File，文件追加方式）","slug":"aof-append-only-file-文件追加方式","link":"#aof-append-only-file-文件追加方式","children":[]},{"level":2,"title":"RDB（Redis DataBase）","slug":"rdb-redis-database","link":"#rdb-redis-database","children":[]},{"level":2,"title":"混合","slug":"混合","link":"#混合","children":[]}],"git":{"updatedTime":1694337389000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"database/nosql/Redis 数据持久化.md"}');export{h as comp,m as data};
