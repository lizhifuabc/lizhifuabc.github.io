# HashMap主要变量

Java HashMap 主要变量 解析，基于JDK 1.8。

## 源码



```java
    /**
     * The default initial capacity - MUST be a power of two.
     *
     * 数组默认的初始化长度16 - 一定是二的幂
     */
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

    /**
     * The maximum capacity, used if a higher value is implicitly specified
     * by either of the constructors with arguments.
     * MUST be a power of two <= 1<<30.
     *
     * 数组最大容量，2的30次幂，即1073741824 - 一定是二的幂
     * 扩容的阈值最大为 阈值最大为  Integer.MAX_VALUE =  2的31次幂 - 1
     * 数组的容量是2的幂，所以最大只能为2的30次幂
     * 容量一定是二的幂。可以分布均匀
     */
    static final int MAXIMUM_CAPACITY = 1 << 30;

    /**
     * The load factor used when none specified in constructor.
     *
     * 默认加载因子值
     * 当元素数量达到当前容量的 75% 时，HashMap 会对数组进行扩容。该因子可在创建实例时指定。
     */
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    /**
     * The bin count threshold for using a tree rather than list for a
     * bin.  Bins are converted to trees when adding an element to a
     * bin with at least this many nodes. The value must be greater
     * than 2 and should be at least 8 to mesh with assumptions in
     * tree removal about conversion back to plain bins upon
     * shrinkage.
     *
     * 链表转换为红黑树的长度阈值
     */
    static final int TREEIFY_THRESHOLD = 8;

    /**
     * The bin count threshold for untreeifying a (split) bin during a
     * resize operation. Should be less than TREEIFY_THRESHOLD, and at
     * most 6 to mesh with shrinkage detection under removal.
     *
     * 红黑树转换为链表的长度阈值
     */
    static final int UNTREEIFY_THRESHOLD = 6;

    /**
     * The smallest table capacity for which bins may be treeified.
     * (Otherwise the table is resized if too many nodes in a bin.)
     * Should be at least 4 * TREEIFY_THRESHOLD to avoid conflicts
     * between resizing and treeification thresholds.
     *
     * 链表转换为红黑树时，数组容量必须大于等于64
     * 最小 32 = 4 * 链表转换为红黑树的长度阈值(8)
     */
    static final int MIN_TREEIFY_CAPACITY = 64;
		/**
     * The table, initialized on first use, and resized as
     * necessary. When allocated, length is always a power of two.
     * (We also tolerate length zero in some operations to allow
     * bootstrapping mechanics that are currently not needed.)
     *
     * HashMap使用数组存放数据，数组元素类型为Node<K,V>
     */
    transient Node<K,V>[] table;

    /**
     * Holds cached entrySet(). Note that AbstractMap fields are used
     * for keySet() and values().
     */
    transient Set<Map.Entry<K,V>> entrySet;

    /**
     * The number of key-value mappings contained in this map.
     *
     * HashMap里键值对个数
     */
    transient int size;

    /**
     * The number of times this HashMap has been structurally modified
     * Structural modifications are those that change the number of mappings in
     * the HashMap or otherwise modify its internal structure (e.g.,
     * rehash).  This field is used to make iterators on Collection-views of
     * the HashMap fail-fast.  (See ConcurrentModificationException).
     *
     * 用于快速失败，由于HashMap非线程安全，在对HashMap进行迭代时，
     * 如果期间其他线程的参与导致HashMap的结构发生变化了（比如put，remove等操作），
     * 直接抛出ConcurrentModificationException异常
     */
    transient int modCount;

    /**
     * The next size value at which to resize (capacity * load factor).
     *
     * @serial
     */
    // (The javadoc description is true upon serialization.
    // Additionally, if the table array has not been allocated, this
    // field holds the initial array capacity, or zero signifying
    // DEFAULT_INITIAL_CAPACITY.)
    // 扩容阈值，计算方法为 数组容量*加载因子
		// 阈值最大为  Integer.MAX_VALUE =  2的31次幂 - 1
    int threshold;

    /**
     * The load factor for the hash table.
     *
     * 加载因子 默认 0.75
     * @serial
     */
    final float loadFactor;
```

## 解析

loadFactor 和 transient。

### 加载因子loadFactor

加载因子也叫扩容因子，用于决定HashMap数组何时进行扩容。

比如数组容量为16，加载因子为0.75，那么扩容阈值为`16*0.75=12`，即HashMap数据量大于等于12时，数组就会进行扩容。



容量占用和性能是此消彼长的关系，它们的平衡点由加载因子决定，**0.75**是一个即兼顾容量又兼顾性能的经验值。

**扩容过程：非常耗时，会影响程序性能**

1. 重新创建一个指定容量的数组
2. 将旧值复制到新的数组里

**加载因子是基于容量和性能之间平衡的结果：**

- 当加载因子过大时，扩容阈值也变大，也就是说扩容的门槛提高了，这样容量的占用就会降低。但这时哈希碰撞的几率就会增加，效率下降；
- 当加载因子过小时，扩容阈值变小，扩容门槛降低，容量占用变大。这时候哈希碰撞的几率下降，效率提高。

### transient

通过transient修饰的字段在序列化的时候将被排除在外。

```java
transient Node<K,V>[] table; // HashMap使用数组存放数据，数组元素类型为Node<K,V>

public native int hashCode();// hashCode 属于 native 方法
```

存储数据的table字段使用transient修饰，HashMap通过自定义的readObject/writeObject方法自定义序列化和反序列化操作。

- table一般不会存满，即容量大于实际键值对个数，序列化table未使用的部分不仅浪费时间也浪费空间；
- table 的存储位置依赖于hashCode，hashCode 属于 native 方法，同一个键值对在不同的JVM环境下，在table中存储的位置可能不同，那么在反序列化table操作时可能会出错。
