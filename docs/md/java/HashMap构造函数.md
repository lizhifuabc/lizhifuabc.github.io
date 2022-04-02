# HashMap构造函数

## 按位或运算符（|）

参加运算的两个对象，按二进制位进行“或”运算。

运算规则：参加运算的两个对象只要有一个为1，其值为1。负数按补码形式参加按位或运算。



常用来对一个数据的某些位置1。

方法：找到一个数，对应X要置1的位，该数的对应位为1，其余位为零。此数与X相或可使X中的某些位置1。

例：将X=10100000的低4位置1 ，用X | 0000 1111 = 1010 1111即可得到。



## 无符号右移

无符号右移，忽略符号位，空位都以0补齐

```java
11 >>> 2
  
0000 0000 0000 0000 0000 0000 0000 1011

0000 0000 0000 0000 0000 0000 0000 0010
```

## 2的幂

2的整次方的特性是二进制有效位只有一个1，退位后当前1消失，后面bit位全补1，例如16:10000，退位后01111。13的二进制：1101，结构上看只要第二个bit补1(1101->1111)，再进位(1111->10000)就可以了。1101->1111->



## 源码

底层构造函数：

```java
    public HashMap(int initialCapacity) {
        // 设置容量
        // 设置加载因子为默认 0.75
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }
```

```java
    public HashMap() {
        // 设置加载因子为默认 0.75
        this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
    }
```

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

两倍幂：返回大于输入参数且最近的2的整数次幂的数

```java
    /**
     * Returns a power of two size for the given target capacity.
     *
     * @param cap 容量
     * 返回大于输入参数且最近的2的整数次幂的数，比如10，则返回16
     */
    static final int tableSizeFor(int cap) {
        // HashMap 的最大容量为 2^30，所以容量最大就是 30 bit 的整数
        // 假设 n = 001xxx xxxxxxxx xxxxxxxx xxxxxxxx （x 代表该位上是 0 还是 1 我们不关心）
        // 移位操作之后(| 或)，可以保证最终结果移位之后变成了 1

        // 避免输入的 cap 是偶数，最后计算的数是 cap 的 2 倍的情况
        // 先退位，所以最终实现的结果是n的bit位全补1。
        int n = cap - 1;

        // n       001xxx xxxxxxxx xxxxxxxx xxxxxxxx
        // n >>> 1 0001xx xxxxxxxx xxxxxxxx xxxxxxxx
        // | 或操作 0011xx xxxxxxxx xxxxxxxx xxxxxxxx
        // 结果就是把 n 的最高位为 1 的紧邻的右边的 1 位也置为了 1，这样高位中有连续两位都是 1
        n |= n >>> 1;

        // n       0011xx xxxxxxxx xxxxxxxx xxxxxxxx
        // n >>> 2 000011 xxxxxxxx xxxxxxxx xxxxxxxx
        // | 或操作 001111 xxxxxxxx xxxxxxxx xxxxxxxx
        // 结果就是 n 的高位中有连续 4 个 1
        n |= n >>> 2;

        // n       001111 xxxxxxxx xxxxxxxx xxxxxxxx
        // n >>> 4 000000 1111xxxx xxxxxxxx xxxxxxxx
        // | 或操作 001111 1111xxxx xxxxxxxx xxxxxxxx
        // 结果就是 n 的高位中有连续 8 个 1
        n |= n >>> 4;

        // n        001111 1111xxxx xxxxxxxx xxxxxxxx
        // n >>> 8  000000 00001111 1111xxxx xxxxxxxx
        // | 或操作  001111 11111111 1111xxxx xxxxxxxx
        // 结果就是 n 的高位中有连续 16 个 1
        n |= n >>> 8;

        // n        001111 11111111 1111xxxx xxxxxxxx
        // n >>> 16 000000 00000000 00001111 11111111
        // | 或操作  001111 11111111 11111111 11111111
        //结果就是 n 的高位1后面都置为 1
        n |= n >>> 16;
        // 最后会对 n 和最大容量做比较，如果 >= 2^30，就取最大容量，如果 < 2^30 ，就对 n 进行 +1 操作，因为后面位数都为1，所以 +1 就相当于找比这个数大的最小的 2的整数次幂
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }

```

## tableSizeFor 测试

使用的最大容量+1进行测试

```java
public static final int MAXIMUM_CAPACITY = 1 << 30;

public static int tableSizeFor(int cap) {
  System.out.println(Integer.toBinaryString(cap));
  int n = cap - 1;
  System.out.println(Integer.toBinaryString(n));
  n |= n >>> 1;
  System.out.println(Integer.toBinaryString(n));
  n |= n >>> 2;
  System.out.println(Integer.toBinaryString(n));
  n |= n >>> 4;
  System.out.println(Integer.toBinaryString(n));
  n |= n >>> 8;
  System.out.println(Integer.toBinaryString(n));
  n |= n >>> 16;
  System.out.println(Integer.toBinaryString(n));
  return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

执行代码：tableSizeFor(MAXIMUM_CAPACITY + 1)

```java
1000000000000000000000000000001
1000000000000000000000000000000
1100000000000000000000000000000
1111000000000000000000000000000
1111111100000000000000000000000
1111111111111111000000000000000
1111111111111111111111111111111
```

tableSizeFor首先获取最高位的1，二进制退位规则决定一定能够获取到最高位的1，然后进行不停的bit复制，1生2，2生4等等。int类型只有32位，所以复制到16位终止。

最后将n进位，即得到2的整次方，不过限定不能大于1>>30;