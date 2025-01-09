<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from '../plugins/axios'
import { useCreateHistoryStore } from '../stores/create-history'
import { ElNotification } from 'element-plus'
import HeaderComponent from '../components/HeaderComponent.vue'
import StatisticsComponent from '../components/StatisticsComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
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

const notification = ({ title = '提醒', message = '信息', type = 'warning' } = {}) => {
  ElNotification({
    title,
    message,
    type,
  })
}
</script>

<template>
  <HeaderComponent />
  <el-container>
    <el-main>
      <StatisticsCompoent />
      <el-row style="text-align: center; margin-top: 40px">
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
  </el-container>
  <FooterComponent />
</template>

<style scoped></style>
