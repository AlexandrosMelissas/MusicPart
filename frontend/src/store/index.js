import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import auth from '../store/auth'
import profile from '../store/profile'
import song from '../store/song'
import comment from '../store/comment'
import message from '../store/message'
import conversation from '../store/conversation'
import pagination from '../store/pagination'
import playingSong from '../store/playingSong'


Vue.use(Vuex)


export default new Vuex.Store({
  state : {
    loading: false,
    bottom_player: false
  },
  getters: {
    getLoading: (state) => {
      return state.loading
    },
    getBottomPlayer : (state) => {
      return state.bottom_player
    }
  },
  mutations: {
    setLoading: (state,boolean) => {
      state.loading = boolean
    },
    setBottomPlayer : (state,boolean) => {
      state.bottom_player = boolean
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
    pagination,
    playingSong
    },
})

