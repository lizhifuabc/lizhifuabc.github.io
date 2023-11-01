# RabbitMQ实战:消息丢失、消息重复、消息积压

RabbitMQ避免消息丢失的方法：

1. 消息确认机制
2. 手动签收机制

## 消息确认机制

主要是生产者使用的机制，用来确认消息是否被成功消费。

```yml
spring: 
    rabbitmq:
        address: 192.168.x.x:xxxx
        virtual-host: /
        username: guest
        password: guest
        connection-timeout: 5000
        publisher-confirms: true # 消息成功确认
        publisher-returns: true # 消息失败确认
        template: 
            mandatory: true # 手动签收机制
```

实现RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback这两个接口的方法后，就可以针对性地进行消息确认的日志记录，之后做进一步的消息发送补偿，以达到接近100%投递的目的。

```java
@Component
@Slf4j
public class RabbitMQSender implements RabbitTemplate.ConfirmCallback, 
RabbitTemplate.ReturnCallback {
    
    /**
     * 发送消息
     */
    public void sendOrder(Order order) {
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
        
        // 发送消息
        rabbitTemplate.convertAndSend(xx, xx, order, xx);
    }
    
    /**
     * 成功接收后的回调
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String s) {
    
        // 如果成功接收了，这里可以对日志表的消息收发状态做更新。
        // ....
        
    }
      
    /**
     * 失败后的回调
     */
    @Override
    public void returnedMessage(Message message, int i, String s, String s1, String s2) {
    
        // 如果失败了，这里可以对日志表的消息收发状态做更新，之后通过任务调度去补偿发送。
        // ....
        
    }
}
```

## 消息签收机制

RabbitMQ的消息是自动签收的，你可以理解为快递签收了，那么这个快递的状态就从发送变为已签收，唯一的区别是快递公司会对物流轨迹有记录，而MQ签收后就从队列中删除了。

企业级开发中，RabbitMQ我们基本都开启手动签收方式，这样可以有效避免消息的丢失。

前文中已经在生产者开启了手动签收机制，那么作为消费方，也要设置手动签收。

```yml
spring: 
    rabbitmq:
        address: 192.168.x.x:xxxx
        virtual-host: /
        username: guest
        password: guest
        connection-timeout: 5000
        listener: 
            simple: 
                concurrency: 5 # 并发数量
                max-concurrency: 10 # 最大并发数量
                acknowledge-mode: manual # 开启手动签收
                prefetch: 1 # 限制每次只消费一个(一个线程)，上面配置5，也就是能一次接收5个
```

消费监听时，手动签收就一行代码，伪代码如下：

```java
@RabbitListener(xxx)
public void onOrderMessage(@Payload Order order, Channel channel, 
@Header(AmqpHeaders.DELIVERY_TAG) long tag) throws Exception {
    
    // ....
    
    // 手动签收
    channel.basicAck(tag, false);
    
}
```

## 消息丢失

消息丢失的原因无非有三种：

1. 消息发出后，中途网络故障，服务器没收到；
2. 消息发出后，服务器收到了，还没持久化，服务器宕机；
3. 消息发出后，服务器收到了，消费方还未处理业务逻辑，服务却挂掉了，而消息也自动签收，等于啥也没干。

这三种情况，(1) 和 (2)是由于生产方未开启消息确认机制导致，(3)是由于消费方未开启手动签收机制导致。

解决方案：

1. 生产方发送消息时，要try...catch，在catch中捕获异常，并将MQ发送的关键内容记录到日志表中，日志表中要有消息发送状态，若发送失败，由定时任务定期扫描重发并更新状态；
2. 生产方publisher必须要加入确认回调机制，确认成功发送并签收的消息，如果进入失败回调方法，就修改数据库消息的状态，等待定时任务重发；
3. 消费方要开启手动签收ACK机制，消费成功才将消息移除，失败或因异常情况而尚未处理，就重新入队。

其实这就是前面阐述两个概念时已经讲过的内容，也是接近100%消息投递的企业级方案之一，主要目的就是为了解决消息丢失的问题。

## 消息重复

1. 消息消费成功，事务已提交，签收时结果服务器宕机或网络原因导致签收失败，消息状态会由unack转变为ready，重新发送给其他消费方；
2. 消息消费失败，由于retry重试机制，重新入队又将消息发送出去。

解决方案：

