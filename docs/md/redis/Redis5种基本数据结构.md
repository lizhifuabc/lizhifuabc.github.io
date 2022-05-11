# Redis5种基本数据结构

Redis有5种基础数据结构，分别为:String(字符串)，list(列表)，hash(字典)，set(集合)和zset(有序集合)。

还有三种特殊的数据结构类型:Geospatial、Hyperloglog、Bitmap。

<img src="../../assets/img/Redis%205%E7%A7%8D%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.png" alt="Redis 5种数据结构" style="zoom:50%;" />

## String(字符串)

String 类型是 Redis 中最基本、最常用的数据类型。String 类型在 Redis 中是二进制安全(binary safe)的,这意味着 String 值关心二进制的字符串，不关心具体格式，你可以用它存储 json 格式或 JPEG 图片格式的字符串。