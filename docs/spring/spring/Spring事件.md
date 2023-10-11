# Spring事件



## @EventListener 

监听器只需要 在方法上声明为 EventListener注解，Spring就会自动找到对应的监听器。Spring会根据方法入参的事件类型和发布的事件类型自动匹配。

服务关闭期间：

1. **事件发布成功**：发布事件的过程是同步的，因此在事件发布成功之前，应用程序不会继续执行。因此，如果事件发布成功，则意味着事件已被传递到所有的事件监听器。
2. **监听器无法完成处理**：如果在事件监听器处理事件期间关闭了应用程序，监听器可能无法完成其正常的事件处理逻辑。这可能会导致未完成的操作、资源泄漏或不一致的状态，具体取决于监听器中的操作和应用程序的设计。

解决办法：

1. 优雅停机：并不能完全消除在关闭期间可能发生的问题。如果某些操作耗时很长，或者事件监听器中的操作不受控制，仍然可能在关闭期间引发问题。
2. 责任链模式了，for循环订阅的策略类。

```java
public interface EventSubscriber {
    void subscribe(Event event, EventSubscriber nextSubscriber);
    void handleEvent(Event event);
}

public class ConcreteEventSubscriber implements EventSubscriber {
    private EventSubscriber nextSubscriber;

    @Override
    public void subscribe(Event event, EventSubscriber nextSubscriber) {
        this.nextSubscriber = nextSubscriber;
    }

    @Override
    public void handleEvent(Event event) {
        // 处理事件
        if (nextSubscriber != null) {
            nextSubscriber.handleEvent(event);
        }
    }
}
```

