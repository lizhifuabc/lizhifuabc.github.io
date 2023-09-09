# RabbitProperties

spring RabbitMQ 配置类说明

## RabbitProperties.java 

```java
/**
 * RabbitMQ 配置属性
 */
@ConfigurationProperties(prefix = "spring.rabbitmq")
public class RabbitProperties {
    // RabbitMQ 地址列表
    private List<String> addresses = new ArrayList<>(Collections.singletonList("localhost"));

    // 连接 RabbitMQ 的用户名
    private String username;

    // 连接 RabbitMQ 的密码
    private String password;

    // 连接 RabbitMQ 的虚拟主机
    private String virtualHost = "/";

    // 请求心跳检测间隔
    private Integer requestedHeartbeat;

    // 连接超时时间
    private Integer connectionTimeout;

    // SSL 相关配置
    private Ssl ssl = new Ssl();

    // 配置 AMQP 协议的参数
    private final Amqp amqp = new Amqp();

    // 配置 RabbitMQ 连接池相关参数
    private final Pool pool = new Pool();

    // 配置 RabbitMQ 消息的默认 Exchange
    private String exchange;

    // 配置 RabbitMQ 消息的默认 Routing Key
    private String routingKey;

    // 配置 RabbitMQ 消息的默认队列名称
    private String defaultRequeueRejected;

    // 配置 RabbitMQ 消息的默认处理方式
    private Boolean publisherReturns;

    // 配置 RabbitMQ 消息的默认处理方式
    private Boolean publisherConfirmType;

    // 配置 RabbitMQ 消息的默认处理方式
    private Template template = new Template();

    // 配置 RabbitMQ Channel 相关参数
    private final Channel channel = new Channel();

    // 获取地址列表
    public List<String> getAddresses() {
        return this.addresses;
    }

    // 设置地址列表
    public void setAddresses(List<String> addresses) {
        this.addresses = addresses;
    }

    // 获取用户名
    public String getUsername() {
        return this.username;
    }

    // 设置用户名
    public void setUsername(String username) {
        this.username = username;
    }

    // 获取密码
    public String getPassword() {
        return this.password;
    }

    // 设置密码
    public void setPassword(String password) {
        this.password = password;
    }

    // 获取虚拟主机名称
    public String getVirtualHost() {
        return this.virtualHost;
    }

    // 设置虚拟主机名称
    public void setVirtualHost(String virtualHost) {
        this.virtualHost = virtualHost;
    }

    // 获取请求心跳检测间隔
    public Integer getRequestedHeartbeat() {
        return this.requestedHeartbeat;
    }

    // 设置请求心跳检测间隔
    public void setRequestedHeartbeat(Integer requestedHeartbeat) {
        this.requestedHeartbeat = requestedHeartbeat;
    }

    // 获取连接超时时间
    public Integer getConnectionTimeout() {
        return this.connectionTimeout;
    }

    // 设置连接超时时间
    public void setConnectionTimeout(Integer connectionTimeout) {
        this.connectionTimeout = connectionTimeout;
    }

    // 获取 SSL 相关配置
    public Ssl getSsl() {
        return this.ssl;
    }

    // 设置 SSL 相关配置
    public void setSsl(Ssl ssl) {
        this.ssl = ssl;
    }

    // 获取 AMQP 相关配置
    public Amqp getAmqp() {
       
```

## 配置文件

`RabbitProperties` 类是 Spring Boot 中用于配置 RabbitMQ 连接和消息传递的属性类。该类包含了 RabbitMQ 相关的所有属性，并提供了默认值和类型转换等功能。

下面是 `RabbitProperties` 类的主要属性及其中文解释：

