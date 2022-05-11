# Redis Stream消息队列

Redis Stream 是 Redis 5.0 版本新增加的数据结构。

Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。

简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。

而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

核心概念介绍：

- stream：stream 名称，是惟一的，其实就是Redis的key

- consumer group：消费组，每个 Stream 都可以挂多个消费组；每个消费组 (Consumer Group) 的状态都是独立的，相互不受影响。也就是说同一份Stream 内部的消息会被每个消费组都消费到；

- consumer：消费者，同一个消费组 (Consumer Group) 可以挂接多个消费者 (Consumer)，这些消费者之间是竞争关系，即一条消息仅可被一个组内的一个消费者消费。每个消费者有一个组内唯一名称。

<img src="../../assets/img/RedisStream%E6%A6%82%E8%BF%B0.png" alt="RedisStream概述" style="zoom:50%;" />

## Stream 队列

Stream 消息队列主要由四部分组成，分别是：消息本身、生产者、消费者和消费组。

<img src="../../assets/img/Redis%20Stream%E9%98%9F%E5%88%97.png" alt="Redis Stream队列" style="zoom:50%;" />

## Spring boot 对接

POM

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

消费者订阅配置：

```java
package com.tomato.study.redis.stream.consumer.config;

import com.tomato.study.redis.stream.consumer.listener.RedisStreamAckListener;
import com.tomato.study.redis.stream.consumer.listener.RedisStreamListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.data.redis.stream.Subscription;

import javax.annotation.Resource;

import static com.tomato.study.redis.stream.core.RedisConstants.*;

/**
 * redis stream 配置（redis5.0以上）
 *
 * @author lizhifu
 * @date 2022/5/11
 */
@Configuration
public class RedisStreamConfig {

    @Resource
    private RedisStreamAckListener redisStreamAckListener;

    @Resource
    private RedisStreamListener redisStreamListener;


    /**
     * 订阅者1，消费组group1，收到消息后自动确认，与订阅者2为竞争关系，消息仅被其中一个消费
     * @param streamMessageListenerContainer
     * @return
     */
    @Bean
    public Subscription subscription(StreamMessageListenerContainer streamMessageListenerContainer){
        // 自动确认
        Subscription subscription = streamMessageListenerContainer.receiveAutoAck(
                Consumer.from(REDIS_STREAM1_GROUP1,REDIS_STREAM1_GROUP1_CONSUMER1),
                StreamOffset.create(REDIS_STREAM1, ReadOffset.lastConsumed()),
                redisStreamListener
        );
        return subscription;
    }

    /**
     * 订阅者2，消费组group1，收到消息后自动确认，与订阅者1为竞争关系，消息仅被其中一个消费
     * @param streamMessageListenerContainer
     * @return
     */
    @Bean
    public Subscription subscription2(StreamMessageListenerContainer streamMessageListenerContainer){
        // 自动确认
        Subscription subscription = streamMessageListenerContainer.receiveAutoAck(
                Consumer.from(REDIS_STREAM1_GROUP1,REDIS_STREAM1_GROUP1_CONSUMER2),
                StreamOffset.create(REDIS_STREAM1, ReadOffset.lastConsumed()),
                redisStreamListener
        );
        return subscription;
    }

    /**
     * 订阅者3，消费组group2，收到消息后不自动确认，需要用户选择合适的时机确认，
     * 与订阅者1和2非竞争关系，即使消息被订阅者1或2消费，亦可消费
     *
     * 当某个消息被ACK，PEL列表就会减少
     * 如果忘记确认（ACK），则PEL列表会不断增长占用内存
     * 如果服务器发生意外，重启连接后将再次收到PEL中的消息ID列表
     * @param streamMessageListenerContainer
     * @return
     */
    @Bean
    public Subscription subscription3(StreamMessageListenerContainer streamMessageListenerContainer){
        // 非自动确认
        Subscription subscription = streamMessageListenerContainer.receive(
                Consumer.from(REDIS_STREAM1_GROUP2,REDIS_STREAM1_GROUP2_CONSUMER1),
                StreamOffset.create(REDIS_STREAM1, ReadOffset.lastConsumed()),
                redisStreamAckListener
        );
        return subscription;
    }
}
```

消费者组和消费者配置

