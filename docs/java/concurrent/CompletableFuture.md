# CompletableFuture

`CompletableFuture` 是 Java 中的一个类，用于处理异步编程和并发操作。它引入了一种更容易管理异步任务和组合多个异步任务的方法，是 Java 8 引入的一部分，属于 Java 的并发工具包（`java.util.concurrent`）。

以下是 `CompletableFuture` 的一些主要特点和用途：

1. **异步编程**：`CompletableFuture` 允许你启动异步任务，而不需要等待任务完成。这对于执行网络请求、数据库查询、文件读写等可能耗时的操作特别有用。
2. **组合**：你可以将多个 `CompletableFuture` 实例组合在一起，以便在它们全部完成时执行某些操作。这种组合可以是顺序的，也可以是并行的，具体取决于你的需求。
3. **异常处理**：你可以轻松地处理异步操作中的异常。`CompletableFuture` 允许你添加异常处理器，以便在异步操作失败时采取适当的措施。
4. **回调**：你可以使用回调函数来处理异步操作的结果。这使得你能够指定在异步操作完成时要执行的代码。
5. **超时处理**：你可以为异步操作设置超时，以避免它们无限期地等待。如果操作在超时之前未完成，你可以执行一些回退操作。
6. **链式调用**：你可以使用方法链式调用的方式构建复杂的异步操作流程，使代码更具可读性和可维护性。

## 基本使用

```java
@Test
public void one() throws ExecutionException, InterruptedException {
    CompletableFuture completableFuture = new CompletableFuture();
    new Thread(()->{
        System.out.println("异步任务......");
        completableFuture.complete(Thread.currentThread().getName());
    }).start();
    // 主线程会被阻塞，等待任务执行结束后
    System.out.println("main线程获取执行结果：" + completableFuture.get());
    System.out.println("main线程结束");
}
```

```
异步任务......
main线程获取执行结果：Thread-0
main线程结束
```

主线程会被迫阻塞，等待任务执行结束。

## 创建异步任务

```java
// 创建一个没有返回值的异步任务
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static CompletableFuture<Void> runAsync(Runnable runnable,Executor executor);
// 创建一个具备返回值的异步任务
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier,Executor executor);
public static <U> CompletableFuture<U> completedFuture(U value);
```

默认使用`ForkJoinPool.commonPool()`线程池内的线程执行创建出的异步任务。

