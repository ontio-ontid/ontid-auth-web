<template>
  <div class="get_claim_wrap">
    <img v-if="imgUrl" :src="imgUrl" alt="" />
    <p v-else>QR code acquisition failed, please try again!</p>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      imgUrl: true
    }
  },
  methods: {},
  async created() {
    try {
      let result = await this.$store.dispatch('getClaimQR')
      console.log(result)
      if (result.data.desc === 'SUCCESS') {
        let codeParams = JSON.stringify(result.data.result)
        QRCode.toDataURL(codeParams)
          .then(url => {
            this.imgUrl = url
          })
          .catch(err => {})
      }
    } catch (error) {
      throw error
    }
  }
}
</script>

<style lang="less" scoped>
.get_claim_wrap {
  padding-top: 100px;
  img {
    display: block;
    width: 200px;
    height: 200px;
    background: #000;
    margin: 0 auto;
  }
}
</style>
