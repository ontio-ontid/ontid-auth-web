<template>
  <div class="loginForm_area">
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
  }
}
</script>
