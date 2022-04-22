# spring注入bean

在 Spring boot 开发过程当中，最常见的就是依赖注入，简单梳理一下相关知识点，作为记录。

## 注解

1. @Autowired 是由Spring 框架提供

   ```java
   -- 不建议使用基于 field 的注入方式。
   Field injection is not recommended 
   例子:
   class MyComponent {
     @Inject MyCollaborator collaborator; // 注入失败
   
     public void myBusinessMethod() {
       collaborator.doSomething(); // 空指针异常
     }
   }
    
   class MyComponent {
   
     private final MyCollaborator collaborator;
   
     @Inject
     public MyComponent(MyCollaborator collaborator) {
       // 通过断言的方式
       Assert.notNull(collaborator, "MyCollaborator must not be null!");
       this.collaborator = collaborator;
     }
   
     public void myBusinessMethod() {
       collaborator.doSomething(); // 安全的
     }
   }
   ```

2. @Resource 是JSR-250定义的注解

   两个重要的属性：name和type，而Spring 将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。

3. @Injec 是 JSR-330 定义的规范，Spring 的环境下，@Inject和@Autowired 作用基本是一样的。

## 注入方式

Spring常见的三种注入方式：

1. field注入

   ```java
   @Autowired
   private DemoService demoService;
   ```
   
   这种注入方式非常的简单。
   
   首先网上说的循环依赖的问题，spring 在启动的时候会检查的，可以自己去测试一下。

2. 构造器注入

   ```java
   private final DemoService demoService1;
   @Autowired
   public DemoController(DemoService demoService1) {
       this.demoService1 = demoService1;
   }
   ```

3. setter注入

   ```java
   private DemoService demoService2;
   @Autowired
   public void setDemoService(DemoService demoService2) {
       this.demoService2 = demoService2;
   }
   ```

## 推荐使用构造函数注入

- 代码质量：
  - 使用 field 注入非常简单，但是造成了一个问题，如果你注入很多变量，此时是无法发现代码一味的。
  - 构造器注入，当你发现存在一个巨大的构造器时，这个时候就需要考虑**单一职责**问题了。

- 依赖不可变：final关键字
- 依赖不为空
  - controller 实例化时，由于已经实现了有参数的构造函数，所以不会调用默认构造函数。
  - Java类加载实例化的过程中，spring 必须要传入 controller 所需要的参数，此时保障了参数不能为空。

