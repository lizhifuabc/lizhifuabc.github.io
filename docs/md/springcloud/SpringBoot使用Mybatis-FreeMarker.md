# SpringBoot使用Mybatis-FreeMarker

MyBatis还是JPA，不在本文章的讨论范围之内，本文假设你使用的是mybatis，这里只是提供一种思路。

常规使用 mybatis：

- 代码生成器，mybatis-generator
  - 内容基本无法改动，会生成domain类、Example类、mapper映射文件，例如：张三新加了一个字段，然后重新生成了代码，如果合并代码的时候，稍微不留意，就会造成严重的问题。
  - 生成内容过多，有些方法和返回值其实并不需要，不能每次都去修改代码生成器。
  - 如果要使用，推荐只是第一次创建表结构的时候使用
- xml内写sql
  - sql 并不直观
  - 如果项目内存在代码审查，DBA无法真正的进行查看
- 使用第三方的mybatis封装包

**其实个人比较喜欢JPA，但是实践的机会不多，国内大多数的公司使用的还是mybatis**

## MyBatis FreeMarker

官方地址：http://mybatis.org/freemarker-scripting/

优点：

一个方法一个sql文件，方便DBA进行sql审核，简洁优雅。

缺点：

一个方法一个sql文件，如果数据库发生了更改，没有xml的方式更改起来方便。

其实这种方式的优点也是它的缺点。

POM依赖：

```xml
<!--  MyBatis的脚本语言配置功能  -->
<dependency>
    <groupId>org.mybatis.scripting</groupId>
    <artifactId>mybatis-freemarker</artifactId>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>

<!-- Mysql Connector -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

Mapper:

```java
@Mapper
public interface DemoMapper {
    @Insert("DemoMapper/insert.ftl")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(@Param("demo") Demo demo);
}
```

```xml
insert into demo(
    id,
    a1
)values (
    <@p name = "demo.id"/>,
    <@p name = "demo.a1"/>
)
```

写多了mybatis，发现这种写法反而是解放了个人的生产力，有问题也比较好查找。

## DEMO位置

https://gitee.com/lizhifu/tomato-cloud/tree/master/tomato-study/tomato-study-mybaits-script

