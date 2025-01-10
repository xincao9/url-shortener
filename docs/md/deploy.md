# 私有化部署

### 下载代码

```shell
git clone https://github.com/xincao9/url-shortener.git
```

### 配置

#### url-shortener/config/config.js 修改

```js
const config = {
  production: {
    mysql: {
      username: '${用户名}',
      password: '${密码}',
      database: 'url_shortener',
      host: '${mysql地址}',
      dialect: 'mysql',
    },
    domain: 'https://${短链域名}',
    redis: {
      url: 'redis://${用户名}:${密码}@{redis地址}:6379/0',
    },
  },
}
```

#### 环境变量

```shell
export NODE_ENV = 'production'
```

### url-shortener/front/src/plugins/axios.js 修改

```js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://${短链域名}',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
```

### 界面打包

```shell
cd url-shortener/front #切换目录
npm run build #构建
```

### 启动

```shell
cd url-shortener #切换目录
node ./bin/www #启动
```

**浏览器访问域名 https://${短链域名}**
