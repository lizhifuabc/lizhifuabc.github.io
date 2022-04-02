# HashMap扩容或初始化

1. 定义**新数组(newCap)**的大小和**新阈值(newThr)**



Java HashMap 扩容或初始化 resize()，基于JDK 1.8。

JDK1.8在扩容时通过高位运算`e.hash & oldCap`结果是否为0来确定元素是否需要移动，主要有如下两种情况：

情况一：

扩容前oldCap=16，hash=5，`(n-1)&hash=15&5=5`，`hash&oldCap=5&16=0`；

扩容后newCap=32，hash=5，`(n-1)&hash=31&5=5`，`hash&oldCap=5&16=0`。

这种情况下，扩容后元素索引位置不变，并且hash&oldCap==0。

情况二：

扩容前oldCap=16，hash=18，`(n-1)&hash=15&18=2`，`hash&oldCap=18&16=16`；

扩容后newCap=32，hash=18，`(n-1)&hash=31&18=18`，`hash&oldCap=18&16=16`。

这种情况下，扩容后元素索引位置为18，即旧索引2加16(oldCap)，并且hash&oldCap!=0。