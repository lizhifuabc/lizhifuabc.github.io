# Spring 单例模式

Spring中，Bean可以被定义为两种模式：Prototype（多例）和Singleton（单例），Spring Bean默认是单例模式。



```java
public class DefaultSingletonBeanRegistry extends SimpleAliasRegistry implements SingletonBeanRegistry {
  /** Cache of singleton objects: bean name to bean instance. */
  /** 单例对象缓存：bean名到bean实例 */
	private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
}	

```

