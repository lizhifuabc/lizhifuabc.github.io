# 分布式ID(全局唯一ID)

分库分表:

数据库进行分库分表，但分库分表后需要有一个唯一ID来标识一条数据，数据库的自增ID显然不能满足需求；特别一点的如订单、优惠券也都需要有唯一ID做标识。 

特性：

- 全局唯一：必须保证ID是全局性唯一的
- 高性能：高可用低延时，ID生成响应要块，否则反倒会成为业务瓶颈
- 高可用：100%的可用性是骗人的，但是也要无限接近于100%的可用性
- 趋势递增：最好趋势递增，检索时候方便有效，这个要求就得看具体业务场景了，一般不严格要求

## 常见算法

### UUID

组成：

- 当前日期和时间，UUID的第一个部分与时间有关，如果你在生成一个UUID之后，过几秒又生成一

  个UUID，则第一个部分不同，其余相同。

- 时钟序列。

- 全局唯一的IEEE机器识别号，如果有网卡，从网卡MAC地址获得，没有网卡以其他方式获得。

缺点：

- 字符串没有丝毫的意义
- 无序的，这种id作为主键会使得mysql产生裂页的问题，影响存储，减速性能

### 数据库自增ID

基于数据库的 auto_increment 自增ID完全可以充当 分布式ID 。

实现方式：一个单独的MySQL实例用来生成ID，让各个服务去调用获取。

优点：

- ID单调自增，数值类型查询速度快

缺点：

- DB单点存在宕机风险，无法扛住高并发场景。

### 数据库集群的方式

- 起始值
- 步长

```sql
-- 节点1
set @@auto_increment_offset = 1; -- 起始值 
set @@auto_increment_increment = 2; -- 步长
-- 节点2
set @@auto_increment_offset = 2; -- 起始值 
set @@auto_increment_increment = 2; -- 步长
-- 此时如果新增第三个节点
-- 节点1 和 节点2 可能需要停机。
```

缺点：不利于后续扩容，而且实际上单个数据库自身压力还是大，依旧无法满足高并发场景。

## 数据库号段模式(不依赖于第三方的情况下，比较推荐)

每次从数据库取出一个号段范围，并加载到内存。

```sql
CREATE TABLE id_generator (
  id int(10) NOT NULL, 
  max_id bigint(20) NOT NULL COMMENT '当前最大id', 
  step int(20) NOT NULL COMMENT '号段的布长', 
  biz_type int(20) NOT NULL COMMENT '业务类型', 
  version int(20) NOT NULL COMMENT '版本号',
  PRIMARY KEY (`id`) 
)
```

```sql
update id_generator set max_id = #{max_id+step}, version = version + 1 where version = # {version} and biz_type = XXX
```

## Redis

redis单独部署，而且redis天然可以支持很高的性能，单线程也能解决很多并发问题。利用 redis 的 incr 命令实现ID的原子性自增。

redis 有两种持久化方式 RDB 和 AOF ：

- RDB 会定时打一个快照进行持久化，假如连续自增但 redis 没及时持久化，而这会Redis挂掉了，重启Redis后会出现ID重复的情况。
- AOF 会对每条写命令进行持久化，即使 Redis 挂掉了也不会出现ID重复的情况，注意incr命令有上限，不能一直累加。而且因为redis内部没有数字类型，他其实是把字符串解释为64位有符号整数再做处理的，有点性能损耗。其范围自然也就是64位有符号整数能表示的范围了。

## 雪花算法

雪花算法（Snowflake）是twitter公司内部分布式项目采用的ID生成算法，开源后广受国内大厂的好评，在该算法影响下各大公司相继开发出各具特色的分布式生成器。



### 百度（uid-generator）

[baidu/uid-generator: UniqueID generator (github.com)](https://github.com/baidu/uid-generator)

### 美团（Leaf）

[Meituan-Dianping/Leaf: Distributed ID Generate Service (github.com)](https://github.com/Meituan-Dianping/Leaf)

### 滴滴（Tinyid）

[didi/tinyid: ID Generator id生成器 分布式id生成系统，简单易用、高性能、高可用的id生成系统 (github.com)](https://github.com/didi/tinyid)
