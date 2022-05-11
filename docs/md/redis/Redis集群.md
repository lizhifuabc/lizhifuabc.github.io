# Redis集群

Redis 集群实现了对Redis的水平扩容，即启动N个redis节点，将整个数据库分布存储在这N个节点中，每个节点存储总数据的1/N。

Redis 集群通过分区（partition）来提供一定程度的可用性（availability）： 即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。

##  哨兵模式

哨兵模式因为sentinel的存在, 可以定时向redis主从架构发送心跳包, 并且在出现主节点宕机的时候, 选举出一个从节点作为对外服务的窗口,从而解决Redis宕机的问题。    

但是因为只有一个写节点,所以支持的并发量并不高(5-10W的QPS),并且单机的内存并不大(单机Redis <10G)。 并且存在主从切换的瞬间访问瞬断的风险。

<img src="../../assets/img/Redis%20%E5%93%A8%E5%85%B5%E6%A8%A1%E5%BC%8F-2240235.png" alt="Redis 哨兵模式" style="zoom:50%;" />

## Redis Cluster（集群）

Redis Cluster 是一种分布式去中心化的运行模式，是在 Redis 3.0 版本中推出的 Redis 集群方案，它将数据分布在不同的服务器上，以此来降低系统对单主节点的依赖，从而提高 Redis 服务的读写性能。

主从节点群组成的分布式服务器群，它具有复制、高可用和分片特性。Redis集群不需 要sentinel哨兵也能完成节点移除和故障转移的功能。可以部分解决哨兵模式的瞬断问题。

<img src="../../assets/img/Redis%20Cluster%EF%BC%88%E9%9B%86%E7%BE%A4%EF%BC%89.png" alt="Redis Cluster（集群）" style="zoom:50%;" />

Redis集群脑裂问题：

redis集群没有过半机制会有脑裂问题，网络分区导致脑裂后多个主节点对外提供写服务，一旦网络分区恢复，会将其中一个主节点变为从节点，这时会有大量数据丢失。

<img src="../../assets/img/Redis%E9%9B%86%E7%BE%A4%E8%84%91%E8%A3%82.png" alt="Redis集群脑裂" style="zoom:50%;" />

解决方案: （不能完全保障数据不丢失）
min-slaves-to-write ：1

含义： 如果配置了min-slaves-to-write，健康的slave的个数小于配置项N，mater就禁止写入。

master最少得有多少个健康的slave存活才能执行写命令。这个配置虽然不能保证N个slave都一定能接收到master的写操作，但是能避免没有足够健康的slave的时候，master不能写入来避免数据丢失 。

设置为0关闭该功能。


