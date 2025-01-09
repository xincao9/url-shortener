<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from '../plugins/axios'
import { ElNotification } from 'element-plus'

const statistics = ref({})

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

onMounted(queryStatistics)
</script>

<template>
  <el-row style="text-align: center; margin-top: 30px">
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
</template>

<style scoped></style>
