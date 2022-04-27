# lombok常见使用场景

虽然 lombok 被很多人认为给代码的可读性带来了不变，但是确实给我们日常的开发带来了很多的便捷性，所以请拥抱 lombok。

## Setter 和 Getter

@Getter 和 @Setter

```java
@Getter
@Setter
public class DemoDto {
    private String name;
    private int age;
}
```

```java
public class DemoDtoMain {
    public static void main(String[] args) {
        DemoDto demoDto = new DemoDto();
        demoDto.setName("tomato");
        demoDto.setAge(18);
    }
}
```

## 链式调用

@Accessors(chain = true)

```java
@Getter
@Setter
@Accessors(chain = true)
public class DemoDto {
    private String name;
    private int age;
}
```

```java
public class DemoDtoMain {
    public static void main(String[] args) {
        DemoDto demoDto = new DemoDto();
        demoDto.setName("tomato");
        demoDto.setAge(18);
				// 链式调用
        DemoDto demoDto2 = new DemoDto()
                .setName("tomato")
                .setAge(18);
    }
}
```

## 构造方法

静态构造方法和必传参数的构造方法,RequiredArgsConstructor  staticName

```java
@Getter
@Setter
@Accessors(chain = true)
@RequiredArgsConstructor(staticName = "ofName")
public class DemoDto {
    @NonNull
    private String name;
    private int age;
}
```

```java
public class DemoDtoMain {
    public static void main(String[] args) {
        DemoDto demoDto = DemoDto.ofName("123");
        System.out.println(demoDto);
    }
}
```

## Builder 模式

```java
@Builder
public class DemoDto2 {
    private String name;
    private int age;
}
```

```java
public class DemoDto2Main {
    public static void main(String[] args) {
        DemoDto2 demoDto2 = DemoDto2.builder().name("tomato").age(18).build();
    }
}
```

## 代理模式

@Delegate

一个类中只能使用一个 @Delegate 注解，因为使用多个会生成多个 size0 方法，从而会导致编译报错
手写覆盖 @Delegate 注解所生成的容器常用方法，但是返回类型必须和原方法相同，参数类型必须和容器的泛型相同

```java
public class DemoDto3Main {
    @Delegate
    private List<String> list = new ArrayList<>(10);
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

class:

```java
public class DemoDto3Main {
    private List<String> list = new ArrayList(10);

    public DemoDto3Main() {
    }

    public static void main(String[] args) {
        System.out.println("hello world");
    }

    public int size() {
        return this.list.size();
    }

    public boolean isEmpty() {
        return this.list.isEmpty();
    }

    public boolean contains(Object arg0) {
        return this.list.contains(arg0);
    }

    public Iterator<String> iterator() {
        return this.list.iterator();
    }

    public Object[] toArray() {
        return this.list.toArray();
    }

    public <T> T[] toArray(T[] arg0) {
        return this.list.toArray(arg0);
    }
  .........  .........  ......... // 省略部分代码
```