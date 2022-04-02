# HashMap-Node

Java HashMap Node 解析，基于JDK 1.8。

## 异或

按位异或，相同为0，不同为1。

- 异或可以尽量的保留两部分的数据信息，保证在两个Node**比较不相等**的情况下尽量生成不同的hashCode，易于在散列表中查找该对象，与HashMap的hash方法尽量返回不同的hash值是一个道理。

  ```java
  // 11: 0000 1011
  // 13: 0000 1101
  // ^ : 0000 0110
  ```

- 异或使用二进制直接计算效率高

## Node

HashMap内部使用数组存储数据，数组中的每个元素类型为`Node<K,V>`

```java
    /**
     * Basic hash bin node, used for most entries.  (See below for
     * TreeNode subclass, and in LinkedHashMap for its Entry subclass.)
     *
     * 内部类，重新实现 Map 的 Entry 接口
     */
    static class Node<K,V> implements Map.Entry<K,V> {
        // 哈希值
        final int hash;
        // 存入key
        final K key;
        // 存入value
        V value;
        // 链表的下一个节点
        Node<K,V> next;
        // 构造
        Node(int hash, K key, V value, Node<K,V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }
        // 获取当前的key
        public final K getKey()        { return key; }
        // 获取当前的value
        public final V getValue()      { return value; }
        // 重写toString方法
        public final String toString() { return key + "=" + value; }

        // 每一个节点的hash值，是将key的hashCode 和 value的hashCode 异或^得到的。
        public final int hashCode() {
            // 异或运算，相同取0，相反取1
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }
        // 设置新的value 同时返回旧value
        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }
        // 判断两个node是否相等,若key和value都相等，返回true。
        // 自身比较为 true
        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                if (Objects.equals(key, e.getKey()) &&
                    Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }
    }
```

