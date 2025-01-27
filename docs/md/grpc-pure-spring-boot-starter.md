# grpc-pure-spring-boot-starter

`grpc-pure-spring-boot-starter` 是一个简化 gRPC 集成到 Spring Boot 应用中的轻量级框架。gRPC 作为优秀的开源 RPC 框架，在 许多大型企业中被广泛使用。然而，对于小型企业而言，缺乏扩展能力可能会成为阻碍大规模使用的难点。本项目基于本人在互联网公司参与大规模 gRPC 服务落地项目的经验沉淀，为开发者提供一个易用且实用的集成示例。

## 核心功能

1. **服务端扩展能力**：

   - 提供对注册中心的适配支持，扩展性强。
   - 默认内置对 `Nacos` 注册中心的支持。

2. **客户端增强功能**：
   - 增加了连接 Ping 机制，用于保持连接的活跃性。
   - 提供对服务发现的适配支持，方便扩展。
   - 默认内置支持 `nacos://{应用名}` 协议格式的服务发现。

## 快速开始

### 环境准备

本项目示例代码依赖于 Nacos 注册中心。您可以参考 [Nacos 官方快速启动指南](https://nacos.io/docs/v2.3/quickstart/quick-start/) 安装和启动 Nacos Server。

### 添加依赖

在您的 Maven 项目中添加如下依赖：

```xml
<dependency>
    <groupId>fun.golinks</groupId>
    <artifactId>grpc-pure-spring-boot-starter</artifactId>
    <version>1.0.3</version>
</dependency>
```

### 可选：配置 Maven 插件以编译 Protobuf 文件

```xml
<build>
    <extensions>
        <extension>
            <groupId>kr.motd.maven</groupId>
            <artifactId>os-maven-plugin</artifactId>
            <version>1.6.2</version>
        </extension>
    </extensions>
    <plugins>
        <plugin>
            <groupId>org.xolstice.maven.plugins</groupId>
            <artifactId>protobuf-maven-plugin</artifactId>
            <version>0.6.1</version>
            <configuration>
                <protocArtifact>com.google.protobuf:protoc:3.19.2:exe:${os.detected.classifier}</protocArtifact>
                <pluginId>grpc-java</pluginId>
                <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.42.1:exe:${os.detected.classifier}</pluginArtifact>
            </configuration>
            <executions>
                <execution>
                    <goals>
                        <goal>compile</goal>
                        <goal>compile-custom</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### 定义 Protobuf 文件（`greeter.proto`）

在 `src/main/proto` 目录下创建如下 `greeter.proto` 文件：

```protobuf
syntax = "proto3";

package fun.golinks.grpc.pure;

option java_multiple_files = true;

// Greeting 服务定义
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

// 请求消息（包含用户名称）
message HelloRequest {
  string name = 1;
}

// 响应消息（包含问候语）
message HelloReply {
  string message = 1;
}
```

### 配置属性及默认值

在 `application.yml` 文件中配置 gRPC 相关属性，以下为默认值示例：

```yaml
grpc:
  pure:
    app-name: ${spring.application.name}
    server:
      port: 9999
    discovery:
      type: nacos
      nacos:
        address: 127.0.0.1:8848
        username: nacos
        password: nacos
```

### 【服务端】实现 Greeter 服务

创建一个 Spring Bean，由 gRPC 框架负责管理服务端逻辑：

```java
import fun.golinks.grpc.pure.GreeterGrpc;
import fun.golinks.grpc.pure.HelloReply;
import fun.golinks.grpc.pure.HelloRequest;
import fun.golinks.grpc.pure.util.GrpcConsumer;
import io.grpc.stub.StreamObserver;
import org.springframework.stereotype.Service;

@Service
public class GreeterRemote extends GreeterGrpc.GreeterImplBase {

   private static final String GREETING_PREFIX = "Server:Hello ";

   private static final GrpcConsumer<HelloRequest, HelloReply> grpcConsumer = GrpcConsumer.wrap(helloRequest -> buildHelloReply(helloRequest.getName()));

   @Override
   public void sayHello(HelloRequest req, StreamObserver<HelloReply> responseObserver) {
      grpcConsumer.accept(req, responseObserver);
   }

   private static HelloReply buildHelloReply(String name) {
      return HelloReply.newBuilder()
              .setMessage(GREETING_PREFIX + name)
              .build();
   }
}
```

### 【客户端】配置 GrpcPure

创建 gRPC 客户端 Bean，通过 `Nacos` 服务发现机制连接远程服务。

```java
import fun.golinks.grpc.pure.GreeterGrpc;
import fun.golinks.grpc.pure.GrpcChannels;
import io.grpc.ManagedChannel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcPureConfig {

   private static final String GREETER_APP_URL = "nacos://greeter";

   @Bean
   public GreeterGrpc.GreeterBlockingStub greeterBlockingStub(GrpcChannels grpcChannels) {
      ManagedChannel channel = grpcChannels.create(GREETER_APP_URL);
      return GreeterGrpc.newBlockingStub(channel);
   }

   @Bean
   public GreeterRemote greeterRemote() {
      return new GreeterRemote();
   }
}
```

### 【客户端】调用远程服务

使用配置的 `GreeterBlockingStub` 调用远程服务接口：

```java
import fun.golinks.grpc.pure.GreeterGrpc;
import fun.golinks.grpc.pure.HelloReply;
import fun.golinks.grpc.pure.HelloRequest;
import fun.golinks.grpc.pure.starter.config.GrpcPureConfig;
import fun.golinks.grpc.pure.util.GrpcFunction;
import fun.golinks.grpc.pure.util.GrpcInvoker;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@Slf4j
@SpringBootTest(classes = GrpcPureConfig.class)
public class GreeterRemoteTests {

   private static final int RANDOM_STRING_LENGTH = 32;

   @Resource
   private GreeterGrpc.GreeterBlockingStub greeterBlockingStub;

   private final GrpcInvoker<HelloRequest, HelloReply> grpcInvoker = GrpcInvoker.wrap(new GrpcFunction<HelloRequest, HelloReply>() {
      @Override
      public HelloReply apply(HelloRequest helloRequest) throws Throwable {
         return greeterBlockingStub.sayHello(helloRequest);
      }
   });

   @Test
   public void testSayHello() {
      for (int i = 0; i < 100; i++) {
         HelloRequest request = createHelloRequest();
         log.info("REQUEST: {}", request.getName());
         HelloReply response = grpcInvoker.apply(request);
         log.info("RESPONSE: {}", response.getMessage());
      }
   }

   private HelloRequest createHelloRequest() {
      String randomName = RandomStringUtils.randomAlphabetic(RANDOM_STRING_LENGTH);
      return HelloRequest.newBuilder().setName(randomName).build();
   }
}
```

## 许可证

本项目采用 [MIT License](./LICENSE) 开源协议，欢迎自由使用和修改。

---

通过配置 `grpc-pure-spring-boot-starter`，您可以轻松将 gRPC 集成到 Spring Boot 应用中，并享受简洁、高效、可扩展的 RPC 解决方案！
