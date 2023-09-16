# HashMap的初始容量

```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +
                                           initialCapacity);
    // 容量最大 2的30次幂
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +
                                           loadFactor);
    // 加载因子
    this.loadFactor = loadFactor;
    // 根据容量确认扩容阈值
    this.threshold = tableSizeFor(initialCapacity);
}
```

阈值计算，返回大于输入参数且最近的2的整数次幂的数，比如10，则返回16

```java
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

- 右移位1、2、4、8、16，目的是为了把二进制的各个位置都填上1，当二进制的各个位置都是1以后，就是一个标准的2的倍数减1了，最后把结果加1再返回即可。
- cap - 1 避免输入的 cap 是偶数，最后计算的数是 cap 的 2 倍的情况

