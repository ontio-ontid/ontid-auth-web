<template>
  <div class="login">
    <div class="title">Sign In</div>
    <div class="tips">
      Do you have ONS,
      <span @click="$router.push({ path:'/register'})">SIGN UP</span>
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
      url: '',
      dataId: '',
      getResTimer: null
    }
  },
  methods: {
    createQRcode(info) {
      let codeParams = {
        action: 'login',
        version: 'v1.0.0',
        id: info.id,
        params: {
          type: 'address',
          dappName: 'dapp Name',
          dappIcon: 'dapp Icon',
          message: info.message,
          callback: info.callback
        }
      }
      console.log('codeParams', codeParams)
      codeParams = JSON.stringify(codeParams)
      QRCode.toDataURL(codeParams)
        .then(url => {
          this.url = url
        })
        .catch(err => {
        })

      this.getResTimer = setInterval(() => {
        this.getLoginResult()
      }, 3000)
    },
    async getLoginResult() {
      try {
        let res = await this.$store.dispatch('getLoginRes', this.dataId)
        console.log('getLoginResult', res)
        if (res.data.msg === 'SUCCESS') {
          if (res.data.result && res.data.result.result === '1') {
            if (!res.data.result.ons) {
              this.$message({
                message: 'Please SignUp ONS',
                center: true,
                type: 'error'
              });
              clearInterval(this.getResTimer)
              this.$router.push({ path: '/register' })
              return
            } else {
              sessionStorage.setItem('ons', res.data.result.ons)
              sessionStorage.setItem('ontid', res.data.result.ontid)
              this.$message({
                message: 'SignIn Successful',
                center: true,
                type: 'success'
              });
              clearInterval(this.getResTimer)
              this.$router.push({ path: '/' })
              return
            }
          }
        } else {
          this.$message({
            message: 'Get SignIn Result Fail!',
            center: true,
            type: 'error'
          });
          clearInterval(this.getResTimer)
          return
        }
      } catch (error) {
        this.$message({
          message: error,
          center: true,
          type: 'error'
        });
        clearInterval(this.getResTimer)
        return
      }
    }
  },
  async mounted() {
    try {
      let result = await this.$store.dispatch('getLoginMsg')
      console.log('loginmsg', result)
      if (result.data.msg === 'SUCCESS') {
        let info = {
          id: result.data.result.id,
          message: result.data.result.message,
          callback: result.data.result.callback,
        }
        console.log('info', info)
        this.dataId = result.data.result.id
        this.createQRcode(info)
      } else {
        this.$message({
          message: 'Get Message Fail!',
          center: true,
          type: 'error'
        });
        return
      }
    } catch (error) {
      this.$message({
        message: error,
        center: true,
        type: 'error'
      });
      return
      return
    }
  },
  beforeDestroy() {
    clearInterval(this.getResTimer)
  },
}
</script>
<style lang="less" scoped>
.login {
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
  .qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-top: 50px;
    background: tomato;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
