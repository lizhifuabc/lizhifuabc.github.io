# Redis官方文档

[Distributed Locks with Redis | Redis](https://redis.io/docs/manual/patterns/distributed-locks/)

## 分布式锁的设计原则

1. **互斥**（安全性）：在任何给定时刻，只有一个客户端可以持有锁。

2. **无死锁**（有效性）：超时机制，即使锁定资源的客户端崩溃或被分区，也总是可以获得锁；

3. **容错性**（有效性）：只要大多数 Redis 节点都启动，客户端就可以获取和释放锁。
4. **同源性**：A加的锁，不能被B解锁
5. **非阻塞**：获取不到锁，不能无限期等待；
6. **高性能**：加锁解锁是高性能的

## 锁定到单个实例

**加锁**：

```lua
SET resource_name my_random_value NX PX 30000
```

1. resource_name：本次业务有关的id。
2. my_random_value：一串随机值，必须保证全局唯一。
3. NX：当且仅当key不存在时，返回执行成功，否则执行失败。
4. PX：30秒后，key将被自动删除。

执行命令后返回成功，表明服务成功的获得了锁。

**重试 + 重试间隔**：

```java
while ((!result) && retryTimes-- > 0) {
  
}
```

**解锁**：采用lua脚本

在删除key之前，一定要判断服务A持有的value与Redis内存储的value是否一致。如果贸然使用服务A持有的key来删除锁，则会误将服务B的锁释放掉。

```lua
if redis.call("get", KEYS[1])==ARGV[1] then
	return redis.call("del", KEYS[1])
else
	return 0
end
```

## 基于RedLock实现分布式锁

假设有两个服务A、B都希望获得锁，有一个包含了5个redis master的Redis Cluster，执行过程大致如下:

1. 客户端获取当前时间戳，单位: 毫秒
2. 服务A轮寻每个master节点，尝试创建锁。(这里锁的过期时间比较短，一般就几十毫秒) RedLock算法会尝试在大多数节点上分别创建锁，假如节点总数为n，那么大多数节点指的是n/2+1。
3. 客户端计算成功建立完锁的时间，如果建锁时间小于超时时间，就可以判定锁创建成功。如果锁创建失败，则依次(遍历master节点)删除锁。
4. 只要有其它服务创建过分布式锁，那么当前服务就必须轮寻尝试获取锁

## Redisson

1. redisson所有指令都通过lua脚本执行，保证了操作的原子性
2. redisson设置了watchdog看门狗，“看门狗”的逻辑保证了没有死锁发生
3. redisson支持Redlock的实现方式。

执行流程：

1. 线程去获取锁，获取成功: 执行lua脚本，保存数据到redis数据库。
2. 线程去获取锁，获取失败: 订阅了解锁消息，然后再尝试获取锁，获取成功后，执行lua脚本，保存数据到redis数据库。



>参考文章
>
>https://pdai.tech/md/arch/arch-z-lock.html

