## Mac java 相关

Mac 查看下查看已安装的 Java JDK 版本及其安装目录：

```shell
➜  JavaVirtualMachines /usr/libexec/java_home -V
Matching Java Virtual Machines (4):
    17.0.2 (x86_64) "Oracle Corporation" - "OpenJDK 17.0.2" /Users/lizhifu/Library/Java/JavaVirtualMachines/openjdk-17.0.2/Contents/Home
    11.0.9 (x86_64) "Oracle Corporation" - "Java SE 11.0.9" /Library/Java/JavaVirtualMachines/jdk-11.0.9.jdk/Contents/Home
    1.8.201.09 (x86_64) "Oracle Corporation" - "Java" /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home
    1.8.0_201 (x86_64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home
/Users/lizhifu/Library/Java/JavaVirtualMachines/openjdk-17.0.2/Contents/Home
➜  JavaVirtualMachines
```

## 永久切换 jdk 版本

**目前没有找到合适的方法，大多数都是临时修改，mac 自动查找最高版本**

Openjdk 17

```shell
echo 'export JAVA_HOME=/Users/lizhifu/Library/Java/JavaVirtualMachines/openjdk-17.0.2/Contents/Home/' >> ~/.bash_profile source ~/.bash_profile
```

jdk8

```shell
echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home/' >> ~/.bash_profile source ~/.bash_profile
```



## jdk 版本切换(临时)

mac系统中Java默认目录：

```java
/Library/Java/JavaVirtualMachines/
```

```java
# 配置JAVA_HOME
vi ~/.bash_profile
```

```java
# 添加内容
# java
export JAVA_8_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_201.jdk/Contents/Home"
alias jdk8='export JAVA_HOME=$JAVA_8_HOME'

export JAVA_11_HOME="/Library/Java/JavaVirtualMachines/jdk-11.0.9.jdk/Contents/Home"
alias jdk11='export JAVA_HOME=$JAVA_11_HOME'

export JAVA_17_HOME="/Users/lizhifu/Library/Java/JavaVirtualMachines/openjdk-17.0.2/Contents/Home"
alias jdk17='export JAVA_HOME=$JAVA_17_HOME'

# 默认使用jdk11
export JAVA_HOME=$JAVA_11_HOME
# java
```

```java
# 生效配置：
source ~/.bash_profile
```

```java
# 查看 java 版本
java -version
# 切换
jdk8
jdk11
jdk17
```