# AQS

AQS 是整个Java JUC的核心。

## Lock锁接口

```java
/**
 * 获取锁：
 *     如果当前锁资源空闲可用则获取锁资源返回，
 *     如果不可用则阻塞等待，不断竞争锁资源，直至获取到锁返回。
 */
void lock();

/**
 * 释放锁：
 *     当前线程执行完成业务后将锁资源的状态由占用改为可用并通知阻塞线程。
 */
void unlock();

/**
 * 获取锁：(与lock方法不同的在于可响应中断操作，即在获取锁过程中可中断)
 *     如果当前锁资源可用则获取锁返回。
 *     如果当前锁资源不可用则阻塞直至出现如下两种情况：
 *        1.当前线程获取到锁资源。
 *        2.接收到中断命令，当前线程中断获取锁操作。
 */
void lockInterruptibly() throws InterruptedException;

/**
 * 非阻塞式获取锁：
 *    尝试非阻塞式获取锁，调用该方法获取锁立即返回获取结果。
 *    如果获取到了锁则返回true，反之返回flase。
 */
boolean tryLock();

/**
 * 非阻塞式获取锁：
 *   根据传入的时间获取锁，如果线程在该时间段内未获取到锁返回flase。
 *   如果当前线程在该时间段内获取到了锁并未被中断则返回true。
 */
boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
/**
 * 获取等待通知组件（该组件与当前锁资源绑定）：
 *    当前线程只有获取到了锁资源之后才能调用该组件的wait()方法，
 *    当前线程调用await()方法后，当前线程将会释放锁。
 */
Condition newCondition();
```

对比synchronized：

- 获取锁中断操作(synchronized关键字是不支持获取锁中断的)；
- 非阻塞式获取锁机制；
- 超时中断获取锁机制；
- 多条件等待唤醒机制Condition等。