

# Docker基础

Docker 使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。

**Docker 客户端(Client)** : Docker 客户端通过命令行或者其他工具使用 Docker SDK (https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。

**Docker 主机(Host)** ：一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。

## 基本概念

**镜像（Image）**：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。

**容器（Container）**：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

**仓库（Repository）**：仓库可看着一个代码控制中心，用来保存镜像。

## 常见命令

镜像：

```shell
# 查找镜像
docker search mysql

# 拉取镜像
docker pull mysql

# 删除镜像
docker rmi hello-world

# 更新镜像
docker commit -m="update test" -a="pdai" 0a1556ca3c27  pdai/ubuntu:v1.0.1

# 生成镜像
docker build -t pdai/ubuntu:v2.0.1 .

# 镜像标签
docker tag a733d5a264b5 pdai/ubuntu:v3.0.1

# 镜像导出
docker save > pdai-ubuntu-v2.0.2.tar 57544a04cd1a

# 镜像导入
docker load < pdai-ubuntu-v2.0.2.tar
```



容器：

```shell
# 容器查看
docker ps -a

# 容器启动
docker run -it pdai/ubuntu:v2.0.1 /bin/bash

# 容器停止
docker stop f5332ebce695

# 容器再启动
docker start f5332ebce695

# 容器重启
docker restart f5332ebce695

# 容器导出
docker export f5332ebce695 > ubuntu-pdai-v2.tar

# 容器导入
docker import ubuntu-pdai-v2.tar pdai/ubuntu:v2.0.2

# 容器强制停止并删除
docker rm -f f5332ebce695

# 容器清理
docker container prune

# 容器别名操作
docker run -itd --name pdai-ubuntu-202 pdai/ubuntu:v2.0.2 /bin/bash
```



查看日志：

```shell
#例：实时查看docker容器名为user-uat的最后10行日志
docker logs -f -t --tail 10 user-uat

#例：查看指定时间后的日志，只显示最后100行：
docker logs -f -t --since="2018-02-08" --tail=100 user-uat

#例：查看最近30分钟的日志:
docker logs --since 30m user-uat

#例：查看某时间之后的日志：
docker logs -t --since="2018-02-08T13:23:37" user-uat

#例：查看某时间段日志：
docker logs -t --since="2018-02-08T13:23:37" --until "2018-02-09T12:23:37" user-uat

#例：将错误日志写入文件：
docker logs -f -t --since="2018-02-18" user-uat | grep error >> logs_error.txt
```



启动容器：

```sh
docker run -itd xxx/ubuntu:v2.0.1 /bin/bash
```

- `-it` 可以连写的，表示 `-i -t`
- `-t`: 在新容器内指定一个伪终端或终端。
- `-i`: 允许你对容器内的标准输入 (STDIN) 进行交互
- `-d`: 后台模式



Docker后台模式：

```shell
# 使用docker attach进入后，exit便容器也停止了
docker attach xxxx
# docker exec 命令，退出容器终端，不会导致容器的停止(建议使用)
docker exec -it f5332ebce695 /bin/bash
```



DockerFile 文件执行：

1. 执行以下命令来构建 Docker 镜像：

   docker build -t <image_name> .

   其中，`<image_name>` 为镜像指定的名称，可以自定义。命令中的 `.` 表示 DockerFile 文件所在的当前目录。

2. 查看已构建的镜像：docker images

3. 运行该镜像

   docker run -d <image_name>

   其中，`<image_name>` 是您在构建镜像时指定的名称。选项 `-d` 表示在后台运行容器。



> https://pdai.tech/md/interview/x-interview-2.html#_15-2-docker