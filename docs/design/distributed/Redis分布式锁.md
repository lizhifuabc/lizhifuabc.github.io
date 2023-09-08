# Redis分布式锁

1. **使用SETNX命令设置锁**：
   - 使用Redis的`SETNX`（Set If Not Exists）命令来尝试在Redis中设置一个键值对，其中键表示要锁定的资源或操作，值可以是一个唯一的标识符，如请求者的标识符或随机生成的唯一标识符。
   - 如果`SETNX`成功，表示锁定成功，返回1。如果键已存在，表示锁定失败，返回0。
2. **设置锁的过期时间**：
   - 为了避免死锁，必须为锁设置一个过期时间（锁的自动释放时间）。
   - 使用Redis的`EXPIRE`或`PEXPIRE`命令为锁设置过期时间，以确保即使锁未被显式释放，也会在一定时间后自动释放。
3. **释放锁**：
   - 当进程完成对资源的访问时，应该使用`DEL`命令或`UNLINK`命令（在Redis 4.0之后的版本中可用）来删除锁，以释放资源并允许其他进程获得锁。
4. **处理竞争条件**：
   - 在使用`SETNX`命令时，要处理竞争条件，确保只有持有锁的进程才能释放锁。可以使用Lua脚本来原子性地检查键是否存在并删除它。

```java
private static void releaseLock(String lockKey, String lockValue) {
      // 使用Lua脚本来原子性地检查并释放锁
      String releaseScript = 
          "if redis.call('GET', KEYS[1]) == ARGV[1] then " +
          "   return redis.call('DEL', KEYS[1]) " +
          "else " +
          "   return 0 " +
          "end";
  }
```

## 总结

实现思路：

1. 获取锁的时候，使用setnx加锁，并使用expire命令为锁添加—个超时时间，超过该时间则自动释放锁，锁的value值为一个随机生成的UUID，通过此在释放锁的时候进行判断。

2. 获取锁的时候还设置一个获取的超时时间，若超过这个时间则放弃获取锁。

3. 释放锁的时候，通过UUID判断是不是该锁，若是该锁，则执行delete进行锁释放。

> 实际当中，不会使用setNx去实现，因为太麻烦，要考虑死锁问题、释放锁问题。
>
> 一般会使用Redisson框架，专门来处理redis的分布式相关问题。
