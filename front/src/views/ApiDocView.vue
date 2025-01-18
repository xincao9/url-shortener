<template>
  <Header />
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <MarkdownRenderer :content="content" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <Footer />
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
    content.value = await axios.get('/md/api-doc.md')
  } catch (error) {
    console.log(error)
  }
}

onMounted(read)
</script>
<style scoped></style>
