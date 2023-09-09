# Redis使用建议

## 键值

1. key 尽量保持简洁性、可读性、可管理性

​		在保证语义的前提下，控制 key 的长度；以业务名 (或数据库名) 为前缀 (防止 key 冲突)，用冒号分隔，比如业务名：表名:id；不要包含特殊字符。

2. 防止 bigkey，防止网卡流量过高、慢查询

​		String 类型控制在 10KB 以内，hash、list、set、zset 元素个数不要超过 5000

3. 避免热点 key

​		热 key 会导致数据倾斜，以及单节点压力过大。建议业务侧将热 key 打散

4. 控制 key 生命周期

​		缓存不是垃圾桶，最好对 key 都设置 ttl，并且将 key 的 ttl 打散，避免 key 集中过期。

## 命令使用

1. 慎用全量操作命令
   1. 禁用 `keys *` 命令，尽量不使用 hgetall、smembers 等命令。
   2. 在获取 key 下的多个元素时，使用相应的 scan 命令，一次获取少量元素，分多次获取，建议一次 scan 不要超过 200 个

2. 控制 mset、mget、hmset、hmget、scan、\range 等命令单次操作元素数量，建议不要超过 200

3. 控制 pipeline 中命令的数量，建议要超过 100

4. redis 删除 key 时，不要用 del 命令，使用 unlink 命令

​		del 大 key 会直接导致 redis 卡住。使用 unlink 命令可以异步删除 key，不会对 redis 主线程产生影响，因此也不会影响业务流量

5. set 和 expire 命令合并成 setex 命令，减少服务端写压力**

6. evalsha 代替 eval

​		redis-cluster 集群中使用 evalsha 代替 eval，减少网络 IO，同时也减小 redis 网络 IO 压力提高性能
