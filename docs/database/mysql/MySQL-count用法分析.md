# MySQL count用法分析

- count(*)：所有列，相当于行数，不会忽略列值为 NULL。
- count(1)：忽略所有列，用 1 代表代码行，每行固定值1，也是行数加1；不会忽略列值为 NULL
- count(列名)：只包括列名那一列，忽略列值为空（NULL）的计数。

执行速度：count(*) ≈ count(1) > count(id) > count(普通索引列) > count(未加索引列)

- count(主键) > count(1)
- count(1) > count(非主键)
- 如果表多个列并且没有主键， count(1) > count(*)
- 如果有主键，则 select count（主键）的执行效率是最优的
- 如果表只有一个字段，则 select count 最优。

总结：不要使用 count(列名) 或 count(常量) 来替代 count(*) 。是 SQL92 定义的标准统计行 数的语法，跟数据库无关，跟 NULL 和非 NULL 无关。

## 延伸

```sql
SELECT 1 FROM table WHERE a = 1 AND b = 2 LIMIT 1
```

```java
Integer exist = xxDao.existXxxxByXxx(params);
if ( exist != NULL ) {
  // 存在
} else {
  // 不存在
}
```
