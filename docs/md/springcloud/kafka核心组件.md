# kafka

- 生产者：Producer 往 Kafka 集群生成数据 

- 消费者：Consumer 往 Kafka 里面去获取数据，处理数据、消费数据 ，Kafka 的数据是由消费者自己去拉去 Kafka 里面的数据 
- 主题：topic 
- 分区：partition 默认一个 topic 有一个分区（partition），自己可设置多个分区（分区分散存储在服务器不同节点上） 解决了一个海量数据如何存储的问题 例如：有 2T 的数据，一台服务器有 1T，一个 topic 可以分多个区，分别存储在多台服务器上，解决海量数据存储问题

## 架构

<img src="../../assets/img/image-20220322150830839.png" alt="image-20220322150830839" style="zoom:50%;" />

- Kafka 集群由多个 broker 组成，一个 kafka 服务器就是一个 broker。
- Topic 只是逻辑上的概念，partition 在磁盘上就体现为一个目录 Consumer Group：消费组，创建一个 topic可以划分为多个 partition，每个 partition 可以存在于不同的 broker 上，每个 partition 就放一部分数据。
- 写数据（Kafka 磁盘顺序写保证写数据性能）
  - 顺序写，往磁盘上写数据时，就是追加数据，没有随机写的操作。
    - 如果一个服务器磁盘达到一定的个数，磁盘也达到一定转数，往磁盘里面顺序写（追加写）数据的速度和写内存的速度差不多。
  - 生产者生产消息，经过 kafka 服务先写到 os cache 内存中，然后经过 sync 顺序写到磁盘上
    - 生产者就写 leader，然后 leader 将数据落地写本地磁盘
    - 其他 follower 自己主动从 leader 来 poll 数据
    - 所有 follower 同步好数据了，就会发送 ack 给 leader
    - leader 收到所有 follower 的 ack 之后，就会返回写成功的消息给生产者
  - 如果某个 broker 宕机了，这个 broker 上面的 partition 在其他机器上都有副本的。如果这个宕机的 broker 上面有某个 partition 的 leader，那么此时会从 follower 中**重新选举**一个新的 leader 出来，大家继续读写那个新的 leader 即可。这就有所谓的高可用性了。
- 读数据
  - 消费数据的时候，都必须指定一个 group id
    - 假定程序 A 和程序 B 指定的 group id 号一样，那么两个程序就属于同一个消费组。
    - 不同消费组之间没有影响。消费组需自定义，消费者名称程序自动生成（独一无二）
  - **消费**的时候，只会从 leader 去读
  - 但是只有当一个消息已经被所有 follower 都同步成功返回 ack 的时候，这个消息才会被消费者读到
- Controller：Kafka 节点里面的一个主节点。借助 zookeeper 进行注册和发现。

## 集群

在 Kafka 中，为实现「**数据备份**」的功能，保证集群中的某个节点发生故障时，该节点上的 Partition 数据不丢失，且 Kafka 仍然能够继续工作，**为此 Kafka 提供了副本机制，一个 Topic 的每个 Partition 都有若干个副本，一个 Leader 副本和若干个 Follower 副本**。

<img src="../../assets/img/kafka%E9%9B%86%E7%BE%A4.png" alt="kafka集群" style="zoom:50%;" />

## 消息生产流程

<img src="../../assets/img/image-20220323104423154.png" alt="image-20220323104423154" style="zoom:50%;" />

## 消息消费流程

<img src="../../assets/img/kafka%E6%B6%88%E6%81%AF%E6%B6%88%E8%B4%B9%E6%B5%81%E7%A8%8B.png" alt="kafka消息消费流程" style="zoom:50%;" />

1. 消费者发送请求给 kafka 服务
2. kafka 服务去 os cache 缓存读取数据（缓存没有就去磁盘读取数据）
3. 从磁盘读取了数据到 os cache 缓存中
4. os cache 直接将数据发送给网卡
5. 网卡将数据传输给消费者