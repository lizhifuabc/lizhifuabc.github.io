# git强制覆盖本地命令

- git强制覆盖本地命令（分步执行）：

  ```shell
  git fetch --all
  git reset --hard origin/master
  git pull
  ```


- git强制覆盖本地命令（单条执行）：
  
  ```shell
  git fetch --all && git reset --hard origin/master && git pull
  ```