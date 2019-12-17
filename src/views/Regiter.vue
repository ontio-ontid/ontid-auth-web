<template>
  <div class="registrer">
    <div class="title">Sign Up</div>
    <div class="domain">Domain: {{ domain }}</div>
    <div class="tips">
      Already have an account?
      <span @click="$router.push({ path: '/login' })">SIGN IN</span>
    </div>
    <div class="enter_ons">
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
              >Sign up</el-button
            >
          </el-form-item>
        </el-form>
      </div>
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
          this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async register() {
      try {
        let apiData = await this.$store.dispatch('registerAcc', this.ruleForm)
        const { desc, result } = apiData.data
        if (desc === 'SUCCESS') {
          this.$message({
            message: 'Sign up Successful!',
            center: true,
            type: 'success'
          })
          sessionStorage.setItem('ons', result.userName)
          sessionStorage.setItem('ontid', result.ontid)
          this.$router.push({ path: '/' })
        } else {
          this.$message({
            message: 'Sign up Fail!',
            center: true,
            type: 'error'
          })
        }
        console.log(result)
      } catch (error) {
        throw error
      }
    }
  }
}
</script>

<style lang="less" scoped>
.registrer {
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
  .enter_ons {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-top: 50px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
