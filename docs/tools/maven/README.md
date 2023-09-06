# Maven

[Maven基础](./Maven基础)

[服务器手动部署Maven项目](./服务器手动部署Maven项目.md)

[Maven常见问题](./Maven常见问题.md)



| 依赖范围   | 编译环境 | 测试环境 | 运行环境 |
| ---------- | -------- | -------- | -------- |
| `compile`  | 生效     | 生效     | 生效     |
| `provided` | 生效     | 生效     | 不生效   |
| `system`   | 生效     | 生效     | 不生效   |
| `runtime`  | 不生效   | 生效     | 生效     |
| `test`     | 不生效   | 生效     | 不生效   |

## 加载本地jar

```xml
<dependency>
    <groupId>ctec</groupId>
    <artifactId>xxx-core</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/libs/ctec-xxx-core.jar</systemPath>
</dependency>
```

```
${basedir} 项目根目录
${project.build.directory} 构建目录，缺省为target
${project.build.outputDirectory} 构建过程输出目录，缺省为target/classes
${project.build.finalName} 产出物名称，缺省为${project.artifactId}-${project.version}
${project.packaging} 打包类型，缺省为jar
${project.xxx} 当前pom文件的任意节点的内容
```

```
${basedir} 项目根目录
${project.build.directory} 构建目录，缺省为target
${project.build.outputDirectory} 构建过程输出目录，缺省为target/classes
${project.build.finalName} 产出物名称，缺省为${project.artifactId}-${project.version}
${project.packaging} 打包类型，缺省为jar
${project.xxx} 当前pom文件的任意节点的内容
```

