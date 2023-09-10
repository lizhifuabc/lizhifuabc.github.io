# 秒杀系统Redis常用脚本

以下通过 Lua 语言实现原子性操作，并且能够提高系统的性能和稳定性。

1. 初始化商品库存（String）

Redis SET 命令用于设置给定 key 的值。如果 key 已经存储其他值， SET 就覆写旧值，且无视类型。

```
-- KEYS[1] 商品的 ID
-- KEYS[2] 商品的库存数量

redis.call("set", KEYS[1], ARGV[1])
```



2. 扣减商品库存

```
if redis.call("decrby", KEYS[1], ARGV[1]) >= 0 then
    return 1
else
    redis.call("incrby", KEYS[1], ARGV[1])
    return 0
end
```

这个脚本用于扣减某个商品的库存数量。KEYS[1] 表示商品的 ID，ARGV[1] 表示要扣减的库存数量。如果扣减后的库存数量仍然大于等于 0，则返回 1 表示扣减成功；否则，将库存数量恢复到扣减前的数量，并返回 0 表示扣减失败。

3. 查询商品库存

```
return redis.call("get", KEYS[1])
```

这个脚本用于查询某个商品的库存数量。KEYS[1] 表示商品的 ID。

4. 将用户加入秒杀队列

```
redis.call("lpush", KEYS[1], ARGV[1])
```

这个脚本用于将用户加入秒杀队列。KEYS[1] 表示秒杀队列的名称，ARGV[1] 表示要加入队列的用户 ID。

5. 从秒杀队列中弹出用户

```
return redis.call("rpop", KEYS[1])
```

这个脚本用于从秒杀队列中弹出一个用户。KEYS[1] 表示秒杀队列的名称。
