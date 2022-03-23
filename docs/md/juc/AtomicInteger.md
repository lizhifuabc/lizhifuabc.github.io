# AtomicInteger

通过CAS来实现了乐观锁.

```java
public class AtomicInteger extends Number implements java.io.Serializable {
    private static final long serialVersionUID = 6214790243416807050L;

    // setup to use Unsafe.compareAndSwapInt for updates
    //  获取并操作内存的数据
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    //  存储value在AtomicInteger中的偏移量
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }
    // 存储AtomicInteger的int值，该属性需要借助volatile关键字保证其在线程间是可⻅的
    private volatile int value;
}
```

核心三个变量：

- unsafe：获取并操作内存的数据
- value：存储AtomicInteger的int值，该属性需要借助volatile关键字保证其在线程间是可⻅的
- valueOffset：存储value在AtomicInteger中的偏移量

自增方法：

```java
    /**
     * Atomically increments by one the current value.
     * 自增方法
     * @return the updated value
     */
    public final int incrementAndGet() {
        return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
    }
```

Unsafe:

```java
// var2:valueOffset
// var4:1
public final int getAndAddInt(Object object, long valueOffset, int delta) {
        int v;
        do {
            // 循环通过对象和偏移量获取变量的值
            // 由于volatile的修饰, 所有线程看到的v都是一样的
            v = this.getIntVolatile(object, valueOffset);
            // ⽐较+更新
            // 断内存值是否等于v
            // 相等则将内存值设置为 v + delta
            // 否则返回false，继续循环进⾏重试
        } while(!this.compareAndSwapInt(object, valueOffset, v, v + delta));

        return var5;
    }
```

compareAndSwapInt()中，在JNI⾥是借助于⼀个CPU指令完成的，属于原⼦操作，可以保证多个线程都能够看到同⼀个变量的修改值。后续JDK通过CPU的cmpxchg指令，去⽐较寄存器中的 A 和 内存中的值 V。如果相等，就把要写⼊的新值 B 存⼊内存中。如果不相等，就将内 存值 V 赋值给寄存器中的值 A。然后通过Java代码中的while循环再次调⽤cmpxchg指令进⾏重试，直到设置成功为⽌。 