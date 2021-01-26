## web-sdk

`微信、钉钉常用的api服务`

install

```
npm install web-sdk
```
### 钉钉

usage

```
import {dingding} from "web-sdk"

实例化sdk类
const dd = new dingding(appKey, appSecret)
```

##### 获取access_token

```
getAccessToken(): Promise<IToken>
```
##### 获取用户ID

```
getUserId(code: string, token?: string)
```

##### 获取用户信息

```
getUser(code: string, token?: string)
```

### 微信

usage

```
import {weixin} from "web-sdk"

实例化sdk类
const wx = new weixin(appId, appSecret)
```

##### 获取access_token

```
getAccessToken(): Promise<IToken>
```

##### 获取用户信息

```
getUser(code: string)
```