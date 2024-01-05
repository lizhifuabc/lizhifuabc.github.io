# 自定义异常响应配置

Spring Security中的异常主要分为两大类

- 认证异常（`AuthenticationException`），这个是所有认证异常的父类
- 权限异常（`AccessDeniedException`），这个是所有权限异常的父类



按照oauth协议，异常信息放在响应头中，响应头的key是**WWW-Authenticate**。

