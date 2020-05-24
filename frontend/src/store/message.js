import Axios from "axios"


const message = {

    state : {
        messages: []
    },
    getters : {
        getMessages: (state) => {
            return state.messages
        }

    },
    mutations : {
        setMessage : (state,message) => {
            message.createdAt = new Date(message.createdAt).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',hour:'2-digit',minute: '2-digit'})
            state.messages.push(message)
        },
        setMessages : (state,messages) => {
            messages.forEach(message => {
                message.createdAt = new Date(message.createdAt).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',hour:'2-digit',minute: '2-digit'})
            });
            state.messages = messages
           
        }

    },
    actions : {
        SEND_MESSAGE : ({commit},payload) => {
           return Axios.post('/message',payload,).then(({status,data}) => {
                if(status===200){
                    commit('setMessage',data)
                    return data
                }
            })
        },
        SEND_FILE : ({commit},payload) => {
           return Axios.post('/message/file',payload).then(({status,data}) => {
                if(status===200) {
                    commit('setMessage',data)
                }
            })
        },
        GET_MESSAGES : ({commit},payload) => {
           return Axios.get(`/message/conversation/${payload}`).then(({status,data}) => {
                if(status===200) {
                    commit('setMessages',data)
                }
            })
        }

    },
   
}

export default message