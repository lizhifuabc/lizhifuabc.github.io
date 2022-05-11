# 前后端分离项目Token方案

前后端分离下的登录解决方案，目前大多数都采用请求头携带 Token 的形式。

## 微信授权例子

- 用户在第三方应用的网页上完成微信授权以后，第三方应用可以获得 code（授权码）。
- 第三方应用通过code获取网页授权凭证access_token和刷新凭证 refresh_token。
- 使用 refresh_token 刷新access_token

<img src="../../assets/img/%E5%BE%AE%E4%BF%A1%E6%8E%88%E6%9D%83.png" alt="微信授权" style="zoom:50%;" />

## 单token

<img src="../../assets/img/%E5%8D%95token.png" alt="单token" style="zoom:50%;" />

## 双token

<img src="../../assets/img/%E5%8F%8Ctoken.png" alt="双token" style="zoom:50%;" />

好处：

假如：access_token（有效期2小时）和refresh_token（有效期7天），那么只要用户在7天内有操作，那么就可以不用重新登录，而如果用户在7天内没有任何操作，那么则需要用户重新登录。

- access_token，有效期短，可以防止 access_token 被劫持之后，无法一直使用。
- refresh_token，有效期长，可以保证用户不用一直登录的情况下减少登录用的是账号和密码在网络中的传输。
- refresh_token，每次使用时都返回新的refresh_token，而不是延长旧的refresh_token的有效期，主要是为了安全，避免refresh_token被非法截获后一直可用。

