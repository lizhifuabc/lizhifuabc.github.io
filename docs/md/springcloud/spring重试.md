# Spring boot 重试

通过 spring-retry 注解，在不入侵原有业务逻辑代码的方式下，优雅的实现重处理功能。

@Retryable

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Retryable {
    String recover() default "";
		// 重试拦截器bean名称，用于可重试方法
    String interceptor() default "";
		// 指定异常进行重试
    Class<? extends Throwable>[] value() default {};
		// 和value一样,exclude也为空时，所有异常都重试
    Class<? extends Throwable>[] include() default {};
		// 指定异常不重试
    Class<? extends Throwable>[] exclude() default {};
		// 统计报告的唯一标签
    String label() default "";
		// 若为true，标志重试是有状态的：即重新抛出异常，
    boolean stateful() default false;
		// 重试次数(包括第一次失败)，默认3
    int maxAttempts() default 3;
		// 计算最大尝试次数(包括第一次失败)的表达式，默认为3次
    String maxAttemptsExpression() default "";
		// 重试等待策略
    Backoff backoff() default @Backoff;
		// 指定在SimpleRetryPolicy.canRetry()返回true之后要求值的表达式-可用于有条件地禁止重试。
    String exceptionExpression() default "";
		// 要使用的重试侦听器的Bean名称，而不是Spring上下文中定义的默认侦听器。
    String[] listeners() default {};
}
```

```java
Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Backoff {
    // 隔多少毫秒后重试
    long value() default 1000L;
		// 重试之间的等待时间(以毫秒为单位),和value一样，但是默认为0；
    long delay() default 0L;
		// 重试之间的最大等待时间(以毫秒为单位)
    long maxDelay() default 0L;
		// （指定延迟倍数）默认为0，固定暂停1秒后进行重试，如果把multiplier设置为1.5，则第一次重试为2秒，第二次为3秒，第三次为4.5秒。
    double multiplier() default 0.0;
		// 重试之间的等待时间表达式
    String delayExpression() default "";
		// 重试之间的最大等待时间表达式
    String maxDelayExpression() default "";
		// 指定延迟的倍数表达式
    String multiplierExpression() default "";
		// 随机指定延迟时间
    boolean random() default false;
}
```

## 简单使用

```xml
<!-- spring 重试依赖       -->
<dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
</dependency>
<!-- spring aop 依赖       -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

```java
@SpringBootApplication
@EnableRetry // 开启重试功能
public class TomatoStudyRetryApplication {
    public static void main(String[] args){
        SpringApplication.run(TomatoStudyRetryApplication.class, args);
        System.out.println("开启重试功能 服务启动成功");
    }
}
```

```java
@Slf4j
@Service
public class RetryDemoServiceImpl implements RetryDemoService {

    @Override
    @Retryable(value = Exception.class,maxAttempts = 3,backoff = @Backoff(delay = 2000,multiplier = 1.5))
    public String retryDemo(boolean isRetry) {
        log.info("通知下游系统");
        if (isRetry) {
            throw new RuntimeException("通知下游系统异常");
        }
        return "retryDemo";
    }

    @Recover
    public String recover(Exception e, boolean isRetry){
        log.info("执行回调方法");
        return "retryDemo2";
    }
}
```

```java
@SpringBootTest
public class RetryDemoTest {
    @Resource
    private RetryDemoService retryDemoService;
    @Test
    public void test() {
        String s = retryDemoService.retryDemo(true);
        System.out.println(s);
    }
}
```

## Recover

如果不想抛出异常，或者需要再重试之后进行进一步处理，则需要@Recover 注解

- 方法的返回值必须与 @Retryable 方法一致
- 方法的第一个参数，必须是 Throwable 类型的，建议是与 @Retryable 配置的异常一致，其他的参数，需要哪个参数，写进去就可以了（@Recover 方法中有的）
- 该回调方法与重试方法写在同一个实现类里面



> 代码位置：https://gitee.com/lizhifu/tomato-cloud/tree/master/tomato-study/tomato-study-retry