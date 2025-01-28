# infra-bom 父工程

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>fun.golinks</groupId>
        <artifactId>infra-bom</artifactId>
        <version>0.0.1</version>
        <relativePath/>
    </parent>
    <artifactId>sample</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>fun.golinks</groupId>
            <artifactId>grpc-pure-spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>fun.golinks</groupId>
            <artifactId>infra-trace</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
                <version>${spring-boot.version}</version>
            </plugin>
        </plugins>
    </build>
</project>
```
