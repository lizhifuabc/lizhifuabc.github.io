# BeanUtils

BeanUtils.copyProperties：通过反射机制获取源对象和目标对象的属性，并将对应的属性值进行复制。可以减少手动编写属性复制代码的工作量，提高代码的可读性和维护性。

## 类型不匹配

```java
public class BeanUtilsDemo {
    public static void main(String[] args) {
        Source source = new Source();
        source.setAge("1");

        Target target = new Target();
        BeanUtils.copyProperties(source,target);
        System.out.println(target.getAge());
    }

    private static class Source{
        private String age;

        public String getAge() {
            return age;
        }

        public void setAge(String age) {
            this.age = age;
        }
    }
    private static class Target{
        private Long age;

        public Long getAge() {
            return age;
        }

        public void setAge(Long age) {
            this.age = age;
        }
    }
}
```

此时返回的是 null

## 浅拷贝

- 浅拷贝只复制对象及其引用，而不复制引用指向的对象本身。
- 深拷贝是指创建一个新对象，该对象的属性值与原始对象相同，包括引用类型的属性。深拷贝会递归复制引用对象，创建全新的对象，**以确保拷贝后的对象与原始对象完全独立**。

```java
public class BeanUtilsDemo2 {
    public static void main(String[] args) {
        User user = new User();
        user.setName("lizhifu");

        Source source = new Source();
        source.setAge("1");
        source.setUser(user);

        Target target = new Target();
        BeanUtils.copyProperties(source,target);
        // 更改原始对象的值
        user.setName("lizhifu2");
        source.setAge("2");

        System.out.println(target.getUser().getName());
        System.out.println(target.getAge());
    }
    @Data
    private static class Source {
        private String age;
        private User user;
    }
    @Data
    private static class Target {
        private String age;
        private User user;
    }
    @Data
    private static class User {
        private String name;
    }
}
```

解析：

1. `target.getUser().getName()`：`user` 属性是引用类型，它在 `source` 和 `target` 中都指向同一个 `User` 对象。因此，无论你更改哪个对象中的 `user` 属性，它们都会反映在另一个对象中。所以，这里打印的是 `"lizhifu2"`，因为你在原始的 `user` 对象中将名称更改为 `"lizhifu2"`。
2. `target.getAge()`：`age` 属性是字符串（引用类型），但它是独立的。因为字符串是不可变的，当你更改 `source` 中的 `age` 时，实际上创建了一个新的字符串对象，而不是修改了原始字符串对象。所以，`target.getAge()` 仍然打印 `"1"`，因为 `target` 中的 `age` 属性没有被修改。
