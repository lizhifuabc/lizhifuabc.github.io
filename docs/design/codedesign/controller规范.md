# Controller规范

## 参数进场检验

1. @NotBlank、@NotNull 等注解来进行校验
2. 接口就需要方法上就需要加上@Valid注解

3. 尽量不传递null值。