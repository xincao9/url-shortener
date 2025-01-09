<script setup>
import { computed, onMounted, ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
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
              <el-menu-item index="2-1">API文档</el-menu-item>
              <el-menu-item index="2-2">私有化部署</el-menu-item>
              <el-menu-item index="2-3">项目仓库</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3" disabled>企业化服务</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<style scoped></style>
