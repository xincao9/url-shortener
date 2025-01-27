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
export NODE_ENV='production'
```

### url-shortener/front/src/plugins/axios.js 修改

```js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://${短链域名}',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
```

#### 建表

```sql
CREATE DATABASE `url_shortener` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `raw` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `raw` (`raw`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### 界面打包

```shell
cd url-shortener/front #切换目录
npm run build #构建 TIP: 打包时确认NODE_ENV环境变量等于development
```

### 启动

```shell
cd url-shortener #切换目录
node ./bin/www #启动
```

**浏览器访问域名 https://${短链域名}**
