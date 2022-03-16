# fork代码和提交

1. fork

2.  clone 你 **fork** 仓库的代码

3.  git remote -v 

   ```shell
   ➜  old-ma-java git:(master) git remote -v
   origin  https://gitee.com/lizhifu/old-ma-java.git (fetch)
   origin  https://gitee.com/lizhifu/old-ma-java.git (push)
   ```

4.  git remote add upstream 添加源仓库

   ```
   ➜  old-ma-java git:(master) git remote add upstream https://gitee.com/xiaomgmarz/old-ma-java
   ➜  old-ma-java git:(master) git remote -v                                                   
   origin  https://gitee.com/lizhifu/old-ma-java.git (fetch)
   origin  https://gitee.com/lizhifu/old-ma-java.git (push)
   upstream        https://gitee.com/xiaomgmarz/old-ma-java (fetch)
   upstream        https://gitee.com/xiaomgmarz/old-ma-java (push)
   ➜  old-ma-java git:(master) 
   ```

5.  git fetch upstream 拉取源仓库分支

   ```
   ➜  old-ma-java git:(master) git fetch upstream
   remote: Enumerating objects: 4, done.
   remote: Counting objects: 100% (4/4), done.
   remote: Compressing objects: 100% (3/3), done.
   remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
   Unpacking objects: 100% (3/3), 1.79 KiB | 916.00 KiB/s, done.
   From https://gitee.com/xiaomgmarz/old-ma-java
    * [new branch]      master     -> upstream/master
   ```

   

6.  git merge upstream/master 合并远程master分支到本地分支

   存在冲突时：

   ```
   ➜  old-ma-java git:(master) git merge upstream/master
   Auto-merging README.md
   CONFLICT (content): Merge conflict in README.md
   Automatic merge failed; fix conflicts and then commit the result.
   ➜  old-ma-java git:(master) ✗ 
   
   ```

   

7.  git push 推送到自己的远程
