<template>
  <HeaderComponent />
  <el-container>
    <el-main>
      <el-row>
        <MarkdownRenderer :content="content" />
      </el-row>
    </el-main>
  </el-container>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../plugins/axios'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

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
<style scoped></style>
