# url-shortener

#### URL shortening services convert long URLs into shorter, easier-to-share links. These services enhance online sharing, improve aesthetics, and offer analytics. They facilitate digital communication by making links more manageable and providing insights into user behavior.

## Installation instructions

[https://golinks.fun/f/deploy](https://golinks.fun/f/deploy)

```bash
curl -X POST -H 'content-type:application/json' 'http://localhost:3000/maven/generate' -d '{
    "groupId": "com.xincao",
    "artifactId": "demo",
    "version": "1.0.0-SNAPSHOT"
}' | jq .id
```

```bash
brower 'http://localhost:3000/maven/download/{id}'
```
