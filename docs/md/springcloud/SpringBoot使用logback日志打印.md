# SpringBoot使用logback日志打印

不管是线上还是本地开发，日志是我们排查 bug 和调试程序的重要依据。

## 日志级别

日志级别：TRACE < DEBUG < INFO < WARN < ERROR，向上兼容，即日志级别为info，那么比他优先级高的日志也会输出。

- error：错误，一般需要配置监控；
- warn：警告，对业务影响不大，特殊情况下需要进行分析；
- info：信息，记录关键信息，如调用时间、出参入参等；
- debug：一般用于开发阶段，包含的数据会比较多；
- trace：最详细的日志信息，一般记录到文件中。

```java
public String demo(DemoReq req) {
    String result = "success";
    // 入参
    log.info("demo begin param:{}",req);
    try {
        Thread.sleep(1000);
    }catch(Exception e){
        // 记录关键信息，方便排查问题，因为 exception 内容较长，记录关键信息能够快速记录
        log.error("demo fail,name：{}",req.getName());
        log.error("demo fail,exception",e);
    }
    // 出参
    log.info("demo end param:{}",result);
    return result;
}
```

## SpringBoot配置Logback

Springboot框架已经整合了logback依赖，推荐使用logback-spring.xml 而不是 logback.xml。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--默认每隔一分钟扫描此配置文件的修改并重新加载-->
<!-- <configuration scan="true" scanPeriod="10 seconds"> -->
<configuration>
    <!-- 引用 Spring Boot 的 logback 基础配置 -->
    <!-- <include resource="org/springframework/boot/logging/logback/defaults.xml" /> -->
  
    <contextName>Logback For Boss</contextName>
    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
    <property name="log.path" value="F:/locakback" />
    <!-- 定义日志文件 输入位置 -->
    <property name="logDir" value="F:/logbak" />
    <!-- 日志最大的历史 30天 -->
    <property name="maxHistory" value="30" />


    <!-- 控制台输出日志 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger-%msg%n</pattern>
            <charset class="java.nio.charset.Charset">UTF-8</charset>
        </encoder>
    </appender>


    <!-- ERROR级别日志 -->
    <appender name="ERROR"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${logDir}\%d{yyyyMMdd}\error.log</fileNamePattern>
            <maxHistory>${maxHistory}</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -
                %msg%n</pattern>
            <charset class="java.nio.charset.Charset">UTF-8</charset>
        </encoder>
        <append>false</append>
        <prudent>false</prudent>
    </appender>

    <!-- WARN级别日志 -->
    <appender name="WARN"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>WARN</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${logDir}\%d{yyyyMMdd}\warn.log</fileNamePattern>
            <maxHistory>${maxHistory}</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger-%msg%n</pattern>
            <charset class="java.nio.charset.Charset">UTF-8</charset>
        </encoder>
        <append>false</append>
        <prudent>false</prudent>
    </appender>

    <!-- INFO级别日志 -->
    <appender name="INFO"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${logDir}\%d{yyyyMMdd}\info.log</fileNamePattern>
            <maxHistory>${maxHistory}</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger-%msg%n</pattern>
            <charset class="java.nio.charset.Charset">UTF-8</charset>
        </encoder>
        <append>false</append>
        <prudent>false</prudent>
    </appender>

    <!-- DEBUG级别日志 -->
    <appender name="DEBUG"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>DEBUG</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${logDir}\%d{yyyyMMdd}\debug.log</fileNamePattern>
            <maxHistory>${maxHistory}</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger-%msg%n</pattern>
            <charset class="java.nio.charset.Charset">UTF-8</charset>
        </encoder>
        <append>false</append>
        <prudent>false</prudent>
    </appender>
    
     <!--文件日志， 按照每天生成日志文件 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${logDir}/%d{yyyyMMdd}/boss.%d{yyyy-MM-dd}.log</FileNamePattern>
            <!--日志文件保留天数-->
            <MaxHistory>30</MaxHistory>
        </rollingPolicy>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
        <!--日志文件最大的大小-->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <!-- 异步输出 -->
    <appender name="dayLogAsyncAppender" class="ch.qos.logback.classic.AsyncAppender">
        <includeCallerData>true</includeCallerData>
        <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
        <discardingThreshold>0</discardingThreshold>
        <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
        <queueSize>512</queueSize>
        <appender-ref ref="FILE"/>
    </appender>

    <!--专为 spring 定制 -->
    <logger name="org.springframework" level="info"/>
    <!-- show parameters for hibernate sql 专为 Hibernate 定制 -->
    <logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" />
    <logger name="org.hibernate.type.descriptor.sql.BasicExtractor" level="DEBUG" />
    <logger name="org.hibernate.SQL" level="DEBUG" />
    <logger name="org.hibernate.engine.QueryParameters" level="DEBUG" />
    <logger name="org.hibernate.engine.query.HQLQueryPlan" level="DEBUG" />

    <!--myibatis log configure-->
    <!-- 
    <logger name="com.apache.ibatis" level="TRACE"/>
    <logger name="java.sql.Connection" level="DEBUG"/>
    <logger name="java.sql.Statement" level="DEBUG"/>
    <logger name="java.sql.PreparedStatement" level="DEBUG"/>
     -->
    <!-- root级别 DEBUG -->
    <root level="INFO">
        <!-- 控制台输出 -->
        <appender-ref ref="STDOUT" />
        <!-- 文件输出 -->
        <appender-ref ref="ERROR" />
        <appender-ref ref="INFO" />
        <appender-ref ref="WARN" />
        <appender-ref ref="DEBUG" />
    </root>
</configuration>
```

## 多配置文件logback-spring.xml

实际生产中需要根据不同的环境，使用不同的配置文件。例如：logback-dev.xml，logback-prod.xml

application.yml

```xml
# Spring 配置
spring:
  # 开启配置文件，默认配置在 POM 文件中
  profiles:
    active: @profiles.active@
# 日志配置
logging:
  config: classpath:logback-@profiles.active@.xml
```

POM

```xml
    <profiles>
        <profile>
            <!-- 开发环境 -->
            <id>dev</id>
            <properties>
                <profiles.active>dev</profiles.active>
            </properties>
            <activation>
                <!-- 默认激活 -->
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <!-- 生产环境 -->
            <id>prod</id>
            <properties>
                <profiles.active>prod</profiles.active>
            </properties>
        </profile>
    </profiles>

    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <excludes>
                    <!-- 存在的环境配置，如果不写那么就会把没写配置也打包进去 -->
                    <exclude>application-*.yml</exclude>
                    <exclude>logback-*.xml</exclude>
                    <exclude>jwt-*.yml</exclude>
                </excludes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>application.yml</include>
                    <include>application-${profiles.active}.yml</include>
                    <include>logback-${profiles.active}.xml</include>
                    <include>jwt-${profiles.active}.yml</include>
                </includes>
            </resource>
        </resources>
    </build>
```