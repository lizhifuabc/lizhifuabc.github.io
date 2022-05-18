# Spring boot 授权服务器器 OAuth2

Spring Security 5.2.x+ 只有资源服务器和客户端，并不包含授权服务器，官方推荐使用 spring-authorization-server。

## OAuth2

OAuth2授权流程中的各种角色：

- 资源拥有者（User） - 指应用的用户，通常指的是系统的登录用户
- 认证服务器 （Authorization Server）- 提供登录认证接口的服务器，比如：github登录、QQ登录、微信登录等
- 资源服务器 （Resources Server） - 提供资源接口及服务的服务器，比如：用户信息接口等。通常和认证服务器是同一个应用。
- 第三方客户端（Client） - 第三方应用，希望使用资源服务器提供的资源
- 服务提供商(Provider): 认证服务和资源服务归属于一个机构，该机构就是服务提供商

OAuth2 四种授权模式:

- 授权码模式（authorization_code）
- 简化模式（implicit）-- 基本已经弃用
- 密码模式（resource owner password credentials）
- 客户端模式（client_credentials）

## 应用架构

- gateway：网关服务

  作为 Oauth2 的资源服务、客户端服务使用，对访问微服务的请求进行统一的校验认证和鉴权操作

- auth：Oauth2认证服务，负责对登录用户进行认证

  Oauth2 的认证服务使用，并且网关服务的鉴权功能也需要依赖它

- api：受保护的 API 服务，用户鉴权通过后可以访问该服务



Spring Security 依赖：

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

三大模块依赖：

- 客户端（Client）

  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
  </dependency>
  ```

- 资源服务器（Resource Server）

  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
  </dependency>
  ```

- 授权服务器（spring-authorization-server）

  ```xml
  <dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-authorization-server</artifactId>
    <!--  截至现在版本  -->
    <version>0.2.3</version>
  </dependency>
  ```

## 授权模式

| 名称          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| url           | /oauth2/token                                                |
| Method        | POST                                                         |
| Content-Type  | application/x-www-form-urlencoded                            |
| Authorization | 格式为：Basic 。 为 base64 编码的 {client_id}:{client_secret}。 |



### 客户端凭据许可

**根据 OAuth2 规范，不会返回 refresh_token 。如果 token 过期，则重新发起申请获取一次就可以了。**

grant_type=client_credentials

第三方软件可以直接使用注册时的 client_id 和 client_secret 来换回访问令牌 token 的值。



## 授权码许可类型



## 资源拥有者凭据许可

grant_type=password
