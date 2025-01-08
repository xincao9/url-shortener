<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from '../plugins/axios'
import { useCreateHistoryStore } from '../stores/create-history'
import { ElNotification } from 'element-plus'

const statistics = ref({})
const raw = ref('')
const activeIndex = ref('1')
const createHistoryStore = useCreateHistoryStore()
const { createHistory, add } = createHistoryStore

const create = async () => {
  try {
    if (validateUrl(raw.value) === false) {
      raw.value = ''
      return
    }
    const response = await axios.post('/urls', { raw: raw.value })
    add({ s: response.s, raw: raw.value })
    raw.value = ''
    queryStatistics()
    notification({ title: '成功', message: '创建短链成功', type: 'success' })
  } catch (error) {
    console.log(error)
    notification({ title: '警告', message: '创建短链失败' })
  }
}

const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    console.log(error)
    notification({ title: '警告', message: '提交数据不是标准链接' })
  }
  return false
}

const queryStatistics = async () => {
  try {
    statistics.value = await axios.get('/statistics')
  } catch (error) {
    console.log(error)
    notification({ title: '警告', message: '获取统计数据失败' })
  }
}

const notification = ({ title = '提醒', message = '信息', type = 'warning' } = {}) => {
  ElNotification({
    title,
    message,
    type,
  })
}

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

onMounted(queryStatistics)
// TODO 将页面的header以及统计模块组件化
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
      <el-row style="text-align: center; margin-top: 50px">
        <el-col :span="6">
          <el-statistic title="访问量" :value="statistics.visits" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="使用量" :value="statistics.usage" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="成功量" :value="statistics.success" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="失败量" :value="statistics.failures" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style="text-align: center; margin-top: 70px">
        <el-col :span="8" :offset="8">
          <img style="width: 100px; height: 100px" src="@/assets/logo.svg" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="16" :offset="4">
          <el-form>
            <el-form-item label="链接">
              <el-input v-model="raw" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin: auto" @click="create">新建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="20" :offset="2">
          <el-table :data="createHistory" empty-text="空">
            <el-table-column prop="createTime" label="时间" width="210px" />
            <el-table-column prop="raw" label="原链" truncated />
            <el-table-column prop="s" label="短链" width="210px" />
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-divider />
    </el-footer>
  </el-container>
</template>

<style scoped></style>
