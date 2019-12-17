<template>
  <div class="login">
    <div class="title">Sign In</div>
    <div class="domain">Domain: {{ domain }}</div>
    <div class="tips">
      No account yet?
      <span @click="$router.push({ path: '/register' })">SIGN UP</span>
    </div>
    <div class="form_area">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      domain: 'on.ont',
      ruleForm: {
        password: '',
        userName: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: 'Please enter username',
            trigger: 'change'
          },
          {
            min: 2,
            max: 10,
            message: '2 to 10 characters in length',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            pattern: /\S/,
            message: 'Please enter password',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      try {
        let apiData = await this.$store.dispatch('loginAcc', this.ruleForm)
        console.log(apiData)
        const { desc, result } = apiData.data
        if (desc === 'SUCCESS') {
          this.$message({
            message: 'Sign in Successful!',
            center: true,
            type: 'success'
          })
          sessionStorage.setItem('ons', result.userName)
          sessionStorage.setItem('ontid', result.ontid)
          this.$router.push({ path: '/' })
        } else {
          this.$message({
            message: 'Sign in Fail!',
            center: true,
            type: 'error'
          })
        }
      } catch (error) {
        throw error
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
}
</style>
