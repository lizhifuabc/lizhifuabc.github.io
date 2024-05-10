# select for update

总结：

1. select for update 除了有查询的作用外，还会加一个悲观锁。
2. 没用索引/主键的话就是表锁，否则就是是行锁。