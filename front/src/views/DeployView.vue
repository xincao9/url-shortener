<template>
  <el-container class="app-container">
    <Header />
    <el-main class="app-main">
      <el-row>
        <el-col :span="24">
          <MarkdownRenderer :content="content" />
        </el-col>
      </el-row>
    </el-main>
    <Footer />
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../plugins/axios'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const content = ref('')

const read = async () => {
  try {
    content.value = await axios.get('/md/deploy.md')
  } catch (error) {
    console.log(error)
  }
}

onMounted(read)
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
