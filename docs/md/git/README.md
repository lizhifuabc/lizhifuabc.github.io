# Git 命令

```shell
# 全局用户名密码 & 记住用户名密码
git config --global user.name "bryan sun"
git config --global user.email "hitsjt@gmail.com"

git config --global credential.helper store
```



```shell
# 把暂存区中的文件提交到本地仓库，调用文本编辑器输入该次提交的描述信息
$ git commit

# 把暂存区中的文件提交到本地仓库中并添加描述信息
$ git commit -m "<提交的描述信息>"

# 把所有修改、已删除的文件提交到本地仓库中
# 不包括未被版本库跟踪的文件，等同于先调用了 "git add -u"
$ git commit -a -m "<提交的描述信息>"

# 修改上次提交的描述信息
$ git commit --amend

```

```shell
# 把指定的文件添加到暂存区中
$ git add <文件路径>

# 添加所有修改、已删除的文件到暂存区中
$ git add -u [<文件路径>]
$ git add --update [<文件路径>]

# 添加所有修改、已删除、新增的文件到暂存区中，省略 <文件路径> 即为当前目录
$ git add -A [<文件路径>]
$ git add --all [<文件路径>]

# 查看所有修改、已删除但没有提交的文件，进入一个子命令系统
$ git add -i [<文件路径>]
$ git add --interactive [<文件路径>]

```

```shell
# 更改仓库地址
1、git remote rm origin（删除远程地址）
# ‘[]’内为新的git仓库地址，真实写命令时不要带中括号‘[]’
2、git remote add origin [url]
# 分支master 设置为跟踪来自origin的远程分支master
3、git branch –set-upstream-to=origin/master master
```

