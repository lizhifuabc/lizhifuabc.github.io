# MyBatis 批量插入

1. for 循环批量插入
2. 手动批量提交
3. 集合方式批量新增

## for 循环批量插入

```xml
<mapper namespace="XXXXXX">
    <insert id="insert">
        INSERT INTO XXXXXX (XXXXXX, XXXXXX)
        VALUES(#{XXXXXX}, #{XXXXXX})
    </insert>
</mapper>
```

```java
 for(int i = 0 ;i < 10000; i++) {
   Mapper.insert(XXXXXX);
 }   
```

耗时较高，不推荐

## 手动批量提交

```java
@Resource
private SqlSessionTemplate sqlSessionTemplate;
// 关闭自动提交
SqlSession sqlSession = sqlSessionTemplate.getSqlSessionFactory().openSession(ExecutorType.BATCH, false);

for(int i = 0 ;i < 10000; i++) {
   Mapper.insert(XXXXXX);
 }

sqlSession.commit();
```

耗时较高，不推荐。

##集合方式批量新增

```xml
<mapper namespace="XXXXXX">
    <insert id="insert">
        INSERT INTO XXXXXX (XXXXXX, XXXXXX)
        VALUES
      <foreach collection ="XXXXXX" item="XXXXXX" separator =",">
            (#{XXXXXX}, #{XXXXXX})
        </foreach>
    </insert>
</mapper>
```

推荐使用。