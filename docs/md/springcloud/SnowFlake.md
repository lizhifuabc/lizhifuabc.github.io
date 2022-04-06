# 雪花算法

<img src="../../assets/img/snowflake%E7%AE%97%E6%B3%95.png" alt="snowflake算法" style="zoom:50%;" />

SnowFlake 中文意思为雪花，故称为雪花算法。最早是 Twitter 公司在其内部用于分布式环境下生成唯一 ID。

雪花算法原理就是生成一个的64bit的 long 类型的唯一 id。

- 雪花算法有以下几个优点：
  - 高并发分布式环境下生成不重复 id，每秒可生成百万个不重复 id。
  - 基于时间戳，以及同一时间戳下序列号自增，基本保证 id 有序递增。
  - 不依赖第三方库或者中间件。
  - 算法简单，在内存中进行，效率高。

雪花算法有如下缺点：

- 依赖服务器时间，服务器时钟回拨时可能会生成重复 id。算法中可通过记录最后一个生成 id 时的时间戳来解决，每次生成 id 之前比较当前服务器时钟是否被回拨，避免生成重复 id。

## 时钟回退

核心：睡一段时间

```java
    @SneakyThrows(InterruptedException.class)
    private boolean waitTolerateTimeDifferenceIfNeed(final long currentMilliseconds) {
        // 如果当前时间小于上次时间，则说明时钟回退了，这时需要等待时钟恢复后再继续生成id
        if (lastMilliseconds <= currentMilliseconds) {
            return false;
        }
        // 如果时钟回退了，则需要等待时钟恢复的时间为当前时间减去上次时间
        long timeDifferenceMilliseconds = lastMilliseconds - currentMilliseconds;
        Preconditions.checkState(timeDifferenceMilliseconds < MAX_TIME_DIFF,
                "时钟回退了，请等待时钟恢复, 上次时间 %d ms, 当前时间 %d ms", lastMilliseconds, currentMilliseconds);
        // 等待时钟恢复
        Thread.sleep(timeDifferenceMilliseconds);
        return true;
    }
```



## 毫秒内序列使用完成

核心：获取下一秒时间

```java
    /**
     * 获取下一秒
     * @param lastTime
     * @return
     */
    private long waitUntilNextTime(final long lastTime) {
        long result = timeService.getCurrentTime();
        while (result <= lastTime) {
            result = timeService.getCurrentTime();
        }
        return result;
    }
```

