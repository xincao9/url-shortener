<template>
  <el-dialog
    v-model="props.show"
    title="🦏 创建项目"
    destroy-on-close
    center
    align-center
    @close="close"
    width="50%"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <el-form-item prop="groupId">
        <el-input v-model="form.groupId" placeholder="com.github.xincao9">
          <template #prepend>🐰 组ID</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="artifactId">
        <el-input v-model="form.artifactId" placeholder="demo">
          <template #prepend>🐁 件ID</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="version">
        <el-input v-model="form.version" placeholder="1.0.0-SNAPSHOT">
          <template #prepend>🦇 版本</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" round @click="submit">🐭 提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import axios from '../plugins/axios'

const emit = defineEmits(['show:closed'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const close = () => {
  emit('show:closed', true)
}

const form = ref({
  groupId: '',
  artifactId: '',
  version: '',
})

const formRef = ref(null)

const rules = {
  groupId: [{ required: true, message: '请输入组ID', trigger: 'blur' }],
  artifactId: [{ required: true, message: '请输入工件ID', trigger: 'blur' }],
  version: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
}

const submit = async () => {
  const formRefValue = formRef.value
  formRefValue.validate(async (valid) => {
    if (valid) {
      try {
        const data = await axios.post('/maven/generate', form.value)
        const { id } = data
        if (id) {
          window.open(`https://golinks.fun/maven/download/${id}`, '_blank')
          form.value.groupId = ''
          form.value.artifactId = ''
          form.value.version = ''
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      return false
    }
  })
}
</script>

<style scoped></style>
