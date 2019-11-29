<template>
  <div class="apply_claim_wrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="Age"
        prop="age"
        :rules="[
          { required: true, message: 'Age cannot be empty' },
          { type: 'number', message: 'Age must be a numeric value' }
        ]"
      >
        <el-input
          type="age"
          v-model.number="ruleForm.age"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Whether single" prop="answer">
        <el-radio-group v-model="ruleForm.answer">
          <el-radio :label="isTrue"></el-radio>
          <el-radio :label="isFlase"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Apply</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        answer: '',
        age: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please type in your name',
            trigger: 'blur'
          }
        ],
        answer: [
          {
            required: true,
            message: 'Please choose whether to be single',
            trigger: 'change'
          }
        ]
      },
      isTrue: true,
      isFlase: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            ...this.ruleForm,
            ontid: sessionStorage.getItem('ontid')
          }
          console.log(params)
          this.applyClaim(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async applyClaim(data) {
      try {
        let result = await this.$store.dispatch('applyClaim', data)
        console.log(result)
        if (
          result.data.desc === 'SUCCESS' &&
          result.data.result === 'SUCCESS'
        ) {
          this.$message({
            message: 'Successful application, under review!',
            center: true,
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Application failed, please try again!',
            center: true,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          message: 'Application failed, please try again!',
          center: true,
          type: 'error'
        })
        throw error
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
