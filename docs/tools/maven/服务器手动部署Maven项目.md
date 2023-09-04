# 服务器手动部署Maven项目

## maven 安装

- yum install maven -y
-  wget https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.8.5/binaries/apache-maven-3.8.5-bin.tar.gz

## jdk 安装

1. 查找jdk：yum -y list java*

2. 安装jdk：yum -y install java-17-openjdk.x86_64

3. 检查版本：

   ```shell
   [root@iZ2zehgqgys50t73mum5zyZ lib]# java -version
   openjdk version "17.0.1" 2021-10-19 LTS
   OpenJDK Runtime Environment 21.9 (build 17.0.1+12-LTS)
   OpenJDK 64-Bit Server VM 21.9 (build 17.0.1+12-LTS, mixed mode, sharing)
   [root@iZ2zehgqgys50t73mum5zyZ lib]# 
   ```

4. jdk默认安装在 /usr/lib/jvm 目录下

5. 卸载：

   ```
   rpm -qa | grep java
    
   或者使用
   yum  list installed | grep java
   
   rpm -e   java-1.7.0-openjdk.x86_64
   rpm -e   java-1.7.0-openjdk-headless.x86_64
    
   或者使用
   yum remove *openjdk* 
   ```

   

## git

首先安装安装 Git：yum install -y git

Git 全局设置:

```
git config --global user.name "XXX"
git config --global user.email "XX"
git config --global user.password “密码”
```

创建 git 仓库:

```shell
mkdir demo
cd demo
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/lizhifu/demo.git
git push -u origin "master"
```

已有仓库

```shell
cd existing_git_repo
git remote add origin https://gitee.com/lizhifu/demo.git
git push -u origin "master"

git pull origin master:master

```

```shell
# 在使用https git拉取代码时，每次git pull的时候都会让输入用户名和密码

# 进入项目目录

git config --global credential.helper store

# 如果要清除用户名和密码
# 运行一下命令缓存输入的用户名和密码

git config --global credential.helper wincred

# 清除掉缓存在git中的用户名和密码

git credential-manager uninstall

```

