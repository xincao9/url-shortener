# infra-config

## 设计思想

**简单专注**；无需为了集中配置管理，而增加新的中间件；依赖git对配置进行权限和版本管理；极少的代码量方便进行二次开发

## 功能点

- 项目启动和运行中，实时同步git中的项目配置文件到本地，位于 ${home}/.config/{infra.config.app-name}/ 目录下
- @Value标记的Bean字段，实时更新最新的配置
- @ConfigurationProperties 标记的配置属性Bean，实时更新最新的配置

## 依赖

```xml
 <dependency>
    <groupId>fun.golinks</groupId>
    <artifactId>infra-config</artifactId>
    <version>0.0.3</version>
</dependency>
```

## 配置文件

位置：classpath:/resources/config.yaml

```yaml
infra:
  config:
    app-name: sample # 应用名，一般设置为spring.application.name一样
    enabled: true # 功能是否开启
    type: git # 使用git做为配置中心
    git:
      uri: https://github.com/xincao9/sample-config-repo.git # git配置文件仓库
      remote: origin # 远程库名，一般不需要改动
      remote-branch-name: main # 配置使用的代码分支
      delay-seconds: 30 # 配置同步到本地的延迟，单位：秒
```

## 缺点

- 相比于Apollo等中间件没有可视化UI使用
- 针对部分机器进行配置灰度，需配置到灰度分支的方式；如：infra.config.git.remote-branch-name=gray
