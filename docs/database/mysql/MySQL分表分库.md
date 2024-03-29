# MySQL分表分库

## 水平切分

水平切分又称为 Sharding，它是将同一个表中的记录拆分到多个结构相同的表中。

当一个表的数据不断增多时，Sharding 是必然的选择，它可以将数据分布到集群的不同节点上，从而缓存单个数据库的压力。

![image-20230905164333020](image/image-20230905164333020.png)

## 垂直切分

垂直切分是将一张表按列切分成多个表，通常是按照列的关系密集程度进行切分，也可以利用垂直切分将经常被使用的列和不经常被使用的列切分到不同的表中。

![image-20230905164413270](image/image-20230905164413270.png)

## 拆分策略

- 哈希取模: hash(key) % NUM_DB
- 范围: 可以是 ID 范围也可以是时间范围
- 映射表: 使用单独的一个数据库来存储映射关系

## 问题及解决方案

1. 事务问题

使用分布式事务来解决，比如 XA 接口。

2. join
可以将原来的 JOIN 分解成多个单表查询，然后在用户程序中进行 JOIN。

3. ID 唯一性

- 使用全局唯一 ID: GUID
- 为每个分片指定一个 ID 范围
- 分布式 ID 生成器 (如 Twitter 的 Snowflake 算法)



> 参考材料：
>
> https://pdai.tech/md/db/sql-mysql/sql-mysql-devide.html