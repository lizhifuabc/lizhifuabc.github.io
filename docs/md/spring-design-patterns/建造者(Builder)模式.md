# 建造者(Builder)模式

将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。

## 基础

1. 基础实体数据

   ```java
   /**
    * 人
    *
    * @author lizhifu
    * @date 2022/3/19
    */
   public class Persion02 {
       private  Sex sex;
       private  String name;
       private  Profession profession;
   
       public Sex getSex() {
           return sex;
       }
   
       public void setSex(Sex sex) {
           this.sex = sex;
       }
   
       public String getName() {
           return name;
       }
   
       public void setName(String name) {
           this.name = name;
       }
   
       public Profession getProfession() {
           return profession;
       }
   
       public void setProfession(Profession profession) {
           this.profession = profession;
       }
   }
   ```

2. 人组装过程的Builder类

   ```java
   /**
    * 人组装过程的Builder类
    *
    * @author lizhifu
    * @date 2022/3/19
    */
   public interface PersionComputerConfigBuilder {
       void setSex();
       void setName();
       Persion02 getPersion02();
   }
   
   ```

3. 执行过程

   ```java
   /**
    * My
    *
    * @author lizhifu
    * @date 2022/3/19
    */
   public class My {
       private PersionComputerConfigBuilder persionComputerConfigBuilder;
       public My(PersionComputerConfigBuilder persionComputerConfigBuilder){
           this.persionComputerConfigBuilder = persionComputerConfigBuilder;
       }
       public void persion(){
           persionComputerConfigBuilder.setName();
           persionComputerConfigBuilder.setName();
       }
       public Persion02 init(){
           return persionComputerConfigBuilder.getPersion02();
       }
   }
   
   ```

4. 测试

   ```java
   /**
    * PersionApp
    *
    * @author lizhifu
    * @date 2022/3/19
    */
   public class PersionApp02 {
       public static void main(String[] args) {
           My my = new My(new MyConfigBuilder());
           my.init();
           my.persion();
       }
   }
   ```

## 进阶

- Person对象是不可变，类的所有属性都加了final修饰
- Person类中定义一个内部类Builder，这个Builder内部类中的属性要和Person中的相同
- Builder内部类必须有的属性要用final修饰，防止这些属性没有被赋值，其他非必须的属性不能用final，因为如果加了final，就必须对其进行初始化
- 这样 Person 内属性都是必须的，Builder 不一定
- Builder内部类中定义了一个构造方法，传入必须有的属性。其他非必须的属性都通过方法设置，每个方法都返回Builder对象自身
- build方法，将Builder对象传入Person的私有构造方法，最终返回一个对象。

Person：

```java
public final class Persion {
    private final Sex sex;
    private final String name;
    private final Profession profession;
    private Persion(Builder builder){
        this.sex = builder.sex;
        this.name = builder.name;
        this.profession = builder.profession;
    }
    public static class Builder {
        private final Sex sex;
        private final String name;
        private Profession profession;

        public Builder(Sex sex,String name){
            this.sex = sex;
            this.name = name;
        }
        public Builder withProfession(Profession profession) {
            this.profession = profession;
            return this;
        }
        public Persion builder(){
            return new Persion(this);
        }
    }
}
```

```java
/**
 * 性别
 *
 * @author lizhifu
 * @date 2022/3/19
 */
public enum Sex {
    MAN,
    WOMAN,
    OTHER
}
```

```java
/**
 * 职业
 *
 * @author lizhifu
 * @date 2022/3/19
 */
public enum Profession {
    IT,
    FARM,
    UN_KNOW
}
```

```java
/**
 * PersionApp
 *
 * @author lizhifu
 * @date 2022/3/19
 */
public class PersionApp {
    public static void main(String[] args) {
        Persion persion = new Persion.Builder(Sex.MAN,"小明")
                .withProfession(Profession.IT)
                .builder();
        System.out.println(persion.toString());
    }
}
```
