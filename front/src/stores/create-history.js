import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCreateHistoryStore = defineStore('create-history', () => {
  const createHistory = ref([])

  function add({ raw, s }) {
    createHistory.value.push({ raw, s, createTime: new Date().toISOString() })
  }

  return { createHistory, add }
})
