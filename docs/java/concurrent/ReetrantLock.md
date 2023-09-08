# ReetrantLock

公平锁指的是完全遵循FIFO原则的一种模式。也就代表着，在时间顺序上来看，公平锁模式下，先执行获取锁逻辑的线程就一定会先持有锁资源。同理，非公平锁则反之。

## NonfairSync非公平锁

1. AQS同步器对于同步状态标识state的管理是基于其内部FIFO双向链表的同步队列实现的。
2. 当一条线程获取锁失败时，AQS同步器会将该线程本身及其相关信息封装成Node节点加入同步队列，同时也会阻塞当前线程
3. 直至同步状态标识state被释放时，AQS才会将同步队列中头节点head内的线程唤醒，让其尝试修改state标识获取锁。

```java
// 构造函数：默认创建的锁属于非公平锁(NonfairSync)类型
public ReentrantLock() {
    sync = new NonfairSync();
}
// 构造函数：根据传入参数创建锁类型(true公平锁/false非公平锁)
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
// 加锁/获取锁操作
public void lock() {
     sync.lock();
}
```

```java
/**
 * 非公平锁类<Sync子类>
 */
static final class NonfairSync extends Sync {
    // 加锁
    final void lock() {
        // 执行CAS操作，修改同步状态标识获取锁资源
        // 因为存在多条线程同时修改的可能，所以需要用CAS操作保证原子性
        if (compareAndSetState(0, 1))
            // 成功则将独占锁线程设置为当前线程  
            setExclusiveOwnerThread(Thread.currentThread());
        else acquire(1); // 否则再次请求同步状态
    }
}
```

## FairSync公平锁





> https://juejin.cn/post/6977746796093112333#heading-4
