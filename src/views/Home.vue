<template>
  <div class="home">
    <div class="account_name">
      Welcome!
      <span class="ons">{{ ons }}</span>
      <span>(ONT ID: {{ ontid }})</span>
      <el-button @click="signOut" size="small" round style="margin-left: 20px;"
        >Sign Out</el-button
      >
    </div>
    <div class="claim_wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Apply Claim" name="applyClaim"></el-tab-pane>
        <el-tab-pane label="Get Claim" name="getClaim"></el-tab-pane>
      </el-tabs>
      <Applyclaim-div v-if="activeName === 'applyClaim'"></Applyclaim-div>
      <GetClaim-div v-else></GetClaim-div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QRCode from 'qrcode'
import { setInterval, clearInterval } from 'timers'
import ApplyclaimDiv from './ApplyClaim'
import GetClaimDiv from './GetClaim'

export default {
  name: 'home',
  data() {
    return {
      ons: '',
      ontid: '',
      dataId: '',
      url: '',
      invokeTimer: null,
      hash: '',
      activeName: 'applyClaim'
    }
  },
  components: {
    ApplyclaimDiv,
    GetClaimDiv
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
        let res = await this.$store.dispatch('getInvokeMsg', this.ons)
        if (res.data.desc === 'SUCCESS') {
          let info = res.data.result
          this.dataId = res.data.result.appId
          this.createQRcode(info)
        } else {
          this.$message({
            message: 'Get Invoke Message Fail!',
            center: true,
            type: 'error'
          })
          return false
        }
      } catch (error) {
        return false
      }
    },
    createQRcode(info) {
      let qrParams = info
      console.log('qrParams', qrParams)
      qrParams = JSON.stringify(qrParams)
      QRCode.toDataURL(qrParams)
        .then(url => {
          this.url = url
        })
        .catch(err => {})

      this.invokeTimer = setInterval(() => {
        this.getInvokeResult()
      }, 3000)
    },
    async getInvokeResult() {
      try {
        let res = await this.$store.dispatch('checkInvoke', this.dataId)
        console.log('getInvokeResult', res)
        if (res.data.desc === 'SUCCESS') {
          if (res.data.result.result === '1') {
            this.$message({
              message: 'Transfer Contract Successful!',
              center: true,
              type: 'success'
            })
            clearInterval(this.invokeTimer)
            this.url = ''
            this.dataId = ''
            this.hash = res.data.result.txHash
            return true
          } else if (res.data.result.result === '0') {
            this.$message({
              message: 'Transfer Contract Fail!',
              center: true,
              type: 'error'
            })
            clearInterval(this.invokeTimer)
            return false
          } else {
          }
        } else {
          this.$message({
            message: 'Transfer Contract Fail!',
            center: true,
            type: 'error'
          })
          clearInterval(this.invokeTimer)
          return false
        }
      } catch (error) {
        clearInterval(this.invokeTimer)
        return false
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  beforeDestroy() {
    clearInterval(this.invokeTimer)
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  max-width: 1020px;
  margin: 0 auto;
  .account_name {
    font-size: 22px;
    line-height: 100px;
    padding-top: 100px;
    text-align: center;
    span {
      color: red;
      text-decoration: underline;
    }
    .ons {
      margin-right: 20px;
      margin-left: 20px;
    }
    .el-button {
      background: #000;
      color: #fff;
    }
  }
  .hex {
    line-height: 30px;
    font-size: 22px;
    margin-top: 20px;
  }
  .qrcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-top: 100px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.claim_wrap {
  width: 600px;
  margin: 40px auto;
}
</style>
