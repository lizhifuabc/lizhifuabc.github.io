# OOM

1. 堆溢出
2. 栈溢出
3. 方法区溢出
4. 直接内存溢出

## 堆溢出

在 Java 堆中没有内存完成实例分配，并且堆也无法再扩展时， Java 虚拟机将会抛出 OutOfMemoryError 异常。

溢出原因：

- 应用程序保存了无法被GC回收的对象 

排查解决思路：

1. 查找关键字报错信息 java.lang.OutOfMemoryError: Java heap space

2. 使用内存映像分析工具 Jprofiler，对 Dump 出来的堆储存快照进行分析，分析清楚是内存泄漏还是内存溢出

3. 如果是内存泄漏，可进一步通过工具查看泄漏对象到 GC Roots 的引用链，修复应用程序中的内存泄漏

4. 如果不存在泄漏，先检查代码是否有死循环，递归等，再考虑用 -Xmx 增加堆大小

## 栈溢出

如果线程请求的栈深度大于虚拟机所允许的深度，将抛出 StackOverflowError 异常； 如果Java虚拟机栈容量可以动态扩展，当栈扩展时无法申请到足够的内存会抛出 OutOfMemoryError 异常。

溢出原因：

1. 在单个线程下，无论是由于栈帧太大还是虚拟机栈容量太小，当内存无法分配的时候，抛出StackOverflowError 异常
2. 不断地建立线程的方式会导致内存溢出 

排查解决思路：

1. 查找关键报错信息，确定是 StackOverflowError 还是 OutOfMemoryError

2. 如果是 StackOverflowError，检查代码是否递归调用方法等

3. 如果是 OutOfMemoryError，检查是否有死循环创建线程等，通过-Xss 降低的每个线程栈大小的容量

## 方法区溢出

运行时产生大量的类，填满方法区，或者当常量池无法再申请到内存时会抛出 OutOfMemoryError。

 异常溢出原因：

- 使用CGLib 生成了大量的代理类，导致方法区被撑爆

- 在Java7 之前，频繁的错误使用 String.intern() 方法

排查解决思路：

1. 检查是否使用 CGLib 生成了大量的代理类

2. 检查代码是否频繁错误得使用 String.intern() 方法

## 直接内存溢出

直接内存也被频繁地使用，也可能导致OOM。

溢出原因：

1. 本机直接内存的分配虽然不会受到 Java 堆大小的限制，但是受到本机总内存大小限制

2. NIO程序中，使用 ByteBuffer.allocteDirect(capability) 分配的是直接内存，可能导致直接内存溢出

3. 直接内存由 -XX:MaxDirectMemorySize 指定，如果不指定，则默认与Java堆最大值（-Xmx指定）一样
