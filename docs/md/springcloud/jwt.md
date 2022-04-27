# JWT

JWT 简称: JSON Web Token，又叫做 web 应用中的令牌。

- 服务端无需存储用户的认证信息
  - **注意：如果要实现退出和踢人，需要存储jwt的信息，常见是存储到 reids**

- 避免跨域

- 保证数据的安全性

## 组成

- 标头(Header)
  - 签名算法：例如 SHA256、HMAC等
  - 令牌的类型：JWT(一般是默认的)
- 载荷(Payload)
  - 自定义信息
  - Base64 编码
- 签名(Signature)
  - 秘钥
  - 算法类型
  - 加密标头和载荷

## 依赖

常用的有两个 jar ，选择一个即可

```xml
<!--  jwt 依赖      -->
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.19.1</version>
</dependency>
```

```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

## 使用例子

```java
public class JwtDemo {
    public static void main(String[] args) {
        String secret = "123456";

        Date date = new Date(System.currentTimeMillis() + 1000);
        Algorithm algorithm = Algorithm.HMAC256(secret);

        String token =  JWT.create()
                .withClaim("name", "张三")
                .withClaim("age", "18")
                // 设置过期时间
                .withExpiresAt(date)
                // 设置签名算法
                .sign(algorithm);
        System.out.println(token);

        // 校验 token
        JWT.require(Algorithm.HMAC256(secret)).build().verify(token);

        // 获取 token 中的载荷信息
        DecodedJWT jwt = JWT.decode(token);
        String name =  jwt.getClaim("name").asString();
        String age =  jwt.getClaim("age").asString();
        System.out.println(name);
        System.out.println(age);

        // 判断 token 是否过期
        boolean isExpired = jwt.getExpiresAt().before(new Date());
        System.out.println(isExpired);
    }
}
```

## spring boot 拦截器



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

```java
/**
 * jwt拦截器
 *
 * @author lizhifu
 * @date 2022/4/27
 */
public class AuthInterceptor implements HandlerInterceptor {
    private static final String SECRET = "lizhifu";
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("token");
        Map<String, Object> result = new HashMap<>();
        try {
            // 校验token,校验失败会抛出异常
            JWT.require(Algorithm.HMAC256(SECRET)).build().verify(token);
            return true;
        } catch (TokenExpiredException e) {
            result.put("code", "500");
            result.put("msg", "token已过期");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("msg", "token无效");
        }
        response.setContentType("application/json;charset=UTF-8");
        // 返回json
        response.getWriter().println(result);
        return false;
    }
}
```

```java
/**
 * jwt配置
 *
 * @author lizhifu
 * @date 2022/4/27
 */
@Component
public class AuthConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor())
                // 拦截所有请求
                .addPathPatterns("/**")
                // 排除路径
                .excludePathPatterns("/user/login");
    }
}
```