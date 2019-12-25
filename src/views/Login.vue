<template>
  <div class="login">
    <div class="title">Sign In</div>
    <div class="domain">Domain: {{ domain }}</div>
    <div class="tips">
      No account yet?
      <span @click="$router.push({ path: '/register' })">SIGN UP</span>
    </div>
    <el-tabs class="tab_layout" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Password login" name="password"></el-tab-pane>
      <el-tab-pane label="QR code login" name="qrcode"></el-tab-pane>
    </el-tabs>
    <LoginFrom-div v-if="currentBoll"></LoginFrom-div>
    <LoginQrCode-div v-else></LoginQrCode-div>
    <!-- <div class="form_area">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="username" prop="userName">
          <el-input autocomplete="off" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Sign in</el-button
          >
        </el-form-item>
      </el-form>
    </div> -->
  </div>
</template>

<script>
import LoginFromDiv from '../components/LoginForm'
import LoginQrCodeDiv from '../components/LoginQrcode'
export default {
  data() {
    return {
      domain: 'on.ont',
      activeName: 'password',
      currentBoll: true
    }
  },
  components: { LoginFromDiv, LoginQrCodeDiv },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'password') {
        this.currentBoll = true
      } else {
        this.currentBoll = false
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  max-width: 1020px;
  margin: 0 auto;
  .domain {
    font-size: 20px;
    line-height: 36px;
  }
  .title {
    font-size: 50px;
    font-weight: bold;
    line-height: 200px;
    padding-top: 100px;
  }
  .tips {
    font-size: 20px;
    span {
      color: #2472cc;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .tab_layout {
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
