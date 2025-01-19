<template>
  <el-dialog
    v-model="props.show"
    title="短信登陆/注册"
    destroy-on-close
    center
    align-center
    @close="close"
    width="30%"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <el-form-item prop="cellphone">
        <el-input v-model="form.cellphone" placeholder="请输入中国大陆手机号" />
        <template #prepend>+86</template>
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-input v-model="form.verificationCode" placeholder="请输入6位验证码">
          <template #append><el-link type="warning">获取验证码</el-link></template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" round @click="login">登陆/注册</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

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
  cellphone: '',
  verificationCode: '',
})

const formRef = ref(null)

const rules = {
  cellphone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入正确手机号', trigger: ['blur', 'change'] },
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入正确验证码', trigger: ['blur', 'change'] },
  ],
}

const login = () => {
  const formRefValue = formRef.value
  formRefValue.validate((valid) => {
    if (valid) {
      alert('提交成功!')
    } else {
      return false
    }
  })
}
</script>

<style scoped></style>