1. 消费方业务接口做好幂等，推荐做法，业务方法幂等这是最直接有效的方式
2. 消息日志表保存MQ发送时的唯一消息ID，消费方可以根据这个唯一ID进行判断避免消息重复；
3. 消费方的Message对象有个getRedelivered()方法返回Boolean，为TRUE就表示重复发送过来的。

## 消息积压

1. 消费方的服务挂掉，导致一直无法消费消息；
2. 消费方的服务节点太少，导致消费能力不足，从而出现积压，这种情况极可能就是生产方的流量过大导致。

解决方案：

1. 既然消费能力不足，那就扩展更多消费节点，提升消费能力；
2. 建立专门的队列消费服务，将消息批量取出并持久化，之后再慢慢消费。

(1)就是最直接的方式，也是消息积压最常用的解决方案，但有些企业考虑到服务器成本压力，会选择第（2）种方案进行迂回，先通过一个独立服务把要消费的消息存起来，比如存到数据库，之后再慢慢处理这些消息即可。

## 总结

1. 消息丢失、消息重复、消息积压三个问题中，实际上主要解决的还是消息丢失，大部分情况下遇不到消息积压的场景，幂等也比较容易实现，所以几乎不存在消息重复的可能；

2. 消息丢失的最常见方案就是定时任务补偿，不论是SOA还是微服务的架构，必然会有分布式任务调度的存在，自然也就成为MQ最直接的补偿方式，如果MQ一定要实现100%投递，这种是最普遍的方案。

   实际上不推荐中小企业使用该方案，因为凭空增加维护成本，而且没有一定规模的项目完全没必要，大家都小看了RabbitMQ本身的性能，比如我们公司，支撑一个三甲医院，也就是三台8核16G服务器的集群，上线至今3年毫无压力；

3. 生产者消息确认机制ConfirmCallback和ReturnCallback，这种机制十分降低MQ性能。

   可以建立后台管理实现人工补偿，通过识别业务状态判断消费方是否处理了业务逻辑，毕竟这种情况都是少数，性能和运维成本，选择性能；

4. RabbitMQ一定要开启手动签收；

5. 手动签收方式：不论业务逻辑是否处理成功，最终都要将消息手动签收。

举例：

**不科学的用法**：在处理完业务逻辑后再手动签收，否则不签收，就好比客人进店了你得买东西，否则不让走。

```java
@RabbitListener(xxx)
public void onOrderMessage(@Payload Order order, Channel channel, 
@Header(AmqpHeaders.DELIVERY_TAG) long tag) throws Exception {
    
    // 处理业务
    doBusiness(order);
    
    // 手动签收
    channel.basicAck(tag, false);
    
}
```

**科学的用法**：不论业务逻辑是否处理成功，最终都要将消息手动签收，MQ的使命不是保证客人进店了必须消费，不消费就不让走，而是客人能进来就行，哪怕是随便看看也算任务完成。

```java
@RabbitListener(xxx)
public void onOrderMessage(@Payload Order order, Channel channel, 
@Header(AmqpHeaders.DELIVERY_TAG) long tag) throws Exception {
    
    try {
        // 处理业务
        doBusiness(order);
    } catch(Exception ex) {
        // 记录日志，通过后台管理或其他方式人工处理失败的业务。
    } finally {
        // 手动签收
        channel.basicAck(tag, false);
    }
    
}
```

可能有人会问你这样不是和自动签收没区别吗，NO，你要知道如果自动签收，出现消息丢失你连记录日志的可能都没有。

另外，为什么一定要这么做，因为MQ是中间件，本身就是辅助工具，就是一个滴滴司机，保证给你送到顺便说个再见就行，没必要还下车给你搬东西。

如果强加给MQ过多压力，只会造成本身业务的畸形。我们使用MQ的目的就是解耦和转发，不再做多余的事情，保证MQ本身是流畅的、职责单一的即可。

本篇主要讲了RabbitMQ的三种常见问题及解决方案，同时分享了一些作者本人工作中使用的心得，我想网上是很难找到的，如果哪一天用到了，不妨再打开看看，也许能避免一些生产环境可能出现的问题。

我总结下来就是三点：

1）、消息100%投递会增加运维成本，中小企业视情况使用，非必要不使用；

2）、消息确认机制影响性能，非必要不使用；

3）、消费者先保证消息能签收，业务处理失败可以人工补偿。

工作中怕的永远不是一个技术不会使用，而是遇到问题不知道有什么解决思路。