<script setup></script>

<template>
  <el-container>
    <el-header>
      <el-row style="text-align: center; margin-top: 50px;">
        <el-col :span="6">
          <el-statistic title="访问量" :value="1" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="使用量" :value="2" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="成功量" :value="3" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="失败量" :value="4" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style="text-align: center; margin-top: 50px;">
        <el-col :span="8" :offset="8">
          <el-image style="width: 100px; height: 100px;" :src="url" :fit="fit" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
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
