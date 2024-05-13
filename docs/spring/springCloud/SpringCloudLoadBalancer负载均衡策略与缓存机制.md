# Spring Cloud LoadBalancer 负载均衡策略

[Cloud Native Applications (spring.io)](https://docs.spring.io/spring-cloud-commons/docs/current/reference/html/#spring-cloud-loadbalancer)

LoadBalancer（负载均衡器）是一种用来分发网络或应用程序流量到多个服务器的技术。它可以防止任何单一服务的过载，通过分散负载来保持整个系统的平稳运行，保证系统的高可用性和可靠性。

负载均衡策略大体上分为两类：服务端的负载均衡和客户端的负载均衡。

- 服务端负载均衡 （如 Nginx、F5）：

​		请求先到达一个中介（如负载均衡器设备或者服务，例如Nginx），由这个中介根据配置的策略将请求分发到后端的多个服务器中。		它对客户端是透明的，即客户端不需要知道有多少服务器以及它们的存在。

- 客户端负载均衡 （如 Ribbon、Spring Cloud LoadBalancer）

  请求的分配逻辑由客户端持有，客户端直接决定将请求发送到哪一个服务器。也就是说在客户端负载均衡中，客户端通常具备一份服务列表，它知道每个服务的健康状况，基于这些信息和负载均衡策略，客户端会选择一个最适合的服务去发送请求。

## 常见的负载均衡策略

- 轮询（Round Robin）
  描述：轮询是最简单的负载均衡策略，它按顺序将每个新请求分配给下一个服务器。当到达列表末尾时，它会重新开始。
  使用场景：适用于服务器性能相似且负载相对均衡的情况。
- 加权轮询（Weighted Round Robin）
  描述：与轮询类似，但给每个服务器分配一个权重。服务器的权重越高，分配给该服务器的请求就越多。
  使用场景：适用于服务器性能不均或希望给特定服务器更多流量的情况。
- 随机（Random）
  描述：随机选择一个服务器来处理新的请求。
  使用场景：适用于服务器数量较多且请求分布均匀的场景。
- 加权随机（Weighted Random）
  描述：类似于随机策略，但考虑服务器的权重。权重越高的服务器被选中的概率越大。
  使用场景：当服务器性能不均匀时，希望根据性能分配不同的请求量。
- 最小连接（Least Connections）
  描述：选择当前连接数最少的服务器来处理新的请求。这种方法考虑了服务器的当前负载。
  使用场景：适用于请求处理时间波动较大的场景。
- 加权最小连接（Weighted Least Connections）
  描述：与最小连接策略类似，但考虑了服务器的权重和当前连接数。
  使用场景：当服务器性能不同且请求处理时间不一致时使用。
- 基于资源（Resource Based）
  描述：根据服务器的实际资源使用情况（如CPU、内存使用率）来分配请求。
  使用场景：适用于资源敏感型应用，如高CPU或内存需求的应用。
- IP哈希（IP Hash）
  描述：根据请求的源IP地址进行哈希计算，然后分配到特定的服务器。这样可以保证来自同一IP地址的请求总是被发送到同一个服务器。
  使用场景：适用于需要保持用户会话（session）一致性的场景。

## Spring Cloud LoadBalancer 内置的两种负载均衡策略

**Round-Robin-based** 轮询负载均衡策略（默认的）

RoundRobinLoadBalancer：

```java
private Response<ServiceInstance> getInstanceResponse(List<ServiceInstance> instances) {
        if (instances.isEmpty()) {
            if (log.isWarnEnabled()) {
                log.warn("No servers available for service: " + this.serviceId);
            }

            return new EmptyResponse();
        } else if (instances.size() == 1) {
            return new DefaultResponse((ServiceInstance)instances.get(0));
        } else {
            // 原子操作，保证了每次调用都会得到一个唯一的递增数值,& Integer.MAX_VALUE 这部分是一个位运算，它确保了如果 							// position 的值增加到超过 Integer.MAX_VALUE 时，不会产生负数。
            int pos = this.position.incrementAndGet() & Integer.MAX_VALUE;
            // 计算的是 pos 除以 instances 列表大小的余数，这保证了不论 pos 增长到多大，这个表达式的结果都是在 0 到 								// instances.size() - 1 的范围内，这样就可以循环地从服务实例列表中选择服务实例。
            ServiceInstance instance = (ServiceInstance)instances.get(pos % instances.size());
            return new DefaultResponse(instance);
        }
    }
```

**Random** 随机负载均衡策略

RandomLoadBalancer：

```java
private Response<ServiceInstance> getInstanceResponse(List<ServiceInstance> instances) {
        if (instances.isEmpty()) {
            if (log.isWarnEnabled()) {
                log.warn("No servers available for service: " + this.serviceId);
            }

            return new EmptyResponse();
        } else {
            // 随机获取
            int index = ThreadLocalRandom.current().nextInt(instances.size());
            ServiceInstance instance = (ServiceInstance)instances.get(index);
            return new DefaultResponse(instance);
        }
    }
```

## Spring Cloud LoadBalancer 中缓存机制

尽管关闭缓存对于开发和测试很有用，但是在生产环境上，它的效率是要远低于开启缓存，所以在生产环境上始终都要开启缓存。

Spring Cloud LoadBalancer 中获取服务实例有两种方式：

- 实时获取：每次都从注册中心得到最新的健康实例（效果好，开销大）
- 缓存服务列表：每次得到服务列表之后，缓存一段时间（既保证性能，也能保证一定的及时性）

缓存配置：

- 缓存的过期时间为 35s；
- 缓存保存个数为 256 个。

```yml
spring:
  cloud:
    loadbalancer:
      cache:
        ttl: 35s  # 过期时间
        capacity: 1024  # 设置缓存个数
```

```yml
spring:
  cloud:
    loadbalancer:
      cache:
        enabled: false  # 关闭缓存
```



> https://blog.csdn.net/xaiobit_hl/article/details/134283093
>
> https://blog.csdn.net/weixin_73000974/article/details/135901495
