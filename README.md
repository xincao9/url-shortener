# url-shortener

## 短链服务

## 创建短链

```shell
$curl -X POST -H 'content-type:application/json' 'http://localhost:3000/urls' -d '{"raw": "http://baidu.com"}'
{"s":"http://localhost:3000/urls/1"}
```

## 使用短链

```shell
$ curl -X GET 'http://localhost:3000/urls/1' -I
HTTP/1.1 302 Found
X-Powered-By: Express
Location: http://baidu.com
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 38
Date: Mon, 06 Jan 2025 14:54:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
