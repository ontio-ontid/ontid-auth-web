<template>
  <div class="qrcode_area">
    <img v-if="!isShowAccount" :src="url" alt="" />
    <ul v-else>
      <li>
        <el-button>a</el-button>
        <el-button>Login</el-button>
      </li>
      <li>
        <el-button>Regenerate QR code</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      url: '',
      accountList: [
        {
          userName: '',
          ontid: ''
        }
      ],
      isShowAccount: false,
      accountId: '',
      getResTimer: null
    }
  },
  methods: {
    createQRcode(info) {
      console.log('codeParams', info)
      let codeParams = JSON.stringify(info)
      QRCode.toDataURL(codeParams)
        .then(url => {
          this.url = url
        })
        .catch(err => {})
      this.getResTimer = setInterval(() => {
        this.getLoginResult()
      }, 3000)
    },
    async getQrcode() {
      let apiData = await this.$store.dispatch('getLoginAppQrcode')
      const { desc, result } = apiData.data
      console.log(result)
      this.accountId = result.id
      this.createQRcode(result.qrCode)
    },
    async getLoginResult() {
      try {
        let res = await this.$store.dispatch('getQrcodeRes', this.accountId)
        console.log('getLoginResult', res)
        if (res.data.desc === 'SUCCESS') {
          if (res.data.result && res.data.result.result === '1') {
            sessionStorage.setItem('ons', res.data.result.userName)
            sessionStorage.setItem('ontid', res.data.result.ontid)
            this.$message({
              message: 'Sign In Successful',
              center: true,
              type: 'success'
            })
            clearInterval(this.getResTimer)
            return this.$router.push({ path: '/' })
          } else if (res.data.result && res.data.result.result === '2') {
            this.$message({
              message: 'Please add an account!',
              center: true,
              type: 'error'
            })

            return clearInterval(this.getResTimer)
          }
        } else {
          this.$message({
            message: 'Get Sign In Result Fail!',
            center: true,
            type: 'error'
          })

          return clearInterval(this.getResTimer)
        }
      } catch (error) {
        return clearInterval(this.getResTimer)
      }
    }
  },
  created() {
    this.getQrcode()
  },
  beforeDestroy() {
    clearInterval(this.getResTimer)
  }
}
</script>

<style lang="less" scoped>
.qrcode_area {
  img {
    display: block;
    width: 300px;
    height: 300px;
    margin: 10px auto;
  }
  ul {
    li {
      margin: 10px 0;
    }
  }
}
</style>
