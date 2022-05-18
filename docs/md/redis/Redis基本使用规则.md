# Redis基本使用规则

## 合适的持久化策略



## 选用合适的数据结构

Redis有5种基础数据结构，分别为:String(字符串)，list(列表)，hash(字典)，set(集合)和zset(有序集合)。

还有三种特殊的数据结构类型:Geospatial、Hyperloglog、Bitmap。

<img src="../../assets/img/Redis%205%E7%A7%8D%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.png" alt="Redis 5种数据结构" style="zoom:50%;" />

HyperLogLog：基数统计，比如PV，UV的统计，不适合精确统计。
BitMap：适合状态的统计，比如签到打卡，要么打卡了，要么未打卡。