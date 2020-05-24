import Axios from 'axios'

const conversation = {

    state : {
        conversation: '',
        conversations: []
    },
    getters : {
        getConversation : (state) => {
            return state.conversation
        },
        getConversations: (state) => {
            return state.conversations
        }

    },
    mutations : {
        setConversation : (state,conversation) => {
            state.conversation = conversation
        },
        setConversations : (state,conversations) => {
            state.conversations = conversations
        },
        addToConversations : (state,payload) => {
            state.conversations.push(payload)
        }

    },
    actions : {
        GET_CONVERSATIONS: ({commit}, payload) => {
           return Axios.get(`/conversation`).then(({status,data}) => {
                if(status===200) {
                    commit('setConversations',data)
                }
            })
        },
        GET_CONVERSATION: ({commit}, payload) => {
            return Axios.get(`/conversation/${payload}`).then(({data,status}) => {
                if(status === 200) {
                    commit('setConversation',data)
                }
            })
        }
    }

}

export default conversation