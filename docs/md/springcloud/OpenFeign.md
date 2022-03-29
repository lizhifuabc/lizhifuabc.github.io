# OpenFeign

OpenFeign是springcloud在Feign的基础上支持了SpringMVC的注解，如`@RequestMapping`等等。OpenFeign的`@FeignClient`可以解析SpringMVC的`@RequestMapping`注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

## 开始

1. POM依赖

  ```xml
   <!-- SpringCloud Openfeign -->
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
  </dependency>

  <!-- SpringCloud Loadbalancer 负载均衡器-->
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
  </dependency>
  ```

2. 配置启用FeignClient：main入口的类上添加上`@EnableFeignClients`注解，指定包扫描的位置

   ```java
   @EnableFeignClients(basePackages = {
           "com.tomato.base.feign.api"
   })
   ```

3. 实际使用

   ```java
   @FeignClient(contextId = "remoteIdService",// 当你多个接口都使用了一样的name值，则需要通过contextId来进行区分
           value = ServiceNameConstants.ID_SERVICE, //应用名，其实就是spring.application.name，用于标识某个应用，并且能从注册中心拿到对应的运行实例信息
           fallbackFactory = RemoteIdFallbackFactory.class, // 降级服务处理
           path = "/api" // 请求的前缀
   )
   public interface RemoteIdService {
       @RequestMapping(value = "/id/get/{bizType}")
       Response getId(@PathVariable("bizType") String bizType);
   }
   
   ```

## 打印日志

```java
@FeignClient(contextId = "remoteDemoService", value = ServiceNameConstants.DEMO_SERVICE,configuration = FeignConfig.class)
public interface RemoteDemoService {
    @GetMapping("/demo/{name}")
    public String demo(@PathVariable("name") String name);
}
```

```java
@Configuration
public class FeignConfig {
    /**
     * 打印 feign 日志
     * @return
     */
    @Bean
    public Logger.Level loggerLevel(){
        // 这里记录所有，根据实际情况选择合适的日志level
        return Logger.Level.FULL;
    }
}
```

```yml
logging:
  level:
    org.mybatis: debug  # mybatis日志
    java.sql: debug   #输出sql
    org.springframework.web: trace   #输出的日志打印出来的最低级别。
    com.tomato.api.demo.feign.RemoteDemoService: debug
```

## HEADER 传输

- `token` 传输
- 需要透传`header`信息的场景，一般是出现在`租户ID`或者`请求ID`的场景下。

```java
@Component
public class FeignRequestInterceptor implements RequestInterceptor {
    private static final Pattern BEARER_TOKEN_HEADER_PATTERN =
            Pattern.compile("^Bearer (?<token>[a-zA-Z0-9-._~+/]+=*)$",
            Pattern.CASE_INSENSITIVE);
    @Override
    public void apply(RequestTemplate requestTemplate) {
        final String authorization = HttpHeaders.AUTHORIZATION;
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (Objects.nonNull(requestAttributes)) {
            String authorizationHeader = requestAttributes.getRequest().getHeader(HttpHeaders.AUTHORIZATION);
            Matcher matcher = BEARER_TOKEN_HEADER_PATTERN.matcher(authorizationHeader);
            if (matcher.matches()) {
                // 清除token头 避免传染
                requestTemplate.header(authorization);
                requestTemplate.header(authorization, authorizationHeader);
            }
        }

    }
}
```

```java
/**
 * Feign 配置注册
 * @author lizhifu
 */
@Configuration
public class FeignAutoConfiguration
{
    @Bean
    public RequestInterceptor requestInterceptor()
    {
        return new FeignRequestInterceptor();
    }
}
```



## httpclient

Feign在默认情况下使用的是JDK原生的**URLConnection**发送HTTP请求，没有连接池，但是对每个地址会保持一个长连接，即利用HTTP的persistence connection。

- 使用**ApacheHttpClient**

  - pom 增加依赖

    ```xml
    <!--     使用Apache HttpClient替换Feign原生httpclient-->
        <dependency>
          <groupId>org.apache.httpcomponents</groupId>
          <artifactId>httpclient</artifactId>
        </dependency>
        
        <dependency>
          <groupId>io.github.openfeign</groupId>
          <artifactId>feign-httpclient</artifactId>
        </dependency>
    ```
  
     - 开启 http client
  
       ```yml
       feign:
         client:
           httpclient:
             # 开启 Http Client
             enabled: true
       ```

- 使用**OkHttp**

  - pom

    ```xml
     <!-- okhttp 扩展 -->
            <dependency>
                <groupId>io.github.openfeign</groupId>
                <artifactId>feign-okhttp</artifactId>
            </dependency>
    ```

  - 开启

    ```properties
    feign.httpclient.enabled=false
    feign.okhttp.enabled=true
    ```

    

​		