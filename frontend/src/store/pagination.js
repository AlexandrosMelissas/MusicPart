
import router from '../router'

const pagination = {

    state : {
        skip : 0,
        totalPages: null,
        currentPage : 1
    },
    getters : {
        getSkip : (state) => {
            return state.skip
        },
        getTotalPages : (state) => {
            return state.totalPages
        },
        getCurrentPage : (state) => {
            return state.currentPage
        }

    },
    mutations : {
        setTotalPages : (state,pages) => {
            state.totalPages = pages
        },
        setSkip : (state,skip) => {
            state.skip = skip
        },
        setCurrentPage : (state,currentPage) => {
            state.currentPage = currentPage
        }
    },

    actions : {


    }

}

export default pagination