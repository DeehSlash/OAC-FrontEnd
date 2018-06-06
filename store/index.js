// Modules
import axios from 'axios'

// Config
import config from '../config.json'

const api = axios.create(config.api)

export const state = () => ({
  trainingData: [],
  trainingResult: {},
  code: '',
  delay: 20
})

export const getters = {
  getTrainingData: state => {
    return state.trainingData
  },

  getTrainingResult: state => {
    return state.trainingResult
  },

  getCode: state => {
    return state.code
  },

  getDelay: state => {
    return state.delay
  }
}

export const mutations = {
  addTrainingData (state, data) {
    state.trainingData.push(data)
  },

  clearTrainingData (state) {
    state.trainingData = []
  },

  setTrainingResult (state, result) {
    state.trainingResult = result
  },

  setCode (state, code) {
    state.code = code
  },

  setDelay (state, delay) {
    state.delay = delay
  }
}

export const actions = {
  createNetwork ({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.post('network', state.trainingData)
        .then(res => {
          commit('setCode', res.data.code)
          commit('setTrainingResult', res.data.trainingResult)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  getNextMovement ({ state }, distance) {
    return new Promise((resolve, reject) => {
      api.post(`network/${state.code}/activate`, { input: distance })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  codeExists ({ commit }, code) {
    return new Promise((resolve, reject) => {
      api.get(`network/${code}/exists`)
        .then(res => {
          commit('setCode', code)
          resolve(true)
        })
        .catch(e => {
          if(e.response.status === 404)
            resolve(false)
          reject(e)
        })
    })
  }
}