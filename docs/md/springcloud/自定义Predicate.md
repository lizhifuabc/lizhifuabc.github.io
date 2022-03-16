# 自定义Predicate

指定用户路由到指定服务版本。

yml:

```yaml
 - id: tomato-demo2
          predicates:
            - Path=/api/demo/**
            - HeaderUserNo=123456
            # 注册到 nacos 中服务提供者的spring.application.name的值
          uri: lb://tomato-demo
          filters:
              # (截取掉- Path中的第一级路径/api)
              - StripPrefix= 1
```

自定义 Predicate:

```java
public class HeaderUserConfig {
    private List<String> userNo;

    public List<String> getUserNo() {
        return userNo;
    }

    public void setUserNo(List<String> userNo) {
        this.userNo = userNo;
    }
}
```

```java
@Component
@Slf4j
public class HeaderUserNoRoutePredicateFactory extends AbstractRoutePredicateFactory<HeaderUserConfig> {
    public static final String USER_NO = "UserNo";

    public HeaderUserNoRoutePredicateFactory() {
        super(HeaderUserConfig.class);
    }
    @Override
    public ShortcutType shortcutType() {
        return ShortcutType.GATHER_LIST;
    }
    @Override
    public List<String> shortcutFieldOrder() {
        return Collections.singletonList("userNo");
    }
    @Override
    public Predicate<ServerWebExchange> apply(HeaderUserConfig config) {
        List<String> userNos = config.getUserNo();
        return new GatewayPredicate() {
            @Override
            public boolean test(ServerWebExchange serverWebExchange) {
                // head 信息  predicates:    - HeaderUserNo=123456
                String userNo = serverWebExchange.getRequest().getHeaders().getFirst(USER_NO);
                log.info("自定义 Predicate 获取 userNo is {}",userNo);
                if (!StringUtils.isEmpty(userNo)) {
                    return userNos.contains(userNo);
                }
                return false;
            }
            @Override
            public String toString() {
                return String.format("Header: userNo=%s", config.getUserNo());
            }
        };
    }
}
```

