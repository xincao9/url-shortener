# infra-trace

## 依赖jar

```xml
<dependency>
    <groupId>fun.golinks</groupId>
    <artifactId>infra-trace</artifactId>
    <version>0.0.1</version>
</dependency>
```

## 相关配置及默认值

```yaml
infra:
  trace:
    enable: true
    zipkin:
      url: 'http://localhost:9411/api/v2/spans'
      sampler: '1.0F'
```
