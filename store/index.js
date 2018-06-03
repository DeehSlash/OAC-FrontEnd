// Modules
import axios from 'axios'

// Config
import config from '../config.json'

const api = axios.create(config.api)

export const state = () => ({
  code: ''
})

export const getters = {
  getCode: state => {
    return state.code
  }
}

export const mutations = {
  setCode (state, code) {
    state.code = code
  }
}

export const actions = {
  createNetwork ({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      api.post('network', data)
        .then(res => {
          console.log(`Network created with code ${res.data}`)
          commit('setCode', res.data)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}