## PO、VO、DO、DTO

**对象类型介绍**

- PO：persistent object 持久对象
  - 有时也被称为Data对象，对应数据库中的 entity ，可以简单认为一个 PO 对应数据库中的一条记录。
  - 在 Mybatis 持久化框架中与 insert/delet 操作密切相关。
  - PO中不应该包含任何对数据库的操作。
- POJO ：plain ordinary java object 无规则简单 java 对象
- VO：value object 值对象 / view object 表现层对象
  - 主要对应页面显示（web页面/swt、swing界面）的数据对象。
  - 可以和表对应，也可以不，这根据业务的需要。
  - 可以细分包括 req、res
- DO（Domain Object）：领域对象，就是从现实世界中抽象出来的有形或无形的业务实体。通常可以代替部分 PO 的职责。
- DTO（TO）：Data Transfer Object 数据传输对象
  - 用在需要跨进程或远程传输时，它不应该包含业务逻辑。
  - 比如一张表有100个字段，那么对应的PO就有100个属性（大多数情况下，DTO内的数据来自多个表）。但view层只需显示10个字段，没有必要把整个PO对象传递到client，这时我们就可以用只有这10个属性的DTO来传输数据到client，这样也不会暴露server端表结构。到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为VO。
