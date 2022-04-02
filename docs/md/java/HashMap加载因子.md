# HashMap加载因子

```java
/**
* The load factor for the hash table.
*
* 加载因子 默认 0.75
* @serial
*/
final float loadFactor;
/**
* The load factor used when none specified in constructor.
*
* 默认加载因子值
* 当元素数量达到当前容量的 75% 时，HashMap 会对数组进行扩容。该因子可在创建实例时指定。
*/
static final float DEFAULT_LOAD_FACTOR = 0.75f;
```

HashMap的底层其实也是哈希表（散列表），而解决冲突的方式是链地址法。HashMap的初始容量大小默认是16，为了减少冲突发生的概率，当HashMap的数组长度到达一个临界值的时候，就会触发扩容，把所有元素rehash之后再放在扩容后的容器中，这是一个相当耗时的操作。

<img src="../../assets/img/HashMap%E5%8A%A0%E8%BD%BD%E5%9B%A0%E5%AD%90.png" alt="HashMap加载因子" style="zoom:50%;" />

loadfactory设置为0.75是经过多重计算检验得到的可靠值，可以最大程度的减少rehash的次数，避免过多的性能消耗。