```java
package com.tomato.study.redis.stream.consumer.config;

import com.tomato.study.redis.stream.core.RedisConstants;
import com.tomato.study.redis.stream.service.RedisStreamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;

import javax.annotation.Resource;
import java.time.Duration;
import java.util.Collections;

/**
 * 消费者组和消费者配置
 *
 * @author lizhifu
 * @date 2022/5/11
 */
@Configuration
@Slf4j
public class RedisStreamListenerConfig {
    @Resource
    private RedisStreamService redisStreamService;
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    @Bean
    public StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, ?> streamMessageListenerContainerOptions(){
        return StreamMessageListenerContainer.StreamMessageListenerContainerOptions
                .builder()
                // block读取超时时间
                .pollTimeout(Duration.ofSeconds(1))
                .build();
    }

    /**
     * 开启监听器接收消息
     * @param factory
     * @param streamMessageListenerContainerOptions
     * @return
     */
    @Bean
    public StreamMessageListenerContainer streamMessageListenerContainer(RedisConnectionFactory factory,
                                                                         StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, ?> streamMessageListenerContainerOptions){
        StreamMessageListenerContainer listenerContainer = StreamMessageListenerContainer.create(factory,
                streamMessageListenerContainerOptions);

        // 如果 stream 流不存在 创建 stream 流
        if(!stringRedisTemplate.hasKey(RedisConstants.REDIS_STREAM1) ){
            redisStreamService.add(RedisConstants.REDIS_STREAM1, Collections.singletonMap("", ""));
            log.info("初始化stream {} success",RedisConstants.REDIS_STREAM1);
        }else {
            log.info("stream {} 已存在",RedisConstants.REDIS_STREAM1);
        }

        // 创建消费者组
        try {
            redisStreamService.createGroup(RedisConstants.REDIS_STREAM1, RedisConstants.REDIS_STREAM1_GROUP1);
        } catch (Exception e) {
            log.info("消费者组 {} 已存在",RedisConstants.REDIS_STREAM1_GROUP1);
        }
        try {
            redisStreamService.createGroup(RedisConstants.REDIS_STREAM1, RedisConstants.REDIS_STREAM1_GROUP2);
        } catch (Exception e) {
            log.info("消费者组 {} 已存在",RedisConstants.REDIS_STREAM1_GROUP2);
        }

        listenerContainer.start();
        return listenerContainer;
    }
}
```

监听配置：如果创建订阅时选择的是自动ack:

```java
package com.tomato.study.redis.stream.consumer.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Component;

/**
 * 消费者消息监听器
 *
 * @author lizhifu
 * @date 2022/5/11
 */
@Slf4j
@Component
public class RedisStreamListener implements StreamListener<String, MapRecord<String, String, String>> {
    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        log.info("RedisStreamListener 消费者消息监听器：{}", message);
        // 接收到消息
        log.info("RedisStreamListener message id " + message.getId());
        log.info("RedisStreamListener stream " + message.getStream());
        log.info("RedisStreamListener body " + message.getValue());
    }
}
```

监听配置：如果创建订阅时选择的是手动ack:

```java
package com.tomato.study.redis.stream.consumer.listener;

import com.tomato.study.redis.stream.core.RedisConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.core.StreamOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 消费完成后确认已消费
 *
 * @author lizhifu
 * @date 2022/5/11
 */
@Component
@Slf4j
public class RedisStreamAckListener implements StreamListener<String, MapRecord<String, String, String>> {
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        log.info("RedisStreamAckListener 消费者消息监听器：{}", message);
        // 接收到消息
        log.info("RedisStreamAckListener message id " + message.getId());
        log.info("RedisStreamAckListener stream " + message.getStream());
        log.info("RedisStreamAckListener body " + message.getValue());

        // 消费完成后确认消费（ACK）
        StreamOperations<String, String, String> streamOperations = stringRedisTemplate.opsForStream();
        streamOperations.acknowledge(RedisConstants.REDIS_STREAM1,RedisConstants.REDIS_STREAM1_GROUP2,message.getId());
        // 我们可以启动定时任务不断监听 pending 列表，处理死信消息
        // PendingMessagesSummary pending = stringRedisTemplate.opsForStream().pending(RedisConstants.REDIS_STREAM1, RedisConstants.REDIS_STREAM1_GROUP2);
    }
}
```

## 源码位置

https://gitee.com/lizhifu/tomato-cloud/tree/master/tomato-study/tomato-study-redis-stream