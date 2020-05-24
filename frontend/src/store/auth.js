import Axios from "axios"

const auth = {
    state : {
      token : localStorage.getItem('user-token') || '',
      status : '',
      error: ''
    },
    getters: {
      getError : (state) => {
        return state.error
      },
      isAuthenticated: (state) => {
        return state.token !==''
      }
  
    },
    mutations: {
      setToken: (state,token) => {
        state.token = token
      },
      setError: (state,error) => {
        state.error = error
      }
    },
    actions: {
        REGISTER : ({commit}, payload) => {

           return Axios.post('/register',payload).then(({data, status}) => {
              if(status===201){
                localStorage.setItem('user-token',data.token)
                Axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                commit('setToken',data.token)
              }
             
          }).catch((error) => {
            commit('setError',error.response.data.error)
          })
        },
        LOGIN : ({commit}, payload) => {
          return new Promise((resolve,reject) => {
            Axios.post('/login',payload).then(({data,status}) => {
              if(status===200){
                const token = data.token
                localStorage.setItem('user-token',token)
                Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                commit('setToken',token)
                resolve(data)
              }
            }).catch((error) => {
              commit('setError',error.response.data.error)
            })

          })
        },
        LOGOUT: ({commit,dispatch}) => {
          return new Promise((resolve,reject) => {
            Axios.post('/logout').then(({data,status}) => {
              if(status===200){
                localStorage.removeItem('user-token')
                commit('setToken','')
                delete Axios.defaults.headers.common['Authorization']
                dispatch('clearAll',null,{ root: true })
                resolve(data)
              }
              
            }).catch((error) => {
            })
          })
        }
    }
}

export default auth
