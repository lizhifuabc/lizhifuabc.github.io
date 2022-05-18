# PART1:SpringCloud项目初始化

项目地址：https://github.com/lizhifuabc/tomato-spring-cloud

相关版本：

- Java 17
- spring boot 2.6.7
- spring cloud 2021.0.2

## 创建项目

1. Git 上面创建项目

2. Idea 拉取项目

## 项目模块分包

```
com.tomato.cloud     
├── tomato-bom            									// 基础 bom 文件，管理整个项目的依赖版本
├── tomato-spring-boot-starter            	// 自定义 spring boot starter
├── tomato-gateway        									// 网关模块 [8080]
├── tomato-modules         									// 业务模块
│       └── tomato-module-sys               // 系统模块 [9201]
│       				└── tomato-module-sys-api 	// 对内 feign API
│       				└── tomato-module-sys-biz 	// 业务模块具体实现
├──pom.xml                									// 父POM
```

## 创建统一POM项目

tomato-bom 项目：基础 bom 文件，管理整个项目的依赖版本

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <groupId>com.tomato.cloud</groupId>
    <packaging>pom</packaging>
    <version>${revision}</version>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>tomato-bom</artifactId>
    <description>基础 bom 文件，管理整个项目的依赖版本</description>

    <properties>
        <revision>1.0-SNAPSHOT</revision>
    </properties>

</project>
```

**注意这个 POM 文件并没有设置 parent ，因为会产生 maven 循环依赖的问题。**

## spring cloud gateway

网关核心功能是路由转发，因此不要有耗时操作在网关上处理，让请求快速转发到后端服务上。

包括一下内容：

- 自定义 banner
- 
