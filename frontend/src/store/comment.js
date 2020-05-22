import Axios from "axios"

const comment = {
    state : {
        comments : []
    },
    getters : {
        getComments: (state) => {
            return state.comments
        }
    },
    mutations : {
        setComments : (state,comments) => {
             comments.forEach((comment) => {
                comment.createdAt = new Date(comment.createdAt).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',hour:'2-digit',minute: '2-digit'})
                state.comments.push(comment)
             })
        },
      
        deleteComments : (state) => {
            state.comments = []
        },
        insertComment: (state,comment) => {
            comment.createdAt = new Date(comment.createdAt).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',hour:'2-digit',minute: '2-digit'})
            state.comments.unshift(comment)
        },
        deleteComment : (state,comment_id) => {
            state.comments.forEach((comment,index) => {
                if(comment._id == comment_id) {
                    state.comments.splice(index,1)
                }
            })
        },
        reset : (state) => {
            state.comments = []
        }

    },
    actions : {
        GET_COMMENTS : ({commit,getters},payload) => {
            if(getters.comments !== []) {
                commit('deleteComments')
            }
                Axios.get(`/song/${payload}/comment?limit=9&skip=${getters.getSkip}`).then(async ({status,data}) => {
                    if(status===200) {
                        commit('setTotalPages',data.totalPages)
                        commit('setComments',data.comments)
                    }
                })
        },
        INSERT_COMMENT : ({commit},payload) => {
               return Axios.post(`/song/${payload.id}/comment`,{comment:payload.comment,createdAt : payload.createdAt})
                .then(({status,data}) => {
                    if(status===201){
                        commit('insertComment',data)
                     }
                })
        },
        DELETE_COMMENT : ({commit}, payload) => {
           return Axios.delete(`/song/${payload.song}/comment/${payload.comment}`).then(({status,data}) => {
                if(status===200) {
                    commit('deleteComment',data._id)
                }
            })
        }

    }

}

export default comment
