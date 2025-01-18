<script setup>
import { watch, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeIndex = ref('')

const currentIndex = (path) => {
  if (path === '/' || path === '') {
    return '1'
  } else if (path === '/f/api-doc') {
    return '2-1'
  } else if (path === '/f/deploy') {
    return '2-2'
  }
  return '1'
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

const handleSelect = (key, keyPath) => {
  if (key === '2-3') {
    window.open('https://github.com/xincao9/url-shortener', '_blank')
    return
  }
  let name = ''
  if (key === '1') {
    name = 'url-create'
  } else if (key === '2-1') {
    name = 'api-doc'
  } else if (key === '2-2') {
    name = 'deploy'
  }
  if (name) {
    router.push({ name })
  } else {
    console.log(`No route defined for menu item with key: ${key}`)
  }
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
        >
          <el-menu-item index="1">短链生成器</el-menu-item>
          <el-sub-menu index="2">
            <template #title>接口说明</template>
            <el-menu-item index="2-1">接口文档</el-menu-item>
            <el-menu-item index="2-2">私有化部署</el-menu-item>
            <el-menu-item index="2-3">项目仓库</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3" disabled>企业化服务</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<style scoped></style>
