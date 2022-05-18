# SpringBoot使用Validation校验参数

validation 配合 spring boot **全局异常配置**，可以进行快速校验，优化返回结果。

POM依赖：

```xml
<dependencies>
    <!-- spring boot validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

## 嵌套校验

```java
@Data
public class DemoReq {
    @NotNull(message = "年龄不能为空")
    @Max(value = 120,message = "年龄不能超过120岁")
    @Min(value = 0,message = "年龄不能为负数")
    private int age;

    @NotNull(message = "demoReq2不能为空")
    @Valid // 主要用来校验DemoReq2内设置的规则
    private DemoReq2 demoReq2;
}
```

```java
@Data
public class DemoReq2 {
    @NotBlank(message = "密码不能为空")
    @Length(min = 20000)
    private String passWord;
}
```

```java
@GetMapping("/valid")
public String valid(@Valid DemoReq demoReq, BindingResult result) {
    if (result.hasErrors()) {
        return result.getAllErrors().get(0).getDefaultMessage();
    }
    return "success";
}
```

**@Validated不能添加属性上面，不支持嵌套检测，所以只有使用@Valid**

## @Valid与@Validated

首先@Valid与@Validated都是用来校验接收参数的，

@Validated：可以用在类型、方法和方法参数上。但是不能用在成员属性（字段）上，不支持嵌套检测，所属包为：org.springframework.validation.annotation，支持分组功能

@Valid：可以用在方法、构造函数、方法参数和成员属性（字段）上，支持嵌套检测，所属包为：javax.validation.Valid

## 自定义校验规则

这里以手机号为例：

自定义注解：

```java
@Documented
// 指定真正实现校验规则的类
@Constraint(validatedBy = MobileValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Mobile {
    String message() default "不是正确的手机号码";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    @Target({ElementType.METHOD,ElementType.FIELD,ElementType.PACKAGE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        Mobile[] value();
    }
}
```

定义规则：

```java
public class MobileValidator implements ConstraintValidator<Mobile, String> {
    private static final Pattern PHONE_PATTERN = Pattern.compile(
            "^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$"
    );

    @Override
    public void initialize(Mobile constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.length() == 0 ) {
            return false;
        }
        Matcher m = PHONE_PATTERN.matcher(value);
        return m.matches();
    }
}
```

使用：

```java
@Mobile
private String mobile;
```
