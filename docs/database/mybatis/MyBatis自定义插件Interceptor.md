# MyBatis自定义插件Interceptor

拦截器是一种基于 AOP（面向切面编程）的技术，它可以在目标对象的方法执行前后插入自定义的逻辑。MyBatis 定义了四种类型的拦截器，分别是：

- Executor：拦截执行器的方法，例如 update、query、commit、rollback 等。可以用来实现缓存、事务、分页等功能。
- ParameterHandler：拦截参数处理器的方法，例如 setParameters 等。可以用来转换或加密参数等功能。
- ResultSetHandler：拦截结果集处理器的方法，例如 handleResultSets、handleOutputParameters 等。可以用来转换或过滤结果集等功能。
- StatementHandler：拦截语句处理器的方法，例如 prepare、parameterize、batch、update、query 等。可以用来修改 SQL 语句、添加参数、记录日志等功能。

## 应用场景

- SQL 语句执行监控：可以拦截执行的 SQL 方法，打印执行的 SQL 语句、参数等信息，并且还能够记录执行的总耗时，可供后期的 SQL 分析时使用。
- SQL 分页查询：MyBatis 中使用的 RowBounds 使用的内存分页，在分页前会查询所有符合条件的数据，在数据量大的情况下性能较差。通过拦截器，可以在查询前修改 SQL 语句，提前加上需要的分页参数。
- 公共字段的赋值：在数据库中通常会有 createTime ， updateTime 等公共字段，这类字段可以通过拦截统一对参数进行的赋值，从而省去手工通过 set 方法赋值的繁琐过程。
- 数据权限过滤：在很多系统中，不同的用户可能拥有不同的数据访问权限，例如在多租户的系统中，要做到租户间的数据隔离，每个租户只能访问到自己的数据，通过拦截器改写 SQL 语句及参数，能够实现对数据的自动过滤。
- SQL 语句替换：对 SQL 中条件或者特殊字符进行逻辑替换。



参考：

https://mp.weixin.qq.com/s/ZBrTlHRx8Bseq7gLQeQ_Kw