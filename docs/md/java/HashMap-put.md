# HashMap-put方法

Java HashMap 基于JDK 1.8。

## 异或

按位异或，相同为0，不同为1。

- 异或可以尽量的保留两部分的数据信息，保证在两个Node**比较不相等**的情况下尽量生成不同的hashCode，易于在散列表中查找该对象，与HashMap的hash方法尽量返回不同的hash值是一个道理。

  ```java
  // 11: 0000 1011
  // 13: 0000 1101
  // ^ : 0000 0110
  ```

- 异或使用二进制直接计算效率高

## 源码

put方法源码如下：

```java
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
```

计算key对应的哈希值，hash函数源码如下：

```java
    static final int hash(Object key) {
        int h;
        // 如果key为null，返回0
        // hashCode的高16位异或低16位得到哈希值
        // 主要从性能、哈希碰撞角度考虑，减少系统开销，不会造成因为高位没有参与下标计算从而引起的碰撞。
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
```

