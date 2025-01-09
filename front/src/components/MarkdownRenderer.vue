<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import MarkdownIt from 'markdown-it'

export default defineComponent({
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const md = new MarkdownIt()
    const { content } = toRefs(props)
    const compiledMarkdown = computed(() => {
      return md.render(content.value)
    })
    return { compiledMarkdown }
  },
})
</script>

<style scoped></style>
