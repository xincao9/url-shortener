# infra-trace

## 设计思想

**简单专注**：拒绝臃肿的依赖，保持功能专一。

## 功能点

infra-trace 提供以下功能：

- 使用 Zipkin 追踪调用
- 追踪范围：
  - Spring MVC 接口追踪
  - MyBatis 数据库调用追踪
  - gRPC 远程调用追踪
  - Redis 访问追踪

## 依赖

在你的 `pom.xml` 文件中添加以下依赖：

```xml
<dependency>
    <groupId>fun.golinks</groupId>
    <artifactId>infra-trace</artifactId>
    <version>0.0.3</version>
</dependency>
```

## 配置文件

在你的 `application.yml` 文件中添加以下配置：

```yaml
infra:
  trace:
    enabled: true
    zipkin:
      url: 'http://localhost:9411/api/v2/spans'
      sampler: '1.0F'
```

## 注意事项

- 需要根据需求不断扩展打点。
- 在大流量情况下，建议使用 ELK 相关技术进行数据上报。

---
