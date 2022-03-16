# nacos



## 启动&停止

启动：

```shell
➜  bin /Users/lizhifu/Downloads/cloud/nacosdefault/bin
➜  bin sh startup.sh -m standalone
/Users/lizhifu/Library/Java/JavaVirtualMachines/openjdk-17.0.2/Contents/Home/bin/java   -Xms512m -Xmx512m -Xmn256m -Dnacos.standalone=true -Dnacos.member.list= -Xlog:gc*:file=/Users/lizhifu/Downloads/cloud/nacosdefault/logs/nacos_gc.log:time,tags:filecount=10,filesize=102400 -Dloader.path=/Users/lizhifu/Downloads/cloud/nacosdefault/plugins/health,/Users/lizhifu/Downloads/cloud/nacosdefault/plugins/cmdb -Dnacos.home=/Users/lizhifu/Downloads/cloud/nacosdefault -jar /Users/lizhifu/Downloads/cloud/nacosdefault/target/nacos-server.jar  --spring.config.additional-location=file:/Users/lizhifu/Downloads/cloud/nacosdefault/conf/ --logging.config=/Users/lizhifu/Downloads/cloud/nacosdefault/conf/nacos-logback.xml --server.max-http-header-size=524288
nacos is starting with standalone
nacos is starting，you can check the /Users/lizhifu/Downloads/cloud/nacosdefault/logs/start.out
➜  bin
```

停止：

sh shutdown.sh

访问地址：nacos / nacos

http://127.0.0.1:8848/nacos/index.html 