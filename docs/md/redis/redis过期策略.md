# redis过期策略

## 描述

**定期删除**：Redis 默认是每隔 100ms 就随机抽取一些设置了过期时间的 key，检查其是否过期，如果过期就删除。

**惰性删除**：获取某个 key 的时候，Redis 会检查一下 ，这个 key 如果设置了过期时间那么是否过期了？如果过期了此时就会删除，不会给你返回任何东西。

**内存淘汰机制**： 当内存不足以容纳新写入数据时

- noeviction：新写入操作会报错（**很少使用，因为无法预估**）。
- allkeys-lru：移除最近最少使用的 key（**最常用**）。
- allkeys-random：在键空间中，随机移除某个 key。（**很少使用**）
- volatile-lru：在设置了过期时间的键空间中，移除最近最少使用的 key。
- volatile-random：在设置了过期时间的键空间中，随机移除某个 key。
- volatile-ttl：在设置了过期时间的键空间中，有更早过期时间的 key 优先移除。

## 基于 LinkedHashMap 的LRU

```java
public class LRU<K, V> extends LinkedHashMap<K, V> {
    private int capacity;

    /**
     * 传递进来最多能缓存多少数据
     *
     * @param capacity 缓存大小
     */
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    /**
     * 如果map中的数据量大于设定的最大容量，返回true，再新加入对象时删除最老的数据
     *
     * @param eldest 最老的数据项
     * @return true则移除最老的数据
     */
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        // 当 map中的数据量大于指定的缓存个数的时候，自动移除最老的数据
        return size() > capacity;
    }
}
```

