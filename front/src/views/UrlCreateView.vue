<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from '../plugins/axios'
import { useCreateHistoryStore } from '../stores/create-history'

const statistics = ref({
  visits: 0,
  usage: 0,
  success: 0,
  failures: 0,
})
const raw = ref('')

const createHistoryStore = useCreateHistoryStore()

const { createHistory, add } = createHistoryStore
const create = async () => {
  try {
    const response = await axios.post('/urls', { raw: raw.value })
    add({ s: response.s, raw: raw.value })
    queryStatistics()
  } catch (error) {
    console.log(error)
  }
}

const queryStatistics = async () => {
  try {
    statistics.value = await axios.get('/statistics')
  } catch (error) {
    console.log(error)
  }
}

onMounted(queryStatistics)
</script>

<template>
  <el-container>
    <el-header>
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
      <el-row style="text-align: center; margin-top: 50px">
        <el-col :span="8" :offset="8">
          <img style="width: 100px; height: 100px" src="@/assets/logo.svg" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8" :offset="8">
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
            <el-table-column prop="createTime" label="时间" />
            <el-table-column prop="raw" label="原链" truncated />
            <el-table-column prop="s" label="短链" />
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style scoped></style>
