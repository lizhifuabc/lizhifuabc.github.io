# SpringBoot优雅停机

对应用进程发送停止指令之后能够保证正在执行的业务操作不受影响。

<img src="../../assets/img/%E4%BC%98%E9%9B%85%E5%81%9C%E6%9C%BA.png" alt="优雅停机" style="zoom:50%;" />

如何保障在停机请求之后，当前请求处理不影响，但是无法接受新的请求，等到全部的请求都处理完成之后，再进行停机。

## Linux常用的 kill 指令

- kill -15：kill指令默认就是-15，只是发送一个 SIGTERM 信号通知进程终止，由进程自行决定怎么做，即进程不一定会终止。
- kill -9：强制终止进程，进程会被立刻终止
- kill -2：类似 Ctrl+C 退出，会先保存相关数据再终止进程。

查找 PID 命令：ps -ef | grep -a java | grep 'TomatoStudySpringApplication'

```java
@RestController
public class ShutdownDemoController implements DisposableBean {
    @GetMapping("/shutdownDemo")
    public String shutdownDemo() throws InterruptedException {
        // 业务耗时处理流程
        Thread.sleep(5 * 1000L);
        return "hello";
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("destroy bean.....");
    }
}
```

 kill -2 和 kill -15（kill）会执行处理逻辑，而 kill -9 什么都不输出。

```java
destroy bean.....
```

## Spring boot 结合 kill -2

application.yml

```xml
server:
  # 启用优雅停机。graceful 优雅、优美。默认为 immediate 立刻终止
  shutdown: graceful

spring:
  lifecycle:
    # 设置优雅停机的缓冲时间
    # 缓冲时间用完了，不管请求有没有执行完毕，都会终止进程。
    timeout-per-shutdown-phase: 1s
```

测试代码：

```java
@RestController
public class ShutdownDemoController implements DisposableBean {
    @GetMapping("/shutdownDemo")
    public String shutdownDemo() throws InterruptedException {
        // 业务耗时处理流程
        Thread.sleep(15 * 1000L);
        return "hello";
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("destroy bean.....");
    }
}
```

使用 kill -2 模拟关闭过程（不能使用kill -9，使用kill -9会立刻杀死进程，优雅停机不会起作用）。

- 情况一：缓冲时间  > 业务耗时处理流程

  ```java
  # 收到 kill -2 的终止信号，开始优雅停机，不再接受新请求，等待正在处理的请求执行完毕
  2022-05-12 17:03:56.774  INFO 40738 --- [ionShutdownHook] o.s.b.w.e.tomcat.GracefulShutdown        : Commencing graceful shutdown. Waiting for active requests to complete
  # 当前请求处理完成，终止进程  
  2022-05-12 17:04:01.028  INFO 40738 --- [tomcat-shutdown] o.s.b.w.e.tomcat.GracefulShutdown        : Graceful shutdown complete
  destroy bean.....
  ```

- 情况二：缓冲时间 < 业务耗时处理流程

  ```java
  2022-05-12 17:05:38.848  INFO 40770 --- [ionShutdownHook] o.s.b.w.e.tomcat.GracefulShutdown        : Commencing graceful shutdown. Waiting for active requests to complete
  # 缓冲时间已到，但是请求没有处理完成，直接停机  
  2022-05-12 17:05:48.853  INFO 40770 --- [ionShutdownHook] o.s.c.support.DefaultLifecycleProcessor  : Failed to shut down 1 bean with phase value 2147483647 within timeout of 10000ms: [webServerGracefulShutdown]
  2022-05-12 17:05:48.859  INFO 40770 --- [tomcat-shutdown] o.s.b.w.e.tomcat.GracefulShutdown        : Graceful shutdown aborted with one or more requests still active
  destroy bean.....Spring boot 结合 kill -2
  ```

## Spring boot 结合 shutdown 端点

POM依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

application.yml

```xml
management:
  # 暴露actuator的全部全部端点
  endpoints:
    web:
      exposure:
        include: "*"
  # 启用shutdown端点，默认false
  endpoint:
    shutdown:
      enabled: true
```

POST 请求 /actuator/shutdown 端点即可关闭应用，作用和 kill -2 相同，也可以实现优雅停机。

```java
2022-05-12 17:15:56.014  INFO 40864 --- [      Thread-18] o.s.b.w.e.tomcat.GracefulShutdown        : Commencing graceful shutdown. Waiting for active requests to complete
2022-05-12 17:15:56.020  INFO 40864 --- [tomcat-shutdown] o.s.b.w.e.tomcat.GracefulShutdown        : Graceful shutdown complete
2022-05-12 17:15:56.021  INFO 40864 --- [      Thread-18] o.apache.catalina.core.StandardService   : Stopping service [Tomcat]
2022-05-12 17:15:56.023  INFO 40864 --- [      Thread-18] o.a.c.c.C.[Tomcat].[localhost].[/]       : Destroying Spring FrameworkServlet 'dispatcherServlet'
destroy bean.....
```

## web 服务器

| web 容器名称   | 行为说明                                 |
| -------------- | ---------------------------------------- |
| tomcat 9.0.33+ | 停止接收请求，客户端新请求等待超时。     |
| Reactor Netty  | 停止接收请求，客户端新请求等待超时。     |
| Undertow       | 停止接收请求，客户端新请求直接返回 503。 |

