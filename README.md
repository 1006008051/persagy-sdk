# persagy-sdk

`提供微信、钉钉常用的api服务`

install

```
npm install persagy-sdk
```
## 钉钉

usage

```
import {dingding} from "persagy-sdk"

实例化sdk类
const dd = new dingding(appKey, appSecret)
```

### 获取access_token

```
getAccessToken(): Promise<IToken>
```
### 获取用户ID

```
getUserId(code: string, token?: string)
```

### 获取用户信息

```
getUser(code: string, token?: string)
```

#####  前端获取code代码示例

```
import * as dd from 'dingtalk-jsapi';
const corpId = 'xx'; // 企业corpId
dd.ready(()=>{
    dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess:  (info)=> {
            const {code} = info;
        },
        onFail:  (err)=> {
            console.log(err)
        }
    });
});
```

## 微信

usage

```
import {weixin} from "persagy-sdk"

实例化sdk类
const wx = new weixin(appId, appSecret)
```

### 获取access_token

```
getAccessToken(): Promise<IToken>
```

### 获取用户信息

```
getUser(code: string)
```
#####  前端获取code代码示例

```
公众号里设置菜单地址为url, 微信会跳转到redirect_uri并在地址栏上拼接code参数
const appid='xx'; //微信的appid
const redirect_uri='xx'; //微信的回调页面
const url = https://open.weixin.qq.com/connect/oauth2/authorize?appid=appid&redirect_uri=redirect_uri&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
```