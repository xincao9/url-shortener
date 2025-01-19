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
    <el-form :model="loginForm" label-width="auto">
      <el-form-item>
        <el-input v-model="loginForm.cellphone" placeholder="请输入中国大陆手机号" />
        <template #prepend>+86</template>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.verificationCode" placeholder="请输入6位验证码">
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

const loginForm = ref({
  cellphone: '',
  verificationCode: '',
})

const login = () => {
  console.log(loginForm.value)
}
</script>

<style scoped></style>
