# SpringCloud分布式配置组件

[Spring Cloud Config官方文档](https://spring.io/projects/spring-cloud-config)

Spring Cloud Config ：将微服务的配置文件进行集中存储（例如 Git 、SVN 等），对配置进行统一管理。

主要包含两个部分：

- Server：分布式配置中心，是一个独立运行的微服务应用，用来配置仓库并为客户端提供获取配置信息、加密信息和解密信息的访问接口。
- Client：微服务架构中的各个微服务，从 Sever 中获取和加载配置信息。

## 创建 Git 仓库

这里使用码云：[拔土豆的程序员/spring-cloud-config (gitee.com)](https://gitee.com/lizhifu/spring-cloud-config)

文件内容：

```yml
server:
  version: 1.0
  ip: 127.0.0.1
```

## 配置中心

POM依赖：

```xml
<dependencies>
    <!--spring cloud config 服务端-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>
</dependencies>
```

配置文件：application.yml

```yml
server:
  port: 8888
  servlet:
    context-path: /spring-cloud-config-server
spring:
  cloud:
    config:
      server:
        git:
          # 码云（gitee）地址
          uri: https://gitee.com/lizhifu/spring-cloud-config.git
          # 避免使用临时目录，提高稳定性
          # 一些操作系统会定期清除临时目录
          basedir: target/config
          # 分支名称 git 上是 main
          default-label: master
          # 私有仓库需要填写用户名和密码
          # username: admin
          # password: admin
  application:
    name: spring-cloud-config-server
```

启动类：

```java
@SpringBootApplication
@EnableConfigServer  // 开启 Spring Cloud Config 配置中心功能
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

## 配置中心访问规则

Git文件内容：

```yml
server:
  version: 1.0
  ip: 127.0.0.1
```

http://127.0.0.1:8888/master/config-dev.yml

http://127.0.0.1:8888/config-dev.yml

```yml
server:
  version: 1.0
  ip: 127.0.0.1
```

http://127.0.0.1:8888/config/dev/master

```yml
{
	"name": "config",
	"profiles": ["dev"],
	"label": "master",
	"version": "2772187f4efd37d6e9d888f385e75ac570071552",
	"state": null,
	"propertySources": [{
		"name": "https://gitee.com/lizhifu/spring-cloud-config.git/config-dev.yml",
		"source": {
			"server.version": 1.0,
			"server.ip": "127.0.0.1"
		}
	}]
}
```

如下：

| 访问规则                                  | 示例                   |
| ----------------------------------------- | ---------------------- |
| /{application}/{profile}/{label}          | /config/dev/master     |
| /{application}-{profile}.{suffix}         | /config-dev.yml        |
| /{label}/{application}-{profile}.{suffix} | /master/config-dev.yml |

- {application}：应用名称，即配置文件的名称
- {profile}：环境名，例如开发（dev）、测试（test）、生产（prod）
- {label}：Git 分支名，默认是 master 分支，访问默认分支下的配置文件时，该参数可以省略
- {suffix}：配置文件的后缀

## 客户端 client

POM 依赖：

```xml
<dependencies>
    <!--Spring boot web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--Spring Cloud Config 客户端依赖-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
</dependencies>
```

配置文件：bootstrap.yml

```yml
# bootstrap.yml 是系统级别的，加载优先级高于 application.yml，负责从外部加载配置并解析
spring:
  cloud:
    config:
      # 分支名称
      label: master
      # 配置文件名称，config-dev.yml 中的 config
      name: config
      # 环境名  config-dev.yml 中的 dev
      profile: dev
      #Spring Cloud Config 服务端（配置中心）地址
      uri: http://127.0.0.1:8888/spring-cloud-config-server
  application:
    name: spring-cloud-config-client
```

配置文件：application.yml

```yml
server:
  port: 8889
  servlet:
    context-path: /spring-cloud-config-client
```

获取配置信息 Controller:

```java
@RestController
public class ConfigClientController {
    @Value("${server.version}")
    private String version;
    @Value("${server.ip}")
    private String ip;

    @GetMapping(value = "/getServer")
    public String getServer() {
        return "version：" + version + "ip：" + ip;
    }
}
```

请求地址：http://localhost:8889/spring-cloud-config-client/getServer



> 简单使用，实际生产需要加入注册中心或者替换成 nacos。
>
> 代码位置：[tomato-study/tomato-study-config · 拔土豆的程序员/tomato-cloud - 码云 - 开源中国 (gitee.com)](https://gitee.com/lizhifu/tomato-cloud/tree/master/tomato-study/tomato-study-config)