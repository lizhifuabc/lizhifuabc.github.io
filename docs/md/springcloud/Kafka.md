# Kafka

Apache Kafka是一个分布式发布 - 订阅消息系统和一个强大的队列，可以处理大量的数据，并使您能够将消息从一个端点传递到另一个端点。 Kafka适合离线和在线消息消费。 Kafka消息保留在磁盘上，并在群集内复制以防止数据丢失。 Kafka构建在ZooKeeper同步服务之上。 它与Apache Storm和Spark非常好地集成，用于实时流式数据分析。

优势

- **可靠性** - Kafka是分布式，分区，复制和容错的。
- **可扩展性** - Kafka消息传递系统轻松缩放，无需停机。
- **耐用性** - Kafka使用分布式提交日志，这意味着消息会尽可能快地保留在磁盘上，因此它是持久的。
- **性能** - Kafka对于发布和订阅消息都具有高吞吐量。 即使存储了许多TB的消息，它也保持稳定的性能。

Kafka非常快，并保证零停机和零数据丢失。

# 安装

- 官网下载：https://kafka.apache.org/downloads
- 教程文档：https://www.w3cschool.cn/apache_kafka/

Mac 安装：

```shell
Last login: Mon Mar 21 10:33:15 on ttys001
➜  ~ brew install kafka
kafka 2.6.0_1 is already installed but outdated (so it will be upgraded).
==> Downloading https://ghcr.io/v2/homebrew/core/openjdk/manifests/17.0.2
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/openjdk/blobs/sha256:29512989f1
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sh
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/zookeeper/manifests/3.7.0_1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/zookeeper/blobs/sha256:6345ff0c
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sh
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/kafka/manifests/3.1.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/kafka/blobs/sha256:4de5988e8983
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sh
######################################################################## 100.0%
==> Upgrading kafka
  2.6.0_1 -> 3.1.0

==> Installing dependencies for kafka: openjdk and zookeeper
==> Installing kafka dependency: openjdk
==> Pouring openjdk--17.0.2.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/openjdk/17.0.2: 639 files, 305.4MB
==> Installing kafka dependency: zookeeper
==> Pouring zookeeper--3.7.0_1.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/zookeeper/3.7.0_1: 1,084 files, 42.4MB
==> Installing kafka
==> Pouring kafka--3.1.0.monterey.bottle.tar.gz
==> Caveats
To restart kafka after an upgrade:
  brew services restart kafka
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/kafka/bin/kafka-server-start /usr/local/etc/kafka/server.properties
==> Summary
🍺  /usr/local/Cellar/kafka/3.1.0: 198 files, 84.2MB
==> Running `brew cleanup kafka`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /usr/local/Cellar/kafka/2.6.0_1... (206 files, 62.6MB)
==> Caveats
==> kafka
To restart kafka after an upgrade:
  brew services restart kafka
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/kafka/bin/kafka-server-start /usr/local/etc/kafka/server.properties
➜  ~
```

路径：

```shell
# 安装路径
/usr/local/Cellar/kafka/3.1.0
/usr/local/Cellar/zookeeper/3.7.0_1
# 配置文件路径
/usr/local/etc/kafka/server.properties
/usr/local/etc/kafka/zookeeper.properties
```

启动：

```shell
# 进入到安装路径 
cd /usr/local/etc/kafka
#  启动
# zookeeper-server-start zookeeper.properties & 
zookeeper-server-start zookeeper.properties
# 查看是否启动成功
ps aux | grep zookeeper 
# 启动
# kafka-server-start server.properties & 
kafka-server-start server.properties
# 查看是否启动成功
ps aux | grep kafka 
```

