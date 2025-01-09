<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  if (key === '2-2') {
    window.location.href = 'https://github.com/xincao9/url-shortener'
    return
  }
  let name = ''
  if (key === '1') {
    name = 'url-create'
  } else if (key === '2-1') {
    name = 'api-doc'
  }
  console.log({ key, keyPath, name })
  router.push({ name })
}
</script>

<template>
  <el-container>
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
              <el-menu-item index="2-2">项目仓库</el-menu-item>
              <el-menu-item index="2-3" disabled>私有化部署</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3" disabled>企业化服务</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<style scoped></style>
