# nginx配置访问本地静态资源

位置：

/usr/local/nginx/conf

```nginx
 location / {
            root   /opt/web/web;
            index  index.html index.htm;
        }
```

reload：

nginx -s reload