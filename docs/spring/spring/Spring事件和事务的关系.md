# Spring事件和事务的关系

Spring事务与ApplicationEventPublisher。

代码地址：[spring-learn/spring-boot-event at main · lizhifuabc/spring-learn (github.com)](https://github.com/lizhifuabc/spring-learn/tree/main/spring-boot-event)

```java
@Transactional(rollbackFor = Exception.class)
public void publishWithTransactional() {
    Account account = new Account();
    account.setName("lizhifu1");
    account.setPassword("123456");

    log.info("事务发送事件");
    accountRepository.save(account);

    AccountEvent accountEvent = new AccountEvent(account);
    events.publishEvent(accountEvent);

    account = new Account();
    account.setName("lizhifu2");
    account.setPassword("123456");
    accountRepository.save(account);
}
```

## 发送事件非异步

```java
@Slf4j
@Component
public class AccountEventListener {
    @EventListener(AccountEvent.class)
    public void onApplicationEvent(AccountEvent event) {
        log.info("AccountEventListener 监听事件:{}",event.getSource());
        throw new RuntimeException("AccountEventListener");
    }
}
```

此时数据都会回滚。

## 发送事件异步执行

```java
@SpringBootApplication
@EnableAsync
public class SpringBootLogCustomApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootLogCustomApplication.class);
    }
}

```

```java
@Slf4j
@Component
public class AccountEventListener {
    @EventListener(AccountEvent.class)
    @Async
    public void onApplicationEvent(AccountEvent event) {
        log.info("AccountEventListener 监听事件:{}",event.getSource());
        throw new RuntimeException("AccountEventListener");
    }
}
```

数据全部插入成功。

## @TransactionalEventListener

```java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@EventListener //类似注解继承
public @interface TransactionalEventListener {
	// 值：BEFORE_COMMIT、AFTER_COMMIT、AFTER_ROLLBACK、AFTER_COMPLETION
	// 需要注意的是：AFTER_COMMIT + AFTER_COMPLETION是可以同时生效的
	// AFTER_ROLLBACK + AFTER_COMPLETION是可以同时生效的
	TransactionPhase phase() default TransactionPhase.AFTER_COMMIT;

	// 表明若没有事务的时候，对应的event是否需要执行，默认值为false表示，没事务就不执行了。
	boolean fallbackExecution() default false;

	// 使用@AliasFor的能力，放到了@EventListener身上
	// 注意：一般建议都需要指定此值，否则默认可以处理所有类型的事件，范围太广了。
	@AliasFor(annotation = EventListener.class, attribute = "classes")
	Class<?>[] value() default {};
	@AliasFor(annotation = EventListener.class, attribute = "classes")
	Class<?>[] classes() default {};
	
	String condition() default "";
}
```

```java
public enum TransactionPhase {
   // 在事务commit之前执行
   BEFORE_COMMIT,

   // 在事务commit之后执行
    AFTER_COMMIT,

    // 在事务rollback之后执行
    AFTER_ROLLBACK,

   // 在事务完成时执行，这里的完成是指无论事务是成功提交还是事务回滚了
   AFTER_COMPLETION
  }
```

### 指定TransactionPhase

```java
@Transactional(rollbackFor = Exception.class)
    public void publishWithTransactional() {
        Account account = new Account();
        account.setName("lizhifu1");
        account.setPassword("123456");

        log.info("事务发送事件");
        accountRepository.save(account);

        AccountEvent accountEvent = new AccountEvent(account);
        events.publishEvent(accountEvent);

        account = new Account();
        account.setName("lizhifu2");
        account.setPassword("123456");
        accountRepository.save(account);

        throw new RuntimeException("publishWithTransactional");
    }
}
```

```java
@Slf4j
@Component
public class AccountEventListener {
    @Async
    @TransactionalEventListener(value = AccountEvent.class,phase = TransactionPhase.AFTER_COMMIT)
    public void onApplicationEvent(AccountEvent event) {
        log.info("AccountEventListener 监听事件:{}",event.getSource());
        throw new RuntimeException("AccountEventListener");
    }
}
```

此时虽然添加了@Async，但是由于制定了TransactionPhase为AFTER_COMMIT，所以方法不执行。