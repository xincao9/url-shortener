# url-shortener

#### URL shortening services convert long URLs into shorter, easier-to-share links. These services enhance online sharing, improve aesthetics, and offer analytics. They facilitate digital communication by making links more manageable and providing insights into user behavior.

## Create

```shell
$curl -X POST -H 'content-type:application/json' 'http://localhost:3000/urls' -d '{"raw": "http://baidu.com"}'
{"s":"http://localhost:3000/urls/1"}
```

## Using short links

```shell
$curl -X GET 'http://localhost:3000/urls/1' -I
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
