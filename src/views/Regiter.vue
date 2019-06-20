<template>
  <div class="registrer">
    <div class="title">Sign UP</div>
    <div class="tips">
      Already have ONS,
      <span @click="$router.push({ path:'/login'})">SIGN IN</span>
    </div>
    <div class="enter_ons">
      <el-input placeholder="Please input ONS: xxx.on.ont" v-model="ons" class="input-with-select">
        <el-button @click="sendOns" type="primary" slot="append">Submit</el-button>
      </el-input>
    </div>
    <div class="qrcode">
      <img :src="url" alt>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      ons: '',
      url: '',
      dataId: '',
      checkTimer: null
    }
  },
  mounted() {
    // console.log(process.env.VUE_APP_API)
  },
  methods: {
    createQRcode(params) {
      params = JSON.stringify(params)
      QRCode.toDataURL(params)
        .then(url => {
          this.url = url
        })
        .catch(err => {
        })
      this.checkTimer = setInterval(() => {
        this.checkResult()
      }, 3000)
    },
    async sendOns() {
      if (this.ons === '') {
        this.$message({
          message: 'Please Input Yours ONS!',
          center: true,
          type: 'success'
        });
        return
      }
      let qrcodeParams = { params: { login: true } }
      try {
        let res = await this.$store.dispatch('sendONS', this.ons)
        console.log('res', res)
        if (res.data.msg === 'SUCCESS') {
          qrcodeParams.action = 'invoke'
          qrcodeParams.version = res.data.version
          qrcodeParams.id = res.data.result.id
          qrcodeParams.params.callback = res.data.result.callback
          qrcodeParams.params.qrcodeUrl = res.data.result.qrcodeUrl
          this.dataId = res.data.result.id
          console.log('qrcodeParams', qrcodeParams)
          console.log('dataId', this.dataId)
          this.createQRcode(qrcodeParams)
        } else {
          this.$message({
            message: 'SignUp Fail!',
            center: true,
            type: 'error'
          });
          return
        }
      } catch (error) {
        this.$message({
          message: 'SignUp Fail!',
          center: true,
          type: 'error'
        });
        return
      }
    },
    async checkResult() {
      try {
        let res = await this.$store.dispatch('checkSignUp', this.dataId)
        console.log('checkout', res)
        if (res.data.msg === 'SUCCESS') {
          if (res.data.result === '1') {
            this.$message({
              message: 'SignUp Successfuly!',
              center: true,
              type: 'success'
            });
            clearInterval(this.checkTimer)
            this.$router.push({ path: '/login' })
            return true
          } else if (res.data.result === '0') {
            clearInterval(this.checkTimer)
            this.$message({
              message: 'SignUp Fail!',
              center: true,
              type: 'error'
            });
            return false
          } else { }

        } else {
          clearInterval(this.checkTimer)
          this.$message({
            message: 'SignUp Fail!',
            center: true,
            type: 'error'
          });
          return false
        }
      } catch (error) {
        clearInterval(this.checkTimer)
        this.$message({
          message: error,
          center: true,
          type: 'error'
        });
        return false
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.checkTimer)
  },
}
</script>

<style lang="less" scoped>
.registrer {
  width: 100%;
  height: 100%;
  max-width: 1020px;
  margin: 0 auto;
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
