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
import { ref, onMounted, watch } from 'vue'
import axios from '../plugins/axios'
import MarkdownRenderer from './MarkdownRenderer.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { useRoute } from 'vue-router'

const content = ref('')
const route = useRoute()

const read = async (path) => {
  try {
    let url = ''
    if (path == '/f/api-doc') {
      url = '/md/api-doc.md'
    } else if (path == '/f/deploy') {
      url = '/md/deploy.md'
    } else if (path == '/f/grpc-pure') {
      url = '/md/grpc-pure.md'
    } else if (path == '/f/grpc-pure-spring-boot-starter') {
      url = '/md/grpc-pure-spring-boot-starter.md'
    } else if (path == '/f/infra-config') {
      url = '/md/infra-config.md'
    } else if (path == '/f/infra-trace') {
      url = '/md/infra-trace.md'
    }
    content.value = await axios.get(url)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => read(route.path))

watch(
  () => route.path,
  (newPath) => {
    read(newPath)
  },
)
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
