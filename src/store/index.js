import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    CLEAR_USER_DATA(state) {
      state.user = null
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    register({
      commit
    }, credintials) {
      return axios
        .post('//localhost:3000/register', credintials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({
      commit
    }, credintials) {
      return axios
        .post('//localhost:3000/login', credintials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit}) {
      commit('CLEAR_USER_DATA')
    }
  },
  modules: {}
})