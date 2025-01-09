# API 文档

### 创建短链

#### curl 请求

```curl
curl -X POST -H 'content-type:application/json' 'https://golinks.fun/urls' -d '{
  "raw": "https://google.com"
}'
```

#### 响应体

```json
{
  "s": "https://golinks.fun/s/b"
}
```
