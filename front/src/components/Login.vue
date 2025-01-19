<template>
  <el-dialog v-model="props.show" title="登陆" destroy-on-close center align-center @close="close">
    <el-form :model="loginForm" label-width="auto">
      <el-form-item label="手机号">
        <el-input v-model="loginForm.cellphone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" round @click="login">登陆</el-button>
        <el-button type="primary" round @click="register">注册</el-button>
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

const loginForm = ref({
  cellphone: '',
  password: '',
  verificationCode: '',
})

const login = () => {
  console.log(loginForm.value)
}

const register = () => {
  console.log(loginForm.value)
}
</script>

<style scoped></style>
