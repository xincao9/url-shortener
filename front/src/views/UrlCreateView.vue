<script setup></script>

<template>
  <el-container style="height: 500px">
    <el-header>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form>
            <el-form-item label="链接">
              <el-input v-model="raw" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin: auto;">新建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style scoped></style>
