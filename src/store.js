import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async sendONS({ dispatch, commit }, params) {
      try {
        return axios.post(
          process.env.VUE_APP_API + '/api/v1/ta/register',
          params
        )
      } catch (error) {
        return error
      }
    },
    async checkSignUp({ dispatch, commit }, params) {
      try {
        return axios.get(
          process.env.VUE_APP_API + '/api/v1/ta/register/result/' + params
        )
      } catch (error) {
        return error
      }
    },
    async getLoginMsg({ dispatch, commit }, params) {
      try {
        return axios.post(process.env.VUE_APP_API + '/api/v1/ta/login')
      } catch (error) {
        return error
      }
    },
    async getLoginRes({ dispatch, commit }, params) {
      try {
        return axios.get(
          process.env.VUE_APP_API + '/api/v1/ta/login/result/' + params
        )
      } catch (error) {
        return error
      }
    },
    async getInvokeMsg({ dispatch, commit }, params) {
      try {
        return axios.post(process.env.VUE_APP_API + '/app/invoke/' + params)
      } catch (error) {
        return error
      }
    },
    async checkInvoke({ dispatch, commit }, params) {
      try {
        return axios.get(
          process.env.VUE_APP_API + '/app/invoke/result/' + params
        )
      } catch (error) {
        return error
      }
    },
    async applyClaim({ dispatch, commit }, params) {
      try {
        return await axios.post(
          process.env.VUE_APP_API + '/api/v1/ta/claim',
          params
        )
      } catch (error) {
        return error
      }
    },
    async getClaimQR() {
      try {
        return await axios.get(process.env.VUE_APP_API + '/api/v1/ta/claim')
      } catch (error) {
        return error
      }
    }
  }
})
