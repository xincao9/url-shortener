<script setup>
import { watch, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Login from './Login.vue'
import MavenProjectCreate from './MavenProjectCreate.vue'

const route = useRoute()
const router = useRouter()

const activeIndex = ref('')
const loginVisible = ref(false)
const mavenVisible = ref(false)

const currentIndex = (path) => {
  if (path === '/' || path === '') {
    return '1-1'
  } else if (path === '/f/api-doc') {
    return '1-2'
  } else if (path === '/f/deploy') {
    return '1-3'
  } else if (path === '/f/grpc-pure') {
    return '2-1'
  } else if (path === '/f/grpc-pure-spring-boot-starter') {
    return '2-2'
  } else if (path === '/f/infra-config') {
    return '2-3'
  } else if (path === '/f/infra-trace') {
    return '2-4'
  }
  return '1-1'
}

onMounted(() => {
  activeIndex.value = currentIndex(route.path)
})

watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = currentIndex(newPath)
  },
)

const handleSelect = (key) => {
  if (key === '1-4') {
    window.open('https://github.com/xincao9/url-shortener', '_blank')
    return
  }
  if (key === '4') {
    mavenVisible.value = true
    return
  }
  if (key === '5') {
    loginVisible.value = true
    return
  }
  let name = ''
  if (key === '1-1') {
    name = 'url-create'
  } else if (key === '1-2') {
    name = 'api-doc'
  } else if (key === '1-3') {
    name = 'deploy'
  } else if (key === '2-1') {
    name = 'grpc-pure'
  } else if (key === '2-2') {
    name = 'grpc-pure-spring-boot-starter'
  } else if (key === '2-3') {
    name = 'infra-config'
  } else if (key === '2-4') {
    name = 'infra-trace'
  }
  if (name) {
    router.push({ name })
  } else {
    console.log(`No route defined for menu item with key: ${key}`)
  }
}
const closedLoginVisible = () => {
  loginVisible.value = false
}
const closedMavenVisible = () => {
  mavenVisible.value = false
}
</script>

<template>
  <el-header>
    <el-row>
      <el-col :span="24">
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :ellipsis="false"
        >
          <el-sub-menu index="1">
            <template #title>免费短链服务</template>
            <el-menu-item index="1-1">🚳 短链生成器</el-menu-item>
            <el-menu-item index="1-2">🚭️ 接口文档</el-menu-item>
            <el-menu-item index="1-3">🔞 私有化部署</el-menu-item>
            <el-menu-item index="1-4">🚱 代码仓库</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>Java Infra Framework</template>
            <el-menu-item index="2-1">➕️ grpc-pure</el-menu-item>
            <el-menu-item index="2-2">➖️ grpc-pure-spring-boot-starter</el-menu-item>
            <el-menu-item index="2-3">✖️ infra-config</el-menu-item>
            <el-menu-item index="2-4">➗️ infra-trace</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3" disabled>
            <template #title>go-lite框架</template>
            <el-menu-item index="3-1">生成项目</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">🐘 Infra Starter</el-menu-item>
          <el-menu-item index="5" disabled>👵 登陆</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
  <MavenProjectCreate :show="mavenVisible" @show:closed="closedMavenVisible" />
  <Login :show="loginVisible" @show:closed="closedLoginVisible" />
</template>

<style scoped>
.el-menu--horizontal > .el-sub-menu:nth-child(3) {
  margin-right: auto;
}
</style>
