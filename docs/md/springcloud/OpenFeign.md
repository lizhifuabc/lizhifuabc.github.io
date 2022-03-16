# OpenFeign

OpenFeign是springcloud在Feign的基础上支持了SpringMVC的注解，如`@RequestMapping`等等。OpenFeign的`@FeignClient`可以解析SpringMVC的`@RequestMapping`注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

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