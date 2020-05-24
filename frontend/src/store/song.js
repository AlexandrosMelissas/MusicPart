import Axios from "axios"

const song = {
    state : {
        song : {},
        profile_songs: [],
        songs: '',
        my_songs: [],
        liked: false
    },
    getters : {
        getSong : (state) => {
            return state.song
        },
        getAllSongs: (state) => {
            return state.songs
        },
        getProfileSongs: (state) => {
            return state.profile_songs
        },
        getLiked : (state) => {
            return state.liked
        },
        getMySongs : (state) => {
            return state.my_songs
        }
    },
    mutations : {
        setSongOne : (state,song) => {
            state.song = song
        },
        removeSongOne : (state) => {
            state.song = null
        },
        setAllSongs : (state,songsArray) => {
           state.songs = songsArray
        },
        setProfileSongs: (state,songs) => {
            state.profile_songs = songs
        },
        emptyAllSongs: (state) => {
            state.songs = []
        },
        deleteSong : (state,song) => {
            state.song = {}
        },
        setLike: (state,boolean) => {
            state.liked = boolean
        },
        setMySongs : (state,songs) => {
            songs.forEach((song) => {
                state.my_songs.push(song)
            })
        },
        reset: (state) => {
            state.song = {},
            state.songs = [],
            state.my_songs = [],
            state.liked =  false
        }
    },
    actions : {
        UPLOAD : ({commit}, payload) => {
              return Axios.post('/song',payload).catch((error) => {
                throw error
            })           
        },
        GET_SONG: ({commit}, payload) => {
               return Axios.get(`/song/${payload}`).then(({data,status}) => {
                    if(status===200){
                        commit('setSongOne',data)
                    } 
                })
        },
        GET_MY_SONGS : ({commit,getters}) => {
            if(getters.getMySongs.length == 0){
            return new Promise((resolve,reject) => {
                Axios.get('/song/me').then(({data,status}) => {
                    if(status=== 200) {
                        commit('setMySongs',data)
                        resolve()
                    }
                }).catch((error) => {
                    reject(error)
                })
            })}
        },
        DELETE_SONG : ({commit},payload) => {
           return Axios.delete(`/song/${payload}`).then(({data,status}) => {
               if(status===200) {
                   commit('deleteSong',data)
               }
           })
        },
        GET_PROFILE_SONGS : ({commit},payload) => {
            Axios.get(`/song/profile/${payload}`).then(({data,status}) => {

                if(status===200) {
                    commit('setProfileSongs',data)
                }

            })
        },
        GET_ALL_SONGS: ({commit}) => {
            let songs = []
            return new Promise((resolve,reject) => {
                Axios.get('/song').then(({data,status}) => {
                    if(status===200) {
                        songs.push(data)
                        commit('setAllSongs',songs)
                        resolve()
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
           
        },
        EMPTY_ALL_SONGS: ({commit}) => {
            commit('emptyAllSongs')
        },
        LIKE_SONG : ({commit},payload) => {
             return new Promise((resolve,reject) => {
                Axios.post(`/song/${payload}/like`).then(({status}) => {
                    if(status===200) {
                        commit('setLike',true)
                        resolve()
                    } 
                }).catch((error) => {
                    reject(error)
                })
             })          
        },
        UNLIKE_SONG : ({commit},payload) => {
            return new Promise((resolve,reject) => {
               Axios.post(`/song/${payload}/unlike`).then(({status}) => {
                   if(status===200) {
                       commit('setLike',false)
                       resolve()
                   }
               }).catch((error) => {
                reject(error)
            })
            })          
       },
        CHECK_LIKE: ({commit,getters},payload) => {
            if(getters.isAuthenticated){
            return new Promise((resolve,reject) => {
                Axios.get(`/song/${payload}/check_like`).then(({status,data}) => {
                    if(status===200) {
                        commit('setLike',data.liked)
                        resolve()
                    } 
                }).catch((error) => {
                    reject(error)
                })
            })
        }
        },
        UPLOAD_SONG_IMAGE: ({commit},payload) => {
            Axios.post(`/song/${payload.id}/image`,payload.image,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then((success) => {

            })
        }
    }
}

export default song