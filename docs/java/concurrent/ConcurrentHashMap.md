# ConcurrentHashMap



## 复合操作的原子性

推荐使用`putIfAbsent`、`compute`、`computeIfAbsent` 、`computeIfPresent`、`merge`等原子操作，保证复合操作。

基本操作(如`put`、`get`、`remove`、`containsKey`等)组成的操作，例如先判断某个键是否存在`containsKey(key)`，然后根据结果进行插入或更新`put(key, value)`。这种操作在执行过程中可能会被其他线程打断，导致结果不符合预期。

## key 和 value 不能为 null

避免歧义，如果可以为 null：

- 键或值本身就是 null 
- 不存在对应的键而返回 null

同理,containsKey() 也无法判断是键不存在还是键就是 null。

```java
// 此时可以通过使用一个特殊的静态空对象来代替 null
public static final Object NULL = new Object();
```

### 对比 HashMap

`HashMap` 可以存储 null 的 key 和 value，但 null 作为键只能有一个，null 作为值可以有多个。如果传入 null 作为参数，就会返回 hash 值为 0 的位置的值。

```java
// HashMap 源码
static final int hash(Object key) {
      int h;
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
  }
```

单线程环境下，可以通过 `contains(key)`来做判断是否存在这个键值对，不会存在歧义。多线程下无法正确判定键值对是否存在（存在其他线程修改的情况）。

### 总结

`ConcurrentHashMap` 是线程安全的，可以保证多个线程同时对它进行读写操作时，不会出现数据不一致的情况，此时如果key 和 value 为 null 的情况下无法容忍歧义。





> https://juejin.cn/post/7272199653340659752?utm_source=gold_browser_extension#comment
>