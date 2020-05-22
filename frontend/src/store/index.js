import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import auth from '../store/auth'
import profile from '../store/profile'
import song from '../store/song'
import comment from '../store/comment'
import message from '../store/message'
import conversation from '../store/conversation'
import pagination from '../store/pagination'


Vue.use(Vuex)


export default new Vuex.Store({
  state : {
    loading: false
  },
  getters: {
    getLoading: (state) => {
      return state.loading
    }
  },
  mutations: {
    setLoading: (state,boolean) => {
      state.loading = boolean
    }
  },
  actions : {
    clearAll({ commit }){
      commit("reset")
  }
  },
  modules: {
    auth,
    profile,
    song,
    comment,
    message,
    conversation,
    pagination
    },
})