- `addresses`：RabbitMQ 服务器地址列表。
- `host`：RabbitMQ 服务器主机名，默认为 `localhost`。
- `port`：RabbitMQ 服务器端口号，默认为 `5672`。
- `username`：RabbitMQ 服务器用户名。
- `password`：RabbitMQ 服务器密码。
- `virtual-host`：RabbitMQ 虚拟主机名称，默认为 `/`。
- `ssl.enabled`：是否启用 SSL 安全连接。
- `ssl.key-store`：SSL 密钥库文件路径。
- `ssl.key-store-password`：SSL 密钥库密码。
- `ssl.key-store-type`：SSL 密钥库类型，默认为 `PKCS12`。
- `ssl.trust-store`：SSL 信任库文件路径。
- `ssl.trust-store-password`：SSL 信任库密码。
- `ssl.trust-store-type`：SSL 信任库类型，默认为 `PKCS12`。
- `ssl.algorithm`：SSL 加密算法，默认为 `TLSv1.2`。
- `connection-timeout`：连接 RabbitMQ 的超时时间（毫秒），默认为 `60000`。
- `requested-heartbeat`：客户端希望 RabbitMQ 服务器发送心跳消息的时间间隔（秒），默认为 `60`。
- `cache.channel.size`：缓存的 Channel 数量，默认为 `25`。
- `cache.channel.checkout-timeout`：从缓存中检出 Channel 的超时时间（毫秒），默认为 `0`。
- `cache.connection.mode`：缓存连接模式，支持 `CHANNEL` 和 `CONNECTION`，默认为 `CHANNEL`。
- `cache.connection.size`：缓存连接数量，默认为 `1`。
- `cache.connection.checkout-timeout`：从缓存中检出 Connection 的超时时间（毫秒），默认为 `0`。
- `cache.channel.checkout-timeout`：从缓存中检出 Channel 的超时时间（毫秒），默认为 `0`。
- `publisher-confirms`：是否启用 Publisher Confirms 模式，默认为 `false`。
- `publisher-returns`：是否启用 Publisher Returns 模式，默认为 `false`。
- `template.retry.enabled`：是否启用 RabbitMQ 消息重试机制，默认为 `false`。
- `template.retry.max-attempts`：最大重试次数，默认为 `3`。
- `template.retry.initial-interval`：第一次重试的间隔时间（毫秒），默认为 `1000`。
- `template.retry.multiplier`：重试间隔时间的倍增因子，默认为 `1.0`。
- `template.retry.max-interval`：最大重试间隔时间（毫秒），默认为 `10000`。
- `listener.direct.acknowledge-mode`：Direct Message Listener Container 的 Acknowledge Mode，支持 `AUTO`、`MANUAL` 和 `NONE`，默认为 `AUTO`。
- `listener
- `listener.direct.prefetch`：Direct Message Listener Container 的预取值，默认为 `250`。
- `listener.simple.acknowledge-mode`：Simple Message Listener Container 的 Acknowledge Mode，支持 `AUTO`、`MANUAL` 和 `NONE`，默认为 `AUTO`。
- `listener.simple.concurrency`：Simple Message Listener Container 的并发消费者数量，默认为 `1`。
- `listener.simple.max-concurrency`：Simple Message Listener Container 的最大并发消费者数量。
- `listener.simple.prefetch`：Simple Message Listener Container 的预取值，默认为 `250`。
- `listener.simple.default-requeue-rejected`：Simple Message Listener Container 在消费者拒绝消息时是否重新加入队列，默认为 `true`。
- `listener.simple.retry.enabled`：是否启用 Simple Message Listener Container 的消息重试机制，默认为 `false`。
- `listener.simple.retry.max-attempts`：Simple Message Listener Container 最大重试次数，默认为 `3`。
- `listener.simple.retry.initial-interval`：Simple Message Listener Container 第一次重试的间隔时间（毫秒），默认为 `1000`。
- `listener.simple.retry.multiplier`：Simple Message Listener Container 重试间隔时间的倍增因子，默认为 `1.0`。
- `listener.simple.retry.max-interval`：Simple Message Listener Container 最大重试间隔时间（毫秒），默认为 `10000`。
- `listener.simple.missing-queues-fatal`：Simple Message Listener Container 在遇到不存在的队列时是否抛出异常，默认为 `true`。
- `listener.simple.default-requeue-rejected`：Simple Message Listener Container 在消费者拒绝消息时是否重新加入队列，默认为 `true`。

以上就是 `RabbitProperties` 类的主要属性及中文解释。这些属性可以在 Spring Boot 应用程序的配置文件中配置，或者在代码中使用 `RabbitTemplate`、`RabbitListener` 等类来动态设置。
