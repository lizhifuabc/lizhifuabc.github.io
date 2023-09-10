# Redis应用场景

1. 缓存
2. 分布式锁：基于 Redisson 来实现分布式锁
3. 限流：通过 Redis + Lua 脚本的方式来实现限流
4. 消息队列：Redis 自带的 list 数据结构可以作为一个简单的队列使用。Redis 5.0 中增加的 stream 类型的数据结构更加适合用来做消息队列。它比较类似于 Kafka，有主题和消费组的概念，支持消息持久化以及 ACK 机制。
5. 延时队列：Redisson 内置了延时队列（基于 sorted set 实现的）
6. 分布式 Session ：利用 string 或者 hash 保存 Session 数据，所有的服务器都可以访问
7. 通过 bitmap 统计活跃用户、通过 sorted set 维护排行榜

## 业务场景

收集常用业务场景。

## 购物车信息

Hash 存储：

- 用户 id 为 key
- 商品 id 为 field，商品数量为 value

实际业务可能需要区分商店，此时 field 不能只为 ID 

## 排行榜

Redis  `sorted set` 数据结构：适合各种排行榜的场景，比如直播间送礼物的排行榜、朋友圈的微信步数排行榜、王者荣耀中的段位排行榜、话题热度排行榜等等。

 命令: `ZRANGE` (从小到大排序)、 `ZREVRANGE` （从大到小排序）、`ZREVRANK` (指定元素排名)。

## 抽奖系统

- `SADD key member1 member2 ...`：向指定集合添加一个或多个元素。
- `SPOP key count`：随机移除并获取指定集合中一个或多个元素，适合不允许重复中奖的场景。
- `SRANDMEMBER key count` : 随机获取指定集合中指定数量的元素，适合允许重复中奖的场景。

## 统计活跃用户

Bitmap 存储的是连续的二进制数字（0 和 1），通过 Bitmap, 只需要一个 bit 位来表示某个元素对应的值或者状态，key 就是对应元素本身 。我们知道 8 个 bit 可以组成一个 byte，所以 Bitmap 本身会极大的节省储存空间。

你可以将 Bitmap 看作是一个存储二进制数字（0 和 1）的数组，数组中每个元素的下标叫做 offset（偏移量）。

## 统计页面 UV

HyperLogLog 统计页面 UV 主要需要用到下面这两个命令：

- `PFADD key element1 element2 ...`：添加一个或多个元素到 HyperLogLog 中。
- `PFCOUNT key1 key2`：获取一个或者多个 HyperLogLog 的唯一计数。



> https://javaguide.cn/database/redis/redis-questions-01.html