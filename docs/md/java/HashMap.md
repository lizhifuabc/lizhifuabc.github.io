# HashMap

Java HashMap底层数据结构、方法实现原理等，基于JDK 1.8。

- 底层数据结构

Java HashMap底层采用哈希表结构（数组+链表、JDK1.8后为数组+链表或红黑树）实现，结合了数组和链表的优点：

- 数组：通过数组下标可以快速实现对数组元素的访问，效率极高；

- 链表：插入或删除数据不需要移动元素，只需修改节点引用，效率极高。

<img src="../../assets/img/HashMap.png" alt="HashMap" style="zoom:50%;" />

