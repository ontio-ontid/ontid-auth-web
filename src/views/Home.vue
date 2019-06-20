<template>
  <div class="home">
    <div class="account_name">
      welcome!
      <span>{{ons}}</span>
      <el-button @click="signOut" size="small" round style="margin-left: 20px;">Sign Out</el-button>
    </div>
    <p>
      <el-button type="primary" @click="getMsg()">Contract</el-button>
    </p>
    <div class="qrcode">
      <img :src="url" alt>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QRCode from 'qrcode'
import { setInterval, clearInterval } from 'timers';

export default {
  name: 'home',
  data() {
    return {
      ons: '',
      ontid: '',
      dataId: '',
      url: '',
      invokeTimer: null
    }
  },
  mounted() {
    this.ons = sessionStorage.getItem('ons')
    this.ontid = sessionStorage.getItem('ontid')
  },
  methods: {
    signOut() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMsg() {
      try {
        let res = await this.$store.dispatch('getInvokeMsg')
        if (res.data.msg === 'SUCCESS') {
          let info = { params: {} }
          info.id = res.data.result.id
          info.params.callback = res.data.result.callback
          info.params.qrcodeUrl = res.data.result.qrcodeUrl
          this.dataId = res.data.result.id
          this.createQRcode(info)
        } else {
          this.$message({
            message: 'Get Invoke Message Fail!',
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
      }
    },
    createQRcode(info) {
      let qrParams = {
        action: 'invoke',
        version: 'v1.0.0',
        id: info.id,
        params: {
          login: true,
          callback: info.params.callback,
          qrcodeUrl: info.params.qrcodeUrl
        }
      }
      console.log('qrParams', qrParams)
      qrParams = JSON.stringify(qrParams)
      QRCode.toDataURL(qrParams)
        .then(url => {
          this.url = url
        })
        .catch(err => {
        })

      this.invokeTimer = setInterval(() => {
        this.getInvokeResult()
      }, 3000)
    },
    async getInvokeResult() {
      try {
        let res = await this.$store.dispatch('checkInvoke', this.dataId)
        console.log('getInvokeResult', res)
        if (res.data.msg === 'SUCCESS') {
          if (res.data.result === '1') {
            this.$message({
              message: 'Transfer Contract Successful!',
              center: true,
              type: 'success'
            });
            clearInterval(this.invokeTimer)
            this.url = ''
            this.dataId = ''
            return true
          } else if (res.data.result === '0') {
            this.$message({
              message: 'Transfer Contract Fail!',
              center: true,
              type: 'error'
            });
            clearInterval(this.invokeTimer)
            return false
          } else { }
        } else {
          this.$message({
            message: 'Transfer Contract Fail!',
            center: true,
            type: 'error'
          });
          clearInterval(this.invokeTimer)
          return false
        }
      } catch (error) {
        this.$message({
          message: error,
          center: true,
          type: 'error'
        });
        clearInterval(this.invokeTimer)
        return false
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.invokeTimer)
  },
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  max-width: 1020px;
  margin: 0 auto;
  .account_name {
    font-size: 30px;
    line-height: 100px;
    padding-top: 100px;
    span {
      color: red;
      text-decoration: underline;
    }
    .el-button {
      background: #000;
      color: #fff;
    }
  }
  .qrcode {
    width: 200px;
    height: 200px;
    // background: tomato;
    margin: 0 auto;
    margin-top: 100px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>

