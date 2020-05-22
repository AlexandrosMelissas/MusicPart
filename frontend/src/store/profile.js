import Axios from "axios"

const profile = {
    state : {
        my_profile : '',
        profile : '',
        profiles : [],
        image : false
    },
    getters: {
        getMyProfile : (state) => {
            return state.my_profile
        },
        getProfile : (state) => {
            return state.profile
        },
        getProfiles: (state) => {
            return state.profiles
        },
        getImage : (state) => {
            return state.image
        }

    },
    mutations: {
        setMyProfile : (state,p) => {
            state.my_profile = p
        },
        setProfile : (state,profile) => {
            state.profile = profile
        },
        setImage: (state,boolean) => {
            state.image = boolean
        },
        addInstrument : (state,newInstrument) => {
            state.profile.instruments.push({instrument: newInstrument})
        },
        removeInstrument : (state,removedInstrument) => {
            const instruments = state.profile.instruments
            for(let i=0;i<instruments.length;i++) {
                if(instruments[i].instrument == removedInstrument) {
                    instruments.splice(i,1)
                }
            }
        },
        setProfiles: (state,profiles) => {
            state.profiles = profiles
        },
        reset : (state) => {
            state.profile = ''
            state.image = false
        }

    },
    actions : {
        GET_MY_PROFILE : ({commit,getters}) => {
            if(getters.isAuthenticated) {

                return new Promise((resolve,reject) => {
                    Axios.get('/profile/me').then(({data,status}) => {
                        if(status===200) {
                            commit('setMyProfile',data)
                        }
                    })
                }).then((data) => {
                    resolve(data)
                })

            }

        },
        GET_PROFILE : ({commit},payload) => {
           return Axios.get(`/profile/${payload}`).then(({data,status}) => {
                if(status===200) {
                    commit('setProfile',data)
                    return data
                }
            })
        },
        GET_PROFILES: ({commit},payload) => {
            if(payload) {

                Axios.get(`/profile?name=${payload}`).then(({data,status}) => {
                    if(status===200) {
                        commit('setProfiles',data)
                    }
                })

            } else {
                Axios.get('/profile').then(({data,status}) => {
                    if(status===200) {
                        commit('setProfiles',data)
                    }
                })
            }
           
        },
        UPLOAD_IMAGE : ({commit},payload) => {
                Axios.post('/profile/avatar',payload,{
                headers : {
                    'Content-Type': 'form-data'
                }
                }).then(({status}) => {
                if(status===200) {
                    commit('setImage',true)
                }
                })
        },
        CHECK_IMAGE : ({commit},payload) => {
            return new Promise((resolve,reject) => {
                Axios.get(`/profile/${payload}/avatar`).then(({status}) => {
                    if(status===200) {
                        commit('setImage',true)
                    }
                })
            }).then((success) => {
                resolve()
            })     
        },
        UPDATE_PROFILE : ({commit},payload) => {
           return Axios.patch('/profile',payload).then(({status,data}) => {
                if(status===200) {
                    console.log(data)
                    commit('setProfile',data)
                }
            })
        }

    }

}

export default profile