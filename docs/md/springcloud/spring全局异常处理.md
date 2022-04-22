# Spring boot 全局异常处理

Spring boot 下 restcontroller 进行异常处理。

## POM 

```xml
<!--  web 依赖  -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

- web应用程序包括，spring web和spring webmvc模块

- Tomcat 可以直接运行web应用程序

## Controller级别控制

@ExceptionHandler

